import { NextResponse } from "next/server";
import { invoiceContext, dbInvoice } from "@/lib/invoices/server";
import { invoiceInputSchema } from "@/lib/invoices/validation";
import { calculateTotals, lineAmounts } from "@/lib/invoices/money";
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const ctx = await invoiceContext();
  if (!ctx)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { id } = await params;
  const { data: old } = await ctx.supabase
    .from("trackfit_invoices")
    .select("status")
    .eq("id", id)
    .single();
  if (!old) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (old.status !== "draft")
    return NextResponse.json(
      {
        error:
          "Issued invoices are immutable; duplicate or credit this invoice.",
      },
      { status: 409 },
    );
  const p = invoiceInputSchema.safeParse(await req.json());
  if (!p.success)
    return NextResponse.json(
      { error: "Invalid invoice", issues: p.error.issues },
      { status: 400 },
    );
  const totals = calculateTotals(p.data.items, p.data.amountPaidPence, {
    type: p.data.discountType,
    value: p.data.discountValue,
  });
  const { error } = await ctx.supabase
    .from("trackfit_invoices")
    .update(dbInvoice(p.data, totals))
    .eq("id", id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  await ctx.supabase
    .from("trackfit_invoice_items")
    .delete()
    .eq("invoice_id", id);
  await ctx.supabase.from("trackfit_invoice_items").insert(
    p.data.items.map((x, i) => ({
      invoice_id: id,
      position: i,
      description: x.description,
      quantity_milli: x.quantityMilli,
      unit: x.unit,
      unit_price_pence: x.unitPricePence,
      discount_type: x.discountType,
      discount_value: x.discountValue,
      vat_rate_bps: x.vatRateBps,
      line_subtotal_pence: lineAmounts(x).net,
    })),
  );
  await ctx.supabase.from("trackfit_invoice_activity").insert({
    invoice_id: id,
    actor_id: ctx.user.id,
    activity_type: "updated",
    description: "Draft updated",
  });
  return NextResponse.json({ success: true });
}
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const ctx = await invoiceContext();
  if (!ctx)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { id } = await params;
  const { data } = await ctx.supabase
    .from("trackfit_invoices")
    .select("status")
    .eq("id", id)
    .single();
  if (data?.status !== "draft")
    return NextResponse.json(
      { error: "Only drafts can be deleted" },
      { status: 409 },
    );
  const { error } = await ctx.supabase
    .from("trackfit_invoices")
    .delete()
    .eq("id", id);
  return error
    ? NextResponse.json({ error: error.message }, { status: 400 })
    : NextResponse.json({ success: true });
}
