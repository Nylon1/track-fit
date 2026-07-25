import type { ToolDefinition } from "./types";

export const tools: ToolDefinition[] = [
  {
    slug: "curtain-track-length-calculator",
    title: "Curtain Track Length Calculator",
    description: "Calculate a practical curtain track length from your opening width and preferred side extension.",
    category: "measure",
    duration: "30 seconds",
    status: "live",
  },
  {
    slug: "bay-window-calculator",
    title: "Bay Window Calculator",
    description: "Plan the measurements needed for a bay-window curtain track.",
    category: "measure",
    duration: "2 minutes",
    status: "live",
  },
  {
    slug: "curtain-stack-calculator",
    title: "Curtain Stack-Back Calculator",
    description: "Estimate how much wall space your curtains may occupy when fully open.",
    category: "measure",
    duration: "45 seconds",
    status: "live",
  },
  {
  slug: "curtain-width-calculator",
  title: "Curtain Width Calculator",
  description:
    "Calculate finished curtain width from the track width, heading and fullness.",
  category: "measure",
  duration: "45 seconds",
  status: "live",
},
  {
    slug: "track-selector",
    title: "Curtain Track Selector",
    description: "Identify a suitable track type for your window, curtains and fixing surface.",
    category: "choose",
    duration: "1 minute",
    status: "coming-soon",
  },
  {
    slug: "bracket-spacing-calculator",
    title: "Bracket Spacing Calculator",
    description: "Estimate support positions before checking the manufacturer's guidance.",
    category: "plan",
    duration: "45 seconds",
    status: "coming-soon",
  },
];
