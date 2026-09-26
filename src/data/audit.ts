export interface Axis {
  id: string;
  name: string;
  file: string;
  thru: number;
  rabby: number;
  note: string;
}

/** Scores are out of 10, judged on shipped surface area AND enforcement. */
export const axes: Axis[] = [
  { id: "A1", name: "Design tokens & theming", file: "src/popup/styles/tokens.css", thru: 4.5, rabby: 9.0,
    note: "One flat variable list vs. a generated three-layer system consumed by every primitive." },
  { id: "A2", name: "Component system & states", file: "src/ui/kit/*", thru: 3.5, rabby: 9.0,
    note: "h() is a good DOM sink. There is no Button, Field, Sheet or Row primitive above it." },
  { id: "A3", name: "Type, icon & motion craft", file: "src/ui/kit/icon.js", thru: 2.5, rabby: 8.0,
    note: "Path-data icons: correct instinct. No scale, no display cut, no motion contract." },
  { id: "A4", name: "Surfaces: popup / notify / tab", file: "src/ui/app/routes/*", thru: 6.0, rabby: 9.5,
    note: "Popup + side panel is more modern than Rabby's three windows; approval is missing." },
  { id: "A5", name: "Message contract & state", file: "src/shared/contract/manifest.js", thru: 8.5, rabby: 7.5,
    note: "A 74-method allowlist with auth tiers beats reflecting walletController onto the window." },
  { id: "A6", name: "Keyring & vault crypto", file: "src/lib/vault.js", thru: 8.5, rabby: 8.5,
    note: "PBKDF2-600k + AES-256-GCM, session-only plaintext. No auto-lock: that is the missing half." },
  { id: "A7", name: "RPC & network binding", file: "src/lib/thru-client.js", thru: 7.0, rabby: 9.0,
    note: "configureNetwork() fixed a real class of bug. No cache, dedupe or stale state above it." },
  { id: "A8", name: "Accessibility & i18n", file: "src/ui/kit/focus-trap.js", thru: 3.5, rabby: 8.5,
    note: "Focus trapping and secret hygiene are real. Zero localisation across 14 routes." },
  { id: "A9", name: "Tests & enforcement", file: "scripts/check-layering.mjs", thru: 9.0, rabby: 6.5,
    note: "1,000+ checks, layering ratchet at zero, quarantine test. Rabby is the weaker side here." },
];

export const overall = {
  thru: 6.0,
  rabby: 8.4,
  headline: "Production-grade backend discipline wearing a prototype skin.",
  verdict:
    "Thru wins on the parts nobody sees and loses on the only part a user judges. Do not port Rabby's stack — port its surface discipline.",
};

export type Sev = "BLOCKER" | "MAJOR" | "MINOR";

export interface Finding {
  id: string;
  sev: Sev;
  area: "frontend" | "backend";
  title: string;
  detail: string;
  fix: string;
  ref: string;
}

export const findings: Finding[] = [
  { id: "F-01", sev: "BLOCKER", area: "frontend", ref: "§03 · pane 2",
    title: "Buttons have no pending state",
    detail: "A tap on Send, Sign or Export fires the bridge call immediately and the control stays enabled. On a slow RPC the user taps again and submits twice.",
    fix: "One Button primitive with loading + a pending guard that owns the whole round-trip." },
  { id: "F-02", sev: "BLOCKER", area: "frontend", ref: "§03 · pane 5",
    title: "No approval surface states what is being signed",
    detail: "auth: 'signing' proves the user typed the password, not that the user understood the bytes. For an unknown program the payload is a blob.",
    fix: "A dedicated approval route: decoded instruction list, signed balance deltas, fee, network and a one-sentence summary." },
  { id: "F-03", sev: "BLOCKER", area: "backend", ref: "§04 · pane 2",
    title: "Decrypted vault never expires",
    detail: "chrome.storage.session outlives the MV3 service worker and can persist up to the browser session. With no alarm, unlock is a one-way door until the browser closes.",
    fix: "chrome.alarms idle lock at 15 min, a hard 8 h ceiling, and lock on suspend / window close." },
  { id: "F-04", sev: "MAJOR", area: "frontend", ref: "§06 · tokens",
    title: "Raw hex literals live outside tokens.css",
    detail: "Three different 'muted' greys and four card paddings across 14 routes. The eye reads the inconsistency long before it reads the copy.",
    fix: "Three-layer tokens plus scripts/check-tokens.mjs failing on any hex outside the generated file." },
  { id: "F-05", sev: "MAJOR", area: "frontend", ref: "§06 · type",
    title: "No type scale; amounts are proportional",
    detail: "Headings are set per route by feel and 1.234 THRU is a different width from 8.888 THRU, so the balance line twitches on every refresh.",
    fix: "1.333 scale off 15px body, a 32px display cut for balances, tabular-nums on every figure." },
  { id: "F-06", sev: "MAJOR", area: "frontend", ref: "§06 · motion",
    title: "Zero motion contract",
    detail: "Every route change is an instant pop. This is the loudest remaining 'generated prototype' signal in the build.",
    fix: "One easing, three durations, a 120ms press depth and a 200ms route cross-fade, all behind prefers-reduced-motion." },
  { id: "F-07", sev: "MAJOR", area: "frontend", ref: "§03 · pane 3",
    title: "The shell is not locked to 360 × 600",
    detail: "Header height varies 52/56/60px and button radius 8/10/12px between routes, so the chrome appears to shift when navigating.",
    fix: "Fixed grid shell (56px header / scrolling body / 56px tabbar) with a 4px spacing ratchet." },
  { id: "F-08", sev: "MAJOR", area: "backend", ref: "§04 · pane 5",
    title: "Loading renders as a zero balance",
    detail: "Balances and history refetch per render and show 0.00 THRU until the first byte. In a wallet, zero and unknown must never look identical.",
    fix: "A read gateway with in-flight dedupe, 15s cache and an explicit idle|loading|fresh|stale|error state." },
  { id: "F-09", sev: "MAJOR", area: "backend", ref: "§04 · pane 3",
    title: "Errors cross the bridge untyped",
    detail: "throw new Error('NETWORK_UNBOUND') reaches the UI as a sentence fragment with no code, no retry hint and no audit record.",
    fix: "A { ok, error: { code, message, data } } envelope and one audit event per call attempt." },
  { id: "F-10", sev: "MAJOR", area: "frontend", ref: "§07 · P1",
    title: "No localisation seam",
    detail: "Fourteen routes of hard-coded English. Rabby ships 11 locales from one messages.json. Retrofitting strings later is the single most expensive late change.",
    fix: "_raw/locales/en/messages.json + a t() helper now, while the copy surface is still small." },
  { id: "F-11", sev: "MINOR", area: "frontend", ref: "§06 · a11y",
    title: "Focus visibility is the browser default",
    detail: "focus-trap.js is genuinely well done, but the visible ring is UA styling and will vanish the moment a button gets an outline: none.",
    fix: "One :focus-visible token (2px accent, 3px offset) declared in tokens.css, never removed." },
  { id: "F-12", sev: "MINOR", area: "backend", ref: "§07 · P2",
    title: "Nothing tests pixels",
    detail: "test-route-lifecycle.mjs runs 755 checks against a DOM shim, so a layout regression is invisible to npm test.",
    fix: "Playwright against a real build of dist/ with a screenshot per route at 360 × 600 and 720 × 600." },
  { id: "F-13", sev: "MINOR", area: "frontend", ref: "§03 · pane 4",
    title: "Icons lack a drawing convention",
    detail: "Path data is the right call, but mixed optical weights at 20px make the toolbar look assembled rather than designed.",
    fix: "One 24 × 24 grid, 1.5px stroke, round caps and joins, 20px optical size — pinned by a snapshot test." },
];

export const roadmap = [
  {
    phase: "P0",
    span: "days 1–5",
    title: "Stop the bleeding",
    items: [
      ["src/ui/kit/button.js", "Button primitive with loading/disabled/pressed; wire into send, sign, export, reset.", "F-01"],
      ["src/lib/session-service.js", "chrome.alarms auto-lock: 15 min idle, 8 h hard ceiling, lock on suspend.", "F-03"],
      ["src/ui/app/routes/approval.js", "Approval route with decoded instructions + signed deltas, reachable from send.", "F-02"],
      ["src/popup/styles/tokens.css", "Regenerate as primitive → semantic → component; delete every stray hex.", "F-04"],
    ],
  },
  {
    phase: "P1",
    span: "days 6–15",
    title: "Make it feel built",
    items: [
      ["src/ui/app/layout/*", "Lock the 360 × 600 shell grid; sweep all 14 routes against the spacing ratchet.", "F-07"],
      ["src/popup/styles/tokens.css", "Type scale + motion contract; tabular figures on every amount.", "F-05 / F-06"],
      ["src/background/pipeline.js", "Ordered middleware pipeline + typed error envelope + audit event per call.", "F-09"],
      ["_raw/locales/en/messages.json", "Extract every string into messages.json, add t() and a locale switch.", "F-10"],
      ["src/background/services/read-service.js", "Cache + in-flight dedupe + explicit data states; skeletons instead of 0.00.", "F-08"],
    ],
  },
  {
    phase: "P2",
    span: "days 16–30",
    title: "Make it durable",
    items: [
      ["src/shared/provider-contract.js", "Provider seam + flags + scripts/check-provider.mjs, still hard-off.", "—" ],
      ["e2e/", "Playwright visual regression over dist/ at two widths, per route.", "F-12"],
      ["src/ui/kit/icon.js", "24px grid, 1.5px stroke convention + icon snapshot test.", "F-13"],
      ["src/popup/styles/tokens.css", "Dark theme from the same generated ramp.", "F-04"],
    ],
  },
];

export const tokenSpec = [
  ["--color-bg", "#F3F0E9", "Page. Warm vellum — never pure white, never pure grey."],
  ["--color-surface", "#FFFFFF", "Cards and fields. One step up from the page."],
  ["--color-border", "#CBC4B3", "Hairlines only. 1px. Never 2px."],
  ["--color-text", "#16150F", "Warm near-black ink."],
  ["--color-text-muted", "#6B6659", "Secondary copy. Passes 5.4:1 on the page."],
  ["--color-accent", "#5C6BF5", "Actions and selection. Used once per screen region."],
  ["--color-accent-ink", "#2E39B8", "Pressed / hover. Also link text on light."],
  ["--color-accent-soft", "#E3E6FF", "Selected rows, chip fills, focus halo."],
  ["--color-danger", "#D93B1E", "Irreversible actions and BLOCKER markers only."],
  ["--radius-sm / md / lg", "8 / 12 / 16px", "Fields, cards, sheets. Nothing else exists."],
  ["--shadow-1 / 2", "1px / 12px", "Resting cards / modal sheets."],
  ["--dur-fast / base / slow", "120 / 200 / 320ms", "Press / state / route."],
  ["--ease-out", "cubic-bezier(.22,.61,.36,1)", "The only easing in the codebase."],
];

export const motionSpec = [
  ["Press depth", "scale .98", "120ms", "cubic-bezier(.22,.61,.36,1)", "Any control that triggers a bridge call."],
  ["State change", "opacity + 4px rise", "200ms", "cubic-bezier(.22,.61,.36,1)", "Route swap, row insert, toast in."],
  ["Sheet / modal", "24px rise + scrim", "320ms", "cubic-bezier(.65,0,.35,1)", "Password modal, approval preview."],
  ["Destructive", "none", "0ms", "—", "Reset and export are instant and calm — never celebratory."],
];

const MANIFEST = `# thru-wallet-ext — remediation manifest for build agents
# Source of truth: buildbyravi/thru-wallet-ext (contract v7, 74 methods)
# Reference: RabbyHub/Rabby (develop) — patterns only, NEVER the stack.
# Thru is not EVM. Do not port ethers, MobX, React, Less or pageProvider.js.

meta:
  contract_version: 7
  target: chrome MV3 + sidePanel
  stack: vanilla ES modules + esbuild (build.mjs)
  rule: "Port surface discipline, not surface technology."

principles:
  - P-1: every UI value comes from tokens.css; zero hex literals elsewhere
  - P-2: every interactive control is a kit primitive with an exhaustive state matrix
  - P-3: every bridge call passes api-router -> pipeline; no service is called directly
  - P-4: zero and unknown are never rendered the same way
  - P-5: do not implement unverified protocol behaviour (README: Security basics)
  - P-6: scripts/check-*.mjs must fail the build on every rule above

tasks:
  - id: T-01
    sev: BLOCKER
    fixes: [F-01]
    create: [src/ui/kit/button.js]
    action: >
      Button primitive: variants primary|secondary|ghost|danger, sizes sm|md|lg,
      props { label, onClick, loading, disabled, icon, block }. While loading it is
      disabled and aria-busy="true". Press feedback scale(.98) over 120ms.
    acceptance:
      - "send, sign, export and reset use button(); grep for 'class: .btn' returns 0 hits"
      - "a double click on Send produces exactly one bridge.send call (test-ui-dom.mjs)"
  - id: T-02
    sev: BLOCKER
    fixes: [F-03]
    create: [src/background/services/session-service.js]
    action: >
      chrome.alarms auto-lock. Idle 15 min, hard ceiling 8 h. Lock on
      runtime.onSuspend and windows.onRemoved. On lock: clear chrome.storage.session
      vault + key, emit vault.locked, reject every pending approval.
    acceptance:
      - "test-vault.mjs covers lock('timeout') and refuses unlock-free secret access after it"
      - "storage.session is empty after lock; storage.local still holds only the blob"
  - id: T-03
    sev: BLOCKER
    fixes: [F-02]
    create: [src/ui/app/routes/approval.js]
    action: >
      Approval route rendering origin, verb, decoded instruction list, signed deltas
      per balance, fee + reserve, network. Reject and Sign are explicit; Sign is a
      loading button. Mounted by test-route-lifecycle.mjs like the other 14 routes.
    acceptance:
      - "no transaction can be signed without traversing this route"
      - "the route renders a human sentence summarising the payload"
  - id: T-04
    sev: MAJOR
    fixes: [F-04, F-05, F-06, F-11, F-13]
    edit: [src/popup/styles/tokens.css, src/ui/kit/icon.js]
    action: >
      Regenerate tokens.css as primitive -> semantic -> component layers from
      scripts/make-tokens.mjs. Add the 1.333 type scale, tabular figures, the motion
      contract and a :focus-visible ring. Constrain icons to a 24 grid at 1.5px stroke.
    acceptance:
      - "scripts/check-tokens.mjs: 0 hex literals outside the generated file"
      - "grep -r 'font-size' src/ resolves only to var(--fs-*)"
  - id: T-05
    sev: MAJOR
    fixes: [F-07]
    edit: [src/ui/app/layout/*]
    action: >
      Lock the popup shell to 360x600: grid-template-rows 56px / 1fr / 56px,
      16px gutters, 12px rhythm. Sweep all routes; snap card padding to 16px and
      radii to 8/12/16.
    acceptance:
      - "check-routes.mjs asserts one header and one tabbar class across all 14 routes"
  - id: T-06
    sev: MAJOR
    fixes: [F-08]
    create: [src/background/services/read-service.js]
    action: >
      Read gateway with in-flight dedupe, 15s cache and states
      idle|loading|fresh|stale|error. Skeletons for loading/error; stale shows the
      cached value at reduced weight.
    acceptance:
      - "no view renders 0.00 or 0 as a placeholder"
  - id: T-07
    sev: MAJOR
    fixes: [F-09]
    create: [src/background/pipeline.js]
    action: >
      Ordered middleware pipeline (session, auth, contract, network, simulate/explain,
      approval, execute) returning { ok, error: { code, message, data } } and writing
      one audit event per attempt.
    acceptance:
      - "test-api-router.mjs asserts every rejection carries a stable machine code"
  - id: T-08
    sev: MAJOR
    fixes: [F-10]
    create: [_raw/locales/en/messages.json, src/ui/kit/i18n.js]
    action: >
      Extract all copy to messages.json with nested keys, add t(key, vars) and a
      locale getter. English only at first, structure first.
    acceptance:
      - "grep for quoted UI copy in src/ui/app/routes returns 0 hits"
  - id: T-09
    sev: MINOR
    fixes: [F-12]
    create: [e2e/visual.spec.mjs]
    action: >
      Playwright over a real dist/ build: one screenshot per route at 360x600 and
      720x600, plus the password modal and approval route at both widths.
    acceptance:
      - "npm run test:visual fails on a 2px shift in the header"

never:
  - "invent window.thru or any provider before a verified extension/BYO-signer contract"
  - "hand-roll program instructions when @thru/programs exposes them"
  - "import src/background/**, lib/vault.js or lib/thru-client.js from src/ui/**"
  - "store a decrypted vault or derived key in chrome.storage.local"
  - "use innerHTML; src/ui/kit/dom.js h() is the only DOM sink"
  - "reach for React, MobX, ethers or Rabby's webpack build — different chain, different contract"
`;

export const agentManifest = MANIFEST;

/** Full downloadable report, assembled from the same data the page renders. */
export function buildReport(panes: { id: string; group: string; index: number; title: string; rabbyFile: string; thruFile: string; severity: string; verdict: string; rabby: string; thru: string; fix: string; fixCode: string }[]): string {
  const out: string[] = [];
  out.push("# THRU × RABBY — frontend & backend teardown and remediation plan");
  out.push("");
  out.push("Subject: github.com/buildbyravi/thru-wallet-ext (contract v7, 74 methods)");
  out.push("Reference: github.com/RabbyHub/Rabby (develop) — patterns, never the stack.");
  out.push("Thesis: " + overall.headline + " " + overall.verdict);
  out.push("");
  out.push("## 01 · Scorecard (0–10)");
  out.push("");
  out.push("| # | Axis | Thru | Rabby | Note |");
  out.push("| --- | --- | --- | --- | --- |");
  for (const a of axes) out.push("| " + a.id + " | " + a.name + " | " + a.thru.toFixed(1) + " | " + a.rabby.toFixed(1) + " | " + a.note + " |");
  out.push("");
  out.push("## 02 · Findings");
  out.push("");
  for (const f of findings) {
    out.push("### " + f.id + " [" + f.sev + "] " + f.title + " (" + f.ref + ")");
    out.push("");
    out.push(f.detail);
    out.push("");
    out.push("Fix: " + f.fix);
    out.push("");
  }
  out.push("## 03–04 · Line-by-line panes");
  out.push("");
  for (const p of panes) {
    out.push("### " + (p.group === "frontend" ? "§03" : "§04") + ". pane " + p.index + " — " + p.title + " [" + p.severity + "]");
    out.push("");
    out.push("Rabby: " + p.rabbyFile);
    out.push("Thru:  " + p.thruFile);
    out.push("");
    out.push("> " + p.verdict);
    out.push("");
    out.push("```js");
    out.push("// RABBY");
    out.push(p.rabby);
    out.push("// THRU");
    out.push(p.thru);
    out.push("```");
    out.push("");
    out.push("Remediation: " + p.fix);
    out.push("");
    out.push("```js");
    out.push(p.fixCode);
    out.push("```");
    out.push("");
  }
  out.push("## 07 · Roadmap");
  out.push("");
  for (const r of roadmap) {
    out.push("### " + r.phase + " — " + r.title + " (" + r.span + ")");
    for (const [file, action, ref] of r.items) out.push("- [ ] " + file + " — " + action + " (" + ref + ")");
    out.push("");
  }
  out.push("## 08 · Agent manifest");
  out.push("");
  out.push("```yaml");
  out.push(MANIFEST.trim());
  out.push("```");
  return out.join("\n");
}
