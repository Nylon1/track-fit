import Link from "next/link";
import type { InboxMessage } from "@/lib/email/ionos-imap";
import type { LeadMatch } from "@/lib/email/lead-match";

export type LinkedInboxMessage = InboxMessage & { lead: LeadMatch | null };

const date = (value: string) =>
  new Date(value).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function InboxList({
  messages,
}: {
  messages: LinkedInboxMessage[];
}) {
  if (!messages.length) return <p className="admin-empty">Inbox is empty.</p>;
  return (
    <div className="inbox-list">
      {messages.map((message) => (
        <Link
          href={`/admin/inbox/${message.uid}`}
          prefetch={false}
          className={`inbox-row ${message.unread ? "is-unread" : ""}`}
          key={message.uid}
        >
          <span
            className="inbox-unread"
            aria-label={message.unread ? "Unread" : "Read"}
          />
          <div className="inbox-sender">
            <strong>
              {message.senderName || message.senderEmail || "Unknown sender"}
            </strong>
            {message.senderName && <small>{message.senderEmail}</small>}
          </div>
          <div className="inbox-summary">
            <strong>{message.subject}</strong>
            <span>{message.preview}</span>
            {message.lead ? (
              <small>
                Linked lead: {message.lead.referenceNumber}
                {message.lead.matchCount > 1
                  ? ` (${message.lead.matchCount} matching leads; newest shown)`
                  : ""}
              </small>
            ) : (
              <small>Unlinked email</small>
            )}
          </div>
          <time>{date(message.receivedAt)}</time>
        </Link>
      ))}
    </div>
  );
}
