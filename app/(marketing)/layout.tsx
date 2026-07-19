import type { ReactNode } from "react";

import SiteFooter from "@/components/site/SiteFooter";

type MarketingLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  );
}