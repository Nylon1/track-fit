"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";

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

type PropertyOption = {
  id: PropertyType;
  title: string;
  description: string;
  icon: ReactNode;
};

const cinematicEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

const propertyOptions: PropertyOption[] = [
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
];

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
    y: 28,
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

const gridVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 42,
    scale: 0.94,
    rotateX: 8,
    filter: "blur(10px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.72,
      ease: cinematicEase,
    },
  },
};

export default function PropertyPage() {
  const router = useRouter();

  const [selectedProperty, setSelectedProperty] =
    useState<PropertyType | null>(null);

  const selectedOption = propertyOptions.find(
    (option) => option.id === selectedProperty
  );

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

  function saveAndExit() {
    router.push("/services");
  }

  return (
    <main className="tf-quote-page tf-quote-page-cinematic">
      <div
        className="tf-quote-atmosphere"
        aria-hidden="true"
      >
        <motion.div
          className="tf-quote-light"
          animate={{
            x: [-45, 55, -45],
            y: [10, -28, 10],
            scale: [1, 1.14, 1],
            opacity: [0.55, 0.9, 0.55],
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
            x: [30, -55, 30],
            y: [-18, 32, -18],
            scale: [1.1, 0.9, 1.1],
            opacity: [0.25, 0.52, 0.25],
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
            opacity: [0, 1, 0.55],
            scaleX: 1,
          }}
          transition={{
            duration: 1.05,
            delay: 0.48,
            ease: cinematicEase,
          }}
        />

        <div className="tf-quote-grain" />

        <div className="tf-quote-particles">
          {Array.from({
            length: 14,
          }).map((_, index) => (
            <span
              key={index}
              style={
                {
                  "--quote-particle":
                    index,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
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
            currentStep={1}
            totalSteps={8}
            label="Property"
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
            Your installation
          </motion.p>

          <h1>
            What type of property are we{" "}
            <span className="tf-quote-heading-accent">
              installing in?
            </span>
          </h1>

          <p>
            This helps us understand access, scale and the
            likely installation requirements.
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
          className="tf-property-grid"
          variants={gridVariants}
        >
          {propertyOptions.map(
            (option, index) => {
              const isSelected =
                selectedProperty === option.id;

              return (
                <motion.div
                  key={option.id}
                  variants={cardVariants}
                  whileHover={{
                    y: -7,
                    scale: 1.012,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  animate={
                    isSelected
                      ? {
                          y: -4,
                          scale: 1.012,
                        }
                      : {
                          y: 0,
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: 0.3,
                    ease: cinematicEase,
                  }}
                  className={
                    isSelected
                      ? "tf-property-card-motion is-selected"
                      : "tf-property-card-motion"
                  }
                >
                  <motion.div
                    className="tf-property-card-number"
                    initial={{
                      opacity: 0,
                      scale: 0.6,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.4,
                      delay:
                        0.55 +
                        index * 0.08,
                      ease:
                        cinematicEase,
                    }}
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </motion.div>

                  <PropertyCard
                    title={option.title}
                    description={
                      option.description
                    }
                    icon={option.icon}
                    selected={isSelected}
                    onSelect={() =>
                      setSelectedProperty(
                        option.id
                      )
                    }
                  />

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="tf-property-selected-glow"
                        initial={{
                          opacity: 0,
                          scale: 0.75,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.85,
                        }}
                        transition={{
                          duration: 0.35,
                          ease:
                            cinematicEase,
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            }
          )}
        </motion.div>

        <motion.div
          className="tf-quote-actions"
          variants={revealVariants}
        >
          <div className="tf-quote-selection">
            <AnimatePresence mode="wait">
              {selectedOption ? (
                <motion.div
                  key={selectedOption.id}
                  className="tf-quote-selection-confirmed"
                  initial={{
                    opacity: 0,
                    x: -14,
                    filter: "blur(6px)",
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    x: 12,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: cinematicEase,
                  }}
                >
                  <motion.span
                    className="tf-quote-selection-check"
                    initial={{
                      scale: 0,
                      rotate: -20,
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 20,
                    }}
                  >
                    ✓
                  </motion.span>

                  <p>
                    {selectedOption.title} selected
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="empty-selection"
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
                  Select one option to continue.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            className="tf-quote-continue"
            disabled={!selectedProperty}
            onClick={continueJourney}
            whileHover={
              selectedProperty
                ? {
                    y: -3,
                    scale: 1.012,
                  }
                : undefined
            }
            whileTap={
              selectedProperty
                ? {
                    scale: 0.98,
                  }
                : undefined
            }
            animate={
              selectedProperty
                ? {
                    boxShadow: [
                      "0 0 0 rgba(184,242,61,0)",
                      "0 0 42px rgba(184,242,61,0.3)",
                      "0 0 22px rgba(184,242,61,0.16)",
                    ],
                  }
                : {
                    boxShadow:
                      "0 0 0 rgba(184,242,61,0)",
                  }
            }
            transition={{
              boxShadow: {
                duration: 1,
              },
            }}
          >
            Continue

            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              animate={
                selectedProperty
                  ? {
                      x: [0, 4, 0],
                    }
                  : {
                      x: 0,
                    }
              }
              transition={{
                duration: 1.2,
                repeat: selectedProperty
                  ? Infinity
                  : 0,
                repeatDelay: 1.2,
              }}
            >
              <path
                d="M4 10H16M11 5L16 10L11 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
      </motion.section>
    </main>
  );
}