export type AreaFaq = {
  question: string;
  answer: string;
};

export type AreaRegionGroup =
  | "London"
  | "South East"
  | "Home Counties"
  | "South West"
  | "Midlands"
  | "North of England";

export type Area = {
  slug: string;
  name: string;
  region: string;
  regionGroup: AreaRegionGroup;
  intro: string;
  metaDescription: string;
  propertyFocus: string[];
  challenges: string[];
  commercial: string[];
  areas: string[];
  localNote: string;
  faqs: AreaFaq[];
  relatedAreaSlugs: string[];
  guideSlugs: string[];
};

export type AreaSampleReview = {
  name: string;
  area: string;
  quote: string;
  sample: true;
};

export type AreaServicePage = {
  citySlug: string;
  serviceSlug: string;
  title: string;
  description: string;
  suitableFor: string[];
  localConsiderations: string[];
};
