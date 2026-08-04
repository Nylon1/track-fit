import type { User } from "@supabase/supabase-js";

export function isTrackfitAdminUser(user: User | null | undefined) {
  return user?.app_metadata?.trackfit_admin === true;
}
