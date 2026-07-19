import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

function safeFileName(fileName: string) {
  const extension =
    fileName.split(".").pop()?.toLowerCase() || "jpg";

  const safeExtension = ["jpg", "jpeg", "png", "webp"].includes(
    extension
  )
    ? extension
    : "jpg";

  return `${crypto.randomUUID()}.${safeExtension}`;
}

export async function POST(request: Request) {
  try {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
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

    const body = (await request.json()) as UploadRequest;

    if (
      !body.fileName ||
      !body.contentType ||
      !acceptedTypes.has(body.contentType)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported image file.",
        },
        {
          status: 400,
        }
      );
    }

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

    const date = new Date();
    const folder = [
      date.getUTCFullYear(),
      String(date.getUTCMonth() + 1).padStart(2, "0"),
      String(date.getUTCDate()).padStart(2, "0"),
      crypto.randomUUID(),
    ].join("/");

    const path = `${folder}/${safeFileName(
      body.fileName
    )}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUploadUrl(path);

    if (error || !data) {
      console.error(
        "Unable to create signed upload URL:",
        error
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