export type AreaFaq = {
  question: string;
  answer: string;
};

export type Area = {
  slug: string;
  name: string;
  region: string;
  intro: string;
  propertyFocus: string[];
  challenges: string[];
  commercial: string[];
  areas: string[];
  localNote: string;
  faqs: AreaFaq[];
};

export type AreaServicePage = {
  citySlug: string;
  serviceSlug: string;
  title: string;
  description: string;
  suitableFor: string[];
  localConsiderations: string[];
};
