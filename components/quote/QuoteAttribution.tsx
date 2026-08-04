"use client";
import { useEffect } from "react";

export default function QuoteAttribution() {
  useEffect(() => {
    if (!sessionStorage.getItem("trackfit-landing-page")) sessionStorage.setItem("trackfit-landing-page", window.location.href);
    const params = new URLSearchParams(window.location.search);
    for (const name of ["utm_source", "utm_medium", "utm_campaign"]) {
      const value = params.get(name);
      if (value) sessionStorage.setItem(`trackfit-${name.replace("_", "-")}`, value);
    }
  }, []);
  return null;
}
