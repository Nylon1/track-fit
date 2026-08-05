import { describe, it, expect } from "vitest";
import { invoiceInputSchema } from "./validation";
const valid = () => ({
  status: "draft",
  invoiceType: "full",
  invoiceDate: "2026-08-05",
  dueDate: "2026-08-12",
  customerName: "INVOICE AUDIT TEST",
  customerEmail: "audit@example.test",
  billingAddress: { line1: "1 Test Street" },
  installationAddress: { line1: "1 Test Street" },
  amountPaidPence: 0,
  depositRequiredPence: 0,
  items: [
    {
      description: "Supply of Forest KS curtain track",
      quantityMilli: 1000,
      unit: "item",
      unitPricePence: 10000,
      position: 0,
    },
  ],
});
describe("invoice validation", () => {
  it("accepts valid invoices", () =>
    expect(invoiceInputSchema.safeParse(valid()).success).toBe(true));
  it("strips browser-supplied discount fields", () => {
    const payload: any = valid();
    payload.discountType = "fixed";
    payload.discountValue = 10000;
    payload.items[0].discountType = "percentage";
    payload.items[0].discountValue = 5000;
    const result = invoiceInputSchema.parse(payload) as any;
    expect(result.discountType).toBeUndefined();
    expect(result.discountValue).toBeUndefined();
    expect(result.items[0].discountType).toBeUndefined();
    expect(result.items[0].discountValue).toBeUndefined();
  });
  it("strips browser-supplied VAT fields", () => {
    const x: any = valid();
    x.globalVatRateBps = 2000;
    x.items[0].vatRateBps = 2000;
    const result = invoiceInputSchema.parse(x) as any;
    expect(result.globalVatRateBps).toBeUndefined();
    expect(result.items[0].vatRateBps).toBeUndefined();
  });
  it("rejects missing customer and line items", () => {
    const x: any = valid();
    x.customerName = "";
    x.items = [];
    expect(invoiceInputSchema.safeParse(x).success).toBe(false);
  });
  it("rejects zero and negative quantities and prices", () => {
    for (const value of [0, -1000]) {
      const x = valid();
      x.items[0].quantityMilli = value;
      expect(invoiceInputSchema.safeParse(x).success).toBe(false);
    }
    const x = valid();
    x.items[0].unitPricePence = -1;
    expect(invoiceInputSchema.safeParse(x).success).toBe(false);
  });
  it("rejects invalid email and due date", () => {
    const x = valid();
    x.customerEmail = "bad";
    x.dueDate = "2026-08-04";
    expect(invoiceInputSchema.safeParse(x).success).toBe(false);
  });
  it("rejects excess payment", () => {
    const x = valid();
    x.amountPaidPence = 10001;
    expect(invoiceInputSchema.safeParse(x).success).toBe(false);
  });
});
