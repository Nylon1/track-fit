import Link from "next/link";
import RealtimeRefresh from "@/components/admin/RealtimeRefresh";
import { fetchInboxSummary } from "@/lib/email/ionos-imap";
import { requireTrackfitAdmin } from "@/lib/supabase/server";
import type { TrackfitEnquiry } from "@/types/admin";

export default async function Dashboard() {
  const { supabase } = await requireTrackfitAdmin();
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const week = new Date(now);
  week.setDate(now.getDate() - 7);
  const [{ data = [] }, inbox] = await Promise.all([
    supabase
      .from("trackfit_enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500),
    fetchInboxSummary(5).catch((error) => {
      console.error(
        "[TrackFit IMAP] Dashboard inbox unavailable:",
        error instanceof Error ? error.message : "Unknown error",
      );
      return null;
    }),
  ]);
  const leads = data as TrackfitEnquiry[];
  const metrics = [
    [
      "New leads today",
      leads.filter((x) => new Date(x.created_at) >= today).length,
    ],
    [
      "New leads this week",
      leads.filter((x) => new Date(x.created_at) >= week).length,
    ],
    ["Awaiting contact", leads.filter((x) => x.status === "new").length],
    [
      "Surveys booked",
      leads.filter((x) => x.status === "survey_booked").length,
    ],
    ["Quotes sent", leads.filter((x) => x.status === "quote_sent").length],
    ["Won jobs", leads.filter((x) => x.status === "won").length],
    [
      "Total quoted value",
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(
        leads.reduce((sum, lead) => sum + Number(lead.quoted_amount || 0), 0),
      ),
    ],
  ];
  return (
    <>
      <RealtimeRefresh />
      <header className="admin-header">
        <div>
          <p className="admin-kicker">TrackFit pipeline</p>
          <h1>Overview</h1>
        </div>
        <Link className="admin-primary" href="/admin/leads">
          Manage leads
        </Link>
      </header>
      <section className="metric-grid">
        {metrics.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>
      <section className="admin-panel inbox-widget">
        <div className="panel-head">
          <div>
            <h2>Inbox</h2>
            <p>
              {inbox
                ? `${inbox.unread} unread message${inbox.unread === 1 ? "" : "s"}`
                : "Inbox temporarily unavailable"}
            </p>
          </div>
          <Link href="/admin/inbox">Open inbox</Link>
        </div>
        {inbox && (
          <div className="latest-list">
            {inbox.messages.map((message) => (
              <Link
                href={`/admin/inbox/${message.uid}`}
                prefetch={false}
                key={message.uid}
              >
                <div>
                  <strong>
                    {message.senderName ||
                      message.senderEmail ||
                      "Unknown sender"}
                  </strong>
                  <span>{message.subject}</span>
                </div>
                <time>
                  {new Date(message.receivedAt).toLocaleString("en-GB", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </time>
              </Link>
            ))}
          </div>
        )}
      </section>
      <section className="admin-panel">
        <div className="panel-head">
          <h2>Latest enquiries</h2>
          <Link href="/admin/leads">View all</Link>
        </div>
        <div className="latest-list">
          {leads.slice(0, 8).map((lead) => (
            <Link href={`/admin/leads/${lead.id}`} key={lead.id}>
              <div>
                <strong>{lead.full_name}</strong>
                <span>
                  {lead.reference_number} · {lead.postcode}
                </span>
              </div>
              <div>
                <span className={`status status-${lead.status}`}>
                  {lead.status.replaceAll("_", " ")}
                </span>
                <time>
                  {new Date(lead.created_at).toLocaleDateString("en-GB")}
                </time>
              </div>
            </Link>
          ))}
          {!leads.length && <p className="admin-empty">No enquiries yet.</p>}
        </div>
      </section>
    </>
  );
}
