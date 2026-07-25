"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Mounting = "ceiling" | "wall";
type Heading = "pencil" | "pinch" | "wave" | "unsure";
type Layout = 3 | 5 | "custom";

function createSections(count: number) {
  if (count === 3) return [90, 180, 90];
  if (count === 5) return [55, 75, 150, 75, 55];
  return Array.from({ length: count }, () => 80);
}

function getSectionLabel(index: number, count: number) {
  if (count === 3) {
    return ["Left", "Centre", "Right"][index];
  }

  if (count === 5) {
    return [
      "Left 1",
      "Left 2",
      "Centre",
      "Right 1",
      "Right 2",
    ][index];
  }

  const centreIndex = Math.floor(count / 2);

  if (count % 2 === 1 && index === centreIndex) {
    return "Centre";
  }

  if (index < centreIndex) {
    return `Left ${index + 1}`;
  }

  if (count % 2 === 0 && index === centreIndex) {
    return "Right 1";
  }

  const rightNumber =
    count % 2 === 0
      ? index - centreIndex + 1
      : index - centreIndex;

  return `Right ${rightNumber}`;
}

export function BayWindowCalculator() {
  const [layout, setLayout] = useState<Layout>(3);
  const [sections, setSections] = useState<number[]>(
    createSections(3),
  );
  const [customCount, setCustomCount] = useState(4);
  const [leftExtension, setLeftExtension] = useState(20);
  const [rightExtension, setRightExtension] = useState(20);
  const [mounting, setMounting] =
    useState<Mounting>("ceiling");
  const [heading, setHeading] =
    useState<Heading>("pencil");

  const sectionTotal = useMemo(
    () =>
      sections.reduce(
        (total, value) => total + value,
        0,
      ),
    [sections],
  );

  const totalTrackLength =
    sectionTotal + leftExtension + rightExtension;

  const selectLayout = (value: Layout) => {
    setLayout(value);

    if (value === 3 || value === 5) {
      setSections(createSections(value));
      return;
    }

    setSections(createSections(customCount));
  };

  const updateCustomCount = (count: number) => {
    const safeCount = Math.min(9, Math.max(2, count));
    setCustomCount(safeCount);

    if (layout === "custom") {
      setSections((current) =>
        Array.from(
          { length: safeCount },
          (_, index) => current[index] ?? 80,
        ),
      );
    }
  };

  const updateSection = (
    index: number,
    value: number,
  ) => {
    setSections((current) =>
      current.map((section, sectionIndex) =>
        sectionIndex === index
          ? Math.max(0, value)
          : section,
      ),
    );
  };

  const recommendation =
    mounting === "ceiling"
      ? "Ceiling mounting usually follows a bay more neatly."
      : "Wall mounting may suit bays where additional projection is needed.";

  const headingAdvice =
    heading === "wave"
      ? "Use a compatible wave track and allow enough room for the folds to stack."
      : heading === "pinch"
        ? "Allow enough projection for the pleats to retain their shape."
        : heading === "pencil"
          ? "Pencil pleat is flexible, but can create a deeper stack when open."
          : "The curtain heading can be confirmed before choosing the final track system.";

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

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Choose the bay layout
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            Select the number of straight sections that follow
            the bay.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              aria-pressed={layout === 3}
              onClick={() => selectLayout(3)}
              className={optionClass(layout === 3)}
            >
              <span className="block font-semibold">
                3 sections
              </span>
              <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                Left, centre and right.
              </span>
            </button>

            <button
              type="button"
              aria-pressed={layout === 5}
              onClick={() => selectLayout(5)}
              className={optionClass(layout === 5)}
            >
              <span className="block font-semibold">
                5 sections
              </span>
              <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                Left 1, Left 2, Centre, Right 1 and Right 2.
              </span>
            </button>

            <button
              type="button"
              aria-pressed={layout === "custom"}
              onClick={() => selectLayout("custom")}
              className={optionClass(layout === "custom")}
            >
              <span className="block font-semibold">
                Custom
              </span>
              <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">
                Choose your own section count.
              </span>
            </button>
          </div>

          {layout === "custom" && (
            <label className="mt-6 block max-w-xs text-sm font-semibold">
              Number of sections
              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="2"
                  max="9"
                  value={customCount}
                  onChange={(event) =>
                    updateCustomCount(
                      Number(event.target.value) || 2,
                    )
                  }
                  className="min-h-12 min-w-0 flex-1 bg-transparent text-[#F4F1E8] outline-none"
                />
                <span className="text-[#B8F23D]">
                  sections
                </span>
              </div>
            </label>
          )}
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 2
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Enter each section width
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            Measure along the proposed track line, from one
            corner or change of direction to the next.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {sections.map((section, index) => (
              <label
                key={index}
                className="rounded-[22px] border border-white/10 bg-[#080A09] p-5 text-sm font-semibold"
              >
                {getSectionLabel(index, sections.length)}

                <div className="mt-3 flex items-center rounded-full border border-white/15 px-4 focus-within:border-[#B8F23D]">
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={section}
                    onChange={(event) =>
                      updateSection(
                        index,
                        Number(event.target.value) || 0,
                      )
                    }
                    className="min-h-12 min-w-0 flex-1 bg-transparent text-xl font-semibold text-[#F4F1E8] outline-none"
                  />
                  <span className="font-semibold text-[#B8F23D]">
                    cm
                  </span>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 3
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Add the side extensions
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            Add any straight track needed beyond the bay at
            the left and right.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Left extension
              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="0"
                  max="300"
                  value={leftExtension}
                  onChange={(event) =>
                    setLeftExtension(
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
              Right extension
              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="0"
                  max="300"
                  value={rightExtension}
                  onChange={(event) =>
                    setRightExtension(
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
            Step 4
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">
            Installation preferences
          </h2>

          <div className="mt-6">
            <p className="text-sm font-semibold">
              Mounting position
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(["ceiling", "wall"] as const).map(
                (value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={mounting === value}
                    onClick={() => setMounting(value)}
                    className={optionClass(
                      mounting === value,
                    )}
                  >
                    <span className="block font-semibold capitalize">
                      {value} mounted
                    </span>
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="mt-7">
            <p className="text-sm font-semibold">
              Curtain heading
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
                  className={optionClass(
                    heading === value,
                  )}
                >
                  <span className="block font-semibold">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <aside className="mx-auto w-full max-w-3xl xl:max-w-none">
        <div className="space-y-6 xl:sticky xl:top-24">
          <section className="overflow-hidden rounded-[32px] border border-[#B8F23D]/35 bg-[#B8F23D] text-[#080A09] shadow-2xl shadow-[#B8F23D]/10">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em]">
                Estimated total track run
              </p>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
                  {totalTrackLength}
                </p>
                <span className="pb-2 text-2xl font-bold">
                  cm
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#1C211A]">
                {sectionTotal} cm across the bay, plus{" "}
                {leftExtension} cm on the left and{" "}
                {rightExtension} cm on the right.
              </p>
            </div>

            <div className="border-t border-[#080A09]/15 p-5 sm:p-6">
              <div className="rounded-[24px] border border-[#080A09]/15 bg-[#F4F1E8]/55 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#080A09]/65">
                  Bay layout
                </p>

                <div className="mt-7 grid grid-cols-[64px_minmax(0,1fr)_64px] items-end gap-3">
                  <div className="text-center">
                    <div className="rounded-[16px] border border-[#080A09]/15 bg-[#B8F23D] px-2 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em]">
                        Left extension
                      </p>
                      <p className="mt-1 text-sm font-bold">
                        {leftExtension} cm
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }}>
                      {sections.map((section, index) => (
                        <div
                          key={index}
                          className="rounded-[14px] border border-[#080A09]/18 bg-white/70 px-2 py-3 text-center"
                        >
                          <p className="truncate text-[10px] font-bold uppercase tracking-[0.08em] text-[#080A09]/70">
                            {getSectionLabel(index, sections.length)}
                          </p>
                          <p className="mt-1 text-sm font-bold">
                            {section} cm
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-end gap-1">
                      {sections.map((_, index) => {
                        const centreIndex = Math.floor(sections.length / 2);
                        const distanceFromCentre = Math.abs(index - centreIndex);
                        const height =
                          sections.length === 3
                            ? [56, 82, 56][index]
                            : Math.max(48, 86 - distanceFromCentre * 12);

                        return (
                          <div
                            key={index}
                            className="relative flex-1"
                            style={{ height }}
                          >
                            <div
                              className={[
                                "absolute inset-0 border-2 border-[#080A09]/40 bg-white/55",
                                index === 0 ? "rounded-l-xl" : "",
                                index === sections.length - 1 ? "rounded-r-xl" : "",
                              ].join(" ")}
                              style={{
                                clipPath:
                                  index < centreIndex
                                    ? "polygon(0 18%, 100% 0, 100% 100%, 0 82%)"
                                    : index > centreIndex
                                      ? "polygon(0 0, 100% 18%, 100% 82%, 0 100%)"
                                      : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="rounded-[16px] border border-[#080A09]/15 bg-[#B8F23D] px-2 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em]">
                        Right extension
                      </p>
                      <p className="mt-1 text-sm font-bold">
                        {rightExtension} cm
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-3 rounded-full bg-[#080A09]" />

                <div className="mt-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[#080A09]/65">
                      Full track run
                    </p>
                    <p className="mt-1 text-sm font-bold">
                      Extensions + bay sections
                    </p>
                  </div>

                  <p className="text-2xl font-bold">
                    {totalTrackLength} cm
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#080A09]/15 px-7 py-6 sm:px-8">
              <p className="font-semibold">
                Section breakdown
              </p>

              <div className="mt-5 overflow-hidden rounded-[20px] border border-[#080A09]/15">
                <div className="grid grid-cols-[1fr_100px] bg-[#080A09]/8 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em]">
                  <span>Part</span>
                  <span className="text-right">
                    Length
                  </span>
                </div>

                <div className="divide-y divide-[#080A09]/12">
                  <div className="grid grid-cols-[1fr_100px] px-4 py-3 text-sm">
                    <span className="font-medium">
                      Left extension
                    </span>
                    <strong className="text-right">
                      {leftExtension} cm
                    </strong>
                  </div>

                  {sections.map((section, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[1fr_100px] px-4 py-3 text-sm"
                    >
                      <span className="font-medium">
                        {getSectionLabel(
                          index,
                          sections.length,
                        )}
                      </span>
                      <strong className="text-right">
                        {section} cm
                      </strong>
                    </div>
                  ))}

                  <div className="grid grid-cols-[1fr_100px] px-4 py-3 text-sm">
                    <span className="font-medium">
                      Right extension
                    </span>
                    <strong className="text-right">
                      {rightExtension} cm
                    </strong>
                  </div>

                  <div className="grid grid-cols-[1fr_100px] bg-[#080A09] px-4 py-4 text-sm text-[#F4F1E8]">
                    <span className="font-bold">
                      Total
                    </span>
                    <strong className="text-right text-[#B8F23D]">
                      {totalTrackLength} cm
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Installation guidance
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8F928B]">
                  Mounting
                </p>
                <p className="mt-2 font-semibold">
                  {recommendation}
                </p>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8F928B]">
                  Curtain heading
                </p>
                <p className="mt-2 font-semibold">
                  {headingAdvice}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Important
            </p>

            <p className="mt-3 text-sm leading-6 text-amber-50">
              This tool gives a planning estimate. Final fitting
              measurements should be checked at the exact wall
              or ceiling mounting line before a track is cut or
              bent.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#B8F23D]/25 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Next step
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Send us the bay measurements
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#AAACA4]">
              Add a few wide photos of the full bay and fixing
              area so TrackFit can review the layout before
              providing a quote.
            </p>

            <Link
              href="/quote/postcode"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#B8F23D] px-5 font-semibold text-[#080A09] transition hover:bg-[#C7FF4A]"
            >
              Get my bay-track quote
            </Link>
          </section>
        </div>
      </aside>
    </div>
  );
}
