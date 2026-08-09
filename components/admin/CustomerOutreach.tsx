"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  outreachTemplate,
  type OutreachLead,
  type OutreachType,
} from "@/lib/leads/outreach";

const actions: { type: OutreachType; label: string }[] = [
  { type: "introduction", label: "Send introduction email" },
  { type: "follow_up", label: "Send follow-up email" },
  { type: "request_photos", label: "Request photos" },
  { type: "request_measurements", label: "Request measurements" },
  { type: "quote_follow_up", label: "Send quote follow-up" },
  { type: "installation_follow_up", label: "Installation follow-up" },
  { type: "custom", label: "Custom email" },
];

type Composer = {
  type: OutreachType;
  subject: string;
  message: string;
};

export default function CustomerOutreach({
  leadId,
  lead,
  lastContacted,
  contactAttempts,
}: {
  leadId: string;
  lead: OutreachLead;
  lastContacted: string | null;
  contactAttempts: number;
}) {
  const router = useRouter();
  const [composer, setComposer] = useState<Composer | null>(null);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const sendingRef = useRef(false);
  const hasEmail = Boolean(lead.email?.trim());

  const open = (type: OutreachType) => {
    if (!hasEmail) return;
    setFeedback("");
    setComposer({ type, ...outreachTemplate(type, lead) });
  };

  const send = async () => {
    if (!composer || !lead.email || sendingRef.current) return;
    if (!window.confirm(`Send this email to ${lead.email}?`)) return;
    sendingRef.current = true;
    setSending(true);
    setFeedback("");
    try {
      const response = await fetch(`/api/admin/leads/${leadId}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...composer,
          requestId: crypto.randomUUID(),
        }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Email could not be sent");
      setComposer(null);
      setFeedback(`Email sent to ${lead.email}`);
      router.refresh();
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Email could not be sent",
      );
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  return (
    <section className="admin-panel outreach-panel">
      <div className="panel-head">
        <div>
          <h2>Customer Outreach</h2>
          <p>Choose a template, review it, then send.</p>
        </div>
        <div className="outreach-stats">
          <span>Last contacted: {lastContacted || "Never"}</span>
          <span>Contact attempts: {contactAttempts}</span>
        </div>
      </div>
      {!hasEmail && (
        <p className="outreach-warning">No customer email address</p>
      )}
      <div className="outreach-actions">
        {actions.map((action) => (
          <button
            type="button"
            key={action.type}
            disabled={!hasEmail}
            onClick={() => open(action.type)}
          >
            {action.label}
          </button>
        ))}
      </div>
      {feedback && (
        <p className="outreach-feedback" role="status">
          {feedback}
        </p>
      )}
      {composer && (
        <div className="outreach-backdrop" role="presentation">
          <div
            className="outreach-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="outreach-title"
          >
            <div className="panel-head">
              <h2 id="outreach-title">Review customer email</h2>
              <button
                type="button"
                onClick={() => setComposer(null)}
                disabled={sending}
              >
                Close
              </button>
            </div>
            <label>
              To
              <input value={lead.email || ""} readOnly />
            </label>
            <label>
              Subject
              <input
                value={composer.subject}
                maxLength={200}
                onChange={(event) =>
                  setComposer({ ...composer, subject: event.target.value })
                }
              />
            </label>
            <label>
              Message
              <textarea
                value={composer.message}
                rows={18}
                maxLength={10_000}
                onChange={(event) =>
                  setComposer({ ...composer, message: event.target.value })
                }
              />
            </label>
            <div className="outreach-dialog-actions">
              <button
                type="button"
                onClick={() => setComposer(null)}
                disabled={sending}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-primary"
                disabled={
                  sending ||
                  !composer.subject.trim() ||
                  !composer.message.trim()
                }
                onClick={send}
              >
                {sending ? "Sending…" : "Send email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
