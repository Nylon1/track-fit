import Image from "next/image";
import Link from "next/link";

const serviceLinks = [
  {
    label: "Residential Installation",
    href: "/services/residential-curtain-track-installation",
  },
  {
    label: "Curtain Track Installation",
    href: "/services/curtain-track-installation",
  },
  {
    label: "Wave Curtain Tracks",
    href: "/services/wave-curtain-track-installation",
  },
  {
    label: "Bay Window Tracks",
    href: "/services/bay-window-curtain-track-installation",
  },
  {
    label: "Ceiling-Mounted Tracks",
    href: "/services/ceiling-mounted-curtain-track-installation",
  },
  {
    label: "Wall-Mounted Tracks",
    href: "/services/wall-mounted-curtain-track-installation",
  },
  {
    label: "Commercial Installation",
    href: "/services/commercial-curtain-track-installation",
  },
];

const resourceLinks = [
  {
    label: "Tools & Calculators",
    href: "/tools",
  },
  {
    label: "TrackFit Guide",
    href: "/guides",
  },
  {
    label: "Track Brands",
    href: "/brands",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
  },
  {
    label: "Trade Centre",
    href: "/trade",
  },
];

const companyLinks = [
  {
    label: "About TrackFit",
    href: "/about",
  },
  {
    label: "All Services",
    href: "/services",
  },
  {
    label: "Residential",
    href: "/services/residential-curtain-track-installation",
  },
  {
    label: "Commercial",
    href: "/services/commercial-curtain-track-installation",
  },
  {
    label: "Coverage Areas",
    href: "/areas",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const featuredAreas = [
  {
    label: "London",
    href: "/areas/london",
  },
  {
    label: "Manchester",
    href: "/areas/manchester",
  },
  {
    label: "Brighton & Hove",
    href: "/areas/brighton-and-hove",
  },
  {
    label: "Reading",
    href: "/areas/reading",
  },
  {
    label: "Birmingham",
    href: "/areas/birmingham",
  },
  {
    label: "Bristol",
    href: "/areas/bristol",
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#080A09] text-[#F4F1E8]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div>
            <Link
              href="/"
              aria-label="TrackFit home"
              className="inline-flex"
            >
              <Image
                src="/logos/trackfit-logo.svg"
                alt="TrackFit"
                width={220}
                height={66}
                className="h-auto w-[150px]"
              />
            </Link>

            <p className="mt-6 max-w-md text-base leading-7 text-white/60">
              Professional curtain-track installation
              across England, backed by more than 12 years
              of fitting experience.
            </p>

            <div className="mt-7 space-y-3">
              <a
                href="tel:08007720367"
                className="block text-lg font-semibold transition hover:text-[#B8F23D]"
              >
                0800 772 0367
              </a>

              <a
                href="mailto:enquiries@curtaintrackfitters.com"
                className="block break-all text-sm text-white/55 transition hover:text-[#B8F23D]"
              >
                enquiries@curtaintrackfitters.com
              </a>
            </div>

            <div className="mt-7 flex items-start gap-3 rounded-[20px] border border-white/10 bg-white/[0.035] p-4">
              <span
                aria-hidden="true"
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#B8F23D]"
              />

              <p className="text-sm leading-6 text-white/60">
                Fitting curtain tracks from north to south
                and east to west across England.
              </p>
            </div>

            <Link
              href="/quote/postcode"
              className="mt-7 inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-6 font-bold text-[#080A09] transition hover:scale-[1.02] hover:bg-[#C8FF52]"
            >
              Start your installation request
              <span
                aria-hidden="true"
                className="ml-2"
              >
                →
              </span>
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Services
              </h2>

              <nav
                aria-label="Footer services"
                className="mt-5 space-y-3"
              >
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm leading-6 text-white/60 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Resources
              </h2>

              <nav
                aria-label="Footer resources"
                className="mt-5 space-y-3"
              >
                {resourceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm leading-6 text-white/60 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                TrackFit
              </h2>

              <nav
                aria-label="Footer company links"
                className="mt-5 space-y-3"
              >
                {companyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm leading-6 text-white/60 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                Popular areas
              </h2>

              <nav
                aria-label="Featured coverage areas"
                className="mt-5 space-y-3"
              >
                {featuredAreas.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm leading-6 text-white/60 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Link
                href="/areas"
                className="mt-5 inline-flex text-sm font-semibold text-[#B8F23D]"
              >
                View all areas →
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-sm text-white/45 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {currentYear} TrackFit. All rights reserved.
          </p>

          <nav
            aria-label="Footer legal links"
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="font-medium text-white/55">
            Where precision meets design.
          </p>
        </div>

        <div className="mt-7 rounded-[20px] border border-white/10 bg-white/[0.025] p-4">
          <p className="text-xs leading-6 text-white/40">
            TrackFit is an independent curtain-track
            installation business. Brand names and
            trademarks belong to their respective owners.
            TrackFit does not imply authorised or approved
            installer status unless expressly stated.
          </p>
        </div>
      </div>
    </footer>
  );
}
