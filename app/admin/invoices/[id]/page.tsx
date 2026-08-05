import { notFound } from "next/navigation";
import Link from "next/link";
import { requireTrackfitAdmin } from "@/lib/supabase/server";
import InvoiceEditor from "@/components/admin/invoices/InvoiceEditor";
import InvoiceActions from "@/components/admin/invoices/InvoiceActions";
import { calculateTotals, formatGBP } from "@/lib/invoices/money";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireTrackfitAdmin();
  const [{ data: inv }, { data: items }, { data: activity }] =
    await Promise.all([
      supabase.from("trackfit_invoices").select("*").eq("id", id).single(),
      supabase
        .from("trackfit_invoice_items")
        .select("*")
        .eq("invoice_id", id)
        .order("position"),
      supabase
        .from("trackfit_invoice_activity")
        .select("*")
        .eq("invoice_id", id)
        .order("created_at", { ascending: false }),
    ]);
  if (!inv) notFound();
  const initial = {
    leadId: inv.lead_id,
    status: inv.status,
    invoiceType: inv.invoice_type,
    invoiceDate: inv.invoice_date,
    dueDate: inv.due_date,
    customerName: inv.customer_details.name,
    companyName: inv.customer_details.company || "",
    customerEmail: inv.customer_details.email || "",
    customerTelephone: inv.customer_details.telephone || "",
    billingAddress: inv.billing_address,
    installationAddress: inv.installation_address,
    purchaseOrder: inv.purchase_order || "",
    customerReference: inv.customer_reference || "",
    jobDescription: inv.job_description || "",
    customerNotes: inv.customer_notes || "",
    internalNotes: inv.internal_notes || "",
    paymentTerms: inv.payment_terms || "",
    paymentMessage: inv.payment_details?.message || "",
    paymentReference: inv.payment_details?.reference || "",
    paymentMethod: inv.payment_details?.method || "",
    amountPaidPence: Number(inv.amount_paid_pence),
    depositRequiredPence: Number(
      inv.payment_details?.deposit_required_pence || 0,
    ),
    items: (items || []).map((x: any) => ({
      description: x.description,
      quantityMilli: x.quantity_milli,
      unit: x.unit,
      unitPricePence: Number(x.unit_price_pence),
      position: x.position,
    })),
  };
  const displayedTotals = calculateTotals(
    initial.items,
    initial.amountPaidPence,
  );
  return (
    <>
      <header className="admin-header">
        <div>
          <Link className="back-link" href="/admin/invoices">
            ← Invoices
          </Link>
          <p className="admin-kicker">{inv.status.replaceAll("_", " ")}</p>
          <h1>{inv.invoice_number}</h1>
        </div>
        <div>
          <strong>{formatGBP(displayedTotals.balanceDuePence)}</strong>
          <small> balance due</small>
        </div>
      </header>
      <InvoiceActions
        id={id}
        status={inv.status}
        email={inv.customer_details.email}
      />
      {inv.status === "draft" ? (
        <InvoiceEditor id={id} initial={initial} />
      ) : (
        <section className="admin-panel">
          <h2>Issued invoice</h2>
          <p>
            This invoice is locked. Duplicate it for amendments, or issue a
            credit note for accounting corrections.
          </p>
        </section>
      )}
      <section className="admin-panel">
        <h2>Audit trail</h2>
        <div className="timeline">
          {(activity || []).map((x: any) => (
            <article key={x.id}>
              <i />
              <div>
                <strong>{x.description}</strong>
                <time>{new Date(x.created_at).toLocaleString("en-GB")}</time>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
