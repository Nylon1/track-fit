import Link from "next/link";
import type { Guide } from "@/lib/guides/types";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#B8F23D]/50 hover:bg-white/[0.065]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B8F23D]">
        {guide.eyebrow}
      </p>

      <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#F4F1E8]">
        <Link href={`/guides/${guide.slug}`} className="outline-none">
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
    </article>
  );
}
