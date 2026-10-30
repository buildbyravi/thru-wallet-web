import type { Metadata } from "next";
import { getRouteSeo, googleVerificationToken, lastReviewed, organization, type RouteSeo } from "@/content/seo";
import { chromeStoreUrl, site } from "@/content/site";

// The site has one origin. Everything search engines read — canonical tags, Open Graph URLs, the
// sitemap, robots.txt, and the JSON-LD @ids — is derived from it here so a preview deployment
// never claims to be the production site.
export const FALLBACK_ORIGIN = "https://thruwallet.vercel.app";

function readConfiguredOrigin(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw.includes("://") ? raw : `https://${raw}`).origin;
  } catch {
    console.warn(`NEXT_PUBLIC_SITE_URL is not a valid URL: ${raw}`);
    return null;
  }
}

export function siteOrigin(): string {
  return readConfiguredOrigin() ?? FALLBACK_ORIGIN;
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteOrigin()).toString();
}

/**
 * The Google Search Console verification token. `GOOGLE_SITE_VERIFICATION` wins so a re-created
 * property or a new origin can be verified by changing an environment variable, and the committed
 * token in `src/content/seo.ts` is the default so the meta tag is present on a deploy that sets
 * nothing at all. Both are public — Search Console reads them from the page source.
 */
export function googleSiteVerification(): string {
  const fromEnv = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : googleVerificationToken;
}

/**
 * The token embedded in the HTML-file method's filename: `/google<token>.html`.
 *
 * Search Console normally issues one token per property and reuses it across the DNS, file and
 * meta-tag methods, so this defaults to the meta-tag token above. `GOOGLE_SITE_VERIFICATION_FILE`
 * exists because that is a convention, not a guarantee: if a property ever hands out a different
 * string for the file, this variable covers it without disturbing the working meta tag.
 */
export function googleVerificationFileToken(): string {
  const fromEnv = process.env.GOOGLE_SITE_VERIFICATION_FILE?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : googleSiteVerification();
}

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630 } as const;

function ogImageEntry(alt: string) {
  return [{ ...OG_IMAGE, alt }];
}

/**
 * Per-page metadata. One call gives a page its canonical URL, its Open Graph card, its Twitter
 * card, its robots directives, and its keywords — from the registry in `src/content/seo.ts`.
 */
export function pageMetadata(path: string, overrides: Partial<RouteSeo> = {}): Metadata {
  const entry: RouteSeo = { ...getRouteSeo(path), ...overrides };
  const ogTitle = entry.absolute ? entry.title : `${entry.title} — ${site.name}`;
  const url = absoluteUrl(entry.path);

  return {
    title: entry.absolute ? { absolute: entry.title } : entry.title,
    description: entry.description,
    keywords: entry.keywords.length > 0 ? [...entry.keywords] : undefined,
    alternates: { canonical: url },
    robots: entry.noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url,
      title: ogTitle,
      description: entry.description,
      images: ogImageEntry(site.descriptor),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: entry.description,
      images: ogImageEntry(site.descriptor),
    },
  };
}

// ---------------------------------------------------------------------------------------------
// JSON-LD
// ---------------------------------------------------------------------------------------------

type JsonLdNode = Record<string, unknown>;

export function graph(nodes: JsonLdNode[]): JsonLdNode {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export const nodeIds = {
  organization: () => `${siteOrigin()}/#organization`,
  website: () => `${siteOrigin()}/#website`,
  software: () => `${siteOrigin()}/#software`,
};

export function organizationNode(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": nodeIds.organization(),
    name: organization.name,
    url: organization.repo,
    description: `${organization.role} maintaining the unofficial Thru Wallet browser extension.`,
    sameAs: [...organization.sameAs],
  };
}

export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": nodeIds.website(),
    url: absoluteUrl("/"),
    name: site.name,
    alternateName: "Thru Wallet betanet dossier",
    description: site.descriptor,
    inLanguage: "en",
    publisher: { "@id": nodeIds.organization() },
    isAccessibleForFree: true,
  };
}

export function softwareNode(featureList: string[] = []): JsonLdNode {
  return {
    "@type": "SoftwareApplication",
    "@id": nodeIds.software(),
    name: site.name,
    alternateName: ["Thru Wallet extension", "Thru betanet wallet"],
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Cryptocurrency wallet",
    operatingSystem: "Chrome",
    softwareVersion: site.listing.version,
    softwareRequirements: "Chromium-based browser with extension support",
    url: absoluteUrl("/install"),
    installUrl: chromeStoreUrl,
    downloadUrl: chromeStoreUrl,
    description: site.summary,
    image: absoluteUrl("/opengraph-image"),
    isAccessibleForFree: true,
    inLanguage: "en",
    dateModified: lastReviewed,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    license: site.links.license,
    author: { "@id": nodeIds.organization() },
    publisher: { "@id": nodeIds.organization() },
    isPartOf: { "@id": nodeIds.website() },
    sameAs: [chromeStoreUrl, site.repos.extension, site.repos.website],
    ...(featureList.length > 0 ? { featureList } : {}),
  };
}

export function breadcrumbNode(items: Array<{ name: string; path: string }>): JsonLdNode {
  const last = items[items.length - 1];
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(last?.path ?? "/")}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleNode(input: {
  headline: string;
  description: string;
  path: string;
  /** Only pass dates the content actually carries. An invented date is a false claim. */
  datePublished?: string;
  dateModified?: string;
}): JsonLdNode {
  return {
    "@type": "TechArticle",
    "@id": `${absoluteUrl(input.path)}#article`,
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: { "@id": `${absoluteUrl(input.path)}#webpage` },
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ?? input.datePublished
      ? { dateModified: input.dateModified ?? input.datePublished }
      : {}),
    inLanguage: "en",
    isAccessibleForFree: true,
    author: { "@id": nodeIds.organization() },
    publisher: { "@id": nodeIds.organization() },
    isPartOf: { "@id": nodeIds.website() },
  };
}

export function collectionNode(input: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string }>;
}): JsonLdNode {
  return {
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(input.path)}#collection`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: "en",
    isPartOf: { "@id": nodeIds.website() },
    hasPart: input.items.map((item) => ({
      "@type": "TechArticle",
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}
