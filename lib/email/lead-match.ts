export type MatchableLead = {
  id: string;
  email: string | null;
  reference_number: string;
  created_at: string;
  status?: string;
};

export type LeadMatch = {
  id: string;
  referenceNumber: string;
  matchCount: number;
};

export const normalizeEmail = (email: unknown) =>
  String(email ?? "")
    .trim()
    .toLowerCase();

export function matchLeadByEmail(
  senderEmail: string | null,
  leads: MatchableLead[],
): LeadMatch | null {
  const normalized = normalizeEmail(senderEmail);
  if (!normalized) return null;
  const matches = leads
    .filter((lead) => normalizeEmail(lead.email) === normalized)
    .sort(
      (left, right) =>
        new Date(right.created_at).getTime() -
        new Date(left.created_at).getTime(),
    );
  if (!matches.length) return null;
  return {
    id: matches[0].id,
    referenceNumber: matches[0].reference_number,
    matchCount: matches.length,
  };
}

export function attachLeadMatches<T extends { senderEmail: string | null }>(
  messages: T[],
  leads: MatchableLead[],
) {
  return messages.map((message) => ({
    ...message,
    lead: matchLeadByEmail(message.senderEmail, leads),
  }));
}
