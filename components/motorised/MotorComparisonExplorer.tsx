"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PowerFilter = "all" | "mains" | "battery";
type ControlFilter = "all" | "app" | "automation" | "simple";
type ApplicationFilter = "all" | "domestic" | "commercial" | "heavy";

type Motor = {
  name: string;
  slug: string;
  capacity: number;
  capacityLabel: string;
  power: "Mains" | "Rechargeable battery";
  bestFor: string;
  applications: ApplicationFilter[];
  controls: ControlFilter[];
  app: string;
  automation: string;
  curves: string;
  warranty: string;
  note: string;
};

const motors: Motor[] = [
  {
    name: "Shuttle Go",
    slug: "shuttle-go",
    capacity: 35,
    capacityLabel: "Up to 35 kg",
    power: "Mains",
    bestFor: "Connected domestic curtains",
    applications: ["domestic"],
    controls: ["app", "simple"],
    app: "Built-in Wi-Fi and Bluetooth for Forest Connect",
    automation: "App and compatible voice-control pathway",
    curves: "Published load applies without curves; confirm any shaped route before selection",
    warranty: "5 years",
    note: "The practical starting point for suitable home installations where simple connected control and value matter.",
  },
  {
    name: "Shuttle iOn",
    slug: "shuttle-ion",
    capacity: 25,
    capacityLabel: "Up to 25 kg",
    power: "Rechargeable battery",
    bestFor: "Locations without a nearby mains point",
    applications: ["domestic"],
    controls: ["simple"],
    app: "Control options depend on the selected accessories",
    automation: "Confirm the required interface before ordering",
    curves: "Published for suitable curved tracks with up to two bends",
    warranty: "5 years",
    note: "Useful where running a mains supply is difficult, subject to curtain load, track length and charging access.",
  },
  {
    name: "Shuttle L",
    slug: "shuttle-l",
    capacity: 40,
    capacityLabel: "Up to 40 kg",
    power: "Mains",
    bestFor: "Flexible domestic and contract projects",
    applications: ["domestic", "commercial"],
    controls: ["app", "automation", "simple"],
    app: "Compatible configurations can use a Wi-Fi dongle",
    automation: "Broad integration options, including compatible Z-Wave pathways",
    curves: "Curved use requires project-specific load and geometry confirmation",
    warranty: "10 years",
    note: "A versatile wired option where broader control choices or a higher published load are required.",
  },
  {
    name: "Shuttle AC",
    slug: "shuttle-ac",
    capacity: 40,
    capacityLabel: "Up to 40 kg",
    power: "Mains",
    bestFor: "Hard-wired and building-management integration",
    applications: ["commercial"],
    controls: ["automation"],
    app: "Not the primary selection route",
    automation: "Designed for hard-wired, relay and BMS-style control",
    curves: "Confirm the complete track configuration and moving load before selection",
    warranty: "Confirm for the supplied configuration",
    note: "The specialist direction for projects controlled through electrical or building-management infrastructure.",
  },
  {
    name: "Shuttle M",
    slug: "shuttle-m",
    capacity: 70,
    capacityLabel: "Up to 70 kg",
    power: "Mains",
    bestFor: "Heavy curtains and demanding installations",
    applications: ["commercial", "heavy"],
    controls: ["app", "automation", "simple"],
    app: "Compatible configurations can use connected accessories",
    automation: "Suitable for advanced integration with the correct interface",
    curves: "Published 70 kg limit is without curves; curved routes need specific confirmation",
    warranty: "10 years",
    note: "The strongest Shuttle option and the main starting point when finished curtain load is the deciding factor.",
  },
];

const chipClass = "rounded-full border px-4 py-2 text-sm font-semibold transition";

export default function MotorComparisonExplorer() {
  const [minimumLoad, setMinimumLoad] = useState(0);
  const [power, setPower] = useState<PowerFilter>("all");
  const [control, setControl] = useState<ControlFilter>("all");
  const [application, setApplication] = useState<ApplicationFilter>("all");

  const filtered = useMemo(
    () =>
      motors.filter((motor) => {
        const loadMatch = motor.capacity >= minimumLoad;
        const powerMatch =
          power === "all" ||
          (power === "mains" && motor.power === "Mains") ||
          (power === "battery" && motor.power === "Rechargeable battery");
        const controlMatch = control === "all" || motor.controls.includes(control);
        const applicationMatch = application === "all" || motor.applications.includes(application);
        return loadMatch && powerMatch && controlMatch && applicationMatch;
      }),
    [application, control, minimumLoad, power],
  );

  const reset = () => {
    setMinimumLoad(0);
    setPower("all");
    setControl("all");
    setApplication("all");
  };

  return (
    <div className="rounded-[36px] border border-white/10 bg-[#0E100F] p-5 sm:p-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Interactive motor comparison</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Narrow the Shuttle range around your project.</h2>
          <p className="mt-5 max-w-3xl leading-8 text-[#AAACA4]">Filter by finished curtain load, power, control and application. The result is an early shortlist, not a final specification.</p>
        </div>
        <button type="button" onClick={reset} className="self-start text-sm font-semibold text-[#B8F23D]">Reset filters</button>
      </div>

      <div className="mt-9 grid gap-6 rounded-[28px] border border-white/10 bg-[#080A09] p-5 lg:grid-cols-4">
        <fieldset>
          <legend className="text-sm font-semibold text-white/70">Minimum curtain capacity</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {[0, 25, 35, 40, 70].map((value) => (
              <button key={value} type="button" onClick={() => setMinimumLoad(value)} className={`${chipClass} ${minimumLoad === value ? "border-[#B8F23D] bg-[#B8F23D]/10 text-[#B8F23D]" : "border-white/10 text-white/60 hover:text-white"}`}>
                {value === 0 ? "Any load" : `${value} kg+`}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-white/70">Power</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["all", "mains", "battery"] as PowerFilter[]).map((value) => (
              <button key={value} type="button" onClick={() => setPower(value)} className={`${chipClass} ${power === value ? "border-[#B8F23D] bg-[#B8F23D]/10 text-[#B8F23D]" : "border-white/10 text-white/60 hover:text-white"}`}>
                {value === "all" ? "Any power" : value === "mains" ? "Mains" : "Battery"}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-white/70">Control priority</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["all", "simple", "app", "automation"] as ControlFilter[]).map((value) => (
              <button key={value} type="button" onClick={() => setControl(value)} className={`${chipClass} ${control === value ? "border-[#B8F23D] bg-[#B8F23D]/10 text-[#B8F23D]" : "border-white/10 text-white/60 hover:text-white"}`}>
                {value === "all" ? "Any control" : value === "simple" ? "Remote / touch" : value === "app" ? "App control" : "Automation / BMS"}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-white/70">Application</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["all", "domestic", "commercial", "heavy"] as ApplicationFilter[]).map((value) => (
              <button key={value} type="button" onClick={() => setApplication(value)} className={`${chipClass} ${application === value ? "border-[#B8F23D] bg-[#B8F23D]/10 text-[#B8F23D]" : "border-white/10 text-white/60 hover:text-white"}`}>
                {value === "all" ? "Any project" : value === "domestic" ? "Home" : value === "commercial" ? "Commercial" : "Heavy curtains"}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-7 flex items-center justify-between gap-4">
        <p className="text-sm text-white/50">{filtered.length} of {motors.length} motors match</p>
        <Link href="/motorised-curtain-tracks/control-selector" className="text-sm font-semibold text-[#B8F23D]">Need help with controls? →</Link>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          {filtered.map((motor) => (
            <article key={motor.name} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">{motor.capacityLabel}</p>
                  <h3 className="mt-3 text-3xl font-semibold">{motor.name}</h3>
                  <p className="mt-2 font-semibold text-white/65">{motor.bestFor}</p>
                </div>
                <span className="self-start rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/55">{motor.power}</span>
              </div>

              <p className="mt-5 leading-7 text-[#AAACA4]">{motor.note}</p>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4"><dt className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">App</dt><dd className="mt-2 text-sm leading-6 text-[#D5D5CE]">{motor.app}</dd></div>
                <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4"><dt className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Automation</dt><dd className="mt-2 text-sm leading-6 text-[#D5D5CE]">{motor.automation}</dd></div>
                <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4"><dt className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Curved routes</dt><dd className="mt-2 text-sm leading-6 text-[#D5D5CE]">{motor.curves}</dd></div>
                <div className="rounded-[20px] border border-white/10 bg-[#080A09] p-4"><dt className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Motor warranty</dt><dd className="mt-2 text-sm leading-6 text-[#D5D5CE]">{motor.warranty}</dd></div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/motorised-curtain-tracks/${motor.slug}`} className="inline-flex min-h-11 items-center rounded-full bg-[#B8F23D] px-5 font-bold text-[#080A09]">View {motor.name} →</Link>
                <Link href="/quote/postcode" className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 font-semibold">Request a review</Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[28px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.07] p-7">
          <h3 className="text-2xl font-semibold">No motor matches every selected filter.</h3>
          <p className="mt-3 leading-7 text-[#C8C8C1]">Relax one filter or request a system review. Complex projects may need a different control arrangement, revised curtain construction or a project-specific combination.</p>
          <button type="button" onClick={reset} className="mt-5 font-semibold text-[#B8F23D]">Clear all filters →</button>
        </div>
      )}

      <p className="mt-7 text-xs leading-6 text-white/40">Published capacities depend on the stated configuration. Curves, track length, curtain construction, accessories and control requirements can change the final selection. Confirm the complete system before ordering.</p>
    </div>
  );
}
