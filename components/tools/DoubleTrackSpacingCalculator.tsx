"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ToolResultActions } from "@/components/tools/ToolResultActions";

type FrontHeading = "pencil" | "pinch" | "wave";
type RearLayer = "voile" | "light-curtain" | "blackout-lining";
type Mounting = "ceiling" | "wall";

const frontHeadingLabels: Record<FrontHeading, string> = {
  pencil: "Pencil pleat",
  pinch: "Pinch pleat",
  wave: "Wave",
};

const rearLayerLabels: Record<RearLayer, string> = {
  voile: "Voile or sheer",
  "light-curtain": "Light curtain",
  "blackout-lining": "Separate blackout layer",
};

const headingDepth: Record<FrontHeading, number> = {
  pencil: 7,
  pinch: 9,
  wave: 11,
};

const rearDepth: Record<RearLayer, number> = {
  voile: 4,
  "light-curtain": 6,
  "blackout-lining": 8,
};

function roundToHalf(value: number) {
  return Math.round(value * 2) / 2;
}

export function DoubleTrackSpacingCalculator() {
  const [mounting, setMounting] =
    useState<Mounting>("ceiling");
  const [frontHeading, setFrontHeading] =
    useState<FrontHeading>("pencil");
  const [rearLayer, setRearLayer] =
    useState<RearLayer>("voile");
  const [extraClearance, setExtraClearance] = useState(2);
  const [wallClearance, setWallClearance] = useState(5);
  const [obstructionDepth, setObstructionDepth] = useState(0);

  const result = useMemo(() => {
    const layerGap = roundToHalf(
      headingDepth[frontHeading] +
        rearDepth[rearLayer] +
        Math.max(0, extraClearance),
    );

    const rearTrackFromWall = roundToHalf(
      Math.max(0, wallClearance) +
        Math.max(0, obstructionDepth),
    );

    const frontTrackFromWall = roundToHalf(
      rearTrackFromWall + layerGap,
    );

    const totalProjection = roundToHalf(
      frontTrackFromWall + headingDepth[frontHeading] / 2,
    );

    return {
      layerGap,
      rearTrackFromWall,
      frontTrackFromWall,
      totalProjection,
    };
  }, [
    extraClearance,
    frontHeading,
    obstructionDepth,
    rearLayer,
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
            Choose the front curtain heading
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(["pencil", "pinch", "wave"] as const).map(
              (value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={frontHeading === value}
                  onClick={() => setFrontHeading(value)}
                  className={optionClass(
                    frontHeading === value,
                  )}
                >
                  <span className="block font-semibold">
                    {frontHeadingLabels[value]}
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
            Choose the rear curtain layer
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(
              [
                "voile",
                "light-curtain",
                "blackout-lining",
              ] as const
            ).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={rearLayer === value}
                onClick={() => setRearLayer(value)}
                className={optionClass(rearLayer === value)}
              >
                <span className="block font-semibold">
                  {rearLayerLabels[value]}
                </span>

                <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                  Approximate layer depth:{" "}
                  {rearDepth[value]} cm
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
            Add clearance allowances
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <label className="text-sm font-semibold">
              Wall clearance

              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="0"
                  max="100"
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

                <span className="text-[#B8F23D]">cm</span>
              </div>
            </label>

            <label className="text-sm font-semibold">
              Obstruction depth

              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={obstructionDepth}
                  onChange={(event) =>
                    setObstructionDepth(
                      Math.max(
                        0,
                        Number(event.target.value) || 0,
                      ),
                    )
                  }
                  className="min-h-12 min-w-0 flex-1 bg-transparent outline-none"
                />

                <span className="text-[#B8F23D]">cm</span>
              </div>
            </label>

            <label className="text-sm font-semibold">
              Extra layer gap

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

                <span className="text-[#B8F23D]">cm</span>
              </div>
            </label>
          </div>

          <p className="mt-4 text-sm leading-6 text-[#8F928B]">
            Obstruction depth can represent a window handle,
            radiator projection, deep sill or another feature the
            rear curtain must clear.
          </p>
        </section>
      </div>

      <aside className="mx-auto w-full max-w-3xl xl:max-w-none">
        <div className="space-y-6 xl:sticky xl:top-24">
          <section className="tool-result-card overflow-hidden rounded-[32px] border border-[#B8F23D]/35 bg-[#B8F23D] text-[#080A09]">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em]">
                Recommended track spacing
              </p>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
                  {result.layerGap}
                </p>

                <span className="pb-2 text-2xl font-bold">
                  cm
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#1C211A]">
                Recommended centre-to-centre distance between the rear
                and front tracks.
              </p>
            </div>

            <div className="border-t border-[#080A09]/15 p-5 sm:p-6">
              <div className="rounded-[24px] border border-[#080A09]/15 bg-[#F4F1E8]/65 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#080A09]/65">
                  Side-view visual
                </p>

                <div className="relative mt-8 h-72 overflow-hidden rounded-[20px] border border-[#080A09]/20 bg-white/75">
                  <div className="absolute inset-y-0 left-0 w-5 bg-[#080A09]">
                    <span className="absolute left-7 top-4 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.15em] text-[#080A09]/60">
                      Wall
                    </span>
                  </div>

                  <div
                    className="absolute top-14 h-4 rounded-full bg-[#080A09]/65"
                    style={{
                      left: `${Math.min(
                        70,
                        12 + result.rearTrackFromWall * 2,
                      )}px`,
                      width: "95px",
                    }}
                  >
                    <span className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold">
                      Rear track
                    </span>
                  </div>

                  <div
                    className="absolute top-14 h-4 rounded-full bg-[#080A09]"
                    style={{
                      left: `${Math.min(
                        245,
                        12 +
                          result.frontTrackFromWall * 2,
                      )}px`,
                      width: "110px",
                    }}
                  >
                    <span className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold">
                      Front track
                    </span>
                  </div>

                  <div
                    className="absolute top-20 bottom-7 w-16 rounded-b-[18px] bg-[repeating-linear-gradient(90deg,rgba(8,10,9,0.16)_0px,rgba(8,10,9,0.16)_8px,rgba(8,10,9,0.06)_8px,rgba(8,10,9,0.06)_16px)]"
                    style={{
                      left: `${Math.min(
                        95,
                        24 + result.rearTrackFromWall * 2,
                      )}px`,
                    }}
                  />

                  <div
                    className="absolute top-20 bottom-7 w-24 rounded-b-[18px] bg-[repeating-linear-gradient(90deg,rgba(8,10,9,0.27)_0px,rgba(8,10,9,0.27)_10px,rgba(8,10,9,0.08)_10px,rgba(8,10,9,0.08)_20px)]"
                    style={{
                      left: `${Math.min(
                        270,
                        20 +
                          result.frontTrackFromWall * 2,
                      )}px`,
                    }}
                  />

                  <div
                    className="absolute top-4 h-px border-t-2 border-dashed border-[#B8F23D]"
                    style={{
                      left: `${Math.min(
                        110,
                        45 + result.rearTrackFromWall * 2,
                      )}px`,
                      width: `${Math.max(
                        55,
                        result.layerGap * 3,
                      )}px`,
                    }}
                  >
                    <span className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#B8F23D] px-2 py-1 text-[10px] font-bold">
                      {result.layerGap} cm
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-6 bg-[#080A09] text-center text-[10px] font-bold uppercase tracking-[0.15em] text-[#B8F23D]">
                    Floor
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                      Rear track
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {result.rearTrackFromWall} cm
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                      Front track
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {result.frontTrackFromWall} cm
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                      Total projection
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {result.totalProjection} cm
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
                The spacing combines the approximate depth of the
                front curtain folds, the rear layer and the selected
                extra clearance. The wall position also includes any
                obstruction that the rear curtain must clear.
              </p>
            </details>
          </section>

          <ToolResultActions
            toolName="Double Curtain Track Spacing Calculator"
            resultTitle="Recommended centre-to-centre track spacing"
            resultValue={`${result.layerGap} cm`}
            rows={[
              {
                label: "Mounting",
                value:
                  mounting === "ceiling"
                    ? "Ceiling mounted"
                    : "Wall mounted",
              },
              {
                label: "Front heading",
                value: frontHeadingLabels[frontHeading],
              },
              {
                label: "Rear layer",
                value: rearLayerLabels[rearLayer],
              },
              {
                label: "Rear track from wall",
                value: `${result.rearTrackFromWall} cm`,
              },
              {
                label: "Front track from wall",
                value: `${result.frontTrackFromWall} cm`,
              },
              {
                label: "Overall projection",
                value: `${result.totalProjection} cm`,
              },
            ]}
            notes={[
              "Planning estimate only; actual curtain fold depth varies.",
              "Check handles, radiators, sills and track-system specifications before installation.",
            ]}
            sharePath="/tools/double-curtain-track-spacing-calculator"
          />

          <section className="rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Important
            </p>

            <p className="mt-3 text-sm leading-6 text-amber-50">
              Curtain depth varies with fullness, lining and how the
              curtains are dressed. Check the actual heading depth and
              the double-track manufacturer's minimum spacing before
              drilling.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#B8F23D]/25 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Professional installation
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Need a double-track layout checked?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#AAACA4]">
              Send photos of the window, ceiling and any radiator or
              handle projection. TrackFit can plan the two track lines
              before installation.
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
