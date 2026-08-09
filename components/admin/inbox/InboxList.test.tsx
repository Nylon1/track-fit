import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import InboxList from "./InboxList";

const message = {
  uid: 42,
  unread: true,
  senderName: "Jane Smith",
  senderEmail: "jane@example.com",
  subject: "Re: Curtain track enquiry",
  preview: "Re: Curtain track enquiry",
  receivedAt: "2026-08-09T14:32:00Z",
  messageId: "<message@example.com>",
  inReplyTo: null,
  size: 1200,
  lead: { id: "lead-id", referenceNumber: "TF-1042", matchCount: 1 },
};

describe("InboxList", () => {
  it("visibly distinguishes unread linked messages", () => {
    const html = renderToStaticMarkup(<InboxList messages={[message]} />);
    expect(html).toContain("is-unread");
    expect(html).toContain('aria-label="Unread"');
    expect(html).toContain("Linked lead: TF-1042");
    expect(html).toContain("/admin/inbox/42");
  });

  it("labels unknown senders as unlinked", () => {
    const html = renderToStaticMarkup(
      <InboxList messages={[{ ...message, unread: false, lead: null }]} />,
    );
    expect(html).toContain("Unlinked email");
    expect(html).toContain('aria-label="Read"');
  });
});
