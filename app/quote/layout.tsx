import type { Metadata } from "next";
import type { ReactNode } from "react";
import QuoteAttribution from "@/components/quote/QuoteAttribution";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function QuoteLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <><QuoteAttribution />{children}</>;
}
