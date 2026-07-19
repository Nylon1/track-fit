import Image from "next/image";
import Link from "next/link";

const serviceLinks = [
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
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Commercial",
    href: "/services/commercial-curtain-track-installation",
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
    <footer className="tf-footer">
      <div className="tf-container tf-footer-main">
        <div className="tf-footer-introduction">
          <Link
            href="/"
            aria-label="TrackFit home"
            className="tf-footer-logo-link"
          >
            <Image
              src="/logos/trackfit-logo.svg"
              alt="TrackFit"
              width={240}
              height={72}
              className="tf-footer-logo"
            />
          </Link>

          <p>
            Professional curtain-track installation across
            England, backed by more than 12 years of fitting
            experience.
          </p>
<div className="tf-footer-contact">
  <a href="tel:08007720367">
    0800 772 0367
  </a>

  <a href="mailto:enquiries@curtaintrackfitters.com">
    enquiries@curtaintrackfitters.com
  </a>
</div>
          <div className="tf-footer-coverage">
            <span aria-hidden="true" />

            <p>
              Fitting tracks from north to south and east to
              west.
            </p>
          </div>

          <Link
            href="/"
            className="tf-footer-quote-button"
          >
            Start your installation request
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="tf-footer-links">
          <div>
            <h2>Services</h2>

            <nav aria-label="Footer services">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2>TrackFit</h2>

            <nav aria-label="Footer company links">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2>Coverage</h2>

            <div className="tf-footer-copy">
              <p>Residential installation</p>
              <p>Commercial projects</p>
              <p>England-wide coverage</p>
              <p>Selected UK projects</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tf-container tf-footer-bottom">
        <p>
          © {currentYear} TrackFit. All rights reserved.
        </p>

        <nav aria-label="Footer legal links">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="tf-footer-tagline">
          Where precision meets design.
        </p>
      </div>
    </footer>
  );
}