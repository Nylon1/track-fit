"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navigationLinks = [
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
    label: "About",
    href: "/about",
  },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="tf-site-header">
      <div className="tf-container tf-site-header-inner">
        <Link
          href="/"
          aria-label="TrackFit homepage"
          className="tf-site-header-logo-link"
          onClick={closeMenu}
        >
          <Image
            src="/logos/trackfit-logo.svg"
            alt="TrackFit"
            width={240}
            height={72}
            priority
            className="tf-site-header-logo"
          />
        </Link>

        <nav
          className="tf-site-header-navigation"
          aria-label="Primary navigation"
        >
          {navigationLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="tf-site-header-actions">
          <a
            href="tel:08007720367"
            className="tf-site-header-phone"
          >
            <span>Call TrackFit</span>
            0800 772 0367
          </a>

          <Link
            href="/"
            className="tf-site-header-quote"
          >
            Get a quote
            <span aria-hidden="true">→</span>
          </Link>

          <button
            type="button"
            className="tf-site-header-menu-button"
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="trackfit-mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="trackfit-mobile-menu"
        className={`tf-site-mobile-menu ${
          isMenuOpen ? "is-open" : ""
        }`}
      >
        <nav
          className="tf-container tf-site-mobile-menu-inner"
          aria-label="Mobile navigation"
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
            >
              <span>{link.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}

          <a
            href="tel:08007720367"
            className="tf-site-mobile-phone"
          >
            <span>
              <small>Call TrackFit</small>
              0800 772 0367
            </span>

            <span aria-hidden="true">→</span>
          </a>

          <a
            href="mailto:enquiries@curtaintrackfitters.com"
            className="tf-site-mobile-email"
          >
            enquiries@curtaintrackfitters.com
          </a>

          <Link
            href="/"
            className="tf-site-mobile-quote"
            onClick={closeMenu}
          >
            Start your installation request
            <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}