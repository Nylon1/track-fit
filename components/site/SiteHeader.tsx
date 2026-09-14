"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  label: string;
  href: string;
  description: string;
};

const serviceNavigation: NavigationItem[] = [
  {
    label: "All installation services",
    href: "/services",
    description: "Explore every TrackFit fitting route",
  },
  {
    label: "Residential installation",
    href: "/services/residential-curtain-track-installation",
    description: "Homes, apartments and specialist windows",
  },
  {
    label: "Bay window tracks",
    href: "/services/bay-window-curtain-track-installation",
    description: "Angled, curved and unusually shaped bays",
  },
  {
    label: "Wave curtain tracks",
    href: "/services/wave-curtain-track-installation",
    description: "Precise spacing for smooth, even folds",
  },
  {
    label: "Commercial installation",
    href: "/services/commercial-curtain-track-installation",
    description: "Hotels, offices, care and hospitality",
  },
  {
    label: "Motorised curtain tracks",
    href: "/motorised-curtain-tracks",
    description: "Motors, controls and automated systems",
  },
];

const resourceNavigation: NavigationItem[] = [
  {
    label: "Gallery",
    href: "/gallery",
    description: "Tracks and curtains in finished rooms",
  },
  {
    label: "Pricing guide",
    href: "/pricing",
    description: "Typical project ranges before you enquire",
  },
  {
    label: "Planning tools",
    href: "/tools",
    description: "Measure, calculate and select tracks",
  },
  {
    label: "TrackFit guides",
    href: "/guides",
    description: "Clear installation and planning advice",
  },
  {
    label: "Track brands",
    href: "/brands",
    description: "Forest Group, Silent Gliss and Goelst",
  },
  {
    label: "Case studies",
    href: "/case-studies",
    description: "Completed projects and fitting lessons",
  },
  {
    label: "Trade centre",
    href: "/trade",
    description: "Support for curtain and design professionals",
  },
  {
    label: "Areas we cover",
    href: "/areas",
    description: "Nationwide installation coverage",
  },
];

function routeIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function DesktopDropdown({
  label,
  introduction,
  items,
  active,
  pathname,
  columns = 1,
}: {
  label: string;
  introduction: string;
  items: NavigationItem[];
  active: boolean;
  pathname: string;
  columns?: 1 | 2;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuId = "trackfit-" + label.toLowerCase() + "-menu";

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function closeOnOutsideClick(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className={[
          "relative flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-sm font-semibold transition",
          active || open
            ? "bg-white/[0.07] text-[#B8F23D]"
            : "text-white/72 hover:bg-white/[0.045] hover:text-white",
        ].join(" ")}
      >
        {label}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={[
            "h-4 w-4 transition duration-200",
            open ? "rotate-180" : "",
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
        {active ? (
          <span className="absolute inset-x-4 -bottom-[18px] h-0.5 rounded-full bg-[#B8F23D]" />
        ) : null}
      </button>

      <div
        id={menuId}
        className={[
          "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition duration-200",
          columns === 2 ? "w-[690px]" : "w-[440px]",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        ].join(" ")}
      >
        <div className="overflow-hidden rounded-[28px] border border-white/12 bg-[#0D100E]/98 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.58)] backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-5 border-b border-white/10 px-4 pb-4 pt-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B8F23D]">
                {label}
              </p>
              <p className="mt-1.5 text-sm text-white/48">{introduction}</p>
            </div>
            <span className="rounded-full border border-[#B8F23D]/25 bg-[#B8F23D]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#B8F23D]">
              Specialist fitting
            </span>
          </div>

          <div
            className={[
              "mt-2 grid",
              columns === 2 ? "grid-cols-2 gap-1" : "gap-1",
            ].join(" ")}
          >
            {items.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={[
                  "group/item flex min-h-[76px] items-center justify-between gap-4 rounded-[18px] px-4 py-3 transition",
                  routeIsActive(pathname, item.href)
                    ? "bg-[#B8F23D]/10"
                    : "hover:bg-white/[0.06]",
                  columns === 1 && index === 0
                    ? "border border-[#B8F23D]/15 bg-[#B8F23D]/[0.055]"
                    : "",
                ].join(" ")}
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-white/43">
                    {item.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-white/30 transition group-hover/item:translate-x-0.5 group-hover/item:border-[#B8F23D]/35 group-hover/item:text-[#B8F23D]"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function usePathnameSafe() {
  return usePathname() || "/";
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={[
        "h-4 w-4 transition",
        open ? "rotate-180 text-[#B8F23D]" : "text-white/35",
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
  );
}

export default function SiteHeader() {
  const pathname = usePathnameSafe();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsResourcesOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const serviceActive =
    pathname.startsWith("/services") ||
    pathname.startsWith("/motorised-curtain-tracks");
  const resourceActive = [
    "/guides",
    "/tools",
    "/brands",
    "/case-studies",
    "/trade",
  ].some((route) => pathname.startsWith(route));

  const directLinks = [
    { label: "Pricing", href: "/pricing" },
    { label: "Gallery", href: "/gallery" },
    { label: "Areas", href: "/areas" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070908]/95 text-[#F4F1E8] shadow-[0_12px_45px_rgba(0,0,0,0.2)] backdrop-blur-2xl">
      <div className="hidden border-b border-white/[0.07] bg-[#0D100E] md:block">
        <div className="mx-auto flex h-8 max-w-[1440px] items-center justify-between px-8 text-[10px] font-bold uppercase tracking-[0.15em]">
          <div className="flex items-center gap-5 text-white/42">
            <span className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full bg-[#B8F23D]" />
              Nationwide specialist installation
            </span>
            <span className="hidden lg:inline">12+ years fitting experience</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="mailto:enquiries@curtaintrackfitters.com"
              className="text-white/42 transition hover:text-white"
            >
              enquiries@curtaintrackfitters.com
            </a>
            <a
              href="tel:08007720367"
              className="text-[#B8F23D] transition hover:text-[#D5FF78]"
            >
              Call 0800 772 0367
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex min-h-[74px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label="TrackFit homepage"
          onClick={closeMenu}
          className="relative z-10 shrink-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8F23D]"
        >
          <Image
            src="/logos/trackfit-logo.svg"
            alt="TrackFit"
            width={184}
            height={56}
            priority
            className="h-auto w-[140px] sm:w-[154px]"
          />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-0.5 xl:flex"
        >
          <DesktopDropdown
            label="Services"
            introduction="Choose the right route for your installation."
            items={serviceNavigation}
            active={serviceActive}
            pathname={pathname}
            columns={2}
          />

          {directLinks.slice(0, 2).map((item) => {
            const active = routeIsActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "relative flex min-h-11 items-center rounded-full px-3.5 text-sm font-semibold transition",
                  active
                    ? "bg-white/[0.07] text-[#B8F23D]"
                    : "text-white/72 hover:bg-white/[0.045] hover:text-white",
                ].join(" ")}
              >
                {item.label}
                {active ? (
                  <span className="absolute inset-x-4 -bottom-[18px] h-0.5 rounded-full bg-[#B8F23D]" />
                ) : null}
              </Link>
            );
          })}

          <DesktopDropdown
            label="Resources"
            introduction="Plan, compare and understand your project."
            items={resourceNavigation}
            active={resourceActive}
            pathname={pathname}
            columns={2}
          />

          {directLinks.slice(2).map((item) => {
            const active = routeIsActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "relative flex min-h-11 items-center rounded-full px-3.5 text-sm font-semibold transition",
                  active
                    ? "bg-white/[0.07] text-[#B8F23D]"
                    : "text-white/72 hover:bg-white/[0.045] hover:text-white",
                ].join(" ")}
              >
                {item.label}
                {active ? (
                  <span className="absolute inset-x-4 -bottom-[18px] h-0.5 rounded-full bg-[#B8F23D]" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-full border border-white/12 px-4 text-sm font-semibold text-white/75 transition hover:border-white/25 hover:bg-white/[0.045] hover:text-white 2xl:inline-flex"
          >
            Speak to us
          </Link>

          <Link
            href="/quote/postcode"
            className="hidden min-h-11 items-center justify-center gap-2 rounded-full bg-[#B8F23D] px-5 text-sm font-bold text-[#080A09] shadow-[0_10px_30px_rgba(184,242,61,0.16)] transition hover:scale-[1.02] hover:bg-[#C8FF52] sm:inline-flex"
          >
            Start a quote
            <span aria-hidden="true">→</span>
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="trackfit-mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.04] transition hover:border-[#B8F23D]/35 hover:bg-[#B8F23D]/10 xl:hidden"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="relative block h-5 w-5">
              <span
                className={[
                  "absolute left-0 top-[3px] h-[2px] w-5 rounded-full bg-white transition",
                  isMenuOpen ? "translate-y-[6px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[9px] h-[2px] w-5 rounded-full bg-white transition",
                  isMenuOpen ? "opacity-0" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-[15px] h-[2px] w-5 rounded-full bg-white transition",
                  isMenuOpen ? "-translate-y-[6px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="trackfit-mobile-menu"
        className={[
          "overflow-y-auto border-t bg-[#090C0A] transition-all duration-300 xl:hidden",
          isMenuOpen
            ? "max-h-[calc(100svh-74px)] border-white/10 opacity-100"
            : "max-h-0 border-transparent opacity-0",
        ].join(" ")}
      >
        <nav
          aria-label="Mobile navigation"
          className="mx-auto max-w-3xl px-5 pb-8 pt-5 sm:px-8"
        >
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Pricing", href: "/pricing" },
              { label: "Gallery", href: "/gallery" },
              { label: "Areas", href: "/areas" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={[
                  "flex min-h-12 items-center justify-between rounded-[16px] border px-4 text-sm font-semibold transition",
                  routeIsActive(pathname, item.href)
                    ? "border-[#B8F23D]/30 bg-[#B8F23D]/10 text-[#B8F23D]"
                    : "border-white/10 bg-white/[0.035] text-white/78",
                ].join(" ")}
              >
                {item.label}
                <span aria-hidden="true" className="text-white/30">→</span>
              </Link>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <button
              type="button"
              onClick={() => setIsServicesOpen((open) => !open)}
              aria-expanded={isServicesOpen}
              className="flex min-h-14 w-full items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.035] px-5 text-left font-semibold text-white"
            >
              <span>
                <small className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#B8F23D]">
                  Choose a route
                </small>
                <span className="mt-1 block">Installation services</span>
              </span>
              <Chevron open={isServicesOpen} />
            </button>

            <div
              className={[
                "grid overflow-hidden transition-all duration-300",
                isServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              ].join(" ")}
            >
              <div className="min-h-0">
                <div className="grid gap-1.5 px-1 pb-2 pt-1.5 sm:grid-cols-2">
                  {serviceNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="rounded-[16px] px-4 py-3 transition hover:bg-white/[0.05]"
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

            <button
              type="button"
              onClick={() => setIsResourcesOpen((open) => !open)}
              aria-expanded={isResourcesOpen}
              className="flex min-h-14 w-full items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.035] px-5 text-left font-semibold text-white"
            >
              <span>
                <small className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#B8F23D]">
                  Plan and explore
                </small>
                <span className="mt-1 block">Guides and resources</span>
              </span>
              <Chevron open={isResourcesOpen} />
            </button>

            <div
              className={[
                "grid overflow-hidden transition-all duration-300",
                isResourcesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              ].join(" ")}
            >
              <div className="min-h-0">
                <div className="grid gap-1.5 px-1 pb-2 pt-1.5 sm:grid-cols-2">
                  {resourceNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="rounded-[16px] px-4 py-3 transition hover:bg-white/[0.05]"
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
          </div>

          <div className="mt-5 rounded-[22px] border border-[#B8F23D]/20 bg-[#B8F23D]/[0.065] p-4">
            <p className="text-sm leading-6 text-white/58">
              Not sure which track or fitting route you need? Send the room details and photographs for review.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link
                href="/quote/postcode"
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-center rounded-full bg-[#B8F23D] px-6 font-bold text-[#080A09]"
              >
                Start your quote
              </Link>
              <a
                href="tel:08007720367"
                className="flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 font-semibold text-white"
              >
                Call 0800 772 0367
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
