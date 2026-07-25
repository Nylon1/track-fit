export type GuideCategory =
  | "choosing"
  | "measuring"
  | "installation"
  | "windows"
  | "rooms"
  | "commercial"
  | "repairs";

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  callout?: {
    title: string;
    text: string;
  };
};

export type Guide = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  category: GuideCategory;
  readTime: string;
  updatedAt: string;
  heroImage?: string;
  quickAnswer: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  relatedGuides: string[];
  serviceLink: {
    label: string;
    href: string;
  };
};

export type GuideCategoryDefinition = {
  slug: GuideCategory;
  title: string;
  description: string;
};
