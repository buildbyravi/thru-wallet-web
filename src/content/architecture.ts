export const architectureFlow = [
  {
    layer: "UI route stack",
    path: "src/ui/app/routes/*",
    detail:
      "Fourteen real routes share one guarded DOM kit, router, modal, focus trap, and popup/side-panel page. There is no legacy popup fallback.",
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
      "Every request is checked against the append-only manifest, auth tier, sender context, and JSON-serializable contract. Unknown methods fail closed.",
  },
  {
    layer: "Services",
    path: "src/background/services/*",
    detail:
      "Account, network, transaction, token, history, settings, registration, and vault orchestration live in the background. The UI does not import them.",
  },
  {
    layer: "Sacred adapters",
    path: "src/lib/vault.js · thru-client.js · networks.js",
    detail:
      "Crypto, session, and keyring; Thru RPC, transaction, and program code; and network config stay behind strict import boundaries.",
  },
] as const;

export const boundaries = [
  "UI never imports background services, vault internals, or RPC internals.",
  "Background owns auth and signing.",
  "src/shared/contract/manifest.js is the API allowlist.",
  "src/ui/kit/dom.js is the guarded DOM factory. The sink ratchet is zero.",
  "Money is BigInt internally and a string on the wire. Never both in one object.",
  "Network-specific data belongs in network config, not a module constant.",
  "Thru is not EVM. Other wallets are UX references only.",
] as const;

export const contractBreaks = [
  { version: "v5", change: "Existing signing methods moved to auth: 'signing'." },
  { version: "v6", change: "Reset confirmation and auto-lock changes hardened in the background." },
  { version: "v7", change: "Custom-network activation quarantined. Stale selections self-heal to Alphanet." },
  { version: "v8", change: "token.transfer and a real token.getBalances on official program bindings." },
  { version: "v9", change: "History feed." },
  { version: "v10", change: "History detail." },
  { version: "v11", change: "Checked sends. Reviewed account and network bind at the background." },
  { version: "v12", change: "Unlocked-only tx.registerAccount for an owned address, plus storage-only history cache." },
] as const;
