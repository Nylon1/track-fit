import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/site/SiteHeader";
import {
  brandContent,
  getBrand,
  getBrandSystems,
} from "@/lib/brands/data";
import { absoluteUrl } from "@/lib/seo/site-config";

type Props = {
  params: Promise<{ brand: string }>;
};

export function generateStaticParams() {
  return brandContent.brands.map((brand) => ({
    brand: brand.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { brand } = await params;
  const item = getBrand(brand);

  if (!item) return {};

  return {
    title: `${item.title} | TrackFit`,
    description: item.description,
    alternates: {
      canonical: absoluteUrl(`/brands/${item.slug}`),
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { brand } = await params;
  const item = getBrand(brand);

  if (!item) notFound();

  const systems = getBrandSystems(item.slug);

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

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <nav className="text-sm text-[#9C9E97]">
              <Link href="/brands" className="hover:text-white">
                Brands
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#B8F23D]">
                {item.name}
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Independent cornerstone guide
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {item.title}
            </h1>

            <p className="mt-7 max-w-4xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              {item.hero}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/quote/postcode"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-6 font-semibold text-[#080A09]"
              >
                Request installation
              </Link>

              <Link
                href="/tools/curtain-track-type-finder"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 font-semibold"
              >
                Use Track Type Finder
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <section className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Brand position
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Where {item.name} fits in a curtain project
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {item.positioning.map((paragraph) => (
                <p
                  key={paragraph}
                  className="rounded-[22px] border border-white/10 bg-[#080A09] p-5 leading-7 text-[#C8C8C1]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Typical applications
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Projects where {item.name} may be considered
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {item.applications.map((application) => (
                <div
                  key={application}
                  className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5"
                >
                  <p className="leading-7 text-[#D8D7CF]">
                    {application}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Selection process
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              How to choose the right system
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {item.selection.map((entry, index) => (
                <article
                  key={entry.title}
                  className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#B8F23D] font-bold text-[#080A09]">
                    {index + 1}
                  </span>

                  <h3 className="mt-4 text-2xl font-semibold">
                    {entry.title}
                  </h3>

                  <p className="mt-3 leading-7 text-[#AAACA4]">
                    {entry.copy}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {systems.length > 0 && (
            <section className="mt-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                Product guides
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                Compare selected {item.name} systems
              </h2>

              <div className="mt-7 overflow-x-auto rounded-[28px] border border-white/10">
                <table className="min-w-full border-collapse text-left">
                  <thead className="bg-white/[0.055]">
                    <tr>
                      <th className="p-5">System</th>
                      <th className="p-5">Operation</th>
                      <th className="p-5">Fitting</th>
                      <th className="p-5">Guide</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/10">
                    {systems.map((system) => {
                      const operation = system.facts.find(
                        ([label]) => label === "Operation",
                      )?.[1];

                      const fitting = system.facts.find(
                        ([label]) => label === "Fitting",
                      )?.[1];

                      return (
                        <tr key={system.slug}>
                          <td className="p-5 font-semibold">
                            {system.name}
                          </td>
                          <td className="p-5 text-[#C8C8C1]">
                            {operation}
                          </td>
                          <td className="p-5 text-[#C8C8C1]">
                            {fitting}
                          </td>
                          <td className="p-5">
                            <Link
                              href={`/brands/${item.slug}/${system.slug}`}
                              className="font-semibold text-[#B8F23D]"
                            >
                              Read guide →
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                Existing tracks
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                How to identify the system
              </h2>

              <ul className="mt-6 space-y-4 text-[#C8C8C1]">
                {item.identification.map((entry) => (
                  <li key={entry}>• {entry}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                Installation
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                Practical fitting checks
              </h2>

              <ul className="mt-6 space-y-4 text-[#C8C8C1]">
                {item.installation.map((entry) => (
                  <li key={entry}>• {entry}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Troubleshooting
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Common problems and what they indicate
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {item.problems.map((entry) => (
                <article
                  key={entry.problem}
                  className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6"
                >
                  <h3 className="text-xl font-semibold">
                    {entry.problem}
                  </h3>

                  <p className="mt-3 leading-7 text-[#AAACA4]">
                    {entry.response}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[30px] border border-[#B8F23D]/25 bg-[#B8F23D]/8 p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Comparison guidance
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              When to move up, down or across the range
            </h2>

            <ul className="mt-6 space-y-4 text-[#D8D7CF]">
              {item.comparison.map((entry) => (
                <li key={entry}>• {entry}</li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-semibold">
              Frequently asked questions
            </h2>

            <div className="mt-7 divide-y divide-white/10 rounded-[28px] border border-white/10 bg-white/[0.035] px-6">
              {item.faqs.map((faq) => (
                <details key={faq.question} className="py-5">
                  <summary className="cursor-pointer text-lg font-semibold">
                    {faq.question}
                  </summary>

                  <p className="pt-4 leading-7 text-[#AAACA4]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
              Independent and product-specific
            </p>

            <p className="mt-3 text-sm leading-7 text-amber-50">
              TrackFit is independent. Product ranges and technical
              data can change. Confirm the current manufacturer
              catalogue and exact system before ordering components,
              cutting tracks or drilling.
            </p>
          </section>
        </section>
      </main>
    </>
  );
}
