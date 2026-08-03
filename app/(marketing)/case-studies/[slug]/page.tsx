import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/components/site/SiteHeader";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import {
  caseStudies,
  getCaseStudy,
} from "@/lib/case-studies/data";
import { createMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/site-config";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return {};
  }

  return createMetadata({
    title: study.title,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    type: "article",
    noIndex: !study.verified,
  });
}

export default async function CaseStudyPage({
  params,
}: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const articleSchema = study.verified
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: study.title,
        description: study.summary,
        author: {
          "@type": "Organization",
          name: "TrackFit",
        },
        publisher: {
          "@type": "Organization",
          name: "TrackFit",
        },
        mainEntityOfPage: absoluteUrl(
          `/case-studies/${study.slug}`,
        ),
        about: [
          study.system,
          study.mounting,
          study.location,
        ],
      }
    : null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: study.faqs.map((faq) => ({
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
          {
            name: "Case studies",
            path: "/case-studies",
          },
          {
            name: study.title,
            path: `/case-studies/${study.slug}`,
          },
        ]}
      />

      <SiteHeader />

      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        {articleSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleSchema),
            }}
          />
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <nav className="text-sm text-[#9C9E97]">
              <Link href="/case-studies">
                Case studies
              </Link>

              <span className="mx-2">/</span>

              <span className="text-[#B8F23D]">
                {study.location}
              </span>
            </nav>

            {!study.verified && (
              <div className="mt-8 rounded-[22px] border border-amber-300/25 bg-amber-200/[0.07] p-5">
                <p className="font-semibold text-amber-100">
                  Draft project record- not currently
                  indexable
                </p>

                <p className="mt-2 text-sm leading-6 text-amber-50/80">
                  Verify this page against the real project
                  before changing{" "}
                  <code>verified</code> to true.
                </p>
              </div>
            )}

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">
              {study.category} · {study.location}
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {study.title}
            </h1>

            <p className="mt-7 max-w-4xl text-lg leading-8 text-[#D8D7CF]">
              {study.summary}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Location", study.location],
              ["Track system", study.system],
              ["Mounting", study.mounting],
              ["Curtain heading", study.heading],
            ].map(([label, value]) => (
              <article
                key={label}
                className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                  {label}
                </p>

                <p className="mt-3 font-semibold">
                  {value}
                </p>
              </article>
            ))}
          </section>

          <section className="mt-10 rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Project overview
            </p>

            <p className="mt-4 text-lg leading-8 text-[#D8D7CF]">
              {study.projectOverview}
            </p>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                Project challenge
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                What had to be resolved
              </h2>

              <p className="mt-5 leading-8 text-[#D8D7CF]">
                {study.challenge}
              </p>
            </article>

            <article className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                System selection
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                Why this track was considered
              </h2>

              <p className="mt-5 leading-8 text-[#D8D7CF]">
                {study.whyThisSystem}
              </p>
            </article>
          </section>

          <section className="mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Survey checks
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              What should be confirmed on site
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {study.siteChecks.map((check) => (
                <article
                  key={check}
                  className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 leading-7 text-[#C8C8C1]"
                >
                  {check}
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Installation approach
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              How the project was planned
            </h2>

            <ol className="mt-6 space-y-4">
              {study.approach.map((entry, index) => (
                <li
                  key={entry}
                  className="flex gap-4"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#B8F23D] font-bold text-[#080A09]">
                    {index + 1}
                  </span>

                  <p className="leading-7 text-[#C8C8C1]">
                    {entry}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 rounded-[30px] border border-[#B8F23D]/25 bg-[#B8F23D]/8 p-7 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Result
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Installation outcome
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#D8D7CF]">
              {study.outcome}
            </p>
          </section>

          <section className="mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
              Practical experience
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Lessons for similar projects
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {study.lessons.map((lesson) => (
                <article
                  key={lesson}
                  className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 leading-7 text-[#C8C8C1]"
                >
                  {lesson}
                </article>
              ))}
            </div>
          </section>

          {!study.verified && (
            <section className="mt-10 rounded-[28px] border border-amber-300/25 bg-amber-200/[0.07] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
                Evidence required before publishing
              </p>

              <ul className="mt-5 space-y-3 text-amber-50">
                {study.evidenceNeeded.map((entry) => (
                  <li key={entry}>• {entry}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-10">
            <h2 className="text-3xl font-semibold">
              Related guidance
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {study.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 font-semibold transition hover:border-[#B8F23D]/45"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-3xl font-semibold">
              Frequently asked questions
            </h2>

            <div className="mt-7 divide-y divide-white/10 rounded-[28px] border border-white/10 bg-white/[0.035] px-6">
              {study.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="py-5"
                >
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
              Plan a similar installation
            </p>

            <h2 className="mt-4 text-4xl font-semibold">
              Request a TrackFit quotation
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#AAACA4]">
              Send your postcode, photographs and basic
              measurements. TrackFit can help identify a
              suitable track system and installation approach.
            </p>

            <Link
              href="/quote/postcode"
              className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-semibold text-[#080A09]"
            >
              Start your quote
            </Link>
          </section>

          <section className="mt-10 rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm leading-7 text-[#9C9E97]">
              {study.customerPrivacy}
            </p>
          </section>
        </section>
      </main>
    </>
  );
}
