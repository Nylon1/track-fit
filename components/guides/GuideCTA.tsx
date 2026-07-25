import Link from "next/link";

type GuideCTAProps = {
  serviceLabel?: string;
  serviceHref?: string;
};

export function GuideCTA({
  serviceLabel = "Explore our installation service",
  serviceHref = "/residential",
}: GuideCTAProps) {
  return (
    <section className="relative overflow-hidden rounded-[34px] border border-[#B8F23D]/30 bg-[#B8F23D] px-6 py-10 text-[#080A09] sm:px-10 lg:px-14 lg:py-14">
      <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/15 blur-3xl" />

      <div className="relative max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.24em]">
          Professional installation
        </p>

        <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
          Need your curtain track fitted properly?
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-7 text-[#1C211A] sm:text-lg">
          Send us your postcode, measurements and photos. We can assess the
          track type, fixing surface and access before providing a quotation.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/quote/postcode"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f4f1e8] px-7 py-3 font-semibold text-[#F4F1E8] transition hover:bg-[#151816]"
          >
            Get an installation quote
          </Link>

          <Link
            href={serviceHref}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#080A09]/30 px-7 py-3 font-semibold transition hover:bg-white/15"
          >
            {serviceLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
