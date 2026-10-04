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
  // Verified against the live Chrome Web Store page on 2026-10-04: the listing finally moved.
  // 1.4.1, 272 KiB, betanet description, five screenshots, and a linked developer website.
  // The "Offered by PWNX0" row is gone from the page, so this site stopped claiming it.
  // Only a changed public page may write to this block — that is what happened here.
  listing: {
    version: "1.4.1",
    updated: "2026-10-04",
    previousVersion: "1.2.0",
    previousUpdated: "2026-09-23",
    developerSite: "https://thruwallet.vercel.app/",
    size: "272 KiB",
    languages: "English",
    blurb: "High-performance self-custody wallet and key manager for Thru.",
    network: "betanet",
    verifiedOn: "2026-10-04",
    permissions: 5,
    screenshots: 5,
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

// The store caught up. Package 1.4.1 was published on 2026-10-04 — the same build as the
// source release, the same contract, the same network. This block exists to record that the
// publication is a distinct event with its own date, and to hold the one thing publication
// does not prove: that anybody ran the package through a browser checklist.
export const storeStatus = {
  state: "published" as "upload-pending" | "in-review" | "published",
  stateLabel: "Published 2026-10-04",
  sentenceLabel: "live on the Chrome Web Store",
  version: "1.4.1",
  supersededSubmission: "1.4.0",
  publishedOn: "2026-10-04",
  submittedOn: "2026-10-03",
  daysBehindSource: 1,
  verifiedOn: "2026-10-04",
  note:
    "Submitted as 1.4.0 on 2026-10-03, never published under that number, re-cut as 1.4.1 after the merge, and approved on 2026-10-04. The live page now carries the betanet description, five screenshots, the token drawer and notification lines, and a linked developer website. Chrome and the source tree describe the same build for the first time since this site started tracking them.",
} as const;

// The source release. PR #16 merged as `cee006e` and shipped as tag v1.4.1 on 2026-10-03.
export const release = {
  state: "published" as "open" | "merged" | "released" | "published",
  stateLabel: "In the store since 2026-10-04",
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
  checkedOn: "2026-10-04",
  note:
    "Read from the extension repository at cee006e: package 1.4.1, contract v15 with 83 declared methods, @thru packages at 0.4.1, and a CSP whose only connect-src is the betanet RPC. Merged 2026-10-03, tagged the same minute, published to the store the next day.",
} as const;

// The one clock still wrong. `docs/STATUS_AND_ROADMAP.md` was not touched by the merge or the
// release, so the repository's own summary now describes neither the store build nor its own
// source tree. Re-read on 2026-10-04: unchanged.
export const auditedDoc = {
  version: "v12",
  methods: 81,
  commit: "4aa55ba",
  date: "2026-09-26",
  state: "behind both",
  checkedOn: "2026-10-04",
  note:
    "docs/STATUS_AND_ROADMAP.md still opens with \"Contract v12, 81 methods\" and names 4aa55ba as the audited baseline. The code beside it exports CONTRACT_VERSION 15 with 83 methods, and the package in the store is built from that code. Until the document is rewritten, this site quotes src/ for behavior and the document only for what the document says.",
} as const;

// What nobody has done yet. The published package has no recorded browser verification:
// docs/MANUAL_SMOKE_CHECKLIST.md has 36 rows that expand to 95 individual checkbox cells
// (most rows are checked twice, popup and side panel, narrow and wide) and none are ticked.
// Both counts are the same file; quote the unit you mean.
export const unverified = {
  rows: 36,
  cells: 95,
  checked: 0,
  doc: "docs/MANUAL_SMOKE_CHECKLIST.md",
  checkedOn: "2026-10-04",
  note:
    "Shipping is not verifying. The betanet build went from merge to store in a day on the strength of 20 automated suites, and no manual run through a real Chrome profile is recorded in the repository. The rows most worth a human are the ones newest to the package: duplicate detection while a transfer is still pending, desktop notification delivery, side-panel and popup mutual exclusion, and the dark-mode action grid, drawer ledger, and connection footer.",
} as const;

// The next contract, already written and not yet merged. Two stacked pull requests in the
// extension repository carry it: #18 is branched from #17, so they land together or not at
// all. Read from the PR heads on 2026-10-04 — contract v16 with 81 methods, down from 83,
// because it retires two mutation endpoints.
export const incoming = {
  state: "open" as "open" | "merged",
  contract: "v16",
  methods: 81,
  methodDelta: -2,
  removes: ["tx.send", "token.transfer"],
  sourceFiles: 19,
  suites: 21,
  packageVersion: "1.4.1",
  checkedOn: "2026-10-04",
  prs: [
    {
      number: 17,
      title: "docs: establish mainnet-ready engineering directive",
      head: "7883219",
      base: "main",
      files: 40,
      commits: 8,
      url: "https://github.com/buildbyravi/thru-wallet-ext/pull/17",
    },
    {
      number: 18,
      title: "audit: 2026-10-04 production-rules conformance audit + targeted remediation",
      head: "97276a7",
      base: "#17",
      files: 29,
      commits: 16,
      url: "https://github.com/buildbyravi/thru-wallet-ext/pull/18",
    },
  ],
  note:
    "v16 removes tx.send and token.transfer, the unbound mutation paths left over after every shipped caller moved to the checked methods that bind account and network at the background boundary. The chain also rewrites docs/STATUS_AND_ROADMAP.md to describe v16 with 81 methods, which is the fix for the third clock on this page.",
  consequence:
    "Merging it closes the documentation gap and opens a different one. main would describe contract v16 while the package in the Chrome Web Store is contract v15 — and the chain does not bump the package number, so both would be called 1.4.1. A build from main after the merge would answer to the same version string as the store build while speaking a different contract. The fix is a version bump in the same change that merges the chain.",
} as const;

// Three clocks. Two of them finally agree; the third is the repository's own documentation.
export const releaseTracks = [
  {
    key: "store",
    label: "Chrome Web Store",
    value: site.listing.version,
    pill: storeStatus.stateLabel,
    meta: `Updated ${site.listing.updated} · ${site.listing.size} · ${site.listing.permissions} permissions`,
    detail:
      "What Chrome installs today: the betanet build, with listing copy that finally describes it — token drawer, verified custom tokens, desktop notifications, Ctrl+L. It replaced 1.2.0, which had been the only installable version since 2026-09-23.",
    href: chromeStoreUrl,
    hrefLabel: "Open the listing",
  },
  {
    key: "release",
    label: "Source release",
    value: release.tag,
    pill: `Merged ${release.mergeCommit} · contract ${release.contract}`,
    meta: `${release.methods} methods · @thru 0.4.1 · released ${release.publishedOn}`,
    detail:
      "The same build, one day earlier. Clone main at cee006e, run the suite, build dist/, and you get what the store is serving — which is the first time that sentence has been true here.",
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
      "STATUS_AND_ROADMAP.md was not rewritten for the merge or the release, so the repository's own summary describes neither the store build nor the code beside it. A rewrite exists on the open #17 to #18 chain and has not merged.",
    href: site.links.statusDoc,
    hrefLabel: "STATUS_AND_ROADMAP.md",
  },
] as const;

export const heroMetrics = [
  { label: "Chrome installs", value: site.listing.version, note: `Betanet build · ${site.listing.updated}` },
  { label: "Contract", value: release.contract, note: `${release.methods} methods · append-only` },
  { label: "Smoke rows run", value: `${unverified.checked} of ${unverified.rows}`, note: `${unverified.cells} checks, none ticked` },
  { label: "Vault", value: "600k", note: "PBKDF2 rounds, then AES-GCM" },
] as const;
