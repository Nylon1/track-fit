import { NextResponse } from "next/server";
import { Resend } from "resend";
import { invoiceContext } from "@/lib/invoices/server";
import { invoicePdf } from "@/lib/invoices/pdf";
import { calculateTotals, formatGBP } from "@/lib/invoices/money";
import type { InvoiceItem } from "@/lib/invoices/types";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const ctx = await invoiceContext();
  if (!ctx)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { id } = await params,
    { recipient, subject, message } = await req.json();
  if (!recipient)
    return NextResponse.json(
      { error: "Customer email is missing" },
      { status: 400 },
    );
  const [{ data: inv }, { data: items }, { data: settings }] =
    await Promise.all([
      ctx.supabase.from("trackfit_invoices").select("*").eq("id", id).single(),
      ctx.supabase
        .from("trackfit_invoice_items")
        .select("*")
        .eq("invoice_id", id)
        .order("position"),
      ctx.supabase
        .from("trackfit_invoice_settings")
        .select("*")
        .eq("id", true)
        .single(),
    ]);
  if (!inv || !settings)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    await logFailure(ctx, id, "Email failed: Resend is not configured");
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured" },
      { status: 503 },
    );
  }
  const calculationItems: InvoiceItem[] = (items || []).map((item) => ({
    description: item.description,
    quantityMilli: Number(item.quantity_milli),
    unit: item.unit,
    unitPricePence: Number(item.unit_price_pence),
    position: Number(item.position || 0),
  }));
  const totals = calculateTotals(
    calculationItems,
    Number(inv.amount_paid_pence || 0),
  );
  const customerInvoice = {
    ...inv,
    subtotal_pence: totals.subtotalPence,
    discount_pence: 0,
    vat_pence: 0,
    total_pence: totals.totalPence,
    balance_due_pence: totals.balanceDuePence,
  };
  const customerItems = (items || []).map((item) => ({
    ...item,
    discount_type: "none",
    discount_value: 0,
    line_subtotal_pence: Math.round(
      (Number(item.quantity_milli) * Number(item.unit_price_pence)) / 1000,
    ),
  }));
  const pdf = Buffer.from(invoicePdf(customerInvoice, customerItems, settings));
  const from = process.env.RESEND_FROM_EMAIL || settings.email;
  if (!from)
    return NextResponse.json(
      { error: "Sender email is not configured" },
      { status: 503 },
    );
  const { error } = await new Resend(key).emails.send({
    from,
    to: recipient,
    subject: subject || `TrackFit invoice ${inv.invoice_number}`,
    replyTo: settings.email || undefined,
    html: `<p>Dear ${escapeHtml(inv.customer_details.name)},</p><p>${escapeHtml(message || `Please find attached invoice ${inv.invoice_number} for ${formatGBP(totals.balanceDuePence)}, due ${inv.due_date}.`)}</p><p>${escapeHtml(settings.trading_name)}<br>${escapeHtml(settings.telephone)}<br>${escapeHtml(settings.email)}</p><p><small>TrackFit is a trading name operated by Apex Curtains Ltd.</small></p>`,
    attachments: [{ filename: `${inv.invoice_number}.pdf`, content: pdf }],
  });
  if (error) {
    await logFailure(ctx, id, "Invoice email failed");
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  await ctx.supabase.from("trackfit_invoice_activity").insert({
    invoice_id: id,
    actor_id: ctx.user.id,
    activity_type: "emailed",
    description: `Invoice emailed to ${recipient}`,
    metadata: { recipient, subject, send_date: new Date().toISOString() },
  });
  return NextResponse.json({ success: true });
}
function escapeHtml(value: unknown) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c]!,
  );
}
async function logFailure(
  ctx: Awaited<ReturnType<typeof invoiceContext>> & {},
  invoiceId: string,
  description: string,
) {
  if (!ctx) return;
  await ctx.supabase.from("trackfit_invoice_activity").insert({
    invoice_id: invoiceId,
    actor_id: ctx.user.id,
    activity_type: "email_failed",
    description,
    metadata: { failed_at: new Date().toISOString() },
  });
}
