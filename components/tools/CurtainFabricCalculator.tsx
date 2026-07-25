"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ToolResultActions } from "@/components/tools/ToolResultActions";

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

const headingLabels: Record<Heading, string> = {
  pencil: "Pencil pleat",
  "double-pinch": "Double pinch pleat",
  "triple-pinch": "Triple pinch pleat",
  wave: "Wave",
  eyelet: "Eyelet",
};

function roundUpToTenth(value: number) {
  return Math.ceil(value * 10) / 10;
}

export function CurtainFabricCalculator() {
  const [trackWidth, setTrackWidth] = useState(300);
  const [finishedDrop, setFinishedDrop] = useState(240);
  const [fabricWidth, setFabricWidth] = useState(137);
  const [patternRepeat, setPatternRepeat] = useState(0);
  const [heading, setHeading] = useState<Heading>("pencil");
  const [arrangement, setArrangement] =
    useState<Arrangement>("pair");
  const [fullnessPreset, setFullnessPreset] =
    useState<FullnessPreset>("standard");
  const [customFullness, setCustomFullness] = useState(2);
  const [hemAllowance, setHemAllowance] = useState(25);

  const fullness =
    fullnessPreset === "custom"
      ? Math.max(1, customFullness)
      : fullnessPresets[fullnessPreset];

  const result = useMemo(() => {
    const totalFinishedWidth = trackWidth * fullness;
    const widthsNeeded = Math.max(
      1,
      Math.ceil(totalFinishedWidth / fabricWidth),
    );

    const dropWithAllowances = finishedDrop + hemAllowance;

    const adjustedCutLength =
      patternRepeat > 0
        ? Math.ceil(dropWithAllowances / patternRepeat) *
          patternRepeat
        : dropWithAllowances;

    const totalFabricMetres = roundUpToTenth(
      (widthsNeeded * adjustedCutLength) / 100,
    );

    const widthsPerCurtain =
      arrangement === "pair"
        ? Math.ceil(widthsNeeded / 2)
        : widthsNeeded;

    return {
      totalFinishedWidth,
      widthsNeeded,
      widthsPerCurtain,
      adjustedCutLength,
      totalFabricMetres,
    };
  }, [
    arrangement,
    fabricWidth,
    finishedDrop,
    fullness,
    hemAllowance,
    patternRepeat,
    trackWidth,
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
    <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_430px]">
      <div className="space-y-8">
        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 1
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Enter the track width
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            Use the full width the curtains need to cover.
          </p>

          <label className="mt-6 block max-w-md">
            <span className="sr-only">
              Track width in centimetres
            </span>

            <div className="flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
              <input
                type="number"
                min="50"
                max="2000"
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
            Enter the finished drop
          </h2>

          <label className="mt-6 block max-w-md">
            <span className="sr-only">
              Finished curtain drop in centimetres
            </span>

            <div className="flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
              <input
                type="number"
                min="20"
                max="500"
                value={finishedDrop}
                onChange={(event) =>
                  setFinishedDrop(
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
            Choose the heading and fullness
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
                onClick={() => setHeading(value)}
                className={optionClass(heading === value)}
              >
                <span className="block font-semibold">
                  {headingLabels[value]}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["minimal", "1.5× fullness"],
                ["standard", "2× fullness"],
                ["luxury", "2.5× fullness"],
                ["custom", "Custom fullness"],
              ] as const
            ).map(([value, label]) => (
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
                  {label}
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
            Enter the fabric details
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Fabric width

              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="50"
                  max="400"
                  value={fabricWidth}
                  onChange={(event) =>
                    setFabricWidth(
                      Math.max(
                        1,
                        Number(event.target.value) || 1,
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

            <label className="text-sm font-semibold">
              Pattern repeat

              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={patternRepeat}
                  onChange={(event) =>
                    setPatternRepeat(
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

            <label className="text-sm font-semibold">
              Hem and heading allowance

              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hemAllowance}
                  onChange={(event) =>
                    setHemAllowance(
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
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 5
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
            </button>
          </div>
        </section>
      </div>

      <aside className="mx-auto w-full max-w-3xl xl:max-w-none">
        <div className="space-y-6 xl:sticky xl:top-24">
          <section className="tool-result-card overflow-hidden rounded-[32px] border border-[#B8F23D]/35 bg-[#B8F23D] text-[#080A09] shadow-2xl shadow-[#B8F23D]/10">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em]">
                Estimated fabric required
              </p>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
                  {result.totalFabricMetres}
                </p>

                <span className="pb-2 text-2xl font-bold">
                  metres
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#1C211A]">
                Based on {result.widthsNeeded} fabric widths at{" "}
                {result.adjustedCutLength} cm per cut.
              </p>
            </div>

            <div className="border-t border-[#080A09]/15 p-5 sm:p-6">
              <div className="rounded-[24px] border border-[#080A09]/15 bg-[#F4F1E8]/65 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#080A09]/65">
                  Fabric layout
                </p>

                <div className="mt-6 grid gap-2"
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(
                      result.widthsNeeded,
                      8,
                    )}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({
                    length: Math.min(
                      result.widthsNeeded,
                      8,
                    ),
                  }).map((_, index) => (
                    <div
                      key={index}
                      className="flex h-32 flex-col justify-between rounded-[14px] border border-[#080A09]/15 bg-white/75 p-2 text-center"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#080A09]/60">
                        Width {index + 1}
                      </span>

                      <span className="text-xs font-bold">
                        {fabricWidth} cm
                      </span>

                      <span className="text-[10px] text-[#080A09]/60">
                        {result.adjustedCutLength} cm cut
                      </span>
                    </div>
                  ))}
                </div>

                {result.widthsNeeded > 8 && (
                  <p className="mt-3 text-center text-xs font-semibold text-[#080A09]/60">
                    Plus {result.widthsNeeded - 8} additional widths
                  </p>
                )}

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                      Widths
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {result.widthsNeeded}
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                      Cut length
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {result.adjustedCutLength} cm
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                      Total
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {result.totalFabricMetres} m
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
                The calculator works out the total finished curtain
                width, divides it by the fabric width to find the
                number of widths required, then multiplies that by the
                adjusted cut length.
              </p>
            </details>
          </section>

          <ToolResultActions
            toolName="Curtain Fabric Calculator"
            resultTitle="Estimated fabric required"
            resultValue={`${result.totalFabricMetres} metres`}
            rows={[
              {
                label: "Track width",
                value: `${trackWidth} cm`,
              },
              {
                label: "Finished drop",
                value: `${finishedDrop} cm`,
              },
              {
                label: "Fabric width",
                value: `${fabricWidth} cm`,
              },
              {
                label: "Pattern repeat",
                value: `${patternRepeat} cm`,
              },
              {
                label: "Fabric widths required",
                value: `${result.widthsNeeded}`,
              },
              {
                label: "Cut length",
                value: `${result.adjustedCutLength} cm`,
              },
            ]}
            notes={[
              `Heading: ${headingLabels[heading]}`,
              `Fullness: ${fullness.toFixed(1)}×`,
              `Arrangement: ${
                arrangement === "pair" ? "Pair" : "Single"
              }`,
            ]}
            sharePath="/tools/curtain-fabric-calculator"
          />

          <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Planning breakdown
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8F928B]">
                  Finished curtain width
                </p>
                <p className="mt-2 text-xl font-semibold">
                  {result.totalFinishedWidth} cm
                </p>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8F928B]">
                  Widths per curtain
                </p>
                <p className="mt-2 text-xl font-semibold">
                  {result.widthsPerCurtain}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Important
            </p>

            <p className="mt-3 text-sm leading-6 text-amber-50">
              This is a planning estimate. Fabric quantity can vary
              with pattern matching, railroaded fabric, side hems,
              joins, heading construction and workroom methods.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#B8F23D]/25 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Professional installation
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Need the track fitted first?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#AAACA4]">
              Send your measurements and photos. TrackFit can assess
              the track position and provide an installation quote.
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
