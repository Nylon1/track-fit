"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CurtainTransition from "./CurtainTransition";
import EntryBackground from "./EntryBackground";
import HeroContent from "./HeroContent";
import PostcodeCard from "./PostcodeCard";

export default function TFArrival() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  async function enterTrackFit(postcode: string) {
    if (isTransitioning) {
      return;
    }

    window.sessionStorage.setItem(
      "trackfit-postcode",
      postcode
    );

    setIsTransitioning(true);

    await wait(1650);

    router.push(
      `/welcome?postcode=${encodeURIComponent(postcode)}`
    );
  }

  return (
    <main
      className={[
        "tf-arrival",
        isTransitioning ? "is-transitioning" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <EntryBackground />

      <header className="tf-arrival-header tf-container">
        <a
          href="/"
          className="tf-arrival-brand"
          aria-label="TrackFit home"
        >
          <Image
            src="/logos/trackfit-logo.svg"
            alt="TrackFit"
            width={260}
            height={80}
            priority
            className="tf-arrival-logo"
          />
        </a>

        <p>UK curtain track installation specialists</p>
      </header>

      <section className="tf-arrival-layout tf-container">
        <HeroContent />

        <PostcodeCard onContinue={enterTrackFit} />
    
      </section>

      <footer className="tf-arrival-footer tf-container">
        <div>
          <span>Residential</span>
          <i />
          <span>Commercial</span>
          <i />
          <span>Nationwide</span>
        </div>

        <p>Where precision meets design.</p>
      </footer>

      <CurtainTransition active={isTransitioning} />
    </main>
  );
}

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}