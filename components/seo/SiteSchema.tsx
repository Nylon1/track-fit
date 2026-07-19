import JsonLd from "./JsonLd";

import {
  absoluteUrl,
  siteConfig,
} from "@/lib/seo/site-config";

export default function SiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",

        "@graph": [
          {
            "@type": "Organization",
            "@id": absoluteUrl("/#organization"),

            name: siteConfig.name,
            legalName: siteConfig.legalName,
            url: siteConfig.url,

            logo: {
              "@type": "ImageObject",
              url: absoluteUrl(siteConfig.logo),
            },

            description: siteConfig.description,
            slogan: siteConfig.tagline,
          },

          {
            "@type": "WebSite",
            "@id": absoluteUrl("/#website"),

            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            inLanguage: siteConfig.language,

            publisher: {
              "@id": absoluteUrl("/#organization"),
            },
          },

          {
            "@type": "ProfessionalService",
            "@id": absoluteUrl("/#business"),

            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,

            logo: absoluteUrl(siteConfig.logo),

            areaServed: {
              "@type": "Country",
              name: siteConfig.serviceArea,
            },

            parentOrganization: {
              "@id": absoluteUrl("/#organization"),
            },
          },
        ],
      }}
    />
  );
}