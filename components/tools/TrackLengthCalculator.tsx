"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AnimatedNumber } from "@/components/tools/AnimatedNumber";
import { ResultComparison } from "@/components/tools/ResultComparison";
import { TrackDiagram } from "@/components/tools/TrackDiagram";
import {
  calculateTrackLength,
  getDefaultExtension,
  getRecommendation,
} from "@/lib/tools/track-length";
import type {
  CurtainStyle,
  ExtensionPreset,
  WindowType,
} from "@/lib/tools/types";

const windowOptions: Array<{
  value: WindowType;
  title: string;
  note: string;
}> = [
  {
    value: "standard",
    title: "Standard window",
    note: "A straight window with wall space on both sides.",
  },
  {
    value: "patio",
    title: "Patio or sliding doors",
    note: "A wider opening with handles or moving door panels.",
  },
  {
    value: "bifold",
    title: "Bifold doors",
    note: "Needs generous space for the curtains to stack away.",
  },
  {
    value: "bay",
    title: "Bay window",
    note: "Use this only as an initial straight-width estimate.",
  },
  {
    value: "corner",
    title: "Corner window",
    note: "May require separate runs or a specially curved track.",
  },
  {
    value: "unsure",
    title: "Not sure",
    note: "Start with an estimate and send us photos for advice.",
  },
];

const curtainOptions: Array<{
  value: CurtainStyle;
  title: string;
  note: string;
}> = [
  {
    value: "pencil",
    title: "Pencil pleat",
    note: "Flexible, but can create a deeper curtain stack.",
  },
  {
    value: "pinch",
    title: "Pinch pleat",
    note: "Structured folds with a tailored appearance.",
  },
  {
    value: "wave",
    title: "Wave",
    note: "Requires a compatible wave track and glider system.",
  },
  {
    value: "eyelet",
    title: "Eyelet",
    note: "Normally used with a pole rather than a curtain track.",
  },
  {
    value: "unsure",
    title: "Not sure",
    note: "You can still calculate an approximate track length.",
  },
];

const extensionLabels: Record<
  ExtensionPreset,
  {
    title: string;
    note: string;
  }
> = {
  standard: {
    title: "Standard coverage",
    note: "A sensible starting point for most straightforward windows.",
  },
  better: {
    title: "More stack-back",
    note: "Allows more curtain to sit away from the glass when open.",
  },
  maximum: {
    title: "Maximum coverage",
    note: "Useful where greater overlap or stack space is available.",
  },
  custom: {
    title: "Choose each side",
    note: "Enter separate left and right extensions.",
  },
};

export function TrackLengthCalculator() {
  const [windowType, setWindowType] =
    useState<WindowType>("standard");
  const [openingWidth, setOpeningWidth] = useState(240);
  const [curtainStyle, setCurtainStyle] =
    useState<CurtainStyle>("pencil");
  const [preset, setPreset] =
    useState<ExtensionPreset>("standard");
  const [customLeft, setCustomLeft] = useState(20);
  const [customRight, setCustomRight] = useState(20);

  const presetExtension =
    preset === "custom"
      ? 20
      : getDefaultExtension(windowType, preset);

  const leftExtension =
    preset === "custom" ? customLeft : presetExtension;

  const rightExtension =
    preset === "custom" ? customRight : presetExtension;

  const trackLength = useMemo(
    () =>
      calculateTrackLength(
        openingWidth,
        leftExtension,
        rightExtension,
      ),
    [leftExtension, openingWidth, rightExtension],
  );

  const recommendation = getRecommendation(
    windowType,
    curtainStyle,
    openingWidth,
  );

  const needsSpecialistMeasurement =
    windowType === "bay" || windowType === "corner";

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
            What are you measuring?
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            Choose the opening that most closely matches your
            installation.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {windowOptions.map((option) => {
              const selected = windowType === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setWindowType(option.value)}
                  className={optionClass(selected)}
                >
                  <span className="block font-semibold text-[#F4F1E8]">
                    {option.title}
                  </span>

                  <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                    {option.note}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 2
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Enter the opening width
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            Measure the full window or door opening, not only the
            visible glass.
          </p>

          <label className="mt-6 block max-w-md">
            <span className="sr-only">
              Opening width in centimetres
            </span>

            <div className="flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 transition focus-within:border-[#B8F23D]">
              <input
                type="number"
                min="1"
                max="2000"
                inputMode="decimal"
                value={openingWidth}
                onChange={(event) =>
                  setOpeningWidth(
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
            Step 3
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Choose the curtain style
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            This helps tailor the installation guidance shown with
            your result.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {curtainOptions.map((option) => {
              const selected =
                curtainStyle === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() =>
                    setCurtainStyle(option.value)
                  }
                  className={optionClass(selected)}
                >
                  <span className="block font-semibold text-[#F4F1E8]">
                    {option.title}
                  </span>

                  <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                    {option.note}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 4
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Choose the side extension
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            This is how far the track extends beyond the opening on
            each side.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(
              [
                "standard",
                "better",
                "maximum",
                "custom",
              ] as const
            ).map((value) => {
              const selected = preset === value;

              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setPreset(value)}
                  className={optionClass(selected)}
                >
                  <span className="block font-semibold text-[#F4F1E8]">
                    {extensionLabels[value].title}
                  </span>

                  <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                    {value === "custom"
                      ? extensionLabels[value].note
                      : `${getDefaultExtension(
                          windowType,
                          value,
                        )} cm each side`}
                  </span>
                </button>
              );
            })}
          </div>

          {preset === "custom" && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-[#F4F1E8]">
                Left extension

                <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 transition focus-within:border-[#B8F23D]">
                  <input
                    type="number"
                    min="0"
                    max="200"
                    inputMode="decimal"
                    value={customLeft}
                    onChange={(event) =>
                      setCustomLeft(
                        Math.max(
                          0,
                          Number(event.target.value) || 0,
                        ),
                      )
                    }
                    className="min-h-12 min-w-0 flex-1 bg-transparent text-[#F4F1E8] outline-none"
                  />

                  <span className="text-[#B8F23D]">
                    cm
                  </span>
                </div>
              </label>

              <label className="text-sm font-semibold text-[#F4F1E8]">
                Right extension

                <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 transition focus-within:border-[#B8F23D]">
                  <input
                    type="number"
                    min="0"
                    max="200"
                    inputMode="decimal"
                    value={customRight}
                    onChange={(event) =>
                      setCustomRight(
                        Math.max(
                          0,
                          Number(event.target.value) || 0,
                        ),
                      )
                    }
                    className="min-h-12 min-w-0 flex-1 bg-transparent text-[#F4F1E8] outline-none"
                  />

                  <span className="text-[#B8F23D]">
                    cm
                  </span>
                </div>
              </label>
            </div>
          )}
        </section>

        <ResultComparison
          openingWidth={openingWidth}
          windowType={windowType}
        />
      </div>

      <aside className="mx-auto w-full max-w-3xl xl:max-w-none">
        <div className="space-y-6 xl:sticky xl:top-24">
          <section className="overflow-hidden rounded-[32px] border border-[#B8F23D]/35 bg-[#B8F23D] text-[#080A09] shadow-2xl shadow-[#B8F23D]/10">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em]">
                Recommended track length
              </p>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
                  <AnimatedNumber value={trackLength} />
                </p>

                <span className="pb-2 text-2xl font-bold">
                  cm
                </span>
              </div>

              <p className="mt-4 max-w-md text-sm leading-6 text-[#1C211A]">
                Based on a {openingWidth} cm opening with{" "}
                {leftExtension} cm on the left and{" "}
                {rightExtension} cm on the right.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="flex items-start gap-3 rounded-[18px] bg-[#080A09]/8 p-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#080A09] text-sm font-bold text-[#B8F23D]">
                    ✓
                  </span>

                  <p className="text-sm leading-6">
                    Improves coverage around the opening.
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-[18px] bg-[#080A09]/8 p-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#080A09] text-sm font-bold text-[#B8F23D]">
                    ✓
                  </span>

                  <p className="text-sm leading-6">
                    Creates space for curtain stack-back.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#080A09]/15 p-5 sm:p-6">
              <TrackDiagram
                openingWidth={openingWidth}
                leftExtension={leftExtension}
                rightExtension={rightExtension}
                trackLength={trackLength}
              />
            </div>

            <details className="border-t border-[#080A09]/15 px-7 py-5 sm:px-8">
              <summary className="cursor-pointer font-semibold">
                Why this recommendation?
              </summary>

              <p className="mt-3 max-w-lg text-sm leading-6 text-[#1C211A]">
                The opening width is combined with the extension on
                both sides. This gives the curtains room to cover the
                opening when closed and move further away from the
                glass when open.
              </p>
            </details>
          </section>

          {needsSpecialistMeasurement && (
            <div className="rounded-[24px] border border-amber-300/30 bg-amber-200/10 p-5 text-sm leading-6 text-amber-100">
              This is only a straight-width estimate. Bay and corner
              tracks need each section and angle measured separately.
            </div>
          )}

          <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Installation guidance
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8F928B]">
                  Track
                </p>

                <p className="mt-2 font-semibold text-[#F4F1E8]">
                  {recommendation.material}
                </p>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8F928B]">
                  Mounting
                </p>

                <p className="mt-2 font-semibold text-[#F4F1E8]">
                  {recommendation.mounting}
                </p>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8F928B]">
                  Curtain heading
                </p>

                <p className="mt-2 font-semibold text-[#F4F1E8]">
                  {recommendation.heading}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#B8F23D]/25 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Next step
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[#F4F1E8]">
              Ready to get it fitted?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#AAACA4]">
              Send your measurement and a few photos. TrackFit can
              assess the fixing surface and provide an installation
              quote.
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
