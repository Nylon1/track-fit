import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import { createMetadata } from "@/lib/seo/metadata";

const pageTitle =
  "Residential Curtain Track Installation UK";

const pageDescription =
  "Professional residential curtain track installation for houses, flats, apartments, extensions, new builds and period properties across the UK.";

const pagePath =
  "/services/residential-curtain-track-installation";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  keywords: [
    "residential curtain track installation",
    "home curtain track fitter",
    "curtain track installation for houses",
    "curtain track fitting for flats",
    "new build curtain track installation",
    "bay window curtain track fitting",
    "bedroom curtain track installation",
    "living room curtain tracks",
  ],
});

const propertyTypes = [
  {
    number: "01",
    title: "Detached and semi-detached houses",
    description:
      "Track fitting for living rooms, bedrooms, dining rooms, extensions and full-property projects.",
  },
  {
    number: "02",
    title: "Terraced houses",
    description:
      "Installation for traditional room layouts, front bays, rear extensions and space-conscious interiors.",
  },
  {
    number: "03",
    title: "Flats and apartments",
    description:
      "Track installation for compact rooms, large glazing, rental properties and modern apartment developments.",
  },
  {
    number: "04",
    title: "New-build homes",
    description:
      "Careful assessment of plasterboard, timber support, ceiling voids and modern window arrangements.",
  },
  {
    number: "05",
    title: "Period properties",
    description:
      "Track fitting around high ceilings, cornices, uneven walls, traditional bays and older structures.",
  },
  {
    number: "06",
    title: "Extensions and conversions",
    description:
      "Installation for open-plan spaces, loft conversions, glazed extensions and newly altered rooms.",
  },
];

const rooms = [
  {
    title: "Living rooms",
    description:
      "Straight, bay, ceiling-mounted and wall-mounted tracks for main reception spaces.",
  },
  {
    title: "Bedrooms",
    description:
      "Tracks for blackout curtains, full-height curtains, voiles and layered window treatments.",
  },
  {
    title: "Dining rooms",
    description:
      "Neat track fitting around feature windows, patio doors and formal room layouts.",
  },
  {
    title: "Kitchens and extensions",
    description:
      "Installation around wide glazing, bifold doors, French doors and modern open-plan spaces.",
  },
  {
    title: "Nurseries and children’s rooms",
    description:
      "Secure curtain-track fitting with practical positioning around furniture and windows.",
  },
  {
    title: "Home offices",
    description:
      "Track systems for glare control, privacy and softer residential workspaces.",
  },
  {
    title: "Dressing rooms",
    description:
      "Tracks for windows, room dividers and selected wardrobe or storage screening applications.",
  },
  {
    title: "Hallways and landings",
    description:
      "Installation for tall windows, stairwell glazing and difficult-access locations.",
  },
];

const windowTypes = [
  {
    title: "Standard straight windows",
    description:
      "Wall-mounted or ceiling-mounted tracks positioned to suit the curtain heading and room layout.",
  },
  {
    title: "Bay windows",
    description:
      "Angled, curved, square and box-bay track systems measured around the shape of the window.",
  },
  {
    title: "Large windows",
    description:
      "Long track runs assessed for track strength, bracket spacing, curtain weight and access.",
  },
  {
    title: "Floor-to-ceiling glazing",
    description:
      "Ceiling-mounted track layouts for modern homes, apartments and glazed extensions.",
  },
  {
    title: "Patio and French doors",
    description:
      "Tracks positioned to allow curtain movement while protecting access to the doorway.",
  },
  {
    title: "Bifold and sliding doors",
    description:
      "Track planning around wide openings, curtain stack-back and door operation.",
  },
  {
    title: "Corner windows",
    description:
      "Track systems planned around internal corners, returns and changing wall directions.",
  },
  {
    title: "Apex and shaped windows",
    description:
      "Specialist assessment for sloping ceilings, tall glazing and non-standard window geometry.",
  },
];

const trackTypes = [
  "Straight curtain tracks",
  "Wave curtain tracks",
  "Bay-window tracks",
  "Curved tracks",
  "Ceiling-mounted tracks",
  "Wall-mounted tracks",
  "Single-track systems",
  "Double-track voile and curtain systems",
  "Long-span tracks",
  "Heavy-duty residential tracks",
];

const process = [
  {
    number: "01",
    title: "Tell us about the property",
    description:
      "Provide the postcode, property type, room, number of windows and approximate track requirements.",
  },
  {
    number: "02",
    title: "Upload photographs",
    description:
      "Show the full window, ceiling, walls, handles, radiators and any existing curtain fittings.",
  },
  {
    number: "03",
    title: "Project review",
    description:
      "TrackFit reviews the fixing surfaces, window shape, curtain type, access and required clearance.",
  },
  {
    number: "04",
    title: "Quotation and fitting",
    description:
      "You receive the proposed scope and quotation before installation arrangements are confirmed.",
  },
];

const faqItems = [
  {
    question:
      "Can you fit curtain tracks throughout a whole house?",
    answer:
      "Yes. Whole-house projects can include bedrooms, living rooms, kitchens, bay windows, patio doors and other rooms. A room and window schedule helps us review larger projects accurately.",
  },
  {
    question:
      "Can you install tracks in a new-build property?",
    answer:
      "Yes, but the wall and ceiling construction should be checked carefully. New-build plasterboard and ceiling voids may require suitable support behind the finished surface.",
  },
  {
    question:
      "Can you fit tracks to bay windows?",
    answer:
      "Yes. We assess angled, curved, square and unusually shaped bays for measurements, corner movement, fixing support and curtain stack-back.",
  },
  {
    question:
      "Can you install both voiles and main curtains?",
    answer:
      "Yes, where there is enough space and support for two separate tracks. The spacing must suit the curtain headings and fabric depth.",
  },
];

export default function ResidentialCurtainTrackPage() {
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
            name: "Residential Curtain Track Installation",
            path: pagePath,
          },
        ]}
      />

      <ServiceSchema
        name={pageTitle}
        description={pageDescription}
        path={pagePath}
        serviceType="Residential curtain track installation"
      />

      <main className="tf-service-page">
        <SiteHeader />

        <section className="tf-residential-hero tf-container">
          <div>
            <p className="tf-eyebrow">
              Residential installation
            </p>

            <h1>
              Curtain-track fitting for every kind of
              home, room and window.
            </h1>

            <p className="tf-service-introduction">
              TrackFit installs curtain tracks in houses,
              flats, apartments, new builds, period
              properties, extensions and converted
              spaces across the United Kingdom. We work
              across bedrooms, living rooms, kitchens,
              dining rooms, home offices and other
              residential spaces, including standard,
              bay, curved, large and unusually shaped
              windows.
            </p>

            <div className="tf-service-actions">
              <Link
                href="/"
                className="tf-service-primary-button"
              >
                Start your home installation request
                <span aria-hidden="true">→</span>
              </Link>

              <a
                href="#property-types"
                className="tf-service-secondary-button"
              >
                Explore residential projects
              </a>
            </div>

            <div className="tf-service-trust-line">
              <span>All property types</span>
              <i />
              <span>All rooms</span>
              <i />
              <span>All window shapes</span>
            </div>
          </div>

          <div className="tf-residential-hero-panel">
            <span>12+ years’ experience</span>

            <h2>
              From one bedroom window to a full-house
              installation.
            </h2>

            <p>
              Every home is different. We review the
              fixing surface, track type, curtain
              weight, room layout, access and available
              clearance before confirming the fitting
              approach.
            </p>

            <ul>
              <li>Single-window installations</li>
              <li>Whole-house projects</li>
              <li>New-build and renovation work</li>
              <li>Complex bays and large glazing</li>
            </ul>
          </div>
        </section>

        <section className="tf-service-answer">
          <div className="tf-container">
            <p className="tf-eyebrow">
              Residential specialists
            </p>

            <h2>
              Professional curtain-track installation
              for homes of every age and style.
            </h2>

            <p>
              Residential curtain-track installation
              includes the assessment, positioning and
              secure fitting of tracks within a home.
              The correct installation depends on the
              property structure, room layout, window
              shape, curtain heading, curtain weight and
              intended use. TrackFit handles both
              straightforward domestic fittings and
              more technical projects involving bays,
              long spans, high ceilings and layered
              curtains.
            </p>
          </div>
        </section>

        <section
          id="property-types"
          className="tf-service-section tf-container"
        >
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Property types
            </p>

            <h2>
              Curtain tracks for every kind of
              residential property.
            </h2>

            <p>
              The fixing method and installation plan
              may vary considerably between a modern
              apartment, a new-build house and an older
              period property.
            </p>
          </div>

          <div className="tf-wave-consideration-grid">
            {propertyTypes.map((item) => (
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
                Rooms we work in
              </p>

              <h2>
                Track fitting throughout the home.
              </h2>
            </div>

            <div className="tf-residential-room-grid">
              {rooms.map((room, index) => (
                <article key={room.title}>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{room.title}</h3>
                  <p>{room.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tf-service-section tf-container">
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Window types
            </p>

            <h2>
              Tracks for standard, large and unusual
              windows.
            </h2>

            <p>
              Window shape affects track selection,
              fixing position, runner movement, curtain
              stack-back and the amount of structural
              support required.
            </p>
          </div>

          <div className="tf-residential-window-grid">
            {windowTypes.map((window, index) => (
              <article key={window.title}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3>{window.title}</h3>
                  <p>{window.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="tf-residential-track-types">
          <div className="tf-container tf-residential-track-layout">
            <div>
              <p className="tf-eyebrow">
                Track systems
              </p>

              <h2>
                Residential track options for different
                curtain requirements.
              </h2>

              <p>
                Track selection depends on the window,
                curtain heading, fabric weight, fixing
                structure and the visual finish required.
              </p>
            </div>

            <div className="tf-residential-track-list">
              {trackTypes.map((track, index) => (
                <div key={track}>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{track}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tf-service-process">
          <div className="tf-container">
            <div className="tf-service-section-heading">
              <p className="tf-eyebrow">
                How it works
              </p>

              <h2>
                From your property details to
                professional fitting.
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

        <section className="tf-service-section tf-container">
          <div className="tf-service-section-heading">
            <p className="tf-eyebrow">
              Common questions
            </p>

            <h2>
              Residential curtain-track installation
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
              Start your project
            </p>

            <h2>
              Tell us what you need fitted at home.
            </h2>

            <p>
              Enter your postcode, select the closest
              track type and upload clear photographs of
              the room, window, wall and ceiling.
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