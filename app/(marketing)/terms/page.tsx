import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { createMetadata } from "@/lib/seo/metadata";

const pageTitle = "Website Terms and Conditions";
const pageDescription =
  "Terms governing use of the TrackFit website and online installation enquiry service.";
const pagePath = "/terms";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            path: "/",
          },
          {
            name: "Terms and Conditions",
            path: pagePath,
          },
        ]}
      />

      <main className="tf-legal-page">
        <SiteHeader />

        <section className="tf-legal-hero tf-container">
          <p className="tf-eyebrow">Legal information</p>

          <h1>Website Terms and Conditions</h1>

          <p>
            These terms govern your use of the TrackFit
            website and online installation-enquiry
            journey.
          </p>

          <p className="tf-legal-updated">
            Last updated: 18 July 2026
          </p>
        </section>

        <article className="tf-legal-content tf-container">
          <section>
            <h2>1. About these terms</h2>

            <p>
              By using this website, you agree to these
              terms. If you do not agree, please do not use
              the website.
            </p>

            <p>
              These website terms do not replace the
              quotation, order confirmation, installation
              terms or other contractual documents provided
              for a specific project.
            </p>
          </section>

          <section>
            <h2>2. About TrackFit</h2>

            <div className="tf-legal-highlight">
              <p>
                <strong>Business name:</strong>{" "}
                [TrackFit]
              </p>

              <p>
                <strong>Trading name:</strong> TrackFit
              </p>

              <p>
                <strong>Business address:</strong>{" "}
                [36-44 Bolton Rd, Blackburn, BB2 3FA]
              </p>

              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:enquiries@curtaintrackfitters.com">
                  enquiries@curtaintrackfitters.com
                </a>
              </p>

              <p>
                <strong>Telephone:</strong>{" "}
                <a href="tel:08007720367">
                  0800 772 0367
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2>3. Website information</h2>

            <p>
              The website provides general information
              about TrackFit services and allows customers
              to submit installation enquiries.
            </p>

            <p>
              Website content is not a confirmed quotation,
              technical assessment, booking or guarantee
              that a particular installation can be
              completed.
            </p>

            <p>
              Installation suitability can only be
              confirmed after reviewing the relevant track,
              curtains, dimensions, fixing surfaces, access
              and project conditions.
            </p>
          </section>

          <section>
            <h2>4. Postcode and coverage checks</h2>

            <p>
              A postcode result indicates the general
              availability of our service in an area. It
              does not guarantee that we can accept a
              particular project or attend on a particular
              date.
            </p>

            <p>
              Coverage may depend on project size,
              installer availability, travel requirements
              and the technical nature of the work.
            </p>
          </section>

          <section>
            <h2>5. Installation enquiries</h2>

            <p>
              When submitting an enquiry, you agree to
              provide information that is accurate and
              complete to the best of your knowledge.
            </p>

            <p>
              This may include:
            </p>

            <ul>
              <li>Installation address or postcode</li>
              <li>Track type and approximate dimensions</li>
              <li>Number of windows or tracks</li>
              <li>Wall and ceiling information</li>
              <li>Curtain type and approximate weight</li>
              <li>Photographs, plans and access details</li>
            </ul>

            <p>
              Inaccurate, incomplete or misleading
              information may affect the quotation,
              installation plan, timescale or price.
            </p>
          </section>

          <section>
            <h2>6. Quotations</h2>

            <p>
              A quotation is only valid for the period
              stated in that quotation.
            </p>

            <p>
              Unless confirmed otherwise, quotations are
              based on the information, dimensions,
              photographs and project conditions provided
              to us.
            </p>

            <p>
              A quotation may be revised where:
            </p>

            <ul>
              <li>
                Measurements or quantities differ from
                those supplied
              </li>
              <li>
                The fixing structure is unsuitable or
                different from that described
              </li>
              <li>
                Additional equipment, labour or preparation
                is required
              </li>
              <li>
                Access is restricted or differs from the
                information provided
              </li>
              <li>
                The track, curtains or supplied components
                are incomplete or unsuitable
              </li>
              <li>The requested scope changes</li>
            </ul>
          </section>

          <section>
            <h2>7. Booking and contract formation</h2>

            <p>
              Submitting an online enquiry does not create
              a binding installation contract.
            </p>

            <p>
              A contract is formed only when the scope,
              price, relevant terms and booking have been
              expressly accepted or confirmed by TrackFit.
            </p>
          </section>

          <section>
            <h2>8. Customer-supplied tracks and materials</h2>

            <p>
              Where you supply the track, brackets,
              runners, curtains or other components, you
              are responsible for ensuring that the items
              are present, correctly specified and suitable
              for the intended installation.
            </p>

            <p>
              We may refuse or postpone installation where
              supplied items are incomplete, damaged,
              incompatible, unsafe or unsuitable for the
              proposed location.
            </p>

            <p>
              We are not responsible for manufacturing
              defects or performance problems caused by
              customer-supplied products.
            </p>
          </section>

          <section>
            <h2>9. Fixing surfaces and structural support</h2>

            <p>
              Curtain-track installation depends on the
              availability of a suitable fixing structure.
              Plasterboard, visible ceiling finishes and
              suspended ceiling tiles may not provide
              adequate support by themselves.
            </p>

            <p>
              Where suitable support is unavailable,
              additional preparation, reinforcement or
              remedial work may be required before
              installation can proceed.
            </p>

            <p>
              Unless expressly included in the quotation,
              structural work, electrical work, decorating,
              plastering and making good are excluded.
            </p>
          </section>

          <section>
            <h2>10. Access and site conditions</h2>

            <p>
              You must provide safe and reasonable access
              to the installation area.
            </p>

            <p>
              The working area should be clear of
              furniture, fragile items, pets and other
              obstructions where reasonably possible.
            </p>

            <p>
              You should inform us in advance about:
            </p>

            <ul>
              <li>High ceilings or staircases</li>
              <li>Restricted parking or access</li>
              <li>Permit or security requirements</li>
              <li>Known asbestos or hazardous materials</li>
              <li>Concealed cables, pipes or services</li>
              <li>Site inductions or working-hour limits</li>
            </ul>
          </section>

          <section>
            <h2>11. Installation dates</h2>

            <p>
              Any proposed date or timescale is an estimate
              unless expressly confirmed otherwise.
            </p>

            <p>
              We are not responsible for delays caused by
              events beyond our reasonable control,
              including traffic, weather, illness, supplier
              delay, access problems or unsafe site
              conditions.
            </p>
          </section>

          <section>
            <h2>12. Cancellations and changes</h2>

            <p>
              Cancellation and rescheduling rights may
              depend on the type of service, whether work
              has started, whether goods have been made or
              ordered specifically for you and the terms
              issued with your quotation.
            </p>

            <p>
              Any cancellation charges or non-refundable
              costs will be explained in the applicable
              quotation or installation terms.
            </p>
          </section>

          <section>
            <h2>13. Consumer rights</h2>

            <p>
              Nothing in these terms excludes or limits
              rights that cannot lawfully be excluded under
              applicable consumer law.
            </p>

            <p>
              Where you are a consumer, services must be
              provided with reasonable care and skill and
              relevant pre-contract information may form
              part of the agreement.
            </p>
          </section>

          <section>
            <h2>14. Website availability</h2>

            <p>
              We aim to keep the website available and
              accurate, but we do not guarantee continuous,
              uninterrupted or error-free access.
            </p>

            <p>
              We may update, suspend, withdraw or change
              parts of the website without notice.
            </p>
          </section>

          <section>
            <h2>15. Acceptable use</h2>

            <p>You must not:</p>

            <ul>
              <li>
                Use the website for unlawful, fraudulent
                or abusive purposes
              </li>
              <li>
                Attempt to gain unauthorised access to the
                website or its systems
              </li>
              <li>
                Introduce malware, malicious code or
                automated attacks
              </li>
              <li>
                Submit false, misleading or harmful content
              </li>
              <li>
                Copy or exploit website content without
                permission
              </li>
            </ul>
          </section>

          <section>
            <h2>16. Intellectual property</h2>

            <p>
              The TrackFit name, branding, website design,
              written content, graphics and software are
              owned by or licensed to us unless stated
              otherwise.
            </p>

            <p>
              You may view the website for personal and
              legitimate business-enquiry purposes. You may
              not reproduce, sell, republish or commercially
              exploit its content without written
              permission.
            </p>
          </section>

          <section>
            <h2>17. Links to other websites</h2>

            <p>
              The website may contain links to third-party
              services. We are not responsible for their
              availability, content, security or privacy
              practices.
            </p>
          </section>

          <section>
            <h2>18. Liability</h2>

            <p>
              We do not exclude liability where doing so
              would be unlawful.
            </p>

            <p>
              Subject to applicable law, we are not
              responsible for losses caused by reliance on
              general website information without a
              project-specific assessment or confirmed
              quotation.
            </p>
          </section>

          <section>
            <h2>19. Governing law</h2>

            <p>
              These website terms are governed by the laws
              of England and Wales.
            </p>

            <p>
              Courts with legal jurisdiction will deal
              with disputes arising from these terms,
              subject to any mandatory consumer rights.
            </p>
          </section>

          <section>
            <h2>20. Contact us</h2>

            <p>
              Questions about these terms can be sent to:
            </p>

            <p>
              <a href="mailto:enquiries@curtaintrackfitters.com">
                enquiries@curtaintrackfitters.com
              </a>
            </p>

            <p>
              <a href="tel:08007720367">
                0800 772 0367
              </a>
            </p>
          </section>

          <div className="tf-legal-actions">
            <Link
              href="/"
              className="tf-service-primary-button"
            >
              Return to TrackFit
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}