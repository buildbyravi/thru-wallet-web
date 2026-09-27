export const chromeStoreUrl =
  "https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok";

export const extensionId = "ocahgpmgfeapjnceaknkikanjikhjgok";

export const site = {
  name: "Thru Wallet",
  shortName: "Thru",
  tagline: "Alphanet",
  descriptor: "An experimental, self-custody browser extension for Thru's native Layer 1 alphanet.",
  summary:
    "Thru Wallet is an unofficial, high-performance browser extension for personal key management and basic account operations against the Thru alphanet — built on the real @thru/sdk and @thru/programs packages.",
  status: "ALPHA" as const,
  warning:
    "Not production-ready and not security-reviewed. Use alphanet or devnet funds only. This is community software, not affiliated with or endorsed by Unto Labs. Do not use it with real financial value.",
  repos: {
    extension: "https://github.com/buildbyravi/thru-wallet-ext",
    website: "https://github.com/buildbyravi/thru-wallet-web",
  },
  links: {
    chromeStore: chromeStoreUrl,
    privacy: "https://github.com/buildbyravi/thru-wallet-ext/blob/main/PRIVACY.md",
    explorer: "https://scan.thru.org",
    thruDocs: "https://thru.org/docs",
    thruLlmTxt: "https://thru.org/docs/llm.txt",
    explorerMcp: "https://scan.thru.org/api/mcp",
    embeddedWallet: "https://thru.org/docs/wallet/embedded-wallet-integration/",
    statusDoc:
      "https://github.com/buildbyravi/thru-wallet-ext/blob/main/docs/STATUS_AND_ROADMAP.md",
    smokeDoc:
      "https://github.com/buildbyravi/thru-wallet-ext/blob/main/docs/MANUAL_SMOKE_CHECKLIST.md",
  },
  listing: {
    version: "1.2.0",
    updated: "2026-09-23",
    offeredBy: "PWNX0",
    size: "209 KiB",
    languages: "English",
    blurb: "High-performance self-custody wallet and key manager for Thru.",
  },
  contract: {
    version: "v12",
    methods: 81,
    popupWidthPx: 400,
    domSinks: 0,
    sdk: "@thru/sdk@0.3.16",
    programs: "@thru/programs@0.3.16",
    kdf: "PBKDF2-SHA256 · 600,000",
    cipher: "AES-256-GCM",
    unit: "1 THRU = 1,000,000,000 base units",
    auditedCommit: "4aa55ba",
    auditedOn: "2026-09-26",
  },
  network: "Alphanet / devnet only",
  nav: [
    { href: "/", label: "Overview" },
    { href: "/install", label: "Install" },
    { href: "/features", label: "Features" },
    { href: "/architecture", label: "Architecture" },
    { href: "/security", label: "Security" },
    { href: "/status", label: "Status" },
    { href: "/changelog", label: "Changelog" },
    { href: "/docs", label: "Docs" },
    { href: "/agents", label: "Agents" },
  ],
} as const;

export const heroMetrics = [
  { label: "Contract", value: "v12", note: "81 methods · append-only" },
  { label: "Routes", value: "14", note: "One popup stack, no fallback" },
  { label: "Vault", value: "600k", note: "PBKDF2 rounds, then AES-GCM" },
  { label: "DOM sinks", value: "0", note: "innerHTML ratchet closed" },
] as const;
