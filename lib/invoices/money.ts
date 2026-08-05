import type { InvoiceItem, Totals } from "./types";
export const formatGBP = (pence: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    pence / 100,
  );
const divRound = (n: number, d: number) => Math.round(n / d);
export function lineAmounts(item: InvoiceItem) {
  const subtotal = divRound(item.quantityMilli * item.unitPricePence, 1000);
  return { subtotal, total: subtotal };
}
export function calculateTotals(
  items: InvoiceItem[],
  amountPaidPence = 0,
): Totals {
  let subtotalPence = 0;
  for (const item of items) subtotalPence += lineAmounts(item).subtotal;
  return {
    subtotalPence,
    totalPence: subtotalPence,
    amountPaidPence,
    balanceDuePence: subtotalPence - amountPaidPence,
  };
}
export function parseMoney(value: string | number) {
  const s = String(value).trim();
  if (!/^\d+(\.\d{0,2})?$/.test(s)) throw new Error("Invalid money value");
  const [a, b = ""] = s.split(".");
  return Number(a) * 100 + Number(b.padEnd(2, "0"));
}
