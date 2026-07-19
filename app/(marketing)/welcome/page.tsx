"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
export default function WelcomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const postcode =
    searchParams.get("postcode") || "your area";

  return (
    <main className="tf-welcome-placeholder">
      <div className="tf-welcome-page-logo">
  <Image
    src="/logos/trackfit-logo.svg"
    alt="TrackFit"
    width={300}
    height={93}
    priority
  />
</div>
      <p className="tf-eyebrow">
        Welcome to TrackFit
      </p>

      <h1>
        Installation in <span>{postcode}</span>
      </h1>

      <p>
        We’ll guide you through a few simple questions
        to prepare your installation request.
      </p>

      <button
        type="button"
        className="tf-welcome-start"
        onClick={() => router.push("/quote/property")}
      >
        Start your quotation

        <svg
          width="20"
          height="20"
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
      </button>
    </main>
  );
}