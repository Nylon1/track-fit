import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:
      "TrackFit — Professional Curtain Track Installation",

    short_name: "TrackFit",

    description: siteConfig.description,

    start_url: "/",
    display: "standalone",

    background_color: "#070807",
    theme_color: "#070807",

    lang: "en-GB",

    icons: [
      {
        src: "/logos/trackfit-logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}