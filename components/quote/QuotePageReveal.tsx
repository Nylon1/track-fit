"use client";

import {
  motion,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

type QuotePageRevealProps = {
  children: ReactNode;
  className?: string;
};

const revealEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
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
      ease: revealEase,
    },
  },
};

export function QuotePageReveal({
  children,
  className = "",
}: QuotePageRevealProps) {
  return (
    <motion.div
      className={[
        "tf-quote-page-reveal",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

type QuoteRevealItemProps = {
  children: ReactNode;
  className?: string;
};

export function QuoteRevealItem({
  children,
  className = "",
}: QuoteRevealItemProps) {
  return (
    <motion.div
      className={className}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
}