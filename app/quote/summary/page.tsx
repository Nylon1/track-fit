"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import QuoteProgress from "@/components/quote/QuoteProgress";

type ContactDetails = {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: "phone" | "email" | "either";
  notes: string;
};

type StoredPhoto = {
  path: string;
  fileName: string;
  contentType: string;
  size: number;
};

type QuoteSummary = {
  postcode: string;
  property: string;
  trackType: string;
  quantity: string;
  photoCount: string;
  photos: StoredPhoto[];
  contact: ContactDetails | null;
};

type SubmissionResult = {
  success?: boolean;
  error?: string;
  emailId?: string;
  photoLinksCreated?: number;
};

const propertyLabels: Record<string, string> = {
  house: "House",
  apartment: "Apartment",
  commercial: "Commercial",
  hotel: "Hotel & Hospitality",
};

const trackLabels: Record<string, string> = {
  ceiling: "Ceiling mounted",
  wall: "Wall mounted",
  wave: "Wave track",
  bay: "Bay window track",
  curved: "Curved track",
  commercial: "Commercial system",
  unsure: "Advice required",
};

export default function SummaryPage() {
  const router = useRouter();

  const [summary, setSummary] =
    useState<QuoteSummary | null>(null);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [submitError, setSubmitError] =
    useState("");

  useEffect(() => {
    const savedContact =
      window.sessionStorage.getItem(
        "trackfit-contact"
      );

    let contact: ContactDetails | null = null;

    if (savedContact) {
      try {
        const parsedContact: unknown =
          JSON.parse(savedContact);

        if (
          parsedContact &&
          typeof parsedContact === "object"
        ) {
          contact =
            parsedContact as ContactDetails;
        }
      } catch {
        contact = null;
      }
    }

    const savedPhotos =
      window.sessionStorage.getItem(
        "trackfit-photo-paths"
      );

    let photos: StoredPhoto[] = [];

    if (savedPhotos) {
      try {
        const parsedPhotos: unknown =
          JSON.parse(savedPhotos);

        if (Array.isArray(parsedPhotos)) {
          photos = parsedPhotos.filter(
            isStoredPhoto
          );
        }
      } catch {
        photos = [];
      }
    }

    setSummary({
      postcode:
        window.sessionStorage.getItem(
          "trackfit-postcode"
        ) || "Not provided",

      property:
        window.sessionStorage.getItem(
          "trackfit-property-type"
        ) || "Not provided",

      trackType:
        window.sessionStorage.getItem(
          "trackfit-track-type"
        ) || "Not provided",

      quantity:
        window.sessionStorage.getItem(
          "trackfit-track-count"
        ) || "Not provided",

      photoCount: String(photos.length),

      photos,

      contact,
    });
  }, []);

  async function submitRequest() {
    if (
      !summary ||
      !summary.contact ||
      status === "submitting" ||
      status === "success"
    ) {
      return;
    }

    setStatus("submitting");
    setSubmitError("");

    const reference = createReference();
    const submittedAt = new Date().toISOString();

    const enquiry = {
      ...summary,
      contact: summary.contact,
      reference,
      submittedAt,
    };

    try {
      const response = await fetch(
        "/api/quote-enquiry",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(enquiry),
        }
      );

      let result: SubmissionResult = {};

      try {
        result =
          (await response.json()) as SubmissionResult;
      } catch {
        result = {
          success: false,
          error:
            "The server returned an invalid response.",
        };
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "The request could not be sent."
        );
      }

      window.sessionStorage.setItem(
        "trackfit-reference",
        reference
      );

      window.sessionStorage.setItem(
        "trackfit-submitted-quote",
        JSON.stringify({
          ...enquiry,
          emailId: result.emailId,
          photoLinksCreated:
            result.photoLinksCreated ?? 0,
        })
      );

      setStatus("success");

      await wait(850);

      router.push("/quote/complete");
    } catch (error) {
      console.error(
        "TrackFit submission error:",
        error
      );

      setSubmitError(
        error instanceof Error
          ? error.message
          : "The request could not be sent. Please try again."
      );

      setStatus("error");
    }
  }

  if (!summary) {
    return (
      <main className="tf-quote-page">
        <div className="tf-summary-loading">
          Preparing your request…
        </div>
      </main>
    );
  }

  return (
    <main className="tf-quote-page">
      <div
        className="tf-quote-atmosphere"
        aria-hidden="true"
      >
        <div className="tf-quote-light" />
        <div className="tf-quote-grain" />
      </div>

      <header className="tf-quote-header tf-container">
        <button
          type="button"
          className="tf-quote-logo-button"
          onClick={() => router.push("/")}
          aria-label="TrackFit home"
        >
          <Image
            src="/logos/trackfit-logo.svg"
            alt="TrackFit"
            width={240}
            height={72}
            priority
            className="tf-quote-logo"
          />
        </button>

        <button
          type="button"
          className="tf-quote-exit"
          onClick={() => router.push("/")}
        >
          Save and exit
        </button>
      </header>

      <section className="tf-quote-shell tf-container">
        <QuoteProgress
          currentStep={6}
          totalSteps={7}
          label="Review"
        />

        <motion.div
          className="tf-quote-heading"
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="tf-eyebrow">
            Final review
          </p>

          <h1>
            Review your installation request.
          </h1>

          <p>
            Check the details below before sending
            your request to the TrackFit team.
          </p>
        </motion.div>

        <div className="tf-summary-layout">
          <motion.section
            className="tf-summary-card tf-glass"
            initial={{
              opacity: 0,
              x: -24,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="tf-summary-card-heading">
              <div>
                <p>Installation request</p>
                <h2>Project summary</h2>
              </div>

              <span>Ready</span>
            </div>

            <SummaryRow
              label="Postcode"
              value={summary.postcode}
              onEdit={() => router.push("/")}
            />

            <SummaryRow
              label="Property"
              value={
                propertyLabels[summary.property] ||
                summary.property
              }
              onEdit={() =>
                router.push("/quote/property")
              }
            />

            <SummaryRow
              label="Track type"
              value={
                trackLabels[summary.trackType] ||
                summary.trackType
              }
              onEdit={() =>
                router.push("/quote/track")
              }
            />

            <SummaryRow
              label="Quantity"
              value={formatQuantity(
                summary.quantity
              )}
              onEdit={() =>
                router.push("/quote/quantity")
              }
            />

            <SummaryRow
              label="Project photos"
              value={formatPhotoCount(
                summary.photos.length
              )}
              onEdit={() =>
                router.push("/quote/photos")
              }
            />

            {summary.photos.length > 0 && (
              <div className="tf-summary-photo-files">
                <p>Uploaded files</p>

                <ul>
                  {summary.photos.map(
                    (photo, index) => (
                      <li key={photo.path}>
                        <span>
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <div>
                          <strong>
                            {photo.fileName}
                          </strong>

                          <small>
                            {formatFileSize(
                              photo.size
                            )}
                          </small>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            <div className="tf-summary-contact">
              <div className="tf-summary-contact-heading">
                <div>
                  <p>Contact details</p>

                  <h3>
                    {summary.contact?.fullName ||
                      "Not provided"}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    router.push("/quote/contact")
                  }
                >
                  Edit
                </button>
              </div>

              <dl>
                <div>
                  <dt>Email</dt>

                  <dd>
                    {summary.contact?.email ||
                      "Not provided"}
                  </dd>
                </div>

                <div>
                  <dt>Telephone</dt>

                  <dd>
                    {summary.contact?.phone ||
                      "Not provided"}
                  </dd>
                </div>

                <div>
                  <dt>Preferred contact</dt>

                  <dd>
                    {formatPreferredContact(
                      summary.contact
                        ?.preferredContact
                    )}
                  </dd>
                </div>
              </dl>

              {summary.contact?.notes && (
                <div className="tf-summary-notes">
                  <p>Additional information</p>

                  <span>
                    {summary.contact.notes}
                  </span>
                </div>
              )}
            </div>
          </motion.section>

          <motion.aside
            className="tf-summary-confirmation"
            initial={{
              opacity: 0,
              x: 24,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="tf-eyebrow">
              Your request is ready
            </p>

            <h2>Everything looks good.</h2>

            <p>
              Our installation specialists will
              review your project and contact you to
              discuss the next steps.
            </p>

            {!summary.contact && (
              <p
                className="tf-summary-submit-error"
                role="alert"
              >
                Contact details are missing. Go back
                and complete the contact form before
                submitting.
              </p>
            )}

            <button
              type="button"
              className={[
                "tf-summary-submit",
                status === "success"
                  ? "is-success"
                  : "",
                status === "error"
                  ? "has-error"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={
                !summary.contact ||
                status === "submitting" ||
                status === "success"
              }
              onClick={submitRequest}
            >
              {status === "idle" && (
                <>
                  Submit installation request
                  <ArrowIcon />
                </>
              )}

              {status === "submitting" && (
                <>
                  <span className="tf-submit-loader" />
                  Sending securely
                </>
              )}

              {status === "success" && (
                <>
                  <CheckIcon />
                  Request received
                </>
              )}

              {status === "error" && (
                <>
                  Try sending again
                  <ArrowIcon />
                </>
              )}
            </button>

            {submitError && (
              <p
                className="tf-summary-submit-error"
                role="alert"
              >
                {submitError}
              </p>
            )}

            <div className="tf-summary-assurances">
              <AssuranceItem>
                No payment required
              </AssuranceItem>

              <AssuranceItem>
                Free project review
              </AssuranceItem>

              <AssuranceItem>
                UK installation specialists
              </AssuranceItem>

              <AssuranceItem>
                Private photo links
              </AssuranceItem>
            </div>
          </motion.aside>
        </div>

        <div className="tf-summary-back">
          <button
            type="button"
            className="tf-quote-back"
            onClick={() =>
              router.push("/quote/contact")
            }
          >
            ← Back to contact details
          </button>
        </div>
      </section>
    </main>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  onEdit: () => void;
};

function SummaryRow({
  label,
  value,
  onEdit,
}: SummaryRowProps) {
  return (
    <div className="tf-summary-row">
      <span className="tf-summary-row-check">
        ✓
      </span>

      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>

      <button
        type="button"
        onClick={onEdit}
      >
        Edit
      </button>
    </div>
  );
}

function AssuranceItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tf-assurance-item">
      <span>✓</span>
      <p>{children}</p>
    </div>
  );
}

function isStoredPhoto(
  value: unknown
): value is StoredPhoto {
  if (!value || typeof value !== "object") {
    return false;
  }

  const photo =
    value as Partial<StoredPhoto>;

  return (
    typeof photo.path === "string" &&
    photo.path.length > 0 &&
    typeof photo.fileName === "string" &&
    photo.fileName.length > 0 &&
    typeof photo.contentType === "string" &&
    typeof photo.size === "number" &&
    Number.isFinite(photo.size) &&
    photo.size >= 0
  );
}

function formatPreferredContact(
  value?: ContactDetails["preferredContact"]
) {
  if (value === "phone") {
    return "Telephone";
  }

  if (value === "email") {
    return "Email";
  }

  return "Telephone or email";
}

function formatQuantity(value: string) {
  if (value === "5+") {
    return "5 or more tracks";
  }

  if (value === "1") {
    return "1 track";
  }

  if (
    value === "Not provided" ||
    value.trim() === ""
  ) {
    return "Not provided";
  }

  return `${value} tracks`;
}

function formatPhotoCount(count: number) {
  if (count === 0) {
    return "No photos uploaded";
  }

  if (count === 1) {
    return "1 photo uploaded";
  }

  return `${count} photos uploaded`;
}

function formatFileSize(size: number) {
  if (!Number.isFinite(size) || size <= 0) {
    return "File size unavailable";
  }

  if (size < 1024) {
    return `${size} bytes`;
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(
    size /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

function createReference() {
  const year = new Date().getFullYear();

  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `TF-${year}-${random}`;
}

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(
      resolve,
      milliseconds
    );
  });
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10H16M11 5L16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 10.6L8.3 14.2L16.3 6.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}