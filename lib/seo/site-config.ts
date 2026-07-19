const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.curtaintrackfitters.com";

export const siteConfig = {
  name: "TrackFit",
  legalName: "TrackFit",

  url: configuredUrl.replace(/\/$/, ""),
  domain: "curtaintrackfitters.com",

  tagline: "Where precision meets design.",

  description:
    "Professional curtain track installation for homes, interior designers and commercial projects across the United Kingdom.",

  locale: "en_GB",
  language: "en-GB",

  logo: "/logos/trackfit-logo.svg",

  serviceArea: "United Kingdom",

  keywords: [
    "curtain track fitters",
    "curtain track installation",
    "curtain track fitting",
    "wave curtain track installation",
    "bay window curtain tracks",
   
    "commercial curtain track installation",
    "UK curtain track installers",
  ],
} as const;

export function absoluteUrl(path = "/") {
  const normalisedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return `${siteConfig.url}${normalisedPath}`;
}