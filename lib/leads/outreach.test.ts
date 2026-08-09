import { describe, expect, it } from "vitest";
import {
  outreachEmailHtml,
  outreachRequestSchema,
  outreachTemplate,
} from "./outreach";

const lead = {
  full_name: "Jane Smith",
  email: "jane@example.com",
  reference_number: "TF-2026-000123",
  property_type: "residential",
  track_type: "ceiling",
  track_quantity: "2",
};

describe("customer outreach", () => {
  it.each(["introduction", "follow_up", "request_photos"] as const)(
    "creates the %s template with the legal identity",
    (type) => {
      const template = outreachTemplate(type, lead);
      expect(template.subject).toBeTruthy();
      expect(template.message).toContain("Hi Jane,");
      expect(template.message).toContain(
        "TrackFit is a trading name operated by Apex Curtains Ltd.",
      );
    },
  );

  it("omits blank lead information", () => {
    const template = outreachTemplate("introduction", {
      full_name: "Jane Smith",
    });
    expect(template.message).not.toContain("undefined");
    expect(template.message).not.toContain("null");
    expect(template.message).not.toContain("We have your requirements as:");
  });

  it("accepts an edited custom message with an idempotency key", () => {
    expect(
      outreachRequestSchema.parse({
        type: "custom",
        subject: "Edited subject",
        message: "Edited message",
        requestId: "24f37d18-ef29-4e88-a907-abc286ef58ee",
      }).message,
    ).toBe("Edited message");
  });

  it("rejects blank and overlong messages", () => {
    expect(() =>
      outreachRequestSchema.parse({
        type: "follow_up",
        subject: " ",
        message: "Hello",
        requestId: crypto.randomUUID(),
      }),
    ).toThrow();
    expect(() =>
      outreachRequestSchema.parse({
        type: "follow_up",
        subject: "Hello",
        message: "x".repeat(10_001),
        requestId: crypto.randomUUID(),
      }),
    ).toThrow();
  });

  it("escapes custom HTML", () => {
    expect(
      outreachEmailHtml("Hello <script>alert('x')</script>"),
    ).not.toContain("<script>");
  });
});
