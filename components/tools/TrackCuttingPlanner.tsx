"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ToolResultActions } from "@/components/tools/ToolResultActions";

type StockPreset = "300" | "500" | "custom";

type RequiredPiece = {
  id: number;
  label: string;
  length: number;
  quantity: number;
};

type CutPiece = {
  id: string;
  label: string;
  length: number;
};

type StockBar = {
  id: number;
  cuts: CutPiece[];
  used: number;
  waste: number;
};

function roundToOne(value: number) {
  return Math.round(value * 10) / 10;
}

function createCutPlan(
  pieces: RequiredPiece[],
  stockLength: number,
  cutAllowance: number,
) {
  const expanded: CutPiece[] = pieces
    .flatMap((piece) =>
      Array.from({ length: Math.max(0, piece.quantity) }, (_, index) => ({
        id: `${piece.id}-${index}`,
        label:
          piece.quantity > 1
            ? `${piece.label} ${index + 1}`
            : piece.label,
        length: piece.length,
      })),
    )
    .filter((piece) => piece.length > 0)
    .sort((a, b) => b.length - a.length);

  const oversize = expanded.filter(
    (piece) => piece.length > stockLength,
  );

  const validPieces = expanded.filter(
    (piece) => piece.length <= stockLength,
  );

  const bars: StockBar[] = [];

  validPieces.forEach((piece) => {
    let bestBarIndex = -1;
    let smallestRemaining = Number.POSITIVE_INFINITY;

    bars.forEach((bar, index) => {
      const allowance =
        bar.cuts.length > 0 ? cutAllowance : 0;
      const projectedUsed =
        bar.used + allowance + piece.length;
      const remaining = stockLength - projectedUsed;

      if (
        remaining >= 0 &&
        remaining < smallestRemaining
      ) {
        bestBarIndex = index;
        smallestRemaining = remaining;
      }
    });

    if (bestBarIndex === -1) {
      bars.push({
        id: bars.length + 1,
        cuts: [piece],
        used: piece.length,
        waste: roundToOne(stockLength - piece.length),
      });
      return;
    }

    const bar = bars[bestBarIndex];
    bar.cuts.push(piece);
    bar.used = roundToOne(
      bar.used + cutAllowance + piece.length,
    );
    bar.waste = roundToOne(stockLength - bar.used);
  });

  const totalRequired = validPieces.reduce(
    (total, piece) => total + piece.length,
    0,
  );

  const totalStock = bars.length * stockLength;

  const totalCutAllowance = bars.reduce(
    (total, bar) =>
      total +
      Math.max(0, bar.cuts.length - 1) *
        cutAllowance,
    0,
  );

  const totalWaste = roundToOne(
    totalStock -
      totalRequired -
      totalCutAllowance,
  );

  return {
    bars,
    oversize,
    totalRequired: roundToOne(totalRequired),
    totalStock: roundToOne(totalStock),
    totalCutAllowance: roundToOne(totalCutAllowance),
    totalWaste,
    efficiency:
      totalStock > 0
        ? roundToOne(
            ((totalRequired + totalCutAllowance) /
              totalStock) *
              100,
          )
        : 0,
  };
}

export function TrackCuttingPlanner() {
  const [stockPreset, setStockPreset] =
    useState<StockPreset>("300");
  const [customStockLength, setCustomStockLength] =
    useState(400);
  const [cutAllowance, setCutAllowance] = useState(0.3);

  const [pieces, setPieces] = useState<RequiredPiece[]>([
    {
      id: 1,
      label: "Track 1",
      length: 240,
      quantity: 1,
    },
    {
      id: 2,
      label: "Track 2",
      length: 180,
      quantity: 1,
    },
    {
      id: 3,
      label: "Track 3",
      length: 120,
      quantity: 1,
    },
  ]);

  const stockLength =
    stockPreset === "custom"
      ? Math.max(1, customStockLength)
      : Number(stockPreset);

  const result = useMemo(
    () =>
      createCutPlan(
        pieces,
        stockLength,
        Math.max(0, cutAllowance),
      ),
    [cutAllowance, pieces, stockLength],
  );

  const updatePiece = (
    id: number,
    field: "label" | "length" | "quantity",
    value: string | number,
  ) => {
    setPieces((current) =>
      current.map((piece) =>
        piece.id === id
          ? {
              ...piece,
              [field]:
                field === "label"
                  ? String(value)
                  : Math.max(
                      0,
                      Number(value) || 0,
                    ),
            }
          : piece,
      ),
    );
  };

  const addPiece = () => {
    const nextId =
      Math.max(0, ...pieces.map((piece) => piece.id)) +
      1;

    setPieces((current) => [
      ...current,
      {
        id: nextId,
        label: `Track ${nextId}`,
        length: 100,
        quantity: 1,
      },
    ]);
  };

  const removePiece = (id: number) => {
    setPieces((current) =>
      current.filter((piece) => piece.id !== id),
    );
  };

  const optionClass = (selected: boolean) =>
    [
      "rounded-[22px] border p-5 text-left transition",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F23D]",
      selected
        ? "border-[#B8F23D] bg-[#B8F23D]/10"
        : "border-white/10 bg-[#080A09] hover:border-white/25 hover:bg-white/[0.025]",
    ].join(" ");

  return (
    <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_450px]">
      <div className="space-y-8">
        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 1
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Choose the stock length
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {(
              [
                ["300", "3 metre"],
                ["500", "5 metre"],
                ["custom", "Custom"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={stockPreset === value}
                onClick={() => setStockPreset(value)}
                className={optionClass(
                  stockPreset === value,
                )}
              >
                <span className="block font-semibold">
                  {label}
                </span>
              </button>
            ))}
          </div>

          {stockPreset === "custom" && (
            <label className="mt-6 block max-w-xs text-sm font-semibold">
              Custom stock length

              <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
                <input
                  type="number"
                  min="1"
                  max="2000"
                  value={customStockLength}
                  onChange={(event) =>
                    setCustomStockLength(
                      Math.max(
                        1,
                        Number(event.target.value) || 1,
                      ),
                    )
                  }
                  className="min-h-12 min-w-0 flex-1 bg-transparent outline-none"
                />

                <span className="text-[#B8F23D]">
                  cm
                </span>
              </div>
            </label>
          )}
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 2
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">
                Enter the required lengths
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
                Add every finished track piece you need.
              </p>
            </div>

            <button
              type="button"
              onClick={addPiece}
              className="shrink-0 rounded-full bg-[#B8F23D] px-5 py-3 text-sm font-semibold text-[#080A09]"
            >
              Add track
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {pieces.map((piece) => (
              <div
                key={piece.id}
                className="grid gap-4 rounded-[22px] border border-white/10 bg-[#080A09] p-5 sm:grid-cols-[1fr_150px_110px_auto]"
              >
                <label className="text-sm font-semibold">
                  Name

                  <input
                    type="text"
                    value={piece.label}
                    onChange={(event) =>
                      updatePiece(
                        piece.id,
                        "label",
                        event.target.value,
                      )
                    }
                    className="mt-2 min-h-12 w-full rounded-full border border-white/15 bg-transparent px-4 outline-none focus:border-[#B8F23D]"
                  />
                </label>

                <label className="text-sm font-semibold">
                  Length

                  <div className="mt-2 flex items-center rounded-full border border-white/15 px-4 focus-within:border-[#B8F23D]">
                    <input
                      type="number"
                      min="1"
                      max="3000"
                      value={piece.length}
                      onChange={(event) =>
                        updatePiece(
                          piece.id,
                          "length",
                          Number(
                            event.target.value,
                          ) || 0,
                        )
                      }
                      className="min-h-12 min-w-0 flex-1 bg-transparent outline-none"
                    />

                    <span className="text-[#B8F23D]">
                      cm
                    </span>
                  </div>
                </label>

                <label className="text-sm font-semibold">
                  Quantity

                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={piece.quantity}
                    onChange={(event) =>
                      updatePiece(
                        piece.id,
                        "quantity",
                        Number(
                          event.target.value,
                        ) || 0,
                      )
                    }
                    className="mt-2 min-h-12 w-full rounded-full border border-white/15 bg-transparent px-4 outline-none focus:border-[#B8F23D]"
                  />
                </label>

                <button
                  type="button"
                  onClick={() =>
                    removePiece(piece.id)
                  }
                  className="self-end pb-3 text-sm text-[#AAACA4] hover:text-white"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Step 3
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Add the cutting allowance
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#AAACA4]">
            Allow for the saw blade or cutting method between
            consecutive pieces cut from the same stock length.
          </p>

          <label className="mt-6 block max-w-xs text-sm font-semibold">
            Allowance per cut

            <div className="mt-2 flex items-center rounded-full border border-white/15 bg-[#080A09] px-5 focus-within:border-[#B8F23D]">
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={cutAllowance}
                onChange={(event) =>
                  setCutAllowance(
                    Math.max(
                      0,
                      Number(event.target.value) || 0,
                    ),
                  )
                }
                className="min-h-12 min-w-0 flex-1 bg-transparent outline-none"
              />

              <span className="text-[#B8F23D]">
                cm
              </span>
            </div>
          </label>
        </section>
      </div>

      <aside className="mx-auto w-full max-w-3xl xl:max-w-none">
        <div className="space-y-6 xl:sticky xl:top-24">
          <section className="tool-result-card overflow-hidden rounded-[32px] border border-[#B8F23D]/35 bg-[#B8F23D] text-[#080A09]">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.24em]">
                Recommended stock quantity
              </p>

              <div className="mt-5 flex items-end gap-2">
                <p className="text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
                  {result.bars.length}
                </p>

                <span className="pb-2 text-2xl font-bold">
                  lengths
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#1C211A]">
                Using {stockLength} cm stock at approximately{" "}
                {result.efficiency}% material efficiency.
              </p>
            </div>

            <div className="border-t border-[#080A09]/15 p-5 sm:p-6">
              <div className="rounded-[24px] border border-[#080A09]/15 bg-[#F4F1E8]/65 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#080A09]/65">
                  Cutting plan
                </p>

                <div className="mt-6 space-y-5">
                  {result.bars.map((bar) => (
                    <div key={bar.id}>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>Stock length {bar.id}</span>
                        <span>
                          {bar.used} cm used · {bar.waste} cm waste
                        </span>
                      </div>

                      <div className="mt-2 flex h-14 overflow-hidden rounded-[14px] border border-[#080A09]/20 bg-white/70">
                        {bar.cuts.map((cut, index) => {
                          const width =
                            (cut.length /
                              stockLength) *
                            100;

                          return (
                            <div
                              key={cut.id}
                              className="grid min-w-[42px] place-items-center border-r border-[#080A09]/20 px-1 text-center"
                              style={{
                                width: `${Math.max(
                                  4,
                                  width,
                                )}%`,
                              }}
                            >
                              <div>
                                <p className="truncate text-[9px] font-bold uppercase tracking-[0.08em]">
                                  {cut.label}
                                </p>
                                <p className="text-xs font-semibold">
                                  {cut.length} cm
                                </p>
                              </div>
                            </div>
                          );
                        })}

                        {bar.waste > 0 && (
                          <div className="grid min-w-[24px] flex-1 place-items-center bg-[#080A09]/8 px-1 text-center">
                            <span className="text-[9px] font-bold text-[#080A09]/55">
                              Waste
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                      Required
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {result.totalRequired} cm
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                      Stock
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {result.totalStock} cm
                    </p>
                  </div>

                  <div className="rounded-[18px] bg-[#080A09]/8 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#080A09]/60">
                      Waste
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {result.totalWaste} cm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {result.oversize.length > 0 && (
            <section className="rounded-[28px] border border-red-300/25 bg-red-200/8 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-200">
                Pieces too long
              </p>

              <div className="mt-4 space-y-2 text-sm text-red-50">
                {result.oversize.map((piece) => (
                  <p key={piece.id}>
                    {piece.label}: {piece.length} cm exceeds the{" "}
                    {stockLength} cm stock length.
                  </p>
                ))}
              </div>
            </section>
          )}

          <ToolResultActions
            toolName="Curtain Track Cutting Planner"
            resultTitle="Recommended stock quantity"
            resultValue={`${result.bars.length} stock lengths`}
            rows={[
              {
                label: "Stock length",
                value: `${stockLength} cm`,
              },
              {
                label: "Required track",
                value: `${result.totalRequired} cm`,
              },
              {
                label: "Total stock",
                value: `${result.totalStock} cm`,
              },
              {
                label: "Estimated waste",
                value: `${result.totalWaste} cm`,
              },
              {
                label: "Efficiency",
                value: `${result.efficiency}%`,
              },
              ...result.bars.map((bar) => ({
                label: `Stock ${bar.id}`,
                value: bar.cuts
                  .map(
                    (cut) =>
                      `${cut.label} ${cut.length} cm`,
                  )
                  .join(" + "),
              })),
            ]}
            notes={[
              `Cutting allowance: ${cutAllowance} cm between pieces`,
              "Check whether joins are acceptable before cutting any required length into multiple pieces.",
            ]}
            sharePath="/tools/curtain-track-cutting-planner"
          />

          <section className="rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Important
            </p>

            <p className="mt-3 text-sm leading-6 text-amber-50">
              This produces an efficient planning layout rather than
              a guaranteed mathematical optimum. Recheck every cut,
              connector allowance and finished measurement before
              cutting.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#B8F23D]/25 bg-white/[0.035] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Professional installation
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Need tracks cut and fitted correctly?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#AAACA4]">
              Send the room measurements and track details. TrackFit
              can review the joins, cuts and installation requirements.
            </p>

            <Link
              href="/quote/postcode"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#B8F23D] px-5 font-semibold text-[#080A09]"
            >
              Get my installation quote
            </Link>
          </section>
        </div>
      </aside>
    </div>
  );
}
