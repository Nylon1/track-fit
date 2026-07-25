export function TrackDiagram({
  openingWidth,
  leftExtension,
  rightExtension,
  trackLength,
}: {
  openingWidth: number;
  leftExtension: number;
  rightExtension: number;
  trackLength: number;
}) {
  const total = Math.max(trackLength, 1);

  const rawLeftPercent = (leftExtension / total) * 100;
  const rawOpeningPercent = (openingWidth / total) * 100;
  const rawRightPercent = (rightExtension / total) * 100;

  const leftPercent = Math.max(10, rawLeftPercent);
  const rightPercent = Math.max(10, rawRightPercent);

  const remainingPercent = Math.max(
    50,
    100 - leftPercent - rightPercent,
  );

  const openingPercent = Math.min(
    remainingPercent,
    Math.max(50, rawOpeningPercent),
  );

  return (
    <div className="rounded-[24px] border border-[#080A09]/20 bg-[#F4F1E8]/55 p-5 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#080A09]/65">
        Measurement visual
      </p>

      <div className="mt-7">
        <div className="flex items-end">
          <div
            className="text-center text-xs font-semibold"
            style={{ width: `${leftPercent}%` }}
          >
            {leftExtension} cm
          </div>

          <div
            className="text-center text-xs font-semibold"
            style={{ width: `${openingPercent}%` }}
          >
            {openingWidth} cm opening
          </div>

          <div
            className="text-center text-xs font-semibold"
            style={{ width: `${rightPercent}%` }}
          >
            {rightExtension} cm
          </div>
        </div>

        <div className="mt-3 flex items-end">
          <div
            className="h-12 border-b border-dashed border-[#080A09]/45"
            style={{ width: `${leftPercent}%` }}
          />

          <div
            className="relative h-28 border-2 border-[#080A09]/45 bg-white/60"
            style={{ width: `${openingPercent}%` }}
          >
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#080A09]/55">
                Window
              </span>
            </div>

            <div className="absolute inset-x-4 bottom-4 h-12 border border-[#080A09]/20 bg-white/35" />
          </div>

          <div
            className="h-12 border-b border-dashed border-[#080A09]/45"
            style={{ width: `${rightPercent}%` }}
          />
        </div>

        <div className="relative mt-6">
          <div className="h-3 rounded-full bg-[#080A09]" />

          <div className="absolute -left-1 -top-1.5 h-6 w-1 rounded-full bg-[#080A09]" />

          <div className="absolute -right-1 -top-1.5 h-6 w-1 rounded-full bg-[#080A09]" />
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 text-sm font-bold">
          <span>Recommended curtain track</span>
          <span className="shrink-0">{trackLength} cm</span>
        </div>

        <p className="mt-4 text-xs leading-5 text-[#080A09]/65">
          The track extends {leftExtension} cm beyond the opening on
          the left and {rightExtension} cm beyond the opening on the
          right.
        </p>
      </div>
    </div>
  );
}