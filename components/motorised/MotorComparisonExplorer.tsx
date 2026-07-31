"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Load = 25 | 35 | 40 | 70;
type Power = "mains" | "battery" | "either";
type Control = "simple" | "app" | "automation";
type Use = "home" | "commercial" | "heavy";

type Answers = {
  load: Load;
  power: Power;
  control: Control;
  use: Use;
};

type Motor = {
  name: string;
  slug: string;
  capacity: number;
  capacityLabel: string;
  power: "Mains" | "Rechargeable battery";
  bestFor: string;
  uses: Use[];
  controls: Control[];
  app: string;
  automation: string;
  curves: string;
  warranty: string;
  note: string;
};

const motors: Motor[] = [
  { name: "Shuttle Go", slug: "shuttle-go", capacity: 35, capacityLabel: "Up to 35 kg", power: "Mains", bestFor: "Connected domestic curtains", uses: ["home"], controls: ["simple", "app"], app: "Built-in Wi-Fi and Bluetooth for Forest Connect", automation: "App and compatible voice-control pathway", curves: "Published load applies without curves; confirm shaped routes before selection", warranty: "5 years", note: "A strong starting point for suitable home installations where simple connected control and value matter." },
  { name: "Shuttle iOn", slug: "shuttle-ion", capacity: 25, capacityLabel: "Up to 25 kg", power: "Rechargeable battery", bestFor: "Locations without a nearby mains point", uses: ["home"], controls: ["simple"], app: "Control options depend on selected accessories", automation: "Confirm the required interface before ordering", curves: "Published for suitable curved tracks with up to two bends", warranty: "5 years", note: "Useful where running mains power is difficult, subject to curtain load, track length and charging access." },
  { name: "Shuttle L", slug: "shuttle-l", capacity: 40, capacityLabel: "Up to 40 kg", power: "Mains", bestFor: "Flexible domestic and contract projects", uses: ["home", "commercial"], controls: ["simple", "app", "automation"], app: "Compatible configurations can use a Wi-Fi dongle", automation: "Broad integration options, including compatible Z-Wave pathways", curves: "Curved use requires project-specific load and geometry confirmation", warranty: "10 years", note: "A versatile wired option where broader control choices or a higher published load are required." },
  { name: "Shuttle AC", slug: "shuttle-ac", capacity: 40, capacityLabel: "Up to 40 kg", power: "Mains", bestFor: "Hard-wired and building-management integration", uses: ["commercial"], controls: ["automation"], app: "Not the primary selection route", automation: "Designed for hard-wired, relay and BMS-style control", curves: "Confirm the complete track configuration and moving load before selection", warranty: "Confirm for supplied configuration", note: "The specialist direction for projects controlled through electrical or building-management infrastructure." },
  { name: "Shuttle M", slug: "shuttle-m", capacity: 70, capacityLabel: "Up to 70 kg", power: "Mains", bestFor: "Heavy curtains and demanding installations", uses: ["commercial", "heavy"], controls: ["simple", "app", "automation"], app: "Compatible configurations can use connected accessories", automation: "Suitable for advanced integration with the correct interface", curves: "Published 70 kg limit is without curves; curved routes need confirmation", warranty: "10 years", note: "The strongest Shuttle option and the main starting point when finished curtain load is the deciding factor." },
];

const steps = [
  { key: "load", eyebrow: "Step 1 of 4", question: "What is the approximate finished curtain weight?", helper: "Include lining, interlining, fullness and heading. Use the separate calculator when unsure.", options: [
    { value: 25, label: "Up to 25 kg", detail: "Light to medium curtains" },
    { value: 35, label: "Up to 35 kg", detail: "Typical domestic curtains" },
    { value: 40, label: "Up to 40 kg", detail: "Heavier domestic or contract curtains" },
    { value: 70, label: "Up to 70 kg", detail: "Heavy or large curtain systems" },
  ] },
  { key: "power", eyebrow: "Step 2 of 4", question: "Is mains power available near the track?", helper: "Battery power is mainly useful where running a new supply would be difficult.", options: [
    { value: "mains", label: "Yes, mains is available", detail: "Widest motor and control choice" },
    { value: "battery", label: "No nearby power", detail: "Explore rechargeable options" },
    { value: "either", label: "Either is possible", detail: "Keep both routes open" },
  ] },
  { key: "control", eyebrow: "Step 3 of 4", question: "How do you want to control the curtains?", helper: "Choose the most important control route. Exact accessories are confirmed later.", options: [
    { value: "simple", label: "Remote or touch", detail: "Straightforward everyday control" },
    { value: "app", label: "App and voice", detail: "Connected home control" },
    { value: "automation", label: "Automation or BMS", detail: "Professional integration" },
  ] },
  { key: "use", eyebrow: "Step 4 of 4", question: "What type of project is this?", helper: "This helps prioritise the most suitable motor pathway.", options: [
    { value: "home", label: "Home or apartment", detail: "Domestic installation" },
    { value: "commercial", label: "Hotel or commercial", detail: "Contract or managed environment" },
    { value: "heavy", label: "Heavy curtain priority", detail: "Load is the main concern" },
  ] },
] as const;

export default function MotorComparisonExplorer() {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [answers, setAnswers] = useState<Answers>({ load: 35, power: "mains", control: "simple", use: "home" });

  const shortlist = useMemo(() => {
    return motors
      .map((motor) => {
        let score = 0;
        if (motor.capacity >= answers.load) score += 4;
        else score -= 10;
        if (answers.power === "either" || (answers.power === "mains" && motor.power === "Mains") || (answers.power === "battery" && motor.power === "Rechargeable battery")) score += 3;
        else score -= 6;
        if (motor.controls.includes(answers.control)) score += 3;
        else score -= 3;
        if (motor.uses.includes(answers.use)) score += 3;
        return { motor, score };
      })
      .filter((item) => item.score >= 4)
      .sort((a, b) => b.score - a.score);
  }, [answers]);

  const current = steps[step];
  const selected = answers[current.key] as string | number;
  const progress = complete ? 100 : ((step + 1) / steps.length) * 100;

  const choose = (value: string | number) => {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [current.key]: value } as Answers));
  };

  const next = () => {
    if (step < steps.length - 1) setStep((value) => value + 1);
    else setComplete(true);
  };

  const restart = () => {
    setStep(0);
    setComplete(false);
  };

  const best = shortlist[0]?.motor;
  const alternatives = shortlist.slice(1, 3).map((item) => item.motor);

  return (
    <div className="overflow-hidden rounded-[36px] border border-white/10 bg-[#0E100F]">
      <div className="border-b border-white/10 px-5 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Guided motor selector</p>
            <p className="mt-2 text-sm text-white/50">Answer four simple questions to get a starting recommendation.</p>
          </div>
          <button type="button" onClick={restart} className="text-sm font-semibold text-[#B8F23D]">Start again</button>
        </div>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#B8F23D] transition-all duration-300" style={{ width: `${progress}%` }} /></div>
      </div>

      {!complete ? (
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">{current.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{current.question}</h2>
          <p className="mt-4 max-w-2xl leading-7 text-[#AAACA4]">{current.helper}</p>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {current.options.map((option) => {
              const active = selected === option.value;
              return (
                <button key={String(option.value)} type="button" onClick={() => choose(option.value)} className={`rounded-[24px] border p-5 text-left transition ${active ? "border-[#B8F23D] bg-[#B8F23D]/10" : "border-white/10 bg-white/[0.025] hover:border-white/25"}`}>
                  <span className={`block text-lg font-semibold ${active ? "text-[#B8F23D]" : "text-white"}`}>{option.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-white/50">{option.detail}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-9 flex items-center justify-between">
            <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0} className="font-semibold text-white/55 disabled:invisible">← Back</button>
            <button type="button" onClick={next} className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]">{step === steps.length - 1 ? "Show recommendation →" : "Continue →"}</button>
          </div>
        </div>
      ) : (
        <div className="px-5 py-10 sm:px-8 sm:py-14">
          {best ? (
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
                <article className="rounded-[30px] border border-[#B8F23D]/30 bg-[#B8F23D]/[0.08] p-7 sm:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">Best starting match</p>
                  <h2 className="mt-4 text-5xl font-semibold tracking-[-0.045em]">{best.name}</h2>
                  <p className="mt-3 text-xl font-semibold text-white/75">{best.bestFor}</p>
                  <p className="mt-6 max-w-2xl leading-8 text-[#C8C8C1]">{best.note}</p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[18px] border border-white/10 bg-[#080A09] p-4"><p className="text-xs uppercase tracking-[0.14em] text-white/40">Capacity</p><p className="mt-2 font-semibold">{best.capacityLabel}</p></div>
                    <div className="rounded-[18px] border border-white/10 bg-[#080A09] p-4"><p className="text-xs uppercase tracking-[0.14em] text-white/40">Power</p><p className="mt-2 font-semibold">{best.power}</p></div>
                    <div className="rounded-[18px] border border-white/10 bg-[#080A09] p-4"><p className="text-xs uppercase tracking-[0.14em] text-white/40">Warranty</p><p className="mt-2 font-semibold">{best.warranty}</p></div>
                  </div>
                  <div className="mt-7 flex flex-wrap gap-3"><Link href={`/motorised-curtain-tracks/${best.slug}`} className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-6 font-bold text-[#080A09]">Explore {best.name} →</Link><Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 font-semibold">Request a system review</Link></div>
                </article>

                <aside className="rounded-[30px] border border-white/10 bg-white/[0.03] p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Why it fits</p>
                  <dl className="mt-5 space-y-5">
                    <div><dt className="font-semibold text-white/75">Control</dt><dd className="mt-2 text-sm leading-6 text-[#AAACA4]">{answers.control === "simple" ? "Remote or touch-led control" : answers.control === "app" ? best.app : best.automation}</dd></div>
                    <div><dt className="font-semibold text-white/75">Curved-track note</dt><dd className="mt-2 text-sm leading-6 text-[#AAACA4]">{best.curves}</dd></div>
                    <div><dt className="font-semibold text-white/75">Final check</dt><dd className="mt-2 text-sm leading-6 text-[#AAACA4]">Confirm finished curtain weight, track length, bends, controls and fixing structure before ordering.</dd></div>
                  </dl>
                  <Link href="/tools/curtain-weight-motor-selector" className="mt-7 inline-flex text-sm font-semibold text-[#B8F23D]">Check the curtain weight →</Link>
                </aside>
              </div>

              {alternatives.length > 0 && <div className="mt-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Other motors worth considering</p><div className="mt-4 grid gap-4 md:grid-cols-2">{alternatives.map((motor) => <Link key={motor.name} href={`/motorised-curtain-tracks/${motor.slug}`} className="rounded-[22px] border border-white/10 bg-white/[0.025] p-5 transition hover:border-[#B8F23D]/30"><div className="flex items-center justify-between gap-4"><div><h3 className="text-xl font-semibold">{motor.name}</h3><p className="mt-2 text-sm text-white/50">{motor.bestFor}</p></div><span className="text-[#B8F23D]">→</span></div></Link>)}</div></div>}
            </div>
          ) : (
            <div className="mx-auto max-w-3xl rounded-[30px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.07] p-8 text-center"><h2 className="text-3xl font-semibold">This combination needs a project review.</h2><p className="mt-4 leading-7 text-[#C8C8C1]">Your load, power or control requirements do not produce a clean standard match. A different control arrangement or revised curtain specification may be needed.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><button type="button" onClick={restart} className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 font-semibold">Change answers</button><Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-6 font-bold text-[#080A09]">Request a review →</Link></div></div>
          )}
        </div>
      )}

      <p className="border-t border-white/10 px-5 py-5 text-xs leading-6 text-white/40 sm:px-8">This is preliminary guidance only. Published capacities depend on the stated configuration. Curves, track length, curtain construction, accessories and controls can change the final selection.</p>
    </div>
  );
}
