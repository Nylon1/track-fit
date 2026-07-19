"use client";

import Image from "next/image";
import {
  motion,
  type Variants,
} from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const cinematicEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.13,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
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

const statusContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const statusItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -28,
    scale: 0.97,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.62,
      ease: cinematicEase,
    },
  },
};

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
    <main className="tf-complete-page tf-complete-page-cinematic">
      <div
        className="tf-complete-atmosphere"
        aria-hidden="true"
      >
        <motion.div
          className="tf-complete-glow"
          animate={{
            x: [-45, 55, -45],
            y: [18, -28, 18],
            scale: [1, 1.18, 1],
            opacity: [0.55, 0.95, 0.55],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="tf-complete-glow tf-complete-glow-secondary"
          animate={{
            x: [40, -55, 40],
            y: [-18, 34, -18],
            scale: [1.08, 0.92, 1.08],
            opacity: [0.22, 0.48, 0.22],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="tf-complete-impact-ring"
          initial={{
            opacity: 0,
            scale: 0.35,
          }}
          animate={{
            opacity: [0, 0.9, 0],
            scale: [0.35, 1.25, 1.7],
          }}
          transition={{
            duration: 1.45,
            delay: 0.35,
            ease: cinematicEase,
          }}
        />

        <motion.div
          className="tf-complete-impact-line"
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: [0, 1, 0.45],
            scaleX: 1,
          }}
          transition={{
            duration: 1.05,
            delay: 0.48,
            ease: cinematicEase,
          }}
        />

        <div className="tf-complete-particles">
          {Array.from({
            length: 20,
          }).map((_, index) => (
            <span
              key={index}
              style={
                {
                  "--complete-particle":
                    index,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="tf-complete-grain" />
      </div>

      <motion.div
        className="tf-complete-content"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="tf-complete-logo"
          variants={revealVariants}
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
          className="tf-complete-check-wrap"
          variants={revealVariants}
        >
          <motion.div
            className="tf-complete-check-pulse"
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0.5, 1.45, 1.85],
            }}
            transition={{
              duration: 1.25,
              delay: 0.4,
              ease: cinematicEase,
            }}
            aria-hidden="true"
          />

          <motion.div
            className="tf-complete-check"
            initial={{
              scale: 0,
              rotate: -26,
            }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 17,
              delay: 0.35,
            }}
          >
            <motion.div
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: 0.55,
                delay: 0.72,
                ease: cinematicEase,
              }}
            >
              <CheckIcon />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.p
          className="tf-eyebrow"
          variants={revealVariants}
        >
          Request received
        </motion.p>

        <motion.h1 variants={revealVariants}>
          Your installation journey{" "}
          <span className="tf-complete-heading-accent">
            has begun.
          </span>
        </motion.h1>

        <motion.p
          className="tf-complete-description"
          variants={revealVariants}
        >
          A TrackFit specialist will review your
          project and contact you to discuss your
          requirements and quotation.
        </motion.p>

        <motion.div
          className="tf-complete-reference"
          variants={revealVariants}
        >
          <motion.span
            initial={{
              opacity: 0,
              letterSpacing: "0.28em",
            }}
            animate={{
              opacity: 1,
              letterSpacing: "0.14em",
            }}
            transition={{
              duration: 0.7,
              delay: 0.9,
              ease: cinematicEase,
            }}
          >
            Your reference
          </motion.span>

          <motion.strong
            key={reference}
            initial={{
              opacity: 0,
              y: 12,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.55,
              ease: cinematicEase,
            }}
          >
            {reference}
          </motion.strong>

          <motion.div
            className="tf-complete-reference-scan"
            initial={{
              x: "-120%",
            }}
            animate={{
              x: "220%",
            }}
            transition={{
              duration: 1.7,
              delay: 1.15,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />
        </motion.div>

        <motion.div
          className="tf-complete-status"
          variants={statusContainerVariants}
          initial="hidden"
          animate="visible"
        >
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
        </motion.div>

        <motion.button
          type="button"
          className="tf-complete-home"
          onClick={() =>
            router.push("/services")
          }
          variants={revealVariants}
          whileHover={{
            y: -4,
            scale: 1.012,
          }}
          whileTap={{
            scale: 0.98,
          }}
          animate={{
            boxShadow: [
              "0 0 0 rgba(184,242,61,0)",
              "0 0 48px rgba(184,242,61,0.34)",
              "0 0 24px rgba(184,242,61,0.16)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 1.4,
              delay: 1.4,
            },
          }}
        >
          Explore TrackFit services

          <motion.span
            animate={{
              x: [0, 4, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 1.4,
            }}
          >
            <ArrowIcon />
          </motion.span>
        </motion.button>
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
    <motion.article
      className={[
        "tf-complete-status-item",
        complete ? "is-complete" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      variants={statusItemVariants}
      whileHover={{
        x: 4,
      }}
    >
      <motion.span
        initial={{
          scale: 0.75,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.45,
          ease: cinematicEase,
        }}
      >
        {complete ? "✓" : number}
      </motion.span>

      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>

      {complete && (
        <motion.i
          className="tf-complete-status-glow"
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 1,
            ease: cinematicEase,
          }}
          aria-hidden="true"
        />
      )}
    </motion.article>
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
      <motion.path
        d="M8 19.4L15 26L30 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.72,
          ease: cinematicEase,
        }}
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