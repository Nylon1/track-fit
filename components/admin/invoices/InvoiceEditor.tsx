"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  calculateTotals,
  formatGBP,
  lineAmounts,
  parseMoney,
} from "@/lib/invoices/money";
import type { InvoiceInput, InvoiceItem } from "@/lib/invoices/types";
const iso = (d = new Date()) => d.toISOString().slice(0, 10);
const blank = (): InvoiceItem => ({
  description: "",
  quantityMilli: 1000,
  unit: "item",
  unitPricePence: 0,
  discountType: "none",
  discountValue: 0,
  vatRateBps: 0,
  position: 0,
});
export default function InvoiceEditor({
  lead,
  initial,
  id,
}: {
  lead?: any;
  initial?: any;
  id?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false),
    [msg, setMsg] = useState("");
  const [form, setForm] = useState<InvoiceInput>(
    initial || {
      leadId: lead?.id || null,
      status: "draft",
      invoiceType: "full",
      invoiceDate: iso(),
      dueDate: iso(),
      customerName: lead?.full_name || "",
      customerEmail: lead?.email || "",
      customerTelephone: lead?.phone || "",
      billingAddress: { line1: "", postcode: lead?.postcode || "" },
      installationAddress: { line1: "", postcode: lead?.postcode || "" },
      customerReference: lead?.reference_number || "",
      jobDescription: lead
        ? `${lead.property_type} · ${lead.track_type} · ${lead.track_quantity} track(s)`
        : "",
      customerNotes: "",
      internalNotes: "",
      paymentTerms: "Due immediately",
      paymentMessage: "",
      paymentReference: "",
      paymentMethod: "",
      amountPaidPence: 0,
      depositRequiredPence: 0,
      discountType: "none",
      discountValue: 0,
      items: [blank()],
    },
  );
  const totals = useMemo(
    () =>
      calculateTotals(form.items, form.amountPaidPence, {
        type: form.discountType,
        value: form.discountValue,
      }),
    [form.items, form.amountPaidPence, form.discountType, form.discountValue],
  );
  const set = (key: string, value: any) =>
    setForm((x) => ({ ...x, [key]: value }));
  const item = (i: number, key: keyof InvoiceItem, value: any) =>
    setForm((x) => ({
      ...x,
      items: x.items.map((r, n) => (n === i ? { ...r, [key]: value } : r)),
    }));
  const setDiscountType = (
    index: number,
    discountType: InvoiceItem["discountType"],
  ) =>
    setForm((current) => ({
      ...current,
      items: current.items.map((row, rowIndex) =>
        rowIndex === index ? { ...row, discountType, discountValue: 0 } : row,
      ),
    }));
  const save = async () => {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch(
          id ? `/api/admin/invoices/${id}` : "/api/admin/invoices",
          {
            method: id ? "PATCH" : "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(form),
          },
        ),
        json = await res.json();
      if (!res.ok)
        throw new Error(
          json.error +
            (json.issues?.[0]?.message ? `: ${json.issues[0].message}` : ""),
        );
      if (!id) router.push(`/admin/invoices/${json.id}`);
      else {
        setMsg("Draft saved");
        router.refresh();
      }
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Could not save");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="invoice-editor">
      <div className="invoice-toolbar">
        <button className="admin-primary" disabled={busy} onClick={save}>
          {busy ? "Saving…" : id ? "Save draft" : "Generate invoice"}
        </button>
        {id && (
          <>
            <a
              className="admin-secondary"
              target="_blank"
              href={`/api/admin/invoices/${id}/pdf`}
            >
              Preview / PDF
            </a>
            <button className="admin-secondary" onClick={() => window.print()}>
              Print
            </button>
          </>
        )}
        <span>{msg}</span>
      </div>
      <section className="admin-panel">
        <h2>Invoice & customer</h2>
        <div className="invoice-form-grid">
          <label>
            Invoice type
            <select
              value={form.invoiceType}
              onChange={(e) => set("invoiceType", e.target.value)}
            >
              {[
                "full",
                "deposit",
                "balance",
                "part_payment",
                "paid",
                "credit_note",
              ].map((x) => (
                <option key={x} value={x}>
                  {x.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>
          <label>
            Invoice date
            <input
              type="date"
              value={form.invoiceDate}
              onChange={(e) => set("invoiceDate", e.target.value)}
            />
          </label>
          <label>
            Due date
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => set("dueDate", e.target.value)}
            />
          </label>
          <label>
            Customer name
            <input
              value={form.customerName}
              onChange={(e) => set("customerName", e.target.value)}
            />
          </label>
          <label>
            Company
            <input
              value={form.companyName || ""}
              onChange={(e) => set("companyName", e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.customerEmail || ""}
              onChange={(e) => set("customerEmail", e.target.value)}
            />
          </label>
          <label>
            Telephone
            <input
              value={form.customerTelephone || ""}
              onChange={(e) => set("customerTelephone", e.target.value)}
            />
          </label>
          <label>
            Customer reference
            <input
              value={form.customerReference || ""}
              onChange={(e) => set("customerReference", e.target.value)}
            />
          </label>
          <label>
            Purchase order
            <input
              value={form.purchaseOrder || ""}
              onChange={(e) => set("purchaseOrder", e.target.value)}
            />
          </label>
          <label className="wide">
            Billing address
            <textarea
              value={form.billingAddress.line1}
              onChange={(e) =>
                set("billingAddress", {
                  ...form.billingAddress,
                  line1: e.target.value,
                })
              }
            />
          </label>
          <label className="wide">
            Installation address
            <textarea
              value={form.installationAddress.line1}
              onChange={(e) =>
                set("installationAddress", {
                  ...form.installationAddress,
                  line1: e.target.value,
                })
              }
            />
          </label>
          <label className="wide">
            Job description
            <textarea
              value={form.jobDescription || ""}
              onChange={(e) => set("jobDescription", e.target.value)}
            />
          </label>
        </div>
      </section>
      <section className="admin-panel">
        <div className="panel-head">
          <h2>Line items</h2>
          <button
            className="admin-secondary"
            onClick={() =>
              setForm((x) => ({
                ...x,
                items: [
                  ...x.items,
                  {
                    ...blank(),
                    position: x.items.length,
                  },
                ],
              }))
            }
          >
            Add row
          </button>
        </div>
        <div className="invoice-items">
          {form.items.map((r, i) => (
            <div className="invoice-item" key={i}>
              <span className="drag">{i + 1}</span>
              <input
                aria-label="Description"
                placeholder="Description"
                value={r.description}
                onChange={(e) => item(i, "description", e.target.value)}
              />
              <input
                aria-label="Quantity"
                type="number"
                min="0.001"
                step="0.001"
                value={r.quantityMilli / 1000}
                onChange={(e) =>
                  item(
                    i,
                    "quantityMilli",
                    Math.round(Number(e.target.value) * 1000),
                  )
                }
              />
              <input
                aria-label="Unit"
                value={r.unit}
                onChange={(e) => item(i, "unit", e.target.value)}
              />
              <input
                aria-label="Unit price"
                type="number"
                min="0"
                step="0.01"
                value={(r.unitPricePence / 100).toFixed(2)}
                onChange={(e) => {
                  try {
                    item(i, "unitPricePence", parseMoney(e.target.value));
                  } catch {}
                }}
              />
              <select
                aria-label="Discount type"
                value={r.discountType}
                onChange={(e) =>
                  setDiscountType(
                    i,
                    e.currentTarget.value as InvoiceItem["discountType"],
                  )
                }
              >
                <option value="none">No discount</option>
                <option value="percentage">% discount</option>
                <option value="fixed">Fixed £</option>
              </select>
              <input
                aria-label="Discount"
                type="number"
                min="0"
                max={r.discountType === "percentage" ? "100" : undefined}
                step="0.01"
                disabled={r.discountType === "none"}
                placeholder={
                  r.discountType === "percentage" ? "Percent" : "GBP"
                }
                value={
                  r.discountType === "percentage"
                    ? r.discountValue / 100
                    : r.discountType === "fixed"
                      ? r.discountValue / 100
                      : 0
                }
                onChange={(e) => {
                  if (r.discountType === "percentage")
                    item(
                      i,
                      "discountValue",
                      Math.round(Number(e.target.value) * 100),
                    );
                  else if (r.discountType === "fixed") {
                    try {
                      item(i, "discountValue", parseMoney(e.target.value));
                    } catch {}
                  }
                }}
              />
              <output className="line-total" aria-label="Line total">
                {lineAmounts(r).discount > 0 && (
                  <small>−{formatGBP(lineAmounts(r).discount)}</small>
                )}
                {formatGBP(lineAmounts(r).net)}
              </output>
              <button
                aria-label="Move up"
                disabled={!i}
                onClick={() =>
                  setForm((x) => ({
                    ...x,
                    items: x.items
                      .map((y) => y)
                      .toSpliced(i - 1, 2, x.items[i], x.items[i - 1]),
                  }))
                }
              >
                ↑
              </button>
              <button
                aria-label="Delete"
                disabled={form.items.length === 1}
                onClick={() =>
                  setForm((x) => ({
                    ...x,
                    items: x.items.filter((_, n) => n !== i),
                  }))
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>
      <div className="invoice-bottom">
        <section className="admin-panel">
          <h2>Notes & payment</h2>
          <div className="invoice-form-grid">
            <label>
              Terms
              <select
                value={form.paymentTerms || ""}
                onChange={(e) => {
                  set("paymentTerms", e.target.value);
                  const days = Number(e.target.value.match(/\d+/)?.[0] || 0);
                  if (days) {
                    const d = new Date(form.invoiceDate);
                    d.setDate(d.getDate() + days);
                    set("dueDate", iso(d));
                  }
                }}
              >
                <option>Due immediately</option>
                <option>Due in 7 days</option>
                <option>Due in 14 days</option>
                <option>Due in 30 days</option>
                <option>Deposit now, balance on installation</option>
              </select>
            </label>
            <label>
              Amount paid
              <input
                type="number"
                step=".01"
                value={(form.amountPaidPence / 100).toFixed(2)}
                onChange={(e) => {
                  try {
                    set("amountPaidPence", parseMoney(e.target.value));
                  } catch {}
                }}
              />
            </label>
            <label className="wide">
              Payment message
              <textarea
                value={form.paymentMessage || ""}
                onChange={(e) => set("paymentMessage", e.target.value)}
              />
            </label>
            <label className="wide">
              Customer-visible notes
              <textarea
                value={form.customerNotes || ""}
                onChange={(e) => set("customerNotes", e.target.value)}
              />
            </label>
            <label className="wide">
              Internal notes (never on PDF)
              <textarea
                value={form.internalNotes || ""}
                onChange={(e) => set("internalNotes", e.target.value)}
              />
            </label>
          </div>
        </section>
        <section className="admin-panel invoice-totals">
          <h2>Totals</h2>
          <div className="invoice-discount">
            <label>
              Invoice discount
              <select
                value={form.discountType}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    discountType: e.currentTarget
                      .value as InvoiceInput["discountType"],
                    discountValue: 0,
                  }))
                }
              >
                <option value="none">No discount</option>
                <option value="fixed">Fixed £</option>
                <option value="percentage">Percentage</option>
              </select>
            </label>
            <label>
              {form.discountType === "percentage"
                ? "Discount %"
                : "Discount amount"}
              <input
                type="number"
                min="0"
                max={form.discountType === "percentage" ? 100 : undefined}
                step="0.01"
                disabled={form.discountType === "none"}
                value={
                  form.discountType === "percentage"
                    ? form.discountValue / 100
                    : form.discountValue / 100
                }
                onChange={(e) => {
                  if (form.discountType === "percentage")
                    set(
                      "discountValue",
                      Math.round(Number(e.currentTarget.value) * 100),
                    );
                  else if (form.discountType === "fixed") {
                    try {
                      set("discountValue", parseMoney(e.currentTarget.value));
                    } catch {}
                  }
                }}
              />
            </label>
          </div>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatGBP(totals.subtotalPence)}</dd>
            </div>
            <div>
              <dt>Discount</dt>
              <dd>−{formatGBP(totals.discountPence)}</dd>
            </div>
            <div>
              <dt>Net</dt>
              <dd>{formatGBP(totals.netPence)}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{formatGBP(totals.totalPence)}</dd>
            </div>
            <div>
              <dt>Paid</dt>
              <dd>{formatGBP(totals.amountPaidPence)}</dd>
            </div>
            <div className="due">
              <dt>Balance due</dt>
              <dd>{formatGBP(totals.balanceDuePence)}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
