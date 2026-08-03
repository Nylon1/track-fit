import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { brandContent } from "@/lib/brands/data";
import { createMetadata } from "@/lib/seo/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
export const metadata: Metadata = createMetadata({
  title: "Curtain Track Brand Centre | TrackFit",
  description:
    "Independent installation guides for recognised curtain-track brands and selected manual and cord-operated systems.",
  path: "/brands",
});

export default function BrandsPage() {
 return (
  <>
    <BreadcrumbSchema
      items={[
        { name: "Home", path: "/" },
        { name: "Brands", path: "/brands" },
        
      ]}
    />

    <SiteHeader />
      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              TrackFit Brand Centre
            </p>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Track Brands and System Guides
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Find independent fitting guidance, system checks and
              links to verified product-specific pages.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {brandContent.brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group rounded-[28px] border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#B8F23D]/45"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                  Brand guide
                </p>
                <h2 className="mt-3 text-3xl font-semibold">{brand.name}</h2>
                <p className="mt-4 leading-7 text-[#AAACA4]">
                  {brand.description}
                </p>
                <span className="mt-7 inline-flex font-semibold group-hover:text-[#B8F23D]">
                  View brand guide →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-sm leading-7 text-amber-50">
              TrackFit is independent. Brand names and trademarks belong
              to their owners. No authorised or endorsed relationship is
              implied unless expressly stated.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
