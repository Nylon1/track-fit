import type { MetadataRoute } from "next";

import { motorisedArticles, motorisedPages } from "@/lib/motorised/data";
import { absoluteUrl } from "@/lib/seo/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-07-31");

  return [
    {
      url: absoluteUrl("/motorised-curtain-tracks"),
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/motorised-curtain-tracks/control-selector"),
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/motorised-curtain-tracks/track-selector"),
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/motorised-curtain-tracks/faqs"),
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    ...motorisedPages.map((page) => ({
      url: absoluteUrl(`/motorised-curtain-tracks/${page.slug}`),
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority:
        page.slug === "installation" ||
        page.slug === "motors" ||
        page.slug === "track-systems"
          ? 0.88
          : 0.8,
    })),
    ...motorisedArticles.map(([slug]) => ({
      url: absoluteUrl(`/articles/motorised-curtain-tracks/${slug}`),
      lastModified: new Date("2026-09-01"),
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
  ];
}
