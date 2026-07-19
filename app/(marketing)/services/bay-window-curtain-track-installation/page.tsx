import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { createMetadata } from "@/lib/seo/metadata";
import SiteHeader from "@/components/site/SiteHeader";
const pageTitle =
  "Bay Window Curtain Track Installation UK";

const pageDescription =
  "Professional bay window curtain track installation across the UK for angled, curved and shaped windows. TrackFit assesses measurements, bends, fixing surfaces, curtain weight and required clearance.";

const pagePath =
  "/services/bay-window-curtain-track-installation";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "bay window curtain track installation",
    "bay window curtain track fitter",
    "curved bay curtain track",
    "ceiling mounted bay window track",
    "bay window curtain fitting service",
    "made to measure bay curtain track",
  ],
});

const bayTypes = [
  {
    number: "01",
    title: "Angled bay windows",
    description:
      "Straight track sections joined or formed around defined corners, commonly found in three-sided and five-sided bay windows.",
  },
  {
    number: "02",
    title: "Curved bay windows",
    description:
      "Track systems shaped to follow a continuous radius or rounded architectural window.",
  },
  {
    number: "03",
    title: "Square and box bays",
    description:
      "Tracks fitted around projecting windows with more pronounced internal corners and returns.",
  },
  {
    number: "04",
    title: "Apex and unusual shapes",
    description:
      "Specialist assessment for windows with sloping ceilings, changing heights or non-standard geometry.",
  },
];

const checks = [
  {
    title: "Accurate bay measurements",
    description:
      "Each straight section, corner angle, radius, return and projection must be measured accurately. Small errors can prevent a shaped track from fitting correctly.",
  },
  {
    title: "Corner movement",
    description:
      "Runners must travel through bends and joins without catching. Sharp angles may require specialist components or separate track sections.",
  },
  {
    title: "Ceiling or wall fixing",
    description:
      "The available fixing surface determines the brackets, support spacing and installation approach. Ceiling-mounted bay tracks often provide the cleanest finish.",
  },
  {
    title: "Curtain weight",
    description:
      "Heavy or lined curtains place more load on the bends and brackets. Stronger tracks or additional fixing points may be required.",
  },
  {
    title: "Window handles and radiators",
    description:
      "The track must sit far enough away from handles, sills, radiators and walls so the curtains can move and hang freely.",
  },
  {
    title: "Stack-back space",
    description:
      "Curtains need somewhere to sit when open. Limited side-wall space may affect track length, curtain split and final stack position.",
  },
];

const process = [
  {
    number: "01",
    title: "Send the project details",
    description:
      "Enter the installation postcode, property type, estimated track quantity and the closest track option.",
  },
  {
    number: "02",
    title: "Upload clear photographs",
    description:
      "Include the full bay, ceiling, side walls, corners, window handles and any existing fittings.",
  },
  {
    number: "03",
    title: "Measurement review",
    description:
      "The TrackFit team checks the bay shape, proposed fixing surface, access and curtain requirements.",
  },
  {
    number: "04",
    title: "Track preparation and fitting",
    description:
      "The approved track is prepared, positioned, fixed securely and tested through the full bay.",
  },
];

const faqItems = [
  {
    question:
      "Can one curtain track go around the whole bay window?",
    answer:
      "Often yes, provided the track system can be shaped or joined around the bay and the runners can travel through the corners. Very sharp angles or unusual structures may require separate sections.",
  },
  {
    question:
      "Is a ceiling-mounted track best for a bay window?",
    answer:
      "Ceiling mounting can create a clean finish and may make it easier to follow the bay shape. The ceiling must provide suitable structural support for the track and curtain weight.",
  },
  {
    question:
      "Can wave curtains be used in a bay window?",
    answer:
      "Sometimes. The bend radius, runner system, wave spacing and available stack-back space must all be suitable. Tight corners can affect the formation and movement of wave folds.",
  },
  {
    question:
      "Do you need a template for a bay curtain track?",
    answer:
      "Some made-to-shape systems may require a physical or measured template. Others can be prepared using accurate dimensions and angles. The required method depends on the selected track.",
  },
];

export default function BayWindowCurtainTrackPage() {
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
            name: "Bay Window Curtain Track Installation",
            path: pagePath,
          },
        ]}
      />

      <ServiceSchema
        name={pageTitle}
        description={pageDescription}
        path={pagePath}
        serviceType="Bay window curtain track installation"
      />

      <main className="tf-service-page">
       <SiteHeader />

        <section className="tf-service-hero tf-container">
          <div className="tf-service-hero-copy">
            <p className="tf-eyebrow">
              Angled and curved windows
            </p>

            <h1>
              Bay window curtain tracks fitted around
              the architecture.
            </h1>

            <p className="tf-service-introduction">
              TrackFit installs curtain tracks for
              angled, curved, square and unusually
              shaped bay windows across the United
              Kingdom. Each project is assessed for
              measurements, corner movement, fixing
              strength, curtain weight and available
              clearance.
            </p>

            <div className="tf-service-actions">
              <Link
                href="/"
                className="tf-service-primary-button"
              >
                Request bay-track installation
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="#bay-guide"
                className="tf-service-secondary-button"
              >
                Read the bay-window guide
              </a>
            </div>

            <div className="tf-service-trust-line">
              <span>Angled bays</span>
              <i />
              <span>Curved bays</span>
              <i />
              <span>Specialist shapes</span>
            </div>
          </div>

          <div className="tf-service-hero-media">
            <Image
              src="/images/hero/trackfit-entry-poster.jpeg"
              alt="Specialist curtain track installation for a bay window"
              width={900}
              height={1100}
              priority
            />

            <div className="tf-service-media-label">
              <span>Bay-window specialists</span>

              <strong>
                Measured for the shape of your space.
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
              What is a bay window curtain track?
            </h2>

            <p>
              A bay window curtain track is a straight,
              joined or shaped track designed to follow
              the internal outline of a projecting
              window. Depending on the bay, it may
              include angled corners, curved sections or
              multiple returns. Correct installation
              requires accurate measurements, smooth
              runner movement through the corners,
              suitable structural support and enough
              clearance for the curtains to hang and
              stack correctly.
            </p>
          </div>
        </section>

        <section
          id="bay-guide"
          className="tf-service-section tf-container"
        >
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Bay-window shapes
            </p>

            <h2>
              Track systems for different bay-window
              designs.
            </h2>

            <p>
              Bay windows vary significantly. The
              correct track and fitting method depend on
              the angles, radius, fixing surface and the
              type of curtain being installed.
            </p>
          </div>

          <div className="tf-service-process-grid tf-bay-type-grid">
            {bayTypes.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
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
                From the bay shape to the final fitting.
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
              What must be checked before fitting a bay
              track?
            </h2>

            <p>
              Bay tracks have more variables than a
              straight installation. The track must
              follow the window while still supporting
              reliable curtain movement.
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
                Accurate planning
              </p>

              <h2>
                The track must follow the bay without
                restricting the curtains.
              </h2>
            </div>

            <div>
              <p>
                A bay track should sit at a consistent
                and practical distance from the window
                where possible. Variations in the walls,
                ceiling line or bay projection may
                require careful positioning.
              </p>

              <p>
                Corners must be smooth enough for the
                selected runners and curtain hooks.
                Tight bends can create resistance,
                particularly with heavy curtains or
                linked wave runners.
              </p>

              <p>
                The final design should also consider
                where the curtains will stack when open,
                how the window handles operate and
                whether radiators or furniture restrict
                the curtain path.
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
              Bay window curtain track FAQs.
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
              Request professional bay-window track
              fitting.
            </h2>

            <p>
              Enter your postcode and upload clear
              photographs of the entire bay. Include the
              ceiling, side walls, corners and any
              existing tracks or obstructions.
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