export const smokeSeed = [
  {
    itemKey: "popup-narrow",
    label: "Popup layout, narrow",
    detail: "Toolbar popup at the shipped 400px width. No clipped actions, balances, or review rows.",
    status: "open",
    sort: 1,
  },
  {
    itemKey: "panel-wide",
    label: "Side panel, wide",
    detail: "User-resized side panel. Body caps to the available width. Do not assume a 408px layout.",
    status: "open",
    sort: 2,
  },
  {
    itemKey: "side-panel-gesture",
    label: "Side panel opens from Settings",
    detail: "The dashboard header control calls chrome.sidePanel.open from a user gesture. Settings carries the Side Panel Mode toggle and no duplicate open button.",
    status: "open",
    sort: 3,
  },
  {
    itemKey: "toolbar-popup",
    label: "Toolbar still opens the popup",
    detail: "Nothing calls setPanelBehavior outside the settings toggle. With the toggle off, the toolbar icon must keep opening the popup.",
    status: "open",
    sort: 4,
  },
  {
    itemKey: "mutual-exclusion",
    label: "Popup and panel mutual exclusion",
    detail: "Opening one context closes the other. The close listener registers before asynchronous boot.",
    status: "open",
    sort: 5,
  },
  {
    itemKey: "focus-trap",
    label: "Password dialog focus trap",
    detail: "Tab wraps inside the dialog, Escape cancels, and focus returns to the control that opened it.",
    status: "open",
    sort: 6,
  },
  {
    itemKey: "qr-canvas",
    label: "QR canvas paints",
    detail: "Receive route canvas actually draws. A shim cannot prove this.",
    status: "open",
    sort: 7,
  },
  {
    itemKey: "clipboard",
    label: "Clipboard prompt",
    detail: "Copy address surfaces the browser permission prompt and does not write secrets anywhere else.",
    status: "open",
    sort: 8,
  },
  {
    itemKey: "worker-evict",
    label: "MV3 worker eviction",
    detail: "Reload the extension, not only the popup. Confirm restart, timeouts, and side-panel mode restore.",
    status: "open",
    sort: 9,
  },
  {
    itemKey: "session-refresh",
    label: "Lock on refresh",
    detail: "Check reported session-storage behavior in the target browser. A Node harness cannot certify it.",
    status: "open",
    sort: 10,
  },
  {
    itemKey: "token-drawer",
    label: "Token drawer opens from the balance box",
    detail: "Shipped in 1.4.1, unverified in a browser. Click, Enter, and Space on the balance box all slide the drawer up. Search filters it. No inline token ledger returns.",
    status: "open",
    sort: 11,
  },
  {
    itemKey: "custom-token",
    label: "Add a custom token by contract address",
    detail: "Shipped in 1.4.1, unverified in a browser. The chain supplies symbol and decimals through token.readMint. A bad address fails visibly instead of adding a token with typed metadata.",
    status: "open",
    sort: 12,
  },
  {
    itemKey: "desktop-notification",
    label: "Desktop notification on confirm and fail",
    detail: "Shipped in 1.4.1, unverified in a browser. Chrome must actually post it, the Settings toggle must suppress it, and the body must carry no amount, address, or signature.",
    status: "open",
    sort: 13,
  },
  {
    itemKey: "inactivity-lock",
    label: "Auto-lock measures real idleness",
    detail: "Shipped in 1.4.1, unverified in a browser. Leave the wallet idle past the window and confirm it locks; keep using it and confirm it does not. Background sync must not count as activity.",
    status: "open",
    sort: 14,
  },
  {
    itemKey: "duplicate-send",
    label: "Repeat transfer is caught before signing",
    detail: "Shipped in 1.4.1, contract v15. Send the same amount to the same recipient twice inside 30 seconds and confirm the second one requires an explicit confirmation.",
    status: "open",
    sort: 15,
  },
  {
    itemKey: "domain-route",
    label: "Domain screen mounts and searches",
    detail: "Source only, no store package. The Domain tile opens /name; typing a label checks availability in the background without blocking the field; the status line names the root it is asking about.",
    status: "open",
    sort: 16,
  },
  {
    itemKey: "domain-register",
    label: "Register a .thru name from the popup",
    detail: "Source only. Quote, years stepper, review sheet, password prompt, broadcast, confirmation, and a primary-name link afterwards. Backend evidence exists from 2026-10-27; no rendered run does.",
    status: "open",
    sort: 17,
  },
  {
    itemKey: "domain-switch-lock",
    label: "Account switching is locked mid-registration",
    detail: "Contract v28. Start a registration and try to switch accounts before signing. The switch must be refused rather than quietly changing what the signature covers.",
    status: "open",
    sort: 18,
  },
  {
    itemKey: "faucet-policy",
    label: "Faucet explains its own rate limit",
    detail: "Source only, contract v24. The claim screen reads the on-chain policy and this account's buckets; a second claim past the cap says so before building a transaction.",
    status: "open",
    sort: 19,
  },
  {
    itemKey: "cached-paint",
    label: "Routes paint before the chain answers",
    detail: "Source only, contract v27 and AGENTS.md rule 15. Block the RPC, reopen dashboard, history and tokens: cached rows or an explicit unknown appear immediately, and stale data is labelled rather than dressed as fresh.",
    status: "open",
    sort: 20,
  },
] as const;

export const docSlots = [
  {
    title: "Store submission transcript",
    detail:
      "The next package has to be cut, bumped and submitted. Record the version, the tag, the submission date and the approval date as separate events — the 1.4.0/1.4.1 sequence is the reason this slot exists.",
  },
  {
    title: "Domain run transcript",
    detail:
      "Paste a real browser pass of /name — search, quote, review, password, confirmation, primary link — only after someone has run it. Backend evidence from 2026-10-27 is not this.",
  },
  {
    title: "Smoke run transcript",
    detail:
      "Paste a completed Chrome pass here only after the manual checklist is actually run. One cell of one hundred is ticked, and it belongs to a partial run on 2026-10-04.",
  },
  {
    title: "Charged-fee ledger",
    detail:
      "Nothing in the wallet reports what a transaction actually cost. Transaction detail says feeCharged: false; the send fee of 1 base unit is one historical observation. Capture native, token and registration fees before writing a fee page.",
  },
  {
    title: "DeFi re-ship decision",
    detail:
      "The 43-method DeFi surface is unreachable and the swap screen was withdrawn on 2026-10-26. Write the decision before any flag is flipped again — not a changelog entry after the fact.",
  },
  {
    title: "Extension provider watch",
    detail: "Open only when Thru publishes an extension or bring-your-own-signer contract worth validating.",
  },
] as const;
