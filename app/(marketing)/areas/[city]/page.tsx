import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SampleAreaReview from "@/components/areas/SampleAreaReview";
import SiteHeader from "@/components/site/SiteHeader";
import { areaServicePages, areas, getArea } from "@/lib/areas/data";
import { getSampleAreaReview } from "@/lib/areas/reviews";
import { getGuide } from "@/lib/guides/data";
import { createMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/site-config";

type PageProps = {
  params: Promise<{
    city: string;
  }>;
};

export function generateStaticParams() {
  return areas.map((area) => ({
    city: area.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city } = await params;
  const area = getArea(city);

  if (!area) {
    return {};
  }

  return createMetadata({
    title: `Curtain Track Installation in ${area.name} | TrackFit`,
    description: area.metaDescription,
    path: `/areas/${area.slug}`,
    keywords: [
      `curtain track installation ${area.name}`,
      `curtain track fitters ${area.name}`,
    ],
  });
}

export default async function AreaPage({ params }: PageProps) {
  const { city } = await params;
  const area = getArea(city);

  if (!area) {
    notFound();
  }

  const services = areaServicePages.filter(
    (page) => page.citySlug === area.slug,
  );
  const relatedAreas = area.relatedAreaSlugs.flatMap((slug) => {
    const relatedArea = getArea(slug);
    return relatedArea ? [relatedArea] : [];
  });
  const relatedGuides = area.guideSlugs.flatMap((slug) => {
    const guide = getGuide(slug);
    return guide ? [guide] : [];
  });
  const sampleReview = getSampleAreaReview(area.slug);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Curtain track installation in ${area.name}`,
    areaServed: {
      "@type": "City",
      name: area.name,
    },
    provider: {
      "@type": "Organization",
      name: "TrackFit",
      url: absoluteUrl("/"),
    },
  };

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <nav className="text-sm text-[#9C9E97]">
              <Link href="/areas" className="hover:text-white">
                Areas
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#B8F23D]">
                {area.name}
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              {area.region}
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Track Installation in {area.name}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              {area.intro}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/quote/postcode"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-6 font-semibold text-[#080A09]"
              >
                Get an installation quote
              </Link>

              <Link
                href="/tools"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 font-semibold"
              >
                Use our planning tools
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Local property types
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Homes we commonly plan for
              </h2>
              <ul className="mt-5 space-y-3 text-[#C8C8C1]">
                {area.propertyFocus.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Installation planning
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Typical local challenges
              </h2>
              <ul className="mt-5 space-y-3 text-[#C8C8C1]">
                {area.challenges.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Commercial work
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Properties and sectors
              </h2>
              <ul className="mt-5 space-y-3 text-[#C8C8C1]">
                {area.commercial.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-8 rounded-[30px] border border-[#B8F23D]/25 bg-[#B8F23D]/8 p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Local installation insight
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-[#D8D7CF]">
              {area.localNote}
            </p>
          </div>

          <SampleAreaReview review={sampleReview} />

          <section className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Nearby coverage
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Areas around {area.name}
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">
              {area.areas.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-[#D8D7CF]"
                >
                  {item}
                </span>
              ))}
            </div>

            {relatedAreas.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold">
                  Nearby TrackFit city guides
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {relatedAreas.map((relatedArea) => (
                    <Link
                      key={relatedArea.slug}
                      href={`/areas/${relatedArea.slug}`}
                      className="rounded-full border border-[#B8F23D]/25 px-4 py-2 text-sm font-semibold text-[#D8D7CF] transition hover:border-[#B8F23D] hover:text-white"
                    >
                      {relatedArea.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>

          {services.length > 0 && (
            <section className="mt-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                Detailed local services
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                Specialist pages for {area.name}
              </h2>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {services.map((service) => (
                  <Link
                    key={service.serviceSlug}
                    href={`/areas/${area.slug}/${service.serviceSlug}`}
                    className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#B8F23D]/45"
                  >
                    <h3 className="text-2xl font-semibold">
                      {service.title}
                    </h3>
                    <p className="mt-3 leading-7 text-[#AAACA4]">
                      {service.description}
                    </p>
                    <span className="mt-5 inline-flex font-semibold text-[#B8F23D]">
                      Read local service guide →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Plan before booking
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Useful TrackFit tools
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {[
                [
                  "/tools/curtain-track-length-calculator",
                  "Track Length Calculator",
                ],
                [
                  "/tools/bracket-placement-calculator",
                  "Bracket Placement Calculator",
                ],
                [
                  "/tools/curtain-track-type-finder",
                  "Track Type Finder",
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

          <section className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Installation guidance
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Relevant services and guides
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <Link
                href="/services/residential-curtain-track-installation"
                className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 font-semibold transition hover:border-[#B8F23D]/45"
              >
                Residential curtain-track installation →
              </Link>
              <Link
                href="/services/commercial-curtain-track-installation"
                className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 font-semibold transition hover:border-[#B8F23D]/45"
              >
                Commercial curtain-track installation →
              </Link>
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 font-semibold transition hover:border-[#B8F23D]/45"
                >
                  {guide.title} →
                </Link>
              ))}
            </div>
          </section>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
            Local questions
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Frequently asked questions
          </h2>

          <div className="mt-7 divide-y divide-white/10 rounded-[28px] border border-white/10 bg-white/[0.035] px-5 sm:px-7">
            {area.faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none justify-between gap-5 text-lg font-semibold">
                  {faq.question}
                  <span className="text-2xl text-[#B8F23D] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="pt-4 leading-7 text-[#AAACA4]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
