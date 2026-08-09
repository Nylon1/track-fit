import { describe, expect, it } from "vitest";
import { matchLeadByEmail, normalizeEmail } from "./lead-match";

const leads = [
  {
    id: "older",
    email: " customer@example.com ",
    reference_number: "TF-OLD",
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "newer",
    email: "CUSTOMER@example.com",
    reference_number: "TF-NEW",
    created_at: "2026-08-01T00:00:00Z",
  },
];

describe("inbox lead matching", () => {
  it("normalizes email addresses", () => {
    expect(normalizeEmail(" Customer@Example.COM ")).toBe(
      "customer@example.com",
    );
  });

  it("links the newest lead and reports multiple matches", () => {
    expect(matchLeadByEmail("customer@example.com", leads)).toEqual({
      id: "newer",
      referenceNumber: "TF-NEW",
      matchCount: 2,
    });
  });

  it("does not create a match for an unknown sender", () => {
    expect(matchLeadByEmail("unknown@example.com", leads)).toBeNull();
  });
});
