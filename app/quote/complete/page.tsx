"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompletePage() {
  const router = useRouter();

  const [reference, setReference] =
    useState("Preparing reference");

  useEffect(() => {
    const savedReference =
      window.sessionStorage.getItem(
        "trackfit-reference"
      );

    if (savedReference) {
      setReference(savedReference);
    }
  }, []);

  return (
    <main className="tf-complete-page">
      <div
        className="tf-complete-atmosphere"
        aria-hidden="true"
      >
        <div className="tf-complete-glow" />
        <div className="tf-complete-grain" />
      </div>

      <motion.div
        className="tf-complete-content"
        initial={{
          opacity: 0,
          y: 28,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="tf-complete-logo"
          initial={{
            opacity: 0,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.75,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src="/logos/trackfit-logo.svg"
            alt="TrackFit"
            width={320}
            height={100}
            priority
          />
        </motion.div>

        <motion.div
          className="tf-complete-check"
          initial={{
            scale: 0,
            rotate: -18,
          }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 16,
            delay: 0.35,
          }}
        >
          <CheckIcon />
        </motion.div>

        <p className="tf-eyebrow">
          Request received
        </p>

        <h1>
          Your installation journey has begun.
        </h1>

        <p className="tf-complete-description">
          A TrackFit specialist will review your
          project and contact you to discuss your
          requirements and quotation.
        </p>

        <div className="tf-complete-reference">
          <span>Your reference</span>
          <strong>{reference}</strong>
        </div>

        <div className="tf-complete-status">
          <StatusItem
            number="01"
            title="Request received"
            text="Your project details have been recorded."
            complete
          />

          <StatusItem
            number="02"
            title="Specialist review"
            text="Our team will assess your requirements."
          />

          <StatusItem
            number="03"
            title="Contact and quotation"
            text="We will contact you with the next steps."
          />
        </div>

        <button
          type="button"
          className="tf-complete-home"
          onClick={() => router.push("/")}
        >
          Return to TrackFit

          <ArrowIcon />
        </button>
      </motion.div>
    </main>
  );
}

type StatusItemProps = {
  number: string;
  title: string;
  text: string;
  complete?: boolean;
};

function StatusItem({
  number,
  title,
  text,
  complete = false,
}: StatusItemProps) {
  return (
    <article
      className={[
        "tf-complete-status-item",
        complete ? "is-complete" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span>{complete ? "✓" : number}</span>

      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </article>
  );
}

function CheckIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 19.4L15 26L30 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
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
  );
}