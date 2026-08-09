import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { isTrackfitAdminUser } from "@/lib/admin/auth";
import { outreachEmailHtml, outreachRequestSchema } from "@/lib/leads/outreach";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { z } from "zod";

const customerEmailSchema = z.email();
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isTrackfitAdminUser(user)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  let input: z.infer<typeof outreachRequestSchema>;
  try {
    input = outreachRequestSchema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { error: "Invalid email subject or message" },
      { status: 400 },
    );
  }

  const { id } = await params;
  if (!z.uuid().safeParse(id).success) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  const { data: lead } = await supabase
    .from("trackfit_enquiries")
    .select("id,full_name,email")
    .eq("id", id)
    .maybeSingle();
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const recipient = String(lead.email ?? "").trim();
  if (!customerEmailSchema.safeParse(recipient).success) {
    return NextResponse.json(
      { error: "No valid customer email address" },
      { status: 400 },
    );
  }

  const baseChanges = {
    email_type: input.type,
    recipient,
    subject: input.subject,
    status: "processing",
  };
  const { error: reservationError } = await supabase
    .from("trackfit_enquiry_activity")
    .insert({
      id: input.requestId,
      enquiry_id: id,
      actor_id: user.id,
      activity_type: "customer_email",
      description: `Customer ${input.type.replaceAll("_", " ")} email queued for ${recipient}`,
      changes: baseChanges,
    });
  if (reservationError) {
    const duplicate = reservationError.code === "23505";
    return NextResponse.json(
      {
        error: duplicate
          ? "This email request has already been processed"
          : "Unable to record the email attempt",
      },
      { status: duplicate ? 409 : 500 },
    );
  }

  const finishAttempt = async (
    status: "success" | "failure",
    description: string,
    extra: Record<string, unknown> = {},
  ) =>
    supabase
      .from("trackfit_enquiry_activity")
      .update({
        description,
        changes: { ...baseChanges, status, ...extra },
      })
      .eq("id", input.requestId)
      .eq("actor_id", user.id);

  const smtpHost = process.env.IONOS_SMTP_HOST?.trim();
  const smtpPort = Number(process.env.IONOS_SMTP_PORT);
  const smtpUser = process.env.IONOS_SMTP_USER?.trim();
  const smtpPassword = process.env.IONOS_SMTP_PASSWORD;
  const smtpFrom = process.env.IONOS_SMTP_FROM?.trim();
  const fromMailbox = smtpFrom?.match(/<([^>]+)>/)?.[1]?.trim() || smtpFrom;
  if (
    !smtpHost ||
    !Number.isInteger(smtpPort) ||
    smtpPort < 1 ||
    smtpPort > 65535 ||
    !smtpUser ||
    !smtpPassword ||
    !smtpFrom ||
    !customerEmailSchema.safeParse(fromMailbox).success ||
    fromMailbox?.toLowerCase() !== smtpUser.toLowerCase()
  ) {
    await finishAttempt(
      "failure",
      `Customer ${input.type.replaceAll("_", " ")} email failed for ${recipient}`,
      { reason: "IONOS SMTP is not configured" },
    );
    return NextResponse.json(
      { error: "Email delivery is not configured" },
      { status: 503 },
    );
  }

  try {
    const transport = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPassword },
    });
    const result = await transport.sendMail({
      from: smtpFrom,
      to: recipient,
      replyTo: smtpFrom,
      subject: input.subject,
      html: outreachEmailHtml(input.message),
      text: input.message,
    });

    const contactedAt = new Date().toISOString();
    await finishAttempt(
      "success",
      `Customer ${input.type.replaceAll("_", " ")} email sent to ${recipient}`,
      { smtp_message_id: result.messageId || null, sent_at: contactedAt },
    );
    await supabase
      .from("trackfit_enquiries")
      .update({ last_contacted_at: contactedAt })
      .eq("id", id);
    return NextResponse.json({ success: true, sentAt: contactedAt });
  } catch (error) {
    await finishAttempt(
      "failure",
      `Customer ${input.type.replaceAll("_", " ")} email failed for ${recipient}`,
      {
        reason:
          error instanceof Error
            ? error.message.slice(0, 300)
            : "Unknown error",
      },
    );
    return NextResponse.json(
      { error: "Email could not be sent" },
      { status: 502 },
    );
  }
}
