"use client";

import { useMemo, useRef, useState } from "react";

type MotorPreference = "standard" | "battery" | "automation" | "heavy-duty" | "unsure";
type CurtainSplit = "single" | "pair";

type Answers = {
  trackWidth: string;
  finishedDrop: string;
  fullness: string;
  curtainSplit: CurtainSplit;
  mainFabricPreset: string;
  mainFabricCustom: string;
  liningPreset: string;
  liningCustom: string;
  interliningPreset: string;
  interliningCustom: string;
  constructionAllowance: string;
  motorMargin: string;
  preference: MotorPreference;
  trackShape: string;
};

type Motor = {
  name: string;
  limit: number;
  purpose: string;
  note: string;
};

const motors: Motor[] = [
  {
    name: "Forest Shuttle Ion",
    limit: 25,
    purpose: "Rechargeable battery-powered operation",
    note: "For projects where a rechargeable solution is preferred.",
  },
  {
    name: "Forest Shuttle Go",
    limit: 35,
    purpose: "Standard domestic motorised curtains",
    note: "The Forest representative positioned this as the cost-effective domestic option with Wi-Fi and Bluetooth.",
  },
  {
    name: "Forest Shuttle L",
    limit: 40,
    purpose: "Higher-load domestic and contract applications",
    note: "A stronger option where Shuttle Go has insufficient planning headroom.",
  },
  {
    name: "Forest Shuttle AC",
    limit: 40,
    purpose: "Home-automation integration",
    note: "For use where the track needs to work within a wider automation system.",
  },
  {
    name: "Forest Shuttle M",
    limit: 70,
    purpose: "Heavier curtain installations",
    note: "The highest-capacity motor in the supplied range.",
  },
];

const initialAnswers: Answers = {
  trackWidth: "",
  finishedDrop: "",
  fullness: "2",
  curtainSplit: "pair",
  mainFabricPreset: "350",
  mainFabricCustom: "",
  liningPreset: "220",
  liningCustom: "",
  interliningPreset: "0",
  interliningCustom: "",
  constructionAllowance: "15",
  motorMargin: "20",
  preference: "standard",
  trackShape: "straight",
};

const fieldClass =
  "mt-2 min-h-12 w-full rounded-2xl border border-white/10 bg-[#111412] px-4 text-[#F4F1E8] outline-none transition focus:border-[#B8F23D]/70";
const labelClass = "block text-sm font-semibold text-[#E6E6DF]";
const sectionClass = "rounded-[30px] border border-white/10 bg-white/[0.035] p-5 sm:p-7";

function toNumber(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function formatKg(value: number) {
  return `${value.toFixed(1)} kg`;
}

function getGsm(preset: string, custom: string) {
  return preset === "custom" ? toNumber(custom) : toNumber(preset);
}

export default function CurtainWeightMotorSelector() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof Answers, value: string) => {
    setAnswers((current) => ({ ...current, [field]: value }));
  };

  const calculation = useMemo(() => {
    const trackWidth = toNumber(answers.trackWidth);
    const finishedDrop = toNumber(answers.finishedDrop);
    const fullness = Math.max(1, toNumber(answers.fullness) || 1);
    const mainGsm = getGsm(answers.mainFabricPreset, answers.mainFabricCustom);
    const liningGsm = getGsm(answers.liningPreset, answers.liningCustom);
    const interliningGsm = getGsm(answers.interliningPreset, answers.interliningCustom);
    const combinedGsm = mainGsm + liningGsm + interliningGsm;
    const fabricArea = trackWidth * fullness * finishedDrop;
    const rawWeight = (fabricArea * combinedGsm) / 1000;
    const finishedWeight = rawWeight * (1 + toNumber(answers.constructionAllowance) / 100);
    const planningLoad = finishedWeight * (1 + toNumber(answers.motorMargin) / 100);
    const panelWeight = answers.curtainSplit === "pair" ? finishedWeight / 2 : finishedWeight;

    return {
      trackWidth,
      finishedDrop,
      fullness,
      mainGsm,
      liningGsm,
      interliningGsm,
      combinedGsm,
      fabricArea,
      rawWeight,
      finishedWeight,
      planningLoad,
      panelWeight,
    };
  }, [answers]);

  const recommendation = useMemo(() => {
    const load = calculation.planningLoad;
    if (load <= 0) {
      return {
        primary: null as Motor | null,
        alternatives: [] as Motor[],
        reason: "Enter the track width and finished drop to calculate a recommendation.",
      };
    }

    const eligible = motors.filter((motor) => motor.limit >= load);
    let primary: Motor | undefined;

    if (answers.preference === "battery") {
      primary = eligible.find((motor) => motor.name === "Forest Shuttle Ion");
    } else if (answers.preference === "automation") {
      primary = eligible.find((motor) => motor.name === "Forest Shuttle AC");
    } else if (answers.preference === "heavy-duty") {
      primary = eligible.find((motor) => motor.name === "Forest Shuttle M");
    } else if (answers.preference === "standard") {
      primary =
        eligible.find((motor) => motor.name === "Forest Shuttle Go") ||
        eligible.find((motor) => motor.name === "Forest Shuttle L") ||
        eligible.find((motor) => motor.name === "Forest Shuttle M");
    }

    primary = primary || eligible[0];

    if (!primary) {
      return {
        primary: null,
        alternatives: [],
        reason:
          "The calculated planning load exceeds the supplied 70 kg Shuttle M limit. Specialist review is required.",
      };
    }

    let reason = `${primary.name} is the first motor in the selected preference category whose supplied limit remains above the calculated planning load.`;
    if (answers.trackShape !== "straight") {
      reason += " Because the track is not straight, final confirmation is especially important.";
    }

    return {
      primary,
      alternatives: eligible.filter((motor) => motor.name !== primary?.name),
      reason,
    };
  }, [answers.preference, answers.trackShape, calculation.planningLoad]);

  const warnings = useMemo(() => {
    const items: string[] = [];
    if (calculation.trackWidth <= 0) items.push("Track width has not been entered.");
    if (calculation.finishedDrop <= 0) items.push("Finished curtain drop has not been entered.");
    if (calculation.mainGsm <= 0) items.push("Main fabric GSM is missing or zero.");
    if (answers.mainFabricPreset !== "custom") {
      items.push("The main fabric uses a planning preset. Use the supplier’s actual GSM for final selection.");
    }
    if (answers.trackShape !== "straight") {
      items.push("Curved, bay or joined tracks require project-specific confirmation.");
    }
    if (recommendation.primary && calculation.planningLoad > recommendation.primary.limit * 0.9) {
      items.push("The planning load is close to the selected motor’s supplied maximum. Consider the next size or obtain written confirmation.");
    }
    items.push("Confirm whether the published limit applies to the complete moving curtain load for the exact track configuration.");
    return items;
  }, [answers, calculation, recommendation.primary]);

  const summaryText = [
    "TRACKFIT CURTAIN WEIGHT & MOTOR PLANNING SUMMARY",
    "",
    `Track width: ${answers.trackWidth || "Not provided"} m`,
    `Finished drop: ${answers.finishedDrop || "Not provided"} m`,
    `Fullness: ${answers.fullness}x`,
    `Curtain arrangement: ${answers.curtainSplit}`,
    `Track shape: ${answers.trackShape}`,
    "",
    `Main fabric: ${calculation.mainGsm} GSM`,
    `Lining: ${calculation.liningGsm} GSM`,
    `Interlining: ${calculation.interliningGsm} GSM`,
    `Combined material weight: ${calculation.combinedGsm} GSM`,
    `Estimated fabric area: ${calculation.fabricArea.toFixed(2)} m²`,
    `Estimated finished curtain weight: ${formatKg(calculation.finishedWeight)}`,
    `Weight per curtain: ${formatKg(calculation.panelWeight)}`,
    `Motor planning load: ${formatKg(calculation.planningLoad)}`,
    "",
    `Preliminary recommendation: ${recommendation.primary?.name ?? "Specialist review required"}`,
    `Reason: ${recommendation.reason}`,
    "",
    "Warnings:",
    ...warnings.map((warning) => `- ${warning}`),
    "",
    "This is an early planning estimate only. Final selection must be confirmed against the exact curtain construction, track length, bends, heading, controls, power requirements and current Forest specification.",
  ].join("\n");

  const emailHref = `mailto:enquiries@curtaintrackfitters.com?subject=${encodeURIComponent(
    "Motorised curtain-track planning enquiry",
  )}&body=${encodeURIComponent(summaryText)}`;

  const handleCalculate = () => {
    setShowResults(true);
    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      window.alert("Motor planning summary copied.");
    } catch {
      window.alert("The summary could not be copied automatically.");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="grid gap-6">
        <div className={sectionClass}>
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#B8F23D] font-bold text-[#080A09]">1</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">Curtain dimensions</p>
              <h2 className="mt-1 text-2xl font-semibold">Enter the opening and curtain construction.</h2>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <label className={labelClass}>
              Track width (metres)
              <input type="number" min="0" step="0.01" value={answers.trackWidth} onChange={(e) => update("trackWidth", e.target.value)} className={fieldClass} placeholder="5.0" />
            </label>
            <label className={labelClass}>
              Finished drop (metres)
              <input type="number" min="0" step="0.01" value={answers.finishedDrop} onChange={(e) => update("finishedDrop", e.target.value)} className={fieldClass} placeholder="2.6" />
            </label>
            <label className={labelClass}>
              Curtain fullness
              <select value={answers.fullness} onChange={(e) => update("fullness", e.target.value)} className={fieldClass}>
                <option value="1.5">1.5x</option>
                <option value="1.8">1.8x</option>
                <option value="2">2x</option>
                <option value="2.2">2.2x</option>
                <option value="2.5">2.5x</option>
                <option value="3">3x</option>
              </select>
            </label>
            <label className={labelClass}>
              Curtain arrangement
              <select value={answers.curtainSplit} onChange={(e) => update("curtainSplit", e.target.value)} className={fieldClass}>
                <option value="pair">Pair — centre opening</option>
                <option value="single">Single curtain</option>
              </select>
            </label>
          </div>
        </div>

        <div className={sectionClass}>
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#B8F23D] font-bold text-[#080A09]">2</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">Fabric weights</p>
              <h2 className="mt-1 text-2xl font-semibold">Select presets or enter the actual GSM.</h2>
            </div>
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-3">
            <div>
              <label className={labelClass}>
                Main fabric
                <select value={answers.mainFabricPreset} onChange={(e) => update("mainFabricPreset", e.target.value)} className={fieldClass}>
                  <option value="110">Voile / sheer — 110 GSM</option>
                  <option value="180">Light fabric — 180 GSM</option>
                  <option value="280">Medium fabric — 280 GSM</option>
                  <option value="350">Heavy fabric — 350 GSM</option>
                  <option value="450">Velvet / dense blackout — 450 GSM</option>
                  <option value="550">Very heavy velvet — 550 GSM</option>
                  <option value="custom">Enter custom GSM</option>
                </select>
              </label>
              {answers.mainFabricPreset === "custom" && (
                <label className={`${labelClass} mt-4`}>
                  Custom main-fabric GSM
                  <input type="number" min="0" step="1" value={answers.mainFabricCustom} onChange={(e) => update("mainFabricCustom", e.target.value)} className={fieldClass} placeholder="385" />
                </label>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Lining
                <select value={answers.liningPreset} onChange={(e) => update("liningPreset", e.target.value)} className={fieldClass}>
                  <option value="0">No lining</option>
                  <option value="150">Standard lining — 150 GSM</option>
                  <option value="220">Blackout lining — 220 GSM</option>
                  <option value="260">Heavy blackout lining — 260 GSM</option>
                  <option value="custom">Enter custom GSM</option>
                </select>
              </label>
              {answers.liningPreset === "custom" && (
                <label className={`${labelClass} mt-4`}>
                  Custom lining GSM
                  <input type="number" min="0" step="1" value={answers.liningCustom} onChange={(e) => update("liningCustom", e.target.value)} className={fieldClass} placeholder="210" />
                </label>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Interlining
                <select value={answers.interliningPreset} onChange={(e) => update("interliningPreset", e.target.value)} className={fieldClass}>
                  <option value="0">No interlining</option>
                  <option value="250">Light interlining — 250 GSM</option>
                  <option value="350">Heavy interlining — 350 GSM</option>
                  <option value="custom">Enter custom GSM</option>
                </select>
              </label>
              {answers.interliningPreset === "custom" && (
                <label className={`${labelClass} mt-4`}>
                  Custom interlining GSM
                  <input type="number" min="0" step="1" value={answers.interliningCustom} onChange={(e) => update("interliningCustom", e.target.value)} className={fieldClass} placeholder="320" />
                </label>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-4 rounded-[24px] border border-[#B8F23D]/20 bg-[#B8F23D]/[0.06] p-5 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">Combined GSM</p>
              <p className="mt-2 text-2xl font-semibold">{calculation.combinedGsm.toFixed(0)} GSM</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">Estimated fabric area</p>
              <p className="mt-2 text-2xl font-semibold">{calculation.fabricArea.toFixed(2)} m²</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">Raw material weight</p>
              <p className="mt-2 text-2xl font-semibold text-[#B8F23D]">{formatKg(calculation.rawWeight)}</p>
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#B8F23D] font-bold text-[#080A09]">3</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">Motor direction</p>
              <h2 className="mt-1 text-2xl font-semibold">Refine the recommendation.</h2>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <label className={labelClass}>
              Track shape
              <select value={answers.trackShape} onChange={(e) => update("trackShape", e.target.value)} className={fieldClass}>
                <option value="straight">Straight</option>
                <option value="single-bend">Single bend</option>
                <option value="bay-or-multiple-bends">Bay / multiple bends</option>
                <option value="joined-long-track">Joined long track</option>
              </select>
            </label>
            <label className={labelClass}>
              Preferred motor type
              <select value={answers.preference} onChange={(e) => update("preference", e.target.value)} className={fieldClass}>
                <option value="standard">Standard domestic</option>
                <option value="battery">Rechargeable battery</option>
                <option value="automation">Home automation</option>
                <option value="heavy-duty">Heavy duty</option>
                <option value="unsure">Unsure</option>
              </select>
            </label>
            <label className={labelClass}>
              Construction allowance
              <select value={answers.constructionAllowance} onChange={(e) => update("constructionAllowance", e.target.value)} className={fieldClass}>
                <option value="10">10%</option>
                <option value="15">15% — recommended</option>
                <option value="20">20%</option>
                <option value="25">25%</option>
              </select>
            </label>
            <label className={labelClass}>
              Motor planning margin
              <select value={answers.motorMargin} onChange={(e) => update("motorMargin", e.target.value)} className={fieldClass}>
                <option value="10">10%</option>
                <option value="15">15%</option>
                <option value="20">20% — recommended</option>
                <option value="25">25%</option>
                <option value="30">30%</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleCalculate} className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09] transition hover:bg-[#C8FF52]">
            Calculate weight and select motor →
          </button>
          <button type="button" onClick={() => { setAnswers(initialAnswers); setShowResults(false); }} className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold text-white/70 transition hover:border-white/30 hover:text-white">
            Reset tool
          </button>
        </div>
      </div>

      {showResults && (
        <div ref={resultsRef} className="mt-14 scroll-mt-28">
          <div className="rounded-[34px] border border-[#B8F23D]/25 bg-[#0E100F] p-5 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Preliminary result</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Curtain weight and motor direction</h2>

            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              <article className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">Estimated finished weight</p>
                <h3 className="mt-3 text-4xl font-semibold">{formatKg(calculation.finishedWeight)}</h3>
                <p className="mt-4 leading-7 text-[#AAACA4]">Includes the selected construction allowance.</p>
              </article>
              <article className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">Motor planning load</p>
                <h3 className="mt-3 text-4xl font-semibold text-[#B8F23D]">{formatKg(calculation.planningLoad)}</h3>
                <p className="mt-4 leading-7 text-[#AAACA4]">Includes the selected motor margin.</p>
              </article>
              <article className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">Weight per curtain</p>
                <h3 className="mt-3 text-4xl font-semibold">{formatKg(calculation.panelWeight)}</h3>
                <p className="mt-4 leading-7 text-[#AAACA4]">Based on the selected single or pair arrangement.</p>
              </article>
            </div>

            <div className="mt-6 rounded-[28px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.07] p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">Preliminary motor recommendation</p>
              <h3 className="mt-4 text-4xl font-semibold">{recommendation.primary?.name ?? "Specialist review required"}</h3>
              <p className="mt-4 max-w-4xl leading-8 text-[#C8C8C1]">{recommendation.reason}</p>
              {recommendation.primary && (
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-white/45">Supplied weight limit</p>
                    <p className="mt-1 text-2xl font-semibold">{recommendation.primary.limit} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/45">Intended direction</p>
                    <p className="mt-1 font-semibold">{recommendation.primary.purpose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/45">Remaining headroom</p>
                    <p className="mt-1 text-2xl font-semibold">{formatKg(recommendation.primary.limit - calculation.planningLoad)}</p>
                  </div>
                </div>
              )}
              {recommendation.primary && <p className="mt-6 text-sm leading-7 text-white/55">{recommendation.primary.note}</p>}
            </div>

            {recommendation.alternatives.length > 0 && (
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {recommendation.alternatives.map((motor) => (
                  <article key={motor.name} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                    <h4 className="text-xl font-semibold">{motor.name}</h4>
                    <p className="mt-2 text-sm text-[#B8F23D]">Supplied limit: {motor.limit} kg</p>
                    <p className="mt-3 text-sm leading-6 text-[#AAACA4]">{motor.purpose}</p>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-6 rounded-[26px] border border-white/10 bg-white/[0.025] p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">Checks before final selection</p>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {warnings.map((warning) => (
                  <li key={warning} className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.05] p-4 leading-7 text-[#D8D8D0]">{warning}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 print:hidden">
              <button type="button" onClick={handleCopy} className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-6 font-bold text-[#080A09]">Copy motor summary</button>
              <button type="button" onClick={() => window.print()} className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 font-semibold">Print or save as PDF</button>
              <a href={emailHref} className="inline-flex min-h-12 items-center rounded-full border border-[#B8F23D]/35 px-6 font-semibold text-[#B8F23D] transition hover:bg-[#B8F23D]/10">Open enquiry in email →</a>
            </div>

            <p className="mt-6 text-xs leading-6 text-white/40">
              Limits used: Shuttle Ion 25 kg, Shuttle Go 35 kg, Shuttle L 40 kg, Shuttle AC 40 kg and Shuttle M 70 kg, based on the information supplied to TrackFit by its Forest representative. Final product selection must be confirmed for the exact project.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
