"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function PhotosPage() {
  const router = useRouter();

  const [photos, setPhotos] = useState<
    UploadedPhoto[]
  >([]);

  const [isUploading, setIsUploading] =
    useState(false);

  const [uploadError, setUploadError] =
    useState("");

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
      (photo) => photo.file.size > maximumFileSize
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
const supabase = getSupabaseBrowserClient();
        const { error } = await supabase.storage
          .from(bucketName)
          .uploadToSignedUrl(
            prepareResult.path,
            prepareResult.token,
            photo.file,
            {
              contentType: photo.file.type,
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
          currentStep={4}
          totalSteps={8}
          label="Project photos"
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
            Visual assessment
          </p>

          <h1>
            Show us where the tracks will be
            installed.
          </h1>

          <p>
            Photos help our team understand access,
            fixing surfaces, window shape and any
            existing fittings.
          </p>
        </motion.div>

        <motion.div
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
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <PhotoUploader
            photos={photos}
            onChange={setPhotos}
          />
        </motion.div>

        {uploadError && (
          <p
            className="tf-photo-error"
            role="alert"
          >
            {uploadError}
          </p>
        )}

        <div className="tf-quote-actions">
          <button
            type="button"
            className="tf-quote-back"
            disabled={isUploading}
            onClick={() =>
              router.push("/quote/quantity")
            }
          >
            ← Back
          </button>

          <div className="tf-quote-action-right">
            <div className="tf-quote-selection">
              {photos.length ? (
                <>
                  <span className="tf-quote-selection-check">
                    ✓
                  </span>

                  <p>
                    {photos.length}{" "}
                    {photos.length === 1
                      ? "photo"
                      : "photos"}{" "}
                    ready
                  </p>
                </>
              ) : (
                <p>
                  Photos are recommended, but you can
                  continue without them.
                </p>
              )}
            </div>

            <button
              type="button"
              className="tf-quote-continue"
              disabled={isUploading}
              onClick={continueJourney}
            >
              {isUploading
                ? "Uploading photos…"
                : photos.length
                  ? "Continue"
                  : "Skip for now"}

              {!isUploading && (
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
              )}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}