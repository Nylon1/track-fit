import Link from "next/link";
import { notFound } from "next/navigation";
import { enrichInboxMessage } from "@/lib/email/inbox-data";
import {
  fetchInboxMessage,
  ImapConfigurationError,
  type InboxMessageDetail,
} from "@/lib/email/ionos-imap";
import type { LeadMatch } from "@/lib/email/lead-match";
import { requireTrackfitAdmin } from "@/lib/supabase/server";

const date = (value: string) =>
  new Date(value).toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  });

export default async function InboxMessagePage({
  params,
}: {
  params: Promise<{ uid: string }>;
}) {
  const { supabase } = await requireTrackfitAdmin();
  const uid = Number((await params).uid);
  if (!Number.isSafeInteger(uid) || uid < 1) notFound();
  let message: (InboxMessageDetail & { lead: LeadMatch | null }) | null = null;
  let loadError: unknown = null;
  let missing = false;
  try {
    const rawMessage = await fetchInboxMessage(uid, true);
    if (!rawMessage) missing = true;
    else message = await enrichInboxMessage(supabase, rawMessage);
  } catch (error) {
    loadError = error;
    console.error(
      "[TrackFit IMAP] Message page unavailable:",
      error instanceof Error ? error.message : "Unknown error",
    );
  }

  if (missing) notFound();

  if (!message) {
    return (
      <section className="admin-panel inbox-error">
        <h1>
          {loadError instanceof ImapConfigurationError
            ? "Inbox configuration required"
            : "Inbox temporarily unavailable"}
        </h1>
        <p>The message could not be loaded from IONOS.</p>
        <Link href="/admin/inbox">Back to inbox</Link>
      </section>
    );
  }

  return (
    <>
      <header className="admin-header">
        <div>
          <Link href="/admin/inbox" className="back-link">
            ← Inbox
          </Link>
          <p className="admin-kicker">Received {date(message.receivedAt)}</p>
          <h1>{message.subject}</h1>
        </div>
        {message.lead && (
          <Link
            className="admin-primary"
            href={`/admin/leads/${message.lead.id}`}
          >
            View Lead
          </Link>
        )}
      </header>
      <section className="admin-panel message-card">
        <dl className="message-meta">
          <div>
            <dt>From</dt>
            <dd>
              {message.senderName
                ? `${message.senderName} <${message.senderEmail}>`
                : message.senderEmail || "Unknown"}
            </dd>
          </div>
          <div>
            <dt>To</dt>
            <dd>
              {message.recipients
                .map((item) =>
                  item.name ? `${item.name} <${item.address}>` : item.address,
                )
                .join(", ") || "Not available"}
            </dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{date(message.receivedAt)}</dd>
          </div>
          <div>
            <dt>Linked lead</dt>
            <dd>
              {message.lead ? (
                <Link href={`/admin/leads/${message.lead.id}`}>
                  {message.lead.referenceNumber}
                  {message.lead.matchCount > 1
                    ? ` (${message.lead.matchCount} matches; newest shown)`
                    : ""}
                </Link>
              ) : (
                "Unlinked email"
              )}
            </dd>
          </div>
          {message.messageId && (
            <div>
              <dt>Message-ID</dt>
              <dd>{message.messageId}</dd>
            </div>
          )}
          {message.inReplyTo && (
            <div>
              <dt>In reply to</dt>
              <dd>{message.inReplyTo}</dd>
            </div>
          )}
        </dl>
        <div className="message-body">
          {message.text ? (
            <pre>{message.text}</pre>
          ) : message.safeHtml ? (
            <div
              className="safe-email-html"
              dangerouslySetInnerHTML={{ __html: message.safeHtml }}
            />
          ) : (
            <p className="admin-empty">
              This email has no displayable text body.
            </p>
          )}
        </div>
        <div className="message-attachments">
          <h2>Attachments</h2>
          {message.attachments.length ? (
            <ul>
              {message.attachments.map((attachment, index) => (
                <li key={`${attachment.part}-${index}`}>
                  <strong>{attachment.filename}</strong>
                  <span>
                    {attachment.contentType} ·{" "}
                    {new Intl.NumberFormat("en-GB").format(attachment.size)}{" "}
                    bytes
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="admin-empty">No attachments.</p>
          )}
        </div>
      </section>
    </>
  );
}
