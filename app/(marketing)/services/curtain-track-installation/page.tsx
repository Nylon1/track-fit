import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { createMetadata } from "@/lib/seo/metadata";
import SiteHeader from "@/components/site/SiteHeader";
const pageTitle =
  "Professional Curtain Track Installation UK";

const pageDescription =
  "Professional curtain track fitting for homes, interior designers, landlords and commercial projects across the UK, including ceiling, wall, wave, bay, curved and motorised systems.";

const pagePath =
  "/services/curtain-track-installation";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,

  keywords: [
    "professional curtain track installation",
    "curtain track fitter UK",
    "curtain rail fitting service",
    "ceiling curtain track fitting",
    "commercial curtain track fitter",
  ],
});

const services = [
  {
    title: "Ceiling-mounted tracks",
    description:
      "Tracks fixed directly into a suitable ceiling structure for a clean, architectural finish.",
  },
  {
    title: "Wall-mounted tracks",
    description:
      "Professional installation using correctly positioned brackets and suitable wall fixings.",
  },
  {
    title: "Wave curtain systems",
    description:
      "Accurate spacing and track positioning for smooth, consistent wave folds.",
  },
  {
    title: "Bay and curved tracks",
    description:
      "Measured and shaped systems designed around angled, curved or unusual window layouts.",
  },
  
  
  {
    title: "Commercial systems",
    description:
      "Heavy-duty and specialist installations for offices, hotels, healthcare and public spaces.",
  },
];

const process = [
  {
    number: "01",
    title: "Tell us about the project",
    text: "Enter your postcode and provide the track type, quantity and basic project details.",
  },
  {
    number: "02",
    title: "Upload photographs",
    text: "Photos help us assess the window, fixing surfaces, access and any existing fittings.",
  },
  {
    number: "03",
    title: "Specialist review",
    text: "The TrackFit team reviews the requirements and identifies any further information needed.",
  },
  {
    number: "04",
    title: "Quotation and installation",
    text: "You receive the proposed scope, quotation and next available installation arrangements.",
  },
];

export default function CurtainTrackInstallationPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            path: "/",
          },
          {
            name: "Services",
            path: "/services",
          },
          {
            name: "Curtain Track Installation",
            path: pagePath,
          },
        ]}
      />

      <ServiceSchema
        name={pageTitle}
        description={pageDescription}
        path={pagePath}
      />

      <main className="tf-service-page">
        <SiteHeader />
        

        <section className="tf-service-hero tf-container">
          <div className="tf-service-hero-copy">
            <p className="tf-eyebrow">
              UK curtain track specialists
            </p>

            <h1>
              Professional curtain track installation,
              precisely fitted.
            </h1>

            <p className="tf-service-introduction">
              TrackFit provides professional curtain
              track fitting for residential and
              commercial spaces across the United
              Kingdom. We install ceiling-mounted,
              wall-mounted, wave, bay, curved,
              motorised and heavy-duty track systems,
              subject to a review of the structure,
              access and project requirements.
            </p>

            <div className="tf-service-actions">
              <Link
                href="/"
                className="tf-service-primary-button"
              >
                Start your installation request
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="#installation-options"
                className="tf-service-secondary-button"
              >
                Explore installation options
              </a>
            </div>

            <div className="tf-service-trust-line">
              <span>Residential</span>
              <i />
              <span>Commercial</span>
              <i />
              <span>Nationwide coverage</span>
            </div>
          </div>

          <div className="tf-service-hero-media">
            <Image
              src="/images/hero/trackfit-entry-poster.jpeg"
              alt="Curtain track installation being completed"
              width={900}
              height={1100}
              priority
            />

            <div className="tf-service-media-label">
              <span>Professional fitting</span>
              <strong>
                Where precision meets design.
              </strong>
            </div>
          </div>
        </section>

        <section className="tf-service-answer">
          <div className="tf-container">
            <p className="tf-eyebrow">
              The service
            </p>

            <h2>
              What is professional curtain track
              installation?
            </h2>

            <p>
              Professional curtain track installation
              is the assessment, positioning and secure
              fitting of a curtain track to a suitable
              ceiling or wall structure. The work may
              include straight, wave, bay, curved,
              motorised or heavy-duty systems. Correct
              installation depends on accurate
              measurements, appropriate fixings,
              structural support, track compatibility
              and sufficient clearance for the chosen
              curtain heading.
            </p>
          </div>
        </section>

        <section
          id="installation-options"
          className="tf-service-section tf-container"
        >
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Installation options
            </p>

            <h2>
              Curtain track systems fitted by
              specialists.
            </h2>

            <p>
              Select the closest option during the
              quotation journey. Customers who are not
              certain can upload photographs and ask
              the TrackFit team to advise.
            </p>
          </div>

          <div className="tf-service-grid">
            {services.map((service) => (
              <article
                key={service.title}
                className="tf-service-card"
              >
                <span aria-hidden="true">+</span>

                <h3>{service.title}</h3>

                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tf-service-process">
          <div className="tf-container">
            <div className="tf-service-section-heading">
              <p className="tf-eyebrow">
                How TrackFit works
              </p>

              <h2>
                A clear route from project details to
                installation.
              </h2>
            </div>

            <div className="tf-service-process-grid">
              {process.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tf-service-considerations tf-container">
          <div>
            <p className="tf-eyebrow">
              Before installation
            </p>

            <h2>
              What affects curtain track fitting?
            </h2>
          </div>

          <div className="tf-service-consideration-list">
            <article>
              <h3>Fixing surface and support</h3>
              <p>
                The installer needs a suitable fixing
                point. Plasterboard, concrete, timber,
                steel and suspended ceilings require
                different assessments and fixing
                methods.
              </p>
            </article>

            <article>
              <h3>Track shape and weight</h3>
              <p>
                Long, curved, motorised or heavy-duty
                tracks may require more support,
                additional installers or specialist
                equipment.
              </p>
            </article>

            <article>
              <h3>Curtain heading and clearance</h3>
              <p>
                Wave, pinch pleat and layered curtain
                arrangements require adequate spacing
                from walls, windows, handles and other
                curtain layers.
              </p>
            </article>

            <article>
              <h3>Access and working height</h3>
              <p>
                High ceilings, staircases, restricted
                access and commercial environments can
                affect equipment, time and installation
                planning.
              </p>
            </article>
          </div>
        </section>

        <section className="tf-service-final-cta">
          <div className="tf-container">
            <p className="tf-eyebrow">
              Begin your request
            </p>

            <h2>
              Tell us where and what you need fitted.
            </h2>

            <p>
              Enter your postcode and complete the
              guided TrackFit quotation journey. No
              payment is required to submit an
              installation request.
            </p>

            <Link
              href="/"
              className="tf-service-primary-button"
            >
              Check your area
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}