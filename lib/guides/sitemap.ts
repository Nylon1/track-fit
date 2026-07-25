import { guides } from "./data";

export function getGuideSitemapEntries(siteUrl: string) {
  const baseUrl = siteUrl.replace(/\/$/, "");

  return [
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: guide.slug === "what-type-of-curtain-track-do-i-need" ? 0.8 : 0.7,
    })),
  ];
}
