// What moved in the extension between the build the Chrome Web Store serves and the tree on
// `main`, read from the extension repository on 2026-10-27 at 1b9d096.
//
// The store package and the source tree were the same build on 2026-10-04. They have not been
// the same build since contract v16 merged on 2026-10-04. Nothing in this file is a version bump: the manifest still
// says 1.4.1, no tag after v1.4.1 exists, and the listing still reads 1.4.1 / 2026-10-04. What
// changed is the code underneath that one unchanged string.

export const drift = {
  storeContract: "v15",
  storeMethods: 83,
  storeRoutes: 14,
  storePackages: "@thru 0.4.1",
  storeDate: "2026-10-04",
  sourceContract: "v28",
  sourceMethods: 144,
  sourceWalletCore: 101,
  sourceDefi: 43,
  sourceRoutes: 15,
  sourcePackages: "@thru 0.4.2",
  sourceDate: "2026-10-27",
  sourceCommit: "1b9d096",
  contractVersions: 13,
  methodsAdded: 61,
  walletCoreAdded: 20,
  routesAdded: 1,
  withdrawnMethods: 2,
  days: 23,
  packageVersion: "1.4.1",
  latestTag: "v1.4.1",
  swapWithdrawnOn: "2026-10-26",
} as const;

export interface TimelineEntry {
  version: string;
  date: string;
  title: string;
  detail: string;
}

// Every contract version after the one in the store package, in order. Dates are the dates the
// change landed on main, read from git. This is a contract ledger, not a release ledger: not one
// of these versions has been published to the Chrome Web Store.
export const contractTimeline: TimelineEntry[] = [
  {
    version: "v16",
    date: "2026-10-04",
    title: "Two signing paths retired",
    detail:
      "tx.send and token.transfer are removed after every shipped caller moved to the checked methods that bind the reviewed account and network at the background boundary. 83 methods become 81 — the only time this count has gone down.",
  },
  {
    version: "v17–v19",
    date: "2026-10-08",
    title: "43-method DeFi surface, and name reads go live",
    detail:
      "program.*, feed.*, market.*, risk.*, launchpad.*, dex.*, intent.* and desktop.open are declared behind build-time flags that are false in every build — reads answer explicit unsupported states, and the one signing method refuses FEATURE_DISABLED. The same drop makes name.lookup, name.checkAvailability and name.getCanonicalRoot always-on truth asks while initRoot and setRecord stay gated.",
  },
  {
    version: "v20–v21",
    date: "2026-10-09",
    title: "A native-send intent pipeline behind the gate, and a primary name",
    detail:
      "The intent methods gain a network-scoped store and a bindingHash-pinned submit, still behind DEFI_INTENT. name.getPrimary, linkPrimary and unlinkPrimary keep a wallet-local, network-scoped 'my name' for the dashboard; linking verifies ownership with the lookup read and signs nothing.",
  },
  {
    version: "v22",
    date: "2026-10-10",
    title: "Paid .thru lease registry reads and writes",
    detail:
      "Registrar config and lease reads plus purchase, renew and claim-expired, built from first-party formats. The fee policy copies the first-party builder: 0n header fee, because the registrar prices in its own payment token.",
  },
  {
    version: "v23",
    date: "2026-10-23",
    title: "name.register becomes a real signed write",
    detail:
      "Free registration beneath a canonical root, auth tightened from unlocked to signing. The wire format is first-party and the program fee is 0n by construction; a root whose authority is another key refuses the signer rather than pretending.",
  },
  {
    version: "v24",
    date: "2026-10-24",
    title: "Faucet rate-limit awareness",
    detail:
      "tx.getFaucetLimit reads the on-chain policy and the account's own buckets; rate-limited vmErrors are relabelled FAUCET_RATE_LIMITED instead of surfacing as a generic chain failure.",
  },
  {
    version: "v25",
    date: "2026-10-25",
    title: "A second .thru registration provider",
    detail:
      "The deployed thru-custom-registrar joins /name. Two pure reads expose the derived config and the per-label lease; name.register gains optional via and years, and an absent via keeps the old path byte-identical.",
  },
  {
    version: "v26",
    date: "2026-10-26",
    title: "Token auto-discovery",
    detail:
      "token.discover scans cached history for incoming token mints, verifies each mint on chain, and registers only chain-verified records. The same day the swap slice shipped with its flags on — and the DEX screen was withdrawn again hours later.",
  },
  {
    version: "v27",
    date: "2026-10-26",
    title: "The frontend never waits on RPC",
    detail:
      "token.getCachedBalances adds a storage-only snapshot of the last chain-verified token rows, so a route can paint before the network answers. It is now a hard rule in AGENTS.md: cached state or an explicit unknown, never a spinner.",
  },
  {
    version: "v28",
    date: "2026-10-27",
    title: ".thru only, with reviewed facts bound to the signature",
    detail:
      "The domain flow drops .id minting, offers one .thru registration path selected from live registrar facts, confirms in a sheet, and carries the reviewed network, account, price and expiry into the signing request. Account switching is locked while a registration is pending.",
  },
];

// The capability-level read. Contract numbers are countable; these are the sentences a person
// would actually care about, and each one is still source-and-evidence, not a store fact.
export const sinceStore = [
  {
    key: "domains",
    title: "A Domain screen that registers a .thru name",
    detail:
      "ENS-style: one search field, a background availability check, a years stepper, an explicit review sheet, then a signed registration. Prices come from the on-chain registrar config, never a hardcoded number.",
  },
  {
    key: "faucet",
    title: "Faucet claims that know the policy",
    detail:
      "The claim screen reads the on-chain rate limit and the account's own bucket usage first, so a refusal is explained before a transaction is built instead of after it reverts.",
  },
  {
    key: "tokens",
    title: "Tokens that announce themselves",
    detail:
      "Incoming token mints found in cached history are verified on chain and added to the registry. A mint that fails verification is not added, and a typed-in symbol is still not trusted.",
  },
  {
    key: "paint",
    title: "Routes that paint before the network answers",
    detail:
      "Balances, history and token rows hydrate from scoped storage first and replace the placeholder when the chain replies. A dead RPC now shows stale-but-labelled data rather than an empty screen.",
  },
  {
    key: "defi",
    title: "A DeFi backend nobody can reach",
    detail:
      "43 methods for discovery, quotes, prepared intents, market reads and a launchpad surface exist in the contract with every DEFI_* flag false. A live AMM swap was executed on Betanet on 2026-10-26; the screen was withdrawn the same day.",
  },
] as const;
