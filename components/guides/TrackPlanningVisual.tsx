"use client";
import { useState } from "react";

const layouts = [
  { name: "Straight", path: "M70 95 H530", wall: "M50 65 H550", description: "A continuous run across the opening. Plan space at each end for the curtains to stack clear of the glass." },
  { name: "Bay", path: "M70 150 L175 75 H425 L530 150", wall: "M50 130 L165 45 H435 L550 130", description: "The track follows the shape of the bay. Record every side and angle, then check how the curtains travel through each bend." },
  { name: "Corner", path: "M100 55 V145 Q100 175 130 175 H520", wall: "M70 45 V205 H550", description: "A shaped run connects two walls. Check the corner clearance, track continuity and where the curtain stack will sit." },
];
export function TrackPlanningVisual() {
  const [selected, setSelected] = useState(0);
  const layout = layouts[selected];
  return <section data-no-reveal className="overflow-hidden rounded-[32px] border border-white/15 bg-[#F2EFE7] text-[#101310] lg:grid lg:grid-cols-[1fr_1.2fr]">
    <div className="p-6 sm:p-9">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#557600]">Visual planning</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight">Start with the shape of your window.</h2>
      <div className="mt-6 flex flex-wrap gap-2" aria-label="Choose a track layout">{layouts.map((item, i) => <button type="button" key={item.name} aria-pressed={selected === i} onClick={() => setSelected(i)} className={`min-h-11 rounded-full border px-5 text-sm font-semibold ${selected === i ? "border-[#101310] bg-[#101310] text-white" : "border-black/20 hover:bg-black/5"}`}>{item.name}</button>)}</div>
      <p aria-live="polite" className="mt-6 min-h-24 text-base leading-7 text-black/65">{layout.description}</p>
      <p className="mt-4 text-xs text-black/50">Illustrative top view. Not a scale drawing or a fitting specification.</p>
    </div>
    <div className="flex flex-col justify-center border-t border-black/10 bg-white/50 p-6 lg:border-l lg:border-t-0">
      <svg key={selected} viewBox="0 0 600 260" role="img" aria-label={`${layout.name} curtain track layout viewed from above`} className="tf-gallery-grid w-full">
        <path d={layout.wall} fill="none" stroke="#b6bbb0" strokeWidth="12" strokeLinecap="round" />
        <path d={layout.path} fill="none" stroke="#19221b" strokeWidth="8" strokeLinecap="round" />
        <path d={layout.path} fill="none" stroke="#86ad24" strokeWidth="13" strokeDasharray="1 25" strokeLinecap="round" />
        <text x="300" y="245" textAnchor="middle" fill="#58614d" fontSize="15">Plan the full track route before choosing fixings</text>
      </svg>
      <div className="mt-3 flex flex-wrap justify-center gap-6 text-xs"><span>▰ Window / wall line</span><span className="text-[#557600]">● Curtain carriers</span><span>━ Track route</span></div>
    </div>
  </section>;
}
