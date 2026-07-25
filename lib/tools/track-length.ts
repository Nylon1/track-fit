import type { CurtainStyle, ExtensionPreset, WindowType } from "./types";

const defaults = {
  standard: { standard: 20, better: 30, maximum: 40 },
  patio: { standard: 30, better: 40, maximum: 50 },
  bifold: { standard: 40, better: 50, maximum: 60 },
} as const;

export function getDefaultExtension(
  windowType: WindowType,
  preset: Exclude<ExtensionPreset, "custom">,
) {
  if (windowType === "standard" || windowType === "patio" || windowType === "bifold") {
    return defaults[windowType][preset];
  }
  return preset === "standard" ? 20 : preset === "better" ? 30 : 40;
}

export function calculateTrackLength(
  openingWidth: number,
  leftExtension: number,
  rightExtension: number,
) {
  return Math.max(0, Math.round(openingWidth + leftExtension + rightExtension));
}

export function getRecommendation(
  windowType: WindowType,
  curtainStyle: CurtainStyle,
  openingWidth: number,
) {
  return {
    material:
      openingWidth >= 250 || windowType === "patio" || windowType === "bifold"
        ? "Aluminium track recommended"
        : "Aluminium track preferred",
    mounting:
      windowType === "patio" || windowType === "bifold"
        ? "Ceiling mounting often works best"
        : "Ceiling or wall mounting may work",
    heading:
      curtainStyle === "wave"
        ? "Use a compatible wave track and glider system"
        : curtainStyle === "eyelet"
          ? "Eyelet curtains normally use a pole rather than a track"
          : "Match the gliders and hooks to the curtain heading",
  };
}
