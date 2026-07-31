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

const buttonClass =
  "rounded-[20px] border px-4 py-3 text-left text-sm font-semibold transition";

function getRecommendation(answers: SelectorAnswers): Recommendation {
  const flags: string[] = [];
  const checks = [
    "Confirm the finished curtain weight and selected Shuttle motor.",
    "Confirm the fixing substrate, bracket spacing and continuous support.",
    "Coordinate motor position, power, controls and future service access.",
    "Confirm track length, opening direction, stack position and carrier arrangement.",
  ];

  if (answers.shape === "curved") {
    flags.push(
      "Curved layouts require the bend geometry and complete curtain travel to be checked before manufacture.",
    );
    checks.push(
      "Include every bend in the motor-load assessment and confirm the exact bend radius.",
    );
  }

  if (answers.fixing === "wall") {
    checks.push(
      "Confirm bracket projection clears handles, radiators, window boards and curtain folds.",
    );
  }

  if (answers.opening === "centre") {
    checks.push(
      "Confirm the centre overlap, master-carrier position and equal curtain stack space.",
    );
  }

  if (answers.finish === "recessed") {
    if (answers.buildStage === "existing") {
      flags.push(
        "A recessed system in an existing finished ceiling may require building work and early inspection of the ceiling void.",
      );
    }

    if (answers.fixing === "wall") {
      flags.push(
        "Recessed motorised tracks are normally coordinated as ceiling details rather than wall-fixed systems.",
      );
    }

    checks.push(
      "Coordinate the recess profile, plaster finish, structural support and motor access before closing the ceiling.",
    );

    return {
      system: "FMS Plus Recess",
      href: "/motorised-curtain-tracks/recessed-tracks",
      headline: "A concealed architectural ceiling system",
      reason:
        "Your priority is a recessed finish. FMS Plus Recess is the strongest starting direction where the motorised track needs to integrate into the ceiling design.",
      alternative:
        "Use standard FMS Plus where a premium profile is wanted but a full ceiling recess is not practical.",
      checks,
      flags,
    };
  }

  if (
    answers.layers === "double" ||
    answers.lightControl === "enhanced" ||
    answers.projectType === "hotel"
  ) {
    if (answers.shape === "curved") {
      flags.push(
        "The exact suitability of a dual-channel arrangement for a curved route must be confirmed before specification.",
      );
    }

    checks.push(
      "Confirm the sheer and blackout curtain construction, overlap requirement and available ceiling width.",
    );

    return {
      system: "FMS Dual",
      href: "/motorised-curtain-tracks/hotel-blackout",
      headline: "A two-channel system for stronger light control",
      reason:
        "Your answers prioritise two curtain layers, hotel use or enhanced blackout. FMS Dual is the main starting point because it operates two channels from one motor and provides an adjustable overlap.",
      alternative:
        "Use two separately specified FMS tracks where independent motors, different control zones or a custom spacing arrangement are required.",
      checks,
      flags,
    };
  }

  if (
    answers.finish === "architectural" ||
    answers.buildStage === "new-build" ||
    answers.projectType === "commercial"
  ) {
    return {
      system: "FMS Plus",
      href: "/motorised-curtain-tracks/fms-plus",
      headline: "A more architectural motorised track profile",
      reason:
        "Your project benefits from a more considered architectural profile without requiring a full ceiling recess. FMS Plus is the most relevant starting direction.",
      alternative:
        "Use standard FMS where the priority is a compact, versatile track rather than architectural integration.",
      checks,
      flags,
    };
  }

  return {
    system: "FMS",
    href: "/motorised-curtain-tracks/fms",
    headline: "The versatile standard motorised track system",
    reason:
      "Your project suits the standard FMS pathway: a compact motorised track for suitable ceiling- or wall-fixed, one-way or centre-opening curtains, including straight and professionally planned curved layouts.",
    alternative:
      "Move to FMS Plus where the profile needs to form part of a more architectural interior detail.",
    checks,
    flags,
  };
}

function Choice<T extends string>({
  value,
  selected,
  label,
  onClick,
}: {
  value: T;
  selected: T;
  label: string;
  onClick: (value: T) => void;
}) {
  const active = selected === value;

  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`${buttonClass} ${
        active
          ? "border-[#B8F23D] bg-[#B8F23D]/10 text-[#B8F23D]"
          : "border-white/10 bg-white/[0.025] text-white/65 hover:border-white/25 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export default function TrackSystemSelector() {
  const [answers, setAnswers] = useState<SelectorAnswers>(initialAnswers);

  const recommendation = useMemo(
    () => getRecommendation(answers),
    [answers],
  );

  const update = <K extends keyof SelectorAnswers>(
    key: K,
    value: SelectorAnswers[K],
  ) => {
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="rounded-[36px] border border-white/10 bg-[#0E100F] p-5 sm:p-8">
      <div className="grid gap-9 xl:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
            Interactive track-system selector
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            How should the motorised track fit the room?
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-[#AAACA4]">
            Choose the project, finish, curtain arrangement and installation conditions. The selector will identify the Forest FMS system to investigate first.
          </p>

          <div className="mt-9 grid gap-7 md:grid-cols-2">
            <fieldset>
              <legend className="text-sm font-semibold text-white/75">Project type</legend>
              <div className="mt-3 grid gap-2">
                <Choice value="home" selected={answers.projectType} label="Home or apartment" onClick={(value) => update("projectType", value)} />
                <Choice value="hotel" selected={answers.projectType} label="Hotel or hospitality" onClick={(value) => update("projectType", value)} />
                <Choice value="commercial" selected={answers.projectType} label="Office or commercial" onClick={(value) => update("projectType", value)} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-white/75">Track finish</legend>
              <div className="mt-3 grid gap-2">
                <Choice value="visible" selected={answers.finish} label="Compact visible track" onClick={(value) => update("finish", value)} />
                <Choice value="architectural" selected={answers.finish} label="Architectural profile" onClick={(value) => update("finish", value)} />
                <Choice value="recessed" selected={answers.finish} label="Concealed ceiling recess" onClick={(value) => update("finish", value)} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-white/75">Curtain layers</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Choice value="single" selected={answers.layers} label="Single layer" onClick={(value) => update("layers", value)} />
                <Choice value="double" selected={answers.layers} label="Sheer + blackout" onClick={(value) => update("layers", value)} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-white/75">Light control</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Choice value="standard" selected={answers.lightControl} label="Standard" onClick={(value) => update("lightControl", value)} />
                <Choice value="enhanced" selected={answers.lightControl} label="Improved blackout" onClick={(value) => update("lightControl", value)} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-white/75">Track route</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Choice value="straight" selected={answers.shape} label="Straight" onClick={(value) => update("shape", value)} />
                <Choice value="curved" selected={answers.shape} label="Curved / bay" onClick={(value) => update("shape", value)} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-white/75">Fixing position</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Choice value="ceiling" selected={answers.fixing} label="Ceiling fixed" onClick={(value) => update("fixing", value)} />
                <Choice value="wall" selected={answers.fixing} label="Wall fixed" onClick={(value) => update("fixing", value)} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-white/75">Project stage</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Choice value="existing" selected={answers.buildStage} label="Existing room" onClick={(value) => update("buildStage", value)} />
                <Choice value="new-build" selected={answers.buildStage} label="New build / renovation" onClick={(value) => update("buildStage", value)} />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-white/75">Opening direction</legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Choice value="one-way" selected={answers.opening} label="One-way draw" onClick={(value) => update("opening", value)} />
                <Choice value="centre" selected={answers.opening} label="Centre opening" onClick={(value) => update("opening", value)} />
              </div>
            </fieldset>
          </div>
        </div>

        <aside className="self-start rounded-[30px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.07] p-6 sm:p-8 xl:sticky xl:top-24">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
            Recommended starting system
          </p>
          <h3 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
            {recommendation.system}
          </h3>
          <p className="mt-3 text-xl font-semibold text-white/85">
            {recommendation.headline}
          </p>
          <p className="mt-5 leading-8 text-[#C8C8C1]">
            {recommendation.reason}
          </p>

          <div className="mt-7 rounded-[22px] border border-white/10 bg-[#080A09] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
              Alternative direction
            </p>
            <p className="mt-3 text-sm leading-6 text-[#D8D8D0]">
              {recommendation.alternative}
            </p>
          </div>

          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
              Installation checks
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#D8D8D0]">
              {recommendation.checks.map((check) => (
                <li key={check} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B8F23D]" />
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>

          {recommendation.flags.length > 0 && (
            <div className="mt-7 rounded-[22px] border border-amber-300/20 bg-amber-300/[0.06] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-200">
                Project warnings
              </p>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-amber-50">
                {recommendation.flags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={recommendation.href} className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-6 font-bold text-[#080A09]">
              Explore {recommendation.system} →
            </Link>
            <Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-6 font-semibold">
              Request a survey
            </Link>
          </div>

          <Link href="/tools/curtain-weight-motor-selector" className="mt-5 inline-flex text-sm font-semibold text-[#B8F23D]">
            Need the curtain load? Open the separate weight calculator →
          </Link>
        </aside>
      </div>

      <p className="mt-7 text-xs leading-6 text-white/40">
        This selector provides an early planning direction, not a final specification. The exact track, motor, bends, carriers, brackets, power and controls must be confirmed for the project before ordering.
      </p>
    </div>
  );
}
