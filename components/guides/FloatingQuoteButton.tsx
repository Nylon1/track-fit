import Link from "next/link";

export function FloatingQuoteButton() {
  return (
    <Link
      href="/quote/postcode"
      className="fixed bottom-5 right-5 z-50 hidden rounded-full bg-[#B8F23D] px-5 py-3 text-sm font-bold text-[#080A09] shadow-2xl shadow-black/30 transition hover:-translate-y-0.5 hover:bg-[#C7FF4A] lg:inline-flex"
    >
      Get a quote
    </Link>
  );
}
