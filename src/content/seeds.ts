export const noteSeed = [
  {
    title: "Chrome Web Store is the public install path",
    body: "Packaged installs should use the listing: https://chromewebstore.google.com/detail/thru-wallet/ocahgpmgfeapjnceaknkikanjikhjgok — extension id ocahgpmgfeapjnceaknkikanjikhjgok, version 1.2.0, offered by PWNX0. Source installs remain for people who need to audit or rebuild dist/.",
    tag: "RELEASE",
    author: "dossier",
    createdAt: new Date("2026-09-23T16:00:00Z"),
  },
  {
    title: "Do not collapse the listing into contract v12",
    body: "The store package is dated 2026-09-23. The status baseline audited on 2026-09-26 describes contract v12 and 81 methods at commit 4aa55ba. Say which one you mean.",
    tag: "DOCS",
    author: "dossier",
    createdAt: new Date("2026-09-26T11:30:00Z"),
  },
  {
    title: "Auto-lock wording disagrees with the source",
    body: "The Chrome Web Store overview calls the 15-minute lock an inactivity lock. The extension repository describes a fixed-period alarm. The source wins until a build changes the behavior and the listing together.",
    tag: "SECURITY",
    author: "dossier",
    createdAt: new Date("2026-09-26T12:10:00Z"),
  },
  {
    title: "Betanet build is reviewed, not published",
    body: "PR #16 at 1338380 carries package 1.4.0: betanet RPC, @thru 0.4.0 managed program addresses, contract v15 with 83 methods, a token drawer, custom tokens verified on-chain, and desktop notifications. It is mergeable with CI green. Until it merges and a new package is submitted, Chrome still installs 1.2.0.",
    tag: "RELEASE",
    author: "dossier",
    createdAt: new Date("2026-10-02T18:40:00Z"),
  },
  {
    title: "Auto-lock: the source caught up with the listing",
    body: "The pending build stamps lastActivityAt on every API request and locks on measured idleness, and background sync no longer refreshes the clock. The 2026-09-26 note stays on the record: it described the shipped package, which still runs the fixed-period alarm.",
    tag: "SECURITY",
    author: "dossier",
    createdAt: new Date("2026-10-02T18:55:00Z"),
  },
  {
    title: "The extension's own status doc is behind its code",
    body: "docs/STATUS_AND_ROADMAP.md on the pending branch still opens with contract v12 and 81 methods at 4aa55ba, while src/shared/contract/manifest.js exports CONTRACT_VERSION 15 with 83 methods. This site quotes the code for pending facts and the status doc for the audited baseline, and labels which is which.",
    tag: "DOCS",
    author: "dossier",
    createdAt: new Date("2026-10-02T19:10:00Z"),
  },
] as const;
