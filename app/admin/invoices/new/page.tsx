import Link from "next/link";
import { requireTrackfitAdmin } from "@/lib/supabase/server";
import InvoiceEditor from "@/components/admin/invoices/InvoiceEditor";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lead?: string }>;
}) {
  const { lead: id } = await searchParams;
  const { supabase } = await requireTrackfitAdmin();
  const { data: lead } = id
    ? await supabase
        .from("trackfit_enquiries")
        .select("*")
        .eq("id", id)
        .single()
    : { data: null };
  return (
    <>
      <header className="admin-header">
        <div>
          <Link className="back-link" href="/admin/invoices">
            ← Invoices
          </Link>
          <p className="admin-kicker">TrackFit Invoice Generator</p>
          <h1>New invoice</h1>
        </div>
      </header>
      <InvoiceEditor lead={lead} />
    </>
  );
}
