import { GuideCard } from "./GuideCard";
import type { Guide } from "@/lib/guides/types";

export function RelatedGuides({ guides }: { guides: Guide[] }) {
  if (!guides.length) return null;

  return (
    <section>
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8F23D]">
          Keep reading
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-[#F4F1E8]">
          Related curtain track guides
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {guides.map((guide) => (
          <div className="relative" key={guide.slug}>
            <GuideCard guide={guide} />
          </div>
        ))}
      </div>
    </section>
  );
}
