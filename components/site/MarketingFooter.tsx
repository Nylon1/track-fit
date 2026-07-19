"use client";

import { usePathname } from "next/navigation";

import SiteFooter from "@/components/site/SiteFooter";

export default function MarketingFooter() {
  const pathname = usePathname();

  if (
    pathname === "/quote" ||
    pathname.startsWith("/quote/")
  ) {
    return null;
  }

  return <SiteFooter />;
}