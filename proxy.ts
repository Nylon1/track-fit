import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { safeAdminRedirect } from "@/lib/admin/redirect";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { url, anonKey } = getSupabaseConfig();
  const supabase = createServerClient(url, anonKey, { cookies: {
    getAll: () => request.cookies.getAll(),
    setAll: (items) => { items.forEach(({ name, value }) => request.cookies.set(name, value)); response = NextResponse.next({ request }); items.forEach(({ name, value, options }) => response.cookies.set(name, value, options)); },
  } });
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = user?.app_metadata?.trackfit_admin === true;
  if (request.nextUrl.pathname !== "/admin/login" && (!user || user.app_metadata?.trackfit_admin !== true)) {
    const destination = request.nextUrl.clone();
    destination.pathname = "/admin/login";
    destination.search = "";
    destination.searchParams.set("next", safeAdminRedirect(`${request.nextUrl.pathname}${request.nextUrl.search}`));
    logAuth(Boolean(user), isAdmin, destination.pathname + destination.search);
    return NextResponse.redirect(destination);
  }
  if (request.nextUrl.pathname === "/admin/login" && isAdmin) {
    const chosen = safeAdminRedirect(request.nextUrl.searchParams.get("next"));
    const destination = request.nextUrl.clone();
    destination.pathname = chosen.split("?")[0];
    destination.search = chosen.includes("?") ? `?${chosen.split("?").slice(1).join("?")}` : "";
    logAuth(true, true, destination.pathname + destination.search);
    return NextResponse.redirect(destination);
  }
  logAuth(Boolean(user), isAdmin, request.nextUrl.pathname);
  return response;
}

function logAuth(hasUser: boolean, isAdmin: boolean, destination: string) {
  if (process.env.NODE_ENV === "development") console.info("[TrackFit admin auth]", { hasUser, isAdmin, destination });
}

export const config = { matcher: ["/admin/:path*"] };
