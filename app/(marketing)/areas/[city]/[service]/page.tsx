import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/site/SiteHeader";
import {
  areaServicePages,
  getArea,
  getAreaServicePage,
} from "@/lib/areas/data";
import { createMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{
    city: string;
    service: string;
  }>;
};

export function generateStaticParams() {
  return areaServicePages.map((page) => ({
    city: page.citySlug,
    service: page.serviceSlug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city, service } = await params;
  const page = getAreaServicePage(city, service);

  if (!page) {
    return {};
  }

  return createMetadata({
    title: `${page.title} Service | TrackFit`,
    description: page.description,
    path: `/areas/${page.citySlug}/${page.serviceSlug}`,
  });
}

export default async function AreaServicePage({
  params,
}: PageProps) {
  const { city, service } = await params;
  const page = getAreaServicePage(city, service);
  const area = getArea(city);

  if (!page || !area) {
    notFound();
  }

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <nav className="text-sm text-[#9C9E97]">
              <Link href="/areas" className="hover:text-white">
                Areas
              </Link>
              <span className="mx-2">/</span>
              <Link
                href={`/areas/${area.slug}`}
                className="hover:text-white"
              >
                {area.name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#B8F23D]">
                {page.title}
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              {area.region}
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {page.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              {page.description}
            </p>

            <Link
              href="/quote/postcode"
              className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-6 font-semibold text-[#080A09]"
            >
              Get an installation quote
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Suitable projects
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                What this service covers
              </h2>
              <ul className="mt-6 space-y-4 text-[#C8C8C1]">
                {page.suitableFor.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Local planning
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                What we consider in {area.name}
              </h2>
              <ul className="mt-6 space-y-4 text-[#C8C8C1]">
                {page.localConsiderations.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-8 rounded-[30px] border border-[#B8F23D]/25 bg-[#B8F23D]/8 p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Why local context matters
            </p>
            <p className="mt-4 text-lg leading-8 text-[#D8D7CF]">
              {area.localNote}
            </p>
          </div>

          <section className="mt-16">
            <h2 className="text-3xl font-semibold">
              Plan the installation
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {[
                [
                  "/tools/curtain-track-length-calculator",
                  "Track Length Calculator",
                ],
                [
                  "/tools/curtain-track-projection-calculator",
                  "Track Projection Calculator",
                ],
                [
                  "/tools/bracket-placement-calculator",
                  "Bracket Placement Calculator",
                ],
              ].map(([href, title]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 font-semibold transition hover:border-[#B8F23D]/45"
                >
                  {title} →
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-16 rounded-[32px] border border-white/10 bg-white/[0.035] p-7 text-center sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Professional installation
            </p>
            <h2 className="mt-4 text-4xl font-semibold">
              Send us the measurements and photos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#AAACA4]">
              We will review the track route, fixing surface,
              projection and access requirements before quoting.
            </p>
            <Link
              href="/quote/postcode"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-7 font-semibold text-[#080A09]"
            >
              Start my quote
            </Link>
          </section>
        </section>
      </main>
    </>
  );
}
