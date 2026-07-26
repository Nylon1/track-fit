import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import {
  brandContent,
  getBrand,
  getSystem,
} from "@/lib/brands/data";
import { absoluteUrl } from "@/lib/seo/site-config";

type Props = {
  params: Promise<{
    brand: string;
    system: string;
  }>;
};

export function generateStaticParams() {
  return brandContent.systems.map((system) => ({
    brand: system.brandSlug,
    system: system.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { brand, system } = await params;
  const item = getSystem(brand, system);

  if (!item) return {};

  return {
    title: `${item.name} Installation Guide | TrackFit`,
    description: item.description,
    alternates: {
      canonical: absoluteUrl(`/brands/${brand}/${system}`),
    },
  };
}

export default async function SystemPage({ params }: Props) {
  const { brand, system } = await params;
  const item = getSystem(brand, system);
  const brandItem = getBrand(brand);

  if (!item || !brandItem) notFound();

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
    <BreadcrumbSchema
      items={[
        { name: "Home", path: "/" },
        { name: "Brands", path: "/brands" },
        {
          name: brandItem.name,
          path: `/brands/${brandItem.slug}`,
        },
        {
          name: item.name,
          path: `/brands/${brandItem.slug}/${item.slug}`,
        },
      ]}
    />

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
              <Link href="/brands">Brands</Link>
              <span className="mx-2">/</span>
              <Link href={`/brands/${brandItem.slug}`}>
                {brandItem.name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#B8F23D]">
                {item.name}
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Detailed independent system guide
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {item.name} Installation Guide
            </h1>

            <p className="mt-7 max-w-4xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              {item.description}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {item.facts.map(([label, value]) => (
              <article
                key={label}
                className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                  {label}
                </p>

                <p className="mt-3 text-lg font-semibold">
                  {value}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-10 rounded-[30px] border border-white/10 bg-white/[0.035] p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              System overview
            </p>

            <p className="mt-4 text-lg leading-8 text-[#D8D7CF]">
              {item.overview}
            </p>
          </section>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
              <h2 className="text-3xl font-semibold">
                Suitable applications
              </h2>

              <ul className="mt-6 space-y-4 text-[#C8C8C1]">
                {item.suitable.map((entry) => (
                  <li key={entry}>• {entry}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-[28px] border border-red-300/20 bg-red-200/[0.06] p-7">
              <h2 className="text-3xl font-semibold">
                When not to assume it fits
              </h2>

              <ul className="mt-6 space-y-4 text-red-50">
                {item.avoid.map((entry) => (
                  <li key={entry}>• {entry}</li>
                ))}
              </ul>
            </article>
          </div>

          <section className="mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Installation planning
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Checks before fixing the track
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {item.planning.map((entry, index) => (
                <div
                  key={entry}
                  className="flex gap-4 rounded-[24px] border border-white/10 bg-white/[0.035] p-5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#B8F23D] font-bold text-[#080A09]">
                    {index + 1}
                  </span>

                  <p className="leading-7 text-[#D8D7CF]">
                    {entry}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
            <h2 className="text-3xl font-semibold">
              Troubleshooting and failure clues
            </h2>

            <ul className="mt-6 space-y-4 text-[#C8C8C1]">
              {item.troubleshooting.map((entry) => (
                <li key={entry}>• {entry}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [
                "/tools/bracket-placement-calculator",
                "Plan bracket positions",
              ],
              [
                "/tools/curtain-track-projection-calculator",
                "Calculate projection",
              ],
              [
                "/tools/curtain-track-fixing-finder",
                "Check the fixing surface",
              ],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 font-semibold transition hover:border-[#B8F23D]/45"
              >
                {label} →
              </Link>
            ))}
          </section>

          <section className="mt-10">
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

          <section className="mt-10 rounded-[32px] border border-[#B8F23D]/25 bg-[#B8F23D]/8 p-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Professional installation
            </p>

            <h2 className="mt-4 text-4xl font-semibold">
              Have the exact system checked before fitting
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#AAACA4]">
              Send the product reference, track length, curtain
              heading and photographs of the proposed fixing route.
            </p>

            <Link
              href="/quote/postcode"
              className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-semibold text-[#080A09]"
            >
              Request installation
            </Link>
          </section>

          <section className="mt-10 rounded-[28px] border border-amber-300/25 bg-amber-200/8 p-6">
            <p className="text-sm leading-7 text-amber-50">
              Verify the exact system and current manufacturer
              documentation before ordering, bending, cutting or
              drilling. TrackFit is independent and does not imply
              authorised-installer status.
            </p>
          </section>
        </section>
      </main>
    </>
  );
}
