import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { createMetadata } from "@/lib/seo/metadata";
import SiteHeader from "@/components/site/SiteHeader";
const pageTitle =
  "Ceiling-Mounted Curtain Track Installation UK";

const pageDescription =
  "Professional ceiling-mounted curtain track installation across the UK for homes, designers, landlords and commercial projects. Suitable fixing support, spacing and curtain weight are assessed before fitting.";

const pagePath =
  "/services/ceiling-mounted-curtain-track-installation";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "ceiling mounted curtain track installation",
    "ceiling curtain track fitter",
    "curtain track ceiling fitting",
    "ceiling fixed curtain rail",
    "professional curtain track fitting",
    "ceiling curtain track installation UK",
  ],
});

const benefits = [
  {
    number: "01",
    title: "Clean architectural finish",
    description:
      "Ceiling-mounted tracks can create a neat, minimal appearance with curtains dropping directly from the ceiling.",
  },
  {
    number: "02",
    title: "Full-height curtains",
    description:
      "The track can support a floor-to-ceiling curtain layout where the room and curtain dimensions are suitable.",
  },
  {
    number: "03",
    title: "Flexible positioning",
    description:
      "Tracks can be positioned away from window handles, radiators, deep sills and other obstructions.",
  },
  {
    number: "04",
    title: "Single or layered systems",
    description:
      "Separate ceiling tracks can be used for voiles and main curtains where enough spacing and structural support are available.",
  },
];

const checks = [
  {
    title: "Ceiling construction",
    description:
      "Concrete, timber, plasterboard and suspended ceilings require different fixing methods. The visible ceiling finish alone may not provide adequate support.",
  },
  {
    title: "Structural fixing points",
    description:
      "The track should be fixed into suitable timber, concrete, steelwork or another approved structure capable of carrying the curtain load.",
  },
  {
    title: "Curtain weight",
    description:
      "Long, lined or heavy curtains place greater force on the track and fixings. Additional brackets or stronger support may be necessary.",
  },
  {
    title: "Distance from the wall",
    description:
      "The track must sit far enough away from the wall, handles, radiators and sills so the curtains can hang and move freely.",
  },
  {
    title: "Curtain heading",
    description:
      "Wave, pencil pleat and pinch pleat curtains occupy different amounts of space and may require different track positions.",
  },
  {
    title: "Access and ceiling height",
    description:
      "High ceilings, staircases and restricted access may require specialist equipment or additional installers.",
  },
];

const process = [
  {
    number: "01",
    title: "Submit the installation details",
    description:
      "Provide the postcode, track quantity, approximate lengths, curtain type and ceiling height.",
  },
  {
    number: "02",
    title: "Upload photographs",
    description:
      "Include the entire window, ceiling, side walls, curtain position and any visible obstructions.",
  },
  {
    number: "03",
    title: "Fixing assessment",
    description:
      "TrackFit reviews the likely ceiling construction, curtain weight, spacing and access requirements.",
  },
  {
    number: "04",
    title: "Professional installation",
    description:
      "The track is positioned, levelled, securely fixed and checked for smooth runner movement.",
  },
];

const faqItems = [
  {
    question:
      "Can a curtain track be fixed directly into plasterboard?",
    answer:
      "Plasterboard alone may not provide enough support for a loaded curtain track. The correct approach depends on the ceiling construction, curtain weight, track length and availability of suitable structural fixing points.",
  },
  {
    question:
      "How far should a ceiling curtain track be from the wall?",
    answer:
      "The distance depends on the curtain heading, window sill, handles, radiators and curtain layers. The track should allow the curtain to hang and move without rubbing against nearby surfaces.",
  },
  {
    question:
      "Can two curtain tracks be fitted to the ceiling?",
    answer:
      "Yes, where there is enough ceiling space and suitable support. A voile and main-curtain arrangement requires adequate separation so both layers can move independently.",
  },
  {
    question:
      "Can a ceiling track be installed across a whole wall?",
    answer:
      "Yes, subject to track length, structural support, curtain weight and access. Long track runs may require multiple sections and carefully positioned brackets.",
  },
];

export default function CeilingMountedCurtainTrackPage() {
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
            name: "Ceiling-Mounted Curtain Track Installation",
            path: pagePath,
          },
        ]}
      />

      <ServiceSchema
        name={pageTitle}
        description={pageDescription}
        path={pagePath}
        serviceType="Ceiling-mounted curtain track installation"
      />

      <main className="tf-service-page">
        <SiteHeader />

        <section className="tf-service-hero tf-container">
          <div className="tf-service-hero-copy">
            <p className="tf-eyebrow">
              Ceiling-fixed systems
            </p>

            <h1>
              Ceiling-mounted curtain tracks, securely
              and precisely fitted.
            </h1>

            <p className="tf-service-introduction">
              TrackFit installs ceiling-mounted curtain
              tracks for homes, interior designers,
              landlords and commercial projects across
              the United Kingdom. Every installation is
              assessed for ceiling construction,
              structural support, curtain weight,
              positioning and available clearance.
            </p>

            <div className="tf-service-actions">
              <Link
                href="/"
                className="tf-service-primary-button"
              >
                Request ceiling-track installation
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="#ceiling-guide"
                className="tf-service-secondary-button"
              >
                Read the installation guide
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
              alt="Professional ceiling-mounted curtain track installation"
              width={900}
              height={1100}
              priority
            />

            <div className="tf-service-media-label">
              <span>Ceiling-mounted tracks</span>

              <strong>
                Clean positioning with secure support.
              </strong>
            </div>
          </div>
        </section>

        <section className="tf-service-answer">
          <div className="tf-container">
            <p className="tf-eyebrow">
              Direct answer
            </p>

            <h2>
              What is a ceiling-mounted curtain track?
            </h2>

            <p>
              A ceiling-mounted curtain track is fixed
              above the window directly into a suitable
              ceiling structure rather than onto the
              wall. This can create a clean finish and
              allow curtains to fall from ceiling
              height. Correct installation depends on
              the ceiling construction, secure fixing
              points, curtain weight, track length and
              enough clearance from the wall and window.
            </p>
          </div>
        </section>

        <section
          id="ceiling-guide"
          className="tf-service-section tf-container"
        >
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Why ceiling mounting?
            </p>

            <h2>
              A practical and visually clean curtain
              track solution.
            </h2>

            <p>
              Ceiling-mounted tracks are often selected
              for full-height curtains, modern interiors,
              deep windows and situations where wall
              mounting is unsuitable.
            </p>
          </div>

          <div className="tf-service-process-grid">
            {benefits.map((benefit) => (
              <article key={benefit.number}>
                <span>{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tf-service-process">
          <div className="tf-container">
            <div className="tf-service-section-heading">
              <p className="tf-eyebrow">
                Installation process
              </p>

              <h2>
                From ceiling assessment to secure
                fitting.
              </h2>
            </div>

            <div className="tf-service-process-grid">
              {process.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tf-wave-considerations tf-container">
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Technical assessment
            </p>

            <h2>
              What must be checked before fitting a
              ceiling track?
            </h2>

            <p>
              A secure installation requires more than
              choosing a track position. The structure
              behind the ceiling finish must be suitable
              for the expected load.
            </p>
          </div>

          <div className="tf-wave-consideration-grid">
            {checks.map((item, index) => (
              <article key={item.title}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tf-wave-spacing">
          <div className="tf-container tf-wave-spacing-layout">
            <div>
              <p className="tf-eyebrow">
                Structural support
              </p>

              <h2>
                The track is only as secure as the
                structure behind it.
              </h2>
            </div>

            <div>
              <p>
                A plasterboard ceiling may conceal timber
                joists, metal framing, concrete or an
                empty void. The visible surface does not
                confirm what support is available.
              </p>

              <p>
                Heavy curtains and long track runs can
                place significant force on the fixing
                points. Correct bracket spacing and
                suitable fixings are essential.
              </p>

              <p>
                Where adequate support is not available,
                additional preparation may be required
                before the curtain track can be safely
                installed.
              </p>
            </div>
          </div>
        </section>

        <section className="tf-service-section tf-container">
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Common questions
            </p>

            <h2>
              Ceiling-mounted curtain track FAQs.
            </h2>
          </div>

          <div className="tf-wave-faq-list">
            {faqItems.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tf-service-final-cta">
          <div className="tf-container">
            <p className="tf-eyebrow">
              Start your request
            </p>

            <h2>
              Request professional ceiling-track
              fitting.
            </h2>

            <p>
              Enter your postcode and upload clear
              photographs of the window, ceiling and
              proposed curtain position. Include the
              approximate track length and curtain type.
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