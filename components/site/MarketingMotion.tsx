"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  "main h1",
  "main h2",
  "main article",
  "main figure",
  "main a.group",
  "main [data-reveal]",
].join(",");

export default function MarketingMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const surface = document.getElementById("trackfit-marketing-surface");
    if (!surface || pathname === "/welcome") return;

    const main = surface.querySelector("main");
    if (main) { main.id = "trackfit-content"; main.tabIndex = -1; }
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      document.documentElement.style.setProperty(
        "--tf-scroll-progress",
        String(Math.min(1, Math.max(0, progress))),
      );
      document.documentElement.toggleAttribute(
        "data-tf-scrolled",
        window.scrollY > 20,
      );
      frame = 0;
    };

    const queueProgressUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", queueProgressUpdate, { passive: true });
    window.addEventListener("resize", queueProgressUpdate, { passive: true });

    const candidates = Array.from(
      surface.querySelectorAll<HTMLElement>(revealSelector),
    ).filter((element, index, elements) => {
      if (element.closest("[data-site-header], footer, [data-no-reveal]")) return false;

      return !elements.some(
        (parent, parentIndex) =>
          parentIndex < index &&
          parent !== element &&
          parent.contains(element) &&
          parent.matches("article, figure, a.group"),
      );
    });

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      candidates.forEach((element) => element.classList.add("is-visible"));
      return () => {
        window.removeEventListener("scroll", queueProgressUpdate);
        window.removeEventListener("resize", queueProgressUpdate);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.08 },
    );

    candidates.forEach((element) => {
      const siblings = element.parentElement
        ? Array.from(element.parentElement.children).filter((child) =>
            child.matches("article, figure, a.group, [data-reveal]"),
          )
        : [];
      const siblingIndex = siblings.indexOf(element);
      const delay = siblingIndex >= 0 ? Math.min(siblingIndex % 4, 3) * 70 : 0;

      // Leave the first screen and restored scroll positions visible immediately.
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      element.classList.add("tf-scroll-reveal");
      element.style.setProperty("--tf-reveal-delay", `${delay}ms`);
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      candidates.forEach((element) => { element.classList.remove("tf-scroll-reveal", "is-visible"); element.style.removeProperty("--tf-reveal-delay"); });
      window.removeEventListener("scroll", queueProgressUpdate);
      window.removeEventListener("resize", queueProgressUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return pathname === "/welcome" ? null : (
    <div aria-hidden="true" className="tf-scroll-progress" />
  );
}
