"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ToolResultActions } from "@/components/tools/ToolResultActions";

type Mounting = "ceiling" | "wall";
type TrackShape = "straight" | "bay" | "curved";

function roundToOne(value: number) {
  return Math.round(value * 10) / 10;
}

export function BracketPlacementCalculator() {
  const [trackLength, setTrackLength] = useState(300);
  const [mounting, setMounting] = useState<Mounting>("ceiling");
  const [trackShape, setTrackShape] =
    useState<TrackShape>("straight");
  const [endAllowance, setEndAllowance] = useState(10);
  const [maxSpacing, setMaxSpacing] = useState(60);
  const [joinPositions, setJoinPositions] = useState<number[]>([]);

  const result = useMemo(() => {
    const safeLength = Math.max(0, trackLength);
    const left = Math.min(endAllowance, safeLength / 2);
    const right = Math.max(left, safeLength - endAllowance);
    const usableSpan = Math.max(0, right - left);

    const intervalCount = Math.max(
      1,
      Math.ceil(usableSpan / Math.max(1, maxSpacing)),
    );

    const actualSpacing = usableSpan / intervalCount;

    const positions = Array.from(
      { length: intervalCount + 1 },
      (_, index) => roundToOne(left + actualSpacing * index),
    );

    const joinSupportOffset = 8;

    const joinSupports = joinPositions.flatMap((join) => [
      Math.max(left, roundToOne(join - joinSupportOffset)),
      Math.min(right, roundToOne(join + joinSupportOffset)),
    ]);

    const merged = [...positions, ...joinSupports]
      .filter((position) => position >= 0 && position <= safeLength)
      .sort((a, b) => a - b)
      .filter(
        (position, index, values) =>
          index === 0 || Math.abs(position - values[index - 1]) >= 2,
      );

    return {
      positions: merged,
      bracketCount: merged.length,
      actualSpacing: roundToOne(actualSpacing),
      usableSpan: roundToOne(usableSpan),
    };
  }, [
    endAllowance,
    joinPositions,
    maxSpacing,
    trackLength,
  ]);

  const addJoin = () => {
    const suggested =
      joinPositions.length === 0
        ? trackLength / 2
        : Math.min(
            trackLength - endAllowance,
            joinPositions[joinPositions.length - 1] + 100,
          );

    setJoinPositions((current) => [
      ...current,
      roundToOne(Math.max(endAllowance, suggested)),
    ]);
  };

  const updateJoin = (index: number, value: number) => {
    setJoinPositions((current) =>
      current.map((join, joinIndex) =>
        joinIndex === index
          ? Math.min(
              Math.max(0, value),
              Math.max(0, trackLength),
            )
          : join,
      ),
    );
  };

  const removeJoin = (index: number) => {
    setJoinPositions((current) =>
      current.filter((_, joinIndex) => joinIndex !== index),
    );
  };

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
            Enter the track length
          </h2>

          <label className="mt-6 block max-w-md">
            <div className="flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
              <input
                type="number"
                min="20"
                max="3000"
                value={trackLength}
                onChange={(event) =>
                  setTrackLength(
                    Math.max(0, Number(event.target.value) || 0),
                  )
                }
                className="min-h-14 min-w-0 flex-1 bg-transparent text-2xl font-semibold outline-none"
              />
              <span className="font-semibold text-[#B8F23D]">cm</span>
            </div>
          </label>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 2
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Choose the installation type
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(["ceiling", "wall"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setMounting(value)}
                className={optionClass(mounting === value)}
              >
                <span className="font-semibold capitalize">
                  {value} mounted
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(["straight", "bay", "curved"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setTrackShape(value)}
                className={optionClass(trackShape === value)}
              >
                <span className="font-semibold capitalize">
                  {value} track
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
            Set the spacing rules
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Distance from each end

              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={endAllowance}
                  onChange={(event) =>
                    setEndAllowance(
                      Math.max(0, Number(event.target.value) || 0),
                    )
                  }
                  className="min-h-12 min-w-0 flex-1 bg-transparent outline-none"
                />
                <span className="text-[#B8F23D]">cm</span>
              </div>
            </label>

            <label className="text-sm font-semibold">
              Maximum bracket spacing

              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="10"
                  max="200"
                  value={maxSpacing}
                  onChange={(event) =>
                    setMaxSpacing(
                      Math.max(1, Number(event.target.value) || 1),
                    )
                  }
                  className="min-h-12 min-w-0 flex-1 bg-transparent outline-none"
                />
                <span className="text-[#B8F23D]">cm</span>
              </div>
            </label>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 4
          </p>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold">
                Add track joins
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
                Add the position of each join measured from the left end.
              </p>
            </div>

            <button
              type="button"
              onClick={addJoin}
              className="shrink-0 rounded-full bg-[#B8F23D] px-5 py-3 text-sm font-semibold text-[#080A09]"
            >
              Add join
            </button>
          </div>

          {joinPositions.length === 0 ? (
            <p className="mt-6 rounded-[20px] border border-dashed border-white/15 p-5 text-sm text-[#8F928B]">
              No joins added.
            </p>
          ) : (
            <div className="mt-6 space-y-3">
              {joinPositions.map((join, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-[#080A09] p-4"
                >
                  <span className="text-sm font-semibold">
                    Join {index + 1}
                  </span>

                  <div className="ml-auto flex items-center rounded-full border border-white/15 px-4">
                    <input
                      type="number"
                      min="0"
                      max={trackLength}
                      value={join}
                      onChange={(event) =>
                        updateJoin(
                          index,
                          Number(event.target.value) || 0,
                        )
                      }
                      className="min-h-11 w-24 bg-transparent text-right outline-none"
                    />
                    <span className="ml-2 text-[#B8F23D]">cm</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeJoin(index)}
                    className="text-sm text-[#AAACA4] hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <aside className="mx-auto w-full max-w-3xl xl:max-w-none">
        <div className="space-y-6 xl:sticky xl:top-24">
          <section className="tool-result-card overflow-hidden rounded-[32px] border border-[#B8F23D]/35 bg-[#B8F23D] text-[#080A09]">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em]">
                Recommended bracket layout
              </p>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
                  {result.bracketCount}
                </p>
                <span className="pb-2 text-2xl font-bold">
                  brackets
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#1C211A]">
                Evenly distributed at approximately{" "}
                {result.actualSpacing} cm between main brackets.
              </p>
            </div>

            <div className="border-t border-[#080A09]/15 p-5 sm:p-6">
              <div className="rounded-[24px] border border-[#080A09]/15 bg-[#F4F1E8]/65 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#080A09]/65">
                  Track visual
                </p>

                <div className="relative mt-10 h-28">
                  <div className="absolute inset-x-0 top-10 h-3 rounded-full bg-[#080A09]" />

                  {result.positions.map((position, index) => {
                    const percent =
                      trackLength > 0
                        ? (position / trackLength) * 100
                        : 0;

                    return (
                      <div
                        key={`${position}-${index}`}
                        className="absolute top-2 -translate-x-1/2 text-center"
                        style={{ left: `${percent}%` }}
                      >
                        <span className="block whitespace-nowrap text-[10px] font-bold">
                          {position} cm
                        </span>
                        <span className="mx-auto mt-2 block h-10 w-3 rounded-t bg-[#080A09]" />
                      </div>
                    );
                  })}

                  {joinPositions.map((join, index) => {
                    const percent =
                      trackLength > 0
                        ? (join / trackLength) * 100
                        : 0;

                    return (
                      <div
                        key={`join-${index}`}
                        className="absolute top-7 -translate-x-1/2"
                        style={{ left: `${percent}%` }}
                      >
                        <span className="block h-10 w-px border-l-2 border-dashed border-[#B8F23D]" />
                        <span className="mt-1 block whitespace-nowrap text-[9px] font-bold text-[#080A09]/70">
                          Join
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm font-bold">
                  <span>Left end</span>
                  <span>{trackLength} cm total</span>
                  <span>Right end</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#080A09]/15 px-7 py-6 sm:px-8">
              <p className="font-semibold">
                Bracket positions from the left end
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {result.positions.map((position, index) => (
                  <div
                    key={`${position}-list-${index}`}
                    className="rounded-[16px] bg-[#080A09]/8 px-4 py-3 text-sm"
                  >
                    <span>Bracket {index + 1}</span>
                    <strong className="float-right">
                      {position} cm
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ToolResultActions
            toolName="Bracket Placement Calculator"
            resultTitle="Recommended bracket quantity"
            resultValue={`${result.bracketCount} brackets`}
            rows={[
              {
                label: "Track length",
                value: `${trackLength} cm`,
              },
              {
                label: "End allowance",
                value: `${endAllowance} cm`,
              },
              {
                label: "Maximum spacing",
                value: `${maxSpacing} cm`,
              },
              {
                label: "Actual main spacing",
                value: `${result.actualSpacing} cm`,
              },
              ...result.positions.map((position, index) => ({
                label: `Bracket ${index + 1}`,
                value: `${position} cm`,
              })),
            ]}
            notes={[
              `${mounting} mounted`,
              `${trackShape} track`,
              joinPositions.length
                ? `${joinPositions.length} join(s) included`
                : "No joins included",
            ]}
            sharePath="/tools/bracket-placement-calculator"
          />

          <section className="rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Important
            </p>

            <p className="mt-3 text-sm leading-6 text-amber-50">
              Use the track manufacturer&apos;s maximum spacing and fixing
              instructions. Heavy curtains, bends, joins and weak
              substrates may require additional support.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#B8F23D]/25 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Professional installation
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Not sure what is behind the wall or ceiling?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#AAACA4]">
              Send photos of the track area. TrackFit can assess the
              fixing position and provide an installation quote.
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
