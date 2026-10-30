import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/newsreader/wght.css";
import "@fontsource-variable/newsreader/wght-italic.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import { SiteJsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getRouteSeo } from "@/content/seo";
import { site } from "@/content/site";
import { absoluteUrl, googleSiteVerification, siteOrigin } from "@/lib/seo";
import "./globals.css";

const home = getRouteSeo("/");
// Set NEXT_PUBLIC_SITE_URL to the origin that actually serves this build. Canonical tags, the
// sitemap, robots.txt and every JSON-LD @id are derived from it, so a preview deployment must
// never inherit production's value.
const verificationToken = googleSiteVerification();
// Bing Webmaster Tools uses the same meta-tag idea; both are optional and both are public.
const bingVerificationToken = process.env.BING_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: home.title,
    template: `%s — ${site.name}`,
  },
  description: home.description,
  applicationName: site.name,
  authors: [{ name: "buildbyravi", url: site.repos.extension }],
  creator: "buildbyravi",
  publisher: "buildbyravi",
  category: "technology",
  keywords: [...home.keywords],
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
  alternates: {
    canonical: absoluteUrl("/"),
    types: { "text/plain": "/llms.txt" },
  },
  robots: {
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
  // Google Search Console → Settings → Ownership verification → HTML tag.
  // The token is public by design; it ships in the page source of every verified site.
  verification: {
    google: verificationToken,
    other: bingVerificationToken ? { "msvalidate.01": bingVerificationToken } : undefined,
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: home.title,
    description: home.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.descriptor }],
  },
  twitter: {
    card: "summary_large_image",
    title: home.title,
    description: home.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.descriptor }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f3f0e9",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteJsonLd />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <div className="paper-grain pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <div className="h-1 bg-accent" />
          <SiteHeader />
          <div id="content" className="flex-1">
            {children}
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
