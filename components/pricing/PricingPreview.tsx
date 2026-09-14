import Image from "next/image";
import Link from "next/link";

import { pricingGuides } from "@/lib/pricing/data";

export default function PricingPreview() {
  const featuredGuides = pricingGuides.slice(0, 4);

  return (
    <section className="border-y border-white/10 bg-[#F2EFE7] text-[#101310]">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-7 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#557600]">
              Guide prices before you enquire
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              See the likely investment before sending your details.
            </h2>
          </div>
          <div>
            <p className="text-base leading-7 text-black/62">
              These ranges help you decide whether TrackFit is the right fit. Your written quote is based on measurements, photographs, curtain weight, fixing conditions and access.
            </p>
            <Link href="/pricing" className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full border border-[#6E9300]/30 bg-[#B8F23D] px-6 font-bold text-[#0B0E0C] shadow-[0_12px_32px_rgba(88,118,0,0.18)] transition hover:-translate-y-0.5 hover:bg-[#C8FF52] hover:shadow-[0_16px_40px_rgba(88,118,0,0.24)]">
              <span>View the complete pricing guide</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredGuides.map((guide) => (
            <Link key={guide.slug} href={`/pricing#${guide.slug}`} className="group overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(0,0,0,0.13)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#E9E7E0]">
                <Image src={guide.image} alt={guide.imageAlt} fill sizes="(min-width: 1280px) 24vw, (min-width: 768px) 48vw, 94vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#557600]">{guide.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold">{guide.title}</h3>
                <p className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{guide.price}</p>
                <p className="mt-1 text-xs text-black/45">{guide.unit}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
