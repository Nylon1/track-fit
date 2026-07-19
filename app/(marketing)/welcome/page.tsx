"use client";

import Image from "next/image";
import {
  motion,
  type Variants,
} from "framer-motion";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

const cinematicEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 30,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,

    transition: {
      duration: 0.85,
      ease: cinematicEase,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.65,
      ease: cinematicEase,
    },
  },
};

export default function WelcomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const postcode =
    searchParams.get("postcode")?.trim() ||
    "your area";

  function startJourney() {
    window.sessionStorage.setItem(
      "trackfit-postcode",
      postcode
    );

    router.push("/quote/property");
  }

  return (
    <main className="tf-welcome-page">
      <div
        className="tf-welcome-background"
        aria-hidden="true"
      />

      <div
        className="tf-welcome-vignette"
        aria-hidden="true"
      />

      <div
        className="tf-welcome-effects"
        aria-hidden="true"
      >
        <motion.div
          className="tf-welcome-orb tf-welcome-orb-primary"
          animate={{
            x: [-45, 55, -45],
            y: [18, -30, 18],
            scale: [1, 1.16, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="tf-welcome-orb tf-welcome-orb-secondary"
          animate={{
            x: [35, -50, 35],
            y: [-20, 35, -20],
            scale: [1.08, 0.92, 1.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="tf-welcome-scan-line"
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: [0, 1, 0.65],
            scaleX: 1,
          }}
          transition={{
            duration: 1.1,
            delay: 0.9,
            ease: cinematicEase,
          }}
        />

        <div className="tf-welcome-particles">
          {Array.from({
            length: 16,
          }).map((_, index) => (
            <span
              key={index}
              style={
                {
                  "--particle-index": index,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <section className="tf-welcome-shell">
        <motion.div
          className="tf-welcome-impact-panel"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="tf-welcome-page-logo"
            variants={itemVariants}
          >
            <Image
              src="/logos/trackfit-logo.svg"
              alt="TrackFit"
              width={300}
              height={93}
              priority
            />
          </motion.div>

          <motion.p
            className="tf-welcome-eyebrow"
            variants={itemVariants}
          >
            Welcome to TrackFit
          </motion.p>

          <motion.h1
            className="tf-welcome-title"
            variants={itemVariants}
          >
            <span>Installation in</span>

            <strong aria-label={postcode}>
              {postcode
                .toUpperCase()
                .split("")
                .map(
                  (
                    character,
                    index
                  ) => (
                    <motion.span
                      key={`${character}-${index}`}
                      initial={{
                        opacity: 0,
                        y: 38,
                        scale: 0.9,
                        filter:
                          "blur(12px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter:
                          "blur(0px)",
                      }}
                      transition={{
                        duration: 0.55,
                        delay:
                          0.48 +
                          index * 0.045,
                        ease:
                          cinematicEase,
                      }}
                      aria-hidden="true"
                    >
                      {character === " "
                        ? "\u00A0"
                        : character}
                    </motion.span>
                  )
                )}
            </strong>
          </motion.h1>

          <motion.p
            className="tf-welcome-description"
            variants={itemVariants}
          >
            We’ll guide you through a few simple
            questions to prepare your installation
            request.
          </motion.p>

          <motion.div
            className="tf-welcome-track-detail"
            variants={itemVariants}
            aria-hidden="true"
          >
            <span />
            <i />
            <i />
            <i />
            <i />
            <i />
          </motion.div>

          <motion.button
            type="button"
            className="tf-welcome-start"
            onClick={startJourney}
            initial={{
              opacity: 0,
              y: 26,
            }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: [
                "0 0 0 rgba(184, 242, 61, 0)",
                "0 0 52px rgba(184, 242, 61, 0.4)",
                "0 0 28px rgba(184, 242, 61, 0.2)",
              ],
            }}
            whileHover={{
              y: -3,
              scale: 1.012,
            }}
            whileTap={{
              scale: 0.985,
            }}
            transition={{
              opacity: {
                duration: 0.5,
                delay: 1.05,
              },

              y: {
                duration: 0.5,
                delay: 1.05,
                ease: cinematicEase,
              },

              boxShadow: {
                duration: 1.25,
                delay: 1.15,
              },
            }}
          >
            <span>
              Start your quotation
            </span>

            <ArrowIcon />
          </motion.button>

          <motion.div
            className="tf-welcome-trust"
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 1.35,
              ease: cinematicEase,
            }}
          >
            <span>
              No payment required
            </span>

            <i />

            <span>
              Free project review
            </span>

            <i />

            <span>
              UK installation specialists
            </span>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 11H18M12.5 5.5L18 11L12.5 16.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}