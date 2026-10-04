export const securityPrinciples = [
  {
    title: "Self-custody boundary",
    body: "The extension never asks an AI tool, a web page, or a remote service to hold the seed phrase, private key, or password. Export is password-gated. Signing stays in the background after the wallet auth policy passes.",
  },
  {
    title: "Manifest-first API",
    body: "The contract declares the methods the UI can call — v15 with 83 methods in the published build, v12 with 81 in a status document that has not caught up. Unknown methods fail closed. Contract tests keep route callers and background handlers aligned, and the surface is append-only except for documented, versioned breaks.",
  },
  {
    title: "No unsafe DOM sinks",
    body: "The source guard keeps innerHTML and related sinks at zero across src/. New UI is built with the kit DOM factory. Route lifecycle tests walk the rendered tree for seeded secrets.",
  },
  {
    title: "Honest unsupported states",
    body: "Unverified chain behavior returns supported: false and a reason. Missing token accounts, failed reads, custom endpoints, and future DeFi modules are not filled in with guessed numbers.",
  },
  {
    title: "One network, enforced twice",
    body: "Betanet is the only enabled network in 1.4.1. Localnet is declared but disabled, testnet and mainnet are reserved slots, and a CSP check fails the build if connect-src and the enabled network list ever disagree in either direction.",
  },
  {
    title: "Quarantined custom networks",
    body: "Saved legacy custom networks stay listable and removable. Direct activation is refused. A stale custom or disabled selection self-heals to the default network before RPC binding. Re-enablement needs four preconditions together.",
  },
  {
    title: "Browser checks still matter",
    body: "Automated tests pass locally. Real Chrome layout, focus, side-panel behavior, QR canvas, clipboard prompts, notification delivery, and MV3 worker eviction remain a manual smoke checklist. npm test does not close them.",
  },
] as const;

export const gaps = [
  "Run the browser smoke checklist for popup and side-panel layout, focus, canvas QR, clipboard, desktop notifications, and worker eviction.",
  "The published 1.4.1 package has no recorded manual verification. All 36 rows of docs/MANUAL_SMOKE_CHECKLIST.md are unticked — 95 individual checks once popup and side panel are counted separately — and the build reached the store one day after merging on automated evidence alone. Users are the first browser run.",
  "The repository's own docs/STATUS_AND_ROADMAP.md still describes contract v12 with 81 methods at 4aa55ba. Main is contract v15 with 83. A rewrite is written and mergeable on the open #17 to #18 chain, where the document describes v16 — so the fix for the stale document arrives attached to another contract change.",
  "The v16 chain changes the contract without changing the package number. If it merges as-is, a build from main calls itself 1.4.1 and speaks contract v16, while the 1.4.1 in the Chrome Web Store speaks v15. Two different builds would answer to one version string.",
  "The changes freshest to the package are the ones no browser has confirmed: duplicate detection across the whole pending window, desktop notification delivery, and the dark-mode action grid, drawer ledger, and connection footer.",
  "Betanet itself is unaudited infrastructure and Thru's last testnet before mainnet. A 1-base-unit transfer fee was measured once, on one amount and one size.",
  "Live v12 activation — multi-account creation and owned-recipient just-in-time registration — still needs a safe network-reachable pass.",
  "Token transfer code is shipped; the token-program fee and never-registered owner case are not yet measured. The pending token lab exercises deploy, add, send, and receive, but on a chain nobody has certified.",
  "Custom networks stay quarantined until HTTPS policy, narrow host permission, capability records, and password re-auth ship together.",
  "No injected dApp provider. Do not invent window.thru.",
  "Launchpad, DEX, and prediction UI are deleted. Future work belongs in isolated feature modules.",
] as const;

export const signingNotes = [
  "Signing methods use auth: 'signing'. The wallet must be unlocked.",
  "Password re-authentication for signing is off by default. A user can turn it on through the password-gated Settings path.",
  "requirePasswordForSigning cannot be flipped by generic settings.set. That key goes through settings.setSecurity.",
  "tx.registerAccount is a narrow unlocked-only exception: exact vault-owned address, no value transfer. It must not be widened to send, faucet, token transfer, export, or arbitrary recipients.",
  "Contract v13 moves the faucet claim to unlocked-only as a second, deliberate exception: claiming testnet funds is an incoming credit, and a signing password bought nothing there.",
  "Secret export always re-checks the password, even if the wallet is already unlocked.",
  "Reset confirmation and auto-lock changes are password-gated in the background, not only in the form. The confirmation string is compared as uppercase RESET.",
] as const;

export const customNetworkPreconditions = [
  "HTTPS-only policy, with an explicit localhost exception.",
  "Narrow, user-granted host permission.",
  "A verified per-network capability record instead of silently reusing the default network's program ids.",
  "Password re-auth and a warning before the wallet talks to a user-supplied endpoint.",
] as const;
