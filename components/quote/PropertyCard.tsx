"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PropertyCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  selected: boolean;
  onSelect: () => void;
};

export default function PropertyCard({
  title,
  description,
  icon,
  selected,
  onSelect,
}: PropertyCardProps) {
  return (
    <motion.button
      type="button"
      className={[
        "tf-property-card",
        selected ? "is-selected" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onSelect}
      whileHover={{
        y: -6,
      }}
      whileTap={{
        scale: 0.985,
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-pressed={selected}
    >
      <span className="tf-property-card-icon">
        {icon}
      </span>

      <span className="tf-property-card-copy">
        <strong>{title}</strong>
        <span>{description}</span>
      </span>

      <span className="tf-property-card-status">
        {selected ? <CheckIcon /> : <ArrowIcon />}
      </span>
    </motion.button>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 10.25L8.1 13.85L15.6 6.35"
        stroke="currentColor"
        strokeWidth="2"
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
        d="M5 10H15M11 6L15 10L11 14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}