"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";

type LayoutType =
  | "straight"
  | "l-shape"
  | "u-shape"
  | "connected-cubicles"
  | "custom";

type Answers = {
  facility: string;
  application: string;
  layout: LayoutType;
  lengthA: string;
  lengthB: string;
  lengthC: string;
  quantity: string;
  ceilingType: string;
  supportConfirmed: string;
  suspension: string;
  operation: string;
  curtainWeight: string;
  antimicrobial: string;
  fireEvidence: string;
  infectionControl: string;
  drawingsAvailable: string;
  projectStage: string;
};

const initialAnswers: Answers = {
  facility: "",
  application: "",
  layout: "straight",
  lengthA: "",
  lengthB: "",
  lengthC: "",
  quantity: "1",
  ceilingType: "",
  supportConfirmed: "",
  suspension: "",
  operation: "",
  curtainWeight: "",
  antimicrobial: "",
  fireEvidence: "",
  infectionControl: "",
  drawingsAvailable: "",
  projectStage: "",
};

const fieldClass =
  "mt-2 min-h-12 w-full rounded-2xl border border-white/10 bg-[#111412] px-4 text-[#F4F1E8] outline-none transition focus:border-[#B8F23D]/70";

const labelClass =
  "block text-sm font-semibold text-[#E6E6DF]";

const sectionClass =
  "rounded-[30px] border border-white/10 bg-white/[0.035] p-5 sm:p-7";

function toNumber(value: string) {
  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : 0;
}

function formatMetres(value: number) {
  return `${value.toFixed(1)} m`;
}

function formatLabel(value: string) {
  if (!value) {
    return "Not provided";
  }

  return value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export default function HealthcareSpecificationChecker() {
  const [answers, setAnswers] =
    useState<Answers>(initialAnswers);

  const [showResults, setShowResults] =
    useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const update = (
    field: keyof Answers,
    value: string,
  ) => {
    setAnswers((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const calculation = useMemo(() => {
    const a = toNumber(answers.lengthA);
    const b = toNumber(answers.lengthB);
    const c = toNumber(answers.lengthC);

    const quantity = Math.max(
      1,
      Math.floor(toNumber(answers.quantity) || 1),
    );

    let perUnit = a;
    let measuredTotal = a * quantity;
    let calculationDescription =
      "One straight track length per room or area.";

    if (answers.layout === "l-shape") {
      perUnit = a + b;
      measuredTotal = perUnit * quantity;

      calculationDescription =
        "Section A plus Section B for each room or area.";
    }

    if (
      answers.layout === "u-shape" ||
      answers.layout === "custom"
    ) {
      perUnit = a + b + c;
      measuredTotal = perUnit * quantity;

      calculationDescription =
        "All three track sections are counted for each standalone room or bay.";
    }

    if (answers.layout === "connected-cubicles") {
      perUnit = a + b;

      measuredTotal =
        a * quantity + b * (quantity + 1);

      calculationDescription =
        "One back section per cubicle, with shared internal divider tracks and one outer divider at each end.";
    }

    const allowance = measuredTotal * 0.1;
    const planningTotal = measuredTotal + allowance;

    return {
      perUnit,
      quantity,
      measuredTotal,
      allowance,
      planningTotal,
      calculationDescription,
    };
  }, [
    answers.layout,
    answers.lengthA,
    answers.lengthB,
    answers.lengthC,
    answers.quantity,
  ]);

  const systemDirection = useMemo(() => {
    if (
      [
        "bed-space-privacy",
        "treatment-privacy",
        "room-division",
        "changing-cubicle",
      ].includes(answers.application)
    ) {
      return {
        name: "Forest MTS",
        reason:
          "The application is primarily medical privacy or space separation, so Forest’s dedicated Medical Track System is the strongest system family to investigate first.",
        href: "/brands/forest-group/mts",
      };
    }

    if (
      answers.operation === "cord-operated" ||
      answers.curtainWeight === "heavy"
    ) {
      return {
        name: "Forest CCS or CS",
        reason:
          "The answers indicate heavier curtains or controlled cord operation, so a contract-grade Forest system should be reviewed.",
        href: "/brands/forest-group/ccs",
      };
    }

    return {
      name: "Forest KS or CS",
      reason:
        "The requirement appears closer to a healthcare window-curtain application. Final selection depends on curtain weight, track route and usage.",
      href: "/brands/forest-group/ks",
    };
  }, [
    answers.application,
    answers.operation,
    answers.curtainWeight,
  ]);

  const warnings = useMemo(() => {
    const items: string[] = [];

    if (!answers.facility) {
      items.push(
        "Healthcare facility type has not been selected.",
      );
    }

    if (!answers.application) {
      items.push(
        "The intended track application is missing.",
      );
    }

    if (calculation.measuredTotal === 0) {
      items.push(
        "Track dimensions have not been entered.",
      );
    }

    if (!answers.ceilingType) {
      items.push("Ceiling construction is unknown.");
    }

    if (answers.supportConfirmed !== "yes") {
      items.push(
        "A suitable structural fixing route has not been confirmed.",
      );
    }

    if (!answers.suspension) {
      items.push(
        "Direct fixing or suspension requirements have not been confirmed.",
      );
    }

    if (!answers.curtainWeight) {
      items.push(
        "Curtain weight or fabric specification is missing.",
      );
    }

    if (answers.fireEvidence !== "yes") {
      items.push(
        "Fire-performance evidence for the curtain specification is still required.",
      );
    }

    if (answers.infectionControl !== "yes") {
      items.push(
        "Infection-control review or approval has not been confirmed.",
      );
    }

    if (answers.drawingsAvailable !== "yes") {
      items.push(
        "Plans, room layouts or reflected ceiling drawings are not yet available.",
      );
    }

    if (!answers.projectStage) {
      items.push(
        "The current project stage is unknown.",
      );
    }

    return items;
  }, [answers, calculation.measuredTotal]);

  const readinessScore = useMemo(() => {
    const fields = [
      answers.facility,
      answers.application,
      answers.lengthA,
      answers.ceilingType,
      answers.supportConfirmed,
      answers.suspension,
      answers.operation,
      answers.curtainWeight,
      answers.fireEvidence,
      answers.infectionControl,
      answers.drawingsAvailable,
      answers.projectStage,
    ];

    const completed = fields.filter(Boolean).length;

    return Math.round(
      (completed / fields.length) * 100,
    );
  }, [answers]);

  const handleReview = () => {
    setShowResults(true);

    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleReset = () => {
    setAnswers(initialAnswers);
    setShowResults(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const summaryText = [
    "TRACKFIT HEALTHCARE CURTAIN-TRACK PLANNING SUMMARY",
    "",
    `Facility: ${formatLabel(answers.facility)}`,
    `Application: ${formatLabel(
      answers.application,
    )}`,
    `Layout: ${formatLabel(answers.layout)}`,
    `Number of rooms or cubicles: ${
      calculation.quantity
    }`,
    "",
    "TRACK MEASUREMENTS",
    `Section A / width: ${
      answers.lengthA || "Not provided"
    } m`,
    `Section B / depth: ${
      answers.lengthB || "Not provided"
    } m`,
    `Section C: ${
      answers.lengthC || "Not provided"
    } m`,
    `Measured track estimate: ${formatMetres(
      calculation.measuredTotal,
    )}`,
    `Planning allowance: ${formatMetres(
      calculation.allowance,
    )}`,
    `Preliminary planning total: ${formatMetres(
      calculation.planningTotal,
    )}`,
    `Calculation method: ${calculation.calculationDescription}`,
    "",
    "SYSTEM DIRECTION",
    `Suggested system family: ${systemDirection.name}`,
    `Reason: ${systemDirection.reason}`,
    "",
    "SITE AND PROJECT INFORMATION",
    `Ceiling type: ${formatLabel(
      answers.ceilingType,
    )}`,
    `Structural support confirmed: ${formatLabel(
      answers.supportConfirmed,
    )}`,
    `Fixing arrangement: ${formatLabel(
      answers.suspension,
    )}`,
    `Operation: ${formatLabel(
      answers.operation,
    )}`,
    `Curtain weight: ${formatLabel(
      answers.curtainWeight,
    )}`,
    `Antimicrobial requirement: ${formatLabel(
      answers.antimicrobial,
    )}`,
    `Fire evidence supplied: ${formatLabel(
      answers.fireEvidence,
    )}`,
    `Infection-control review: ${formatLabel(
      answers.infectionControl,
    )}`,
    `Drawings available: ${formatLabel(
      answers.drawingsAvailable,
    )}`,
    `Project stage: ${formatLabel(
      answers.projectStage,
    )}`,
    "",
    "MISSING INFORMATION / WARNINGS",
    ...(warnings.length > 0
      ? warnings.map((warning) => `- ${warning}`)
      : [
          "- No obvious missing fields identified by the checker.",
        ]),
    "",
    "IMPORTANT",
    "This result is an early-stage planning aid. It is not a final specification, structural design, fire assessment, infection-control approval, healthcare-estates approval or quotation.",
  ].join("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);

      window.alert("Planning summary copied.");
    } catch {
      window.alert(
        "The summary could not be copied automatically. Please use the print option instead.",
      );
    }
  };

  const emailHref = `mailto:enquiries@curtaintrackfitters.com?subject=${encodeURIComponent(
    "Healthcare curtain-track specification enquiry",
  )}&body=${encodeURIComponent(summaryText)}`;

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="grid gap-6">
        <div className={sectionClass}>
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#B8F23D] font-bold text-[#080A09]">
              1
            </span>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Environment and use
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                What is the track being used for?
              </h2>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <label className={labelClass}>
              Healthcare environment

              <select
                value={answers.facility}
                onChange={(event) =>
                  update(
                    "facility",
                    event.target.value,
                  )
                }
                className={fieldClass}
              >
                <option value="">
                  Select one
                </option>

                <option value="NHS hospital">
                  NHS hospital
                </option>

                <option value="Private hospital">
                  Private hospital
                </option>

                <option value="Clinic or treatment centre">
                  Clinic or treatment centre
                </option>

                <option value="Care home">
                  Care home
                </option>

                <option value="Rehabilitation centre">
                  Rehabilitation centre
                </option>

                <option value="Dental or medical practice">
                  Dental or medical practice
                </option>

                <option value="Sanitary or changing area">
                  Sanitary or changing area
                </option>

                <option value="Other healthcare facility">
                  Other healthcare facility
                </option>
              </select>
            </label>

            <label className={labelClass}>
              Primary application

              <select
                value={answers.application}
                onChange={(event) =>
                  update(
                    "application",
                    event.target.value,
                  )
                }
                className={fieldClass}
              >
                <option value="">
                  Select one
                </option>

                <option value="bed-space-privacy">
                  Bed-space privacy
                </option>

                <option value="treatment-privacy">
                  Treatment-room privacy
                </option>

                <option value="room-division">
                  Flexible room division
                </option>

                <option value="changing-cubicle">
                  Changing or sanitary cubicle
                </option>

                <option value="window-curtains">
                  Healthcare window curtains
                </option>

                <option value="blackout-curtains">
                  Heavy or blackout window curtains
                </option>
              </select>
            </label>
          </div>
        </div>

        <div className={sectionClass}>
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#B8F23D] font-bold text-[#080A09]">
              2
            </span>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Layout and quantities
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                Estimate the required track length.
              </h2>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <label className={labelClass}>
              Layout

              <select
                value={answers.layout}
                onChange={(event) =>
                  update(
                    "layout",
                    event.target
                      .value as LayoutType,
                  )
                }
                className={fieldClass}
              >
                <option value="straight">
                  Straight
                </option>

                <option value="l-shape">
                  L-shaped
                </option>

                <option value="u-shape">
                  Standalone U-shaped bay
                </option>

                <option value="connected-cubicles">
                  Connected cubicle row
                </option>

                <option value="custom">
                  Custom three-section route
                </option>
              </select>
            </label>

            <label className={labelClass}>
              {answers.layout ===
              "connected-cubicles"
                ? "Cubicle back width (metres)"
                : "Section A length (metres)"}

              <input
                type="number"
                min="0"
                step="0.1"
                value={answers.lengthA}
                onChange={(event) =>
                  update(
                    "lengthA",
                    event.target.value,
                  )
                }
                className={fieldClass}
                placeholder="2.4"
              />
            </label>

            {answers.layout !== "straight" && (
              <label className={labelClass}>
                {answers.layout ===
                "connected-cubicles"
                  ? "Cubicle depth (metres)"
                  : "Section B length (metres)"}

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={answers.lengthB}
                  onChange={(event) =>
                    update(
                      "lengthB",
                      event.target.value,
                    )
                  }
                  className={fieldClass}
                  placeholder="1.8"
                />
              </label>
            )}

            {(answers.layout === "u-shape" ||
              answers.layout === "custom") && (
              <label className={labelClass}>
                Section C length (metres)

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={answers.lengthC}
                  onChange={(event) =>
                    update(
                      "lengthC",
                      event.target.value,
                    )
                  }
                  className={fieldClass}
                  placeholder="1.8"
                />
              </label>
            )}

            <label className={labelClass}>
              {answers.layout ===
              "connected-cubicles"
                ? "Number of connected cubicles"
                : "Identical rooms or bays"}

              <input
                type="number"
                min="1"
                step="1"
                value={answers.quantity}
                onChange={(event) =>
                  update(
                    "quantity",
                    event.target.value,
                  )
                }
                className={fieldClass}
              />
            </label>
          </div>

          <div className="mt-6 grid gap-4 rounded-[24px] border border-[#B8F23D]/20 bg-[#B8F23D]/[0.06] p-5 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                {answers.layout ===
                "connected-cubicles"
                  ? "Width + one depth"
                  : "Per room or bay"}
              </p>

              <p className="mt-2 text-2xl font-semibold">
                {formatMetres(
                  calculation.perUnit,
                )}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                Measured total
              </p>

              <p className="mt-2 text-2xl font-semibold">
                {formatMetres(
                  calculation.measuredTotal,
                )}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                With 10% planning allowance
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#B8F23D]">
                {formatMetres(
                  calculation.planningTotal,
                )}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-white/50">
            {calculation.calculationDescription}
          </p>

          {answers.layout ===
            "connected-cubicles" && (
            <div className="mt-5 rounded-[22px] border border-[#B8F23D]/20 bg-[#B8F23D]/[0.055] p-5">
              <p className="font-semibold text-[#B8F23D]">
                Shared divider calculation
              </p>

              <p className="mt-2 text-sm leading-7 text-white/60">
                Connected cubicles share their
                middle divider tracks. The
                calculation uses one back section
                per cubicle and one more depth
                section than the number of
                cubicles.
              </p>

              <p className="mt-3 text-sm font-semibold text-white/75">
                Total = width × cubicles + depth ×
                (cubicles + 1)
              </p>
            </div>
          )}
        </div>

        <div className={sectionClass}>
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#B8F23D] font-bold text-[#080A09]">
              3
            </span>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Structure and operation
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                Check the fixing route and
                curtain load.
              </h2>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <label className={labelClass}>
              Ceiling construction

              <select
                value={answers.ceilingType}
                onChange={(event) =>
                  update(
                    "ceilingType",
                    event.target.value,
                  )
                }
                className={fieldClass}
              >
                <option value="">
                  Select one
                </option>

                <option value="Concrete soffit">
                  Concrete soffit
                </option>

                <option value="Structural timber">
                  Structural timber
                </option>

                <option value="Metal framework">
                  Metal framework
                </option>

                <option value="Plasterboard ceiling">
                  Plasterboard ceiling
                </option>

                <option value="Suspended grid ceiling">
                  Suspended grid ceiling
                </option>

                <option value="Unknown">
                  Unknown
                </option>
              </select>
            </label>

            <label className={labelClass}>
              Structural support confirmed?

              <select
                value={answers.supportConfirmed}
                onChange={(event) =>
                  update(
                    "supportConfirmed",
                    event.target.value,
                  )
                }
                className={fieldClass}
              >
                <option value="">
                  Select one
                </option>

                <option value="yes">Yes</option>
                <option value="no">No</option>

                <option value="unknown">
                  Unknown
                </option>
              </select>
            </label>

            <label className={labelClass}>
              Fixing arrangement

              <select
                value={answers.suspension}
                onChange={(event) =>
                  update(
                    "suspension",
                    event.target.value,
                  )
                }
                className={fieldClass}
              >
                <option value="">
                  Select one
                </option>

                <option value="Direct ceiling fix">
                  Direct ceiling fix
                </option>

                <option value="Suspended track">
                  Suspended track
                </option>

                <option value="Mixed arrangement">
                  Mixed arrangement
                </option>

                <option value="Unknown">
                  Unknown
                </option>
              </select>
            </label>

            <label className={labelClass}>
              Operation

              <select
                value={answers.operation}
                onChange={(event) =>
                  update(
                    "operation",
                    event.target.value,
                  )
                }
                className={fieldClass}
              >
                <option value="">
                  Select one
                </option>

                <option value="hand-drawn">
                  Hand drawn
                </option>

                <option value="cord-operated">
                  Cord operated
                </option>

                <option value="unknown">
                  Unknown
                </option>
              </select>
            </label>

            <label className={labelClass}>
              Curtain load

              <select
                value={answers.curtainWeight}
                onChange={(event) =>
                  update(
                    "curtainWeight",
                    event.target.value,
                  )
                }
                className={fieldClass}
              >
                <option value="">
                  Select one
                </option>

                <option value="light">
                  Light privacy curtain
                </option>

                <option value="medium">
                  Medium contract curtain
                </option>

                <option value="heavy">
                  Heavy or blackout curtain
                </option>

                <option value="unknown">
                  Unknown
                </option>
              </select>
            </label>

            <label className={labelClass}>
              Antimicrobial finish requested?

              <select
                value={answers.antimicrobial}
                onChange={(event) =>
                  update(
                    "antimicrobial",
                    event.target.value,
                  )
                }
                className={fieldClass}
              >
                <option value="">
                  Select one
                </option>

                <option value="yes">Yes</option>
                <option value="no">No</option>

                <option value="unknown">
                  Unknown
                </option>
              </select>
            </label>
          </div>
        </div>

        <div className={sectionClass}>
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#B8F23D] font-bold text-[#080A09]">
              4
            </span>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Project checks
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                What has already been confirmed?
              </h2>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <label className={labelClass}>
              Curtain fire evidence available?

              <select
                value={answers.fireEvidence}
                onChange={(event) =>
                  update(
                    "fireEvidence",
                    event.target.value,
                  )
                }
                className={fieldClass}
              >
                <option value="">
                  Select one
                </option>

                <option value="yes">Yes</option>
                <option value="no">No</option>

                <option value="unknown">
                  Unknown
                </option>
              </select>
            </label>

            <label className={labelClass}>
              Infection-control review?

              <select
                value={answers.infectionControl}
                onChange={(event) =>
                  update(
                    "infectionControl",
                    event.target.value,
                  )
                }
                className={fieldClass}
              >
                <option value="">
                  Select one
                </option>

                <option value="yes">
                  Completed
                </option>

                <option value="no">
                  Not completed
                </option>

                <option value="unknown">
                  Unknown
                </option>
              </select>
            </label>

            <label className={labelClass}>
              Drawings available?

              <select
                value={answers.drawingsAvailable}
                onChange={(event) =>
                  update(
                    "drawingsAvailable",
                    event.target.value,
                  )
                }
                className={fieldClass}
              >
                <option value="">
                  Select one
                </option>

                <option value="yes">Yes</option>
                <option value="no">No</option>

                <option value="partial">
                  Partial
                </option>
              </select>
            </label>

            <label className={labelClass}>
              Project stage

              <select
                value={answers.projectStage}
                onChange={(event) =>
                  update(
                    "projectStage",
                    event.target.value,
                  )
                }
                className={fieldClass}
              >
                <option value="">
                  Select one
                </option>

                <option value="Early planning">
                  Early planning
                </option>

                <option value="Design development">
                  Design development
                </option>

                <option value="Tender">
                  Tender
                </option>

                <option value="Ready for quotation">
                  Ready for quotation
                </option>

                <option value="Replacement or repair">
                  Replacement or repair
                </option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleReview}
            className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09] transition hover:bg-[#C8FF52]"
          >
            Review this requirement →
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
          >
            Reset checker
          </button>
        </div>
      </div>

      {showResults && (
        <div
          ref={resultsRef}
          className="mt-14 scroll-mt-28"
        >
          <div className="rounded-[34px] border border-[#B8F23D]/25 bg-[#0E100F] p-5 sm:p-8">
            <div className="flex flex-col gap-6 border-b border-white/10 pb-7 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                  Preliminary planning result
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                  Healthcare track requirement
                  summary
                </h2>
              </div>

              <div className="min-w-52 rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                  Brief readiness
                </p>

                <p className="mt-2 text-4xl font-semibold text-[#B8F23D]">
                  {readinessScore}%
                </p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#B8F23D]"
                    style={{
                      width: `${readinessScore}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              <article className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                  Preliminary system direction
                </p>

                <h3 className="mt-3 text-3xl font-semibold">
                  {systemDirection.name}
                </h3>

                <p className="mt-4 leading-7 text-[#AAACA4]">
                  {systemDirection.reason}
                </p>

                <Link
                  href={systemDirection.href}
                  className="mt-6 inline-flex font-semibold text-[#B8F23D]"
                >
                  View system guide →
                </Link>
              </article>

              <article className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                  Track quantity
                </p>

                <h3 className="mt-3 text-3xl font-semibold">
                  {formatMetres(
                    calculation.planningTotal,
                  )}
                </h3>

                <p className="mt-4 leading-7 text-[#AAACA4]">
                  Includes a 10% early planning
                  allowance. Final quantities depend
                  on exact bends, joints, profiles and
                  manufacturer production
                  requirements.
                </p>
              </article>

              <article className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                  Next step
                </p>

                <h3 className="mt-3 text-3xl font-semibold">
                  Technical review
                </h3>

                <p className="mt-4 leading-7 text-[#AAACA4]">
                  Send plans, ceiling information,
                  curtain data and the completed
                  summary for a project-specific
                  assessment.
                </p>

                <Link
                  href="/quote/postcode"
                  className="mt-6 inline-flex font-semibold text-[#B8F23D]"
                >
                  Start TrackFit enquiry →
                </Link>
              </article>
            </div>

            {answers.layout ===
              "connected-cubicles" && (
              <div className="mt-6 rounded-[26px] border border-[#B8F23D]/20 bg-[#B8F23D]/[0.055] p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-[#B8F23D]">
                  Connected cubicle calculation
                </p>

                <h3 className="mt-3 text-2xl font-semibold">
                  Shared middle dividers have not
                  been counted twice.
                </h3>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-white/45">
                      Back sections
                    </p>

                    <p className="mt-1 text-xl font-semibold">
                      {answers.lengthA || "0"} m ×{" "}
                      {calculation.quantity}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-white/45">
                      Divider sections
                    </p>

                    <p className="mt-1 text-xl font-semibold">
                      {answers.lengthB || "0"} m ×{" "}
                      {calculation.quantity + 1}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-white/45">
                      Measured total
                    </p>

                    <p className="mt-1 text-xl font-semibold text-[#B8F23D]">
                      {formatMetres(
                        calculation.measuredTotal,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 rounded-[26px] border border-white/10 bg-white/[0.025] p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                    Missing information and warnings
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold">
                    {warnings.length === 0
                      ? "No obvious gaps identified"
                      : `${warnings.length} item${
                          warnings.length === 1
                            ? ""
                            : "s"
                        } still need attention`}
                  </h3>
                </div>
              </div>

              {warnings.length > 0 ? (
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {warnings.map((warning) => (
                    <li
                      key={warning}
                      className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.05] p-4 leading-7 text-[#D8D8D0]"
                    >
                      {warning}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 leading-7 text-[#AAACA4]">
                  The checker has not identified an
                  obvious missing field. A full
                  technical and compliance review is
                  still required.
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 print:hidden">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-6 font-bold text-[#080A09]"
              >
                Copy project summary
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-6 font-semibold"
              >
                Print or save as PDF
              </button>

              <a
                href={emailHref}
                className="inline-flex min-h-12 items-center rounded-full border border-[#B8F23D]/35 px-6 font-semibold text-[#B8F23D] transition hover:bg-[#B8F23D]/10"
              >
                Open in email →
              </a>
            </div>

            <p className="mt-6 text-xs leading-6 text-white/40">
              This result is an early-stage planning
              aid. It is not a final specification,
              structural design, fire assessment,
              infection-control approval,
              healthcare-estates approval or
              quotation.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}