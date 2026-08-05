import { jsPDF } from "jspdf";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { formatGBP } from "./money";
import type { InvoiceSettings } from "./types";
const text = (v: any) => String(v ?? "");
const addr = (a: any) =>
  [a?.line1, a?.line2, a?.city, a?.county, a?.postcode]
    .filter(Boolean)
    .join("\n");
export function invoicePdf(inv: any, items: any[], s: InvoiceSettings) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const logo = readFileSync(join(process.cwd(), "app", "icon.png")).toString(
    "base64",
  );
  let page = 1,
    y = 18;
  const header = () => {
    doc.setFillColor(11, 14, 11);
    doc.rect(0, 0, 210, 30, "F");
    doc.addImage(`data:image/png;base64,${logo}`, "PNG", 16, 4, 22, 22);
    doc.setTextColor(184, 242, 61);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("TRACKFIT", 42, 19);
    doc.setTextColor(255);
    doc.setFontSize(24);
    doc.text(
      inv.invoice_type === "credit_note" ? "CREDIT NOTE" : "INVOICE",
      194,
      19,
      { align: "right" },
    );
    doc.setTextColor(20);
    y = 42;
  };
  const footer = () => {
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(
      "TrackFit is a trading name operated by Apex Curtains Ltd.",
      16,
      282,
    );
    doc.text(s.invoice_footer || "Thank you for choosing TrackFit.", 16, 287);
    doc.text(`Page ${page}`, 194, 287, { align: "right" });
  };
  const newPage = () => {
    footer();
    doc.addPage();
    page++;
    header();
  };
  header();
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    `${s.trading_name || s.business_name}\n${addr(s.business_address)}\n${s.telephone}  ${s.email}\n${s.website}`,
    16,
    y,
  );
  doc.text(
    `Invoice number: ${inv.invoice_number}\nInvoice date: ${inv.invoice_date}\nDue date: ${inv.due_date}\nReference: ${text(inv.customer_reference)}\nPO number: ${text(inv.purchase_order)}`,
    194,
    y,
    { align: "right" },
  );
  y = 76;
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO", 16, y);
  doc.text("INSTALLATION ADDRESS", 108, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    `${inv.customer_details?.name || ""}\n${inv.customer_details?.company || ""}\n${addr(inv.billing_address)}`,
    16,
    y + 6,
  );
  doc.text(addr(inv.installation_address), 108, y + 6);
  y = 112;
  if (inv.job_description) {
    doc.setFont("helvetica", "bold");
    doc.text("JOB DESCRIPTION", 16, y);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(inv.job_description, 178);
    doc.text(lines, 16, y + 6);
    y += 10 + lines.length * 4;
  }
  const tableHead = () => {
    doc.setFillColor(235, 239, 232);
    doc.rect(16, y, 178, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Description", 18, y + 5.5);
    doc.text("Qty", 122, y + 5.5, { align: "right" });
    doc.text("Unit price", 154, y + 5.5, { align: "right" });
    doc.text("Line total", 192, y + 5.5, { align: "right" });
    y += 11;
  };
  tableHead();
  doc.setFont("helvetica", "normal");
  for (const i of items) {
    const lines = doc.splitTextToSize(i.description, 88);
    const h = Math.max(8, lines.length * 4 + 3);
    if (y + h > 250) {
      newPage();
      tableHead();
    }
    doc.text(lines, 18, y + 4);
    doc.text((i.quantity_milli / 1000).toString(), 122, y + 4, {
      align: "right",
    });
    doc.text(formatGBP(i.unit_price_pence), 154, y + 4, { align: "right" });
    doc.text(formatGBP(i.line_subtotal_pence), 192, y + 4, { align: "right" });
    doc.line(16, y + h, 194, y + h);
    y += h;
  }
  if (y > 220) newPage();
  y += 8;
  const total = (label: string, value: number, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.text(label, 145, y, { align: "right" });
    doc.text(formatGBP(value), 194, y, { align: "right" });
    y += 7;
  };
  total("Subtotal", inv.subtotal_pence);
  total("Total", inv.total_pence, true);
  total("Amount paid", -inv.amount_paid_pence);
  total("BALANCE DUE", inv.balance_due_pence, true);
  y += 4;
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("PAYMENT", 16, y);
  doc.setFont("helvetica", "normal");
  doc.text(
    doc.splitTextToSize(
      `${inv.payment_terms || ""}\n${inv.payment_details?.message || ""}\n${s.payment_instructions || ""}\nAccount: ${s.bank_details?.account_name || ""}  Sort code: ${s.bank_details?.sort_code || ""}  Account no: ${s.bank_details?.account_number || ""}`,
      115,
    ),
    16,
    y + 6,
  );
  if (inv.customer_notes) {
    doc.setFont("helvetica", "bold");
    doc.text("NOTES", 16, y + 31);
    doc.setFont("helvetica", "normal");
    doc.text(doc.splitTextToSize(inv.customer_notes, 178), 16, y + 37);
  }
  footer();
  return doc.output("arraybuffer");
}
