"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  useState,
  type ReactNode,
} from "react";

import QuoteProgress from "@/components/quote/QuoteProgress";

type ContactForm = {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: "phone" | "email" | "either";
  notes: string;
};

type ContactErrors = Partial<
  Record<keyof ContactForm, string>
>;

type ContactPreference =
  ContactForm["preferredContact"];

const initialForm: ContactForm = {
  fullName: "",
  email: "",
  phone: "",
  preferredContact: "either",
  notes: "",
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

const formVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.09,
    },
  },
};

const fieldVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration: 0.58,
      ease: cinematicEase,
    },
  },
};

export default function ContactPage() {
  const router = useRouter();

  const [form, setForm] =
    useState<ContactForm>(initialForm);

  const [errors, setErrors] =
    useState<ContactErrors>({});

  function updateField<K extends keyof ContactForm>(
    field: K,
    value: ContactForm[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  }

  function validateForm() {
    const nextErrors: ContactErrors = {};

    if (form.fullName.trim().length < 2) {
      nextErrors.fullName =
        "Enter your full name.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      )
    ) {
      nextErrors.email =
        "Enter a valid email address.";
    }

    const telephone = form.phone.replace(
      /[\s()+-]/g,
      ""
    );

    if (!/^\d{10,15}$/.test(telephone)) {
      nextErrors.phone =
        "Enter a valid telephone number.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    window.sessionStorage.setItem(
      "trackfit-contact",
      JSON.stringify({
        ...form,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        notes: form.notes.trim(),
      })
    );

    router.push("/quote/summary");
  }

  function saveAndExit() {
    router.push("/services");
  }

  return (
    <main className="tf-quote-page tf-quote-page-cinematic tf-contact-page-cinematic">
      <div
        className="tf-quote-atmosphere"
        aria-hidden="true"
      >
        <motion.div
          className="tf-quote-light"
          animate={{
            x: [-46, 56, -46],
            y: [16, -30, 16],
            scale: [1, 1.16, 1],
            opacity: [0.5, 0.88, 0.5],
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
            x: [38, -56, 38],
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

        <div className="tf-quote-particles">
          {Array.from({
            length: 14,
          }).map((_, index) => (
            <span
              key={index}
              style={
                {
                  "--quote-particle": index,
                } as React.CSSProperties
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
            currentStep={5}
            totalSteps={7}
            label="Contact details"
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
              letterSpacing: "0.45em",
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
            Your details
          </motion.p>

          <h1>
            How should our installation team{" "}
            <span className="tf-quote-heading-accent">
              contact you?
            </span>
          </h1>

          <p>
            We will use these details to discuss your
            requirements and prepare your quotation.
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

        <motion.form
          className="tf-contact-form tf-contact-form-cinematic"
          onSubmit={handleSubmit}
          noValidate
          variants={formVariants}
        >
          <motion.div
            className="tf-contact-grid"
            variants={formVariants}
          >
            <FormField
              label="Full name"
              error={errors.fullName}
            >
              <input
                type="text"
                value={form.fullName}
                placeholder="Your full name"
                autoComplete="name"
                onChange={(event) =>
                  updateField(
                    "fullName",
                    event.target.value
                  )
                }
                aria-invalid={Boolean(
                  errors.fullName
                )}
              />
            </FormField>

            <FormField
              label="Telephone"
              error={errors.phone}
            >
              <input
                type="tel"
                value={form.phone}
                placeholder="07..."
                autoComplete="tel"
                inputMode="tel"
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value
                  )
                }
                aria-invalid={Boolean(errors.phone)}
              />
            </FormField>

            <FormField
              label="Email address"
              error={errors.email}
              wide
            >
              <input
                type="email"
                value={form.email}
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value
                  )
                }
                aria-invalid={Boolean(errors.email)}
              />
            </FormField>
          </motion.div>

          <motion.fieldset
            className="tf-contact-preference"
            variants={fieldVariants}
          >
            <legend>
              How would you prefer us to contact you?
            </legend>

            <div className="tf-contact-options">
              <ContactOption
                label="Telephone"
                selected={
                  form.preferredContact === "phone"
                }
                onSelect={() =>
                  updateField(
                    "preferredContact",
                    "phone"
                  )
                }
              />

              <ContactOption
                label="Email"
                selected={
                  form.preferredContact === "email"
                }
                onSelect={() =>
                  updateField(
                    "preferredContact",
                    "email"
                  )
                }
              />

              <ContactOption
                label="Either is fine"
                selected={
                  form.preferredContact === "either"
                }
                onSelect={() =>
                  updateField(
                    "preferredContact",
                    "either"
                  )
                }
              />
            </div>
          </motion.fieldset>

          <FormField
            label="Anything else we should know?"
            optional
            wide
          >
            <textarea
              value={form.notes}
              placeholder="Access restrictions, preferred dates, track requirements or anything else that may help us."
              rows={5}
              onChange={(event) =>
                updateField(
                  "notes",
                  event.target.value
                )
              }
            />
          </FormField>

          <motion.div
            className="tf-contact-privacy"
            variants={fieldVariants}
            whileHover={{
              y: -2,
            }}
          >
            <motion.div
              className="tf-contact-shield-wrap"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(184,242,61,0)",
                  "0 0 22px rgba(184,242,61,0.22)",
                  "0 0 0 rgba(184,242,61,0)",
                ],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <ShieldIcon />
            </motion.div>

            <p>
              Your details are used only to assess and
              respond to this TrackFit installation
              request.
            </p>
          </motion.div>

          <motion.div
            className="tf-quote-actions"
            variants={fieldVariants}
          >
            <motion.button
              type="button"
              className="tf-quote-back"
              onClick={() =>
                router.push("/quote/photos")
              }
              whileHover={{
                x: -3,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              ← Back
            </motion.button>

            <motion.button
              type="submit"
              className="tf-quote-continue"
              whileHover={{
                y: -3,
                scale: 1.012,
              }}
              whileTap={{
                scale: 0.98,
              }}
              animate={{
                boxShadow: [
                  "0 0 0 rgba(184,242,61,0)",
                  "0 0 42px rgba(184,242,61,0.25)",
                  "0 0 20px rgba(184,242,61,0.12)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 1.3,
                  delay: 1.25,
                },
              }}
            >
              Review request

              <motion.span
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                }}
              >
                <ArrowIcon />
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.section>
    </main>
  );
}

type FormFieldProps = {
  label: string;
  error?: string;
  optional?: boolean;
  wide?: boolean;
  children: ReactNode;
};

function FormField({
  label,
  error,
  optional = false,
  wide = false,
  children,
}: FormFieldProps) {
  return (
    <motion.label
  className={[
    "tf-contact-field",
    wide ? "is-wide" : "",
    error ? "has-error" : "",
  ]
    .filter(Boolean)
    .join(" ")}
  variants={fieldVariants}
>
      <span className="tf-contact-label">
        {label}

        {optional && <small>Optional</small>}
      </span>

      <span className="tf-contact-control">
        {children}
      </span>

      <AnimatePresence mode="wait">
        {error && (
          <motion.span
            key={error}
            className="tf-contact-error"
            role="alert"
            initial={{
              opacity: 0,
              y: -6,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -4,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.label>
  );
}

type ContactOptionProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};

function ContactOption({
  label,
  selected,
  onSelect,
}: ContactOptionProps) {
  return (
    <motion.button
      type="button"
      className={[
        "tf-contact-option",
        selected ? "is-selected" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onSelect}
      aria-pressed={selected}
      whileHover={{
        y: -4,
        scale: 1.012,
      }}
      whileTap={{
        scale: 0.97,
      }}
      animate={
        selected
          ? {
              y: -2,
              boxShadow:
                "0 0 30px rgba(184,242,61,0.18)",
            }
          : {
              y: 0,
              boxShadow:
                "0 0 0 rgba(184,242,61,0)",
            }
      }
      transition={{
        duration: 0.3,
        ease: cinematicEase,
      }}
    >
      <motion.span
        className="tf-contact-option-indicator"
        animate={
          selected
            ? {
                scale: [0.85, 1.18, 1],
                rotate: [-12, 4, 0],
              }
            : {
                scale: 1,
                rotate: 0,
              }
        }
        transition={{
          duration: 0.4,
          ease: cinematicEase,
        }}
      >
        {selected && "✓"}
      </motion.span>

      {label}

      <AnimatePresence>
        {selected && (
          <motion.span
            className="tf-contact-option-glow"
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            transition={{
              duration: 0.35,
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11 2.75L18 5.5V10.2C18 14.7 15.4 18.1 11 19.5C6.6 18.1 4 14.7 4 10.2V5.5L11 2.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M7.8 10.9L10 13.1L14.5 8.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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