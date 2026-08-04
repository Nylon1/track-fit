import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseConfig } from "./config";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseConfig();
  return createServerClient(url, anonKey, { cookies: { getAll: () => cookieStore.getAll(), setAll: (items) => { try { items.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {} } } });
}

export async function requireTrackfitAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = user?.app_metadata?.trackfit_admin === true;
  if (process.env.NODE_ENV === "development") console.info("[TrackFit admin auth]", { hasUser: Boolean(user), isAdmin, destination: isAdmin ? "/admin" : "/admin/login" });
  if (!user || !isAdmin) redirect("/admin/login");
  return { supabase, user };
}
