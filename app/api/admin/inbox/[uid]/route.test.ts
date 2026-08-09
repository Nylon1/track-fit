import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
  fetchMessage: vi.fn(),
  enrich: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: mocks.createClient,
}));
vi.mock("@/lib/email/ionos-imap", () => ({
  ImapConfigurationError: class ImapConfigurationError extends Error {},
  fetchInboxMessage: mocks.fetchMessage,
}));
vi.mock("@/lib/email/inbox-data", () => ({
  enrichInboxMessage: mocks.enrich,
}));

import { GET } from "./route";

const params = (uid: string) => ({ params: Promise.resolve({ uid }) });

describe("inbox message API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.createClient.mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: {
            user: { id: "admin", app_metadata: { trackfit_admin: true } },
          },
        }),
      },
    });
    mocks.fetchMessage.mockResolvedValue({
      uid: 42,
      senderEmail: "customer@example.com",
    });
    mocks.enrich.mockResolvedValue({ uid: 42, lead: { id: "lead" } });
  });

  it("rejects non-admin users", async () => {
    mocks.createClient.mockResolvedValue({
      auth: { getUser: vi.fn().mockResolvedValue({ data: { user: null } }) },
    });
    expect(
      (await GET(new Request("http://localhost"), params("42"))).status,
    ).toBe(401);
  });

  it("rejects invalid UIDs", async () => {
    expect(
      (await GET(new Request("http://localhost"), params("invalid"))).status,
    ).toBe(404);
    expect(mocks.fetchMessage).not.toHaveBeenCalled();
  });

  it("opens only the requested UID and marks that message read", async () => {
    const response = await GET(new Request("http://localhost"), params("42"));
    expect(response.status).toBe(200);
    expect(mocks.fetchMessage).toHaveBeenCalledWith(42, true);
  });
});
