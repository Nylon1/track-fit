import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { CurtainStackCalculator } from "@/components/tools/CurtainStackCalculator";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Curtain Stack-Back Calculator | TrackFit",
  description:
    "Estimate how much track or wall space curtains may occupy when fully open.",
  path: "/tools/curtain-stack-calculator",
});

const faqs = [
  {
    question: "What is curtain stack-back?",
    answer:
      "Stack-back is the space occupied by the curtains when they are fully open. It affects how much glass remains covered and how far the track should extend beyond the window.",
  },
  {
    question: "Is curtain stack-back an exact measurement?",
    answer:
      "No. It varies with the fabric, lining, fullness, heading construction and how the curtains are dressed. The calculator provides a practical planning estimate.",
  },
  {
    question: "Do wave curtains need more stack space?",
    answer:
      "Wave curtains maintain regular folds when open, so they normally need a predictable and often slightly larger stack allowance than a simple pencil-pleat curtain.",
  },
  {
    question: "Should the track extend beyond the window by the stack-back amount?",
    answer:
      "Where wall space allows, providing enough extension for the curtain stack helps uncover more glass. The available wall, handles, radiators and furniture must also be considered.",
  },
];

export default function CurtainStackCalculatorPage() {
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
              <Link href="/tools" className="hover:text-white">
                Tools
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#B8F23D]">
                Curtain stack calculator
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Free planning tool
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Stack-Back Calculator
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Estimate how much space your curtains may occupy when
              fully open and how much of the track may remain clear.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <CurtainStackCalculator />
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">
              What the result means
            </h2>

            <p className="mt-5 leading-8 text-[#C8C8C1]">
              The estimate is intended for early planning. It helps
              show whether the curtains are likely to stack neatly
              beside the opening or continue covering part of the
              glass when open.
            </p>
          </div>

          <section className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
              Questions answered
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              Frequently asked questions
            </h2>

            <div className="mt-7 divide-y divide-white/10 rounded-[28px] border border-white/10 bg-white/[0.035] px-5 sm:px-7">
              {faqs.map((faq) => (
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
        </section>
      </main>
    </>
  );
}
