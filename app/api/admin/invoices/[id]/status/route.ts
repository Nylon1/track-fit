import { NextResponse } from "next/server";
import { invoiceContext } from "@/lib/invoices/server";
import { canTransition } from "@/lib/invoices/status";
import type { InvoiceStatus } from "@/lib/invoices/types";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const ctx = await invoiceContext();
  if (!ctx)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { id } = await params,
    { status } = (await req.json()) as { status: InvoiceStatus };
  const { data: invoice } = await ctx.supabase
    .from("trackfit_invoices")
    .select("status,total_pence")
    .eq("id", id)
    .single();
  if (!invoice)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!canTransition(invoice.status as InvoiceStatus, status))
    return NextResponse.json(
      { error: `Invalid transition from ${invoice.status} to ${status}` },
      { status: 409 },
    );
  const now = new Date().toISOString(),
    update: Record<string, unknown> = { status, updated_at: now };
  if (status === "issued") update.issued_at = now;
  if (status === "paid") {
    update.paid_at = now;
    update.amount_paid_pence = invoice.total_pence;
    update.balance_due_pence = 0;
  }
  if (status === "cancelled") update.cancelled_at = now;
  const { error } = await ctx.supabase
    .from("trackfit_invoices")
    .update(update)
    .eq("id", id)
    .eq("status", invoice.status);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  await ctx.supabase
    .from("trackfit_invoice_activity")
    .insert({
      invoice_id: id,
      actor_id: ctx.user.id,
      activity_type: status,
      description: status === "paid" ? "Marked paid" : `Invoice ${status}`,
      metadata: { previous_status: invoice.status },
    });
  return NextResponse.json({ success: true });
}
