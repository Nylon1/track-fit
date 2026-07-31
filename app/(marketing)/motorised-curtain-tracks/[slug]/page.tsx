import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import { getMotorisedPage, motorisedPages } from "@/lib/motorised/data";
import { absoluteUrl } from "@/lib/seo/site-config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return motorisedPages.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getMotorisedPage(slug);
  if (!page) return {};
  return {
    title: `${page.title} | TrackFit`,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: absoluteUrl(`/motorised-curtain-tracks/${page.slug}`) },
    openGraph: { title: page.title, description: page.description, url: absoluteUrl(`/motorised-curtain-tracks/${page.slug}`), type: "website" },
  };
}

export default async function MotorisedGuidePage({ params }: Props) {
  const { slug } = await params;
  const page = getMotorisedPage(slug);
  if (!page) notFound();

  const relatedPages = page.related.map((item) => getMotorisedPage(item)).filter(Boolean);
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Motorised curtain tracks", path: "/motorised-curtain-tracks" }, { name: page.title, path: `/motorised-curtain-tracks/${page.slug}` }]} />
      <SiteHeader />
      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <section className="relative overflow-hidden border-b border-white/10">
          <div aria-hidden="true" className="pointer-events-none absolute right-[-12%] top-[-45%] h-[650px] w-[650px] rounded-full bg-[#B8F23D]/10 blur-[150px]" />
          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
            <nav className="text-sm text-white/45"><Link href="/motorised-curtain-tracks" className="hover:text-white">Motorised curtain tracks</Link><span className="mx-2">/</span><span className="text-[#B8F23D]">{page.title}</span></nav>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">{page.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.97] tracking-[-0.05em] sm:text-6xl lg:text-7xl">{page.title}</h1>
            <p className="mt-7 max-w-4xl text-lg leading-8 text-[#C8C8C1] sm:text-xl">{page.description}</p>
            <div className="mt-9 flex flex-wrap gap-3"><Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]">Request a system review →</Link><Link href="/tools/curtain-weight-motor-selector" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold">Calculate curtain weight</Link></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">System overview</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">What this means for your project.</h2><p className="mt-5 leading-8 text-[#AAACA4]">{page.intro}</p></div><div className="grid gap-5 sm:grid-cols-2">{page.highlights.map((item, index) => <article key={item.title} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6"><span className="text-sm font-bold text-[#B8F23D]">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-6 text-2xl font-semibold">{item.title}</h3><p className="mt-4 leading-7 text-[#AAACA4]">{item.text}</p></article>)}</div></div></section>

        <section className="border-y border-white/10 bg-[#0E100F]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="grid gap-6 lg:grid-cols-3"><article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">01 · Curtain</p><h2 className="mt-5 text-3xl font-semibold">Confirm the moving load.</h2><p className="mt-4 leading-7 text-[#AAACA4]">Use the finished curtain weight, not a rough fabric estimate. Include fullness, lining, interlining, heading and accessories.</p></article><article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">02 · Track</p><h2 className="mt-5 text-3xl font-semibold">Plan the complete route.</h2><p className="mt-4 leading-7 text-[#AAACA4]">Track length, bends, opening direction, stack position, brackets and fixing support all affect the installation.</p></article><article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">03 · Controls</p><h2 className="mt-5 text-3xl font-semibold">Choose control early.</h2><p className="mt-4 leading-7 text-[#AAACA4]">Power, app, voice, remote and building automation requirements should be agreed before the system is ordered.</p></article></div></div></section>

        {relatedPages.length > 0 && <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Continue exploring</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Connected system guides</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{relatedPages.map((related) => related && <Link key={related.slug} href={`/motorised-curtain-tracks/${related.slug}`} className="rounded-[26px] border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#B8F23D]/35"><h3 className="text-2xl font-semibold">{related.title}</h3><p className="mt-4 leading-7 text-[#AAACA4]">{related.description}</p><span className="mt-6 inline-flex font-semibold text-[#B8F23D]">Open guide →</span></Link>)}</div></section>}

        <section className="border-y border-white/10 bg-white/[0.02]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><h2 className="text-4xl font-semibold tracking-[-0.04em]">Frequently asked questions</h2><div className="mt-8 divide-y divide-white/10 rounded-[30px] border border-white/10 bg-[#080A09] px-6">{page.faqs.map((faq) => <details key={faq.question} className="py-5"><summary className="cursor-pointer text-lg font-semibold">{faq.question}</summary><p className="pt-4 leading-7 text-[#AAACA4]">{faq.answer}</p></details>)}</div><Link href="/motorised-curtain-tracks/faqs" className="mt-7 inline-flex font-semibold text-[#B8F23D]">Visit the complete FAQ centre →</Link></div></section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="rounded-[36px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.09] px-6 py-14 text-center sm:px-10"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Preliminary guidance</p><h2 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Confirm the exact motor, track and controls before ordering.</h2><p className="mx-auto mt-6 max-w-2xl leading-8 text-[#B8BAB2]">Published limits generally apply to stated configurations. Curves, track length, curtain construction and controls require project-specific confirmation.</p><Link href="/quote/postcode" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-8 font-bold text-[#080A09]">Start your project enquiry →</Link></div></section>
      </main>
    </>
  );
}
