"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const primaryNavigation = [
  {
    label: "Services",
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
    label: "Areas",
    href: "/areas",
  },
  {
    label: "About",
    href: "/about",
  },
];

const resourceNavigation = [
  {
    label: "TrackFit Guide",
    href: "/guides",
    description: "Planning and installation advice",
  },
  {
    label: "Tools & Calculators",
    href: "/tools",
    description: "Measure, plan and select tracks",
  },
  {
    label: "Track Brands",
    href: "/brands",
    description: "Forest Group and product guides",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    description: "Installation examples and lessons",
  },
  {
    label: "Trade Centre",
    href: "/trade",
    description: "Support for trade professionals",
  },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] =
    useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080A09]/95 text-[#F4F1E8] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label="TrackFit homepage"
          onClick={closeMenu}
          className="relative z-10 shrink-0"
        >
          <Image
            src="/logos/trackfit-logo.svg"
            alt="TrackFit"
            width={184}
            height={56}
            priority
            className="h-auto w-[138px] sm:w-[150px]"
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 xl:flex"
        >
          {primaryNavigation
            .slice(0, 3)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-semibold text-white/75 transition hover:text-[#B8F23D]"
              >
                {item.label}
              </Link>
            ))}

          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-white/75 transition hover:text-[#B8F23D] group-hover:text-[#B8F23D]"
              aria-haspopup="true"
            >
              Resources

              <svg
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="h-4 w-4 transition duration-200 group-hover:rotate-180"
              >
                <path
                  d="m6 8 4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="invisible absolute left-1/2 top-full w-[370px] -translate-x-1/2 pt-5 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
              <div className="rounded-[24px] border border-white/10 bg-[#111311] p-3 shadow-2xl shadow-black/50">
                <div className="border-b border-white/10 px-4 pb-3 pt-2">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B8F23D]">
                    TrackFit resources
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/45">
                    Guidance, tools and project information.
                  </p>
                </div>

                <div className="mt-2">
                  {resourceNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group/item flex items-center justify-between gap-4 rounded-[18px] px-4 py-3 transition hover:bg-white/[0.06]"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-white">
                          {item.label}
                        </span>

                        <span className="mt-1 block text-xs leading-5 text-white/45">
                          {item.description}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className="text-white/30 transition group-hover/item:translate-x-1 group-hover/item:text-[#B8F23D]"
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {primaryNavigation
            .slice(3)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-semibold text-white/75 transition hover:text-[#B8F23D]"
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:08007720367"
            className="hidden text-right 2xl:block"
          >
            <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
              Call TrackFit
            </span>

            <span className="mt-1 block whitespace-nowrap text-sm font-semibold text-white transition hover:text-[#B8F23D]">
              0800 772 0367
            </span>
          </a>

          <Link
            href="/quote/postcode"
            className="hidden min-h-11 items-center justify-center rounded-full bg-[#B8F23D] px-5 text-sm font-bold text-[#080A09] transition hover:scale-[1.02] hover:bg-[#C8FF52] sm:inline-flex"
          >
            Get a quote
          </Link>

          <button
            type="button"
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="trackfit-mobile-menu"
            onClick={() =>
              setIsMenuOpen((open) => !open)
            }
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.035] xl:hidden"
          >
            <span className="sr-only">
              Toggle navigation
            </span>

            <span className="relative block h-5 w-5">
              <span
                className={[
                  "absolute left-0 top-[3px] h-[2px] w-5 rounded-full bg-white transition",
                  isMenuOpen
                    ? "translate-y-[6px] rotate-45"
                    : "",
                ].join(" ")}
              />

              <span
                className={[
                  "absolute left-0 top-[9px] h-[2px] w-5 rounded-full bg-white transition",
                  isMenuOpen
                    ? "opacity-0"
                    : "",
                ].join(" ")}
              />

              <span
                className={[
                  "absolute left-0 top-[15px] h-[2px] w-5 rounded-full bg-white transition",
                  isMenuOpen
                    ? "-translate-y-[6px] -rotate-45"
                    : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="trackfit-mobile-menu"
        className={[
          "overflow-hidden border-t border-white/10 bg-[#0D0F0E] transition-all duration-300 xl:hidden",
          isMenuOpen
            ? "max-h-[900px] opacity-100"
            : "max-h-0 border-t-transparent opacity-0",
        ].join(" ")}
      >
        <nav
          aria-label="Mobile navigation"
          className="mx-auto max-w-7xl px-5 py-5 sm:px-8"
        >
          <div className="space-y-1">
            {primaryNavigation
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-13 items-center justify-between rounded-[16px] px-4 py-3 font-semibold text-white transition hover:bg-white/[0.05]"
                >
                  {item.label}

                  <span
                    aria-hidden="true"
                    className="text-white/35"
                  >
                    →
                  </span>
                </Link>
              ))}

            <button
              type="button"
              onClick={() =>
                setIsResourcesOpen(
                  (open) => !open,
                )
              }
              aria-expanded={isResourcesOpen}
              className="flex min-h-13 w-full items-center justify-between rounded-[16px] px-4 py-3 text-left font-semibold text-white transition hover:bg-white/[0.05]"
            >
              Resources

              <svg
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className={[
                  "h-4 w-4 transition",
                  isResourcesOpen
                    ? "rotate-180 text-[#B8F23D]"
                    : "text-white/35",
                ].join(" ")}
              >
                <path
                  d="m6 8 4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className={[
                "grid overflow-hidden transition-all duration-300",
                isResourcesOpen
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]",
              ].join(" ")}
            >
              <div className="min-h-0">
                <div className="mb-2 ml-3 space-y-1 border-l border-white/10 pl-3">
                  {resourceNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="block rounded-[14px] px-4 py-3 transition hover:bg-white/[0.05]"
                    >
                      <span className="block text-sm font-semibold text-white">
                        {item.label}
                      </span>

                      <span className="mt-1 block text-xs leading-5 text-white/40">
                        {item.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {primaryNavigation
              .slice(3)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-13 items-center justify-between rounded-[16px] px-4 py-3 font-semibold text-white transition hover:bg-white/[0.05]"
                >
                  {item.label}

                  <span
                    aria-hidden="true"
                    className="text-white/35"
                  >
                    →
                  </span>
                </Link>
              ))}
          </div>

          <div className="mt-5 border-t border-white/10 pt-5">
            <a
              href="tel:08007720367"
              className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.035] p-4"
            >
              <span>
                <small className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Call TrackFit
                </small>

                <span className="mt-1 block font-semibold">
                  0800 772 0367
                </span>
              </span>

              <span
                aria-hidden="true"
                className="text-[#B8F23D]"
              >
                →
              </span>
            </a>

            <a
              href="mailto:enquiries@curtaintrackfitters.com"
              className="mt-3 block text-center text-sm text-white/55"
            >
              enquiries@curtaintrackfitters.com
            </a>

            <Link
              href="/quote/postcode"
              onClick={closeMenu}
              className="mt-4 flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-6 font-bold text-[#080A09]"
            >
              Start your installation request
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}