import { describe, it, expect } from "vitest";
import { invoicePdf } from "./pdf";
const settings = {
  business_name: "Apex Curtains Ltd",
  trading_name: "TrackFit",
  business_address: {
    line1: "1 Test Street",
    city: "London",
    postcode: "SW1A 1AA",
  },
  telephone: "020 0000 0000",
  email: "audit@example.test",
  website: "https://example.test",
  company_number: "12345678",
  bank_details: {
    account_name: "Apex Curtains Ltd",
    sort_code: "00-00-00",
    account_number: "00000000",
  },
  payment_instructions: "Use the invoice number as reference.",
  invoice_footer: "Thank you for choosing TrackFit.",
  logo_path: "/logos/trackfit-logo.svg",
};
const invoice = {
  invoice_type: "full",
  invoice_number: "TF-INV-2026-999999",
  invoice_date: "2026-08-05",
  due_date: "2026-08-12",
  customer_reference: "AUDIT-TEST",
  purchase_order: "PO-TEST",
  customer_details: { name: "INVOICE AUDIT TEST", company: "TEST ONLY" },
  billing_address: { line1: "1 Test Street" },
  installation_address: { line1: "2 Test Street" },
  job_description: "Test invoice only",
  subtotal_pence: 25000,
  discount_pence: 0,
  vat_pence: 0,
  total_pence: 25000,
  amount_paid_pence: 0,
  balance_due_pence: 25000,
  payment_terms: "Due in 7 days",
  payment_details: { message: "Test payment message" },
  customer_notes: "Customer-visible test note",
  internal_notes: "MUST NEVER APPEAR",
};
describe("invoice PDF", () => {
  it("creates a readable PDF", () => {
    const b = Buffer.from(
      invoicePdf(
        invoice,
        [
          {
            description: "Supply of Forest KS curtain track",
            quantity_milli: 2000,
            unit_price_pence: 10000,
            vat_rate_bps: 0,
            line_subtotal_pence: 20000,
          },
        ],
        settings,
      ),
    );
    expect(b.subarray(0, 4).toString()).toBe("%PDF");
    expect(b.length).toBeGreaterThan(5000);
    expect(b.toString("latin1")).not.toContain("MUST NEVER APPEAR");
  });
  it("paginates many long rows", () => {
    const items = Array.from({ length: 45 }, (_, i) => ({
      description: `Audit test row ${i + 1} with a deliberately long description for pagination verification`,
      quantity_milli: 1000,
      unit_price_pence: 100,
      vat_rate_bps: 0,
      line_subtotal_pence: 100,
    }));
    const b = Buffer.from(
      invoicePdf(
        {
          ...invoice,
          vat_pence: 0,
          total_pence: 4500,
          balance_due_pence: 4500,
        },
        items,
        settings,
      ),
    );
    const pages = (b.toString("latin1").match(/\/Type \/Page\b/g) || []).length;
    expect(pages).toBeGreaterThan(1);
  });
});
