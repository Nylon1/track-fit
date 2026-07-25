"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Heading = "pencil" | "pinch" | "wave";
type FabricBulk = "light" | "medium" | "heavy";
type CurtainOpening = "pair" | "single-left" | "single-right";

const headingFactors: Record<Heading, number> = {
  pencil: 0.2,
  pinch: 0.23,
  wave: 0.26,
};

const fabricAdjustments: Record<FabricBulk, number> = {
  light: -0.02,
  medium: 0,
  heavy: 0.04,
};

const headingNotes: Record<Heading, string> = {
  pencil:
    "Pencil pleat usually forms a moderate stack, depending on fullness and fabric bulk.",
  pinch:
    "Pinch pleat keeps structured folds, so it normally needs slightly more stack space.",
  wave:
    "Wave curtains retain regular folds when open and usually need the most predictable stack-back allowance.",
};

function roundToNearestFive(value: number) {
  return Math.max(5, Math.round(value / 5) * 5);
}

export function CurtainStackCalculator() {
  const [trackLength, setTrackLength] = useState(300);
  const [heading, setHeading] = useState<Heading>("pencil");
  const [fabricBulk, setFabricBulk] =
    useState<FabricBulk>("medium");
  const [opening, setOpening] =
    useState<CurtainOpening>("pair");

  const estimate = useMemo(() => {
    const factor =
      headingFactors[heading] + fabricAdjustments[fabricBulk];

    const totalStack = roundToNearestFive(trackLength * factor);
    const allowance = fabricBulk === "heavy" ? 10 : 5;

    if (opening === "pair") {
      const perSide = roundToNearestFive(totalStack / 2);

      return {
        totalStack: perSide * 2,
        leftStack: perSide,
        rightStack: perSide,
        low: Math.max(5, perSide - allowance),
        high: perSide + allowance,
      };
    }

    return {
      totalStack,
      leftStack: opening === "single-left" ? totalStack : 0,
      rightStack: opening === "single-right" ? totalStack : 0,
      low: Math.max(5, totalStack - allowance),
      high: totalStack + allowance,
    };
  }, [fabricBulk, heading, opening, trackLength]);

  const clearOpening = Math.max(
    0,
    trackLength - estimate.totalStack,
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

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Enter the track length
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            Use the full length of the curtain track, including any
            extension beyond the window.
          </p>

          <label className="mt-6 block max-w-md">
            <span className="sr-only">
              Track length in centimetres
            </span>

            <div className="flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 transition focus-within:border-[#B8F23D]">
              <input
                type="number"
                min="50"
                max="2000"
                inputMode="decimal"
                value={trackLength}
                onChange={(event) =>
                  setTrackLength(
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

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(
              [
                ["pencil", "Pencil pleat"],
                ["pinch", "Pinch pleat"],
                ["wave", "Wave"],
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

                <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                  {headingNotes[value]}
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
            Choose the fabric bulk
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            Think about how thick the curtains feel when gathered
            together, not only the face fabric.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(
              [
                ["light", "Light"],
                ["medium", "Medium"],
                ["heavy", "Heavy"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={fabricBulk === value}
                onClick={() => setFabricBulk(value)}
                className={optionClass(fabricBulk === value)}
              >
                <span className="block font-semibold">
                  {label}
                </span>

                <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                  {value === "light"
                    ? "Voiles and lightweight unlined curtains."
                    : value === "medium"
                      ? "Most lined domestic curtains."
                      : "Interlined, blackout or dense velvet curtains."}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 4
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            How will the curtains open?
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(
              [
                ["pair", "Pair"],
                ["single-left", "Stack left"],
                ["single-right", "Stack right"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={opening === value}
                onClick={() => setOpening(value)}
                className={optionClass(opening === value)}
              >
                <span className="block font-semibold">
                  {label}
                </span>

                <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                  {value === "pair"
                    ? "Two curtains meet in the centre."
                    : value === "single-left"
                      ? "One curtain stacks at the left."
                      : "One curtain stacks at the right."}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <aside className="mx-auto w-full max-w-3xl xl:max-w-none">
        <div className="space-y-6 xl:sticky xl:top-24">
          <section className="overflow-hidden rounded-[32px] border border-[#B8F23D]/35 bg-[#B8F23D] text-[#080A09] shadow-2xl shadow-[#B8F23D]/10">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em]">
                Estimated curtain stack-back
              </p>

              {opening === "pair" ? (
                <div className="mt-5">
                  <p className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                    {estimate.leftStack} cm
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    at each side
                  </p>
                </div>
              ) : (
                <div className="mt-5">
                  <p className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                    {estimate.totalStack} cm
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    on the {opening === "single-left" ? "left" : "right"}
                  </p>
                </div>
              )}

              <p className="mt-5 text-sm leading-6 text-[#1C211A]">
                A practical planning range is approximately{" "}
                <strong>
                  {estimate.low}–{estimate.high} cm
                </strong>{" "}
                {opening === "pair" ? "per side" : "in total"}.
              </p>
            </div>

            <div className="border-t border-[#080A09]/15 p-5 sm:p-6">
              <div className="rounded-[24px] border border-[#080A09]/15 bg-[#F4F1E8]/55 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#080A09]/65">
                  Track visual
                </p>

                <div className="mt-7">
                  <div className="flex h-20 overflow-hidden rounded-[18px] border border-[#080A09]/20 bg-white/60">
                    {estimate.leftStack > 0 && (
                      <div
                        className="grid place-items-center border-r border-[#080A09]/20 bg-[#080A09] px-2 text-center text-xs font-bold text-[#B8F23D]"
                        style={{
                          width: `${Math.min(
                            42,
                            (estimate.leftStack /
                              Math.max(trackLength, 1)) *
                              100,
                          )}%`,
                        }}
                      >
                        {estimate.leftStack} cm
                      </div>
                    )}

                    <div className="grid min-w-0 flex-1 place-items-center px-3 text-center">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                          Clear opening
                        </p>
                        <p className="mt-1 text-lg font-bold">
                          {clearOpening} cm
                        </p>
                      </div>
                    </div>

                    {estimate.rightStack > 0 && (
                      <div
                        className="grid place-items-center border-l border-[#080A09]/20 bg-[#080A09] px-2 text-center text-xs font-bold text-[#B8F23D]"
                        style={{
                          width: `${Math.min(
                            42,
                            (estimate.rightStack /
                              Math.max(trackLength, 1)) *
                              100,
                          )}%`,
                        }}
                      >
                        {estimate.rightStack} cm
                      </div>
                    )}
                  </div>

                  <div className="mt-5 h-3 rounded-full bg-[#080A09]" />

                  <div className="mt-3 flex items-center justify-between gap-4 text-sm font-bold">
                    <span>Full track length</span>
                    <span>{trackLength} cm</span>
                  </div>
                </div>
              </div>
            </div>

            <details className="border-t border-[#080A09]/15 px-7 py-5 sm:px-8">
              <summary className="cursor-pointer font-semibold">
                How is this estimated?
              </summary>

              <p className="mt-3 text-sm leading-6 text-[#1C211A]">
                The estimate uses the track length, curtain heading,
                fabric bulk and opening direction. It is rounded to a
                practical 5 cm increment because final stack-back
                varies with fullness, lining, pleat construction and
                how tightly the curtains dress.
              </p>
            </details>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Planning result
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8F928B]">
                  Total curtain stack
                </p>
                <p className="mt-2 text-xl font-semibold">
                  {estimate.totalStack} cm
                </p>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8F928B]">
                  Approximate clear track
                </p>
                <p className="mt-2 text-xl font-semibold">
                  {clearOpening} cm
                </p>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8F928B]">
                  Selected heading
                </p>
                <p className="mt-2 font-semibold capitalize">
                  {heading === "pencil"
                    ? "Pencil pleat"
                    : heading === "pinch"
                      ? "Pinch pleat"
                      : "Wave"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Planning estimate
            </p>

            <p className="mt-3 text-sm leading-6 text-amber-50">
              Stack-back cannot be exact until the finished curtains
              are made and dressed. Use this result to plan wall space,
              track extensions and likely glass clearance.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#B8F23D]/25 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Professional installation
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Need help planning the track?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#AAACA4]">
              Send the track length, curtain details and photos of the
              window. TrackFit can review the available stack space and
              recommend a practical installation.
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
