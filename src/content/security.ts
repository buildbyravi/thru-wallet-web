export const securityPrinciples = [
  {
    title: "Self-custody boundary",
    body: "The extension never asks an AI tool, a web page, or a remote service to hold the seed phrase, private key, or password. Export is password-gated. Signing stays in the background after the wallet auth policy passes.",
  },
  {
    title: "Manifest-first API",
    body: "The contract declares the methods the UI can call — v28 with 144 methods on main, v15 with 83 in the package Chrome installs, v18 with 124 in a status document that has not caught up. Unknown methods fail closed. Contract tests keep route callers and background handlers aligned in both directions, and the surface is append-only except for documented, versioned breaks.",
  },
  {
    title: "Nine signing methods, one reviewed intent",
    body: "Signing is a small, named set: native sends, checked token transfers, account registration, the faucet's narrow unlocked path, name registration, and intent.submit — which refuses FEATURE_DISABLED in every shipped build. Contract v28 carries the reviewed network, account, price and expiry into the signing request itself rather than trusting a screen two documents away.",
  },
  {
    title: "No unsafe DOM sinks",
    body: "The source guard keeps innerHTML and related sinks at zero across src/. New UI is built with the kit DOM factory. Route lifecycle tests mount all 15 routes in three vault states and walk the rendered tree for seeded secrets.",
  },
  {
    title: "Honest unsupported states",
    body: "Unverified chain behavior returns supported: false and a reason. Missing token accounts, failed reads, custom endpoints, an uninitialized registry, a closed root authority, a rate-limited faucet, and every gated DeFi method are not filled in with guessed numbers. A rate-limited faucet error is now labelled FAUCET_RATE_LIMITED instead of wearing a generic chain message.",
  },
  {
    title: "One network, enforced twice",
    body: "Betanet is the only enabled network. Localnet, testnet and mainnet are declared and disabled so the storage scoping has something to exercise, and a CSP check fails the build if connect-src and the enabled network list ever disagree in either direction. Program addresses come from @thru/programs 0.4.2, not from pasted strings.",
  },
  {
    title: "Quarantined custom networks",
    body: "Saved legacy custom networks stay listable and removable. Direct activation is refused. A stale custom or disabled selection self-heals to the default network before RPC binding. Re-enablement needs four preconditions together.",
  },
  {
    title: "DeFi is gated at build time",
    body: "Every DEFI_* flag is a source constant with no URL and no storage override, so no message can turn a swap on. The backend code is present and tested; the screen is not. A quarantine test proves the override surface stays inert.",
  },
  {
    title: "Browser checks still matter",
    body: "36 suites and 2,082 local checks pass on main. Real Chrome layout, focus, side-panel behavior, QR canvas, clipboard prompts, notification delivery, and MV3 worker eviction remain a manual checklist with one ticked cell out of one hundred. npm test does not close them, and the shipped package has none of them.",
  },
] as const;

export const gaps = [
  "Run the browser smoke checklist. One cell of 100 is ticked: a popup-only native send on 2026-10-04 whose charged fee was not captured.",
  "Publish the source. Contract v16 through v28, the Domain screen, the faucet policy reads, token discovery and @thru 0.4.2 exist only on main. The store still serves the 2026-10-04 build and the package number never moved past 1.4.1, so a main build and a store install answer to the same version string while speaking v28 and v15.",
  "Verify the domain flow in a browser. A backend registration through the real API router is on-chain (2026-10-27); the rendered search, quote, review sheet, password prompt and confirmation have never been driven by a person in Chrome.",
  "The registry's own unverified boundaries: custom lease renewal and claim are not wired, My Domains cannot enumerate owned names, and the official paid .thru registry is not initialized on Betanet, so its purchase and renewal paths answer unsupported there.",
  "Token transfer code is shipped; the token-program fee and the never-registered owner case are not measured. The UI says so instead of quoting the native 1-base-unit fee.",
  "The repository's own status document still opens with contract v18 and 124 methods against a 2026-10-03 baseline, while the code exports v28 with 144. Its 2026-10-27 Domain section is accurate and its headline identifiers are not. llms.txt in the same repo still says 14 routes and @thru 0.4.1.",
  "Charged fees are not reported. Transaction detail exposes the fee declared in the header and says feeCharged: false; the UI labels it Fee (declared). A declared value is not a debit.",
  "Betanet itself is unaudited infrastructure and Thru's last testnet before mainnet. One native transfer fee of 1 base unit was measured on one amount and one size.",
  "The DeFi surface is 43 declared methods that no user can reach, and a swap screen that shipped and was withdrawn inside one day on 2026-10-26. Treat the flag state, not the changelog, as the product.",
  "Custom networks stay quarantined until HTTPS policy, narrow host permission, capability records, and password re-auth ship together.",
  "No injected dApp provider. Do not invent window.thru.",
  "No external security audit has been performed. Nothing here is a mainnet-readiness claim.",
] as const;

export const signingNotes = [
  "Signing methods use auth: 'signing'. The wallet must be unlocked.",
  "Password re-authentication for signing is off by default. A user can turn it on through the password-gated Settings path.",
  "requirePasswordForSigning cannot be flipped by generic settings.set. That key goes through settings.setSecurity.",
  "tx.registerAccount is a narrow unlocked-only exception: exact vault-owned address, no value transfer. It must not be widened to send, faucet, token transfer, export, or arbitrary recipients.",
  "Contract v13 moves the faucet claim to unlocked-only as a second deliberate exception: claiming testnet funds is an incoming credit, and a signing password bought nothing there.",
  "Contract v23 makes name.register a signing method. It is a broadcast, on-chain, irreversible write, and it signs only for the selected, reviewed account.",
  "Contract v28 puts the reviewed network, account, price and expiry into the name signing request, and locks account switching while a registration is pending.",
  "intent.submit is the only signing-gated DeFi method, and it refuses while DEFI_INTENT is false — which is every build.",
  "Secret export always re-checks the password, even if the wallet is already unlocked.",
  "Reset confirmation and auto-lock changes are password-gated in the background, not only in the form. The confirmation string is compared as uppercase RESET.",
] as const;

export const customNetworkPreconditions = [
  "HTTPS-only policy, with an explicit localhost exception.",
  "Narrow, user-granted host permission.",
  "A verified per-network capability record instead of silently reusing the default network's program ids.",
  "Password re-auth and a warning before the wallet talks to a user-supplied endpoint.",
] as const;
