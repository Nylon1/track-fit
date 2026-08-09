import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
  smtpSend: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: mocks.createClient,
}));
vi.mock("nodemailer", () => ({
  default: {
    createTransport: () => ({ sendMail: mocks.smtpSend }),
  },
}));

import { POST } from "./route";

const leadId = "72e5017d-6853-4bfc-92e3-aa76bc3dc867";
const requestId = "24f37d18-ef29-4e88-a907-abc286ef58ee";
const admin = { id: "admin-id", app_metadata: { trackfit_admin: true } };

function request(overrides: Record<string, unknown> = {}) {
  return new Request("http://localhost/api/admin/leads/id/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "introduction",
      subject: "TrackFit enquiry",
      message: "Hello customer",
      requestId,
      ...overrides,
    }),
  });
}

function supabaseMock({
  user = admin,
  lead = { id: leadId, full_name: "Jane Smith", email: "jane@example.com" },
  reservationError = null as null | { code: string },
} = {}) {
  const activityInsert = vi.fn().mockResolvedValue({ error: reservationError });
  const activityFinalEq = vi.fn().mockResolvedValue({ error: null });
  const activityUpdateEq = vi.fn().mockReturnValue({ eq: activityFinalEq });
  const leadUpdateEq = vi.fn().mockResolvedValue({ error: null });
  const from = vi.fn((table: string) => {
    if (table === "trackfit_enquiry_activity") {
      return {
        insert: activityInsert,
        update: vi.fn().mockReturnValue({ eq: activityUpdateEq }),
      };
    }
    return {
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          maybeSingle: vi.fn().mockResolvedValue({ data: lead }),
        }),
      }),
      update: vi.fn().mockReturnValue({ eq: leadUpdateEq }),
    };
  });
  const client = {
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user } }) },
    from,
  };
  mocks.createClient.mockResolvedValue(client);
  return { activityInsert, activityFinalEq, leadUpdateEq };
}

describe("lead outreach API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.IONOS_SMTP_HOST = "smtp.ionos.test";
    process.env.IONOS_SMTP_PORT = "465";
    process.env.IONOS_SMTP_USER = "trackfit@example.com";
    process.env.IONOS_SMTP_PASSWORD = "test-password";
    process.env.IONOS_SMTP_FROM = "TrackFit <trackfit@example.com>";
    mocks.smtpSend.mockResolvedValue({ messageId: "smtp-message-id" });
  });
  afterEach(() => {
    delete process.env.IONOS_SMTP_HOST;
    delete process.env.IONOS_SMTP_PORT;
    delete process.env.IONOS_SMTP_USER;
    delete process.env.IONOS_SMTP_PASSWORD;
    delete process.env.IONOS_SMTP_FROM;
  });

  it("rejects unauthenticated and non-admin users", async () => {
    supabaseMock({ user: null as unknown as typeof admin });
    expect(
      (await POST(request(), { params: Promise.resolve({ id: leadId }) }))
        .status,
    ).toBe(401);
    supabaseMock({ user: { id: "user", app_metadata: {} } as typeof admin });
    expect(
      (await POST(request(), { params: Promise.resolve({ id: leadId }) }))
        .status,
    ).toBe(401);
  });

  it("rejects invalid and missing leads", async () => {
    supabaseMock();
    expect(
      (await POST(request(), { params: Promise.resolve({ id: "invalid" }) }))
        .status,
    ).toBe(404);
    supabaseMock({ lead: null as never });
    expect(
      (await POST(request(), { params: Promise.resolve({ id: leadId }) }))
        .status,
    ).toBe(404);
  });

  it("rejects a lead without a valid stored email", async () => {
    supabaseMock({
      lead: { id: leadId, full_name: "Jane Smith", email: "" },
    });
    expect(
      (await POST(request(), { params: Promise.resolve({ id: leadId }) }))
        .status,
    ).toBe(400);
    expect(mocks.smtpSend).not.toHaveBeenCalled();
  });

  it("records a successful send and updates last contacted", async () => {
    const state = supabaseMock();
    const response = await POST(request(), {
      params: Promise.resolve({ id: leadId }),
    });
    expect(response.status).toBe(200);
    expect(mocks.smtpSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "jane@example.com",
        replyTo: "TrackFit <trackfit@example.com>",
      }),
    );
    expect(state.activityInsert).toHaveBeenCalledOnce();
    expect(state.activityFinalEq).toHaveBeenCalledOnce();
    expect(state.leadUpdateEq).toHaveBeenCalledWith("id", leadId);
  });

  it("records SMTP failure without updating last contacted", async () => {
    const state = supabaseMock();
    mocks.smtpSend.mockRejectedValue(new Error("Delivery failed"));
    const response = await POST(request(), {
      params: Promise.resolve({ id: leadId }),
    });
    expect(response.status).toBe(502);
    expect(state.activityFinalEq).toHaveBeenCalledOnce();
    expect(state.leadUpdateEq).not.toHaveBeenCalled();
  });

  it("rejects a duplicate request before sending", async () => {
    const state = supabaseMock({ reservationError: { code: "23505" } });
    const response = await POST(request(), {
      params: Promise.resolve({ id: leadId }),
    });
    expect(response.status).toBe(409);
    expect(state.activityInsert).toHaveBeenCalledOnce();
    expect(mocks.smtpSend).not.toHaveBeenCalled();
  });
});
