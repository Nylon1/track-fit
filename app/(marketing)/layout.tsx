import type { ReactNode } from "react";

import MarketingFooter from "@/components/site/MarketingFooter";
import MarketingMotion from "@/components/site/MarketingMotion";

type MarketingLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      <MarketingMotion />
      <div id="trackfit-marketing-surface" className="tf-marketing-surface">
        {children}
      </div>
      <MarketingFooter />
    </>
  );
}
