import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import { TrackLengthCalculator } from "@/components/tools/TrackLengthCalculator";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Curtain Track Length Calculator | TrackFit",
  description: "Calculate a recommended curtain track length from your opening width and preferred side extension.",
  path: "/tools/curtain-track-length-calculator",
});

const faqs = [
  {
    question: "How much wider should a curtain track be than the window?",
    answer: "For a straightforward window, around 20–30 cm beyond each side is a useful starting point. More may be needed for thick curtains, wide doors or greater stack-back.",
  },
  {
    question: "Should I measure the glass or the full opening?",
    answer: "Measure the full window or door opening. The calculator then adds the selected extension at each side.",
  },
  {
    question: "Can I use this calculator for a bay window?",
    answer: "It can provide a basic straight-width estimate, but a bay needs every section and angle measured separately.",
  },
  {
    question: "Can the track be longer than the result?",
    answer: "Yes, where wall space allows. A longer track may improve stack-back and light control if it is properly supported.",
  },
];

export default function CalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <nav className="text-sm text-[#9C9E97]">
              <Link href="/tools" className="hover:text-white">Tools</Link>
              <span className="mx-2">/</span>
              <span className="text-[#B8F23D]">Track length calculator</span>
            </nav>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">Free measurement tool</p>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Curtain Track Length Calculator
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">
              Enter your opening width and choose how far the track should extend at each side. Your result updates instantly.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <TrackLengthCalculator />
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">How the calculation works</h2>
            <p className="mt-5 leading-8 text-[#C8C8C1]">
              Recommended track length equals the opening width plus the selected extension at the left and right. It is a planning estimate, not a substitute for checking the fixing surface, curtain weight or manufacturer guidance.
            </p>
            <div className="mt-7 rounded-[22px] bg-[#080A09] p-5 font-mono text-sm text-[#B8F23D]">
              track length = opening width + left extension + right extension
            </div>
          </div>

          <section className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Questions answered</p>
            <h2 className="mt-3 text-3xl font-semibold">Frequently asked questions</h2>
            <div className="mt-7 divide-y divide-white/10 rounded-[28px] border border-white/10 bg-white/[0.035] px-5 sm:px-7">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none justify-between gap-5 text-lg font-semibold">
                    {faq.question}
                    <span className="text-2xl text-[#B8F23D] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pt-4 leading-7 text-[#AAACA4]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

       <section className="mt-16 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035]">
  <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
    <div className="flex flex-col items-center p-7 text-center sm:p-10 lg:p-12">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">
        Professional installation
      </p>

      <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.035em] text-[#F4F1E8] sm:text-5xl">
        Your measurement is ready. Now make sure the installation is right.
      </h2>

      <p className="mt-5 max-w-2xl text-base leading-7 text-[#AAACA4] sm:text-lg">
        Send us the result and a few photos. We’ll check the fixing
        surface, mounting position, track type and curtain clearance
        before providing a quote.
      </p>

      <div className="mt-8 grid w-full max-w-3xl gap-x-8 gap-y-4 sm:grid-cols-2">
        {[
          "Check the recommended track length",
          "Assess ceiling or wall mounting",
          "Review the fixing surface",
          "Check clearance around handles and radiators",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center justify-center gap-3"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#B8F23D] text-xs font-bold text-[#080A09]">
              ✓
            </span>

            <p className="text-sm leading-6 text-[#D8D7CF]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="border-t border-white/10 bg-[#0D100E] p-7 text-center sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
        Send us
      </p>

      <ul className="mt-6 space-y-4 text-sm leading-6 text-[#D8D7CF]">
        <li className="flex items-center justify-center gap-3">
          <span className="font-semibold text-[#B8F23D]">01</span>
          <span>Your postcode</span>
        </li>

        <li className="flex items-center justify-center gap-3">
          <span className="font-semibold text-[#B8F23D]">02</span>
          <span>Your measurements</span>
        </li>

        <li className="flex items-center justify-center gap-3">
          <span className="font-semibold text-[#B8F23D]">03</span>
          <span>Photos of the window and fixing area</span>
        </li>

        <li className="flex items-center justify-center gap-3">
          <span className="font-semibold text-[#B8F23D]">04</span>
          <span>Details of any track already purchased</span>
        </li>
      </ul>

      <Link
        href="/quote/postcode"
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#B8F23D] px-6 font-semibold text-[#080A09] transition hover:bg-[#C7FF4A]"
      >
        Get my installation quote
      </Link>

      <Link
        href="/guides/how-to-measure-for-a-curtain-track"
        className="mt-4 block text-center text-sm font-semibold text-[#F4F1E8] transition hover:text-[#B8F23D]"
      >
        Need help measuring? →
      </Link>
    </div>
  </div>
</section>
        </section>
      </main>
    </>
  );
}
