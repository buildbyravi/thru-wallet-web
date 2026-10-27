export const architectureFlow = [
  {
    layer: "UI route stack",
    path: "src/ui/app/routes/*",
    detail:
      "Fifteen real routes share one guarded DOM kit, router, modal, focus trap, and popup/side-panel page. The Domain screen joined on 2026-10-09; there is still no legacy popup fallback.",
  },
  {
    layer: "Bridge seam",
    path: "bridge.send(method, params)",
    detail:
      "The UI has one outbound Chrome message caller. BigInt values become strings before they cross the port. Nothing unserializable is allowed through.",
  },
  {
    layer: "API router",
    path: "src/background/api-router.js",
    detail:
      "Every request is checked against the append-only manifest, auth tier, sender context, and JSON-serializable contract. Unknown methods fail closed. Nine methods are signing-gated in v28; name.register is one of them.",
  },
  {
    layer: "Services",
    path: "src/background/services/*",
    detail:
      "Account, network, transaction, token, history, settings, registration, name, and vault orchestration live in the background. Cached reads answer first; live reads hydrate and replace the placeholder. The UI does not import any of it.",
  },
  {
    layer: "Feature modules",
    path: "src/background/features/dex · contracts/thru-custom-registrar",
    detail:
      "DeFi lives in isolated modules behind build-time flags that are all false, so the code exists without a reachable screen. The custom registrar is our own RISC-V program, deployed at a pinned address; every fee and root fact is read from its on-chain config, never hardcoded.",
  },
  {
    layer: "Sacred adapters",
    path: "src/lib/vault.js · thru-client.js · networks.js",
    detail:
      "Crypto, session, and keyring; Thru RPC, transaction, and program code; and network config stay behind strict import boundaries. Program addresses are read from the pinned @thru/programs 0.4.2 release, not pasted in as strings.",
  },
] as const;

export const boundaries = [
  "UI never imports background services, vault internals, or RPC internals.",
  "Background owns auth and signing.",
  "src/shared/contract/manifest.js is the API allowlist.",
  "src/ui/kit/dom.js is the guarded DOM factory. The sink ratchet is zero.",
  "Money is BigInt internally and a string on the wire. Never both in one object.",
  "Network-specific data belongs in network config, not a module constant. Adding a network is one entry plus a CSP origin, and the check script fails if those two disagree.",
  "The frontend never waits on an RPC read before its first paint. Cached state or an explicit unknown — never a spinner (AGENTS.md rule 15, 2026-10-26).",
  "DeFi is build-time gated with no URL or storage override. A flag flip is a reviewed commit, not a runtime switch.",
  "A package version is not a contract version. 1.4.1 describes both an 83-method build in the store and a 144-method tree on main.",
  "Thru is not EVM. Other wallets are UX references only.",
] as const;

// The contract is append-only except for documented breaks. Everything from v16 up is on main
// and in no published package; the store build is v15.
export const contractBreaks = [
  { version: "v5", change: "Existing signing methods moved to auth: 'signing'." },
  { version: "v6", change: "Reset confirmation and auto-lock changes hardened in the background." },
  { version: "v7", change: "Custom-network activation quarantined. Stale selections self-heal to the default network." },
  { version: "v8", change: "token.transfer and a real token.getBalances on official program bindings." },
  { version: "v9–v12", change: "History feed, detail, checked sends, owned-account registration, storage-only history cache." },
  { version: "v13–v15", change: "One auth tier relaxed on a non-spending method; token.readMint verifies a pasted contract address on-chain; tx.checkDuplicate catches repeat transfers inside 30 seconds. Shipped in 1.4.1." },
  {
    version: "v16",
    change:
      "Removes tx.send and token.transfer. 83 methods become 81 — the first time the count has gone down. Merged 2026-10-04, after the store package was built.",
  },
  {
    version: "v17–v18",
    change:
      "Appends the 43-method DeFi surface: discovery and market reads, prepared intents, dex quotes, launchpad drafts, and one signing method (intent.submit) that refuses while the flags are off. Pure appends, no existing shape changed.",
  },
  {
    version: "v19–v22",
    change:
      "Name service reads and the paid-lease registrar. Reads are always-on truth asks; initRoot and setRecord stay gated. The three primary-name methods are wallet-local and sign nothing.",
  },
  {
    version: "v23",
    change:
      "name.register becomes a real signed write with auth 'signing' — the second deliberate exception to unlocked-only registration, because it broadcasts an irreversible transaction.",
  },
  { version: "v25", change: "A second .thru provider: two pure custom-registrar reads, plus optional via and years on name.register." },
  { version: "v26–v27", change: "token.discover verifies incoming mints on chain; token.getCachedBalances answers from storage so no route waits on RPC." },
  {
    version: "v28",
    change:
      "Name signing requests carry the reviewed network, account, price and expiry, and account switching is locked while a registration is pending. .thru only; .id stays resolution data.",
  },
] as const;
