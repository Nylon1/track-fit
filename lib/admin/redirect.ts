export function safeAdminRedirect(value: string | null | undefined) {
  if (!value || value.includes("\\") || value.startsWith("//")) return "/admin";
  try {
    const decoded = decodeURIComponent(value);
    if (decoded === "/admin/login" || decoded.startsWith("/admin/login?")) return "/admin";
    if (decoded === "/admin" || decoded.startsWith("/admin/")) return decoded;
  } catch {
    return "/admin";
  }
  return "/admin";
}
