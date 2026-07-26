import type { Metadata } from "next";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import HealthcareSpecificationChecker from "@/components/tools/HealthcareSpecificationChecker";
import { createMetadata } from "@/lib/seo/metadata";

const pageTitle =
  "Healthcare Curtain Track Specification Checker";

const pageDescription =
  "Plan a hospital, clinic or care-home curtain-track requirement. Review track layout, ceiling support, privacy needs, healthcare checks and likely Forest track systems before requesting a quotation.";

const pagePath =
  "/tools/healthcare-curtain-track-specification-checker";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "healthcare curtain track specification checker",
    "hospital curtain track calculator",
    "medical curtain track planner",
    "hospital cubicle curtain track calculator",
    "healthcare curtain track systems",
    "medical privacy curtain tracks",
    "Forest MTS specification",
    "care home curtain tracks",
    "hospital curtain track installation",
    "NHS curtain track guidance",
  ],
});

const faqs = [
  {
    question: "What does the healthcare curtain track checker do?",
    answer:
      "It helps you organise the early information needed for a healthcare curtain-track project, including the application, layout, dimensions, ceiling support, maintenance needs and missing specification information.",
  },
  {
    question: "Does the tool provide an NHS-approved specification?",
    answer:
      "No. It provides early-stage planning guidance only. Final suitability must be confirmed against the current project specification, healthcare-estates requirements, structural design, fire strategy and infection-control requirements.",
  },
  {
    question: "Can it suggest a Forest track system?",
    answer:
      "Yes. Based on the answers entered, it can indicate which Forest system family may be worth investigating, such as MTS for medical privacy separation, KS for suitable lighter window-curtain applications, or CS and CCS for heavier contract use.",
  },
  {
    question: "Can it calculate total track length?",
    answer:
      "Yes. It can estimate total track length from the selected layout, entered dimensions and number of repeated rooms or bed bays. The result is a planning estimate rather than a final bill of materials.",
  },
  {
    question: "Can I use the result to request a quotation?",
    answer:
      "Yes. The result highlights missing information and gives you a structured summary to copy, print or send as part of a TrackFit project enquiry.",
  },
];

export default function HealthcareSpecificationCheckerPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: pageTitle,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: pageDescription,
    url: `https://curtaintrackfitters.com${pagePath}`,
    provider: {
      "@type": "Organization",
      name: "TrackFit",
      url: "https://curtaintrackfitters.com",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          {
            name: "Healthcare specification checker",
            path: pagePath,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webApplicationSchema),
          }}
        />

        <section className="relative overflow-hidden border-b border-white/10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute right-[-15%] top-[-30%] h-[720px] w-[720px] rounded-full bg-[#B8F23D]/[0.09] blur-[160px]" />
            <div className="absolute left-[-10%] bottom-[-50%] h-[520px] w-[520px] rounded-full bg-white/[0.035] blur-[150px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-white/45">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/tools" className="hover:text-white">
                Tools
              </Link>
              <span>/</span>
              <span className="text-[#B8F23D]">
                Healthcare specification checker
              </span>
            </nav>

            <div className="mt-10 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">
                  Free healthcare planning tool
                </p>

                <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.97] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                  Healthcare curtain-track specification
                  checker.
                </h1>

                <p className="mt-7 max-w-3xl text-lg leading-8 text-[#C8C8C1] sm:text-xl">
                  Plan a hospital, clinic, treatment-room or
                  care-home curtain-track requirement before
                  requesting a formal specification or
                  quotation.
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-sm">
                  {[
                    "Track-length estimate",
                    "System direction",
                    "Ceiling checks",
                    "Compliance gaps",
                    "Printable summary",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-white/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <aside className="rounded-[30px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.08] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                  Planning guidance only
                </p>

                <h2 className="mt-4 text-3xl font-semibold">
                  This is not an approval or compliance
                  certificate.
                </h2>

                <p className="mt-5 leading-8 text-[#C8C8C1]">
                  Final suitability must be checked against
                  the project specification, structural
                  fixing design, fire strategy,
                  infection-control requirements and any
                  relevant healthcare-estates guidance.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <HealthcareSpecificationChecker />

        <section className="border-t border-white/10 bg-[#0E100F]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                  Why this tool matters
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                  Better project information before anyone
                  prices the work.
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  {
                    title: "Catch missing information",
                    text: "Identify absent drawings, ceiling support details, curtain weights and approval requirements before they delay the project.",
                  },
                  {
                    title: "Estimate track quantities",
                    text: "Calculate an early planning length for straight, L-shaped, U-shaped and repeated bed-bay layouts.",
                  },
                  {
                    title: "Shortlist a system family",
                    text: "See which Forest system family may be worth investigating based on the application and operating requirement.",
                  },
                  {
                    title: "Improve the quotation brief",
                    text: "Turn a vague request into a structured summary that installers, contractors and estates teams can review.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6"
                  >
                    <h3 className="text-2xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-4 leading-7 text-[#AAACA4]">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                Healthcare installation
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                Need TrackFit to review the project?
              </h2>
              <p className="mt-5 leading-8 text-[#AAACA4]">
                TrackFit can assess suitable manual
                healthcare, privacy and separation-track
                systems for hospitals, clinics, treatment
                rooms and care facilities.
              </p>
              <Link
                href="/services/healthcare-curtain-track-installation"
                className="mt-7 inline-flex font-semibold text-[#B8F23D]"
              >
                View healthcare installation service →
              </Link>
            </article>

            <article className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                Forest medical track
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                Explore the Forest MTS system.
              </h2>
              <p className="mt-5 leading-8 text-[#AAACA4]">
                Review TrackFit’s practical guide to the
                Forest Medical Track System for flexible
                privacy and separation layouts.
              </p>
              <Link
                href="/brands/forest-group/mts"
                className="mt-7 inline-flex font-semibold text-[#B8F23D]"
              >
                View Forest MTS guide →
              </Link>
            </article>
          </div>
        </section>

        <section className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <h2 className="text-4xl font-semibold tracking-[-0.04em]">
              Healthcare curtain-track questions
            </h2>

            <div className="mt-8 divide-y divide-white/10 rounded-[30px] border border-white/10 bg-white/[0.035] px-6">
              {faqs.map((faq) => (
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
          </div>
        </section>
      </main>
    </>
  );
}
