import { NextResponse } from "next/server";
import { isTrackfitAdminUser } from "@/lib/admin/auth";
import { enrichInboxMessages } from "@/lib/email/inbox-data";
import { fetchInboxPage, ImapConfigurationError } from "@/lib/email/ionos-imap";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isTrackfitAdminUser(user)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number(url.searchParams.get("limit")) || 25),
  );
  try {
    const inbox = await fetchInboxPage(page, limit);
    return NextResponse.json({
      ...inbox,
      messages: await enrichInboxMessages(supabase, inbox.messages),
    });
  } catch (error) {
    console.error(
      "[TrackFit IMAP] Inbox list unavailable:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json(
      {
        error:
          error instanceof ImapConfigurationError
            ? "IONOS IMAP is not configured"
            : "Inbox temporarily unavailable",
        configured: !(error instanceof ImapConfigurationError),
      },
      { status: 503 },
    );
  }
}
