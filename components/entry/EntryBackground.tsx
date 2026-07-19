"use client";

import { useEffect, useState } from "react";

export default function EntryBackground() {
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updatePreference = () => {
      setReducedMotion(query.matches);
    };

    updatePreference();
    query.addEventListener("change", updatePreference);

    return () => {
      query.removeEventListener("change", updatePreference);
    };
  }, []);

  return (
    <div className="tf-entry-background" aria-hidden="true">
      <img
        src="/images/hero/trackfit-entry-poster.jpeg"
        alt=""
        className={[
          "tf-entry-poster",
          videoReady ? "is-hidden" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      {!reducedMotion && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero/trackfit-entry-poster.jpeg"
          onCanPlay={() => setVideoReady(true)}
          className="tf-entry-video"
        >
          <source
            src="/videos/trackfit-entry.mp4"
            type="video/mp4"
          />
        </video>
      )}

      <div className="tf-entry-dark-grade" />
      <div className="tf-entry-light" />
      <div className="tf-entry-vignette" />
      <div className="tf-entry-grain" />
    </div>
  );
}