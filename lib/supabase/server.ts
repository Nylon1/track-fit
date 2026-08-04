import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSupabaseConfig } from "./config";
import { isTrackfitAdminUser } from "@/lib/admin/auth";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseConfig();
  return createServerClient(url, anonKey, { cookies: { getAll: () => cookieStore.getAll(), setAll: (items) => { try { items.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {} } } });
}

export async function requireTrackfitAdmin(path = "/admin") {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = isTrackfitAdminUser(user);
  if (process.env.NODE_ENV === "development") console.info("[TrackFit Admin Auth]", JSON.stringify({ path, userExists: Boolean(user), userEmail: user?.email, trackfitAdmin: isAdmin, redirectDestination: isAdmin ? path : isAdmin === false && user ? "/admin/login?error=unauthorised" : "/admin/login" }));
  if (!user) redirect("/admin/login");
  if (!isAdmin) redirect("/admin/login?error=unauthorised");
  return { supabase, user };
}
