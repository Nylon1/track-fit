"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

type CurtainTransitionProps = {
  active: boolean;
};

const curtainEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

export default function CurtainTransition({
  active,
}: CurtainTransitionProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="tf-curtain-transition"
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          aria-hidden="true"
        >
          <motion.div
            className="tf-curtain-darkening"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.28,
            }}
          />

          <motion.div
            className="
              tf-curtain-panel
              tf-curtain-panel-left
            "
            initial={{
              x: "-101%",
            }}
            animate={{
              x: ["-101%", "2%", "0%"],
            }}
            transition={{
              duration: 0.92,
              times: [0, 0.88, 1],
              ease: curtainEase,
            }}
          >
            <CurtainFolds side="left" />
          </motion.div>

          <motion.div
            className="
              tf-curtain-panel
              tf-curtain-panel-right
            "
            initial={{
              x: "101%",
            }}
            animate={{
              x: ["101%", "-2%", "0%"],
            }}
            transition={{
              duration: 0.92,
              times: [0, 0.88, 1],
              ease: curtainEase,
            }}
          >
            <CurtainFolds side="right" />
          </motion.div>

          <motion.div
            className="tf-transition-impact-flash"
            initial={{
              opacity: 0,
              scaleX: 0.3,
            }}
            animate={{
              opacity: [0, 1, 0.45],
              scaleX: [0.3, 1.35, 1],
            }}
            transition={{
              duration: 0.42,
              delay: 0.82,
              ease: curtainEase,
            }}
          />

          <motion.div
            className="tf-transition-centre-seam"
            initial={{
              opacity: 0,
              scaleY: 0.12,
            }}
            animate={{
              opacity: [0, 1, 0.7],
              scaleY: [0.12, 1, 1],
            }}
            transition={{
              duration: 0.48,
              delay: 0.88,
              ease: curtainEase,
            }}
          />

          <motion.div
            className="tf-transition-content"
            initial={{
              opacity: 0,
              y: 18,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.48,
              delay: 1.08,
              ease: curtainEase,
            }}
          >
            <motion.p
              className="tf-transition-tagline"
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.42,
                delay: 1.12,
                ease: curtainEase,
              }}
            >
              Precision fitted.
              <span>
                Beautifully finished.
              </span>
            </motion.p>

            <motion.div
              className="tf-transition-track"
              initial={{
                opacity: 0,
                scaleX: 0.08,
              }}
              animate={{
                opacity: 1,
                scaleX: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 1.24,
                ease: curtainEase,
              }}
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
            className="tf-transition-particles"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 1.2,
              delay: 0.82,
            }}
          >
            {Array.from({
              length: 18,
            }).map((_, index) => (
              <span
                key={index}
                style={
                  {
                    "--particle-index":
                      index,
                  } as React.CSSProperties
                }
              />
            ))}
          </motion.div>

          <motion.div
            className="tf-curtain-opening-left"
            initial={{
              x: "0%",
            }}
            animate={{
              x: "-101%",
            }}
            transition={{
              duration: 0.72,
              delay: 1.82,
              ease: curtainEase,
            }}
          />

          <motion.div
            className="tf-curtain-opening-right"
            initial={{
              x: "0%",
            }}
            animate={{
              x: "101%",
            }}
            transition={{
              duration: 0.72,
              delay: 1.82,
              ease: curtainEase,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type CurtainFoldsProps = {
  side: "left" | "right";
};

function CurtainFolds({
  side,
}: CurtainFoldsProps) {
  return (
    <div
      className={[
        "tf-curtain-folds",
        side === "left"
          ? "is-left"
          : "is-right",
      ].join(" ")}
    >
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}