export type ChangeTag = "RELEASE" | "FIX" | "DOCS" | "SECURITY";

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  tag: ChangeTag;
  summary: string;
  changes: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "site",
    date: "2026-09-26",
    title: "Dossier site, with the store as the install path",
    tag: "RELEASE",
    summary:
      "This website now leads with the Chrome Web Store listing and keeps source install, docs, and the v12 status baseline in the same dossier.",
    changes: [
      "Chrome Web Store link on the header, homepage, install page, footer, llms.txt, and catalog API.",
      "Listing facts recorded beside the source baseline so the two versions are not collapsed into one.",
      "Docs hub, architecture flow, security principles, agent policy, and a Postgres-backed desk ledger.",
    ],
  },
  {
    version: "v12",
    date: "2026-09-26",
    title: "Status baseline: contract v12, 81 methods",
    tag: "DOCS",
    summary:
      "The extension status document, audited at commit 4aa55ba, is the source baseline this site describes. It is newer than the packaged listing.",
    changes: [
      "tx.registerAccount for an exact vault-owned address, unlocked-only, no value transfer.",
      "tx.getCachedHistory for cache-first History paint, scoped by network and address.",
      "Send review waits for just-in-time activation and shows the matched recipient label as display-only.",
      "Signing password re-auth remains opt-in. The default is session signing while unlocked.",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-09-23",
    title: "Chrome Web Store listing",
    tag: "RELEASE",
    summary:
      "Thru Wallet is listed as an experimental self-custody wallet for Thru alphanet. Version 1.2.0, 209 KiB, offered by PWNX0.",
    changes: [
      "Store id ocahgpmgfeapjnceaknkikanjikhjgok.",
      "Disclosed privacy posture: data is not collected. Policy lives in the extension repository.",
      "Listing copy mentions a 15-minute lock. The source describes that timer as a fixed-period alarm, not inactivity detection.",
      "The listing is explicit: not affiliated with Unto Labs, and not for real financial value.",
    ],
  },
  {
    version: "v8",
    date: "2026-09-18",
    title: "Token transfer shipped in code",
    tag: "SECURITY",
    summary:
      "Token methods sit on official @thru/programs/token bindings. Live fee and recipient-owner questions stayed open on purpose.",
    changes: [
      "token.transfer uses signing auth and mint units, never THRU units.",
      "A missing recipient token account can be initialized by the sender first.",
      "Failed balance reads stay unknown. They are not rendered as zero.",
    ],
  },
  {
    version: "v7",
    date: "2026-09-18",
    title: "Custom networks quarantined",
    tag: "SECURITY",
    summary:
      "Settings no longer offers Add custom network. The background also refuses activation, including direct API calls and stale storage.",
    changes: [
      "network.setActive accepts enabled built-ins only.",
      "A custom id returns CUSTOM_NETWORK_DISABLED.",
      "Legacy rows remain visible so they can be removed.",
    ],
  },
  {
    version: "v6",
    date: "2026-09-18",
    title: "Reset and auto-lock hardened",
    tag: "SECURITY",
    summary: "Destructive and security-timer changes are enforced in the background, not only by the form that triggered them.",
    changes: [
      "Reset requires confirmation and an unlocked-wallet password check.",
      "Auto-lock changes are password-gated.",
      "Generic settings writes reject security-sensitive keys.",
    ],
  },
];
