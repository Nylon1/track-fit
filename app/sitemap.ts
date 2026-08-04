import type { MetadataRoute } from "next";

import { areas, areaServicePages } from "@/lib/areas/data";
import { brandContent } from "@/lib/brands/data";
import { getVerifiedCaseStudies } from "@/lib/case-studies/data";
import { guides } from "@/lib/guides/data";
import { motorisedArticles, motorisedPages } from "@/lib/motorised/data";
import { absoluteUrl, siteConfig } from "@/lib/seo/site-config";
import { tools } from "@/lib/tools/data";
import { tradeSectors } from "@/lib/trade/data";

const updated = new Date("2026-08-04");

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/guides", priority: 0.91, changeFrequency: "weekly" as const },
  { path: "/tools", priority: 0.91, changeFrequency: "weekly" as const },
  { path: "/case-studies", priority: 0.82, changeFrequency: "weekly" as const },
  { path: "/areas", priority: 0.82, changeFrequency: "weekly" as const },
  { path: "/brands", priority: 0.86, changeFrequency: "weekly" as const },
  { path: "/trade", priority: 0.81, changeFrequency: "weekly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/services/curtain-track-installation", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/services/residential-curtain-track-installation", priority: 0.94, changeFrequency: "weekly" as const },
  { path: "/services/commercial-curtain-track-installation", priority: 0.92, changeFrequency: "weekly" as const },
  { path: "/services/wave-curtain-track-installation", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/services/bay-window-curtain-track-installation", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/services/ceiling-mounted-curtain-track-installation", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/services/wall-mounted-curtain-track-installation", priority: 0.86, changeFrequency: "weekly" as const },
  { path: "/services/double-curtain-tracks", priority: 0.88, changeFrequency: "weekly" as const },
  { path: "/services/healthcare-curtain-track-installation", priority: 0.86, changeFrequency: "monthly" as const },
  { path: "/motorised-curtain-tracks", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/motorised-curtain-tracks/control-selector", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/motorised-curtain-tracks/track-selector", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/motorised-curtain-tracks/faqs", priority: 0.82, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: route.path === "/" ? siteConfig.url : absoluteUrl(route.path),
    lastModified: updated,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const toolPages: MetadataRoute.Sitemap = tools
    .filter((tool) => tool.status === "live")
    .map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const areaPages: MetadataRoute.Sitemap = areas.map((area) => ({
    url: absoluteUrl(`/areas/${area.slug}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const areaServiceEntries: MetadataRoute.Sitemap = areaServicePages.map((page) => ({
    url: absoluteUrl(`/areas/${page.citySlug}/${page.serviceSlug}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  const tradePages: MetadataRoute.Sitemap = tradeSectors.map((sector) => ({
    url: absoluteUrl(`/trade/${sector.slug}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const brandPages: MetadataRoute.Sitemap = brandContent.brands.map((brand) => ({
    url: absoluteUrl(`/brands/${brand.slug}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.76,
  }));

  const brandSystemPages: MetadataRoute.Sitemap = brandContent.systems.map((system) => ({
    url: absoluteUrl(`/brands/${system.brandSlug}/${system.slug}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = getVerifiedCaseStudies().map((study) => ({
    url: absoluteUrl(`/case-studies/${study.slug}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.78,
  }));

  const motorisedGuidePages: MetadataRoute.Sitemap = motorisedPages.map((page) => ({
    url: absoluteUrl(`/motorised-curtain-tracks/${page.slug}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority:
      page.slug === "installation" || page.slug === "motors" || page.slug === "track-systems"
        ? 0.88
        : 0.8,
  }));

  const motorisedArticlePages: MetadataRoute.Sitemap = motorisedArticles.map(([slug]) => ({
    url: absoluteUrl(`/articles/motorised-curtain-tracks/${slug}`),
    lastModified: updated,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  return [
    ...staticPages,
    ...guidePages,
    ...toolPages,
    ...areaPages,
    ...tradePages,
    ...brandPages,
    ...brandSystemPages,
    ...areaServiceEntries,
    ...caseStudyPages,
    ...motorisedGuidePages,
    ...motorisedArticlePages,
  ];
}
