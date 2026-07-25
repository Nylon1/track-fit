import type { MetadataRoute } from "next";

import { guides } from "@/lib/guides/data";
import { absoluteUrl } from "@/lib/seo/site-config";
import { tools } from "@/lib/tools/data";
const routes = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly" as const,
  },
  {
  path: "/tools",
  priority: 0.85,
  changeFrequency: "weekly" as const,
},
  {
    path: "/services",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/commercial",
    priority: 0.85,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/gallery",
    priority: 0.75,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/about",
    priority: 0.65,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/contact",
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/services/curtain-track-installation",
    priority: 0.95,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/services/wave-curtain-track-installation",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/services/bay-window-curtain-track-installation",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/services/commercial-curtain-track-installation",
    priority: 0.92,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/services/ceiling-mounted-curtain-track-installation",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/services/wall-mounted-curtain-track-installation",
    priority: 0.86,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/services/residential-curtain-track-installation",
    priority: 0.94,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/guides",
    priority: 0.85,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/privacy",
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
  {
    path: "/terms",
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: new Date("2026-07-25"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
const toolPages: MetadataRoute.Sitemap = tools
    .filter((tool) => tool.status === "live")
    .map((tool) => ({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: new Date("2026-07-25"),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...staticPages, ...guidePages, ...toolPages];
}
