export const colours = {
  black: "#070807",
  blackSoft: "#0D100E",
  graphite: "#151916",

  ivory: "#F6F3EB",
  white: "#FFFFFF",

  lime: "#B8F23D",
  limeDisplay: "#A9DF35",
  limeBright: "#C9FF56",
  limeDark: "#8FC925",

  success: "#65DF8C",
  warning: "#F3C969",
  error: "#FF7770",
  info: "#8DBBFF",
} as const;

export type TrackFitColour = keyof typeof colours;