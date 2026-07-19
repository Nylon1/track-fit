"use client";

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";

export type UploadedPhoto = {
  id: string;
  file: File;
  previewUrl: string;
};

type PhotoUploaderProps = {
  photos: UploadedPhoto[];
  onChange: (photos: UploadedPhoto[]) => void;
  maxFiles?: number;
};

const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function PhotoUploader({
  photos,
  onChange,
  maxFiles = 8,
}: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  function addFiles(fileList: FileList | File[]) {
    setError("");

    const files = Array.from(fileList);

    const validFiles = files.filter((file) =>
      acceptedTypes.includes(file.type)
    );

    if (validFiles.length !== files.length) {
      setError(
        "Use JPG, PNG or WebP image files."
      );
    }

    const remainingSlots = maxFiles - photos.length;

    if (remainingSlots <= 0) {
      setError(
        `You can upload up to ${maxFiles} photos.`
      );
      return;
    }

    const filesToAdd = validFiles.slice(
      0,
      remainingSlots
    );

    const newPhotos = filesToAdd.map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    onChange([...photos, ...newPhotos]);

    if (validFiles.length > remainingSlots) {
      setError(
        `Only ${maxFiles} photos can be uploaded.`
      );
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    if (!event.target.files) {
      return;
    }

    addFiles(event.target.files);
    event.target.value = "";
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files.length) {
      addFiles(event.dataTransfer.files);
    }
  }

  function removePhoto(id: string) {
    const photo = photos.find(
      (item) => item.id === id
    );

    if (photo) {
      URL.revokeObjectURL(photo.previewUrl);
    }

    onChange(
      photos.filter((item) => item.id !== id)
    );
  }

  return (
    <div className="tf-photo-uploader">
      <div
        className={[
          "tf-photo-dropzone",
          isDragging ? "is-dragging" : "",
          photos.length ? "has-photos" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();

          if (
            event.currentTarget.contains(
              event.relatedTarget as Node
            )
          ) {
            return;
          }

          setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          hidden
          onChange={handleInputChange}
        />

        <div className="tf-photo-dropzone-icon">
          <UploadIcon />
        </div>

        <div className="tf-photo-dropzone-copy">
          <p>Show us your installation space.</p>

          <h2>
            Drop photos here or choose from your
            device.
          </h2>

          <span>
            Include the full window, ceiling or wall,
            and any existing curtain track.
          </span>
        </div>

        <button
          type="button"
          className="tf-photo-select-button"
          onClick={() => inputRef.current?.click()}
        >
          Choose photos

          <ArrowIcon />
        </button>

        <div className="tf-photo-file-note">
          JPG, PNG or WebP · Maximum {maxFiles} photos
        </div>
      </div>

      {error && (
        <p
          className="tf-photo-error"
          role="alert"
        >
          {error}
        </p>
      )}

      {photos.length > 0 && (
        <div className="tf-photo-preview-section">
          <div className="tf-photo-preview-heading">
            <div>
              <p>Project images</p>
              <h3>
                {photos.length}{" "}
                {photos.length === 1
                  ? "photo"
                  : "photos"}{" "}
                added
              </h3>
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
            >
              Add more
            </button>
          </div>

          <div className="tf-photo-preview-grid">
            {photos.map((photo, index) => (
              <article
                key={photo.id}
                className="tf-photo-preview-card"
              >
                <img
                  src={photo.previewUrl}
                  alt={`Installation preview ${
                    index + 1
                  }`}
                />

                <div className="tf-photo-preview-overlay">
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removePhoto(photo.id)
                    }
                    aria-label={`Remove photo ${
                      index + 1
                    }`}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17 23V7M11 13L17 7L23 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M8 21V26C8 27.1 8.9 28 10 28H24C25.1 28 26 27.1 26 26V21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="19"
      height="19"
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

function DeleteIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 6H15.5M8 6V4.5H12V6M6.5 6L7.1 15H12.9L13.5 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}