// ---------------------------------------------------------------------------
// Single source of truth for site-wide facts (name, links, current version).
// Edit this file to update anything that appears in the header, footer,
// homepage hero, and the generated /llms.txt file.
// ---------------------------------------------------------------------------

export const site = {
  name: "Thru Wallet",
  shortName: "Thru Wallet",
  tagline: "Alphanet",
  descriptor:
    "An experimental, self-custody browser extension for Thru's native Layer 1 alphanet.",
  summary:
    "Thru Wallet is an unofficial, high-performance browser extension for personal key management and basic account operations against the Thru alphanet — built on the real @thru/sdk and @thru/crypto packages.",
  status: "ALPHA" as const,
  currentContractVersion: "v12",
  network: "Alphanet / devnet only",
  repos: {
    extension: "https://github.com/buildbyravi/thru-wallet-ext",
    website: "https://github.com/buildbyravi/thru-wallet-web",
  },
  links: {
    explorer: "https://scan.thru.org",
    thruDocs: "https://thru.org/docs",
    thruLlmTxt: "https://thru.org/docs/llm.txt",
    explorerMcp: "https://scan.thru.org/api/mcp",
  },
  nav: [
    { href: "/", label: "Overview" },
    { href: "/#features", label: "Features" },
    { href: "/docs", label: "Docs" },
    { href: "/changelog", label: "Changelog" },
  ],
} as const;

export type SiteConfig = typeof site;
