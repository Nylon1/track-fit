import Link from "next/link";

export type ConversationItem = {
  id: string;
  direction: "inbound" | "outbound";
  subject: string;
  timestamp: string;
  inboxUid?: number;
};

const date = (value: string) =>
  new Date(value).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function LeadEmailConversation({
  items,
  unavailable = false,
}: {
  items: ConversationItem[];
  unavailable?: boolean;
}) {
  return (
    <section className="admin-panel conversation-panel">
      <div className="panel-head">
        <h2>Email Conversation</h2>
        <Link href="/admin/inbox">Open inbox</Link>
      </div>
      {unavailable && (
        <p className="inbox-inline-warning">
          Incoming email is temporarily unavailable. Outgoing activity is still
          shown.
        </p>
      )}
      <div className="conversation-list">
        {items.map((item) => {
          const content = (
            <>
              <span className={`conversation-direction is-${item.direction}`}>
                {item.direction === "inbound"
                  ? "Customer → TrackFit"
                  : "TrackFit → Customer"}
              </span>
              <strong>{item.subject}</strong>
              <time>{date(item.timestamp)}</time>
            </>
          );
          return item.inboxUid ? (
            <Link
              href={`/admin/inbox/${item.inboxUid}`}
              prefetch={false}
              key={item.id}
            >
              {content}
            </Link>
          ) : (
            <article key={item.id}>{content}</article>
          );
        })}
        {!items.length && (
          <p className="admin-empty">No customer email activity yet.</p>
        )}
      </div>
    </section>
  );
}
