import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import { createMetadata } from "@/lib/seo/metadata";

const pagePath = "/trade/healthcare";
export const metadata: Metadata = createMetadata({
  title: "Healthcare Curtain Track Installation for Trade Projects",
  description: "Healthcare curtain-track survey, supply and installation support for hospitals, clinics, care groups, contractors, architects and facilities teams.",
  path: pagePath,
  keywords: ["healthcare curtain track contractor", "hospital curtain track installation contractor", "medical curtain track supplier installer", "care home curtain track contractor", "Forest MTS installer"],
});

const support = ["Project and drawing review", "Track-layout and system-selection input", "Site surveys and fixing-route assessment", "Forest manual track supply", "Phased and multi-room installation", "Access-equipment coordination", "Room schedules and exception reporting", "Operational testing and handover"];
const sectors = ["NHS and hospital estates", "Private hospitals and clinics", "Care-home and nursing-home groups", "Main contractors", "Healthcare fit-out contractors", "Architects and consultants", "Facilities-management companies", "Curtain workrooms and specialist suppliers"];

export default function HealthcareTradePage() {
  return <><BreadcrumbSchema items={[{name:"Home",path:"/"},{name:"Trade",path:"/trade"},{name:"Healthcare",path:pagePath}]} /><SiteHeader /><main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
    <section className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">TrackFit Trade Centre · Healthcare</p><h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.97] tracking-[-0.05em] sm:text-6xl lg:text-7xl">Healthcare curtain-track delivery for professional projects.</h1><p className="mt-7 max-w-4xl text-lg leading-8 text-[#C8C8C1] sm:text-xl">Survey, system-selection, supply and installation support for hospitals, clinics, care groups, contractors, architects and facilities teams.</p><div className="mt-9 flex flex-wrap gap-3"><Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]">Discuss a trade project →</Link><Link href="/services/healthcare-curtain-track-installation" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold">View healthcare service</Link></div></div></section>
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-24"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Delivery support</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Support from early review to handover.</h2></div><div className="grid gap-4 sm:grid-cols-2">{support.map((item)=><div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 font-semibold">{item}</div>)}</div></section>
    <section className="border-y border-white/10 bg-[#0E100F]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><h2 className="text-4xl font-semibold tracking-[-0.04em]">Who we can support</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{sectors.map((item)=><div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 font-semibold">{item}</div>)}</div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="grid gap-6 lg:grid-cols-3">{[["/brands/forest-group/mts","Forest MTS","Dedicated medical and separation-track guidance."],["/brands/forest-group/cs","Forest CS","Heavy-duty manual contract track guidance."],["/brands/forest-group/ccs","Forest CCS","Heavy-duty cord-operated track guidance."]].map(([href,title,copy])=><Link key={href} href={href} className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7"><h2 className="text-3xl font-semibold">{title}</h2><p className="mt-4 leading-7 text-[#AAACA4]">{copy}</p><span className="mt-7 inline-flex font-semibold text-[#B8F23D]">View guide →</span></Link>)}</div></section>
  </main></>;
}
