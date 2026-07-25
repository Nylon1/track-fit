"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({
  value,
  duration = 350,
}: {
  value: number;
  duration?: number;
}) {
  const previous = useRef(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const startValue = previous.current;
    const difference = value - startValue;
    const startTime = performance.now();
    let frame = 0;

    const animate = (time: number) => {
      const progress = Math.min(1, (time - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startValue + difference * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        previous.current = value;
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration, value]);

  return <>{display}</>;
}
