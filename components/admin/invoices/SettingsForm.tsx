"use client";
import { useState } from "react";
export default function SettingsForm({ initial }: any) {
  const [s, setS] = useState(initial),
    [msg, setMsg] = useState("");
  const upd = (k: string, v: any) => setS((x: any) => ({ ...x, [k]: v }));
  return (
    <form
      className="admin-panel invoice-settings"
      onSubmit={async (e) => {
        e.preventDefault();
        setMsg("Saving…");
        const r = await fetch("/api/admin/invoice-settings", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(s),
          }),
          j = await r.json();
        setMsg(r.ok ? "Settings saved" : j.error);
      }}
    >
      <p>
        TrackFit is a trading name operated by Apex Curtains Ltd. Bank details
        are protected by administrator-only access.
      </p>
      <div className="invoice-form-grid">
        <label>
          Legal business name
          <input value={s.business_name || "Apex Curtains Ltd"} readOnly />
        </label>
        <label>
          Trading name
          <input value={s.trading_name || "TrackFit"} readOnly />
        </label>
        {[
          ["telephone", "Telephone"],
          ["email", "Email"],
          ["website", "Website"],
          ["company_number", "Company number"],
          ["logo_path", "Logo path"],
        ].map(([k, l]) => (
          <label key={k}>
            {l}
            <input
              value={s[k] || ""}
              onChange={(e) => upd(k, e.target.value)}
            />
          </label>
        ))}
        <label className="wide">
          Registered address
          <textarea
            value={s.business_address?.line1 || ""}
            onChange={(e) =>
              upd("business_address", {
                ...s.business_address,
                line1: e.target.value,
              })
            }
          />
        </label>
        <label>
          Bank account name
          <input
            value={s.bank_details?.account_name || "Apex Curtains Ltd"}
            onChange={(e) =>
              upd("bank_details", {
                ...s.bank_details,
                account_name: e.target.value,
              })
            }
          />
        </label>
        <label>
          Sort code
          <input
            value={s.bank_details?.sort_code || ""}
            onChange={(e) =>
              upd("bank_details", {
                ...s.bank_details,
                sort_code: e.target.value,
              })
            }
          />
        </label>
        <label>
          Account number
          <input
            value={s.bank_details?.account_number || ""}
            onChange={(e) =>
              upd("bank_details", {
                ...s.bank_details,
                account_number: e.target.value,
              })
            }
          />
        </label>
        <label className="wide">
          Payment instructions
          <textarea
            value={s.payment_instructions || ""}
            onChange={(e) => upd("payment_instructions", e.target.value)}
          />
        </label>
        <label className="wide">
          Invoice footer
          <textarea
            value={s.invoice_footer || ""}
            onChange={(e) => upd("invoice_footer", e.target.value)}
          />
        </label>
      </div>
      <button className="admin-primary">Save settings</button>{" "}
      <span>{msg}</span>
    </form>
  );
}
