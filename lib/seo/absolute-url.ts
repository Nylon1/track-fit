const fallbackSiteUrl = "https://curtaintrackfitters.com";

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    fallbackSiteUrl
  ).replace(/\/$/, "");
}

export function absoluteUrl(path: string) {
  const siteUrl = getSiteUrl();
  return path.startsWith("http")
    ? path
    : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
