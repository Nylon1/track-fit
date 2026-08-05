import { NextResponse } from "next/server";
import { invoiceContext } from "@/lib/invoices/server";
import { invoicePdf } from "@/lib/invoices/pdf";
import { calculateTotals } from "@/lib/invoices/money";
import type { InvoiceItem } from "@/lib/invoices/types";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const ctx = await invoiceContext();
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { id } = await params;
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

  if (!inv || !settings) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const calculationItems: InvoiceItem[] = (items || []).map((item) => ({
    description: item.description,
    quantityMilli: Number(item.quantity_milli),
    unit: item.unit,
    unitPricePence: Number(item.unit_price_pence),
    position: Number(item.position || 0),
  }));

  // Invoice-level discounts are temporarily disabled.
  const totals = calculateTotals(
    calculationItems,
    Number(inv.amount_paid_pence || 0),
  );

  const itemsForPdf = (items || []).map((item) => ({
    ...item,
    discount_type: "none",
    discount_value: 0,
    line_subtotal_pence: Math.round(
      (Number(item.quantity_milli) * Number(item.unit_price_pence)) / 1000,
    ),
  }));
  const invoiceForPdf = {
    ...inv,
    subtotal_pence: totals.subtotalPence,
    discount_pence: 0,
    vat_pence: 0,
    total_pence: totals.totalPence,
    amount_paid_pence: totals.amountPaidPence,
    balance_due_pence: totals.balanceDuePence,
  };

  const pdf = invoicePdf(invoiceForPdf, itemsForPdf, settings as any);

  await ctx.supabase.from("trackfit_invoice_activity").insert({
    invoice_id: id,
    actor_id: ctx.user.id,
    activity_type: "pdf_downloaded",
    description: "PDF downloaded",
  });

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${inv.invoice_number}.pdf"`,
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
