"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ToolResultActions } from "@/components/tools/ToolResultActions";

type StartPoint = "ceiling" | "ceiling-track" | "wall-track" | "pole";
type Finish = "touch-floor" | "hover-10" | "hover-15" | "break" | "sill" | "below-sill" | "custom";
type Heading = "pencil" | "double-pinch" | "triple-pinch" | "wave" | "eyelet";

const finishAdjustments: Record<Exclude<Finish, "custom">, number> = {
  "touch-floor": 0,
  "hover-10": -1,
  "hover-15": -1.5,
  break: 3,
  sill: -1,
  "below-sill": 15,
};

const finishLabels: Record<Finish, string> = {
  "touch-floor": "Touch the floor",
  "hover-10": "Hover 10 mm above",
  "hover-15": "Hover 15 mm above",
  break: "Break on the floor",
  sill: "Finish at the sill",
  "below-sill": "Finish below the sill",
  custom: "Custom adjustment",
};

const startLabels: Record<StartPoint, string> = {
  ceiling: "Ceiling",
  "ceiling-track": "Ceiling-mounted track",
  "wall-track": "Wall-mounted track",
  pole: "Curtain pole",
};

const headingLabels: Record<Heading, string> = {
  pencil: "Pencil pleat",
  "double-pinch": "Double pinch pleat",
  "triple-pinch": "Triple pinch pleat",
  wave: "Wave",
  eyelet: "Eyelet",
};

const headingNotes: Record<Heading, string> = {
  pencil: "Measure to the point where the curtain hook will sit on the track or pole system.",
  "double-pinch": "Check whether the pleat sits beneath the track or overlaps the face of a pole.",
  "triple-pinch": "A structured heading needs an accurate top reference so the pleats sit correctly.",
  wave: "Wave curtains should be measured from the underside of the track to the finished hem.",
  eyelet: "Eyelet curtains are measured from the top of the pole to the finished hem, then adjusted for the eyelet position.",
};

function roundToHalfCentimetre(value: number) {
  return Math.max(0, Math.round(value * 2) / 2);
}

export function CurtainDropCalculator() {
  const [startPoint, setStartPoint] = useState<StartPoint>("ceiling-track");
  const [finish, setFinish] = useState<Finish>("hover-10");
  const [measuredDrop, setMeasuredDrop] = useState(235);
  const [customAdjustment, setCustomAdjustment] = useState(-1);
  const [heading, setHeading] = useState<Heading>("pencil");

  const adjustment = finish === "custom" ? customAdjustment : finishAdjustments[finish];
  const finishedDrop = useMemo(
    () => roundToHalfCentimetre(measuredDrop + adjustment),
    [adjustment, measuredDrop],
  );

  const optionClass = (selected: boolean) =>
    [
      "rounded-[22px] border p-5 text-left transition",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F23D]",
      selected
        ? "border-[#B8F23D] bg-[#B8F23D]/10"
        : "border-white/10 bg-[#080A09] hover:border-white/25 hover:bg-white/[0.025]",
    ].join(" ");

  const curtainHeight = finish === "break" ? "98%" : finish === "touch-floor" ? "94%" : finish === "hover-15" ? "88%" : finish === "hover-10" ? "90%" : finish === "sill" ? "56%" : finish === "below-sill" ? "69%" : "90%";

  return (
    <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_430px]">
      <div className="space-y-8">
        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Step 1</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">Where are you measuring from?</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {([ ["ceiling", "Ceiling"], ["ceiling-track", "Ceiling-mounted track"], ["wall-track", "Wall-mounted track"], ["pole", "Curtain pole"] ] as const).map(([value, label]) => (
              <button key={value} type="button" aria-pressed={startPoint === value} onClick={() => setStartPoint(value)} className={optionClass(startPoint === value)}>
                <span className="block font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Step 2</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">Choose the curtain finish</h2>
          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">Choose where the finished hem should sit.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(["touch-floor", "hover-10", "hover-15", "break", "sill", "below-sill", "custom"] as const).map((value) => (
              <button key={value} type="button" aria-pressed={finish === value} onClick={() => setFinish(value)} className={optionClass(finish === value)}>
                <span className="block font-semibold">{finishLabels[value]}</span>
              </button>
            ))}
          </div>
          {finish === "custom" && (
            <label className="mt-6 block max-w-xs text-sm font-semibold">
              Custom adjustment
              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input type="number" step="0.5" min="-50" max="50" value={customAdjustment} onChange={(event) => setCustomAdjustment(Number(event.target.value) || 0)} className="min-h-12 min-w-0 flex-1 bg-transparent text-[#F4F1E8] outline-none" />
                <span className="text-[#B8F23D]">cm</span>
              </div>
            </label>
          )}
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Step 3</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">Enter the measured drop</h2>
          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">Measure from the selected starting point to the floor, sill or chosen finishing point.</p>
          <div className="mt-6 flex max-w-md items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
            <input type="number" min="20" max="500" step="0.5" value={measuredDrop} onChange={(event) => setMeasuredDrop(Math.max(0, Number(event.target.value) || 0))} className="min-h-14 min-w-0 flex-1 bg-transparent text-2xl font-semibold text-[#F4F1E8] outline-none" />
            <span className="font-semibold text-[#B8F23D]">cm</span>
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Step 4</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em]">Choose the curtain heading</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(["pencil", "double-pinch", "triple-pinch", "wave", "eyelet"] as const).map((value) => (
              <button key={value} type="button" aria-pressed={heading === value} onClick={() => setHeading(value)} className={optionClass(heading === value)}>
                <span className="block font-semibold">{headingLabels[value]}</span>
                <span className="mt-2 block text-sm leading-6 text-[#9C9E97]">{headingNotes[value]}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <aside className="mx-auto w-full max-w-3xl xl:max-w-none">
        <div className="space-y-6 xl:sticky xl:top-24">
          <section className="tool-result-card overflow-hidden rounded-[32px] border border-[#B8F23D]/35 bg-[#B8F23D] text-[#080A09] shadow-2xl shadow-[#B8F23D]/10">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em]">Recommended finished drop</p>
              <div className="mt-5 flex items-end gap-2">
                <p className="text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">{finishedDrop}</p>
                <span className="pb-2 text-2xl font-bold">cm</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#1C211A]">Based on a {measuredDrop} cm measurement with a {adjustment > 0 ? "+" : ""}{adjustment} cm adjustment.</p>
            </div>

            <div className="border-t border-[#080A09]/15 p-5 sm:p-6">
              <div className="rounded-[24px] border border-[#080A09]/15 bg-[#F4F1E8]/65 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#080A09]/65">Curtain drop visual</p>
                <div className="relative mt-6 h-[360px] overflow-hidden rounded-[20px] border border-[#080A09]/20 bg-white/75">
                  <div className="absolute inset-x-0 top-0 h-4 bg-[#080A09]" />
                  <div className="absolute inset-x-5 top-7 h-3 rounded-full bg-[#080A09]">
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#B8F23D] px-3 py-1 text-[10px] font-bold">{startLabels[startPoint]}</span>
                  </div>
                  <div className="absolute inset-x-9 top-12 bottom-7">
                    <div className="absolute inset-x-0 top-0 rounded-t-[18px] border border-[#080A09]/15 bg-[repeating-linear-gradient(90deg,rgba(8,10,9,0.22)_0px,rgba(8,10,9,0.22)_12px,rgba(8,10,9,0.07)_12px,rgba(8,10,9,0.07)_24px)]" style={{ height: curtainHeight }} />
                  </div>
                  <div className="absolute inset-x-0 bottom-6 h-1 bg-[#080A09]/35" />
                  <div className="absolute inset-x-0 bottom-0 flex h-6 items-center justify-center bg-[#080A09] text-[10px] font-bold uppercase tracking-[0.16em] text-[#B8F23D]">Floor</div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">Measured</p><p className="mt-1 text-lg font-semibold">{measuredDrop} cm</p></div>
                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">Adjustment</p><p className="mt-1 text-lg font-semibold">{adjustment > 0 ? "+" : ""}{adjustment} cm</p></div>
                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">Finished</p><p className="mt-1 text-lg font-semibold">{finishedDrop} cm</p></div>
                </div>
              </div>
            </div>
          </section>

          <ToolResultActions
            toolName="Curtain Drop Calculator"
            resultTitle="Recommended finished drop"
            resultValue={`${finishedDrop} cm`}
            rows={[
              { label: "Measurement start", value: startLabels[startPoint] },
              { label: "Measured drop", value: `${measuredDrop} cm` },
              { label: "Finish", value: finishLabels[finish] },
              { label: "Adjustment", value: `${adjustment > 0 ? "+" : ""}${adjustment} cm` },
              { label: "Curtain heading", value: headingLabels[heading] },
            ]}
            notes={[headingNotes[heading]]}
            sharePath="/tools/curtain-drop-calculator"
          />

          <section className="rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">Important</p>
            <p className="mt-3 text-sm leading-6 text-amber-50">Check the floor at several points. Floors can be uneven, especially across wide windows and doors.</p>
          </section>

          <section className="rounded-[28px] border border-[#B8F23D]/25 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Professional installation</p>
            <h2 className="mt-3 text-2xl font-semibold">Need help checking the measurement?</h2>
            <p className="mt-3 text-sm leading-6 text-[#AAACA4]">Send photos and your measurements. TrackFit can review the track position, floor clearance and heading before installation.</p>
            <Link href="/quote/postcode" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#B8F23D] px-5 font-semibold text-[#080A09] transition hover:bg-[#C7FF4A]">Get my installation quote</Link>
          </section>
        </div>
      </aside>
    </div>
  );
}
