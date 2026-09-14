import type { Metadata } from "next";

import HomePageExperience from "@/components/home/HomePageExperience";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Professional Curtain Track Installation UK",
  description:
    "Specialist curtain track installation for homes, interior designers and commercial projects across the UK. Explore services, gallery examples, guide pricing and request a reviewed quotation.",
  path: "/",
  image: "/images/gallery/bay-windows/bridges-bespoke-bay.webp",
  keywords: [
    "curtain track installation",
    "curtain track fitters UK",
    "bay window curtain tracks",
    "wave curtain track installation",
    "ceiling mounted curtain tracks",
    "commercial curtain track installation",
  ],
});

export default function Page() {
  return <HomePageExperience />;
}
