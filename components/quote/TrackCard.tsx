"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TrackCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  selected: boolean;
  onSelect: () => void;
};

export default function TrackCard({
  title,
  description,
  icon,
  selected,
  onSelect,
}: TrackCardProps) {
  return (
    <motion.button
      type="button"
      className={`tf-track-card ${selected ? "is-selected" : ""}`}
      onClick={onSelect}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.985 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-pressed={selected}
    >
      <span className="tf-track-card-icon">{icon}</span>

      <span className="tf-track-card-copy">
        <strong>{title}</strong>
        <span>{description}</span>
      </span>

      <span className="tf-track-card-status">
        {selected ? "✓" : "→"}
      </span>
    </motion.button>
  );
}