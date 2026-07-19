"use client";

import { usePathname } from "next/navigation";

import SiteFooter from "@/components/site/SiteFooter";

const hiddenFooterRoutes = [
  "/",
  "/welcome",
  "/quote",
];

export default function MarketingFooter() {
  const pathname = usePathname();

  const shouldHideFooter =
    hiddenFooterRoutes.includes(pathname) ||
    pathname.startsWith("/quote/") ||
    pathname.startsWith("/welcome/");

  if (shouldHideFooter) {
    return null;
  }

  return <SiteFooter />;
}