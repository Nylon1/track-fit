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