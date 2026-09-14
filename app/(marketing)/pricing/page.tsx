import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import JsonLd from "@/components/seo/JsonLd";
import SiteHeader from "@/components/site/SiteHeader";
import { priceFactors, pricingGuides } from "@/lib/pricing/data";
import { absoluteUrl } from "@/lib/seo/site-config";
import { createMetadata } from "@/lib/seo/metadata";

const pagePath = "/pricing";
const pageTitle = "Curtain Track Installation Prices UK";
const pageDescription = "View indicative TrackFit prices for straight, bay, curved, double, high-level and Forest motorised curtain-track supply and installation across England.";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  image: "/images/showcase/forest/dsxl-hotel.webp",
  keywords: [
    "curtain track installation prices",
    "curtain track fitting cost UK",
    "bay window curtain track price",
    "Forest KS supply and fit",
    "motorised curtain track installation cost",
  ],
});

const faqs = [
  {
    question: "Are these fixed prices?",
    answer: "No. They are realistic planning ranges for typical projects. TrackFit confirms a written price after reviewing the measurements, photographs, curtain details, fixing surface and access.",
  },
  {
    question: "Are curtains included?",
    answer: "No. The guide prices cover the track and installation scope described on each card. Curtains, electrical work, decorating and structural repairs are not included unless the written quotation says otherwise.",
  },
  {
    question: "Why can two similar windows cost differently?",
    answer: "The visible window is only part of the job. Track length, curtain weight, brackets, bends, joins, fixing substrate, height, parking and access can all change the correct installation method.",
  },
  {
    question: "Can photographs help confirm the price?",
    answer: "Yes. Clear wide photographs of the complete window and close photographs of the wall or ceiling fixing area help TrackFit narrow the scope before arranging installation.",
  },
];

export default function PricingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Curtain track supply and installation",
    provider: { "@type": "Organization", name: "TrackFit", url: "https://curtaintrackfitters.com" },
    areaServed: { "@type": "Country", name: "England" },
    url: absoluteUrl(pagePath),
    description: pageDescription,
  };

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
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Pricing", path: pagePath }]} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <SiteHeader />

      <main className="min-h-screen overflow-hidden bg-[#080A09] text-[#F4F1E8]">
        <section className="relative overflow-hidden border-b border-white/10">
          <div aria-hidden="true" className="absolute right-[-12rem] top-[-15rem] h-[40rem] w-[40rem] rounded-full bg-[#B8F23D]/10 blur-[150px]" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:px-10 lg:py-28">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Clear guide pricing</p>
              <h1 className="mt-5 text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-[82px]">
                Know the likely range before you enquire.
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72 sm:text-xl">
                Use these realistic project ranges to plan your budget. Every TrackFit quotation is then refined around your actual opening, curtains, track system, fixing surface and access.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="#guide-prices" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09] transition hover:scale-[1.02]">See guide prices ↓</Link>
                <Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full border border-white/20 bg-black/20 px-7 font-semibold backdrop-blur-xl transition hover:border-white/40 hover:bg-white/10">Get my exact quote</Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[34px] border border-white/12 bg-[#252925] shadow-[0_35px_90px_rgba(0,0,0,0.42)]">
                <Image src="/images/showcase/forest/dsxl-hotel.webp" alt="Full-height curtains installed in a contemporary room" fill priority sizes="(min-width: 1024px) 42vw, 90vw" className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-6 pb-6 pt-20">
                  <p className="text-sm font-semibold">Tracks selected for the room, curtains and finish</p>
                  <p className="mt-1 text-xs text-white/60">Setting imagery courtesy of Forest Group</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-3 rounded-2xl border border-white/12 bg-[#121512]/95 px-5 py-4 shadow-2xl backdrop-blur sm:-left-8">
                <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#B8F23D]">Straight track</span>
                <strong className="mt-1 block text-xl">from £145 installed</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="guide-prices" className="bg-[#F2EFE7] text-[#101310]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#557600]">Typical project ranges</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">A useful starting point, not a mystery price.</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-black/58">Guide prices are for planning and are not an offer or fixed quotation. Final scope and price are confirmed in writing before work is booked.</p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {pricingGuides.map((guide) => (
                <article id={guide.slug} key={guide.slug} className={`group overflow-hidden rounded-[32px] border bg-white shadow-[0_18px_55px_rgba(0,0,0,0.08)] ${guide.featured ? "border-[#739900]/35" : "border-black/10"}`}>
                  <div className="grid h-full sm:grid-cols-[0.82fr_1.18fr]">
                    <div className="relative min-h-[260px] overflow-hidden bg-[#E8E6DF] sm:min-h-full">
                      <Image src={guide.image} alt={guide.imageAlt} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 38vw, 94vw" className={guide.slug === "forest-ks-supply-fit" || guide.slug === "motorised" ? "object-contain p-8" : "object-cover transition duration-700 group-hover:scale-[1.035]"} />
                      <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur">{guide.image.includes("forest") ? "Forest Group imagery" : "Installation detail"}</span>
                    </div>
                    <div className="flex flex-col p-7 sm:p-8">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#557600]">{guide.eyebrow}</p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{guide.title}</h3>
                      <p className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{guide.price}</p>
                      <p className="mt-1 text-xs text-black/45">{guide.unit}</p>
                      <p className="mt-5 text-sm leading-6 text-black/62">{guide.description}</p>
                      <ul className="mt-5 space-y-2">
                        {guide.includes.map((item) => <li key={item} className="flex gap-2 text-sm text-black/70"><span className="font-bold text-[#668800]">✓</span><span>{item}</span></li>)}
                      </ul>
                      <p className="mt-6 border-t border-black/10 pt-5 text-xs leading-5 text-black/48"><strong className="text-black/70">Best for:</strong> {guide.bestFor}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-9 rounded-[28px] border border-black/10 bg-[#111411] p-7 text-white sm:p-9">
              <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Important</p>
                  <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Curtains are not included in these track prices.</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-white/60">Electrical work, decorating, structural repairs, parking, permits and unusual access are also excluded unless your written quotation includes them.</p>
                </div>
                <Link href="/quote/postcode" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]">Send photos for a firmer price →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0B0D0C]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">What changes the price?</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">The track is only one part of the installation.</h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {priceFactors.map((factor, index) => (
                <article key={factor.title} className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6">
                  <span className="text-xs font-bold text-[#B8F23D]">0{index + 1}</span>
                  <h3 className="mt-8 text-xl font-semibold">{factor.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{factor.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F2EFE7] text-[#101310]">
          <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#557600]">See the finish</p>
            <div className="mt-4 grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Tracks should disappear. Curtains should feel considered.</h2>
              <p className="text-base leading-7 text-black/60">Different rooms need different systems. These Forest Group examples show discreet domestic tracks, full-height hospitality curtains, wave headings and flexible commercial separation.</p>
            </div>
            <div className="mt-10 grid auto-rows-[230px] gap-4 md:grid-cols-3">
              {[
                ["/images/showcase/forest/hotel-curtains.webp", "Layered curtains in a hospitality dining setting", "Layered hospitality"],
                ["/images/showcase/forest/recessed-wave.jpg", "White wave curtains beneath a recessed track", "Recessed wave"],
                ["/images/showcase/forest/office-curtains.webp", "Curtain system used to divide a commercial interior", "Flexible commercial space"],
              ].map(([src, alt, label], index) => (
                <figure key={src} className={`group relative overflow-hidden rounded-[28px] bg-[#DDDAD2] ${index === 0 ? "md:col-span-2" : ""}`}>
                  <Image src={src} alt={alt} fill sizes={index === 0 ? "(min-width: 768px) 64vw, 94vw" : "(min-width: 768px) 31vw, 94vw"} className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pt-14 text-sm font-semibold text-white">{label}</figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-5 text-right text-xs text-black/42">Product and setting imagery courtesy of Forest Group.</p>
          </div>
        </section>

        <section className="relative overflow-hidden border-t border-white/10">
          <div aria-hidden="true" className="absolute left-1/2 top-[-240px] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-[#B8F23D]/12 blur-[150px]" />
          <div className="relative mx-auto max-w-5xl px-5 py-22 text-center sm:px-8 lg:py-28">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">Turn the guide into your price</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">Show us the window. We will narrow the range.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/58">Send your postcode, approximate measurements and clear photographs. You will receive a project-specific written quotation before booking.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-8 font-bold text-[#080A09] transition hover:scale-[1.02]">Get my TrackFit price →</Link>
              <a href="tel:08007720367" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-8 font-semibold transition hover:border-white/35">Call 0800 772 0367</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
