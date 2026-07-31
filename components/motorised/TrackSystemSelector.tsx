"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ProjectType = "home" | "hotel" | "commercial";
type Finish = "visible" | "architectural" | "recessed";
type Layers = "single" | "double";
type LightControl = "standard" | "enhanced";
type Shape = "straight" | "curved";
type Fixing = "ceiling" | "wall";
type BuildStage = "existing" | "new-build";
type Opening = "one-way" | "centre";

type SelectorAnswers = {
  projectType: ProjectType;
  finish: Finish;
  layers: Layers;
  lightControl: LightControl;
  shape: Shape;
  fixing: Fixing;
  buildStage: BuildStage;
  opening: Opening;
};

type Recommendation = {
  system: "FMS" | "FMS Plus" | "FMS Plus Recess" | "FMS Dual";
  href: string;
  headline: string;
  reason: string;
  alternative: string;
  checks: string[];
  flags: string[];
};

const initialAnswers: SelectorAnswers = {
  projectType: "home",
  finish: "visible",
  layers: "single",
  lightControl: "standard",
  shape: "straight",
  fixing: "ceiling",
  buildStage: "existing",
  opening: "centre",
};

function getRecommendation(answers: SelectorAnswers): Recommendation {
  const flags: string[] = [];
  const checks = [
    "Confirm the finished curtain weight and selected Shuttle motor.",
    "Confirm the fixing substrate, bracket spacing and continuous support.",
    "Coordinate motor position, power, controls and future service access.",
    "Confirm track length, opening direction, stack position and carrier arrangement.",
  ];

  if (answers.shape === "curved") {
    flags.push("Curved layouts require the bend geometry and complete curtain travel to be checked before manufacture.");
    checks.push("Include every bend in the motor-load assessment and confirm the exact bend radius.");
  }

  if (answers.fixing === "wall") {
    checks.push("Confirm bracket projection clears handles, radiators, window boards and curtain folds.");
  }

  if (answers.opening === "centre") {
    checks.push("Confirm the centre overlap, master-carrier position and equal curtain stack space.");
  }

  if (answers.finish === "recessed") {
    if (answers.buildStage === "existing") {
      flags.push("A recessed system in an existing finished ceiling may require building work and early inspection of the ceiling void.");
    }
    if (answers.fixing === "wall") {
      flags.push("Recessed motorised tracks are normally coordinated as ceiling details rather than wall-fixed systems.");
    }
    checks.push("Coordinate the recess profile, plaster finish, structural support and motor access before closing the ceiling.");
    return {
      system: "FMS Plus Recess",
      href: "/motorised-curtain-tracks/recessed-tracks",
      headline: "A concealed architectural ceiling system",
      reason: "Your priority is a recessed finish. FMS Plus Recess is the strongest starting direction where the motorised track needs to integrate into the ceiling design.",
      alternative: "Use standard FMS Plus where a premium profile is wanted but a full ceiling recess is not practical.",
      checks,
      flags,
    };
  }

  if (answers.layers === "double" || answers.lightControl === "enhanced" || answers.projectType === "hotel") {
    if (answers.shape === "curved") {
      flags.push("The exact suitability of a dual-channel arrangement for a curved route must be confirmed before specification.");
    }
    checks.push("Confirm the sheer and blackout curtain construction, overlap requirement and available ceiling width.");
    return {
      system: "FMS Dual",
      href: "/motorised-curtain-tracks/hotel-blackout",
      headline: "A two-channel system for stronger light control",
      reason: "Your answers prioritise two curtain layers, hotel use or enhanced blackout. FMS Dual is the main starting point because it operates two channels from one motor and provides an adjustable overlap.",
      alternative: "Use two separately specified FMS tracks where independent motors, different control zones or a custom spacing arrangement are required.",
      checks,
      flags,
    };
  }

  if (answers.finish === "architectural" || answers.buildStage === "new-build" || answers.projectType === "commercial") {
    return {
      system: "FMS Plus",
      href: "/motorised-curtain-tracks/fms-plus",
      headline: "A more architectural motorised track profile",
      reason: "Your project benefits from a more considered architectural profile without requiring a full ceiling recess. FMS Plus is the most relevant starting direction.",
      alternative: "Use standard FMS where the priority is a compact, versatile track rather than architectural integration.",
      checks,
      flags,
    };
  }

  return {
    system: "FMS",
    href: "/motorised-curtain-tracks/fms",
    headline: "The versatile standard motorised track system",
    reason: "Your project suits the standard FMS pathway: a compact motorised track for suitable ceiling- or wall-fixed, one-way or centre-opening curtains, including straight and professionally planned curved layouts.",
    alternative: "Move to FMS Plus where the profile needs to form part of a more architectural interior detail.",
    checks,
    flags,
  };
}

type Step = {
  title: string;
  question: string;
  help: string;
  options: { label: string; description: string; value: string }[];
};

const steps: Step[] = [
  {
    title: "Project",
    question: "Where will the motorised curtains be installed?",
    help: "This helps separate standard domestic needs from hotel and commercial requirements.",
    options: [
      { label: "Home or apartment", description: "Living rooms, bedrooms and private residential spaces.", value: "home" },
      { label: "Hotel or hospitality", description: "Guest rooms, suites and hospitality environments.", value: "hotel" },
      { label: "Office or commercial", description: "Workplaces, meeting rooms and commercial interiors.", value: "commercial" },
    ],
  },
  {
    title: "Finish",
    question: "How should the track look in the room?",
    help: "Choose whether the track can remain visible or should become part of the architecture.",
    options: [
      { label: "Compact visible track", description: "A practical standard profile fixed to the ceiling or wall.", value: "visible" },
      { label: "Architectural profile", description: "A more substantial premium profile without a full recess.", value: "architectural" },
      { label: "Concealed ceiling recess", description: "The track is integrated into a planned ceiling detail.", value: "recessed" },
    ],
  },
  {
    title: "Curtains",
    question: "How many curtain layers will the system operate?",
    help: "Double layers usually mean a sheer curtain plus a blackout curtain.",
    options: [
      { label: "Single curtain layer", description: "One curtain treatment on one operating track.", value: "single" },
      { label: "Sheer and blackout", description: "Two curtain layers for privacy and stronger light control.", value: "double" },
    ],
  },
  {
    title: "Light control",
    question: "How important is blackout performance?",
    help: "Hotel rooms and bedrooms may need more overlap and stronger light control.",
    options: [
      { label: "Standard light control", description: "Normal curtain overlap and everyday privacy.", value: "standard" },
      { label: "Improved blackout", description: "Stronger overlap and reduced light leakage are priorities.", value: "enhanced" },
    ],
  },
  {
    title: "Track route",
    question: "Is the track straight or shaped?",
    help: "Curves and bay windows require bend geometry and motor-load planning.",
    options: [
      { label: "Straight track", description: "A single straight run across the opening.", value: "straight" },
      { label: "Curved or bay track", description: "One or more bends around a bay or shaped wall.", value: "curved" },
    ],
  },
  {
    title: "Fixing",
    question: "Where will the track be fixed?",
    help: "The fixing position affects brackets, projection, support and appearance.",
    options: [
      { label: "Ceiling fixed", description: "The track fixes directly beneath the ceiling or recess support.", value: "ceiling" },
      { label: "Wall fixed", description: "The track projects from the wall on suitable brackets.", value: "wall" },
    ],
  },
  {
    title: "Project stage",
    question: "What stage is the room currently at?",
    help: "Recessed systems are much easier to coordinate before ceilings and finishes are complete.",
    options: [
      { label: "Existing finished room", description: "The room is complete and disruption should be limited.", value: "existing" },
      { label: "New build or renovation", description: "Structure, power and ceiling details can still be planned.", value: "new-build" },
    ],
  },
  {
    title: "Opening",
    question: "How should the curtains open?",
    help: "This determines master-carrier positions, curtain stacks and overlap planning.",
    options: [
      { label: "One-way draw", description: "The curtain stacks to one chosen side.", value: "one-way" },
      { label: "Centre opening", description: "Two curtains separate and stack to opposite sides.", value: "centre" },
    ],
  },
];

const keys: (keyof SelectorAnswers)[] = [
  "projectType",
  "finish",
  "layers",
  "lightControl",
  "shape",
  "fixing",
  "buildStage",
  "opening",
];

export default function TrackSystemSelector() {
  const [answers, setAnswers] = useState<SelectorAnswers>(initialAnswers);
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const recommendation = useMemo(() => getRecommendation(answers), [answers]);
  const current = steps[step];
  const currentKey = keys[step];
  const currentValue = answers[currentKey];
  const progress = ((step + 1) / steps.length) * 100;

  const choose = (value: string) => {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [currentKey]: value }));
  };

  const next = () => {
    if (step === steps.length - 1) {
      setShowResult(true);
      return;
    }
    setStep((currentStep) => currentStep + 1);
  };

  const back = () => {
    if (showResult) {
      setShowResult(false);
      return;
    }
    setStep((currentStep) => Math.max(0, currentStep - 1));
  };

  const restart = () => {
    setAnswers(initialAnswers);
    setStep(0);
    setShowResult(false);
  };

  return (
    <div className="overflow-hidden rounded-[36px] border border-white/10 bg-[#0E100F]">
      <div className="border-b border-white/10 px-5 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Guided track-system selector</p>
            <p className="mt-2 text-sm text-white/50">{showResult ? "Your recommendation" : `Step ${step + 1} of ${steps.length}`}</p>
          </div>
          <button type="button" onClick={restart} className="text-sm font-semibold text-white/50 transition hover:text-white">Start again</button>
        </div>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#B8F23D] transition-all duration-500" style={{ width: showResult ? "100%" : `${progress}%` }} />
        </div>
      </div>

      {!showResult ? (
        <div className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#B8F23D]">{current.title}</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{current.question}</h2>
            <p className="mt-5 max-w-2xl leading-8 text-[#AAACA4]">{current.help}</p>

            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {current.options.map((option) => {
                const active = currentValue === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => choose(option.value)}
                    className={`rounded-[26px] border p-6 text-left transition ${active ? "border-[#B8F23D] bg-[#B8F23D]/10" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`text-xl font-semibold ${active ? "text-[#B8F23D]" : "text-white"}`}>{option.label}</h3>
                        <p className="mt-3 leading-7 text-[#AAACA4]">{option.description}</p>
                      </div>
                      <span className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${active ? "border-[#B8F23D] bg-[#B8F23D] text-[#080A09]" : "border-white/25 text-transparent"}`}>✓</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex items-center justify-between gap-4">
              <button type="button" onClick={back} disabled={step === 0} className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 font-semibold text-white/70 disabled:cursor-not-allowed disabled:opacity-30">← Back</button>
              <button type="button" onClick={next} className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]">{step === steps.length - 1 ? "See my recommendation →" : "Continue →"}</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-[32px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.07] p-6 sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">Recommended starting system</p>
              <h2 className="mt-4 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">{recommendation.system}</h2>
              <p className="mt-4 text-2xl font-semibold text-white/85">{recommendation.headline}</p>
              <p className="mt-6 max-w-4xl leading-8 text-[#C8C8C1]">{recommendation.reason}</p>

              <div className="mt-8 grid gap-5 lg:grid-cols-2">
                <article className="rounded-[24px] border border-white/10 bg-[#080A09] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Alternative direction</p>
                  <p className="mt-3 leading-7 text-[#D8D8D0]">{recommendation.alternative}</p>
                </article>
                <article className="rounded-[24px] border border-white/10 bg-[#080A09] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Next action</p>
                  <p className="mt-3 leading-7 text-[#D8D8D0]">Confirm curtain weight, fixing support, power, controls, exact track route and service access before ordering.</p>
                </article>
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Installation checks</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {recommendation.checks.map((check) => (
                    <div key={check} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-[#D8D8D0]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B8F23D]" />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              {recommendation.flags.length > 0 && (
                <div className="mt-8 rounded-[24px] border border-amber-300/20 bg-amber-300/[0.06] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-200">Project warnings</p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-amber-50">
                    {recommendation.flags.map((flag) => <li key={flag}>{flag}</li>)}
                  </ul>
                </div>
              )}

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={recommendation.href} className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-6 font-bold text-[#080A09]">Explore {recommendation.system} →</Link>
                <Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-6 font-semibold">Request a survey</Link>
                <button type="button" onClick={back} className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 font-semibold text-white/70">Change my answers</button>
              </div>

              <Link href="/tools/curtain-weight-motor-selector" className="mt-6 inline-flex text-sm font-semibold text-[#B8F23D]">Need the curtain load? Open the separate weight calculator →</Link>
            </div>
          </div>
        </div>
      )}

      <p className="border-t border-white/10 px-5 py-5 text-xs leading-6 text-white/40 sm:px-8">This guided selector provides an early planning direction, not a final specification. The exact track, motor, bends, carriers, brackets, power and controls must be confirmed before ordering.</p>
    </div>
  );
}
