import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { createMetadata } from "@/lib/seo/metadata";
import SiteHeader from "@/components/site/SiteHeader";
const pageTitle =
  "About TrackFit | Curtain Track Installation Specialists";

const pageDescription =
  "TrackFit has more than 12 years of curtain-track installation experience, fitting tracks in cities across England from north to south and east to west.";

const pagePath = "/about";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "about TrackFit",
    "experienced curtain track fitters",
    "curtain track installers England",
    "nationwide curtain track fitting",
    "professional curtain track installers",
  ],
});

const experiencePoints = [
  {
    number: "01",
    title: "More than 12 years’ experience",
    description:
      "We have spent over a decade fitting curtain tracks in homes, apartments, hotels, offices, developments and specialist spaces.",
  },
  {
    number: "02",
    title: "Coverage across England",
    description:
      "From the North to the South, and from the East to the West, our installers have completed curtain-track projects in every city across England.",
  },
  {
    number: "03",
    title: "Residential and commercial work",
    description:
      "Our experience includes straightforward domestic installations as well as larger, more technical and multi-room projects.",
  },
  {
    number: "04",
    title: "Different tracks and window shapes",
    description:
      "We fit straight, wave, wall-mounted, ceiling-mounted, bay-window, curved and specialist curtain-track systems.",
  },
];

const values = [
  {
    title: "Precision",
    description:
      "Tracks must be level, correctly positioned and securely fixed. Small errors can affect how curtains hang, move and stack.",
  },
  {
    title: "Preparation",
    description:
      "We review the fixing surface, curtain weight, track type, access and available spacing before agreeing the installation approach.",
  },
  {
    title: "Honest guidance",
    description:
      "Where a fixing surface, track system or proposed layout is unsuitable, we explain the issue rather than forcing an installation.",
  },
  {
    title: "Professional finish",
    description:
      "Our aim is to leave each track securely fitted, correctly aligned and ready for the curtains it has been designed to carry.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            path: "/",
          },
          {
            name: "About TrackFit",
            path: pagePath,
          },
        ]}
      />

      <main className="tf-service-page">
        <SiteHeader />
        <section className="tf-about-hero tf-container">
          <div className="tf-about-hero-copy">
            <p className="tf-eyebrow">
              About TrackFit
            </p>

            <h1>
              More than 12 years of curtain-track
              installation experience.
            </h1>

            <p className="tf-about-introduction">
              TrackFit has fitted curtain tracks across
              England for over 12 years. From northern
              cities to the South Coast, and from the
              East of England to the West, our work has
              taken us into homes, hotels, offices,
              apartments, developments and commercial
              spaces in every city across the country.
            </p>

            <div className="tf-service-actions">
              <Link
                href="/"
                className="tf-service-primary-button"
              >
                Start your installation request
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/services"
                className="tf-service-secondary-button"
              >
                Explore our services
              </Link>
            </div>
          </div>

          <div className="tf-about-hero-media">
            <Image
              src="/images/hero/trackfit-entry-poster.jpeg"
              alt="TrackFit curtain-track installation specialist at work"
              width={1000}
              height={1100}
              priority
            />

            <div className="tf-service-media-label">
              <span>12+ years’ experience</span>

              <strong>
                Fitting tracks across England.
              </strong>
            </div>
          </div>
        </section>

        <section className="tf-service-answer">
          <div className="tf-container">
            <p className="tf-eyebrow">
              Our experience
            </p>

            <h2>
              From straightforward fittings to complex
              curtain-track projects.
            </h2>

            <p>
              No two installations are exactly the
              same. Over the past 12 years, we have
              worked with different wall and ceiling
              structures, curtain weights, window
              shapes, room layouts and track systems.
              This experience helps us identify the
              practical details that can determine
              whether an installation works properly.
            </p>
          </div>
        </section>

        <section className="tf-service-section tf-container">
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Nationwide experience
            </p>

            <h2>
              Track fitting from north to south and east
              to west.
            </h2>

            <p>
              Our work has taken us across England,
              supporting homeowners, landlords,
              designers, developers and commercial
              clients with professional curtain-track
              installation.
            </p>
          </div>

          <div className="tf-wave-consideration-grid">
            {experiencePoints.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tf-about-statement">
          <div className="tf-container tf-about-statement-layout">
            <div>
              <p className="tf-eyebrow">
                Built through experience
              </p>

              <h2>
                We understand what can go wrong before
                the track is fitted.
              </h2>
            </div>

            <div>
              <p>
                A curtain track may look simple, but the
                finished result depends on accurate
                positioning, appropriate fixings,
                structural support and enough clearance
                for the curtains.
              </p>

              <p>
                Heavy curtains, long track runs, bay
                windows, layered curtains and high
                ceilings all introduce additional
                considerations.
              </p>

              <p>
                Our experience helps us assess those
                details early and provide a clearer route
                from enquiry to installation.
              </p>
            </div>
          </div>
        </section>

        <section className="tf-service-section tf-container">
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              How we work
            </p>

            <h2>
              Practical standards behind every
              installation.
            </h2>
          </div>

          <div className="tf-about-values-grid">
            {values.map((value, index) => (
              <article key={value.title}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tf-service-final-cta">
          <div className="tf-container">
            <p className="tf-eyebrow">
              Start your project
            </p>

            <h2>
              Tell us where you need a track fitted.
            </h2>

            <p>
              Enter your postcode, provide the project
              details and upload photographs of the
              installation area. Our team will review
              the requirements and confirm the next
              steps.
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