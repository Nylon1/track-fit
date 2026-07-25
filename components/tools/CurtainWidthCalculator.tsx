"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Heading =
  | "pencil"
  | "double-pinch"
  | "triple-pinch"
  | "wave"
  | "eyelet";

type Arrangement = "pair" | "single";
type FullnessPreset = "minimal" | "standard" | "luxury" | "custom";

const fullnessPresets: Record<
  Exclude<FullnessPreset, "custom">,
  number
> = {
  minimal: 1.5,
  standard: 2,
  luxury: 2.5,
};

const headingGuidance: Record<
  Heading,
  {
    label: string;
    note: string;
    recommendedFullness: number;
  }
> = {
  pencil: {
    label: "Pencil pleat",
    note: "A flexible heading that commonly works well around 2× fullness.",
    recommendedFullness: 2,
  },
  "double-pinch": {
    label: "Double pinch pleat",
    note: "A tailored heading that normally benefits from around 2× fullness.",
    recommendedFullness: 2,
  },
  "triple-pinch": {
    label: "Triple pinch pleat",
    note: "A fuller decorative heading that often suits 2.25–2.5× fullness.",
    recommendedFullness: 2.5,
  },
  wave: {
    label: "Wave",
    note: "Wave systems are normally sized to the track and carrier spacing. Use this as a planning estimate only.",
    recommendedFullness: 2,
  },
  eyelet: {
    label: "Eyelet",
    note: "Eyelet curtains normally run on a pole rather than a track and often suit around 2× fullness.",
    recommendedFullness: 2,
  },
};

function roundToNearestFive(value: number) {
  return Math.max(5, Math.round(value / 5) * 5);
}

export function CurtainWidthCalculator() {
  const [trackWidth, setTrackWidth] = useState(300);
  const [heading, setHeading] = useState<Heading>("pencil");
  const [arrangement, setArrangement] =
    useState<Arrangement>("pair");
  const [fullnessPreset, setFullnessPreset] =
    useState<FullnessPreset>("standard");
  const [customFullness, setCustomFullness] = useState(2);

  const fullness =
    fullnessPreset === "custom"
      ? Math.max(1, customFullness)
      : fullnessPresets[fullnessPreset];

  const result = useMemo(() => {
    const totalFinishedWidth = roundToNearestFive(
      trackWidth * fullness,
    );

    const eachCurtainWidth =
      arrangement === "pair"
        ? roundToNearestFive(totalFinishedWidth / 2)
        : totalFinishedWidth;

    return {
      totalFinishedWidth,
      eachCurtainWidth,
    };
  }, [arrangement, fullness, trackWidth]);

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

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Enter the track or pole width
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            Measure the full usable width that the curtains need to
            cover.
          </p>

          <label className="mt-6 block max-w-md">
            <span className="sr-only">
              Track or pole width in centimetres
            </span>

            <div className="flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 transition focus-within:border-[#B8F23D]">
              <input
                type="number"
                min="50"
                max="2000"
                inputMode="decimal"
                value={trackWidth}
                onChange={(event) =>
                  setTrackWidth(
                    Math.max(
                      0,
                      Number(event.target.value) || 0,
                    ),
                  )
                }
                className="min-h-14 min-w-0 flex-1 bg-transparent text-2xl font-semibold text-[#F4F1E8] outline-none"
              />

              <span className="font-semibold text-[#B8F23D]">
                cm
              </span>
            </div>
          </label>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 2
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Choose the curtain heading
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(
              [
                "pencil",
                "double-pinch",
                "triple-pinch",
                "wave",
                "eyelet",
              ] as const
            ).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={heading === value}
                onClick={() => {
                  setHeading(value);

                  const recommended =
                    headingGuidance[value].recommendedFullness;

                  if (recommended === 1.5) {
                    setFullnessPreset("minimal");
                  } else if (recommended === 2.5) {
                    setFullnessPreset("luxury");
                  } else {
                    setFullnessPreset("standard");
                  }
                }}
                className={optionClass(heading === value)}
              >
                <span className="block font-semibold">
                  {headingGuidance[value].label}
                </span>

                <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                  {headingGuidance[value].note}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 3
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Choose the fullness
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            Fullness controls how much fabric width is used compared
            with the track width.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["minimal", "1.5× fullness", "A flatter, lighter look."],
                ["standard", "2× fullness", "Balanced and suitable for many curtains."],
                ["luxury", "2.5× fullness", "A fuller, more luxurious appearance."],
                ["custom", "Custom fullness", "Enter your own multiplier."],
              ] as const
            ).map(([value, title, note]) => (
              <button
                key={value}
                type="button"
                aria-pressed={fullnessPreset === value}
                onClick={() => setFullnessPreset(value)}
                className={optionClass(
                  fullnessPreset === value,
                )}
              >
                <span className="block font-semibold">
                  {title}
                </span>

                <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                  {note}
                </span>
              </button>
            ))}
          </div>

          {fullnessPreset === "custom" && (
            <label className="mt-6 block max-w-xs text-sm font-semibold">
              Fullness multiplier

              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="1"
                  max="4"
                  step="0.1"
                  value={customFullness}
                  onChange={(event) =>
                    setCustomFullness(
                      Math.max(
                        1,
                        Number(event.target.value) || 1,
                      ),
                    )
                  }
                  className="min-h-12 min-w-0 flex-1 bg-transparent text-[#F4F1E8] outline-none"
                />

                <span className="text-[#B8F23D]">×</span>
              </div>
            </label>
          )}
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 4
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Single curtain or pair?
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              aria-pressed={arrangement === "pair"}
              onClick={() => setArrangement("pair")}
              className={optionClass(arrangement === "pair")}
            >
              <span className="block font-semibold">
                Pair of curtains
              </span>
              <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                Two curtains meet in the centre.
              </span>
            </button>

            <button
              type="button"
              aria-pressed={arrangement === "single"}
              onClick={() => setArrangement("single")}
              className={optionClass(arrangement === "single")}
            >
              <span className="block font-semibold">
                Single curtain
              </span>
              <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                One curtain covers the full width.
              </span>
            </button>
          </div>
        </section>
      </div>

      <aside className="mx-auto w-full max-w-3xl xl:max-w-none">
        <div className="space-y-6 xl:sticky xl:top-24">
          <section className="overflow-hidden rounded-[32px] border border-[#B8F23D]/35 bg-[#B8F23D] text-[#080A09] shadow-2xl shadow-[#B8F23D]/10">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em]">
                Recommended finished curtain width
              </p>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
                  {result.totalFinishedWidth}
                </p>
                <span className="pb-2 text-2xl font-bold">
                  cm
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#1C211A]">
                Based on a {trackWidth} cm width at{" "}
                {fullness.toFixed(1)}× fullness.
              </p>

              {arrangement === "pair" && (
                <div className="mt-6 rounded-[20px] bg-[#080A09]/8 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em]">
                    Width per curtain
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    {result.eachCurtainWidth} cm
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-[#080A09]/15 p-5 sm:p-6">
              <div className="rounded-[24px] border border-[#080A09]/15 bg-[#F4F1E8]/65 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#080A09]/65">
                  Curtain width visual
                </p>

                <div className="mt-7">
                  <div className="relative h-3 rounded-full bg-[#080A09]">
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#B8F23D] px-3 py-1 text-[10px] font-bold">
                      {trackWidth} cm track
                    </span>
                  </div>

                  <div className="mt-7 overflow-hidden rounded-[22px] border border-[#080A09]/20 bg-white/75 p-4">
                    <div
                      className={`grid h-44 gap-2 ${
                        arrangement === "pair"
                          ? "grid-cols-2"
                          : "grid-cols-1"
                      }`}
                    >
                      {Array.from({
                        length: arrangement === "pair" ? 2 : 1,
                      }).map((_, curtainIndex) => {
                        const foldCount = Math.max(
                          6,
                          Math.round(fullness * 6),
                        );

                        return (
                          <div
                            key={curtainIndex}
                            className="relative flex h-full overflow-hidden rounded-[16px] border border-[#080A09]/15 bg-[#D8D7CF]"
                          >
                            {Array.from({ length: foldCount }).map(
                              (_, foldIndex) => (
                                <div
                                  key={foldIndex}
                                  className="h-full flex-1 border-r border-[#080A09]/10"
                                  style={{
                                    background:
                                      foldIndex % 2 === 0
                                        ? "linear-gradient(90deg, rgba(8,10,9,0.24), rgba(8,10,9,0.06))"
                                        : "linear-gradient(90deg, rgba(8,10,9,0.06), rgba(8,10,9,0.22))",
                                  }}
                                />
                              ),
                            )}

                            <div className="absolute inset-x-0 bottom-0 border-t border-[#080A09]/15 bg-[#F4F1E8]/85 px-3 py-2 text-center">
                              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#080A09]/60">
                                {arrangement === "pair"
                                  ? `Curtain ${curtainIndex + 1}`
                                  : "Single curtain"}
                              </p>

                              <p className="mt-1 text-sm font-bold text-[#080A09]">
                                {result.eachCurtainWidth} cm finished width
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                        Track
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {trackWidth} cm
                      </p>
                    </div>

                    <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                        Fullness
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {fullness.toFixed(1)}×
                      </p>
                    </div>

                    <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                        Total width
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        {result.totalFinishedWidth} cm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <details className="border-t border-[#080A09]/15 px-7 py-5 sm:px-8">
              <summary className="cursor-pointer font-semibold">
                How is this calculated?
              </summary>

              <p className="mt-3 text-sm leading-6 text-[#1C211A]">
                The track or pole width is multiplied by the selected
                fullness. For a pair, the total finished width is
                divided equally between the two curtains.
              </p>
            </details>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Planning guidance
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8F928B]">
                  Heading
                </p>
                <p className="mt-2 font-semibold">
                  {headingGuidance[heading].label}
                </p>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8F928B]">
                  Recommended approach
                </p>
                <p className="mt-2 font-semibold">
                  {headingGuidance[heading].note}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Important
            </p>

            <p className="mt-3 text-sm leading-6 text-amber-50">
              This calculates finished curtain width, not the number
              of fabric metres required. Seams, pattern repeats,
              headings, side hems and fabric width must be considered
              separately.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#B8F23D]/25 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Professional installation
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Need help matching curtains and track?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#AAACA4]">
              Send the track width, curtain heading and photos of the
              window. TrackFit can review the track layout and provide
              an installation quote.
            </p>

            <Link
              href="/quote/postcode"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#B8F23D] px-5 font-semibold text-[#080A09] transition hover:bg-[#C7FF4A]"
            >
              Get my installation quote
            </Link>
          </section>
        </div>
      </aside>
    </div>
  );
}
