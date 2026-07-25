import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import { CurtainWidthCalculator } from "@/components/tools/CurtainWidthCalculator";
import { absoluteUrl } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Curtain Width Calculator | TrackFit",
  description:
    "Calculate the finished curtain width needed from your track or pole width, heading and fullness.",
  alternates: {
    canonical: absoluteUrl("/tools/curtain-width-calculator"),
  },
};

const faqs = [
  {
    question: "Should I measure the window or the curtain track?",
    answer:
      "Use the full track or pole width the curtains need to cover. This usually extends beyond the actual window opening.",
  },
  {
    question: "What does 2× fullness mean?",
    answer:
      "It means the total finished curtain width is twice the track or pole width. A 300 cm track at 2× fullness needs approximately 600 cm of finished curtain width.",
  },
  {
    question: "How wide should each curtain be in a pair?",
    answer:
      "Divide the total finished curtain width equally between the two curtains. The calculator does this automatically.",
  },
  {
    question: "Does this calculate how much fabric I need?",
    answer:
      "No. It calculates finished curtain width. Fabric quantity also depends on fabric width, drop, pattern repeat, seams, hems and heading construction.",
  },
];

export default function CurtainWidthCalculatorPage() {
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
                Curtain width calculator
              </span>
            </nav>

            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">
              Free curtain planning tool
            </p>

            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Width Calculator
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Enter the full track or pole width, choose the curtain
              heading and fullness, and calculate the recommended
              finished curtain width.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <CurtainWidthCalculator />
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">
              How the calculation works
            </h2>

            <p className="mt-5 leading-8 text-[#C8C8C1]">
              The calculator multiplies the full track or pole width
              by the selected fullness. If you choose a pair, the
              total is split equally between the two curtains.
            </p>

            <div className="mt-7 rounded-[22px] bg-[#080A09] p-5 font-mono text-sm text-[#B8F23D]">
              finished curtain width = track width × fullness
            </div>
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
