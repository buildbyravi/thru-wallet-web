import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/newsreader/wght.css";
import "@fontsource-variable/newsreader/wght-italic.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { chromeStoreUrl, site } from "@/content/site";
import "./globals.css";

// Verified 2026-10-04: thruwallet.vercel.app serves this site and is the developer website
// linked from the Chrome Web Store listing. Override per-environment with NEXT_PUBLIC_SITE_URL.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://thruwallet.vercel.app"),
  title: {
    default: "Thru Wallet — Betanet extension",
    template: "%s — Thru Wallet",
  },
  description: `${site.summary} Add it from the Chrome Web Store: ${chromeStoreUrl}`,
  applicationName: site.name,
  authors: [{ name: "buildbyravi", url: site.repos.extension }],
  keywords: ["Thru Wallet", "Thru", "betanet", "Chrome extension", "self-custody"],
  openGraph: {
    title: "Thru Wallet — Betanet extension",
    description: site.descriptor,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
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
