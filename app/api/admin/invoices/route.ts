import { NextResponse } from "next/server";
import { invoiceContext, dbInvoice } from "@/lib/invoices/server";
import { invoiceInputSchema } from "@/lib/invoices/validation";
import { calculateTotals, lineAmounts } from "@/lib/invoices/money";
export async function POST(req: Request) {
  const ctx = await invoiceContext();
  if (!ctx)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const parsed = invoiceInputSchema.safeParse(await req.json());
  if (!parsed.success)
    return NextResponse.json(
      { error: "Invalid invoice", issues: parsed.error.issues },
      { status: 400 },
    );
  const input = parsed.data,
    totals = calculateTotals(input.items, input.amountPaidPence, {
      type: input.discountType,
      value: input.discountValue,
    });
  const { data: number, error: nerr } = await ctx.supabase.rpc(
    "next_trackfit_invoice_number",
  );
  if (nerr)
    return NextResponse.json(
      { error: "Could not allocate invoice number" },
      { status: 500 },
    );
  const { data, error } = await ctx.supabase
    .from("trackfit_invoices")
    .insert({
      ...dbInvoice(input, totals),
      invoice_number: number,
      created_by: ctx.user.id,
    })
    .select("id,invoice_number")
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  const items = input.items.map((x, i) => {
    const l = lineAmounts(x);
    return {
      invoice_id: data.id,
      position: i,
      description: x.description,
      quantity_milli: x.quantityMilli,
      unit: x.unit,
      unit_price_pence: x.unitPricePence,
      discount_type: x.discountType,
      discount_value: x.discountValue,
      vat_rate_bps: x.vatRateBps,
      line_subtotal_pence: l.net,
    };
  });
  const { error: ie } = await ctx.supabase
    .from("trackfit_invoice_items")
    .insert(items);
  if (ie) {
    await ctx.supabase.from("trackfit_invoices").delete().eq("id", data.id);
    return NextResponse.json({ error: ie.message }, { status: 400 });
  }
  await ctx.supabase.from("trackfit_invoice_activity").insert({
    invoice_id: data.id,
    actor_id: ctx.user.id,
    activity_type: "created",
    description: "Invoice created",
  });
  return NextResponse.json(data, { status: 201 });
}
