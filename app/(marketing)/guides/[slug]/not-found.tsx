import Link from "next/link";

export default function GuideNotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#080A09] px-5 text-[#F4F1E8]">
      <div className="max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">
          Guide not found
        </p>
        <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">
          That curtain track guide is not available.
        </h1>
        <p className="mt-5 leading-7 text-[#AAACA4]">
          Browse the knowledge centre or send us your measurements and photos
          for installation advice.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/guides"
            className="rounded-full bg-[#B8F23D] px-7 py-3 font-semibold text-[#080A09]"
          >
            Browse guides
          </Link>
          <Link
            href="/quote/postcode"
            className="rounded-full border border-white/20 px-7 py-3 font-semibold"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </main>
  );
}
