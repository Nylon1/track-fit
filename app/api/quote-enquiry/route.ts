import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const bucketName = "trackfit-enquiry-photos";
const signedUrlDuration = 60 * 60 * 24 * 7;

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

type QuoteEnquiry = {
  reference: string;
  postcode: string;
  property: string;
  trackType: string;
  quantity: string;
  photoCount: string;
  photos: StoredPhoto[];
  contact: ContactDetails;
  submittedAt: string;
};

type EmailPhoto = StoredPhoto & {
  signedUrl: string;
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPreferredContact(
  value: ContactDetails["preferredContact"]
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

  return `${value} tracks`;
}

function formatFileSize(size: number) {
  if (!Number.isFinite(size) || size <= 0) {
    return "";
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function validatePhoto(
  value: unknown
): value is StoredPhoto {
  if (!value || typeof value !== "object") {
    return false;
  }

  const photo = value as Partial<StoredPhoto>;

  return Boolean(
    typeof photo.path === "string" &&
      photo.path.length > 0 &&
      typeof photo.fileName === "string" &&
      photo.fileName.length > 0 &&
      typeof photo.contentType === "string" &&
      typeof photo.size === "number"
  );
}

function validateEnquiry(
  value: unknown
): value is QuoteEnquiry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const enquiry = value as Partial<QuoteEnquiry>;

  const photosValid =
    enquiry.photos === undefined ||
    (Array.isArray(enquiry.photos) &&
      enquiry.photos.length <= 8 &&
      enquiry.photos.every(validatePhoto));

  return Boolean(
    typeof enquiry.reference === "string" &&
      enquiry.reference.length > 0 &&
      typeof enquiry.postcode === "string" &&
      enquiry.postcode.length > 0 &&
      typeof enquiry.property === "string" &&
      enquiry.property.length > 0 &&
      typeof enquiry.trackType === "string" &&
      enquiry.trackType.length > 0 &&
      typeof enquiry.quantity === "string" &&
      enquiry.quantity.length > 0 &&
      enquiry.contact?.fullName &&
      enquiry.contact.email &&
      enquiry.contact.phone &&
      typeof enquiry.submittedAt === "string" &&
      photosValid
  );
}

function createPhotoHtml(photos: EmailPhoto[]) {
  if (!photos.length) {
    return `
      <p
        style="
          margin:0;
          color:#697069;
          line-height:1.7;
        "
      >
        No project photographs were uploaded.
      </p>
    `;
  }

  return photos
    .map(
      (photo, index) => `
        <div
          style="
            margin:0 0 14px;
            border:1px solid #e4e7e1;
            border-radius:12px;
            padding:14px;
          "
        >
          <p
            style="
              margin:0 0 6px;
              color:#171917;
              font-size:14px;
              font-weight:700;
            "
          >
            Photo ${index + 1}: ${escapeHtml(
              photo.fileName
            )}
          </p>

          ${
            formatFileSize(photo.size)
              ? `
                <p
                  style="
                    margin:0 0 10px;
                    color:#7a817a;
                    font-size:12px;
                  "
                >
                  ${escapeHtml(
                    formatFileSize(photo.size)
                  )}
                </p>
              `
              : ""
          }

          <a
            href="${escapeHtml(photo.signedUrl)}"
            style="
              display:inline-block;
              border-radius:8px;
              background:#b8f23d;
              padding:10px 14px;
              color:#111511;
              font-size:13px;
              font-weight:700;
              text-decoration:none;
            "
          >
            View photo
          </a>
        </div>
      `
    )
    .join("");
}

export async function POST(request: Request) {
  try {
    const resendApiKey =
      process.env.RESEND_API_KEY;

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!resendApiKey) {
      console.error(
        "RESEND_API_KEY is not configured."
      );

      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        "Supabase server credentials are not configured."
      );

      return NextResponse.json(
        {
          success: false,
          error: "Photo storage is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const body: unknown = await request.json();

    if (!validateEnquiry(body)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "The enquiry information is incomplete.",
        },
        {
          status: 400,
        }
      );
    }

    const resend = new Resend(resendApiKey);

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
      }
    );

    const storedPhotos = body.photos || [];
    const emailPhotos: EmailPhoto[] = [];

    for (const photo of storedPhotos) {
      const { data, error } =
        await supabase.storage
          .from(bucketName)
          .createSignedUrl(
            photo.path,
            signedUrlDuration
          );

      if (error || !data?.signedUrl) {
        console.error(
          "Unable to create signed photo URL:",
          {
            path: photo.path,
            error,
          }
        );

        continue;
      }

      emailPhotos.push({
        ...photo,
        signedUrl: data.signedUrl,
      });
    }

    const property =
      propertyLabels[body.property] ||
      body.property;

    const trackType =
      trackLabels[body.trackType] ||
      body.trackType;

    const safeName = escapeHtml(
      body.contact.fullName
    );

    const safeEmail = escapeHtml(
      body.contact.email
    );

    const safePhone = escapeHtml(
      body.contact.phone
    );

    const safePostcode = escapeHtml(
      body.postcode
    );

    const safeNotes = body.contact.notes
      ? escapeHtml(body.contact.notes)
      : "No additional information provided.";

    const photoHtml =
      createPhotoHtml(emailPhotos);

    const { data, error } =
      await resend.emails.send({
        from:
          "TrackFit Enquiries <enquiries@curtaintrackfitters.com>",

        to: [
          "enquiries@curtaintrackfitters.com",
        ],

        replyTo: body.contact.email,

        subject:
          `${body.reference} — New TrackFit enquiry from ${body.contact.fullName}`,

        html: `
          <!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8" />

              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </head>

            <body
              style="
                margin:0;
                padding:0;
                background:#f3f4f1;
                font-family:Arial,Helvetica,sans-serif;
                color:#171917;
              "
            >
              <div
                style="
                  max-width:680px;
                  margin:0 auto;
                  padding:32px 18px;
                "
              >
                <div
                  style="
                    background:#090b09;
                    border-radius:18px 18px 0 0;
                    padding:30px;
                    color:#ffffff;
                  "
                >
                  <p
                    style="
                      margin:0 0 10px;
                      color:#b8f23d;
                      font-size:12px;
                      font-weight:700;
                      letter-spacing:1.5px;
                      text-transform:uppercase;
                    "
                  >
                    New installation enquiry
                  </p>

                  <h1
                    style="
                      margin:0;
                      font-size:28px;
                      line-height:1.2;
                    "
                  >
                    ${escapeHtml(body.reference)}
                  </h1>

                  <p
                    style="
                      margin:12px 0 0;
                      color:#c9cec9;
                      line-height:1.6;
                    "
                  >
                    A customer has submitted a new
                    curtain-track installation request.
                  </p>
                </div>

                <div
                  style="
                    background:#ffffff;
                    padding:30px;
                    border-radius:0 0 18px 18px;
                  "
                >
                  <h2
                    style="
                      margin:0 0 18px;
                      font-size:20px;
                    "
                  >
                    Customer details
                  </h2>

                  <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    style="
                      border-collapse:collapse;
                      margin-bottom:30px;
                    "
                  >
                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#697069;
                        "
                      >
                        Name
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          text-align:right;
                          font-weight:700;
                        "
                      >
                        ${safeName}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#697069;
                        "
                      >
                        Email
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          text-align:right;
                        "
                      >
                        <a
                          href="mailto:${safeEmail}"
                          style="color:#4b6814;"
                        >
                          ${safeEmail}
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#697069;
                        "
                      >
                        Telephone
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          text-align:right;
                        "
                      >
                        <a
                          href="tel:${safePhone}"
                          style="color:#4b6814;"
                        >
                          ${safePhone}
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#697069;
                        "
                      >
                        Preferred contact
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          text-align:right;
                          font-weight:700;
                        "
                      >
                        ${formatPreferredContact(
                          body.contact.preferredContact
                        )}
                      </td>
                    </tr>
                  </table>

                  <h2
                    style="
                      margin:0 0 18px;
                      font-size:20px;
                    "
                  >
                    Installation request
                  </h2>

                  <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    style="
                      border-collapse:collapse;
                      margin-bottom:30px;
                    "
                  >
                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#697069;
                        "
                      >
                        Postcode
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          text-align:right;
                          font-weight:700;
                        "
                      >
                        ${safePostcode}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#697069;
                        "
                      >
                        Property
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          text-align:right;
                          font-weight:700;
                        "
                      >
                        ${escapeHtml(property)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#697069;
                        "
                      >
                        Track type
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          text-align:right;
                          font-weight:700;
                        "
                      >
                        ${escapeHtml(trackType)}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#697069;
                        "
                      >
                        Quantity
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          text-align:right;
                          font-weight:700;
                        "
                      >
                        ${escapeHtml(
                          formatQuantity(body.quantity)
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding:10px 0;
                          color:#697069;
                        "
                      >
                        Photos uploaded
                      </td>

                      <td
                        style="
                          padding:10px 0;
                          text-align:right;
                          font-weight:700;
                        "
                      >
                        ${emailPhotos.length}
                      </td>
                    </tr>
                  </table>

                  <h2
                    style="
                      margin:0 0 12px;
                      font-size:20px;
                    "
                  >
                    Project photographs
                  </h2>

                  <div style="margin-bottom:30px;">
                    ${photoHtml}
                  </div>

                  ${
                    storedPhotos.length !==
                    emailPhotos.length
                      ? `
                        <p
                          style="
                            margin:0 0 24px;
                            border-radius:10px;
                            background:#fff4d7;
                            padding:12px;
                            color:#725515;
                            font-size:12px;
                            line-height:1.6;
                          "
                        >
                          Some uploaded photographs
                          could not be linked. Check the
                          private storage bucket if the
                          expected number is missing.
                        </p>
                      `
                      : ""
                  }

                  <h2
                    style="
                      margin:0 0 12px;
                      font-size:20px;
                    "
                  >
                    Additional information
                  </h2>

                  <div
                    style="
                      border-radius:12px;
                      background:#f4f6f1;
                      padding:18px;
                      line-height:1.7;
                      white-space:pre-wrap;
                    "
                  >${safeNotes}</div>

                  <p
                    style="
                      margin:30px 0 0;
                      color:#7a817a;
                      font-size:12px;
                      line-height:1.6;
                    "
                  >
                    Submitted:
                    ${escapeHtml(body.submittedAt)}
                  </p>

                  <p
                    style="
                      margin:8px 0 0;
                      color:#7a817a;
                      font-size:12px;
                      line-height:1.6;
                    "
                  >
                    Photo links expire after seven days.
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

    if (error) {
      console.error(
        "Resend enquiry error:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "The enquiry email could not be sent.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json({
      success: true,
      emailId: data?.id,
      photoLinksCreated: emailPhotos.length,
    });
  } catch (error) {
    console.error(
      "Quote enquiry route error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected error occurred while sending the enquiry.",
      },
      {
        status: 500,
      }
    );
  }
}