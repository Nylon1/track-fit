import "server-only";
import { ImapFlow, type MessageStructureObject } from "imapflow";
import { simpleParser } from "mailparser";
import { sanitizeEmailHtml } from "./sanitize";
import { normalizeEmail } from "./lead-match";

export type InboxMessage = {
  uid: number;
  unread: boolean;
  senderName: string | null;
  senderEmail: string | null;
  subject: string;
  preview: string;
  receivedAt: string;
  messageId: string | null;
  inReplyTo: string | null;
  size: number;
};

export type AttachmentMetadata = {
  part: string | null;
  filename: string;
  contentType: string;
  size: number;
};

export type InboxMessageDetail = InboxMessage & {
  recipients: { name: string | null; address: string }[];
  text: string | null;
  safeHtml: string | null;
  attachments: AttachmentMetadata[];
  references: string[];
};

export class ImapConfigurationError extends Error {}

type ImapConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
};

function config(): ImapConfig {
  const host = process.env.IONOS_IMAP_HOST?.trim();
  const port = Number(process.env.IONOS_IMAP_PORT);
  const user = process.env.IONOS_IMAP_USER?.trim();
  const password = process.env.IONOS_IMAP_PASSWORD;
  if (
    !host ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535 ||
    !user ||
    !password
  ) {
    throw new ImapConfigurationError("IONOS IMAP is not configured");
  }
  return { host, port, user, password };
}

async function withInbox<T>(work: (client: ImapFlow) => Promise<T>) {
  const settings = config();
  const client = new ImapFlow({
    host: settings.host,
    port: settings.port,
    secure: true,
    auth: { user: settings.user, pass: settings.password },
    logger: false,
    disableAutoIdle: true,
    connectionTimeout: 12_000,
    greetingTimeout: 12_000,
    socketTimeout: 25_000,
    maxLiteralSize: 5_000_000,
    maxResponseSize: 8_000_000,
  });
  let lock: Awaited<ReturnType<ImapFlow["getMailboxLock"]>> | null = null;
  try {
    await client.connect();
    lock = await client.getMailboxLock("INBOX");
    return await work(client);
  } finally {
    lock?.release();
    if (client.usable) {
      try {
        await client.logout();
      } catch {
        client.close();
      }
    } else {
      client.close();
    }
  }
}

const address = (value?: { name?: string; address?: string }) => ({
  name: value?.name?.trim() || null,
  address: normalizeEmail(value?.address),
});

function summary(message: Awaited<ReturnType<ImapFlow["fetchOne"]>>) {
  if (!message) return null;
  const sender = address(message.envelope?.from?.[0]);
  const subject = message.envelope?.subject?.trim() || "(No subject)";
  return {
    uid: message.uid,
    unread: !message.flags?.has("\\Seen"),
    senderName: sender.name,
    senderEmail: sender.address || null,
    subject,
    preview: subject,
    receivedAt: new Date(
      message.internalDate || message.envelope?.date || Date.now(),
    ).toISOString(),
    messageId: message.envelope?.messageId || null,
    inReplyTo: message.envelope?.inReplyTo || null,
    size: Number(message.size || 0),
  } satisfies InboxMessage;
}

export async function fetchInboxPage(page = 1, limit = 25) {
  const safePage = Math.max(1, Math.floor(page));
  const safeLimit = Math.min(50, Math.max(1, Math.floor(limit)));
  return withInbox(async (client) => {
    const total = client.mailbox ? client.mailbox.exists : 0;
    const end = Math.max(0, total - (safePage - 1) * safeLimit);
    const start = Math.max(1, end - safeLimit + 1);
    const messages: InboxMessage[] = [];
    if (end >= start) {
      for await (const item of client.fetch(`${start}:${end}`, {
        uid: true,
        flags: true,
        envelope: true,
        internalDate: true,
        size: true,
      })) {
        const parsed = summary(item);
        if (parsed) messages.push(parsed);
      }
    }
    messages.sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
    return {
      messages,
      page: safePage,
      limit: safeLimit,
      total,
      hasMore: start > 1,
    };
  });
}

function flattenStructure(
  node: MessageStructureObject | undefined,
  output: MessageStructureObject[] = [],
) {
  if (!node) return output;
  output.push(node);
  for (const child of node.childNodes || []) flattenStructure(child, output);
  return output;
}

function filename(node: MessageStructureObject) {
  return (
    node.dispositionParameters?.filename ||
    node.parameters?.name ||
    "attachment"
  );
}

async function streamText(stream: NodeJS.ReadableStream, charset?: string) {
  const chunks: Buffer[] = [];
  let length = 0;
  for await (const chunk of stream) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    length += buffer.length;
    if (length > 2_000_000) throw new Error("Email body is too large");
    chunks.push(buffer);
  }
  const buffer = Buffer.concat(chunks);
  try {
    return new TextDecoder(charset || "utf-8").decode(buffer);
  } catch {
    return buffer.toString("utf8");
  }
}

async function referencesFromHeaders(headers?: Buffer) {
  if (!headers?.length) return [];
  const parsed = await simpleParser(headers, {
    skipHtmlToText: true,
    skipTextToHtml: true,
  });
  return Array.isArray(parsed.references)
    ? parsed.references
    : parsed.references
      ? [parsed.references]
      : [];
}

export async function fetchInboxMessage(uid: number, markRead = true) {
  if (!Number.isSafeInteger(uid) || uid < 1) return null;
  return withInbox(async (client) => {
    const message = await client.fetchOne(
      uid,
      {
        uid: true,
        flags: true,
        envelope: true,
        internalDate: true,
        size: true,
        bodyStructure: true,
        headers: ["references"],
      },
      { uid: true },
    );
    const base = summary(message);
    if (!message || !base) return null;
    const parts = flattenStructure(message.bodyStructure);
    const attachments = parts
      .filter(
        (part) =>
          part.disposition?.toLowerCase() === "attachment" ||
          Boolean(
            part.dispositionParameters?.filename || part.parameters?.name,
          ),
      )
      .map((part) => ({
        part: part.part || null,
        filename: filename(part),
        contentType: part.type || "application/octet-stream",
        size: Number(part.size || 0),
      }));
    const bodyParts = parts.filter(
      (part) =>
        Boolean(part.part) &&
        !attachments.some((attachment) => attachment.part === part.part) &&
        ["text/plain", "text/html"].includes(part.type.toLowerCase()),
    );
    const plainPart = bodyParts.find(
      (part) => part.type.toLowerCase() === "text/plain",
    );
    const htmlPart = bodyParts.find(
      (part) => part.type.toLowerCase() === "text/html",
    );
    let text: string | null = null;
    let safeHtml: string | null = null;
    if (plainPart?.part) {
      const download = await client.download(String(uid), plainPart.part, {
        uid: true,
        maxBytes: 2_000_000,
      });
      text = await streamText(download.content, download.meta.charset);
    } else if (htmlPart?.part) {
      const download = await client.download(String(uid), htmlPart.part, {
        uid: true,
        maxBytes: 2_000_000,
      });
      safeHtml = sanitizeEmailHtml(
        await streamText(download.content, download.meta.charset),
      );
    }
    if (markRead && base.unread) {
      await client.messageFlagsAdd(uid, ["\\Seen"], { uid: true });
      base.unread = false;
    }
    return {
      ...base,
      recipients: (message.envelope?.to || [])
        .map(address)
        .filter((item) => item.address),
      text,
      safeHtml,
      attachments,
      references: await referencesFromHeaders(message.headers),
    } satisfies InboxMessageDetail;
  });
}

export async function fetchMessagesFromSender(email: string, limit = 20) {
  const sender = normalizeEmail(email);
  if (!sender) return [];
  return withInbox(async (client) => {
    const uids = await client.search({ from: sender }, { uid: true });
    if (!uids || !uids.length) return [];
    const selected = uids.slice(-Math.max(1, Math.min(limit, 50)));
    const messages: InboxMessage[] = [];
    for await (const item of client.fetch(
      selected,
      {
        uid: true,
        flags: true,
        envelope: true,
        internalDate: true,
        size: true,
      },
      { uid: true },
    )) {
      const parsed = summary(item);
      if (parsed) messages.push(parsed);
    }
    return messages.sort((a, b) => a.receivedAt.localeCompare(b.receivedAt));
  });
}

export async function fetchInboxSummary(limit = 5) {
  return withInbox(async (client) => {
    const status = await client.status("INBOX", { unseen: true });
    const total = client.mailbox ? client.mailbox.exists : 0;
    const end = total;
    const start = Math.max(1, end - Math.max(1, Math.min(limit, 10)) + 1);
    const messages: InboxMessage[] = [];
    if (end >= start) {
      for await (const item of client.fetch(`${start}:${end}`, {
        uid: true,
        flags: true,
        envelope: true,
        internalDate: true,
        size: true,
      })) {
        const parsed = summary(item);
        if (parsed) messages.push(parsed);
      }
    }
    return {
      unread: Number(status.unseen || 0),
      messages: messages.sort((a, b) =>
        b.receivedAt.localeCompare(a.receivedAt),
      ),
    };
  });
}
