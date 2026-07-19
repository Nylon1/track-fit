"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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

const initialForm: ContactForm = {
  fullName: "",
  email: "",
  phone: "",
  preferredContact: "either",
  notes: "",
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
          currentStep={5}
          totalSteps={7}
          label="Contact details"
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
            Your details
          </p>

          <h1>
            How should our installation team contact
            you?
          </h1>

          <p>
            We will use these details to discuss your
            requirements and prepare your quotation.
          </p>
        </motion.div>

        <motion.form
          className="tf-contact-form"
          onSubmit={handleSubmit}
          noValidate
          initial={{
            opacity: 0,
            y: 28,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="tf-contact-grid">
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
          </div>

          <fieldset className="tf-contact-preference">
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
          </fieldset>

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

          <div className="tf-contact-privacy">
            <ShieldIcon />

            <p>
              Your details are used only to assess and
              respond to this TrackFit installation
              request.
            </p>
          </div>

          <div className="tf-quote-actions">
            <button
              type="button"
              className="tf-quote-back"
              onClick={() =>
                router.push("/quote/photos")
              }
            >
              ← Back
            </button>

            <button
              type="submit"
              className="tf-quote-continue"
            >
              Review request

              <ArrowIcon />
            </button>
          </div>
        </motion.form>
      </section>
    </main>
  );
}

type FormFieldProps = {
  label: string;
  error?: string;
  optional?: boolean;
  wide?: boolean;
  children: React.ReactNode;
};

function FormField({
  label,
  error,
  optional = false,
  wide = false,
  children,
}: FormFieldProps) {
  return (
    <label
      className={[
        "tf-contact-field",
        wide ? "is-wide" : "",
        error ? "has-error" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="tf-contact-label">
        {label}

        {optional && <small>Optional</small>}
      </span>

      <span className="tf-contact-control">
        {children}
      </span>

      {error && (
        <span
          className="tf-contact-error"
          role="alert"
        >
          {error}
        </span>
      )}
    </label>
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
    <button
      type="button"
      className={[
        "tf-contact-option",
        selected ? "is-selected" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="tf-contact-option-indicator">
        {selected && "✓"}
      </span>

      {label}
    </button>
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