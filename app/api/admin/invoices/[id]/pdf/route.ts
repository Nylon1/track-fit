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
      ctx.supabase
        .from("trackfit_invoices")
        .select("*")
        .eq("id", id)
        .single(),
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

  // Rebuild totals from the persisted invoice items and invoice-level discount.
  // This prevents the PDF from displaying stale totals after a draft is edited.
  const calculationItems: InvoiceItem[] = (items || []).map((item) => ({
    description: item.description,
    quantityMilli: Number(item.quantity_milli),
    unit: item.unit,
    unitPricePence: Number(item.unit_price_pence),
    discountType: item.discount_type,
    discountValue: Number(item.discount_value),
    vatRateBps: Number(item.vat_rate_bps || 0),
    position: Number(item.position || 0),
  }));

  const totals = calculateTotals(
    calculationItems,
    Number(inv.amount_paid_pence || 0),
    {
      type: inv.invoice_discount_type || "none",
      value: Number(inv.invoice_discount_value || 0),
    },
  );

  const invoiceForPdf = {
    ...inv,
    subtotal_pence: totals.subtotalPence,
    discount_pence: totals.discountPence,
    vat_pence: totals.vatPence,
    total_pence: totals.totalPence,
    amount_paid_pence: totals.amountPaidPence,
    balance_due_pence: totals.balanceDuePence,
  };

  const pdf = invoicePdf(invoiceForPdf, items || [], settings as any);

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
