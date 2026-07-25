export type WindowType = "standard" | "patio" | "bifold" | "bay" | "corner" | "unsure";
export type CurtainStyle = "pencil" | "pinch" | "wave" | "eyelet" | "unsure";
export type ExtensionPreset = "standard" | "better" | "maximum" | "custom";

export type ToolDefinition = {
  slug: string;
  title: string;
  description: string;
  category: "measure" | "choose" | "plan";
  duration: string;
  status: "live" | "coming-soon";
};
