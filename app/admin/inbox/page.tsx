import Link from "next/link";
import InboxList, {
  type LinkedInboxMessage,
} from "@/components/admin/inbox/InboxList";
import { enrichInboxMessages } from "@/lib/email/inbox-data";
import { fetchInboxPage, ImapConfigurationError } from "@/lib/email/ionos-imap";
import { requireTrackfitAdmin } from "@/lib/supabase/server";

export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { supabase } = await requireTrackfitAdmin("/admin/inbox");
  const page = Math.max(1, Number((await searchParams).page) || 1);
  let inbox: {
    total: number;
    hasMore: boolean;
    messages: LinkedInboxMessage[];
  } | null = null;
  let loadError: unknown = null;
  try {
    const result = await fetchInboxPage(page, 25);
    inbox = {
      ...result,
      messages: await enrichInboxMessages(supabase, result.messages),
    };
  } catch (error) {
    loadError = error;
    console.error(
      "[TrackFit IMAP] Inbox page unavailable:",
      error instanceof Error ? error.message : "Unknown error",
    );
  }

  if (!inbox) {
    return (
      <>
        <header className="admin-header">
          <div>
            <p className="admin-kicker">IONOS mailbox</p>
            <h1>Inbox</h1>
          </div>
        </header>
        <section className="admin-panel inbox-error">
          <h2>
            {loadError instanceof ImapConfigurationError
              ? "Inbox configuration required"
              : "Inbox temporarily unavailable"}
          </h2>
          <p>
            {loadError instanceof ImapConfigurationError
              ? "Configure the IONOS IMAP environment variables in the server environment."
              : "The IONOS mailbox could not be reached. Please retry shortly."}
          </p>
          <Link className="admin-primary" href="/admin/inbox">
            Retry
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <header className="admin-header">
        <div>
          <p className="admin-kicker">IONOS mailbox</p>
          <h1>Inbox</h1>
        </div>
        <span>{inbox.total} messages</span>
      </header>
      <section className="admin-panel inbox-panel">
        <InboxList messages={inbox.messages} />
      </section>
      <nav className="pagination">
        <Link aria-disabled={page <= 1} href={{ query: { page: page - 1 } }}>
          Previous
        </Link>
        <span>Page {page}</span>
        <Link
          aria-disabled={!inbox.hasMore}
          href={{ query: { page: page + 1 } }}
        >
          Load more
        </Link>
      </nav>
    </>
  );
}
