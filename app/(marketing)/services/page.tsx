import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { createMetadata } from "@/lib/seo/metadata";
import SiteHeader from "@/components/site/SiteHeader";

const pageTitle =
  "Curtain Track Installation Services UK";

const pageDescription =
  "Explore TrackFit curtain track installation services across the UK, including wave, bay window, ceiling-mounted, wall-mounted and commercial track fitting.";

const pagePath = "/services";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "curtain track installation services",
    "curtain track fitters UK",
    "professional curtain track fitting",
    "wave curtain track installation",
    "bay window curtain tracks",
    "ceiling mounted curtain tracks",
    "wall mounted curtain tracks",
    "commercial curtain track installation",
  ],
});

const services = [
  {
  title: "Residential Curtain Track Installation",
  description:
    "Track fitting for all types of houses, rooms and windows, from standard bedrooms to large bays and full-house projects.",
  href: "/services/residential-curtain-track-installation",
  label: "Residential",
},
  {
    title: "Curtain Track Installation",
    description:
      "Professional installation for straight, shaped, ceiling-mounted and wall-mounted curtain-track systems.",
    href: "/services/curtain-track-installation",
    label: "Core service",
  },
  {
    title: "Wave Curtain Track Installation",
    description:
      "Accurate positioning and spacing for smooth movement and consistent wave curtain folds.",
    href: "/services/wave-curtain-track-installation",
    label: "Wave systems",
  },
  {
    title: "Bay Window Curtain Track Installation",
    description:
      "Specialist fitting for angled, curved, square and unusually shaped bay windows.",
    href: "/services/bay-window-curtain-track-installation",
    label: "Shaped windows",
  },
  {
    title: "Ceiling-Mounted Curtain Tracks",
    description:
      "Ceiling-fixed systems assessed for structural support, curtain weight and required clearance.",
    href: "/services/ceiling-mounted-curtain-track-installation",
    label: "Ceiling fixed",
  },
  {
    title: "Wall-Mounted Curtain Tracks",
    description:
      "Wall-mounted installations with suitable bracket projection, fixing strength and positioning.",
    href: "/services/wall-mounted-curtain-track-installation",
    label: "Wall fixed",
  },
  {
    title: "Commercial Curtain Track Installation",
    description:
      "Track installation for hotels, offices, schools, landlords, developers and public spaces.",
    href: "/services/commercial-curtain-track-installation",
    label: "Commercial",
  },
];

const process = [
  {
    number: "01",
    title: "Enter your postcode",
    description:
      "Start by confirming the location of the installation.",
  },
  {
    number: "02",
    title: "Describe the project",
    description:
      "Tell us the track type, quantity, approximate size and curtain requirements.",
  },
  {
    number: "03",
    title: "Upload photographs",
    description:
      "Clear photographs help us assess fixing surfaces, access and possible obstructions.",
  },
  {
    number: "04",
    title: "Receive the next steps",
    description:
      "The TrackFit team reviews the project and confirms the proposed quotation process.",
  },
];

export default function ServicesPage() {
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
            path: pagePath,
          },
        ]}
      />

      <main className="tf-service-page">
        <SiteHeader />
        <section className="tf-services-hub-hero tf-container">
          <div className="tf-services-hub-copy">
            <p className="tf-eyebrow">
              TrackFit services
            </p>

            <h1>
              Professional curtain-track installation
              across the United Kingdom.
            </h1>

            <p>
              TrackFit provides specialist curtain-track
              fitting for homes, landlords, interior
              designers and commercial projects. Every
              enquiry is reviewed for track type, fixing
              surface, structural support, curtain
              weight, access and clearance.
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
                href="#trackfit-services"
                className="tf-service-secondary-button"
              >
                Explore services
              </a>
            </div>
          </div>

          <div className="tf-services-hub-visual">
            <Image
              src="/images/hero/trackfit-entry-poster.jpeg"
              alt="Professional curtain track installation by TrackFit"
              width={1000}
              height={900}
              priority
            />

            <div className="tf-service-media-label">
              <span>Nationwide installation</span>

              <strong>
                Where precision meets design.
              </strong>
            </div>
          </div>
        </section>

        <section className="tf-service-answer">
          <div className="tf-container">
            <p className="tf-eyebrow">
              What we do
            </p>

            <h2>
              Specialist fitting for different tracks,
              windows and spaces.
            </h2>

            <p>
              Curtain tracks must be selected and
              installed according to the room, fixing
              surface, curtain heading and expected
              load. TrackFit reviews each installation
              individually rather than treating every
              window as a standard fitting.
            </p>
          </div>
        </section>

        <section
          id="trackfit-services"
          className="tf-service-section tf-container"
        >
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Installation services
            </p>

            <h2>
              Choose the service closest to your
              project.
            </h2>

            <p>
              Customers who are unsure can select the
              general curtain-track installation service
              and upload photographs for review.
            </p>
          </div>

          <div className="tf-services-hub-grid">
            {services.map((service, index) => (
              <Link
                key={service.href}
                href={service.href}
                className="tf-services-hub-card"
              >
                <div className="tf-services-hub-card-top">
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <small>{service.label}</small>
                </div>

                <div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>

                <strong>
                  View service
                  <span aria-hidden="true">→</span>
                </strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="tf-service-process">
          <div className="tf-container">
            <div className="tf-service-section-heading">
              <p className="tf-eyebrow">
                How it works
              </p>

              <h2>
                A clear route from enquiry to
                installation.
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

        <section className="tf-wave-spacing">
          <div className="tf-container tf-wave-spacing-layout">
            <div>
              <p className="tf-eyebrow">
                Before installation
              </p>

              <h2>
                The correct fixing surface matters.
              </h2>
            </div>

            <div>
              <p>
                Curtain tracks must be fixed into a
                structure suitable for the track length
                and curtain weight. Plasterboard, timber,
                concrete, brick and suspended ceilings
                require different approaches.
              </p>

              <p>
                Clear photographs, ceiling information
                and accurate track details reduce the
                risk of unsuitable fixings, insufficient
                spacing and delays during installation.
              </p>

              <p>
                Heavy curtains, long tracks, bay windows
                and layered systems may require
                additional support or preparation before
                fitting.
              </p>
            </div>
          </div>
        </section>

        <section className="tf-service-final-cta">
          <div className="tf-container">
            <p className="tf-eyebrow">
              Begin your enquiry
            </p>

            <h2>
              Tell us what you need fitted.
            </h2>

            <p>
              Enter your postcode, select the closest
              service and upload photographs of the
              installation area. No payment is required
              to submit an initial request.
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