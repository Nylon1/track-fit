"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const goals = [
  { id: "standard", label: "Standard motorised curtains", href: "/motorised-curtain-tracks/shuttle-go", answer: "Start with Shuttle Go and the standard FMS track, subject to curtain weight and survey." },
  { id: "battery", label: "No nearby power point", href: "/motorised-curtain-tracks/shuttle-ion", answer: "Explore Shuttle iOn, the rechargeable option for suitable curtains up to 25 kg." },
  { id: "heavy", label: "Heavy curtains", href: "/motorised-curtain-tracks/heavy-curtains", answer: "Calculate the complete moving load and investigate Shuttle M where higher capacity is required." },
  { id: "curve", label: "Curved or bay window", href: "/motorised-curtain-tracks/curved-tracks", answer: "Plan every bend, bend radius and fixing position before selecting the motor." },
  { id: "recess", label: "Concealed ceiling track", href: "/motorised-curtain-tracks/recessed-tracks", answer: "Coordinate FMS Plus Recess, structural support and power before the ceiling is completed." },
  { id: "smart", label: "Smart-home control", href: "/motorised-curtain-tracks/control-selector", answer: "Use the interactive compatibility checker to match your app, voice, Z-Wave or automation goal to a suitable motor pathway." },
  { id: "hotel", label: "Hotel blackout", href: "/motorised-curtain-tracks/hotel-blackout", answer: "Explore FMS Dual for a two-channel system with an adjustable overlap." },
  { id: "commercial", label: "Commercial automation", href: "/motorised-curtain-tracks/control-selector", answer: "Use the control checker to plan BMS, relay or professional automation before selecting the motor and accessories." },
] as const;

export default function SystemNavigator() {
  const [selected, setSelected] = useState(goals[0].id);
  const result = useMemo(() => goals.find((goal) => goal.id === selected) ?? goals[0], [selected]);

  return (
    <div className="rounded-[34px] border border-white/10 bg-[#0E100F] p-5 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Interactive system navigator</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">What are you trying to achieve?</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {goals.map((goal) => (
              <button key={goal.id} type="button" onClick={() => setSelected(goal.id)} className={["rounded-2xl border p-4 text-left font-semibold transition", selected === goal.id ? "border-[#B8F23D] bg-[#B8F23D]/10 text-[#B8F23D]" : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25 hover:text-white"].join(" ")}>
                {goal.label}
              </button>
            ))}
          </div>
        </div>

        <aside className="rounded-[28px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.07] p-6 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">Recommended starting point</p>
          <h3 className="mt-4 text-3xl font-semibold">{result.label}</h3>
          <p className="mt-4 leading-8 text-[#C8C8C1]">{result.answer}</p>
          <Link href={result.href} className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-6 font-bold text-[#080A09]">Explore this solution →</Link>
        </aside>
      </div>
    </div>
  );
}
