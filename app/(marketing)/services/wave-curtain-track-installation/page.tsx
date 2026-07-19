import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { createMetadata } from "@/lib/seo/metadata";
import SiteHeader from "@/components/site/SiteHeader";
const pageTitle =
  "Wave Curtain Track Installation UK";

const pageDescription =
  "Professional wave curtain track installation across the UK for homes, interior designers, hotels and commercial projects. Accurate track positioning, glider spacing and curtain clearance.";

const pagePath =
  "/services/wave-curtain-track-installation";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "wave curtain track installation",
    "wave curtain track fitter",
    "wave curtain fitting service",
    "ceiling mounted wave track",
    "wave curtain glider spacing",
    "wave curtain installation UK",
  ],
});

const benefits = [
  {
    number: "01",
    title: "Consistent folds",
    description:
      "Wave gliders maintain regular spacing so the curtain forms smooth, even folds across the track.",
  },
  {
    number: "02",
    title: "Clean appearance",
    description:
      "Ceiling-mounted wave tracks can create a minimal, architectural finish with the track positioned close to the ceiling.",
  },
  {
    number: "03",
    title: "Smooth operation",
    description:
      "Correct runners, spacing and track alignment help the curtains travel smoothly when opened and closed.",
  },
  {
    number: "04",
    title: "Flexible applications",
    description:
      "Wave systems can be used for single curtains, voile layers, blackout curtains and selected commercial installations.",
  },
];

const considerations = [
  {
    title: "Track-to-wall clearance",
    description:
      "The track needs sufficient distance from the wall, window handles, radiators and other obstructions so the folds can form without rubbing.",
  },
  {
    title: "Multiple curtain layers",
    description:
      "Voiles and main curtains normally require separate tracks with enough spacing between each layer. The exact requirement depends on the heading depth and fabric volume.",
  },
  {
    title: "Curtain stack-back",
    description:
      "Wave curtains need space at the sides of the window when open. Track length and available wall space affect where the curtain stack will sit.",
  },
  {
    title: "Structural support",
    description:
      "The ceiling or wall must provide suitable support for the track, curtain weight and frequency of use. Long or heavy systems may require additional brackets.",
  },
  {
    title: "Glider specification",
    description:
      "Wave appearance depends on compatible runners, cords and heading tape. Mixing incompatible components may produce uneven folds or poor movement.",
  },
  {
    title: "Fabric and fullness",
    description:
      "The curtain workroom must make the curtains to the correct fullness and wave specification. Installation cannot correct curtains manufactured to the wrong dimensions.",
  },
];

const process = [
  {
    number: "01",
    title: "Project information",
    description:
      "Tell us the postcode, window type, track quantity and whether the track will be ceiling or wall mounted.",
  },
  {
    number: "02",
    title: "Photograph review",
    description:
      "Upload clear photographs showing the full window, ceiling, side walls and any existing fittings or obstructions.",
  },
  {
    number: "03",
    title: "Spacing assessment",
    description:
      "We consider the number of curtain layers, heading depth, curtain weight and the available fixing area.",
  },
  {
    number: "04",
    title: "Installation",
    description:
      "The track is positioned, levelled, securely fixed and checked for smooth curtain movement.",
  },
];

const faqItems = [
  {
    question:
      "Can a wave curtain track be fixed directly to the ceiling?",
    answer:
      "Yes, when the ceiling provides a suitable fixing structure. The installer must assess the ceiling material, available support and the expected curtain weight before installation.",
  },
  {
    question:
      "How much space is needed for a wave curtain track?",
    answer:
      "The required clearance depends on the curtain heading, wave depth, window handles, radiators and whether there are multiple curtain layers. A single wave track generally needs less space than a layered voile-and-curtain arrangement.",
  },
  {
    question:
      "Can wave curtains be fitted to a bay window?",
    answer:
      "Wave curtains can sometimes be used with shaped or bay-window tracks, but the track radius, corners, runner compatibility and curtain movement need careful assessment.",
  },
  {
    question:
      "Can TrackFit install tracks supplied by the customer?",
    answer:
      "Customer-supplied tracks may be installed after confirming that the system is complete, suitable for the space and compatible with the intended curtains. Missing or unsuitable parts may prevent installation.",
  },
];

export default function WaveCurtainTrackInstallationPage() {
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
            name: "Wave Curtain Track Installation",
            path: pagePath,
          },
        ]}
      />

      <ServiceSchema
        name={pageTitle}
        description={pageDescription}
        path={pagePath}
        serviceType="Wave curtain track installation"
      />

      <main className="tf-service-page">
        <SiteHeader />
     
        <section className="tf-service-hero tf-container">
          <div className="tf-service-hero-copy">
            <p className="tf-eyebrow">
              Specialist wave systems
            </p>

            <h1>
              Wave curtain tracks, precisely positioned.
            </h1>

            <p className="tf-service-introduction">
              TrackFit installs wave curtain tracks for
              homes, interior designers, hotels and
              commercial projects across the United
              Kingdom. Correct positioning is essential
              for even folds, smooth movement and
              sufficient clearance from walls, windows
              and additional curtain layers.
            </p>

            <div className="tf-service-actions">
              <Link
                href="/"
                className="tf-service-primary-button"
              >
                Request wave-track installation
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="#wave-guide"
                className="tf-service-secondary-button"
              >
                Read the installation guide
              </a>
            </div>

            <div className="tf-service-trust-line">
              <span>Ceiling mounted</span>
              <i />
              <span>Wall mounted</span>
              <i />
              <span>Single or layered systems</span>
            </div>
          </div>

          <div className="tf-service-hero-media">
            <Image
              src="/images/hero/trackfit-entry-poster.jpeg"
              alt="Installer preparing a wave curtain track"
              width={900}
              height={1100}
              priority
            />

            <div className="tf-service-media-label">
              <span>Wave track specialists</span>

              <strong>
                Consistent folds. Smooth movement.
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
              What is a wave curtain track?
            </h2>

            <p>
              A wave curtain track uses evenly spaced,
              cord-linked runners to hold the curtain
              hooks at consistent intervals. When the
              curtain is made with compatible wave
              heading tape, this creates regular,
              flowing folds. A successful installation
              depends on accurate track positioning,
              compatible components, suitable structural
              support and enough space for the folds to
              form and stack correctly.
            </p>
          </div>
        </section>

        <section
          id="wave-guide"
          className="tf-service-section tf-container"
        >
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Why choose wave curtains?
            </p>

            <h2>
              A contemporary curtain finish with
              controlled, even folds.
            </h2>

            <p>
              Wave curtains are widely used where a
              clean and structured appearance is
              required. The final appearance depends on
              both the track installation and the
              curtain manufacturing specification.
            </p>
          </div>

          <div className="tf-service-process-grid tf-wave-benefit-grid">
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
                From project review to accurate fitting.
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
              Technical considerations
            </p>

            <h2>
              What must be checked before a wave track
              is fitted?
            </h2>

            <p>
              Wave systems need more planning than a
              basic straight track because the curtain
              folds, stack-back and multiple layers all
              occupy physical space.
            </p>
          </div>

          <div className="tf-wave-consideration-grid">
            {considerations.map(
              (consideration, index) => (
                <article key={consideration.title}>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{consideration.title}</h3>

                  <p>
                    {consideration.description}
                  </p>
                </article>
              )
            )}
          </div>
        </section>

        <section className="tf-wave-spacing">
          <div className="tf-container tf-wave-spacing-layout">
            <div>
              <p className="tf-eyebrow">
                Layered curtains
              </p>

              <h2>
                Wave curtains and voiles need adequate
                spacing.
              </h2>
            </div>

            <div>
              <p>
                A voile track and a main-curtain track
                should not be positioned too closely
                together. Each heading needs room to
                form, travel and stack without colliding
                with the other layer.
              </p>

              <p>
                The required distance varies by track
                profile, bracket design, wave depth,
                curtain fullness and fabric thickness.
                Large or heavy curtains may require more
                clearance and stronger structural
                support.
              </p>

              <p>
                TrackFit reviews the proposed track
                system and available fixing space before
                confirming the installation approach.
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
              Wave curtain track installation FAQs.
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
              Start your project
            </p>

            <h2>
              Request professional wave-track fitting.
            </h2>

            <p>
              Enter your postcode, select wave track
              and upload photographs of the installation
              area. The TrackFit team will review the
              project before confirming the next steps.
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