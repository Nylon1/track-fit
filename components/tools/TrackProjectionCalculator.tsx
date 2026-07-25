"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ToolResultActions } from "@/components/tools/ToolResultActions";

type Mounting = "ceiling" | "wall";
type Heading = "pencil" | "pinch" | "wave";
type Obstruction = "none" | "handle" | "sill" | "radiator" | "custom";

const headingDepth: Record<Heading, number> = {
  pencil: 7,
  pinch: 9,
  wave: 11,
};

const headingLabels: Record<Heading, string> = {
  pencil: "Pencil pleat",
  pinch: "Pinch pleat",
  wave: "Wave",
};

const obstructionLabels: Record<Obstruction, string> = {
  none: "No obstruction",
  handle: "Window handle",
  sill: "Deep sill",
  radiator: "Radiator",
  custom: "Custom obstruction",
};

const obstructionDefaults: Record<
  Exclude<Obstruction, "custom">,
  number
> = {
  none: 0,
  handle: 5,
  sill: 10,
  radiator: 15,
};

function roundToHalf(value: number) {
  return Math.round(value * 2) / 2;
}

export function TrackProjectionCalculator() {
  const [mounting, setMounting] =
    useState<Mounting>("ceiling");
  const [heading, setHeading] =
    useState<Heading>("pencil");
  const [obstruction, setObstruction] =
    useState<Obstruction>("radiator");
  const [customObstruction, setCustomObstruction] =
    useState(12);
  const [wallClearance, setWallClearance] = useState(3);
  const [extraClearance, setExtraClearance] = useState(2);

  const obstructionDepth =
    obstruction === "custom"
      ? Math.max(0, customObstruction)
      : obstructionDefaults[obstruction];

  const result = useMemo(() => {
    const recommendedTrackLine = roundToHalf(
      wallClearance +
        obstructionDepth +
        headingDepth[heading] +
        extraClearance,
    );

    const minimumTrackLine = roundToHalf(
      wallClearance +
        obstructionDepth +
        headingDepth[heading],
    );

    const frontCurtainEdge = roundToHalf(
      recommendedTrackLine +
        headingDepth[heading] / 2,
    );

    return {
      recommendedTrackLine,
      minimumTrackLine,
      frontCurtainEdge,
    };
  }, [
    extraClearance,
    heading,
    obstructionDepth,
    wallClearance,
  ]);

  const optionClass = (selected: boolean) =>
    [
      "rounded-[22px] border p-5 text-left transition",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F23D]",
      selected
        ? "border-[#B8F23D] bg-[#B8F23D]/10"
        : "border-white/10 bg-[#080A09] hover:border-white/25 hover:bg-white/[0.025]",
    ].join(" ");

  return (
    <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_440px]">
      <div className="space-y-8">
        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 1
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Choose the mounting type
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
            Choose the curtain heading
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(["pencil", "pinch", "wave"] as const).map(
              (value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={heading === value}
                  onClick={() => setHeading(value)}
                  className={optionClass(heading === value)}
                >
                  <span className="block font-semibold">
                    {headingLabels[value]}
                  </span>

                  <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                    Approximate fold depth:{" "}
                    {headingDepth[value]} cm
                  </span>
                </button>
              ),
            )}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 3
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            What must the curtain clear?
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(
              [
                "none",
                "handle",
                "sill",
                "radiator",
                "custom",
              ] as const
            ).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={obstruction === value}
                onClick={() => setObstruction(value)}
                className={optionClass(obstruction === value)}
              >
                <span className="block font-semibold">
                  {obstructionLabels[value]}
                </span>

                <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                  {value === "none"
                    ? "No projection beyond the wall line."
                    : value === "handle"
                      ? "Allow room for handles and catches."
                      : value === "sill"
                        ? "Clear a sill projecting into the room."
                        : value === "radiator"
                          ? "Keep curtains in front of the radiator."
                          : "Enter the measured projection."}
                </span>
              </button>
            ))}
          </div>

          {obstruction === "custom" && (
            <label className="mt-6 block max-w-xs text-sm font-semibold">
              Obstruction depth

              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={customObstruction}
                  onChange={(event) =>
                    setCustomObstruction(
                      Math.max(
                        0,
                        Number(event.target.value) || 0,
                      ),
                    )
                  }
                  className="min-h-12 min-w-0 flex-1 bg-transparent outline-none"
                />

                <span className="text-[#B8F23D]">
                  cm
                </span>
              </div>
            </label>
          )}
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 4
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Add installation clearances
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Basic wall clearance

              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="0"
                  max="30"
                  step="0.5"
                  value={wallClearance}
                  onChange={(event) =>
                    setWallClearance(
                      Math.max(
                        0,
                        Number(event.target.value) || 0,
                      ),
                    )
                  }
                  className="min-h-12 min-w-0 flex-1 bg-transparent outline-none"
                />

                <span className="text-[#B8F23D]">
                  cm
                </span>
              </div>
            </label>

            <label className="text-sm font-semibold">
              Extra movement clearance

              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="0"
                  max="30"
                  step="0.5"
                  value={extraClearance}
                  onChange={(event) =>
                    setExtraClearance(
                      Math.max(
                        0,
                        Number(event.target.value) || 0,
                      ),
                    )
                  }
                  className="min-h-12 min-w-0 flex-1 bg-transparent outline-none"
                />

                <span className="text-[#B8F23D]">
                  cm
                </span>
              </div>
            </label>
          </div>
        </section>
      </div>

      <aside className="mx-auto w-full max-w-3xl xl:max-w-none">
        <div className="space-y-6 xl:sticky xl:top-24">
          <section className="tool-result-card overflow-hidden rounded-[32px] border border-[#B8F23D]/35 bg-[#B8F23D] text-[#080A09]">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em]">
                Recommended track line
              </p>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
                  {result.recommendedTrackLine}
                </p>

                <span className="pb-2 text-2xl font-bold">
                  cm
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#1C211A]">
                Position the track centre approximately{" "}
                {result.recommendedTrackLine} cm from the wall or
                reference surface.
              </p>
            </div>

            <div className="border-t border-[#080A09]/15 p-5 sm:p-6">
              <div className="rounded-[24px] border border-[#080A09]/15 bg-[#F4F1E8]/65 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#080A09]/65">
                  Side-view visual
                </p>

                <div className="relative mt-7 h-72 overflow-hidden rounded-[20px] border border-[#080A09]/20 bg-white/75">
                  <div className="absolute inset-y-0 left-0 w-5 bg-[#080A09]">
                    <span className="absolute left-7 top-4 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.15em] text-[#080A09]/60">
                      Wall
                    </span>
                  </div>

                  <div
                    className="absolute bottom-6 left-5 h-20 rounded-r-[12px] bg-[#080A09]/20"
                    style={{
                      width: `${Math.max(
                        8,
                        obstructionDepth * 4,
                      )}px`,
                    }}
                  >
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.12em]">
                      {obstructionLabels[obstruction]}
                    </span>
                  </div>

                  <div
                    className="absolute top-14 h-4 rounded-full bg-[#080A09]"
                    style={{
                      left: `${Math.min(
                        300,
                        30 +
                          result.recommendedTrackLine *
                            5,
                      )}px`,
                      width: "110px",
                    }}
                  >
                    <span className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold">
                      Track
                    </span>
                  </div>

                  <div
                    className="absolute top-20 bottom-6 w-24 rounded-b-[18px] bg-[repeating-linear-gradient(90deg,rgba(8,10,9,0.28)_0px,rgba(8,10,9,0.28)_10px,rgba(8,10,9,0.08)_10px,rgba(8,10,9,0.08)_20px)]"
                    style={{
                      left: `${Math.min(
                        325,
                        36 +
                          result.recommendedTrackLine *
                            5,
                      )}px`,
                    }}
                  />

                  <div
                    className="absolute top-4 h-px border-t-2 border-dashed border-[#B8F23D]"
                    style={{
                      left: "20px",
                      width: `${Math.min(
                        320,
                        result.recommendedTrackLine *
                          5,
                      )}px`,
                    }}
                  >
                    <span className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#B8F23D] px-2 py-1 text-[10px] font-bold">
                      {result.recommendedTrackLine} cm
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-6 bg-[#080A09] text-center text-[10px] font-bold uppercase tracking-[0.15em] text-[#B8F23D]">
                    Floor
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                      Minimum
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {result.minimumTrackLine} cm
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                      Recommended
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {result.recommendedTrackLine} cm
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                      Curtain front
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {result.frontCurtainEdge} cm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <details className="border-t border-[#080A09]/15 px-7 py-5 sm:px-8">
              <summary className="cursor-pointer font-semibold">
                How is this calculated?
              </summary>

              <p className="mt-3 text-sm leading-6 text-[#1C211A]">
                The track line combines the wall clearance, the
                measured obstruction depth, the approximate curtain
                fold depth and the selected movement allowance.
              </p>
            </details>
          </section>

          <ToolResultActions
            toolName="Curtain Track Projection Calculator"
            resultTitle="Recommended track line from wall"
            resultValue={`${result.recommendedTrackLine} cm`}
            rows={[
              {
                label: "Mounting",
                value:
                  mounting === "ceiling"
                    ? "Ceiling mounted"
                    : "Wall mounted",
              },
              {
                label: "Heading",
                value: headingLabels[heading],
              },
              {
                label: "Obstruction",
                value: obstructionLabels[obstruction],
              },
              {
                label: "Obstruction depth",
                value: `${obstructionDepth} cm`,
              },
              {
                label: "Minimum track line",
                value: `${result.minimumTrackLine} cm`,
              },
              {
                label: "Recommended track line",
                value: `${result.recommendedTrackLine} cm`,
              },
            ]}
            notes={[
              "Planning estimate only; check the actual curtain fold depth.",
              "Confirm that handles, radiators and sills remain clear throughout curtain movement.",
            ]}
            sharePath="/tools/curtain-track-projection-calculator"
          />

          <section className="rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Important
            </p>

            <p className="mt-3 text-sm leading-6 text-amber-50">
              This is a planning estimate. Check the actual track
              bracket projection, curtain heading depth and any
              radiator or handle movement before drilling.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#B8F23D]/25 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Professional installation
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Need the projection checked on site?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#AAACA4]">
              Send photos of the window, handles, sill and radiator.
              TrackFit can plan a practical track line before fitting.
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
