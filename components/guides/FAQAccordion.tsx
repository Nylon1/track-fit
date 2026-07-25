import type { GuideFaq } from "@/lib/guides/types";

export function FAQAccordion({ faqs }: { faqs: GuideFaq[] }) {
  return (
    <div className="divide-y divide-white/10 rounded-[28px] border border-white/10 bg-white/[0.035] px-5 sm:px-7">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg font-semibold text-[#F4F1E8]">
            <span>{faq.question}</span>
            <span
              aria-hidden="true"
              className="mt-0.5 text-2xl font-light text-[#B8F23D] transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-2 pt-4 leading-7 text-[#D8D7CF]">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
