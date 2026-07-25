"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollable <= 0) {
        setProgress(100);
        return;
      }

      setProgress(
        Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)),
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[70] h-1 bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#B8F23D] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
