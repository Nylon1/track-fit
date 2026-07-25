"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ToolResultActions } from "@/components/tools/ToolResultActions";

type Mounting = "ceiling" | "wall";
type Surface =
  | "solid-masonry"
  | "timber"
  | "plasterboard-stud"
  | "plasterboard-hollow"
  | "concrete"
  | "unknown";

type Load = "light" | "medium" | "heavy";
type TrackShape = "straight" | "bay" | "curved";

type Recommendation = {
  title: string;
  primary: string;
  secondary: string;
  warning?: string;
};

const surfaceLabels: Record<Surface, string> = {
  "solid-masonry": "Brick or block",
  timber: "Timber",
  "plasterboard-stud": "Plasterboard with timber behind",
  "plasterboard-hollow": "Hollow plasterboard",
  concrete: "Concrete",
  unknown: "Not sure",
};

const loadLabels: Record<Load, string> = {
  light: "Light curtains",
  medium: "Standard lined curtains",
  heavy: "Heavy or interlined curtains",
};

function getRecommendation(
  surface: Surface,
  mounting: Mounting,
  load: Load,
  trackShape: TrackShape,
): Recommendation {
  if (surface === "timber") {
    return {
      title: "Fix directly into sound timber",
      primary:
        "Use a suitable wood screw long enough to achieve a secure bite into structural timber.",
      secondary:
        "Pre-drill where needed and avoid relying only on decorative trim or thin boarding.",
    };
  }

  if (surface === "plasterboard-stud") {
    return {
      title: "Locate and fix into the timber support",
      primary:
        "Fix through the plasterboard and into the timber stud, joist or noggin behind it.",
      secondary:
        "The screw must reach the timber securely after passing through the board and bracket.",
    };
  }

  if (surface === "solid-masonry") {
    return {
      title: "Masonry plug and screw fixing",
      primary:
        "Use a correctly sized masonry drill, suitable wall plug and matching screw for the bracket.",
      secondary:
        "Avoid drilling into loose mortar where a secure brick or block fixing is available.",
    };
  }

  if (surface === "concrete") {
    return {
      title: "Concrete-rated fixing",
      primary:
        "Use a concrete-rated plug or anchor with the correct drill diameter and embedment.",
      secondary:
        "Check for reinforcement, services and hollow areas before drilling.",
    };
  }

  if (surface === "plasterboard-hollow") {
    if (load === "heavy" || trackShape !== "straight") {
      return {
        title: "Additional structural support recommended",
        primary:
          "Do not rely on hollow plasterboard alone for this installation.",
        secondary:
          "Locate timber or masonry, add suitable backing, or use a properly designed support system.",
        warning:
          "Heavy curtains, bends and bay tracks create extra pull and leverage.",
      };
    }

    return {
      title: "Use a tested hollow-wall fixing cautiously",
      primary:
        "Use a fixing rated for the board thickness and expected load, installed exactly to its instructions.",
      secondary:
        "Spread the load across enough brackets and avoid damaged or weak plasterboard.",
      warning:
        "Published fixing ratings may not reflect the condition of the actual board or repeated curtain movement.",
    };
  }

  return {
    title: "Identify the structure before drilling",
    primary:
      "Do not choose a fixing until you know what is behind the finished surface.",
    secondary:
      "Use a suitable detector, inspect nearby fittings or arrange a professional assessment.",
    warning:
      "Electrical cables, pipes and hidden voids may be present.",
  };
}

export function FixingFinder() {
  const [mounting, setMounting] = useState<Mounting>("ceiling");
  const [surface, setSurface] = useState<Surface>("unknown");
  const [load, setLoad] = useState<Load>("medium");
  const [trackShape, setTrackShape] =
    useState<TrackShape>("straight");

  const recommendation = useMemo(
    () =>
      getRecommendation(
        surface,
        mounting,
        load,
        trackShape,
      ),
    [load, mounting, surface, trackShape],
  );

  const optionClass = (selected: boolean) =>
    [
      "rounded-[22px] border p-5 text-left transition",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F23D]",
      selected
        ? "border-[#B8F23D] bg-[#B8F23D]/10"
        : "border-white/10 bg-[#080A09] hover:border-white/25 hover:bg-white/[0.025]",
    ].join(" ");

  return (
    <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_430px]">
      <div className="space-y-8">
        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 1
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Where is the track being fitted?
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(["ceiling", "wall"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={mounting === value}
                onClick={() => setMounting(value)}
                className={optionClass(mounting === value)}
              >
                <span className="font-semibold capitalize">
                  {value} mounted
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 2
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            What is behind the surface?
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            Choose the structural material, not only the visible paint
            or plaster finish.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(
              [
                "solid-masonry",
                "timber",
                "plasterboard-stud",
                "plasterboard-hollow",
                "concrete",
                "unknown",
              ] as const
            ).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={surface === value}
                onClick={() => setSurface(value)}
                className={optionClass(surface === value)}
              >
                <span className="block font-semibold">
                  {surfaceLabels[value]}
                </span>

                <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                  {value === "solid-masonry"
                    ? "Solid brick, block or similar masonry."
                    : value === "timber"
                      ? "Joist, stud, noggin or timber board."
                      : value === "plasterboard-stud"
                        ? "Board with reliable timber support behind."
                        : value === "plasterboard-hollow"
                          ? "No known timber or masonry at the fixing point."
                          : value === "concrete"
                            ? "Dense structural concrete."
                            : "The hidden structure has not been confirmed."}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 3
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Choose the curtain load
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(["light", "medium", "heavy"] as const).map(
              (value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={load === value}
                  onClick={() => setLoad(value)}
                  className={optionClass(load === value)}
                >
                  <span className="block font-semibold">
                    {loadLabels[value]}
                  </span>

                  <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                    {value === "light"
                      ? "Voiles or lightweight unlined curtains."
                      : value === "medium"
                        ? "Most lined domestic curtains."
                        : "Blackout, velvet, interlined or very wide curtains."}
                  </span>
                </button>
              ),
            )}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 4
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Choose the track shape
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(["straight", "bay", "curved"] as const).map(
              (value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={trackShape === value}
                  onClick={() => setTrackShape(value)}
                  className={optionClass(trackShape === value)}
                >
                  <span className="font-semibold capitalize">
                    {value}
                  </span>
                </button>
              ),
            )}
          </div>
        </section>
      </div>

      <aside className="mx-auto w-full max-w-3xl xl:max-w-none">
        <div className="space-y-6 xl:sticky xl:top-24">
          <section className="tool-result-card overflow-hidden rounded-[32px] border border-[#B8F23D]/35 bg-[#B8F23D] text-[#080A09]">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em]">
                Recommended fixing approach
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em]">
                {recommendation.title}
              </h2>

              <p className="mt-5 text-base leading-7 text-[#1C211A]">
                {recommendation.primary}
              </p>
            </div>

            <div className="border-t border-[#080A09]/15 p-5 sm:p-6">
              <div className="rounded-[24px] border border-[#080A09]/15 bg-[#F4F1E8]/65 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#080A09]/65">
                  Fixing path
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="flex items-center gap-4 rounded-[18px] bg-white/70 p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#080A09] font-bold text-[#B8F23D]">
                      1
                    </span>
                    <p className="font-semibold">
                      Confirm the hidden structure
                    </p>
                  </div>

                  <div className="flex items-center gap-4 rounded-[18px] bg-white/70 p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#080A09] font-bold text-[#B8F23D]">
                      2
                    </span>
                    <p className="font-semibold">
                      Match the fixing to the structure and load
                    </p>
                  </div>

                  <div className="flex items-center gap-4 rounded-[18px] bg-white/70 p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#080A09] font-bold text-[#B8F23D]">
                      3
                    </span>
                    <p className="font-semibold">
                      Follow the fixing and track instructions
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-[18px] bg-[#080A09]/8 p-4">
                  <p className="text-sm leading-6">
                    {recommendation.secondary}
                  </p>
                </div>
              </div>
            </div>

            {recommendation.warning && (
              <div className="border-t border-[#080A09]/15 px-7 py-5 sm:px-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em]">
                  Extra caution
                </p>
                <p className="mt-2 text-sm leading-6">
                  {recommendation.warning}
                </p>
              </div>
            )}
          </section>

          <ToolResultActions
            toolName="Curtain Track Fixing Finder"
            resultTitle="Recommended fixing approach"
            resultValue={recommendation.title}
            rows={[
              {
                label: "Mounting",
                value:
                  mounting === "ceiling"
                    ? "Ceiling mounted"
                    : "Wall mounted",
              },
              {
                label: "Surface",
                value: surfaceLabels[surface],
              },
              {
                label: "Curtain load",
                value: loadLabels[load],
              },
              {
                label: "Track shape",
                value: `${trackShape} track`,
              },
            ]}
            notes={[
              recommendation.primary,
              recommendation.secondary,
              ...(recommendation.warning
                ? [recommendation.warning]
                : []),
            ]}
            sharePath="/tools/curtain-track-fixing-finder"
          />

          <section className="rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Safety check
            </p>

            <p className="mt-3 text-sm leading-6 text-amber-50">
              Check for electrical cables, pipes and hidden services
              before drilling. Do not rely on this tool as a structural
              assessment or a substitute for product instructions.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#B8F23D]/25 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Professional installation
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Unsure what is behind the surface?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#AAACA4]">
              Send photos of the window, ceiling and proposed fixing
              area. TrackFit can assess the installation before
              drilling.
            </p>

            <Link
              href="/quote/postcode"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#B8F23D] px-5 font-semibold text-[#080A09]"
            >
              Get my installation quote
            </Link>
          </section>
        </div>
      </aside>
    </div>
  );
}
