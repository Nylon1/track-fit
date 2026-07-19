"use client";

import { FormEvent, useState } from "react";
import CardReveal from "./CardReveal";
import Link from "next/link";
type Status =
  | "idle"
  | "checking"
  | "success"
  | "error";

type PostcodeCardProps = {
  onContinue: (postcode: string) => void;
};

export default function PostcodeCard({
  onContinue,
}: PostcodeCardProps) {
  const [postcode, setPostcode] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function formatPostcode(value: string) {
    const cleaned = value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 8);

    if (cleaned.length <= 3) {
      return cleaned;
    }

    return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`;
  }

  function isValidPostcode(value: string) {
    return /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(
      value.trim()
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (status === "success") {
      onContinue(postcode);
      return;
    }

    if (!isValidPostcode(postcode)) {
      setStatus("error");
      return;
    }

    setStatus("checking");

    await wait(1300);

    setStatus("success");
  }

  return (
    <CardReveal>
      <form
        className="tf-postcode-card tf-glass"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="tf-postcode-heading">
          <span>{status === "success" ? "✓" : "01"}</span>

          <div>
            <p>Let&apos;s begin.</p>

            <h2>
              {status === "success"
                ? "We cover your area."
                : "Where will we be installing?"}
            </h2>
          </div>
        </div>

        <label className="tf-postcode-input">
          <LocationIcon />

          <span className="sr-only">UK postcode</span>

          <input
            type="text"
            value={postcode}
            placeholder="BB1 5XX"
            autoComplete="postal-code"
            maxLength={9}
            disabled={status === "checking"}
            onChange={(event) => {
              setPostcode(
                formatPostcode(event.target.value)
              );

              if (
                status === "error" ||
                status === "success"
              ) {
                setStatus("idle");
              }
            }}
          />
        </label>

        <div
          className="tf-postcode-message"
          aria-live="polite"
        >
          {status === "idle" && (
            <span>
              Enter your postcode to check local availability.
            </span>
          )}

          {status === "checking" && (
            <div className="tf-postcode-checking">
              <span>
                Finding your nearest TrackFit specialist
              </span>

              <div
                className="tf-postcode-track"
                aria-hidden="true"
              >
                <i />
              </div>
            </div>
          )}

          {status === "success" && (
            <span className="is-success">
              Great news. TrackFit is available in your
              area.
            </span>
          )}

          {status === "error" && (
            <span className="is-error">
              Enter a complete UK postcode.
            </span>
          )}
        </div>

        <button
          type="submit"
          className="tf-postcode-button"
          disabled={!postcode || status === "checking"}
        >
          {status === "checking"
            ? "Checking availability"
            : status === "success"
              ? "Continue to TrackFit"
              : "Enter TrackFit"}

          <ArrowIcon />
</button>

<Link
  href="/services"
  className="tf-home-learn-more"
>
  Learn more about TrackFit
  <span aria-hidden="true">→</span>
</Link>
</form>
    </CardReveal>
  );
}

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function LocationIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11 19C14.2 15.7 17 12.7 17 9A6 6 0 0 0 5 9c0 3.7 2.8 6.7 6 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="11"
        cy="9"
        r="2.25"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10H16M11 5L16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}