export const securityPrinciples = [
  {
    title: "Self-custody boundary",
    body: "The extension never asks an AI tool, a web page, or a remote service to hold the seed phrase, private key, or password. Export is password-gated. Signing stays in the background after the wallet auth policy passes.",
  },
  {
    title: "Manifest-first API",
    body: "Contract v12 declares the methods the UI can call. Unknown methods fail closed. Contract tests keep route callers and background handlers aligned. The contract is append-only, except documented security breaks.",
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
    title: "Quarantined custom networks",
    body: "Saved legacy custom networks stay listable and removable. Direct activation is refused. A stale custom or disabled selection self-heals to Alphanet before RPC binding. Re-enablement needs four preconditions together.",
  },
  {
    title: "Browser checks still matter",
    body: "Automated tests pass locally. Real Chrome layout, focus, side-panel behavior, QR canvas, clipboard prompts, and MV3 worker eviction remain a manual smoke checklist. npm test does not close them.",
  },
] as const;

export const gaps = [
  "Run the browser smoke checklist for popup and side-panel layout, focus, canvas QR, clipboard, and worker eviction.",
  "Live v12 activation — multi-account creation and owned-recipient just-in-time registration — still needs a safe network-reachable pass.",
  "Token transfer code is shipped; the token-program fee and never-registered owner case are not yet measured.",
  "Custom networks stay quarantined until HTTPS policy, narrow host permission, capability records, and password re-auth ship together.",
  "No injected dApp provider. Do not invent window.thru.",
  "Launchpad, DEX, and prediction UI are deleted. Future work belongs in isolated feature modules.",
  "The store listing calls auto-lock an inactivity lock. The extension source describes a fixed-period alarm. Trust the source.",
] as const;

export const signingNotes = [
  "Signing methods use auth: 'signing'. The wallet must be unlocked.",
  "Password re-authentication for signing is off by default. A user can turn it on through the password-gated Settings path.",
  "requirePasswordForSigning cannot be flipped by generic settings.set. That key goes through settings.setSecurity.",
  "tx.registerAccount is a narrow unlocked-only exception: exact vault-owned address, no value transfer. It must not be widened to send, faucet, token transfer, export, or arbitrary recipients.",
  "Secret export always re-checks the password, even if the wallet is already unlocked.",
  "Reset confirmation and auto-lock changes are password-gated in the background, not only in the form.",
] as const;

export const customNetworkPreconditions = [
  "HTTPS-only policy, with an explicit localhost exception.",
  "Narrow, user-granted host permission.",
  "A verified per-network capability record instead of silent Alphanet program ids.",
  "Password re-auth and a warning before the wallet talks to a user-supplied endpoint.",
] as const;
