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
  baselineCommit: "cee006e",
  baselineDate: "2026-10-03",
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
    releasedPr: "https://github.com/buildbyravi/thru-wallet-ext/pull/16",
    release: "https://github.com/buildbyravi/thru-wallet-ext/releases/tag/v1.4.1",
    telegramChannel: "https://t.me/walletext",
    telegramGroup: "https://t.me/+dA8TwsOECcIxZWZl",
  },
  // Verified against the live Chrome Web Store page on 2026-10-03, after the v1.4.1 merge:
  // still the alphanet-era package, 1.2.0 / 2026-09-23 / 209 KiB. Neither a submission nor a
  // merge nor a GitHub release may write to this block — only a changed public page may.
  // See `storeStatus` for the package waiting in front of the store.
  listing: {
    version: "1.2.0",
    updated: "2026-09-23",
    offeredBy: "PWNX0",
    size: "209 KiB",
    languages: "English",
    blurb: "High-performance self-custody wallet and key manager for Thru.",
    network: "alphanet",
    verifiedOn: "2026-10-03",
    permissions: 4,
  },
  // The extension's `main` branch after PR #16 merged as `cee006e` on 2026-10-03.
  // These are the CODE facts, read from src/ at that commit. `auditedCommit`/`auditedOn`
  // deliberately still point at 4aa55ba: docs/STATUS_AND_ROADMAP.md has not been rewritten
  // and still opens with "Contract v12, 81 methods". Two artifacts, two fields — see
  // `auditedDoc` below, which the site renders as its own track rather than hiding.
  contract: {
    version: "v15",
    methods: 83,
    popupWidthPx: 400,
    domSinks: 0,
    sdk: "@thru/sdk@0.4.1",
    programs: "@thru/programs@0.4.1",
    kdf: "PBKDF2-SHA256 · 600,000",
    cipher: "AES-256-GCM",
    unit: "1 THRU = 1,000,000,000 base units",
    auditedCommit: "4aa55ba",
    auditedOn: "2026-09-26",
    network: "betanet",
    package: "1.4.1",
    commit: "cee006e",
    mergedOn: "2026-10-03",
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

// What the Chrome Web Store holds. `site.listing` is the live page and nothing else may
// write to it. This block is the submission pipeline in front of it: package 1.4.0 was
// submitted on 2026-10-03 and never published, and the released package is now 1.4.1,
// whose upload is still a human step (extension.md records it as pending).
export const storeStatus = {
  state: "upload-pending" as "upload-pending" | "in-review" | "published",
  stateLabel: "1.4.1 upload pending",
  sentenceLabel: "not yet uploaded to the store",
  version: "1.4.1",
  supersededSubmission: "1.4.0",
  permissions: 5,
  newPermission: "notifications",
  reportedOn: "2026-10-03",
  note:
    "Package 1.4.0 went to the reviewers and was never published; the release notes say so explicitly, which is why the version moved to 1.4.1 rather than reusing a number that is sitting in a queue. The listing copy, the five permission justifications, and the store tiles are all prepared in extension.md and store-assets/, waiting on the upload.",
} as const;

// The source release. PR #16 merged as `cee006e` and shipped as tag v1.4.1 on 2026-10-03.
// Released is not installed: this is what `npm run build` produces, not what Chrome serves.
export const release = {
  state: "released" as "open" | "merged" | "released" | "published",
  stateLabel: "Released v1.4.1",
  version: "1.4.1",
  tag: "v1.4.1",
  url: "https://github.com/buildbyravi/thru-wallet-ext/releases/tag/v1.4.1",
  publishedOn: "2026-10-03",
  mergeCommit: "cee006e",
  pr: 16,
  prUrl: "https://github.com/buildbyravi/thru-wallet-ext/pull/16",
  headline: "Design System v2, betanet + @thru 0.4.1, token drawer, send hardening",
  contract: "v15",
  methods: 83,
  sdk: "@thru/sdk@0.4.1",
  programs: "@thru/programs@0.4.1",
  network: "betanet",
  rpc: "https://rpc.betanet.thru.org",
  blockSeconds: 6,
  permissions: ["storage", "alarms", "sidePanel", "clipboardRead", "notifications"],
  routes: 14,
  tests: "20 suites · 1,641 assertions",
  checkedOn: "2026-10-03",
  note:
    "Read from the extension repository at cee006e on 2026-10-03: package 1.4.1, contract v15 with 83 declared methods, @thru packages at 0.4.1, and a CSP whose only connect-src is the betanet RPC. Versioned 1.4.1 because 1.4.0 never reached the store, so no published version is skipped.",
} as const;

// The project's own status document, which has not caught up with the merge. Kept as a
// visible track instead of a footnote: a reader who quotes it will be two contract versions
// behind the code it describes.
export const auditedDoc = {
  version: "v12",
  methods: 81,
  commit: "4aa55ba",
  date: "2026-09-26",
  state: "behind main",
  note:
    "docs/STATUS_AND_ROADMAP.md still opens with \"Contract v12, 81 methods\" and names 4aa55ba as the audited baseline. The code at main exports CONTRACT_VERSION 15 with 83 methods. Until the document is rewritten, this site quotes src/ for behavior and the document only for what the document says.",
} as const;

// Three clocks. Collapsing any two of them produces a false sentence about this project.
export const releaseTracks = [
  {
    key: "store",
    label: "Chrome Web Store",
    value: site.listing.version,
    pill: storeStatus.stateLabel,
    meta: `Updated ${site.listing.updated} · ${site.listing.size} · ${site.listing.offeredBy}`,
    detail:
      "What Chrome installs today: the alphanet build with four permissions and alphanet listing copy. 1.4.0 was submitted and never published; 1.4.1 is built and waiting to be uploaded.",
    href: chromeStoreUrl,
    hrefLabel: "Open the listing",
  },
  {
    key: "release",
    label: "Source release",
    value: release.tag,
    pill: `Merged ${release.mergeCommit} · contract ${release.contract}`,
    meta: `${release.methods} methods · @thru 0.4.1 · ${release.publishedOn}`,
    detail:
      "PR #16 merged into main and shipped as a tagged release: betanet, token drawer, custom tokens, desktop notifications, inactivity auto-lock. Build it yourself and you get this.",
    href: release.url,
    hrefLabel: `Release ${release.tag}`,
  },
  {
    key: "audited",
    label: "Audited status doc",
    value: auditedDoc.version,
    pill: auditedDoc.state,
    meta: `${auditedDoc.methods} methods · ${auditedDoc.date} · ${auditedDoc.commit}`,
    detail:
      "STATUS_AND_ROADMAP.md has not been rewritten since the merge, so the repository's own summary is three contract steps behind its code. Quote the source, not the summary.",
    href: site.links.statusDoc,
    hrefLabel: "STATUS_AND_ROADMAP.md",
  },
] as const;

export const heroMetrics = [
  { label: "Chrome installs", value: site.listing.version, note: "Store build · alphanet era" },
  { label: "Released", value: release.tag, note: `${release.mergeCommit} · ${release.publishedOn}` },
  { label: "Contract", value: release.contract, note: `${release.methods} methods · append-only` },
  { label: "Vault", value: "600k", note: "PBKDF2 rounds, then AES-GCM" },
] as const;
