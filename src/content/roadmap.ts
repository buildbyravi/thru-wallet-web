export type RoadmapStatus = "open" | "blocked" | "done";

export interface RoadmapItem {
  step: string;
  title: string;
  status: RoadmapStatus;
  detail: string;
}

export const roadmap: RoadmapItem[] = [
  {
    step: "01",
    title: "Publish the source the store has not seen",
    status: "open",
    detail:
      "The 1.4.1 package went live on 2026-10-04 and nothing has been submitted since. Main is now 13 contract versions ahead: 20 new wallet-core methods, a 43-method gated DeFi surface, a fifteenth route, and @thru 0.4.2. The manifest still says 1.4.1 and no tag was cut, so the store build and a fresh build answer to one version string while speaking contract v15 and v28. Bump the package and the tag, then submit.",
  },
  {
    step: "02",
    title: "Verify the package a real user can install",
    status: "open",
    detail:
      "One cell of 100 in docs/MANUAL_SMOKE_CHECKLIST.md is ticked, and that cell belongs to a popup-only send on 2026-10-04 whose charged fee was not captured. Install the published package — not a local dist/ — and run the runbook against it, then repeat against main, whose Domain screen and faucet policy reads have never been opened in Chrome at all.",
  },
  {
    step: "03",
    title: "Drive the domain flow by hand",
    status: "open",
    detail:
      "One .thru registration through the real background API router returned an on-chain execution result on 2026-10-27 and a follow-up read confirmed the lease owner. That proves the backend write, not the screen. Search, quote, years stepper, review sheet, password prompt, confirmation, primary-name link, and an account switch attempted mid-flow all need a person, a popup, and a side panel.",
  },
  {
    step: "04",
    title: "Token transfer and token lab live probe",
    status: "open",
    detail:
      "Measure what the token program charges and whether a sender-initialized token account can target a never-registered owner. The UI refuses to quote a token fee until then. Use a throwaway wallet on betanet and record the evidence; a script's existence is not a measurement.",
  },
  {
    step: "05",
    title: "Fee provenance and explorer confirmation",
    status: "open",
    detail:
      "The native fee of 1 base unit is a single historical observation, and transaction detail reports a declared fee with feeCharged: false. Capture a charged fee for a native send, a token transfer, and a name registration — the registration quote of 1,000 base units is the registrar's price, not the network's. Confirm the ?network=betanet explorer links and betanet block-time availability through the RPC.",
  },
  {
    step: "06",
    title: "Decide the DeFi surface, once",
    status: "blocked",
    detail:
      "43 methods exist behind flags that are all false. A live AMM swap ran on Betanet on 2026-10-26 and the swap screen was withdrawn the same day. Keep the flags off until an owner decision names what ships; do not re-enable by flipping a constant in a UI commit.",
  },
  {
    step: "07",
    title: "Custom network re-enable",
    status: "blocked",
    detail:
      "Keep activation disabled until HTTPS policy, narrow host permission, per-network capability records, and password re-auth land together. Localnet is declared but not offered for exactly this reason. Removing a legacy record is already allowed.",
  },
  {
    step: "08",
    title: "Provider contract watch",
    status: "blocked",
    detail:
      "Do not inject a browser provider until Thru publishes, and this project validates, an extension-compatible contract covering discovery, permission, approval, signing ownership, and submission. The hosted iframe API is not that contract.",
  },
];

export const completed = [
  "Legacy launchpad, DEX, and prediction UI deleted and guarded out of dist/. The backend namespace survives behind a flag that is false.",
  "Route lifecycle tests mount all 15 routes in no-vault, locked, and unlocked states — 1,041 checks, including the Domain screen.",
  "Contract v16 retired the unbound tx.send and token.transfer after every shipped caller moved to checked methods.",
  "Contract v17 and v18 appended the 43-method DeFi surface with no existing shape changed and every flag off.",
  "Contract v19 to v22: name reads, the native-send intent pipeline behind its gate, primary-name records, and the paid-lease registrar surface.",
  "Contract v23: name.register became a real, signed, fee-0n registration beneath a canonical root — and a .id root controlled by another key refuses the signer instead of failing later.",
  "Contract v24: the faucet reads the on-chain rate limit and the account's own buckets; the 10,000 base-unit cap was measured live on 2026-10-24.",
  "Contract v25 and D-016: the thru-custom-registrar deployed and initialized on Betanet, verified end to end with vmError 0 on 2026-10-25.",
  "Contract v26 to v28: token auto-discovery, storage-only cached balances, and reviewed name-signing facts with account-switch locking.",
  "@thru/sdk and @thru/programs moved 0.4.1 → 0.4.2 on 2026-10-23, with the account-table sort proven by an in-process sentinel rather than assumed.",
  "36 local suites green on 2026-10-27 (2,082 checks) and a clean dist/ build. Deterministic, local, and not a browser.",
  "Released in v1.4.1 and never superseded: Design System v2, betanet, @thru 0.4.1, the token drawer, verified custom tokens, desktop notifications, and duplicate detection. Published 2026-10-04 and still the only installable package.",
] as const;
