import type { Metadata } from "next";

import {
  absoluteUrl,
  siteConfig,
} from "./site-config";

type CreateMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

function withTrackFitBrand(title: string) {
  return title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  image = "/opengraph-image",
  noIndex = false,
  type = "website",
}: CreateMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const brandedTitle = withTrackFitBrand(title);

  return {
    title: brandedTitle,
    description,

    keywords: [
      ...siteConfig.keywords,
      ...keywords,
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    robots: noIndex
      ? {
          index: false,
          follow: true,

          googleBot: {
            index: false,
            follow: true,
          },
        }
      : {
          index: true,
          follow: true,

          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },

    openGraph: {
      type,
      locale: siteConfig.locale,
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: brandedTitle,
      description,

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: brandedTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [image],
    },
  };
}
