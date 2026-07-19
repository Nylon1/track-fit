"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import QuoteProgress from "@/components/quote/QuoteProgress";

type QuantityOption = 1 | 2 | 3 | 4 | "5+";

const options: QuantityOption[] = [1, 2, 3, 4, "5+"];

export default function QuantityPage() {
  const router = useRouter();

  const [selected, setSelected] =
    useState<QuantityOption | null>(null);

  const selectedDetails = useMemo(() => {
    if (!selected) {
      return null;
    }

    if (selected === 1) {
      return {
        label: "1 curtain track",
        duration: "Approximately 1–2 hours",
        installers: "Usually 1 installer",
      };
    }

    if (selected === 2) {
      return {
        label: "2 curtain tracks",
        duration: "Approximately 2–3 hours",
        installers: "Usually 1 installer",
      };
    }

    if (selected === 3) {
      return {
        label: "3 curtain tracks",
        duration: "Approximately 3–4 hours",
        installers: "Usually 1 installer",
      };
    }

    if (selected === 4) {
      return {
        label: "4 curtain tracks",
        duration: "Approximately 4–6 hours",
        installers: "One or two installers",
      };
    }

    return {
      label: "5 or more curtain tracks",
      duration: "Half-day or full-day installation",
      installers: "Installer team assessed after review",
    };
  }, [selected]);

  function continueJourney() {
    if (!selected) {
      return;
    }

    window.sessionStorage.setItem(
      "trackfit-track-count",
      String(selected)
    );

    router.push("/quote/photos");
  }

  return (
    <main className="tf-quote-page">
      <div
        className="tf-quote-atmosphere"
        aria-hidden="true"
      >
        <div className="tf-quote-light" />
        <div className="tf-quote-grain" />
      </div>

      <header className="tf-quote-header tf-container">
        <button
          type="button"
          className="tf-quote-logo-button"
          onClick={() => router.push("/")}
          aria-label="TrackFit home"
        >
          <Image
            src="/logos/trackfit-logo.svg"
            alt="TrackFit"
            width={240}
            height={72}
            priority
            className="tf-quote-logo"
          />
        </button>

        <button
          type="button"
          className="tf-quote-exit"
          onClick={() => router.push("/")}
        >
          Save and exit
        </button>
      </header>

      <section className="tf-quote-shell tf-container">
        <QuoteProgress
          currentStep={3}
          totalSteps={8}
          label="Quantity"
        />

        <motion.div
          className="tf-quantity-heading"
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="tf-eyebrow">
            Installation size
          </p>

          <h1>
            How many curtain tracks need installing?
          </h1>

          <p>
            Select the total number of individual tracks
            included in this project.
          </p>
        </motion.div>

        <motion.div
          className="tf-quantity-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.09,
              },
            },
          }}
        >
          {options.map((option) => {
            const isSelected = selected === option;

            return (
              <motion.button
                key={option}
                type="button"
                className={[
                  "tf-quantity-card",
                  isSelected ? "is-selected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setSelected(option)}
                aria-pressed={isSelected}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 28,
                    scale: 0.96,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  },
                }}
                whileHover={{
                  y: -7,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="tf-quantity-number">
                  {option}
                </span>

                <span className="tf-quantity-label">
                  {option === 1
                    ? "Track"
                    : option === "5+"
                      ? "Tracks"
                      : "Tracks"}
                </span>

                <span className="tf-quantity-status">
                  {isSelected ? "✓" : "→"}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="tf-quantity-detail-space">
          {selectedDetails && (
            <motion.div
              className="tf-quantity-summary tf-glass"
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="tf-quantity-summary-check">
                ✓
              </div>

              <div>
                <p>Installation overview</p>

                <h2>{selectedDetails.label}</h2>

                <ul>
                  <li>{selectedDetails.duration}</li>
                  <li>{selectedDetails.installers}</li>
                  <li>
                    Final timings are confirmed after
                    reviewing the project.
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>

        <div className="tf-quote-actions">
          <button
            type="button"
            className="tf-quote-back"
            onClick={() => router.push("/quote/track")}
          >
            ← Back
          </button>

          <div className="tf-quote-action-right">
            <div className="tf-quote-selection">
              {selected ? (
                <>
                  <span className="tf-quote-selection-check">
                    ✓
                  </span>

                  <p>
                    {selected === "5+"
                      ? "5 or more tracks selected"
                      : `${selected} ${
                          selected === 1
                            ? "track"
                            : "tracks"
                        } selected`}
                  </p>
                </>
              ) : (
                <p>Select one option to continue.</p>
              )}
            </div>

            <button
              type="button"
              className="tf-quote-continue"
              disabled={!selected}
              onClick={continueJourney}
            >
              Continue

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
          </div>
        </div>
      </section>
    </main>
  );
}