import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { createMetadata } from "@/lib/seo/metadata";
import SiteHeader from "@/components/site/SiteHeader";
const pageTitle =
  "Commercial Curtain Track Installation UK";

const pageDescription =
  "Professional commercial curtain track installation for hotels, offices, healthcare settings, schools, landlords and public spaces across the UK.";

const pagePath =
  "/services/commercial-curtain-track-installation";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "commercial curtain track installation",
    "commercial curtain track fitter",
    "hotel curtain track installation",
    "office curtain track fitting",
    "healthcare curtain tracks",
    "heavy duty curtain track installation",
    "commercial curtain installers UK",
  ],
});

const sectors = [
  {
    number: "01",
    title: "Hotels and hospitality",
    description:
      "Curtain-track fitting for bedrooms, suites, lounges, meeting rooms and shared hospitality spaces.",
  },
  {
    number: "02",
    title: "Offices and workplaces",
    description:
      "Tracks for meeting rooms, flexible spaces, privacy curtains and interior screening installations.",
  },
  {
    number: "03",
    title: "Healthcare settings",
    description:
      "Installation planning for privacy curtains and suitable track systems, subject to site and specification review.",
  },
  {
    number: "04",
    title: "Schools and education",
    description:
      "Track fitting for classrooms, halls, performance spaces and multi-purpose areas.",
  },
  {
    number: "05",
    title: "Landlords and developers",
    description:
      "Repeatable curtain-track installation across apartments, rental properties and development projects.",
  },
  {
    number: "06",
    title: "Public and community spaces",
    description:
      "Track systems for halls, venues, places of worship and other shared environments.",
  },
];

const projectChecks = [
  {
    title: "Track specification",
    description:
      "The selected track must suit the curtain weight, span, fixing position and expected frequency of use.",
  },
  {
    title: "Structural support",
    description:
      "Ceiling and wall structures must provide suitable fixing points. Suspended ceilings and concealed voids require particular care.",
  },
  {
    title: "Access and working height",
    description:
      "High ceilings, restricted areas, staircases and occupied premises can affect access equipment and installation planning.",
  },
  {
    title: "Curtain layers and spacing",
    description:
      "Voiles, main curtains and specialist layers need enough separation to move independently without colliding.",
  },
  {
    title: "Programme and site coordination",
    description:
      "Installation may need to be coordinated with contractors, decorators, electricians, ceiling teams and project managers.",
  },
  {
    title: "Handover and testing",
    description:
      "Tracks should be checked for secure fixing, alignment, runner movement and compatibility with the finished curtains.",
  },
];

const process = [
  {
    number: "01",
    title: "Project enquiry",
    description:
      "Send the site location, track quantities, drawings, photographs and expected installation programme.",
  },
  {
    number: "02",
    title: "Technical review",
    description:
      "We review the track type, fixing surfaces, ceiling details, access requirements and curtain specification.",
  },
  {
    number: "03",
    title: "Scope and quotation",
    description:
      "You receive a proposed installation scope, assumptions, exclusions and quotation for the agreed work.",
  },
  {
    number: "04",
    title: "Site installation",
    description:
      "The tracks are positioned, securely fitted and checked in line with the agreed project requirements.",
  },
];

const faqItems = [
  {
    question:
      "Can TrackFit work with main contractors and interior designers?",
    answer:
      "Yes. TrackFit can review drawings, specifications, photographs and proposed ceiling details before installation. Clear coordination is important where other trades affect the fixing area.",
  },
  {
    question:
      "Can commercial tracks be fitted into suspended ceilings?",
    answer:
      "Not usually into the ceiling tiles alone. The track normally requires suitable structural support above or behind the visible ceiling. The fixing arrangement must be reviewed before installation.",
  },
  {
    question:
      "Can you install customer-supplied commercial tracks?",
    answer:
      "Potentially, subject to a review of the system, components, track length, bracket spacing and suitability for the intended curtains.",
  },
  {
    question:
      "Do you cover multi-room or multi-site projects?",
    answer:
      "Yes, depending on location, quantity, programme and access. Larger projects should include room schedules, drawings and a clear installation sequence.",
  },
];

export default function CommercialCurtainTrackPage() {
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
            name: "Commercial Curtain Track Installation",
            path: pagePath,
          },
        ]}
      />

      <ServiceSchema
        name={pageTitle}
        description={pageDescription}
        path={pagePath}
        serviceType="Commercial curtain track installation"
      />

      <main className="tf-service-page">
        <SiteHeader />
    
        <section className="tf-service-hero tf-container">
          <div className="tf-service-hero-copy">
            <p className="tf-eyebrow">
              Commercial installation
            </p>

            <h1>
              Curtain-track installation for demanding
              commercial spaces.
            </h1>

            <p className="tf-service-introduction">
              TrackFit installs commercial curtain
              tracks for hotels, offices, healthcare
              settings, schools, landlords, developers
              and public spaces across the United
              Kingdom. Each project is reviewed for
              track specification, structural support,
              access, curtain weight and site
              coordination.
            </p>

            <div className="tf-service-actions">
              <Link
                href="/"
                className="tf-service-primary-button"
              >
                Submit a commercial enquiry
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="#commercial-sectors"
                className="tf-service-secondary-button"
              >
                Explore project types
              </a>
            </div>

            <div className="tf-service-trust-line">
              <span>Single sites</span>
              <i />
              <span>Multi-room projects</span>
              <i />
              <span>Nationwide coverage</span>
            </div>
          </div>

          <div className="tf-service-hero-media">
            <Image
              src="/images/hero/trackfit-entry-poster.jpeg"
              alt="Commercial curtain track installation"
              width={900}
              height={1100}
              priority
            />

            <div className="tf-service-media-label">
              <span>Commercial projects</span>

              <strong>
                Planned, coordinated and professionally
                fitted.
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
              What is commercial curtain-track
              installation?
            </h2>

            <p>
              Commercial curtain-track installation is
              the planning and fitting of track systems
              within workplaces, hospitality venues,
              healthcare settings, education buildings,
              rental developments and public spaces.
              Projects may involve long track runs,
              heavy curtains, high ceilings, multiple
              rooms and coordination with other trades.
              Successful installation depends on a
              suitable specification, secure structural
              support and clear site planning.
            </p>
          </div>
        </section>

        <section
          id="commercial-sectors"
          className="tf-service-section tf-container"
        >
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Commercial sectors
            </p>

            <h2>
              Track installation across a range of
              working environments.
            </h2>

            <p>
              Every setting has different access,
              durability, privacy and coordination
              requirements. The installation approach
              is reviewed against the actual project.
            </p>
          </div>

          <div className="tf-wave-consideration-grid">
            {sectors.map((sector) => (
              <article key={sector.number}>
                <span>{sector.number}</span>
                <h3>{sector.title}</h3>
                <p>{sector.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tf-service-process">
          <div className="tf-container">
            <div className="tf-service-section-heading">
              <p className="tf-eyebrow">
                Project process
              </p>

              <h2>
                From technical review to site
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

        <section className="tf-wave-considerations tf-container">
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Technical planning
            </p>

            <h2>
              What must be checked before commercial
              installation?
            </h2>

            <p>
              Commercial projects often fail when the
              track, ceiling support and curtain
              requirements are considered separately.
              They need to be planned together.
            </p>
          </div>

          <div className="tf-wave-consideration-grid">
            {projectChecks.map((item, index) => (
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
                Structural coordination
              </p>

              <h2>
                Curtain tracks need proper support
                behind the finished surface.
              </h2>
            </div>

            <div>
              <p>
                Plasterboard, ceiling tiles and visible
                finishes do not automatically provide
                sufficient support for commercial
                curtain tracks. The fixing must transfer
                the load into an appropriate structure.
              </p>

              <p>
                Long tracks, layered curtains and heavy
                fabrics can require additional timber,
                steelwork, brackets or specialist fixing
                arrangements before the finished ceiling
                is closed.
              </p>

              <p>
                Early coordination with the ceiling
                contractor, designer and project manager
                can prevent delays, remedial work and
                unsuitable fixing conditions.
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
              Commercial curtain-track installation
              FAQs.
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
              Commercial enquiries
            </p>

            <h2>
              Send us your project details.
            </h2>

            <p>
              Include the project address, track
              quantities, drawings, photographs,
              expected curtain weights, ceiling details
              and proposed installation dates.
            </p>

            <Link
              href="/"
              className="tf-service-primary-button"
            >
              Start a commercial enquiry
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}