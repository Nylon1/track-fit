"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CardRevealProps = {
  children: ReactNode;
};

export default function CardReveal({
  children,
}: CardRevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 45,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      transition={{
        duration: 1,
        delay: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}