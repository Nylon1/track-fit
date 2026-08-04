import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const { url: supabaseUrl, anonKey: supabaseAnonKey } = getSupabaseConfig();

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing."
    );
  }

  try {
    const parsedUrl = new URL(supabaseUrl);

    if (
      parsedUrl.protocol !== "https:" ||
      !parsedUrl.hostname.endsWith(
        ".supabase.co"
      )
    ) {
      throw new Error();
    }
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL must look like https://your-project-ref.supabase.co"
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing."
    );
  }

  browserClient = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    }
  );

  return browserClient;
}
