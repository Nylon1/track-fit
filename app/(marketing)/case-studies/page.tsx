import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { caseStudies } from "@/lib/case-studies/data";
import { absoluteUrl } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Curtain Track Installation Case Studies",
  description: "TrackFit project studies covering homes, hotels, apartments, bays, wave curtains, recessed tracks and commercial installations across England.",
  alternates: { canonical: absoluteUrl("/case-studies") },
};

export default function CaseStudiesPage() {
  const regions = Array.from(new Set(caseStudies.map((study) => study.region)));
  return <>
    <BreadcrumbSchema items={[{name:"Home",path:"/"},{name:"Case studies",path:"/case-studies"}]} />
    <SiteHeader />
    <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
      <section className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">TrackFit project library</p>
        <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Curtain-track installation case studies</h1>
        <p className="mt-7 max-w-4xl text-lg leading-8 text-[#D8D7CF]">Thirty structured project records across London, the South East and the North West, covering different track systems, buildings and installation challenges.</p>
      </div></section>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        {regions.map((region) => { const items=caseStudies.filter((s)=>s.region===region); return <section key={region} className="mb-16">
          <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Regional projects</p><h2 className="mt-3 text-3xl font-semibold">{region}</h2></div><p className="text-sm text-[#9C9E97]">{items.length} studies</p></div>
          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((study)=><Link key={study.slug} href={`/case-studies/${study.slug}`} className="group rounded-[28px] border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#B8F23D]/45">
            <div className="flex flex-wrap gap-2"><span className="rounded-full bg-[#B8F23D]/10 px-3 py-1 text-xs font-semibold text-[#B8F23D]">{study.location}</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#AAACA4]">{study.category}</span></div>
            <h3 className="mt-5 text-2xl font-semibold leading-tight">{study.title}</h3><p className="mt-4 leading-7 text-[#AAACA4]">{study.summary}</p>
            <div className="mt-6 border-t border-white/10 pt-4 text-sm text-[#D8D7CF]">{study.system} · {study.mounting}</div><span className="mt-7 inline-flex font-semibold group-hover:text-[#B8F23D]">Read case study →</span>
          </Link>)}</div>
        </section>})}
      </section>
    </main>
  </>;
}
