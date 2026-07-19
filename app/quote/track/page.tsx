"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

import QuoteProgress from "@/components/quote/QuoteProgress";
import TrackCard from "@/components/quote/TrackCard";

type TrackType =
  | "ceiling"
  | "wall"
  | "wave"
  | "bay"
  | "curved"
  | "motorised"
  | "commercial"
  | "unsure";

const options: Array<{
  id: TrackType;
  title: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    id: "ceiling",
    title: "Ceiling mounted",
    description: "The track fixes directly into the ceiling.",
    icon: <CeilingTrackIcon />,
  },
  {
    id: "wall",
    title: "Wall mounted",
    description: "The track is installed using wall brackets.",
    icon: <WallTrackIcon />,
  },
  {
    id: "wave",
    title: "Wave track",
    description: "Creates smooth, evenly spaced curtain folds.",
    icon: <WaveTrackIcon />,
  },
  {
    id: "bay",
    title: "Bay window",
    description: "Made to follow angled bay-window sections.",
    icon: <BayTrackIcon />,
  },
  {
    id: "curved",
    title: "Curved track",
    description: "For rounded, arched or shaped installations.",
    icon: <CurvedTrackIcon />,
  },
  {
    id: "motorised",
    title: "Motorised track",
    description: "Automated curtain operation with powered movement.",
    icon: <MotorisedTrackIcon />,
  },
  {
    id: "commercial",
    title: "Commercial system",
    description: "Heavy-duty, healthcare or specialist track systems.",
    icon: <CommercialTrackIcon />,
  },
  {
    id: "unsure",
    title: "Not sure",
    description: "Upload photos later and our team will advise you.",
    icon: <UnsureIcon />,
  },
];

export default function TrackPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<TrackType | null>(null);

  function continueJourney() {
    if (!selected) return;

    window.sessionStorage.setItem("trackfit-track-type", selected);
    router.push("/quote/quantity");
  }

  return (
    <main className="tf-quote-page">
      <div className="tf-quote-atmosphere" aria-hidden="true">
        <div className="tf-quote-light" />
        <div className="tf-quote-grain" />
      </div>

      <header className="tf-quote-header tf-container">
        <button
          type="button"
          className="tf-quote-logo-button"
          onClick={() => router.push("/")}
          aria-label="TrackFit home"
        >
          <Image
            src="/logos/trackfit-logo.svg"
            alt="TrackFit"
            width={240}
            height={72}
            priority
            className="tf-quote-logo"
          />
        </button>

        <button
          type="button"
          className="tf-quote-exit"
          onClick={() => router.push("/")}
        >
          Save and exit
        </button>
      </header>

      <section className="tf-quote-shell tf-container">
        <QuoteProgress
          currentStep={2}
          totalSteps={8}
          label="Track type"
        />

        <motion.div
          className="tf-quote-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="tf-eyebrow">Track specification</p>

          <h1>What type of curtain track do you need?</h1>

          <p>
            Choose the closest option. It is fine to select “Not sure”
            if you would prefer our team to advise you.
          </p>
        </motion.div>

        <motion.div
          className="tf-track-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.07,
              },
            },
          }}
        >
          {options.map((option) => (
            <motion.div
              key={option.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TrackCard
                title={option.title}
                description={option.description}
                icon={option.icon}
                selected={selected === option.id}
                onSelect={() => setSelected(option.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="tf-quote-actions">
          <button
            type="button"
            className="tf-quote-back"
            onClick={() => router.push("/quote/property")}
          >
            ← Back
          </button>

          <div className="tf-quote-action-right">
            <div className="tf-quote-selection">
              {selected ? (
                <>
                  <span className="tf-quote-selection-check">✓</span>
                  <p>
                    {options.find((option) => option.id === selected)?.title}{" "}
                    selected
                  </p>
                </>
              ) : (
                <p>Select one option to continue.</p>
              )}
            </div>

            <button
              type="button"
              className="tf-quote-continue"
              disabled={!selected}
              onClick={continueJourney}
            >
              Continue
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function BaseIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function CeilingTrackIcon() {
  return (
    <BaseIcon>
      <path d="M6 9H38" stroke="currentColor" strokeWidth="2" />
      <path d="M10 14H34" stroke="currentColor" strokeWidth="2" />
      <path d="M14 14V34M22 14V34M30 14V34" stroke="currentColor" strokeWidth="2" />
    </BaseIcon>
  );
}

function WallTrackIcon() {
  return (
    <BaseIcon>
      <path d="M8 6V38" stroke="currentColor" strokeWidth="2" />
      <path d="M8 13H35" stroke="currentColor" strokeWidth="2" />
      <path d="M15 13V34M24 13V34M33 13V34" stroke="currentColor" strokeWidth="2" />
    </BaseIcon>
  );
}

function WaveTrackIcon() {
  return (
    <BaseIcon>
      <path d="M6 9H38" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 17C12 11 16 11 20 17C24 23 28 23 32 17C35 13 37 14 38 17"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 27C12 21 16 21 20 27C24 33 28 33 32 27C35 23 37 24 38 27"
        stroke="currentColor"
        strokeWidth="2"
      />
    </BaseIcon>
  );
}

function BayTrackIcon() {
  return (
    <BaseIcon>
      <path d="M6 12L15 8L29 8L38 12" stroke="currentColor" strokeWidth="2" />
      <path d="M6 12V34M15 8V34M29 8V34M38 12V34" stroke="currentColor" strokeWidth="2" />
    </BaseIcon>
  );
}

function CurvedTrackIcon() {
  return (
    <BaseIcon>
      <path d="M6 14C16 6 28 6 38 14" stroke="currentColor" strokeWidth="2" />
      <path d="M10 15V34M18 11V34M26 11V34M34 15V34" stroke="currentColor" strokeWidth="2" />
    </BaseIcon>
  );
}

function MotorisedTrackIcon() {
  return (
    <BaseIcon>
      <path d="M6 10H32" stroke="currentColor" strokeWidth="2" />
      <rect x="32" y="7" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M12 14V34M22 14V34M32 14V34" stroke="currentColor" strokeWidth="2" />
      <path d="M17 22L21 18L25 22" stroke="currentColor" strokeWidth="2" />
    </BaseIcon>
  );
}

function CommercialTrackIcon() {
  return (
    <BaseIcon>
      <path d="M5 9H39" stroke="currentColor" strokeWidth="3" />
      <path d="M9 15H35" stroke="currentColor" strokeWidth="2" />
      <path d="M12 15V35M22 15V35M32 15V35" stroke="currentColor" strokeWidth="3" />
    </BaseIcon>
  );
}

function UnsureIcon() {
  return (
    <BaseIcon>
      <circle cx="22" cy="22" r="15" stroke="currentColor" strokeWidth="2" />
      <path
        d="M18 17C18.4 13.8 25.2 13.3 26.1 17C27 20.4 22 20.7 22 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="22" cy="30" r="1.2" fill="currentColor" />
    </BaseIcon>
  );
}