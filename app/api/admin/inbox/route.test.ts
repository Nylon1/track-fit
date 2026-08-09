import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
  fetchInboxPage: vi.fn(),
  enrich: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: mocks.createClient,
}));
vi.mock("@/lib/email/ionos-imap", () => ({
  ImapConfigurationError: class ImapConfigurationError extends Error {},
  fetchInboxPage: mocks.fetchInboxPage,
}));
vi.mock("@/lib/email/inbox-data", () => ({
  enrichInboxMessages: mocks.enrich,
}));

import { GET } from "./route";
import { ImapConfigurationError } from "@/lib/email/ionos-imap";

const admin = { id: "admin", app_metadata: { trackfit_admin: true } };

describe("inbox API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.createClient.mockResolvedValue({
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: admin } }) },
    });
    mocks.fetchInboxPage.mockResolvedValue({
      messages: [{ uid: 25 }],
      page: 2,
      limit: 10,
      total: 30,
      hasMore: true,
    });
    mocks.enrich.mockResolvedValue([{ uid: 25, lead: null }]);
  });

  it("rejects unauthenticated and non-admin users", async () => {
    for (const user of [null, { id: "user", app_metadata: {} }]) {
      mocks.createClient.mockResolvedValueOnce({
        auth: { getUser: vi.fn().mockResolvedValue({ data: { user } }) },
      });
      const response = await GET(
        new Request("http://localhost/api/admin/inbox"),
      );
      expect(response.status).toBe(401);
    }
    expect(mocks.fetchInboxPage).not.toHaveBeenCalled();
  });

  it("passes bounded pagination to IMAP", async () => {
    const response = await GET(
      new Request("http://localhost/api/admin/inbox?page=2&limit=10"),
    );
    expect(response.status).toBe(200);
    expect(mocks.fetchInboxPage).toHaveBeenCalledWith(2, 10);
    expect(await response.json()).toMatchObject({ page: 2, hasMore: true });
  });

  it("caps the page size", async () => {
    await GET(new Request("http://localhost/api/admin/inbox?limit=500"));
    expect(mocks.fetchInboxPage).toHaveBeenCalledWith(1, 50);
  });

  it("returns a safe unavailable response for IMAP failures", async () => {
    mocks.fetchInboxPage.mockRejectedValue(new Error("socket unavailable"));
    const response = await GET(new Request("http://localhost/api/admin/inbox"));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      error: "Inbox temporarily unavailable",
      configured: true,
    });
  });

  it("returns a configuration warning without exposing credentials", async () => {
    mocks.fetchInboxPage.mockRejectedValue(
      new ImapConfigurationError("missing credentials"),
    );
    const response = await GET(new Request("http://localhost/api/admin/inbox"));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      error: "IONOS IMAP is not configured",
      configured: false,
    });
  });
});
