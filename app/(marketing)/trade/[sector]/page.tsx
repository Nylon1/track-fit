import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/site/SiteHeader";
import { getTradeSector, tradeSectors } from "@/lib/trade/data";
import { absoluteUrl } from "@/lib/seo/site-config";

type PageProps = {
  params: Promise<{
    sector: string;
  }>;
};

export function generateStaticParams() {
  return tradeSectors.map((sector) => ({
    sector: sector.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { sector } = await params;
  const item = getTradeSector(sector);

  if (!item) {
    return {};
  }

  return {
    title: `${item.title} | TrackFit`,
    description: item.description,
    keywords: item.keywords,
    alternates: {
      canonical: absoluteUrl(`/trade/${item.slug}`),
    },
  };
}

export default async function TradeSectorPage({
  params,
}: PageProps) {
  const { sector } = await params;
  const item = getTradeSector(sector);

  if (!item) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: item.faqs.map((faq) => ({
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
    name: item.title,
    description: item.description,
    provider: {
      "@type": "Organization",
      name: "TrackFit",
      url: absoluteUrl("/"),
    },
    areaServed: {
      "@type": "Country",
      name: "England",
    },
    serviceType: "Manual curtain track installation",
  };

  const related = tradeSectors
    .filter((sector) => sector.slug !== item.slug)
    .slice(0, 3);

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
              <Link href="/trade" className="hover:text-white">
                Trade
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#B8F23D]">
                {item.name}
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Trade curtain-track installation
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {item.title}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              {item.description}
            </p>

            <Link
              href="/contact"
              className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-6 font-semibold text-[#080A09]"
            >
              Discuss a project
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-4xl rounded-[30px] border border-white/10 bg-white/[0.035] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
              Specialist support
            </p>
            <p className="mt-4 text-lg leading-8 text-[#D8D7CF]">
              {item.intro}
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Typical projects
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Where TrackFit can help
              </h2>
              <ul className="mt-6 space-y-4 text-[#C8C8C1]">
                {item.projects.map((project) => (
                  <li key={project}>• {project}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Installation risks
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Common challenges
              </h2>
              <ul className="mt-6 space-y-4 text-[#C8C8C1]">
                {item.challenges.map((challenge) => (
                  <li key={challenge}>• {challenge}</li>
                ))}
              </ul>
            </article>
          </div>

          <section className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
              Project workflow
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              How we work with {item.name.toLowerCase()}
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {item.workflow.map((step, index) => (
                <article
                  key={step}
                  className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#B8F23D] font-bold text-[#080A09]">
                    {index + 1}
                  </span>
                  <p className="mt-4 leading-7 text-[#D8D7CF]">
                    {step}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
              Useful planning tools
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Check the installation before site work
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {[
                [
                  "/tools/curtain-track-type-finder",
                  "Track Type Finder",
                ],
                [
                  "/tools/bracket-placement-calculator",
                  "Bracket Placement Calculator",
                ],
                [
                  "/tools/curtain-track-projection-calculator",
                  "Track Projection Calculator",
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
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
              Trade questions
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Frequently asked questions
            </h2>

            <div className="mt-7 divide-y divide-white/10 rounded-[28px] border border-white/10 bg-white/[0.035] px-5 sm:px-7">
              {item.faqs.map((faq) => (
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

          <section className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
              Related sectors
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((sector) => (
                <Link
                  key={sector.slug}
                  href={`/trade/${sector.slug}`}
                  className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 transition hover:border-[#B8F23D]/45"
                >
                  <h3 className="text-xl font-semibold">
                    {sector.name}
                  </h3>
                  <span className="mt-4 inline-flex text-sm font-semibold text-[#B8F23D]">
                    View sector →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-16 rounded-[32px] border border-[#B8F23D]/25 bg-[#B8F23D]/8 p-7 text-center sm:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Trade enquiry
            </p>
            <h2 className="mt-4 text-4xl font-semibold">
              Send the scope, drawings or room schedule
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#AAACA4]">
              Include the location, programme, room quantities,
              intended track system and access requirements.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-7 font-semibold text-[#080A09]"
            >
              Start a trade enquiry
            </Link>
          </section>
        </section>
      </main>
    </>
  );
}
