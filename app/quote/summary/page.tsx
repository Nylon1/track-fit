"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

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

type SubmissionStatus =
  | "idle"
  | "validating"
  | "securing"
  | "sending"
  | "reference"
  | "success"
  | "error";

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

const cinematicEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.12,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.985,
    filter: "blur(10px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.72,
      ease: cinematicEase,
    },
  },
};

const rowContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.1,
    },
  },
};

const rowVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
    scale: 0.98,
    filter: "blur(7px)",
  },

  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.55,
      ease: cinematicEase,
    },
  },
};

const assuranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.45,
      ease: cinematicEase,
    },
  },
};

export default function SummaryPage() {
  const router = useRouter();

  const [summary, setSummary] =
    useState<QuoteSummary | null>(null);

  const [status, setStatus] =
    useState<SubmissionStatus>("idle");

  const [submitError, setSubmitError] =
    useState("");

  const [validationStep, setValidationStep] =
    useState(0);

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

  useEffect(() => {
    if (!summary) {
      return;
    }

    const timers = [0, 1, 2, 3, 4].map(
      (step) =>
        window.setTimeout(() => {
          setValidationStep(step + 1);
        }, 850 + step * 390)
    );

    return () => {
      timers.forEach((timer) =>
        window.clearTimeout(timer)
      );
    };
  }, [summary]);

  const validationItems = useMemo(
    () => [
      "Location confirmed",
      "Property details verified",
      "Track configuration prepared",
      summary?.photos.length
        ? "Project photos secured"
        : "Photo review marked optional",
      "Contact details complete",
    ],
    [summary]
  );

  async function submitRequest() {
    if (
      !summary ||
      !summary.contact ||
      status === "validating" ||
      status === "securing" ||
      status === "sending" ||
      status === "reference" ||
      status === "success"
    ) {
      return;
    }

    setSubmitError("");
    setStatus("validating");

    const reference = createReference();
    const submittedAt = new Date().toISOString();

    const enquiry = {
      ...summary,
      contact: summary.contact,
      reference,
      submittedAt,
    };

    try {
      await wait(500);
      setStatus("securing");

      await wait(550);
      setStatus("sending");

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

      setStatus("reference");

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

      await wait(650);

      setStatus("success");

      await wait(1050);

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

  function saveAndExit() {
    router.push("/services");
  }

  if (!summary) {
    return (
      <main className="tf-quote-page tf-summary-loading-page">
        <motion.div
          className="tf-summary-loading"
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            ease: cinematicEase,
          }}
        >
          <motion.span
            className="tf-summary-loading-ring"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          Preparing your request…
        </motion.div>
      </main>
    );
  }

  const isSubmitting = [
    "validating",
    "securing",
    "sending",
    "reference",
  ].includes(status);

  return (
    <main className="tf-quote-page tf-quote-page-cinematic tf-summary-page-cinematic">
      <div
        className="tf-quote-atmosphere"
        aria-hidden="true"
      >
        <motion.div
          className="tf-quote-light"
          animate={{
            x: [-48, 58, -48],
            y: [16, -30, 16],
            scale: [1, 1.16, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="tf-quote-light tf-quote-light-secondary"
          animate={{
            x: [40, -56, 40],
            y: [-20, 36, -20],
            scale: [1.08, 0.92, 1.08],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="tf-quote-impact-line"
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: [0, 1, 0.48],
            scaleX: 1,
          }}
          transition={{
            duration: 1.05,
            delay: 0.42,
            ease: cinematicEase,
          }}
        />

        <motion.div
          className="tf-summary-impact-ring"
          initial={{
            opacity: 0,
            scale: 0.4,
          }}
          animate={{
            opacity: [0, 0.65, 0],
            scale: [0.4, 1.15, 1.55],
          }}
          transition={{
            duration: 1.5,
            delay: 0.55,
            ease: cinematicEase,
          }}
        />

        <div className="tf-quote-particles">
          {Array.from({
            length: 16,
          }).map((_, index) => (
            <span
              key={index}
              style={
                {
                  "--quote-particle":
                    index,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="tf-quote-grain" />
      </div>

      <motion.header
        className="tf-quote-header tf-container"
        initial={{
          opacity: 0,
          y: -18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.65,
          ease: cinematicEase,
        }}
      >
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

        <motion.button
          type="button"
          className="tf-quote-exit"
          onClick={saveAndExit}
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          Save and exit
        </motion.button>
      </motion.header>

      <motion.section
        className="tf-quote-shell tf-container"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={revealVariants}>
          <QuoteProgress
            currentStep={6}
            totalSteps={7}
            label="Review"
          />
        </motion.div>

        <motion.div
          className="tf-quote-heading"
          variants={revealVariants}
        >
          <motion.p
            className="tf-eyebrow"
            initial={{
              opacity: 0,
              letterSpacing: "0.46em",
            }}
            animate={{
              opacity: 1,
              letterSpacing: "0.24em",
            }}
            transition={{
              duration: 0.8,
              delay: 0.18,
              ease: cinematicEase,
            }}
          >
            Final review
          </motion.p>

          <h1>
            Your installation request is{" "}
            <span className="tf-quote-heading-accent">
              ready.
            </span>
          </h1>

          <p>
            Review the project information below,
            then submit it securely to the TrackFit
            installation team.
          </p>

          <motion.div
            className="tf-quote-heading-track"
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              duration: 0.85,
              delay: 0.55,
              ease: cinematicEase,
            }}
            aria-hidden="true"
          >
            <span />
            <i />
            <i />
            <i />
            <i />
            <i />
          </motion.div>
        </motion.div>

        <motion.div
          className="tf-summary-layout"
          variants={revealVariants}
        >
          <motion.section
            className="tf-summary-card tf-glass tf-summary-card-cinematic"
            variants={rowContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="tf-summary-card-heading"
              variants={rowVariants}
            >
              <div>
                <p>Installation request</p>
                <h2>Project summary</h2>
              </div>

              <motion.span
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(184,242,61,0)",
                    "0 0 24px rgba(184,242,61,0.24)",
                    "0 0 0 rgba(184,242,61,0)",
                  ],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                }}
              >
                Ready
              </motion.span>
            </motion.div>

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

            <AnimatePresence>
              {summary.photos.length > 0 && (
                <motion.div
                  className="tf-summary-photo-files"
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <p>Uploaded files</p>

                  <motion.ul
                    variants={rowContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {summary.photos.map(
                      (photo, index) => (
                        <motion.li
                          key={photo.path}
                          variants={rowVariants}
                          whileHover={{
                            x: 4,
                          }}
                        >
                          <span>
                            {String(
                              index + 1
                            ).padStart(
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

                          <i>Secured</i>
                        </motion.li>
                      )
                    )}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="tf-summary-contact"
              variants={rowVariants}
            >
              <div className="tf-summary-contact-heading">
                <div>
                  <p>Contact details</p>

                  <h3>
                    {summary.contact?.fullName ||
                      "Not provided"}
                  </h3>
                </div>

                <motion.button
                  type="button"
                  onClick={() =>
                    router.push(
                      "/quote/contact"
                    )
                  }
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  Edit
                </motion.button>
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
            </motion.div>
          </motion.section>

          <motion.aside
            className="tf-summary-confirmation tf-summary-analysis-panel"
            variants={revealVariants}
          >
            <p className="tf-eyebrow">
              Project analysis
            </p>

            <h2>
              Everything is ready.
            </h2>

            <p>
              TrackFit has prepared your project
              information for specialist review.
            </p>

            <div className="tf-summary-validation">
              {validationItems.map(
                (item, index) => {
                  const isComplete =
                    validationStep >
                    index;

                  return (
                    <motion.div
                      key={item}
                      className={
                        isComplete
                          ? "is-complete"
                          : ""
                      }
                      initial={{
                        opacity: 0,
                        x: 18,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.45,
                        delay:
                          0.65 +
                          index * 0.12,
                        ease:
                          cinematicEase,
                      }}
                    >
                      <motion.span
                        animate={
                          isComplete
                            ? {
                                scale: [
                                  0.8,
                                  1.18,
                                  1,
                                ],
                                rotate: [
                                  -12,
                                  5,
                                  0,
                                ],
                              }
                            : {
                                scale: 1,
                                rotate: 0,
                              }
                        }
                        transition={{
                          duration: 0.4,
                          ease:
                            cinematicEase,
                        }}
                      >
                        {isComplete
                          ? "✓"
                          : "·"}
                      </motion.span>

                      <p>{item}</p>
                    </motion.div>
                  );
                }
              )}
            </div>

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

            <motion.button
              type="button"
              className={[
                "tf-summary-submit",
                status === "success"
                  ? "is-success"
                  : "",
                status === "error"
                  ? "has-error"
                  : "",
                isSubmitting
                  ? "is-submitting"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={
                !summary.contact ||
                isSubmitting ||
                status === "success"
              }
              onClick={submitRequest}
              whileHover={
                status === "idle" ||
                status === "error"
                  ? {
                      y: -4,
                      scale: 1.012,
                    }
                  : undefined
              }
              whileTap={
                status === "idle" ||
                status === "error"
                  ? {
                      scale: 0.98,
                    }
                  : undefined
              }
              animate={
                status === "idle" ||
                status === "error"
                  ? {
                      boxShadow: [
                        "0 0 0 rgba(184,242,61,0)",
                        "0 0 48px rgba(184,242,61,0.3)",
                        "0 0 24px rgba(184,242,61,0.14)",
                      ],
                    }
                  : undefined
              }
              transition={{
                boxShadow: {
                  duration: 1.4,
                  delay: 1.2,
                },
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={status}
                  className="tf-summary-submit-content"
                  initial={{
                    opacity: 0,
                    y: 8,
                    filter: "blur(5px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    filter: "blur(5px)",
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  {getSubmissionContent(status)}
                </motion.span>
              </AnimatePresence>

              <span
                className="tf-summary-submit-shine"
                aria-hidden="true"
              />
            </motion.button>

            <AnimatePresence>
              {submitError && (
                <motion.p
                  className="tf-summary-submit-error"
                  role="alert"
                  initial={{
                    opacity: 0,
                    y: -8,
                    filter: "blur(5px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -6,
                  }}
                >
                  {submitError}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              className="tf-summary-assurances"
              variants={rowContainerVariants}
              initial="hidden"
              animate="visible"
            >
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
            </motion.div>
          </motion.aside>
        </motion.div>

        <motion.div
          className="tf-summary-back"
          variants={revealVariants}
        >
          <motion.button
            type="button"
            className="tf-quote-back"
            onClick={() =>
              router.push("/quote/contact")
            }
            whileHover={{
              x: -3,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            ← Back to contact details
          </motion.button>
        </motion.div>
      </motion.section>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            className="tf-summary-success-transition"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              className="tf-summary-success-line"
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.7,
                ease: cinematicEase,
              }}
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.55,
                delay: 0.2,
                ease: cinematicEase,
              }}
            >
              <span>✓</span>
              <strong>
                Installation request secured
              </strong>
              <p>
                Preparing your project reference…
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <motion.div
      className="tf-summary-row"
      variants={rowVariants}
      whileHover={{
        x: 4,
      }}
    >
      <motion.span
        className="tf-summary-row-check"
        initial={{
          scale: 0,
          rotate: -18,
        }}
        animate={{
          scale: 1,
          rotate: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 360,
          damping: 20,
        }}
      >
        ✓
      </motion.span>

      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>

      <motion.button
        type="button"
        onClick={onEdit}
        whileHover={{
          y: -2,
        }}
        whileTap={{
          scale: 0.96,
        }}
      >
        Edit
      </motion.button>
    </motion.div>
  );
}

function AssuranceItem({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.div
      className="tf-assurance-item"
      variants={assuranceVariants}
    >
      <motion.span
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 19,
        }}
      >
        ✓
      </motion.span>

      <p>{children}</p>
    </motion.div>
  );
}

function getSubmissionContent(
  status: SubmissionStatus
) {
  if (status === "validating") {
    return (
      <>
        <SubmitSpinner />
        Validating project…
      </>
    );
  }

  if (status === "securing") {
    return (
      <>
        <SubmitSpinner />
        Securing project photos…
      </>
    );
  }

  if (status === "sending") {
    return (
      <>
        <SubmitSpinner />
        Sending to TrackFit…
      </>
    );
  }

  if (status === "reference") {
    return (
      <>
        <SubmitSpinner />
        Creating project reference…
      </>
    );
  }

  if (status === "success") {
    return (
      <>
        <CheckIcon />
        Request received
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        Try sending again
        <ArrowIcon />
      </>
    );
  }

  return (
    <>
      Submit installation request
      <ArrowIcon />
    </>
  );
}

function SubmitSpinner() {
  return (
    <motion.span
      className="tf-submit-loader"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "linear",
      }}
      aria-hidden="true"
    />
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