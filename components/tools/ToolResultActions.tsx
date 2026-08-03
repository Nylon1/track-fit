"use client";

import { useEffect, useMemo, useState } from "react";

export type ToolResultRow = {
  label: string;
  value: string;
};

type ToolResultActionsProps = {
  toolName: string;
  resultTitle: string;
  resultValue: string;
  rows?: ToolResultRow[];
  notes?: string[];
  sharePath?: string;
};

function createPlainText({
  toolName,
  resultTitle,
  resultValue,
  rows,
  notes,
}: {
  toolName: string;
  resultTitle: string;
  resultValue: string;
  rows: ToolResultRow[];
  notes: string[];
}) {
  const lines = [
    "TRACKFIT",
    toolName,
    "",
    resultTitle,
    resultValue,
    "",
    ...rows.map((row) => `${row.label}: ${row.value}`),
  ];

  if (notes.length) {
    lines.push("", "Notes", ...notes.map((note) => `- ${note}`));
  }

  lines.push(
    "",
    "Planning estimate only. Final measurements and fixing conditions should be checked before ordering or installation.",
    "",
    "https://curtaintrackfitters.com",
  );

  return lines.join("\n");
}

export function ToolResultActions({
  toolName,
  resultTitle,
  resultValue,
  rows = [],
  notes = [],
  sharePath,
}: ToolResultActionsProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const resultText = useMemo(
    () =>
      createPlainText({
        toolName,
        resultTitle,
        resultValue,
        rows,
        notes,
      }),
    [notes, resultTitle, resultValue, rows, toolName],
  );

  useEffect(() => {
    const url = sharePath
      ? `${window.location.origin}${sharePath}`
      : window.location.href;

    // URL and saved state are browser-only values populated after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentUrl(url);

    const storageKey = `trackfit-tool-result:${toolName}`;
    setSaved(Boolean(window.localStorage.getItem(storageKey)));
  }, [sharePath, toolName]);

  const printResult = () => window.print();

  const saveResult = () => {
    const storageKey = `trackfit-tool-result:${toolName}`;

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        toolName,
        resultTitle,
        resultValue,
        rows,
        notes,
        savedAt: new Date().toISOString(),
        url: currentUrl,
      }),
    );

    setSaved(true);
  };

  const emailResult = () => {
    const subject = encodeURIComponent(
      `${toolName} result- ${resultValue}`,
    );

    const body = encodeURIComponent(
      `${resultText}\n\nOpen tool: ${currentUrl}`,
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareResult = async () => {
    const text = `${toolName}: ${resultValue}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: toolName,
          text,
          url: currentUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(`${text}\n${currentUrl}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Native share can be cancelled by the user.
    }
  };

  const buttonClass =
    "inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.045] px-4 text-sm font-semibold text-[#F4F1E8] transition hover:border-[#B8F23D]/50 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F23D]";

  return (
    <section
      className="tool-result-actions rounded-[26px] border border-white/10 bg-white/[0.035] p-5 print:border-black/15 print:bg-white print:text-black"
      aria-label="Save or share this result"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D] print:text-black">
            Keep this result
          </p>
          <h2 className="mt-2 text-xl font-semibold">
            Save it for later
          </h2>
        </div>

        <p className="text-sm text-[#8F928B] print:text-black/65">
          Print, save, email or share
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 print:hidden">
        <button type="button" onClick={printResult} className={buttonClass}>
          Print / PDF
        </button>

        <button type="button" onClick={saveResult} className={buttonClass}>
          {saved ? "Saved" : "Save result"}
        </button>

        <button type="button" onClick={emailResult} className={buttonClass}>
          Email result
        </button>

        <button type="button" onClick={shareResult} className={buttonClass}>
          {copied ? "Copied" : "Share"}
        </button>
      </div>

      <div className="hidden print:block">
        <div className="mt-6 border-t border-black/15 pt-5">
          <p className="text-sm font-semibold">{toolName}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.16em]">
            {resultTitle}
          </p>
          <p className="mt-1 text-4xl font-bold">{resultValue}</p>

          {rows.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {rows.map((row) => (
                <div
                  key={`${row.label}-${row.value}`}
                  className="border-b border-black/10 pb-2"
                >
                  <dt className="text-black/60">{row.label}</dt>
                  <dd className="font-semibold">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {notes.length > 0 && (
            <ul className="mt-6 space-y-2 text-sm">
              {notes.map((note) => (
                <li key={note}>• {note}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
