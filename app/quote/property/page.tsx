"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

import PropertyCard from "@/components/quote/PropertyCard";
import QuoteProgress from "@/components/quote/QuoteProgress";
import {
  ApartmentIcon,
  CommercialIcon,
  HotelIcon,
  HouseIcon,
} from "@/components/quote/PropertyIcons";

type PropertyType =
  | "house"
  | "apartment"
  | "commercial"
  | "hotel";

const propertyOptions = [
  {
    id: "house",
    title: "House",
    description:
      "Detached, semi-detached, terraced or bungalow.",
    icon: <HouseIcon />,
  },
  {
    id: "apartment",
    title: "Apartment",
    description:
      "Flat, apartment, penthouse or managed building.",
    icon: <ApartmentIcon />,
  },
  {
    id: "commercial",
    title: "Commercial",
    description:
      "Office, retail, healthcare or public premises.",
    icon: <CommercialIcon />,
  },
  {
    id: "hotel",
    title: "Hotel & Hospitality",
    description:
      "Hotels, restaurants, lounges or event spaces.",
    icon: <HotelIcon />,
  },
] satisfies Array<{
  id: PropertyType;
  title: string;
  description: string;
  icon: React.ReactNode;
}>;

export default function PropertyPage() {
  const router = useRouter();

  const [selectedProperty, setSelectedProperty] =
    useState<PropertyType | null>(null);

  function continueJourney() {
    if (!selectedProperty) {
      return;
    }

    window.sessionStorage.setItem(
      "trackfit-property-type",
      selectedProperty
    );

    router.push("/quote/track");
  }

  return (
    <main className="tf-quote-page">
      <div className="tf-quote-atmosphere" aria-hidden="true">
        <div className="tf-quote-light" />
        <div className="tf-quote-grain" />
      </div>

      <header className="tf-quote-header tf-container">
        <a href="/" aria-label="TrackFit home">
          <Image
            src="/logos/trackfit-logo.svg"
            alt="TrackFit"
            width={240}
            height={72}
            priority
            className="tf-quote-logo"
          />
        </a>

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
          currentStep={1}
          totalSteps={8}
          label="Property"
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
            Your installation
          </p>

          <h1>
            What type of property are we installing in?
          </h1>

          <p>
            This helps us understand access, scale and the
            likely installation requirements.
          </p>
        </motion.div>

        <motion.div
          className="tf-property-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {propertyOptions.map((option) => (
            <motion.div
              key={option.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 24,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <PropertyCard
                title={option.title}
                description={option.description}
                icon={option.icon}
                selected={
                  selectedProperty === option.id
                }
                onSelect={() =>
                  setSelectedProperty(option.id)
                }
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="tf-quote-actions">
          <div className="tf-quote-selection">
            {selectedProperty ? (
              <>
                <span className="tf-quote-selection-check">
                  ✓
                </span>

                <p>
                  {
                    propertyOptions.find(
                      (item) =>
                        item.id === selectedProperty
                    )?.title
                  }{" "}
                  selected
                </p>
              </>
            ) : (
              <p>Select one option to continue.</p>
            )}
          </div>

          <button
            type="button"
            className="tf-quote-continue"
            disabled={!selectedProperty}
            onClick={continueJourney}
          >
            Continue

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
          </button>
        </div>
      </section>
    </main>
  );
}