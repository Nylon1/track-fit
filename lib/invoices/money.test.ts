import { describe, it, expect } from "vitest";
import type { InvoiceItem } from "./types";
import { calculateTotals, parseMoney } from "./money";
const row = (x: Partial<InvoiceItem> = {}): InvoiceItem => ({
  description: "Labour",
  quantityMilli: 1000,
  unit: "item",
  unitPricePence: 10000,
  position: 0,
  ...x,
});
describe("invoice money", () => {
  it("parses pounds without floats", () =>
    expect(parseMoney("10.09")).toBe(1009));
  it("totals one item", () =>
    expect(calculateTotals([row()]).totalPence).toBe(10000));
  it("totals multiple items", () =>
    expect(
      calculateTotals([row(), row({ unitPricePence: 2500 })]).totalPence,
    ).toBe(12500));
  it("keeps totals accurate", () => {
    const totals = calculateTotals([
      row({ quantityMilli: 2000, unitPricePence: 10000 }),
      row({ unitPricePence: 5000 }),
    ]);
    expect(totals.subtotalPence).toBe(25000);
    expect(totals.totalPence).toBe(25000);
  });
  it("calculates part payment balances", () =>
    expect(calculateTotals([row()], 2500).balanceDuePence).toBe(7500));
  it("calculates paid invoices", () =>
    expect(calculateTotals([row()], 10000).balanceDuePence).toBe(0));
  it("rounds decimal quantities to pennies", () =>
    expect(
      calculateTotals([row({ quantityMilli: 333, unitPricePence: 1000 })])
        .totalPence,
    ).toBe(333));
});
