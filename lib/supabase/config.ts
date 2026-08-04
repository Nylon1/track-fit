export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/^['"]|['"]$/g, "").replace(/\/+$/, "");
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim().replace(/^['"]|['"]$/g, "");
  if (!url || !anonKey) throw new Error("Supabase public environment variables are missing.");
  return { url, anonKey };
}
