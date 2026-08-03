import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import { createMetadata } from "@/lib/seo/metadata";
import { FAQAccordion } from "@/components/guides/FAQAccordion";
import { InstallerInsight } from "@/components/guides/InstallerInsight";
import { GuideHeroVisual } from "@/components/guides/GuideHeroVisual";
import { FloatingQuoteButton } from "@/components/guides/FloatingQuoteButton";
import { ReadingProgress } from "@/components/guides/ReadingProgress";
import { GuideCTA } from "@/components/guides/GuideCTA";
import { RelatedGuides } from "@/components/guides/RelatedGuides";
import SiteHeader from "@/components/site/SiteHeader";
import {
  getGuide,
  getRelatedGuides,
  guides,
} from "@/lib/guides/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) return {};

  return createMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    type: "article",
  });
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  const relatedGuides = getRelatedGuides(guide.relatedGuides);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: "2026-07-25",
    dateModified: "2026-07-25",
    author: {
      "@type": "Organization",
      name: "TrackFit",
    },
    publisher: {
      "@type": "Organization",
      name: "TrackFit",
    },
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: absoluteUrl("/guides"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: absoluteUrl(`/guides/${guide.slug}`),
      },
    ],
  };

  return (
    <>
    <SiteHeader />
    <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
      <ReadingProgress />
      <FloatingQuoteButton />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <article>
        <header className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm text-[#9C9E97]"
            >
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-white">
                Guides
              </Link>
              <span>/</span>
              <span className="text-[#B8F23D]">{guide.eyebrow}</span>
            </nav>

            <div className="mt-10 max-w-5xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">
                {guide.eyebrow}
              </p>

              <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                {guide.title}
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
                {guide.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#9C9E97]">
                <span>{guide.readTime}</span>
                <span>Updated {guide.updatedAt}</span>
                <span>By TrackFit installers</span>
              </div>
            </div>

            <div className="mt-12">
              <GuideHeroVisual
                title={guide.title}
                image={guide.heroImage}
              />
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-10 lg:py-20">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                In this guide
              </p>
              <nav className="mt-5 space-y-3 border-l border-white/10 pl-4">
                {guide.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm leading-6 text-[#AAACA4] transition hover:text-white"
                  >
                    {section.title}
                  </a>
                ))}
                <a
                  href="#faqs"
                  className="block text-sm leading-6 text-[#AAACA4] transition hover:text-white"
                >
                  Frequently asked questions
                </a>
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            <section className="rounded-[30px] border border-[#B8F23D]/30 bg-[#B8F23D]/10 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
                Quick answer
              </p>
              <p className="mt-4 text-lg leading-8 text-[#F4F1E8]">
                {guide.quickAnswer}
              </p>
            </section>

            <div className="mt-6">
              <InstallerInsight>
                The best result comes from choosing the track, brackets,
                fixings and mounting position together. A strong track fitted
                to the wrong surface can still fail.
              </InstallerInsight>
            </div>

            <div className="mt-14 space-y-14">
              {guide.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                >
                  <h2 className="text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
                    {section.title}
                  </h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-5 max-w-3xl text-[17px] leading-8 text-[#D8D7CF]"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="mt-6 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 leading-7 text-[#DCDDD5]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#B8F23D]"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.callout && (
                    <div className="mt-7 rounded-[24px] border border-[#B8F23D]/30 bg-white/[0.04] p-6">
                      <p className="font-semibold text-[#F4F1E8]">
                        {section.callout.title}
                      </p>
                      <p className="mt-2 leading-7 text-[#C8C8C1]">
                        {section.callout.text}
                      </p>
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="my-16">
              <GuideCTA
                serviceLabel={guide.serviceLink.label}
                serviceHref={guide.serviceLink.href}
              />
            </div>

            <section id="faqs" className="scroll-mt-28">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
                Questions answered
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Frequently asked questions
              </h2>
              <div className="mt-8">
                <FAQAccordion faqs={guide.faqs} />
              </div>
            </section>

            <div className="mt-16">
              <RelatedGuides guides={relatedGuides} />
            </div>
          </div>
        </div>
      </article>
    </main>
    </>
  );
}
