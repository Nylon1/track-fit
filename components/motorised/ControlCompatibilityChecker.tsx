"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ControlGoal =
  | "remote"
  | "app"
  | "voice"
  | "z-wave"
  | "bms"
  | "battery";

type PropertyType = "home" | "hotel" | "commercial";

type Result = {
  title: string;
  motors: string[];
  route: string;
  equipment: string[];
  notes: string[];
};

const goals: Array<{
  id: ControlGoal;
  title: string;
  description: string;
}> = [
  {
    id: "remote",
    title: "Remote or wall switch",
    description: "Simple room control without relying on a phone or wider automation system.",
  },
  {
    id: "app",
    title: "Phone app",
    description: "Open, close and schedule curtains using the Forest Connect app pathway.",
  },
  {
    id: "voice",
    title: "Alexa or Google voice control",
    description: "Use supported smart-home equipment to operate curtains by voice.",
  },
  {
    id: "z-wave",
    title: "Z-Wave smart home",
    description: "Integrate with a compatible Z-Wave home-automation environment.",
  },
  {
    id: "bms",
    title: "Hotel or building management",
    description: "Relay, dry-contact or professional automation control for larger projects.",
  },
  {
    id: "battery",
    title: "No nearby power point",
    description: "Use a rechargeable motor where a suitable mains supply is unavailable.",
  },
];

const propertyOptions: Array<{
  id: PropertyType;
  title: string;
}> = [
  { id: "home", title: "Home or apartment" },
  { id: "hotel", title: "Hotel or hospitality" },
  { id: "commercial", title: "Office or commercial building" },
];

function getResult(goal: ControlGoal, property: PropertyType): Result {
  if (goal === "remote") {
    return {
      title: "RF remote-control pathway",
      motors: ["Shuttle Go", "Shuttle iOn", "Shuttle L", "Shuttle M", "Shuttle AC"],
      route: "/motorised-curtain-tracks/controls",
      equipment: [
        "Compatible Forest EasyTouch remote",
        "Optional wall-control route where supported",
        "Correct receiver and motor protocol",
      ],
      notes: [
        "EasyTouch is the broadest remote-control starting point across the Shuttle range.",
        "Diamond Sense and wireless wall-switch compatibility is not identical for every motor, so the exact accessory must be confirmed before ordering.",
      ],
    };
  }

  if (goal === "app") {
    return {
      title: "Forest Connect app pathway",
      motors: ["Shuttle Go", "Shuttle L", "Shuttle M"],
      route: "/motorised-curtain-tracks/smart-home",
      equipment: [
        "Shuttle Go with integrated Wi-Fi, or",
        "Compatible Shuttle L/M plus Forest Wi-Fi Dongle",
        "2.4 GHz Wi-Fi and commissioning access",
      ],
      notes: [
        "Shuttle Go includes its Wi-Fi route and does not require the separate Forest Wi-Fi Dongle for Forest Connect app setup.",
        "The Forest brochure excludes Shuttle AC and iOn from the Wi-Fi Dongle pathway.",
      ],
    };
  }

  if (goal === "voice") {
    return {
      title: "Voice-control smart-home pathway",
      motors: ["Shuttle Go", "Shuttle L", "Shuttle M", "Shuttle iOn"],
      route: "/motorised-curtain-tracks/smart-home",
      equipment: [
        "A compatible Forest app, dongle or connector pathway",
        "Supported Alexa, Google or third-party smart-home equipment",
        "Correct smart plug or integration component where required",
      ],
      notes: [
        "Voice integration depends on the chosen motor and accessory route; it is not one universal connection method.",
        "Shuttle Go follows its integrated Wi-Fi route, while other motors may need a dongle, Wireless Connector or third-party component.",
      ],
    };
  }

  if (goal === "z-wave") {
    return {
      title: "Z-Wave integration pathway",
      motors: ["Shuttle L with Z-Wave", "Shuttle M with Z-Wave"],
      route: "/motorised-curtain-tracks/home-automation",
      equipment: [
        "Z-Wave version of Shuttle L or Shuttle M",
        "Compatible Z-Wave controller or hub",
        "Automation programming and final commissioning",
      ],
      notes: [
        "Z-Wave is an optional motor version rather than a feature that should be assumed on every L or M motor.",
        "Confirm regional frequency, controller compatibility and installer responsibility before ordering.",
      ],
    };
  }

  if (goal === "battery") {
    return {
      title: "Rechargeable battery pathway",
      motors: ["Shuttle iOn"],
      route: "/motorised-curtain-tracks/shuttle-ion",
      equipment: [
        "Shuttle iOn rechargeable motor",
        "Removable battery pack and charger",
        "Suitable curtain load and track configuration",
      ],
      notes: [
        "The published planning limit is up to 25 kg and eight metres on a straight track.",
        "The brochure permits up to two bends, subject to final track geometry and specification.",
      ],
    };
  }

  return {
    title:
      property === "home"
        ? "Professional home-automation pathway"
        : property === "hotel"
          ? "Hotel-control and relay pathway"
          : "Building-management and relay pathway",
    motors: ["Shuttle AC", "Shuttle L", "Shuttle M"],
    route: "/motorised-curtain-tracks/building-management",
    equipment: [
      "Confirmed relay, dry-contact or automation interface",
      "Motor selected for curtain load and control architecture",
      "Electrical and automation coordination",
      "Commissioning and handover testing",
    ],
    notes: [
      "Shuttle AC is specifically positioned for building-management control.",
      "Shuttle L and M can support broader automation pathways, but the precise receiver, interface and control design must be agreed before supply.",
    ],
  };
}

export default function ControlCompatibilityChecker() {
  const [goal, setGoal] = useState<ControlGoal>("app");
  const [property, setProperty] = useState<PropertyType>("home");

  const result = useMemo(() => getResult(goal, property), [goal, property]);

  return (
    <div className="rounded-[34px] border border-white/10 bg-[#0E100F] p-5 sm:p-8">
      <div className="grid gap-9 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
            Interactive control selector
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            How do you want to control the curtains?
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-[#AAACA4]">
            Choose your main goal and project type. The checker will show the most relevant Forest Shuttle control pathway and the equipment that may be required.
          </p>

          <div className="mt-8">
            <p className="text-sm font-semibold text-white/70">Project type</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {propertyOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setProperty(option.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    property === option.id
                      ? "border-[#B8F23D] bg-[#B8F23D] text-[#080A09]"
                      : "border-white/15 text-white/65 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {option.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {goals.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setGoal(option.id)}
                className={`rounded-[22px] border p-5 text-left transition ${
                  goal === option.id
                    ? "border-[#B8F23D]/60 bg-[#B8F23D]/[0.09]"
                    : "border-white/10 bg-white/[0.025] hover:border-white/25"
                }`}
              >
                <span className="text-lg font-semibold">{option.title}</span>
                <span className="mt-2 block text-sm leading-6 text-[#AAACA4]">
                  {option.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[30px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.07] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
            Recommended direction
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            {result.title}
          </h3>

          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
              Motors to investigate
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.motors.map((motor) => (
                <span
                  key={motor}
                  className="rounded-full border border-white/15 bg-[#080A09] px-4 py-2 text-sm font-semibold"
                >
                  {motor}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                Likely equipment
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#D8D8D0]">
                {result.equipment.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B8F23D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                Important checks
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[#D8D8D0]">
                {result.notes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={result.route}
              className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-6 font-bold text-[#080A09]"
            >
              Read the control guide →
            </Link>
            <Link
              href="/quote/postcode"
              className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-6 font-semibold"
            >
              Discuss your project
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs leading-6 text-white/40">
        This checker provides an early planning direction only. Final compatibility depends on the exact motor version, receiver, accessory, smart-home platform, regional protocol and current Forest documentation.
      </p>
    </div>
  );
}
