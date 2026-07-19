"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import { useRouter } from "next/navigation";
import {
  useState,
  type CSSProperties,
} from "react";

import PhotoUploader, {
  type UploadedPhoto,
} from "@/components/quote/PhotoUploader";
import QuoteProgress from "@/components/quote/QuoteProgress";
import {
  getSupabaseBrowserClient,
} from "@/lib/supabase/client";

type StoredPhoto = {
  path: string;
  fileName: string;
  contentType: string;
  size: number;
};

type SignedUploadResponse = {
  success?: boolean;
  path?: string;
  token?: string;
  error?: string;
};

const bucketName = "trackfit-enquiry-photos";
const maximumFileSize = 6 * 1024 * 1024;

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

export default function PhotosPage() {
  const router = useRouter();

  const [photos, setPhotos] = useState<
    UploadedPhoto[]
  >([]);

  const [isUploading, setIsUploading] =
    useState(false);

  const [uploadError, setUploadError] =
    useState("");

  function handlePhotosChange(
    nextPhotos: UploadedPhoto[]
  ) {
    setPhotos(nextPhotos);

    if (uploadError) {
      setUploadError("");
    }
  }

  async function continueJourney() {
    if (isUploading) {
      return;
    }

    setUploadError("");

    if (!photos.length) {
      window.sessionStorage.setItem(
        "trackfit-photo-count",
        "0"
      );

      window.sessionStorage.removeItem(
        "trackfit-photo-paths"
      );

      router.push("/quote/contact");
      return;
    }

    const oversizedPhoto = photos.find(
      (photo) =>
        photo.file.size > maximumFileSize
    );

    if (oversizedPhoto) {
      setUploadError(
        `${oversizedPhoto.file.name} is larger than 6MB. Please choose a smaller image.`
      );

      return;
    }

    setIsUploading(true);

    try {
      const storedPhotos: StoredPhoto[] = [];
      const supabase =
        getSupabaseBrowserClient();

      for (const photo of photos) {
        const prepareResponse = await fetch(
          "/api/quote-photo-upload",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              fileName: photo.file.name,
              contentType: photo.file.type,
            }),
          }
        );

        const prepareResult =
          (await prepareResponse.json()) as SignedUploadResponse;

        if (
          !prepareResponse.ok ||
          !prepareResult.success ||
          !prepareResult.path ||
          !prepareResult.token
        ) {
          throw new Error(
            prepareResult.error ||
              `Unable to prepare ${photo.file.name} for upload.`
          );
        }

        const { error } =
          await supabase.storage
            .from(bucketName)
            .uploadToSignedUrl(
              prepareResult.path,
              prepareResult.token,
              photo.file,
              {
                contentType:
                  photo.file.type,
              }
            );

        if (error) {
          console.error(
            "Supabase photo upload error:",
            error
          );

          throw new Error(
            `${photo.file.name} could not be uploaded.`
          );
        }

        storedPhotos.push({
          path: prepareResult.path,
          fileName: photo.file.name,
          contentType: photo.file.type,
          size: photo.file.size,
        });
      }

      window.sessionStorage.setItem(
        "trackfit-photo-count",
        String(storedPhotos.length)
      );

      window.sessionStorage.setItem(
        "trackfit-photo-paths",
        JSON.stringify(storedPhotos)
      );

      router.push("/quote/contact");
    } catch (error) {
      console.error(
        "TrackFit photo upload error:",
        error
      );

      setUploadError(
        error instanceof Error
          ? error.message
          : "The photos could not be uploaded. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  }

  function saveAndExit() {
    router.push("/services");
  }

  return (
    <main className="tf-quote-page tf-quote-page-cinematic tf-photos-page-cinematic">
      <div
        className="tf-quote-atmosphere"
        aria-hidden="true"
      >
        <motion.div
          className="tf-quote-light"
          animate={{
            x: [-46, 58, -46],
            y: [16, -32, 16],
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
            x: [38, -56, 38],
            y: [-20, 36, -20],
            scale: [1.08, 0.92, 1.08],
            opacity: [0.2, 0.48, 0.2],
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
            opacity: [0, 1, 0.5],
            scaleX: 1,
          }}
          transition={{
            duration: 1.05,
            delay: 0.42,
            ease: cinematicEase,
          }}
        />

        <motion.div
          className="tf-photo-focus-ring"
          initial={{
            opacity: 0,
            scale: 0.45,
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scale: [0.45, 1.15, 1.55],
          }}
          transition={{
            duration: 1.5,
            delay: 0.55,
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
            currentStep={4}
            totalSteps={8}
            label="Project photos"
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
            Visual assessment
          </motion.p>

          <h1>
            Show us where the tracks will be{" "}
            <span className="tf-quote-heading-accent">
              installed.
            </span>
          </h1>

          <p>
            Photos help our team understand access,
            fixing surfaces, window shape and any
            existing fittings.
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
          className="tf-photo-uploader-reveal"
          variants={revealVariants}
          whileHover={{
            y: -3,
          }}
        >
          <motion.div
            className="tf-photo-uploader-scan"
            initial={{
              x: "-130%",
            }}
            animate={{
              x: "240%",
            }}
            transition={{
              duration: 1.8,
              delay: 1,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />

          <PhotoUploader
            photos={photos}
            onChange={handlePhotosChange}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {uploadError && (
            <motion.p
              key={uploadError}
              className="tf-photo-error"
              role="alert"
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.98,
                filter: "blur(5px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -6,
              }}
              transition={{
                duration: 0.3,
                ease: cinematicEase,
              }}
            >
              {uploadError}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {photos.length > 0 && (
            <motion.div
              className="tf-photo-ready-banner"
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.97,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -12,
              }}
              transition={{
                duration: 0.45,
                ease: cinematicEase,
              }}
            >
              <motion.span
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

              <div>
                <strong>
                  {photos.length}{" "}
                  {photos.length === 1
                    ? "photo"
                    : "photos"}{" "}
                  ready
                </strong>

                <p>
                  Your images will be securely
                  uploaded when you continue.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="tf-quote-actions"
          variants={revealVariants}
        >
          <motion.button
            type="button"
            className="tf-quote-back"
            disabled={isUploading}
            onClick={() =>
              router.push("/quote/quantity")
            }
            whileHover={
              !isUploading
                ? {
                    x: -3,
                  }
                : undefined
            }
            whileTap={
              !isUploading
                ? {
                    scale: 0.97,
                  }
                : undefined
            }
          >
            ← Back
          </motion.button>

          <div className="tf-quote-action-right">
            <div className="tf-quote-selection">
              <AnimatePresence mode="wait">
                {photos.length ? (
                  <motion.div
                    key={`photos-${photos.length}`}
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
                        rotate: -18,
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
                      {photos.length}{" "}
                      {photos.length === 1
                        ? "photo"
                        : "photos"}{" "}
                      ready
                    </p>
                  </motion.div>
                ) : (
                  <motion.p
                    key="photos-empty"
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
                    Photos are recommended, but you
                    can continue without them.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="button"
              className="tf-quote-continue"
              disabled={isUploading}
              onClick={continueJourney}
              whileHover={
                !isUploading
                  ? {
                      y: -3,
                      scale: 1.012,
                    }
                  : undefined
              }
              whileTap={
                !isUploading
                  ? {
                      scale: 0.98,
                    }
                  : undefined
              }
              animate={
                photos.length &&
                !isUploading
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
                  duration: 1.1,
                },
              }}
            >
              {isUploading ? (
                <>
                  <motion.span
                    className="tf-photo-upload-spinner"
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

                  Uploading photos…
                </>
              ) : (
                <>
                  {photos.length
                    ? "Continue"
                    : "Skip for now"}

                  <motion.span
                    animate={{
                      x: [0, 4, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatDelay: 1.3,
                    }}
                  >
                    <ArrowIcon />
                  </motion.span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
    </main>
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