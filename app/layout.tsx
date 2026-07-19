import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";

import SiteSchema from "@/components/seo/SiteSchema";
import { siteConfig } from "@/lib/seo/site-config";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default:
      "TrackFit | Professional Curtain Track Installation UK",
    template: "%s | TrackFit",
  },

  description: siteConfig.description,

  applicationName: siteConfig.name,

  keywords: [...siteConfig.keywords],

  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],

  creator: siteConfig.name,

  publisher: siteConfig.name,

  category: "Curtain track installation",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,

    title:
      "TrackFit | Professional Curtain Track Installation UK",

    description: siteConfig.description,

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt:
          "TrackFit professional curtain track installation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "TrackFit | Professional Curtain Track Installation UK",

    description: siteConfig.description,

    images: ["/twitter-image"],
  },

  icons: {
    icon: [
      {
        url: "/logos/trackfit-logo.svg",
        type: "image/svg+xml",
      },
    ],

    shortcut: "/logos/trackfit-logo.svg",

    apple: "/logos/trackfit-logo.svg",
  },

  manifest: "/manifest.webmanifest",

  robots: {
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070807",
  colorScheme: "dark",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body>
        <SiteSchema />

        {children}
      </body>
    </html>
  );
}