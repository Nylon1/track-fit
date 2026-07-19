"use client";

import Image from "next/image";
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
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden="true"
        >
          <motion.div
            className="tf-curtain-panel tf-curtain-panel-left"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{
              duration: 1.15,
              ease: curtainEase,
            }}
          >
            <CurtainFolds />
          </motion.div>

          <motion.div
            className="tf-curtain-panel tf-curtain-panel-right"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{
              duration: 1.15,
              ease: curtainEase,
            }}
          >
            <CurtainFolds />
          </motion.div>

          <motion.div
            className="tf-curtain-transition-logo"
            initial={{
              opacity: 0,
              scale: 0.82,
              y: 24,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.9,
              delay: 0.65,
              ease: curtainEase,
            }}
          >
            <motion.div
              className="tf-transition-logo-frame"
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.65,
                delay: 0.82,
                ease: curtainEase,
              }}
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
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
                delay: 1.05,
                ease: curtainEase,
              }}
            >
              Where precision meets design.
            </motion.p>

            <motion.div
              className="tf-transition-track"
              initial={{
                opacity: 0,
                scaleX: 0.35,
              }}
              animate={{
                opacity: 1,
                scaleX: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 1.2,
                ease: curtainEase,
              }}
            >
              <span />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CurtainFolds() {
  return (
    <div className="tf-curtain-folds">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}