import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import { CurtainDropCalculator } from "@/components/tools/CurtainDropCalculator";
import { absoluteUrl } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Curtain Drop Calculator | TrackFit",
  description: "Calculate a recommended finished curtain drop from your measurement, finish style and curtain heading.",
  alternates: { canonical: absoluteUrl("/tools/curtain-drop-calculator") },
};

const faqs = [
  { question: "Should curtains touch the floor?", answer: "Touching the floor gives a clean full-length finish. A small hover is often more practical where floors are uneven or easy cleaning matters." },
  { question: "How do I measure curtain drop from a ceiling track?", answer: "Measure from the underside of the track or the point where the curtain hook will hang, depending on the heading system." },
  { question: "What if the floor is uneven?", answer: "Measure at several points across the track. Where the curtain must not drag, use the shortest suitable measurement." },
  { question: "Do wave curtains need a different drop measurement?", answer: "Wave curtains should generally be measured from the underside of the track to the finished hem, but the exact hook and carrier system should be confirmed." },
];

export default function CurtainDropCalculatorPage() {
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <nav className="text-sm text-[#9C9E97]"><Link href="/tools" className="hover:text-white">Tools</Link><span className="mx-2">/</span><span className="text-[#B8F23D]">Curtain drop calculator</span></nav>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-[#B8F23D]">Free measuring tool</p>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Curtain Drop Calculator</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#D8D7CF] sm:text-xl">Enter your measured drop, choose where the curtain should finish and calculate a practical finished length.</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20"><CurtainDropCalculator /></section>
        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold">How the calculation works</h2>
            <p className="mt-5 leading-8 text-[#C8C8C1]">The calculator starts with your measured drop, then adds or deducts the allowance needed for the selected finish. The result is rounded to the nearest half centimetre.</p>
            <div className="mt-7 rounded-[22px] bg-[#080A09] p-5 font-mono text-sm text-[#B8F23D]">finished drop = measured drop + finish adjustment</div>
          </div>
          <section className="mt-16">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Questions answered</p>
            <h2 className="mt-3 text-3xl font-semibold">Frequently asked questions</h2>
            <div className="mt-7 divide-y divide-white/10 rounded-[28px] border border-white/10 bg-white/[0.035] px-5 sm:px-7">
              {faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none justify-between gap-5 text-lg font-semibold">{faq.question}<span className="text-2xl text-[#B8F23D] transition group-open:rotate-45">+</span></summary><p className="pt-4 leading-7 text-[#AAACA4]">{faq.answer}</p></details>)}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
