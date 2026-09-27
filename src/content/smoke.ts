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
    detail: "Settings > Window > Open side panel calls chrome.sidePanel.open from a user gesture.",
    status: "open",
    sort: 3,
  },
  {
    itemKey: "toolbar-popup",
    label: "Toolbar still opens the popup",
    detail: "Nothing calls setPanelBehavior. The toolbar icon must keep opening the popup.",
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
] as const;

export const docSlots = [
  {
    title: "Per-listing release note",
    detail: "A short note that keeps store version 1.2.0 distinct from contract v12 when the next package ships.",
  },
  {
    title: "Smoke run transcript",
    detail: "Paste a completed Chrome pass here only after the manual checklist is actually run. Do not mark it done from Node.",
  },
  {
    title: "Extension provider watch",
    detail: "Open only when Thru publishes an extension or bring-your-own-signer contract worth validating.",
  },
  {
    title: "Fifteenth route",
    detail: "If a new route ships, add it to routes.ts, the contract note, and the lifecycle sentence together.",
  },
] as const;
