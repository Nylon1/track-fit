import Link from "next/link";
import { requireTrackfitAdmin } from "@/lib/supabase/server";
import { calculateTotals, formatGBP } from "@/lib/invoices/money";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const p = await searchParams;
  const { supabase } = await requireTrackfitAdmin();
  let q = supabase.from("trackfit_invoices").select("*");
  if (p.status) q = q.eq("status", p.status);
  if (p.overdue === "1")
    q = q
      .lt("due_date", new Date().toISOString().slice(0, 10))
      .gt("balance_due_pence", 0);
  if (p.paid === "1") q = q.eq("balance_due_pence", 0);
  if (p.paid === "0") q = q.gt("balance_due_pence", 0);
  if (p.q) {
    const s = p.q.replace(/[,%()]/g, "");
    q = q.or(
      `invoice_number.ilike.%${s}%,customer_details->>name.ilike.%${s}%`,
    );
  }
  q = q.order(
    p.sort === "due"
      ? "due_date"
      : p.sort === "value"
        ? "total_pence"
        : "created_at",
    { ascending: p.sort === "due" },
  );
  const { data = [] } = await q;
  const rawInvoices = data || [];
  const ids = rawInvoices.map((x) => x.id);
  const { data: itemRows = [] } = ids.length
    ? await supabase
        .from("trackfit_invoice_items")
        .select(
          "invoice_id,description,quantity_milli,unit,unit_price_pence,position",
        )
        .in("invoice_id", ids)
    : { data: [] };
  const invoices = rawInvoices.map((invoice) => {
    const items = (itemRows || [])
      .filter((item) => item.invoice_id === invoice.id)
      .map((item) => ({
        description: item.description,
        quantityMilli: Number(item.quantity_milli),
        unit: item.unit,
        unitPricePence: Number(item.unit_price_pence),
        position: Number(item.position || 0),
      }));
    const totals = calculateTotals(
      items,
      Number(invoice.amount_paid_pence || 0),
    );
    return {
      ...invoice,
      subtotal_pence: totals.subtotalPence,
      discount_pence: 0,
      total_pence: totals.totalPence,
      balance_due_pence: totals.balanceDuePence,
    };
  });
  const today = new Date(),
    month = today.toISOString().slice(0, 7);
  const sum = (rows: any[]) =>
    rows.reduce((n, x) => n + Number(x.balance_due_pence || 0), 0);
  return (
    <>
      <header className="admin-header">
        <div>
          <p className="admin-kicker">Accounts</p>
          <h1>Invoices</h1>
        </div>
        <Link className="admin-primary" href="/admin/invoices/new">
          New invoice
        </Link>
      </header>
      <div className="metric-grid invoice-metrics">
        <article>
          <span>Draft invoices</span>
          <strong>{invoices.filter((x) => x.status === "draft").length}</strong>
        </article>
        <article>
          <span>Outstanding total</span>
          <strong>
            {formatGBP(
              sum(
                invoices.filter(
                  (x) =>
                    x.balance_due_pence > 0 &&
                    !["cancelled", "credited"].includes(x.status),
                ),
              ),
            )}
          </strong>
        </article>
        <article>
          <span>Overdue total</span>
          <strong>
            {formatGBP(
              sum(
                invoices.filter(
                  (x) =>
                    x.due_date < today.toISOString().slice(0, 10) &&
                    x.balance_due_pence > 0,
                ),
              ),
            )}
          </strong>
        </article>
        <article>
          <span>Paid this month</span>
          <strong>
            {formatGBP(
              invoices
                .filter((x) => x.paid_at?.startsWith(month))
                .reduce((n, x) => n + Number(x.total_pence), 0),
            )}
          </strong>
        </article>
        <article>
          <span>Issued this month</span>
          <strong>
            {invoices.filter((x) => x.issued_at?.startsWith(month)).length}
          </strong>
        </article>
      </div>
      <form className="filters invoice-filters">
        <input name="q" defaultValue={p.q} placeholder="Invoice or customer" />
        <select name="status" defaultValue={p.status || ""}>
          <option value="">All statuses</option>
          {[
            "draft",
            "issued",
            "part_paid",
            "paid",
            "overdue",
            "cancelled",
            "credited",
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <select name="paid" defaultValue={p.paid || ""}>
          <option value="">Paid & unpaid</option>
          <option value="1">Paid</option>
          <option value="0">Unpaid</option>
        </select>
        <select name="overdue" defaultValue={p.overdue || ""}>
          <option value="">Any due date</option>
          <option value="1">Overdue only</option>
        </select>
        <select name="sort" defaultValue={p.sort || "newest"}>
          <option value="newest">Newest</option>
          <option value="due">Due date</option>
          <option value="value">Value</option>
        </select>
        <button>Apply</button>
      </form>
      <section className="admin-panel leads-panel">
        <div className="leads-table">
          <div className="invoice-row invoice-head">
            <span>Invoice</span>
            <span>Customer</span>
            <span>Date</span>
            <span>Due</span>
            <span>Status</span>
            <span>Total</span>
            <span>Balance</span>
          </div>
          {invoices.map((x) => (
            <Link
              className="invoice-row"
              key={x.id}
              href={`/admin/invoices/${x.id}`}
            >
              <strong>{x.invoice_number}</strong>
              <span>
                {x.customer_details?.name}
                <small>{x.customer_details?.company}</small>
              </span>
              <span>
                {new Date(x.invoice_date).toLocaleDateString("en-GB")}
              </span>
              <span>{new Date(x.due_date).toLocaleDateString("en-GB")}</span>
              <i className="status">{x.status.replaceAll("_", " ")}</i>
              <span>{formatGBP(x.total_pence)}</span>
              <strong>{formatGBP(x.balance_due_pence)}</strong>
            </Link>
          ))}
        </div>
        {!invoices.length && (
          <p className="admin-empty">No invoices match these filters.</p>
        )}
      </section>
    </>
  );
}
