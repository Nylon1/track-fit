import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { CurtainFabricCalculator } from "@/components/tools/CurtainFabricCalculator";
import { absoluteUrl } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Curtain Fabric Calculator | TrackFit",
  description:
    "Estimate how many metres of curtain fabric you may need from the track width, finished drop, fullness and fabric width.",
  alternates: {
    canonical: absoluteUrl("/tools/curtain-fabric-calculator"),
  },
};

const faqs = [
  {
    question: "How do I calculate how much curtain fabric I need?",
    answer:
      "First calculate the total finished curtain width, then divide by the fabric width to find the number of widths needed. Multiply that by the cut length for each width.",
  },
  {
    question: "Why does pattern repeat increase fabric quantity?",
    answer:
      "Each cut may need to be rounded up to the next full pattern repeat so the design aligns across all joined widths.",
  },
  {
    question: "What fabric width should I enter?",
    answer:
      "Enter the usable width shown by the fabric supplier. Common furnishing fabrics are around 137–140 cm wide, but always check the exact specification.",
  },
  {
    question: "Is this result exact enough to order fabric?",
    answer:
      "Use it for early planning only. A curtain maker should confirm pattern matching, hems, seams, heading construction and any workroom allowances before ordering.",
  },
];

export default function CurtainFabricCalculatorPage() {
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
                Curtain fabric calculator
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Free curtain planning tool
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Fabric Calculator
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Estimate the number of fabric widths and total metres
              required for a curtain project.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <CurtainFabricCalculator />
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">
              How the calculation works
            </h2>

            <p className="mt-5 leading-8 text-[#C8C8C1]">
              The calculator estimates the total finished curtain
              width, works out how many fabric widths are needed, then
              multiplies those widths by the cut length.
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
