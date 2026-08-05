import type { InvoiceDiscount, InvoiceItem, Totals } from "./types";
export const formatGBP = (pence: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    pence / 100,
  );
const divRound = (n: number, d: number) => Math.round(n / d);
export function lineAmounts(item: InvoiceItem) {
  const gross = divRound(item.quantityMilli * item.unitPricePence, 1000);
  const discount =
    item.discountType === "percentage"
      ? divRound(gross * item.discountValue, 10000)
      : item.discountType === "fixed"
        ? Math.min(gross, item.discountValue)
        : 0;
  const net = gross - discount,
    vat = 0;
  return { gross, discount, net, vat, total: net + vat };
}
export function calculateTotals(
  items: InvoiceItem[],
  amountPaidPence = 0,
  invoiceDiscount: InvoiceDiscount = { type: "none", value: 0 },
): Totals {
  let subtotalPence = 0,
    discountPence = 0,
    netPence = 0,
    vatPence = 0;
  for (const x of items) {
    const l = lineAmounts(x);
    subtotalPence += l.gross;
    discountPence += l.discount;
    netPence += l.net;
    vatPence += l.vat;
  }
  const invoiceDiscountPence =
    invoiceDiscount.type === "percentage"
      ? divRound(netPence * invoiceDiscount.value, 10000)
      : invoiceDiscount.type === "fixed"
        ? Math.min(netPence, invoiceDiscount.value)
        : 0;
  discountPence += invoiceDiscountPence;
  netPence -= invoiceDiscountPence;
  const totalPence = netPence + vatPence;
  return {
    subtotalPence,
    discountPence,
    netPence,
    vatPence,
    totalPence,
    amountPaidPence,
    balanceDuePence: totalPence - amountPaidPence,
  };
}
export function parseMoney(value: string | number) {
  const s = String(value).trim();
  if (!/^\d+(\.\d{0,2})?$/.test(s)) throw new Error("Invalid money value");
  const [a, b = ""] = s.split(".");
  return Number(a) * 100 + Number(b.padEnd(2, "0"));
}
