export type TradeFaq = {
  question: string;
  answer: string;
};

export type TradeSector = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  projects: string[];
  challenges: string[];
  workflow: string[];
  keywords: string[];
  faqs: TradeFaq[];
};
