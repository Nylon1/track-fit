import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { createMetadata } from "@/lib/seo/metadata";
import SiteHeader from "@/components/site/SiteHeader";
const pageTitle =
  "Wall-Mounted Curtain Track Installation UK";

const pageDescription =
  "Professional wall-mounted curtain track installation across the UK for homes, landlords, designers and commercial spaces. Track position, wall construction, curtain weight and clearance are assessed before fitting.";

const pagePath =
  "/services/wall-mounted-curtain-track-installation";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "wall mounted curtain track installation",
    "wall curtain track fitter",
    "curtain track wall fitting",
    "curtain rail installation service",
    "professional curtain track fitting",
    "wall mounted curtain track UK",
  ],
});

const benefits = [
  {
    number: "01",
    title: "Flexible positioning",
    description:
      "Wall brackets allow the track to be positioned at a suitable height and distance from the window.",
  },
  {
    number: "02",
    title: "Suitable for many rooms",
    description:
      "Wall-mounted tracks can work well in bedrooms, living rooms, offices, rental properties and commercial spaces.",
  },
  {
    number: "03",
    title: "Clearance from obstructions",
    description:
      "Bracket projection can help curtains clear window handles, deep sills, radiators and decorative features.",
  },
  {
    number: "04",
    title: "Single or double systems",
    description:
      "Separate tracks may be installed for voiles and main curtains where sufficient wall space and support are available.",
  },
];

const checks = [
  {
    title: "Wall construction",
    description:
      "Brick, block, concrete, plasterboard and timber walls require different fixings and installation methods.",
  },
  {
    title: "Suitable fixing points",
    description:
      "The brackets must be secured into a structure capable of supporting the track and curtain weight.",
  },
  {
    title: "Bracket projection",
    description:
      "The track must sit far enough from the wall for the curtain heading and folds to move freely.",
  },
  {
    title: "Curtain weight",
    description:
      "Heavy, lined and long curtains may require stronger brackets, closer spacing or additional fixing points.",
  },
  {
    title: "Track length",
    description:
      "Long tracks may require multiple sections, additional brackets and careful alignment across the wall.",
  },
  {
    title: "Position above the window",
    description:
      "The track height should consider the curtain length, window proportions, ceiling height and desired visual finish.",
  },
];

const process = [
  {
    number: "01",
    title: "Submit your project details",
    description:
      "Provide the postcode, approximate track length, curtain type and number of windows.",
  },
  {
    number: "02",
    title: "Upload photographs",
    description:
      "Include the full wall, window, ceiling line, side returns and any handles, radiators or existing fittings.",
  },
  {
    number: "03",
    title: "Wall and spacing review",
    description:
      "TrackFit reviews the likely wall construction, fixing position, bracket projection and curtain requirements.",
  },
  {
    number: "04",
    title: "Professional installation",
    description:
      "The brackets and track are positioned, levelled, securely fixed and tested for smooth movement.",
  },
];

const faqItems = [
  {
    question:
      "Can a curtain track be fixed to a plasterboard wall?",
    answer:
      "It may be possible, but the fixing method depends on the plasterboard system, available studs or support, track length and curtain weight. Plasterboard alone may not be suitable for heavy curtains.",
  },
  {
    question:
      "How far should a wall-mounted track project from the wall?",
    answer:
      "The required projection depends on the curtain heading, window handles, radiator depth, sill and whether there are multiple curtain layers.",
  },
  {
    question:
      "How high should a curtain track be fitted above the window?",
    answer:
      "The position depends on the curtain length, ceiling height, window proportions and desired appearance. The track should also leave enough space for secure brackets and smooth curtain movement.",
  },
  {
    question:
      "Can two tracks be fitted to the wall?",
    answer:
      "Yes, where the wall provides enough space and support. A voile and main-curtain arrangement needs sufficient separation between the two tracks.",
  },
];

export default function WallMountedCurtainTrackPage() {
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
            name: "Wall-Mounted Curtain Track Installation",
            path: pagePath,
          },
        ]}
      />

      <ServiceSchema
        name={pageTitle}
        description={pageDescription}
        path={pagePath}
        serviceType="Wall-mounted curtain track installation"
      />

      <main className="tf-service-page">
        <SiteHeader />

        <section className="tf-service-hero tf-container">
          <div className="tf-service-hero-copy">
            <p className="tf-eyebrow">
              Wall-fixed systems
            </p>

            <h1>
              Wall-mounted curtain tracks, positioned
              for the room and the curtains.
            </h1>

            <p className="tf-service-introduction">
              TrackFit installs wall-mounted curtain
              tracks for homes, landlords, interior
              designers and commercial spaces across the
              United Kingdom. Each project is assessed
              for wall construction, fixing strength,
              bracket projection, curtain weight and
              available clearance.
            </p>

            <div className="tf-service-actions">
              <Link
                href="/"
                className="tf-service-primary-button"
              >
                Request wall-track installation
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="#wall-guide"
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
              alt="Professional wall-mounted curtain track installation"
              width={900}
              height={1100}
              priority
            />

            <div className="tf-service-media-label">
              <span>Wall-mounted tracks</span>

              <strong>
                Correct height, projection and support.
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
              What is a wall-mounted curtain track?
            </h2>

            <p>
              A wall-mounted curtain track is supported
              by brackets fixed above or around the
              window. The brackets hold the track at a
              suitable height and distance from the
              wall. Correct installation depends on the
              wall construction, secure fixing points,
              curtain weight, track length and enough
              clearance for the curtains to move and
              stack freely.
            </p>
          </div>
        </section>

        <section
          id="wall-guide"
          className="tf-service-section tf-container"
        >
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Why wall mounting?
            </p>

            <h2>
              A flexible track solution for different
              windows and room layouts.
            </h2>

            <p>
              Wall-mounted tracks are often selected
              where ceiling mounting is unsuitable or
              where greater control over track height
              and projection is needed.
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
                From wall assessment to accurate
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
              wall-mounted track?
            </h2>

            <p>
              Wall mounting requires suitable support,
              correct bracket spacing and enough
              projection for the curtain heading and
              nearby obstructions.
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
                Bracket positioning
              </p>

              <h2>
                The track needs enough distance from the
                wall for the curtains to work properly.
              </h2>
            </div>

            <div>
              <p>
                A track fitted too close to the wall can
                cause curtains to rub against handles,
                radiators, sills or the wall surface.
              </p>

              <p>
                The correct bracket projection depends
                on the curtain heading, fabric volume,
                curtain layers and the shape of the
                window area.
              </p>

              <p>
                Long or heavy tracks may also require
                additional brackets to prevent movement,
                sagging or excessive load on individual
                fixing points.
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
              Wall-mounted curtain track FAQs.
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
              Request professional wall-track fitting.
            </h2>

            <p>
              Enter your postcode and upload clear
              photographs of the full wall, window and
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