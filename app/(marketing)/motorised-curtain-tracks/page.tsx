import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import SystemNavigator from "@/components/motorised/SystemNavigator";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import { motors, motorisedArticles } from "@/lib/motorised/data";
import { createMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/site-config";

const pagePath = "/motorised-curtain-tracks";
const pageTitle = "Motorised Curtain Tracks | Supply, Specification & Installation";
const pageDescription = "Explore Forest Shuttle motors, FMS track systems, smart controls, curved tracks, recessed installations and professional TrackFit installation across the UK.";
const heroImage = "/images/motorised/forest/shuttle-motor-range.png";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  keywords: ["motorised curtain tracks", "electric curtain tracks", "smart curtain tracks", "motorised curtain track installation", "Forest Shuttle", "Forest FMS"],
  path: pagePath,
  image: heroImage,
});

const routes = [
  ["Compare motors", "/motorised-curtain-tracks/motors", "A guided comparison of Shuttle Go, iOn, L, AC and M."],
  ["Choose a track", "/motorised-curtain-tracks/track-selector", "Work through a guided route to FMS, FMS Plus, Recess or Dual."],
  ["Choose controls", "/motorised-curtain-tracks/control-selector", "Match remote, app, voice or building automation requirements."],
  ["Curved tracks", "/motorised-curtain-tracks/curved-tracks", "Plan motorised tracks for bays, bends and shaped openings."],
  ["Recessed tracks", "/motorised-curtain-tracks/recessed-tracks", "Coordinate concealed tracks, power and ceiling support."],
  ["Professional installation", "/motorised-curtain-tracks/installation", "From survey and specification through to commissioning."],
] as const;

const systems = [
  { name: "FMS", image: "/images/motorised/forest/fms-track-colours.png", alt: "Forest FMS motorised track in white and matt black", href: "/motorised-curtain-tracks/fms", text: "The versatile core track for straight and professionally planned curved layouts." },
  { name: "FMS Plus", image: "/images/motorised/forest/fms-plus.webp", alt: "Forest FMS Plus motorised curtain track", href: "/motorised-curtain-tracks/fms-plus", text: "A more architectural profile for considered interiors." },
  { name: "FMS Plus Recess", image: "/images/motorised/forest/fms-plus-recess.webp", alt: "Forest FMS Plus Recess concealed motorised track", href: "/motorised-curtain-tracks/recessed-tracks", text: "A concealed ceiling solution for new builds and coordinated renovations." },
  { name: "FMS Dual", image: "/images/motorised/forest/fms-dual.png", alt: "Forest FMS Dual two-channel motorised track", href: "/motorised-curtain-tracks/hotel-blackout", text: "A two-channel system for sheer and blackout curtain arrangements." },
] as const;

const faqs = [
  { question: "Which motorised curtain motor do I need?", answer: "The motor depends on the finished moving curtain weight, track length, bends, power availability, opening direction and control requirements. Use the guided motor comparison for an early direction, then confirm the full system through survey." },
  { question: "Can motorised tracks be curved?", answer: "Suitable Forest FMS systems can be curved. The complete bend geometry and moving load must be confirmed before manufacture." },
  { question: "Can motorised curtains work without mains power?", answer: "Forest Shuttle iOn is a rechargeable option for suitable installations, subject to curtain load, track length, bends and charging access." },
  { question: "Can the track be hidden in the ceiling?", answer: "FMS Plus Recess provides a concealed architectural solution, but the ceiling support, plaster detail, power and future service access must be coordinated early." },
  { question: "Does TrackFit install complete motorised systems?", answer: "TrackFit can assess, specify, supply, install and commission suitable motorised curtain-track systems after confirming the project conditions." },
];

export default function MotorisedCurtainTracksHub() {
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: "Motorised curtain track supply and installation", serviceType: "Motorised curtain track installation", provider: { "@type": "Organization", name: "TrackFit", url: "https://curtaintrackfitters.com" }, areaServed: { "@type": "Country", name: "United Kingdom" }, url: absoluteUrl(pagePath), description: pageDescription, image: absoluteUrl(heroImage) };

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Motorised curtain tracks", path: pagePath }]} />
      <SiteHeader />
      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

        <section className="relative overflow-hidden border-b border-white/10">
          <div aria-hidden="true" className="pointer-events-none absolute right-[-12%] top-[-30%] h-[760px] w-[760px] rounded-full bg-[#B8F23D]/10 blur-[165px]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-10 lg:py-24">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">TrackFit motorised curtain centre</p>
              <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-8xl">Motorised curtains, properly specified.</h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-[#C8C8C1] sm:text-xl">Explore motors, tracks, controls, curves and recessed systems, then have the complete installation professionally surveyed and fitted.</p>
              <div className="mt-9 flex flex-wrap gap-3"><Link href="#system-navigator" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]">Build your direction →</Link><Link href="/tools/curtain-weight-motor-selector" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold">Calculate curtain weight</Link><Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold">Request a survey</Link></div>
            </div>
            <figure className="overflow-hidden rounded-[34px] border border-white/10 bg-white p-5 sm:p-8">
              <div className="relative aspect-[4/3]"><Image src={heroImage} alt="Forest Shuttle motor range for motorised curtain tracks" fill priority sizes="(min-width: 1024px) 42vw, 92vw" className="object-contain" /></div>
              <figcaption className="mt-4 text-right text-xs text-black/45">Product imagery courtesy of Forest Group.</figcaption>
            </figure>
          </div>
        </section>

        <section id="system-navigator" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><SystemNavigator /></section>

        <section className="border-y border-white/10 bg-[#0E100F]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Explore the complete system</p><h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Every major decision, connected.</h2><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{routes.map(([title, href, text]) => <Link key={href} href={href} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#B8F23D]/35"><h3 className="text-2xl font-semibold">{title}</h3><p className="mt-4 leading-7 text-[#AAACA4]">{text}</p><span className="mt-7 inline-flex font-semibold text-[#B8F23D]">Open guide →</span></Link>)}</div></div></section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Forest Shuttle motors</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Five motors. Different jobs.</h2></div><Link href="/motorised-curtain-tracks/motors" className="font-semibold text-[#B8F23D]">Use the guided comparison →</Link></div><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">{motors.map((motor) => <Link key={motor.name} href={motor.href} className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5 transition hover:border-[#B8F23D]/35"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B8F23D]">{motor.load}</p><h3 className="mt-5 text-2xl font-semibold">{motor.name}</h3><p className="mt-3 text-sm font-semibold text-white/65">{motor.bestFor}</p><p className="mt-4 text-sm leading-6 text-[#AAACA4]">{motor.detail}</p></Link>)}</div></section>

        <section className="border-y border-white/10 bg-white/[0.02]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Forest FMS track systems</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">See how each system is built.</h2><div className="mt-10 grid gap-5 md:grid-cols-2">{systems.map((system) => <Link key={system.name} href={system.href} className="overflow-hidden rounded-[30px] border border-white/10 bg-[#080A09] transition hover:border-[#B8F23D]/35"><div className="relative aspect-[16/9] bg-white p-5"><Image src={system.image} alt={system.alt} fill sizes="(min-width: 768px) 46vw, 92vw" className="object-contain p-5" /></div><div className="p-7"><h3 className="text-3xl font-semibold">{system.name}</h3><p className="mt-4 leading-7 text-[#AAACA4]">{system.text}</p><span className="mt-7 inline-flex font-semibold text-[#B8F23D]">Explore system →</span></div></Link>)}</div><p className="mt-6 text-right text-xs text-white/35">Product imagery courtesy of Forest Group.</p></div></section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><article className="rounded-[34px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.08] p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Separate planning tool</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Not sure how heavy your curtains will be?</h2><p className="mt-5 max-w-2xl leading-8 text-[#C8C8C1]">Estimate finished curtain weight from width, drop, fullness, fabric, lining and interlining.</p><Link href="/tools/curtain-weight-motor-selector" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]">Open curtain-weight calculator →</Link></article><article className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Need certainty?</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Survey the complete system.</h2><p className="mt-5 leading-8 text-[#AAACA4]">TrackFit can review the curtain, opening, fixing structure, power, controls and installation access before final specification.</p><Link href="/quote/postcode" className="mt-7 inline-flex font-semibold text-[#B8F23D]">Start an enquiry →</Link></article></div></section>

        <section className="border-y border-white/10 bg-[#0E100F]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Motorised curtain articles</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Detailed answers before you buy.</h2><div className="mt-10 grid gap-5 md:grid-cols-2">{motorisedArticles.map(([slug, title, summary], index) => <Link key={slug} href={`/articles/motorised-curtain-tracks/${slug}`} className="flex gap-5 rounded-[26px] border border-white/10 bg-white/[0.035] p-6"><span className="text-sm font-bold text-[#B8F23D]">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-[#AAACA4]">{summary}</p></div></Link>)}</div></div></section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Motorised curtain track FAQs</h2><div className="mt-8 divide-y divide-white/10 rounded-[30px] border border-white/10 bg-white/[0.035] px-6">{faqs.map((faq) => <details key={faq.question} className="py-5"><summary className="cursor-pointer text-lg font-semibold">{faq.question}</summary><p className="pt-4 leading-7 text-[#AAACA4]">{faq.answer}</p></details>)}</div><Link href="/motorised-curtain-tracks/faqs" className="mt-7 inline-flex font-semibold text-[#B8F23D]">View the complete FAQ centre →</Link></section>

        <section className="border-t border-white/10"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="rounded-[36px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.09] px-6 py-14 text-center sm:px-10 lg:py-20"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">TrackFit motorised systems</p><h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">Ready to plan the complete installation?</h2><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#B8BAB2]">Send the postcode, dimensions, photographs and control requirements for an initial review.</p><Link href="/quote/postcode" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-8 font-bold text-[#080A09]">Start your motorised-track enquiry →</Link></div></div></section>
      </main>
    </>
  );
}
