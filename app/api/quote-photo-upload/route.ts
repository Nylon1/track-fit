import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const bucketName = "trackfit-enquiry-photos";

const acceptedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

type UploadRequest = {
  fileName?: string;
  contentType?: string;
};

function createSafeFileName(fileName: string) {
  const extension =
    fileName.split(".").pop()?.toLowerCase() || "jpg";

  const safeExtension = [
    "jpg",
    "jpeg",
    "png",
    "webp",
  ].includes(extension)
    ? extension
    : "jpg";

  return `${crypto.randomUUID()}.${safeExtension}`;
}

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as UploadRequest;

    if (
      !body.fileName ||
      !body.contentType ||
      !acceptedTypes.has(body.contentType)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Only JPG, PNG and WebP images are supported.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase = createSupabaseAdminClient();

    const now = new Date();

    const folder = [
      now.getUTCFullYear(),
      String(now.getUTCMonth() + 1).padStart(
        2,
        "0"
      ),
      String(now.getUTCDate()).padStart(
        2,
        "0"
      ),
      crypto.randomUUID(),
    ].join("/");

    const path = `${folder}/${createSafeFileName(
      body.fileName
    )}`;

    const { data, error } =
      await supabase.storage
        .from(bucketName)
        .createSignedUploadUrl(path);

    if (error || !data?.token) {
      console.error(
        "Unable to create signed upload URL:",
        {
          path,
          error,
        }
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "A secure photo upload could not be prepared.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      path,
      token: data.token,
    });
  } catch (error) {
    console.error(
      "Photo upload route error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected photo upload error occurred.",
      },
      {
        status: 500,
      }
    );
  }
}
