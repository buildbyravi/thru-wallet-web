export const chromeStoreUrl =
  "https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok";

export const extensionId = "ocahgpmgfeapjnceaknkikanjikhjgok";

export const site = {
  name: "Thru Wallet",
  shortName: "Thru",
  tagline: "Betanet",
  descriptor: "An experimental, self-custody browser extension for Thru's native Layer 1 betanet.",
  summary:
    "Thru Wallet is an unofficial, high-performance browser extension for personal key management and basic account operations against the Thru betanet — built on the real @thru/sdk and @thru/programs packages.",
  disclaimer:
    "Community-built, open-source software for the Thru betanet testnet. Not affiliated with or endorsed by Unto Labs. Not audited. Do not use with real financial value.",
  baselineCommit: "4aa55ba",
  baselineDate: "2026-09-26",
  routesCount: 14,
  status: "ALPHA" as const,
  warning:
    "Not production-ready and not security-reviewed. Use betanet testnet funds only. This is community software, not affiliated with or endorsed by Unto Labs. Do not use it with real financial value.",
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
    license: "https://github.com/buildbyravi/thru-wallet-ext/blob/main/LICENSE",
    pendingPr: "https://github.com/buildbyravi/thru-wallet-ext/pull/16",
    telegramChannel: "https://t.me/walletext",
    telegramGroup: "https://t.me/+dA8TwsOECcIxZWZl",
  },
  // Verified against the live Chrome Web Store page on 2026-10-02. The packaged listing is
  // still the alphanet-era build; do not copy pending-release numbers into this block.
  listing: {
    version: "1.2.0",
    updated: "2026-09-23",
    offeredBy: "PWNX0",
    size: "209 KiB",
    languages: "English",
    blurb: "High-performance self-custody wallet and key manager for Thru.",
    network: "alphanet",
    verifiedOn: "2026-10-02",
    permissions: 4,
  },
  // The audited source baseline on the extension's `main` branch.
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
    network: "alphanet",
  },
  network: "Betanet testnet only",
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

// The 1.4.0 release train. It exists as reviewed, CI-green source on an open pull request.
// It is NOT merged to the extension's main branch and it is NOT what Chrome installs today.
// Flip `state` to "shipped" only when the PR lands; move the numbers into `site.contract`
// only once the audited status document moves with them.
export const pendingRelease = {
  state: "pending" as "pending" | "merged" | "shipped",
  version: "1.4.0",
  headline: "Betanet migration, token drawer, desktop notifications",
  pr: 16,
  prUrl: "https://github.com/buildbyravi/thru-wallet-ext/pull/16",
  branch: "arena/01a0dce0-thru-wallet-ext",
  headCommit: "1338380",
  contract: "v15",
  methods: 83,
  sdk: "@thru/sdk@0.4.0",
  programs: "@thru/programs@0.4.0",
  network: "betanet",
  rpc: "https://rpc.betanet.thru.org",
  blockSeconds: 6,
  permissions: ["storage", "alarms", "sidePanel", "clipboardRead", "notifications"],
  routes: 14,
  ci: "build-and-test green",
  checkedOn: "2026-10-02",
  note:
    "Read from the extension repository at 1338380 on 2026-10-02: package 1.4.0, contract v15 with 83 declared methods, @thru packages pinned to 0.4.0, and a CSP whose only connect-src is the betanet RPC.",
} as const;

// Three clocks. Collapsing any two of them produces a false sentence about this project.
export const releaseTracks = [
  {
    key: "store",
    label: "Chrome Web Store",
    value: site.listing.version,
    meta: `Updated ${site.listing.updated} · ${site.listing.size} · ${site.listing.offeredBy}`,
    detail:
      "What Chrome installs today. Still the alphanet build and the alphanet listing copy — four permissions, no notifications.",
    href: chromeStoreUrl,
    hrefLabel: "Open the listing",
  },
  {
    key: "source",
    label: "Source baseline (main)",
    value: site.contract.version,
    meta: `${site.contract.methods} methods · ${site.contract.auditedOn} · ${site.contract.auditedCommit}`,
    detail:
      "The audited status document on the extension's main branch. Packages pinned to 0.3.16, alphanet program addresses.",
    href: site.links.statusDoc,
    hrefLabel: "STATUS_AND_ROADMAP.md",
  },
  {
    key: "pending",
    label: "Pending release",
    value: pendingRelease.version,
    meta: `Contract ${pendingRelease.contract} · ${pendingRelease.methods} methods · PR #${pendingRelease.pr}`,
    detail:
      "Betanet, @thru 0.4.0, token drawer, custom tokens, desktop notifications. Reviewed and CI-green, not merged, not published.",
    href: pendingRelease.prUrl,
    hrefLabel: `PR #${pendingRelease.pr} · ${pendingRelease.headCommit}`,
  },
] as const;

export const heroMetrics = [
  { label: "Chrome installs", value: site.listing.version, note: "Store build · alphanet era" },
  { label: "Pending", value: pendingRelease.version, note: `Betanet · contract ${pendingRelease.contract}` },
  { label: "Routes", value: "14", note: "One popup stack, no fallback" },
  { label: "Vault", value: "600k", note: "PBKDF2 rounds, then AES-GCM" },
] as const;
