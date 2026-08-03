import type { Metadata } from "next";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import { createMetadata } from "@/lib/seo/metadata";

const pagePath = "/contact";

export const metadata: Metadata = createMetadata({
  title: "Contact TrackFit",
  description:
    "Contact TrackFit by phone or email for general enquiries, or start a curtain track installation quote online.",
  path: pagePath,
  keywords: [
    "contact TrackFit",
    "curtain track installation enquiries",
  ],
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: pagePath },
        ]}
      />

      <main className="tf-service-page">
        <SiteHeader />

        <section className="tf-about-hero tf-container">
          <div className="tf-about-hero-copy">
            <p className="tf-eyebrow">Contact TrackFit</p>

            <h1>Get in touch with our team.</h1>

            <p className="tf-about-introduction">
              For general enquiries, call or email us using the details below.
              If you are ready to request an installation quote, you can start
              with your postcode online.
            </p>

            <div className="tf-service-actions">
              <a
                href="tel:08007720367"
                className="tf-service-primary-button"
              >
                Call 0800 772 0367
              </a>

              <a
                href="mailto:enquiries@curtaintrackfitters.com"
                className="tf-service-secondary-button"
              >
                Email our team
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#111411] p-7 sm:p-10">
            <p className="tf-eyebrow">General enquiries</p>
            <h2 className="mt-4 text-2xl font-semibold text-[#F4F1E8] sm:text-3xl">
              Contact details
            </h2>

            <dl className="mt-8 space-y-7">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a
                    href="tel:08007720367"
                    className="text-xl font-semibold text-[#F4F1E8] transition hover:text-[#B8F23D]"
                  >
                    0800 772 0367
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                  Email
                </dt>
                <dd className="mt-2 break-words">
                  <a
                    href="mailto:enquiries@curtaintrackfitters.com"
                    className="text-lg font-semibold text-[#F4F1E8] transition hover:text-[#B8F23D] sm:text-xl"
                  >
                    enquiries@curtaintrackfitters.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="tf-service-answer">
          <div className="tf-container">
            <p className="tf-eyebrow">Installation quote</p>
            <h2>Ready to tell us about your project?</h2>
            <p>
              Start with your postcode and continue through the installation
              quote journey.
            </p>
            <div className="tf-service-actions">
              <Link
                href="/quote/postcode"
                className="tf-service-primary-button"
              >
                Start a quote
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
