import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: vi.fn() }),
}));

import CustomerOutreach from "./CustomerOutreach";

describe("CustomerOutreach", () => {
  it("shows all template actions and contact history", () => {
    const html = renderToStaticMarkup(
      <CustomerOutreach
        leadId="lead-id"
        lead={{ full_name: "Jane Smith", email: "jane@example.com" }}
        lastContacted="9 Aug 2026, 20:35"
        contactAttempts={3}
      />,
    );
    expect(html).toContain("Customer Outreach");
    expect(html).toContain("Send introduction email");
    expect(html).toContain("Installation follow-up");
    expect(html).toContain("Custom email");
    expect(html).toContain("Contact attempts: 3");
  });

  it("disables all actions when the lead has no email", () => {
    const html = renderToStaticMarkup(
      <CustomerOutreach
        leadId="lead-id"
        lead={{ full_name: "Jane Smith", email: "" }}
        lastContacted={null}
        contactAttempts={0}
      />,
    );
    expect(html).toContain("No customer email address");
    expect((html.match(/disabled=""/g) || []).length).toBe(7);
  });
});
