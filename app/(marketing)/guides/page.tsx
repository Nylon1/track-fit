import type { Metadata } from "next";
import Image from "next/image";
import { TrackPlanningVisual } from "@/components/guides/TrackPlanningVisual";
import Link from "next/link";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { GuideExplorer } from "@/components/guides/GuideExplorer";
import { guideCategories, guides } from "@/lib/guides/data";
import { createMetadata } from "@/lib/seo/metadata";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = createMetadata({
  title: "Curtain Track Guides & Expert Advice | TrackFit",
  description:
    "Practical curtain track guides covering choosing, measuring, installation, bay windows, bifold doors, repairs and commercial fitting.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <>
      <SiteHeader />
    <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <Image src="/images/gallery/bay-windows/bridges-bespoke-bay.webp" alt="Full length curtains following a bright curved bay window" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A09]/95 via-[#080A09]/80 to-[#080A09]/35" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
            TrackFit knowledge centre
          </p>

          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
            Clear answers to real curtain track questions.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
            Practical advice based on more than 12 years of fitting curtain
            tracks in homes and commercial properties across England.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#all-guides"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-7 py-3 font-semibold text-[#080A09] transition hover:bg-[#C7FF4A]"
            >
              Find a guide
            </a>
            <Link
              href="/quote/postcode"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-7 py-3 font-semibold transition hover:border-[#B8F23D] hover:bg-white/5"
            >
              Get an installation quote
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <TrackPlanningVisual />
        <div className="mb-8 mt-16"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Your guide library</p><h2 className="mt-4 text-4xl font-semibold">Find the answer for your room.</h2></div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
        <GuideExplorer guides={guides} categories={guideCategories} />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
        <GuideCTA />
      </section>
    </main>
    </>
  );
}
