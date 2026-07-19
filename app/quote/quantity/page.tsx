"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import QuoteProgress from "@/components/quote/QuoteProgress";

type QuantityOption = 1 | 2 | 3 | 4 | "5+";

const options: QuantityOption[] = [1, 2, 3, 4, "5+"];

const cinematicEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.985,
    filter: "blur(10px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.72,
      ease: cinematicEase,
    },
  },
};

const gridVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.09,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.92,
    rotateX: 9,
    filter: "blur(9px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.68,
      ease: cinematicEase,
    },
  },
};

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
      installers:
        "Installer team assessed after review",
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

  function saveAndExit() {
    router.push("/services");
  }

  const selectionText =
    selected === "5+"
      ? "5 or more tracks selected"
      : selected
        ? `${selected} ${
            selected === 1 ? "track" : "tracks"
          } selected`
        : "";

  return (
    <main className="tf-quote-page tf-quote-page-cinematic">
      <div
        className="tf-quote-atmosphere"
        aria-hidden="true"
      >
        <motion.div
          className="tf-quote-light"
          animate={{
            x: [-48, 58, -48],
            y: [14, -30, 14],
            scale: [1, 1.16, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="tf-quote-light tf-quote-light-secondary"
          animate={{
            x: [36, -54, 36],
            y: [-20, 36, -20],
            scale: [1.08, 0.92, 1.08],
            opacity: [0.22, 0.5, 0.22],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="tf-quote-impact-line"
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: [0, 1, 0.5],
            scaleX: 1,
          }}
          transition={{
            duration: 1.05,
            delay: 0.45,
            ease: cinematicEase,
          }}
        />

        <div className="tf-quote-grain" />

        <div className="tf-quote-particles">
          {Array.from({
            length: 14,
          }).map((_, index) => (
            <span
              key={index}
              style={
                {
                  "--quote-particle":
                    index,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <motion.header
        className="tf-quote-header tf-container"
        initial={{
          opacity: 0,
          y: -18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.65,
          ease: cinematicEase,
        }}
      >
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

        <motion.button
          type="button"
          className="tf-quote-exit"
          onClick={saveAndExit}
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          Save and exit
        </motion.button>
      </motion.header>

      <motion.section
        className="tf-quote-shell tf-container"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={revealVariants}>
          <QuoteProgress
            currentStep={3}
            totalSteps={8}
            label="Quantity"
          />
        </motion.div>

        <motion.div
          className="tf-quantity-heading"
          variants={revealVariants}
        >
          <motion.p
            className="tf-eyebrow"
            initial={{
              opacity: 0,
              letterSpacing: "0.44em",
            }}
            animate={{
              opacity: 1,
              letterSpacing: "0.24em",
            }}
            transition={{
              duration: 0.8,
              delay: 0.18,
              ease: cinematicEase,
            }}
          >
            Installation size
          </motion.p>

          <h1>
            How many curtain tracks need{" "}
            <span className="tf-quote-heading-accent">
              installing?
            </span>
          </h1>

          <p>
            Select the total number of individual tracks
            included in this project.
          </p>

          <motion.div
            className="tf-quote-heading-track"
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              duration: 0.85,
              delay: 0.55,
              ease: cinematicEase,
            }}
            aria-hidden="true"
          >
            <span />
            <i />
            <i />
            <i />
            <i />
            <i />
          </motion.div>
        </motion.div>

        <motion.div
          className="tf-quantity-grid"
          variants={gridVariants}
        >
          {options.map((option, index) => {
            const isSelected =
              selected === option;

            return (
              <motion.button
                key={option}
                type="button"
                className={[
                  "tf-quantity-card",
                  isSelected
                    ? "is-selected"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  setSelected(option)
                }
                aria-pressed={isSelected}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                animate={
                  isSelected
                    ? {
                        y: -5,
                        scale: 1.025,
                        boxShadow:
                          "0 0 42px rgba(184,242,61,0.22)",
                      }
                    : {
                        y: 0,
                        scale: 1,
                        boxShadow:
                          "0 0 0 rgba(184,242,61,0)",
                      }
                }
                transition={{
                  duration: 0.32,
                  ease: cinematicEase,
                }}
              >
                <motion.span
                  className="tf-quantity-card-index"
                  initial={{
                    opacity: 0,
                    scale: 0.6,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.4,
                    delay:
                      0.55 +
                      index * 0.08,
                    ease: cinematicEase,
                  }}
                  aria-hidden="true"
                >
                  0{index + 1}
                </motion.span>

                <motion.span
                  className="tf-quantity-number"
                  animate={
                    isSelected
                      ? {
                          scale: [1, 1.12, 1],
                        }
                      : {
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: 0.45,
                    ease: cinematicEase,
                  }}
                >
                  {option}
                </motion.span>

                <span className="tf-quantity-label">
                  {option === 1
                    ? "Track"
                    : "Tracks"}
                </span>

                <motion.span
                  className="tf-quantity-status"
                  animate={
                    isSelected
                      ? {
                          rotate: [0, -12, 0],
                          scale: [1, 1.22, 1],
                        }
                      : {
                          rotate: 0,
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: 0.4,
                    ease: cinematicEase,
                  }}
                >
                  {isSelected ? "✓" : "→"}
                </motion.span>

                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      className="tf-quantity-card-glow"
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: cinematicEase,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="tf-quantity-detail-space">
          <AnimatePresence mode="wait">
            {selectedDetails && (
              <motion.div
                key={selectedDetails.label}
                className="tf-quantity-summary tf-glass"
                initial={{
                  opacity: 0,
                  y: 28,
                  scale: 0.96,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -14,
                  scale: 0.98,
                  filter: "blur(6px)",
                }}
                transition={{
                  duration: 0.5,
                  ease: cinematicEase,
                }}
              >
                <motion.div
                  className="tf-quantity-summary-check"
                  initial={{
                    scale: 0,
                    rotate: -24,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 360,
                    damping: 19,
                  }}
                >
                  ✓
                </motion.div>

                <div>
                  <p>
                    Installation overview
                  </p>

                  <h2>
                    {selectedDetails.label}
                  </h2>

                  <ul>
                    <li>
                      {selectedDetails.duration}
                    </li>

                    <li>
                      {
                        selectedDetails.installers
                      }
                    </li>

                    <li>
                      Final timings are confirmed
                      after reviewing the project.
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="tf-quote-actions"
          variants={revealVariants}
        >
          <motion.button
            type="button"
            className="tf-quote-back"
            onClick={() =>
              router.push("/quote/track")
            }
            whileHover={{
              x: -3,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            ← Back
          </motion.button>

          <div className="tf-quote-action-right">
            <div className="tf-quote-selection">
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div
                    key={String(selected)}
                    className="tf-quote-selection-confirmed"
                    initial={{
                      opacity: 0,
                      x: -14,
                      filter: "blur(6px)",
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      x: 12,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: cinematicEase,
                    }}
                  >
                    <motion.span
                      className="tf-quote-selection-check"
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
                        stiffness: 380,
                        damping: 20,
                      }}
                    >
                      ✓
                    </motion.span>

                    <p>{selectionText}</p>
                  </motion.div>
                ) : (
                  <motion.p
                    key="quantity-empty"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                  >
                    Select one option to continue.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="button"
              className="tf-quote-continue"
              disabled={!selected}
              onClick={continueJourney}
              whileHover={
                selected
                  ? {
                      y: -3,
                      scale: 1.012,
                    }
                  : undefined
              }
              whileTap={
                selected
                  ? {
                      scale: 0.98,
                    }
                  : undefined
              }
              animate={
                selected
                  ? {
                      boxShadow: [
                        "0 0 0 rgba(184,242,61,0)",
                        "0 0 42px rgba(184,242,61,0.3)",
                        "0 0 22px rgba(184,242,61,0.16)",
                      ],
                    }
                  : {
                      boxShadow:
                        "0 0 0 rgba(184,242,61,0)",
                    }
              }
              transition={{
                boxShadow: {
                  duration: 1,
                },
              }}
            >
              Continue

              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                animate={
                  selected
                    ? {
                        x: [0, 4, 0],
                      }
                    : {
                        x: 0,
                      }
                }
                transition={{
                  duration: 1.2,
                  repeat: selected
                    ? Infinity
                    : 0,
                  repeatDelay: 1.2,
                }}
              >
                <path
                  d="M4 10H16M11 5L16 10L11 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}