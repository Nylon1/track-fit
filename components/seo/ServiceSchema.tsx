import JsonLd from "./JsonLd";

import {
  absoluteUrl,
  siteConfig,
} from "@/lib/seo/site-config";

type ServiceSchemaProps = {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
};

export default function ServiceSchema({
  name,
  description,
  path,
  serviceType = "Curtain track installation",
}: ServiceSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",

        "@id": `${absoluteUrl(path)}#service`,

        name,
        description,
        serviceType,
        url: absoluteUrl(path),

        areaServed: {
          "@type": "Country",
          name: siteConfig.serviceArea,
        },

        provider: {
          "@id": absoluteUrl("/#business"),
        },
      }}
    />
  );
}