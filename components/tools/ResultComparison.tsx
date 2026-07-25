import { getDefaultExtension } from "@/lib/tools/track-length";
import type { WindowType } from "@/lib/tools/types";

export function ResultComparison({
  openingWidth,
  windowType,
}: {
  openingWidth: number;
  windowType: WindowType;
}) {
  const rows = (["standard", "better", "maximum"] as const).map((preset) => {
    const extension = getDefaultExtension(windowType, preset);
    return {
      preset,
      extension,
      result: openingWidth + extension * 2,
    };
  });

  const labels = {
    standard: "Standard",
    better: "More stack-back",
    maximum: "Maximum coverage",
  };

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
        Compare options
      </p>
      <h2 className="mt-3 text-2xl font-semibold">
        See how the extension changes the result
      </h2>

     <div className="mt-6 grid gap-3 sm:grid-cols-3">
  {rows.map((row) => (
    <div
      key={row.preset}
      className="rounded-[20px] border border-white/10 bg-[#080A09] p-5"
    >
      <p className="text-sm font-semibold text-[#F4F1E8]">
        {labels[row.preset]}
      </p>

      <p className="mt-3 text-sm text-[#AAACA4]">
        {row.extension} cm each side
      </p>

      <p className="mt-4 text-2xl font-bold text-[#B8F23D]">
        {row.result} cm
      </p>
    </div>
  ))}
</div>
    </section>
  );
}
