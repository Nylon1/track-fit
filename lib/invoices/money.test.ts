import { describe, it, expect } from "vitest";
import type { InvoiceItem } from "./types";
import { calculateTotals, parseMoney } from "./money";
const row = (x: Partial<InvoiceItem> = {}): InvoiceItem => ({
  description: "Labour",
  quantityMilli: 1000,
  unit: "item",
  unitPricePence: 10000,
  discountType: "none",
  discountValue: 0,
  vatRateBps: 0,
  position: 0,
  ...x,
});
describe("invoice money", () => {
  it("parses pounds without floats", () =>
    expect(parseMoney("10.09")).toBe(1009));
  it("totals multiple items", () =>
    expect(
      calculateTotals([row(), row({ unitPricePence: 2500 })]).totalPence,
    ).toBe(12500));
  it("keeps invoices non-VAT", () =>
    expect(calculateTotals([row()]).vatPence).toBe(0));
  it("applies percentage discounts", () =>
    expect(
      calculateTotals([
        row({ discountType: "percentage", discountValue: 1000 }),
      ]).totalPence,
    ).toBe(9000));
  it("applies fixed discounts", () =>
    expect(
      calculateTotals([row({ discountType: "fixed", discountValue: 1500 })])
        .totalPence,
    ).toBe(8500));
  it("applies a £100 invoice discount to £3,136.80", () => {
    const totals = calculateTotals([row({ unitPricePence: 313680 })], 0, {
      type: "fixed",
      value: 10000,
    });
    expect(totals.subtotalPence).toBe(313680);
    expect(totals.discountPence).toBe(10000);
    expect(totals.netPence).toBe(303680);
    expect(totals.totalPence).toBe(303680);
  });
  it("applies a 10% invoice discount to £500", () => {
    const totals = calculateTotals([row({ unitPricePence: 50000 })], 0, {
      type: "percentage",
      value: 1000,
    });
    expect(totals.discountPence).toBe(5000);
    expect(totals.totalPence).toBe(45000);
  });
  it("calculates part payment balances", () =>
    expect(calculateTotals([row()], 2500).balanceDuePence).toBe(7500));
  it("calculates paid invoices", () =>
    expect(calculateTotals([row()], 10000).balanceDuePence).toBe(0));
});
