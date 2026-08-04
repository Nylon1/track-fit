import type { AreaSampleReview } from "@/lib/areas/types";

type SampleAreaReviewProps = {
  review: AreaSampleReview | undefined;
};

export default function SampleAreaReview({ review }: SampleAreaReviewProps) {
  if (process.env.SHOW_SAMPLE_AREA_REVIEWS === "false" || !review) {
    return null;
  }

  return (
    <aside className="mt-16 rounded-[30px] border border-white/10 bg-white/[0.035] p-7 sm:p-9">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
        Sample review — not a verified customer testimonial
      </p>
      <blockquote className="mt-4 max-w-4xl text-lg leading-8 text-[#D8D7CF]">
        “{review.quote}”
      </blockquote>
      <p className="mt-5 text-sm font-semibold text-[#F4F1E8]">
        {review.name} · {review.area}
      </p>
    </aside>
  );
}
