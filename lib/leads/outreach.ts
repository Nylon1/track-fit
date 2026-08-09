import { z } from "zod";

export const outreachTypes = [
  "introduction",
  "follow_up",
  "request_photos",
  "request_measurements",
  "quote_follow_up",
  "installation_follow_up",
  "custom",
] as const;

export type OutreachType = (typeof outreachTypes)[number];

export type OutreachLead = {
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  postcode?: string | null;
  property_type?: string | null;
  track_type?: string | null;
  track_quantity?: string | number | null;
  reference_number?: string | null;
  quote_reference?: string | null;
  installation_address?: string | null;
};

export const outreachRequestSchema = z.object({
  type: z.enum(outreachTypes),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(10_000),
  requestId: z.uuid(),
});

const signature = `Kind regards,

TrackFit
0800 772 0367
enquiries@curtaintrackfitters.com

TrackFit is a trading name operated by Apex Curtains Ltd.`;

const clean = (value: unknown) => String(value ?? "").trim();
const firstName = (name: unknown) => clean(name).split(/\s+/)[0] || "there";
const humanise = (value: unknown) => clean(value).replaceAll("_", " ");

function requirements(lead: OutreachLead) {
  return [
    humanise(lead.property_type),
    humanise(lead.track_type),
    lead.track_quantity ? `${lead.track_quantity} track(s)` : "",
    clean(lead.installation_address),
    clean(lead.postcode),
  ]
    .filter(Boolean)
    .join("\n");
}

export function outreachTemplate(type: OutreachType, lead: OutreachLead) {
  const hello = `Hi ${firstName(lead.full_name)},`;
  const reference = clean(lead.reference_number);
  const quoteReference = clean(lead.quote_reference);
  const requirementText = requirements(lead);
  const requirementBlock = requirementText
    ? `\n\nWe have your requirements as:\n\n${requirementText}`
    : "";
  const templates: Record<OutreachType, { subject: string; message: string }> =
    {
      introduction: {
        subject: `TrackFit enquiry${reference ? ` – ${reference}` : ""}`,
        message: `${hello}\n\nThank you for your enquiry with TrackFit.\n\nWe are getting in touch regarding your curtain track installation enquiry.${requirementBlock}\n\nIf you have any photos of the windows or areas where the tracks are required, please reply with them and we can review the installation requirements.\n\n${signature}`,
      },
      follow_up: {
        subject: "Following up on your TrackFit enquiry",
        message: `${hello}\n\nWe are following up regarding your recent TrackFit enquiry${reference ? ` (${reference})` : ""}.\n\nPlease let us know if you would still like us to assist with the curtain track installation.\n\nYou can reply directly to this email with any questions, measurements or photos.\n\n${signature}`,
      },
      request_photos: {
        subject: "Photos required for your TrackFit enquiry",
        message: `${hello}\n\nThanks for your enquiry.\n\nTo help us assess the installation, please reply to this email with a few clear photos of:\n\n- the full window or opening\n- the ceiling or wall where the track will be fixed\n- any bay corners or unusual angles\n- the surrounding area\n\nOnce received, we can review the job and advise on the next step.\n\n${signature}`,
      },
      request_measurements: {
        subject: "Measurements required for your TrackFit enquiry",
        message: `${hello}\n\nTo help us review your enquiry${reference ? ` (${reference})` : ""}, please reply with the approximate width of each window or opening and the proposed fitting height.\n\nPlease include measurements for any bay sections or unusual angles where possible. Photos alongside the measurements are very helpful.\n\n${signature}`,
      },
      quote_follow_up: {
        subject: `Following up on your TrackFit quote${quoteReference ? ` – ${quoteReference}` : ""}`,
        message: `${hello}\n\nWe are following up regarding your TrackFit quote${quoteReference ? ` (${quoteReference})` : ""}.\n\nPlease let us know if you have any questions or would like to proceed with the curtain track installation.\n\n${signature}`,
      },
      installation_follow_up: {
        subject: "Following up on your TrackFit installation",
        message: `${hello}\n\nWe hope you are pleased with your recent TrackFit installation.\n\nIf you have any questions or need any further assistance, please reply directly to this email.\n\n${signature}`,
      },
      custom: {
        subject: reference
          ? `TrackFit enquiry – ${reference}`
          : "Your TrackFit enquiry",
        message: `${hello}\n\n\n\n${signature}`,
      },
    };
  return templates[type];
}

export function outreachEmailHtml(message: string) {
  const escaped = message.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
  return `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#172014;white-space:pre-wrap">${escaped}</div>`;
}
