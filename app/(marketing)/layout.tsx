import type { ReactNode } from "react";

import MarketingFooter from "@/components/site/MarketingFooter";

type MarketingLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      {children}
      <MarketingFooter />
    </>
  );
}