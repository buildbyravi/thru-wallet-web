import { chromeStoreUrl, site } from "@/content/site";

export function SoftwareJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Chrome",
    softwareVersion: site.listing.version,
    installUrl: chromeStoreUrl,
    downloadUrl: chromeStoreUrl,
    description: site.summary,
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "buildbyravi",
      url: site.repos.extension,
    },
    sameAs: [chromeStoreUrl, site.repos.extension, site.repos.website],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
