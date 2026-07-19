import { createClient } from "@supabase/supabase-js";

const rawSupabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl = rawSupabaseUrl
  ?.trim()
  .replace(/^["']|["']$/g, "")
  .replace(/\/$/, "");

if (!supabaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL is missing."
  );
}

if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(
  supabaseUrl
)) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL is invalid."
  );
}

if (!supabaseAnonKey?.trim()) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing."
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey.trim(),
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);