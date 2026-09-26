// ---------------------------------------------------------------------------
// Product changelog. Newest entry goes first.
//
// To add an update: copy the block below, fill it in, and paste it as the
// first item in `changelog`. Nothing else needs to change — the changelog
// page, the homepage "Latest updates" panel, and /llms-full.txt all read
// straight from this array.
//
//   {
//     version: "vNN",
//     date: "YYYY-MM-DD",
//     tag: "ALPHA",
//     title: "Short summary of the release",
//     changes: [
//       "One bullet per notable change, written as a full sentence.",
//     ],
//   },
// ---------------------------------------------------------------------------

export type ChangelogTag = "ALPHA" | "SECURITY" | "DOCS" | "DESIGN";

export interface ChangelogEntry {
  version: string;
  date: string;
  tag: ChangelogTag;
  title: string;
  changes: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "v12",
    date: "2026-09-22",
    tag: "DOCS",
    title: "Docs realigned with the shipped v12 / 81-method baseline",
    changes: [
      "Aligned the maintained docs set with the source-backed contract v12 / 81-method baseline.",
      "Documented owned-account registration and Send JIT, recipient review labels, and flat cache-first history with block-time provenance.",
      "Documented network-scoped caches, side-panel mutual exclusion, and deterministic test hardening.",
      "Added official Thru and cross-reference links, and clearly labeled unshipped proposals as proposals.",
    ],
  },
  {
    version: "v11",
    date: "2026-09-21",
    tag: "ALPHA",
    title: "Send path hardened end to end, popup/side panel made mutually exclusive",
    changes: [
      "Registered the side-panel listener before async boot and used a URL marker instead of viewport size to keep popup and side panel from ever running together.",
      "Rebuilt Send so first paint no longer blocks on balance, fee, tokens, contacts, and picker lists loading independently.",
      "Audited and hardened the full send path from UI bridge through the MV3 listener, API router, and native/token/network/balance/pending services down to the SDK.",
      "Stopped Dashboard, Accounts, and the HD preview from ever presenting a never-fetched offline balance as a verified zero.",
    ],
  },
  {
    version: "v10",
    date: "2026-09-20",
    tag: "DESIGN",
    title: "Design exploration reverted, groundwork kept",
    changes: [
      "Explored a token-system, de-bordering, and typography pass (\u201cR1 + R2\u201d) across the dashboard and balance hero.",
      "Reverted the visual direction after judging it worse in a loaded build, restoring the tree to the prior baseline with the history kept for reference.",
      "Kept the accessibility finding that white-on-accent contrast needed a fix, independent of the reverted direction.",
    ],
  },
  {
    version: "v9",
    date: "2026-09-21",
    tag: "ALPHA",
    title: "Explorer enrichment spike: alphanet oracle confirmed live",
    changes: [
      "Confirmed the Oracle program is live on alphanet and that price reads are CSP-clean on the one RPC origin the manifest already pins.",
      "Verified @thru/programs' oracle exports (program address, feed/event parsers, deriveOracleFeedAddress) work fully offline.",
      "Recorded that indexer/replay tooling is backend-tier and does not belong inside the extension.",
      "Shipped no runtime code from the spike \u2014 findings only, contract stayed at v10.",
    ],
  },
  {
    version: "v7",
    date: "2026-09-18",
    tag: "SECURITY",
    title: "Legacy custom networks quarantined at the background boundary",
    changes: [
      "network-service.setActiveNetwork() now accepts enabled built-in networks only.",
      "A saved custom network ID is rejected with a stable, non-retryable CUSTOM_NETWORK_DISABLED error.",
      "A stored custom, disabled, or unknown active network self-heals to Alphanet before configureNetwork() runs, including on a fresh worker boot.",
      "Legacy custom rows stay listable and removable, rendered as inert, accessible markup with Remove as their only action.",
    ],
  },
  {
    version: "v6",
    date: "2026-09-18",
    tag: "ALPHA",
    title: "Legacy launchpad quarantined, all 14 routes proven to mount",
    changes: [
      "Removed the legacy launchpad/DEX/prediction surface; no launchpad page ships in the built extension.",
      "Added route-lifecycle coverage driving all 14 popup routes through the real router, guards, and bridge across no-vault, locked, and unlocked states.",
      "Added a focus trap for password dialogs and a manual smoke-test runbook for what only a browser can prove.",
    ],
  },
];
