import { describe, expect, it } from "vitest";
import { sanitizeEmailHtml } from "./sanitize";

describe("email HTML sanitization", () => {
  it("removes scripts, forms, event handlers, iframes and tracking images", () => {
    const result = sanitizeEmailHtml(
      '<script>alert(1)</script><form><input></form><iframe src="https://bad.test"></iframe><img src="https://tracker.test/pixel"><p onclick="bad()">Hello</p>',
    );
    expect(result).toBe("<p>Hello</p>");
  });

  it("keeps safe text formatting and links", () => {
    expect(
      sanitizeEmailHtml(
        '<p><strong>Hello</strong> <a href="https://example.com">link</a></p>',
      ),
    ).toContain('href="https://example.com"');
  });
});
