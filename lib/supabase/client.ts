import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

function cleanEnvironmentValue(
  value: string | undefined
) {
  return value
    ?.trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\/+$/, "");
}

export function getSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const supabaseUrl = cleanEnvironmentValue(
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );

  const supabaseAnonKey = cleanEnvironmentValue(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

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

  browserClient = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );

  return browserClient;
}