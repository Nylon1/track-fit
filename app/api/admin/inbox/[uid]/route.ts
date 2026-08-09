import { NextResponse } from "next/server";
import { isTrackfitAdminUser } from "@/lib/admin/auth";
import { enrichInboxMessage } from "@/lib/email/inbox-data";
import {
  fetchInboxMessage,
  ImapConfigurationError,
} from "@/lib/email/ionos-imap";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ uid: string }> },
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isTrackfitAdminUser(user)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const uid = Number((await params).uid);
  if (!Number.isSafeInteger(uid) || uid < 1) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }
  try {
    const message = await fetchInboxMessage(uid, true);
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json(await enrichInboxMessage(supabase, message));
  } catch (error) {
    console.error(
      "[TrackFit IMAP] Message unavailable:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json(
      {
        error:
          error instanceof ImapConfigurationError
            ? "IONOS IMAP is not configured"
            : "Inbox temporarily unavailable",
      },
      { status: 503 },
    );
  }
}
