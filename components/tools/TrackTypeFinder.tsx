"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ToolResultActions } from "@/components/tools/ToolResultActions";

type Opening =
  | "standard-window"
  | "patio-doors"
  | "bifold-doors"
  | "bay-window"
  | "corner-window"
  | "room-divider";

type Mounting = "ceiling" | "wall" | "unsure";
type Heading = "pencil" | "pinch" | "wave" | "unsure";
type CurtainLoad = "light" | "standard" | "heavy";
type TrackNeed = "single" | "double" | "unsure";

type Recommendation = {
  title: string;
  summary: string;
  reasons: string[];
  cautions: string[];
};

const openingLabels: Record<Opening, string> = {
  "standard-window": "Standard window",
  "patio-doors": "Patio or sliding doors",
  "bifold-doors": "Bifold doors",
  "bay-window": "Bay window",
  "corner-window": "Corner window",
  "room-divider": "Room divider",
};

const headingLabels: Record<Heading, string> = {
  pencil: "Pencil pleat",
  pinch: "Pinch pleat",
  wave: "Wave",
  unsure: "Not sure",
};

const loadLabels: Record<CurtainLoad, string> = {
  light: "Light",
  standard: "Standard",
  heavy: "Heavy",
};

function getRecommendation(
  opening: Opening,
  mounting: Mounting,
  heading: Heading,
  curtainLoad: CurtainLoad,
  trackNeed: TrackNeed,
): Recommendation {
  if (opening === "bay-window") {
    return {
      title:
        heading === "wave"
          ? "Flexible bay track with compatible wave system"
          : "Flexible or custom-bent bay window track",
      summary:
        mounting === "wall"
          ? "A wall-mounted bay system may work where ceiling fixing is unsuitable, but bracket projection and returns need careful planning."
          : "A ceiling-mounted bay track usually follows the bay cleanly and keeps the curtain line close to the ceiling.",
      reasons: [
        "Designed to follow multiple bay sections",
        "Can be planned as a single continuous run or joined sections",
        trackNeed === "double"
          ? "A double-track version can carry a voile and main curtain"
          : "A single-track version suits one curtain layer",
      ],
      cautions: [
        "Final bend shape should be checked at the exact fixing line",
        "Support is especially important near bends and joins",
      ],
    };
  }

  if (opening === "corner-window") {
    return {
      title: "Corner-capable track or two linked straight runs",
      summary:
        mounting === "ceiling"
          ? "Ceiling mounting usually gives the cleanest route through a corner."
          : "Wall mounting is possible where bracket projection can clear the corner.",
      reasons: [
        "Allows the curtain to travel around or meet at the corner",
        heading === "wave"
          ? "A compatible wave carrier system can keep the folds regular"
          : "Suitable for conventional curtain headings",
        curtainLoad === "heavy"
          ? "Use a robust aluminium track with closer support"
          : "A standard aluminium track may be sufficient",
      ],
      cautions: [
        "Check whether the curtain must travel continuously around the corner",
        "Corner geometry and fixing strength should be confirmed before ordering",
      ],
    };
  }

  if (opening === "room-divider") {
    return {
      title:
        curtainLoad === "heavy"
          ? "Heavy-duty ceiling-mounted aluminium track"
          : "Ceiling-mounted room-divider track",
      summary:
        "A ceiling-mounted track is normally the cleanest option for dividing a room because it does not rely on a wall above the opening.",
      reasons: [
        "Creates a continuous curtain line across the room",
        "Can be arranged as a single or double layer",
        curtainLoad === "heavy"
          ? "A heavier-duty profile gives better support over long spans"
          : "A standard aluminium profile may suit lighter curtains",
      ],
      cautions: [
        "The ceiling structure must be suitable for repeated curtain movement",
        "Long spans may require more brackets or structural backing",
      ],
    };
  }

  if (
    opening === "patio-doors" ||
    opening === "bifold-doors"
  ) {
    return {
      title:
        heading === "wave"
          ? "Wide-span aluminium wave track"
          : "Wide-span aluminium curtain track",
      summary:
        mounting === "ceiling"
          ? "A ceiling-mounted aluminium track keeps the system neat and helps maximise clearance around doors."
          : "A wall-mounted aluminium track can work where there is enough projection above the doors.",
      reasons: [
        "Suitable for wide openings",
        curtainLoad === "heavy"
          ? "A stronger profile is advisable for wide, heavy curtains"
          : "Aluminium gives a reliable, smooth-running system",
        trackNeed === "double"
          ? "A double-track arrangement can carry voile and blackout layers"
          : "A single track keeps the installation simple",
      ],
      cautions: [
        "Check door handles and opening movement",
        "Allow enough side extension for curtain stack-back",
      ],
    };
  }

  return {
    title:
      heading === "wave"
        ? "Straight aluminium wave curtain track"
        : trackNeed === "double"
          ? "Straight double aluminium curtain track"
          : "Straight aluminium curtain track",
    summary:
      mounting === "wall"
        ? "A wall-mounted aluminium track is a practical choice where the wall above the window provides a secure fixing position."
        : mounting === "ceiling"
          ? "A ceiling-mounted aluminium track gives a clean appearance and can help the room feel taller."
          : "Either ceiling or wall mounting may work, depending on the fixing surface and available clearance.",
    reasons: [
      "Suitable for most standard domestic windows",
      heading === "wave"
        ? "Compatible with a dedicated wave carrier system"
        : `Works well with ${headingLabels[heading].toLowerCase()} curtains`,
      curtainLoad === "heavy"
        ? "Choose a stronger profile and closer bracket spacing"
        : "A standard-quality aluminium profile should be suitable",
    ],
    cautions: [
      "Check the fixing surface before choosing brackets",
      "Confirm the curtain stack and side extension",
    ],
  };
}

export function TrackTypeFinder() {
  const [opening, setOpening] =
    useState<Opening>("standard-window");
  const [mounting, setMounting] =
    useState<Mounting>("unsure");
  const [heading, setHeading] =
    useState<Heading>("unsure");
  const [curtainLoad, setCurtainLoad] =
    useState<CurtainLoad>("standard");
  const [trackNeed, setTrackNeed] =
    useState<TrackNeed>("single");

  const recommendation = useMemo(
    () =>
      getRecommendation(
        opening,
        mounting,
        heading,
        curtainLoad,
        trackNeed,
      ),
    [curtainLoad, heading, mounting, opening, trackNeed],
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
            What are you fitting?
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(
              [
                "standard-window",
                "patio-doors",
                "bifold-doors",
                "bay-window",
                "corner-window",
                "room-divider",
              ] as const
            ).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={opening === value}
                onClick={() => setOpening(value)}
                className={optionClass(opening === value)}
              >
                <span className="block font-semibold">
                  {openingLabels[value]}
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
            Where could the track be mounted?
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(
              [
                ["ceiling", "Ceiling"],
                ["wall", "Wall"],
                ["unsure", "Not sure"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={mounting === value}
                onClick={() => setMounting(value)}
                className={optionClass(mounting === value)}
              >
                <span className="block font-semibold">
                  {label}
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
            Choose the curtain heading
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["pencil", "Pencil pleat"],
                ["pinch", "Pinch pleat"],
                ["wave", "Wave"],
                ["unsure", "Not sure"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={heading === value}
                onClick={() => setHeading(value)}
                className={optionClass(heading === value)}
              >
                <span className="block font-semibold">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 4
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Choose the curtain load
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(["light", "standard", "heavy"] as const).map(
              (value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={curtainLoad === value}
                  onClick={() => setCurtainLoad(value)}
                  className={optionClass(
                    curtainLoad === value,
                  )}
                >
                  <span className="block font-semibold">
                    {loadLabels[value]}
                  </span>
                </button>
              ),
            )}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 5
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Single or double track?
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(
              [
                ["single", "Single track"],
                ["double", "Double track"],
                ["unsure", "Not sure"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={trackNeed === value}
                onClick={() => setTrackNeed(value)}
                className={optionClass(trackNeed === value)}
              >
                <span className="block font-semibold">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <aside className="mx-auto w-full max-w-3xl xl:max-w-none">
        <div className="space-y-6 xl:sticky xl:top-24">
          <section className="tool-result-card overflow-hidden rounded-[32px] border border-[#B8F23D]/35 bg-[#B8F23D] text-[#080A09]">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em]">
                Recommended track type
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em]">
                {recommendation.title}
              </h2>

              <p className="mt-5 text-base leading-7 text-[#1C211A]">
                {recommendation.summary}
              </p>
            </div>

            <div className="border-t border-[#080A09]/15 p-5 sm:p-6">
              <div className="rounded-[24px] border border-[#080A09]/15 bg-[#F4F1E8]/65 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#080A09]/65">
                  Track visual
                </p>

                <div className="mt-7">
                  <div className="relative h-28 rounded-[20px] border border-[#080A09]/20 bg-white/75 p-5">
                    <div className="absolute inset-x-5 top-6 h-3 rounded-full bg-[#080A09]" />

                    {trackNeed === "double" && (
                      <div className="absolute inset-x-5 top-12 h-3 rounded-full bg-[#080A09]/55" />
                    )}

                    <div
                      className={[
                        "absolute inset-x-12 bottom-5 h-14 border-2 border-[#080A09]/25 bg-[#D8D7CF]/70",
                        opening === "bay-window"
                          ? "rounded-b-[50%]"
                          : opening === "corner-window"
                            ? "rounded-br-[50%]"
                            : "",
                      ].join(" ")}
                    />

                    <div className="absolute inset-x-0 bottom-2 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#080A09]/55">
                      {openingLabels[opening]}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                        Mounting
                      </p>
                      <p className="mt-1 text-lg font-semibold capitalize">
                        {mounting}
                      </p>
                    </div>

                    <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                        Heading
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {headingLabels[heading]}
                      </p>
                    </div>

                    <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                        Layers
                      </p>
                      <p className="mt-1 text-lg font-semibold capitalize">
                        {trackNeed}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#080A09]/15 px-7 py-6 sm:px-8">
              <p className="font-semibold">
                Why this suits the project
              </p>

              <div className="mt-5 space-y-3">
                {recommendation.reasons.map((reason) => (
                  <div
                    key={reason}
                    className="flex items-start gap-3 rounded-[18px] bg-[#080A09]/8 p-4"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#080A09] text-sm font-bold text-[#B8F23D]">
                      ✓
                    </span>
                    <p className="text-sm leading-6">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ToolResultActions
            toolName="Curtain Track Type Finder"
            resultTitle="Recommended track type"
            resultValue={recommendation.title}
            rows={[
              {
                label: "Opening",
                value: openingLabels[opening],
              },
              {
                label: "Mounting",
                value: mounting,
              },
              {
                label: "Heading",
                value: headingLabels[heading],
              },
              {
                label: "Curtain load",
                value: loadLabels[curtainLoad],
              },
              {
                label: "Track layers",
                value: trackNeed,
              },
            ]}
            notes={[
              recommendation.summary,
              ...recommendation.reasons,
              ...recommendation.cautions,
            ]}
            sharePath="/tools/curtain-track-type-finder"
          />

          <section className="rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Check before ordering
            </p>

            <div className="mt-4 space-y-2 text-sm leading-6 text-amber-50">
              {recommendation.cautions.map((caution) => (
                <p key={caution}>• {caution}</p>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#B8F23D]/25 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Professional installation
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Want the final track checked?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#AAACA4]">
              Send photos and basic measurements. TrackFit can review
              the track type, fixing surface and installation route.
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
