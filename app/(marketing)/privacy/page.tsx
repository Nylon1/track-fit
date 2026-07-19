import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/site/SiteHeader";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { createMetadata } from "@/lib/seo/metadata";

const pageTitle = "Privacy Policy";
const pageDescription =
  "TrackFit privacy policy explaining how we collect, use, store and protect personal information.";
const pagePath = "/privacy";

export const metadata: Metadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
});

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          {
            name: "Home",
            path: "/",
          },
          {
            name: "Privacy Policy",
            path: pagePath,
          },
        ]}
      />

      <main className="tf-legal-page">
        <SiteHeader />

        <section className="tf-legal-hero tf-container">
          <p className="tf-eyebrow">Legal information</p>

          <h1>Privacy Policy</h1>

          <p>
            This policy explains how TrackFit collects,
            uses, stores and protects personal information
            when you use our website, request a quotation
            or communicate with us.
          </p>

          <p className="tf-legal-updated">
            Last updated: 18 July 2026
          </p>
        </section>

        <article className="tf-legal-content tf-container">
          <section>
            <h2>1. Who we are</h2>

            <p>
              TrackFit provides professional curtain-track
              installation services.
            </p>

            <p>
              The data controller responsible for your
              personal information is:
            </p>

            <div className="tf-legal-highlight">
              <p>
                <strong>Business name:</strong>{" "}
                [TrackFit]
              </p>

              <p>
                <strong>TrackFit:</strong> TrackFit
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
            <h2>2. Information we collect</h2>

            <p>
              Depending on how you use the website and our
              services, we may collect:
            </p>

            <ul>
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your telephone number</li>
              <li>
                Your postcode, installation address or
                project location
              </li>
              <li>
                Property, room, window and curtain-track
                information
              </li>
              <li>
                Photographs, measurements, plans and other
                files you upload
              </li>
              <li>
                Messages and correspondence you send to us
              </li>
              <li>
                Quotation, booking, installation and
                payment information
              </li>
              <li>
                Technical information such as IP address,
                browser, device and website usage data
              </li>
            </ul>
          </section>

          <section>
            <h2>3. How we collect your information</h2>

            <p>We may collect information when you:</p>

            <ul>
              <li>Enter your postcode on the website</li>
              <li>Complete an installation enquiry</li>
              <li>Upload photographs or project files</li>
              <li>Request or accept a quotation</li>
              <li>Book an appointment or installation</li>
              <li>Contact us by telephone or email</li>
              <li>Use or browse our website</li>
            </ul>

            <p>
              We may also receive information from
              installers, contractors, designers, landlords,
              managing agents or other people involved in
              your project.
            </p>
          </section>

          <section>
            <h2>4. Why we use your information</h2>

            <p>We may use personal information to:</p>

            <ul>
              <li>Check whether we cover your location</li>
              <li>Review your installation requirements</li>
              <li>Prepare and send quotations</li>
              <li>
                Contact you for measurements, photographs
                or further project details
              </li>
              <li>
                Arrange surveys, appointments and
                installations
              </li>
              <li>
                Manage payments, invoices and accounting
              </li>
              <li>
                Respond to questions, complaints and
                service issues
              </li>
              <li>
                Maintain records relating to completed
                work
              </li>
              <li>
                Protect the security and integrity of our
                website
              </li>
              <li>
                Improve our website and customer journey
              </li>
              <li>
                Meet legal, regulatory and tax obligations
              </li>
            </ul>
          </section>

          <section>
            <h2>5. Our lawful bases</h2>

            <p>
              Depending on the situation, we may rely on:
            </p>

            <ul>
              <li>
                <strong>Contract:</strong> where processing
                is necessary to provide a quotation, arrange
                work or perform an agreement with you.
              </li>

              <li>
                <strong>Legitimate interests:</strong> where
                it is reasonably necessary to operate and
                improve our business, respond to enquiries,
                manage projects and prevent fraud or misuse.
              </li>

              <li>
                <strong>Legal obligation:</strong> where we
                must retain or use information to comply with
                tax, accounting, consumer or other legal
                requirements.
              </li>

              <li>
                <strong>Consent:</strong> where you have
                actively agreed to a specific use, such as
                certain marketing communications or
                non-essential cookies.
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Photographs and uploaded files</h2>

            <p>
              Photographs and project files may contain
              personal information or reveal details about
              your property.
            </p>

            <p>
              We use these materials to assess the proposed
              installation, identify fixing surfaces,
              understand access requirements and prepare a
              quotation or installation plan.
            </p>

            <p>
              We will not use identifiable customer
              photographs for public marketing without an
              appropriate lawful basis or permission.
            </p>
          </section>

          <section>
            <h2>7. Who we may share information with</h2>

            <p>
              We may share relevant information with:
            </p>

            <ul>
              <li>
                TrackFit employees, installers and
                authorised contractors
              </li>
              <li>
                Track suppliers and other parties involved
                in fulfilling your project
              </li>
              <li>
                Website hosting, email, cloud-storage and
                software providers
              </li>
              <li>
                Accountants, insurers and professional
                advisers
              </li>
              <li>
                Payment providers, where payments are taken
              </li>
              <li>
                Regulators, courts, law-enforcement bodies
                or public authorities where legally required
              </li>
            </ul>

            <p>
              We only share information where reasonably
              necessary and expect service providers to
              protect it appropriately.
            </p>
          </section>

          <section>
            <h2>8. International transfers</h2>

            <p>
              Some technology providers may process or
              store information outside the United Kingdom.
              Where this happens, we will use appropriate
              safeguards required by applicable data
              protection law.
            </p>
          </section>

          <section>
            <h2>9. How long we keep information</h2>

            <p>
              We retain information only for as long as
              reasonably necessary for the purposes for
              which it was collected, including customer
              service, contractual, insurance, legal, tax
              and accounting requirements.
            </p>

            <p>
              Retention periods may differ depending on
              whether an enquiry progresses to a quotation,
              booking or completed installation.
            </p>

            <p>
              Unsuccessful enquiry information and uploaded
              project photographs will be periodically
              reviewed and deleted or anonymised when no
              longer needed.
            </p>
          </section>

          <section>
            <h2>10. How we protect information</h2>

            <p>
              We use reasonable technical and
              organisational measures designed to protect
              personal information from unauthorised access,
              alteration, disclosure, loss or misuse.
            </p>

            <p>
              No internet or storage system is completely
              secure, but we regularly review how
              information is handled and who can access it.
            </p>
          </section>

          <section>
            <h2>11. Your data-protection rights</h2>

            <p>
              Depending on the circumstances, you may have
              the right to:
            </p>

            <ul>
              <li>Ask for access to your information</li>
              <li>Ask us to correct inaccurate information</li>
              <li>Ask us to delete certain information</li>
              <li>
                Ask us to restrict how certain information
                is used
              </li>
              <li>Object to certain processing</li>
              <li>
                Receive certain information in a portable
                format
              </li>
              <li>Withdraw consent where consent is used</li>
              <li>
                Complain about how your information is used
              </li>
            </ul>

            <p>
              To exercise a right, email{" "}
              <a href="mailto:enquiries@curtaintrackfitters.com">
                enquiries@curtaintrackfitters.com
              </a>
              .
            </p>

            <p>
              We may need to verify your identity before
              responding.
            </p>
          </section>

          <section>
            <h2>12. Cookies and website technologies</h2>

            <p>
              The website may use cookies and similar
              technologies for essential functionality,
              security, preferences and website analysis.
            </p>

            <p>
              Non-essential cookies should only be used
              after appropriate consent has been obtained.
              You can manage available choices through the
              website’s cookie controls.
            </p>
          </section>

          <section>
            <h2>13. Complaints</h2>

            <p>
              Please contact us first so that we have an
              opportunity to address your concern.
            </p>

            <p>
              You may also complain to the Information
              Commissioner’s Office, the UK supervisory
              authority for data protection.
            </p>
          </section>

          <section>
            <h2>14. Changes to this policy</h2>

            <p>
              We may update this policy when our services,
              systems or legal obligations change. The
              latest version will be published on this page
              with an updated date.
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