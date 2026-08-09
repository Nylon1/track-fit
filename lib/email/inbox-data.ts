import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  attachLeadMatches,
  matchLeadByEmail,
  type MatchableLead,
} from "./lead-match";
import type { InboxMessage, InboxMessageDetail } from "./ionos-imap";

export async function loadMatchableLeads(supabase: SupabaseClient) {
  const { data = [] } = await supabase
    .from("trackfit_enquiries")
    .select("id,email,reference_number,created_at,status")
    .not("email", "is", null)
    .order("created_at", { ascending: false })
    .limit(2000);
  return (data || []) as MatchableLead[];
}

export async function enrichInboxMessages(
  supabase: SupabaseClient,
  messages: InboxMessage[],
) {
  return attachLeadMatches(messages, await loadMatchableLeads(supabase));
}

export async function enrichInboxMessage(
  supabase: SupabaseClient,
  message: InboxMessageDetail,
) {
  return {
    ...message,
    lead: matchLeadByEmail(
      message.senderEmail,
      await loadMatchableLeads(supabase),
    ),
  };
}
