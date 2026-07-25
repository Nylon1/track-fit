import type { Metadata } from "next";
import Link from "next/link";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { GuideExplorer } from "@/components/guides/GuideExplorer";
import { guideCategories, guides } from "@/lib/guides/data";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "Curtain Track Guides & Expert Advice | TrackFit",
  description:
    "Practical curtain track guides covering choosing, measuring, installation, bay windows, bifold doors, repairs and commercial fitting.",
  alternates: {
    canonical: absoluteUrl("/guides"),
  },
  openGraph: {
    title: "Curtain Track Guides & Expert Advice | TrackFit",
    description:
      "Clear answers about choosing, measuring, fitting and repairing curtain tracks.",
    type: "website",
    url: absoluteUrl("/guides"),
  },
};

export default function GuidesPage() {
  return (
    <>
      <SiteHeader />
    <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
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

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
            Browse by subject
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Start with the problem you are trying to solve
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guideCategories.map((category) => {
            const count = guides.filter(
              (guide) => guide.category === category.slug,
            ).length;

            return (
              <button
                key={category.slug}
                type="button"
                onClick={undefined}
                className="cursor-default rounded-[26px] border border-white/10 bg-white/[0.035] p-6 text-left"
              >
                <div className="flex items-start justify-between gap-5">
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <span className="rounded-full bg-[#B8F23D]/15 px-3 py-1 text-xs font-semibold text-[#B8F23D]">
                    {count}
                  </span>
                </div>
                <p className="mt-3 leading-7 text-[#C8C8C1]">
                  {category.description}
                </p>
              </button>
            );
          })}
        </div>
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
