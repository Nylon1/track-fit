import Image from "next/image";
import { getGuideVisual } from "@/lib/guides/visuals";
import Link from "next/link";
import type { Guide } from "@/lib/guides/types";

export function GuideCard({ guide }: { guide: Guide }) {
  const visual = getGuideVisual(guide);
  return (
    <article className="group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-[#B8F23D]/50 hover:bg-white/[0.065]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#E9E8E3]">
        <Image src={visual.src} alt={visual.alt} fill sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw" className={`${visual.fit === "contain" ? "object-contain p-5" : "object-cover"} transition-transform duration-700 motion-safe:group-hover:scale-105`} />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">{guide.readTime}</span>
      </div>
      <div className="p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B8F23D]">
        {guide.eyebrow}
      </p>

      <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#F4F1E8]">
        <Link href={`/guides/${guide.slug}`} className="focus-visible:underline">
          <span className="absolute inset-0" aria-hidden="true" />
          {guide.title}
        </Link>
      </h3>

      <p className="mt-4 leading-7 text-[#D8CCC0]">{guide.summary}</p>

      <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5 text-sm">
        <span className="text-[#AE9F92]">{guide.readTime}</span>
        <span className="font-semibold text-[#F4F1E8] transition group-hover:translate-x-1">
          Read guide →
        </span>
      </div>
      </div>
    </article>
  );
}
