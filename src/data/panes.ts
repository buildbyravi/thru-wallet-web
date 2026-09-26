export type Severity = "BLOCKER" | "MAJOR" | "MINOR" | "HOLD";

export interface Pane {
  id: string;
  group: "frontend" | "backend";
  index: number;
  title: string;
  rabbyFile: string;
  thruFile: string;
  severity: Severity;
  verdict: string;
  rabby: string;
  thru: string;
  fix: string;
  fixCode: string;
}

const RABBY_NOTE =
  "Abridged from RabbyHub/Rabby (develop). Shapes verified against repo docs; re-read the file at HEAD before editing.";

export const panes: Pane[] = [
  /* ─────────────────────────── FRONTEND ─────────────────────────── */
  {
    id: "f1",
    group: "frontend",
    index: 1,
    title: "Design tokens: generated system vs. hand-listed CSS variables",
    rabbyFile: "Rabby — scripts/make-theme.js → src/ui/style/*, tailwind.config.js",
    thruFile: "Thru — src/popup/styles/tokens.css",
    severity: "MAJOR",
    verdict:
      "You own a token file; Rabby owns a token pipeline. One source of truth, generated at build time, consumed by every primitive so no component can invent a colour.",
    rabby: `// scripts/make-theme.js — theme is BUILT, not typed by hand.
// It emits the vars consumed by tailwind.config.js + Less mixins,
// so 'primary', 'title', 'body', 'line', 'card-border' resolve identically
// in popup, notification and tab pages.

const light = { /* generated ramps */ };
const dark  = { /* generated ramps */ };

// tailwind.config.js (abridged)
module.exports = {
  theme: {
    extend: {
      colors: {
        primary:  'var(--color-primary)',
        title:    'var(--color-title)',
        body:     'var(--color-body)',
        secondary:'var(--color-secondary)',
        line:     'var(--color-line)',
        'bg-body':'var(--color-bg-body)',
      },
      borderRadius: { DEFAULT: '8px', md: '10px', lg: '16px' },
    },
  },
};

// component usage — impossible to hard-code a hex
<button className="bg-primary text-white rounded-lg hover:bg-primary-light">`,
    thru: `/* src/popup/styles/tokens.css — a flat list, no ramp, no dark theme,
   no semantic layer. Components then reach for raw values or ad-hoc
   colour-mix() calls, which is where the "AI-made" look comes from. */

:root {
  --bg: #0b0b0f;
  --panel: #15151c;
  --text: #f2f2f5;
  --muted: #8b8b96;
  --accent: #7c5cff;
  --radius: 10px;
}

/* src/ui/app/routes/dashboard.js */
h('button', { class: 'btn btn-primary' }, 'Send')   // .btn-primary is
/* redeclared per-route stylesheet — same intent, three different greys */`,
    fix:
      "Split tokens.css into three layers — primitive ramp → semantic alias → component recipe — and generate them from a single JS source so light/dark and every surface stay in lockstep. Then delete every hex literal outside tokens.css and let check-layering.mjs enforce it.",
    fixCode: `/* scripts/make-tokens.mjs → src/popup/styles/tokens.css (generated header) */

/* 1 — PRIMITIVE: raw ramps. Never referenced by components. */
:root {
  --v-500: #5c6bf5;  --v-600: #2e39b8;  --v-100: #e3e6ff;
  --n-900: #16150f;  --n-600: #6b6659;  --n-400: #8d8779;
  --n-200: #cbc4b3;  --n-050: #f3f0e9;  --n-000: #ffffff;
  --d-500: #d93b1e;  --g-500: #1f8a5f;
}

/* 2 — SEMANTIC: the only names components may use. */
:root {
  --color-bg:        var(--n-050);
  --color-surface:   var(--n-000);
  --color-surface-2: var(--n-200);
  --color-border:    var(--n-200);
  --color-text:      var(--n-900);
  --color-text-muted:var(--n-600);
  --color-accent:    var(--v-500);
  --color-accent-ink:var(--v-600);
  --color-accent-soft:var(--v-100);
  --color-danger:    var(--d-500);
}
[data-theme='dark'] {
  --color-bg: #12120c; --color-surface: #1c1b14; --color-border: #33312a;
  --color-text: #f3f0e9; --color-text-muted: #a49e8f; --color-accent: #8e9bff;
}

/* 3 — COMPONENT RECIPES: radius/elevation/motion live here too. */
:root {
  --radius-sm: 8px; --radius-md: 12px; --radius-lg: 16px;
  --shadow-1: 0 1px 2px rgba(22,21,15,.06), 0 1px 1px rgba(22,21,15,.04);
  --shadow-2: 0 12px 32px -12px rgba(22,21,15,.28);
  --ease-out: cubic-bezier(.22,.61,.36,1);
  --dur-fast: 120ms; --dur-base: 200ms; --dur-slow: 320ms;
}`,
  },
  {
    id: "f2",
    group: "frontend",
    index: 2,
    title: "The Button primitive: states are the product",
    rabbyFile: "Rabby — src/ui/component/Button/index.tsx (+ style.less)",
    thruFile: "Thru — inline attributes from src/ui/kit/dom.js h()",
    severity: "BLOCKER",
    verdict:
      "Cheap-feeling wallets fail on button states, not button colours: no loading, no disabled rationale, no press depth. This single file is the highest-leverage fix in the whole audit.",
    rabby: `// src/ui/component/Button/index.tsx (abridged)
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'primary' | 'default' | 'ghost' | 'danger';
  size?: 'small' | 'middle' | 'large';
  loading?: boolean;
  ghost?: boolean;
  block?: boolean;      // full width — the popup default
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { type = 'default', size = 'large', loading, block, ...rest } = props;
  return (
    <button
      ref={ref}
      disabled={rest.disabled || loading}
      className={cx('btn', 'btn-' + type, 'btn-' + size, { 'btn-block': block })}
      {...rest}
    >
      {loading && <SvgIcon name="loading" className="animate-spin" />}
      <span>{props.children}</span>
    </button>
  );
});`,
    thru: `// every route re-derives the button. There is no primitive,
// so "primary", the padding, the hover and the disabled state drift.
// src/ui/app/routes/send.js (abridged)

const submit = h('button', {
  class: 'btn btn-primary',
  onClick: () => send(),
}, 'Send');

// ...later, for the same action, in accounts.js:
h('button', {
  class: 'btn primary wide',
  style: 'padding:12px 14px;border-radius:10px',
  onClick: () => open(),
}, 'Confirm');

// No loading state at all: the user taps, nothing moves, they tap again.
// A wallet that double-submits a transaction is a wallet that loses funds.`,
    fix:
      "Write one Button primitive with an exhaustive state matrix (idle / hover / pressed / focus-visible / loading / disabled) and force every route through it. Add a pending guard that disables the control for the duration of the bridge round-trip.",
    fixCode: `// src/ui/kit/button.js — the only button in the codebase.
import { h } from './dom.js';

const VARIANTS = ['primary', 'secondary', 'ghost', 'danger'];
const SIZES    = { sm: 'btn--sm', md: 'btn--md', lg: 'btn--lg' };

export function button({
  label, onClick, variant = 'primary', size = 'md',
  loading = false, disabled = false, icon = null, block = true, type = 'button',
}) {
  const el = h('button', {
    class: ['btn', 'btn--' + variant, SIZES[size], block ? 'btn--block' : '']
      .filter(Boolean).join(' '),
    type,
    disabled: disabled || loading,
    'aria-busy': String(loading),
    onClick,
  });

  const labelEl = h('span', { class: 'btn__label' }, label);
  el.append(h('span', { class: 'btn__face' },
    [icon, labelEl, loading ? spinner() : null].filter(Boolean)));
  return el;
}

function spinner() {
  return h('span', { class: 'btn__spinner', 'aria-hidden': 'true' });
}

// usage — the pending guard is the whole point
submit = button({
  label: 'Send ' + amount + ' THRU',
  loading: pending,
  onClick: async () => {
    if (pending) return;
    setPending(true);
    try   { await bridge.send('tx.send', payload); }
    finally { setPending(false); }
  },
});`,
  },
  {
    id: "f3",
    group: "frontend",
    index: 3,
    title: "Popup shell: rhythm, hierarchy and the 360px contract",
    rabbyFile: "Rabby — src/ui/views/Dashboard + src/ui/component/Navbar|Popup",
    thruFile: "Thru — src/ui/app/routes/dashboard.js + src/ui/app/layout/*",
    severity: "MAJOR",
    verdict:
      "Rabby's popup reads as one composed object: fixed chrome, one accent, one card grammar. Yours reads as a stack of boxes that each started fresh — the classic generated look.",
    rabby: `// popup is 360 x 600. Chrome is FIXED; only the body scrolls.
<div className="dashboard">
  <Navbar
    left={<AccountPicker />}          /* pill: identicon + name + chevron */
    right={<SettingsEntry />}         /* one icon, one target */
  />
  <div className="dashboard-body">     /* padding: 16px; gap: 12px */
    <Card className="balance">         /* one card grammar, reused */
      <TokenList />
    </Card>
  </div>
  <div className="tabbar">             /* fixed bottom, 5 equal slots */
    <TabItem icon="wallet"  label="Assets" />
    <TabItem icon="swap"    label="Swap" />
    <TabItem icon="history" label="History" />
  </div>
</div>`,
    thru: `// src/ui/app/routes/dashboard.js (abridged)
h('div', { class: 'screen' }, [
  h('header', { class: 'top' }, [ /* back? title? actions? */ ]),
  h('section', { class: 'card balance-card' }, [
    h('div', { class: 'amount' }, format(amount)),
    h('div', { class: 'sub' },   usd),
  ]),
  h('section', { class: 'card actions' }, [ /* 4 buttons, unequal widths */ ]),
  h('section', { class: 'card list' },    [ /* rows, no divider system */ ]),
]);

/* Measured drift across the 14 routes:
   card padding 12/14/16/20px · header height 52/56/60px
   button radius 8/10/12px · 3 different "muted" greys
   → the eye reads it as unfinished, because it is. */`,
    fix:
      "Lock the shell first: 360×600, fixed header (56px), fixed tab bar (56px), scrolling body at a 16px gutter and a 12px vertical rhythm. Then run a route sweep and fail the build when a route uses a spacing or radius value outside the token set.",
    fixCode: `/* src/popup/styles/shell.css — one shell, every route. */
.popup {
  width: 360px; height: 600px;
  display: grid;
  grid-template-rows: 56px minmax(0, 1fr) 56px;  /* header / body / tabbar */
  background: var(--color-bg);
  color: var(--color-text);
}
.popup__header { padding: 0 16px; border-bottom: 1px solid var(--color-border); }
.popup__body   { overflow-y: auto; padding: 16px; display: grid;
                 gap: 12px; align-content: start;
                 scrollbar-width: thin; }
.popup__tabbar { border-top: 1px solid var(--color-border); display: grid;
                 grid-template-columns: repeat(var(--tab-count), 1fr); }

/* rhythm: every vertical value is a multiple of 4. No exceptions. */
.stack   { display: grid; gap: 12px; }
.stack-s { display: grid; gap: 8px;  }
.stack-l { display: grid; gap: 20px; }

/* one card grammar replaces every ad-hoc .card* variant */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px;
  box-shadow: var(--shadow-1);
}`,
  },
  {
    id: "f4",
    group: "frontend",
    index: 4,
    title: "Type, icon and motion craft — where the cheapness lives",
    rabbyFile: "Rabby — src/ui/style/* + src/ui/component/SvgIcon + Less transitions",
    thruFile: "Thru — src/ui/kit/icon.js (path data) + per-route CSS",
    severity: "MAJOR",
    verdict:
      "Your icon discipline is already right — path data, no markup. What is missing is everything around it: a type scale with a real display cut, and motion with one easing and three durations.",
    rabby: `/* one type scale, applied everywhere (abridged from Less mixins) */
.title   { font-size: 20px; font-weight: 500; letter-spacing: -.2px; }
.balance { font-size: 32px; font-weight: 600; letter-spacing: -.6px;
           font-variant-numeric: tabular-nums; }
.body    { font-size: 15px; line-height: 1.4; }
.desc    { font-size: 13px; color: var(--color-secondary); }
.amount  { font-variant-numeric: tabular-nums; }   /* numbers never jitter */

/* one easing, three durations */
.transition { transition: all var(--dur-base) var(--ease-out); }
.btn:active { transform: scale(.98); }`,
    thru: `/* src/ui/app/routes/*.js — heading size set per screen by feel */
h('h2', { class: 'title' }, 'Send')            /* 18px on one route, */
h('h1', { class: 'title big' }, 'Send')        /* 21px on another   */

/* numbers are proportional, so 1.234 THRU and 8.888 THRU
   have different widths and the balance line twitches on refresh */
h('div', { class: 'amount' }, format(amount));

/* transitions: none declared. Every screen change is an instant
   pop — the single loudest "this is a prototype" signal. */`,
    fix:
      "Adopt a 1.333 type scale off a 15px body, force tabular figures on every amount, and declare the motion contract once. Add a 120ms scale(.98) press and a 200ms cross-fade on route change; that alone removes most of the perceived roughness.",
    fixCode: `/* tokens.css — type + motion contract */
:root {
  /* 1.333 scale from a 15px body, with a display cut for balances */
  --fs-caption: 11px;  --fs-body: 15px;  --fs-title: 20px;
  --fs-display: 32px;  --fs-hero: clamp(34px, 9vw, 44px);
  --lh-tight: 1.15; --lh-body: 1.45;
  --tracking-title: -0.012em; --tracking-hero: -0.03em;

  --ease-out: cubic-bezier(.22, .61, .36, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
  --dur-fast: 120ms; --dur-base: 200ms; --dur-slow: 320ms;
}
.num, .amount, .balance { font-variant-numeric: tabular-nums; }

/* src/ui/kit/motion.js — one cross-fade helper, used by the router */
export function enter(el) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  el.animate(
    [{ opacity: 0, transform: 'translateY(4px)' },
     { opacity: 1, transform: 'none' }],
    { duration: 200, easing: 'cubic-bezier(.22,.61,.36,1)' }
  );
}
.btn:active:not(:disabled) { transform: scale(.98); transition: transform 120ms; }`,
  },
  {
    id: "f5",
    group: "frontend",
    index: 5,
    title: "Missing surface: the notification window is half the product",
    rabbyFile: "Rabby — src/ui/views/Approval (SignText / SignTx / SignTypedData)",
    thruFile: "Thru — src/ui/app/routes/* (popup + sidePanel only)",
    severity: "BLOCKER",
    verdict:
      "Rabby's credibility comes from one screen: the approval window. You have signing as a route inside the popup, which is correct for a chain with no dApp surface — until the day a provider lands.",
    rabby: `// src/ui/views/Approval/index.tsx (abridged)
// A dApp request opens a NOTIFICATION window — never the popup.
// SortHat resolves wallet state, then routes on approval.data.uiType:
switch (uiType) {
  case 'SignText':       return <SignText  />;
  case 'SignTypedData':  return <SignTypedData />;
  case 'SignTx':         return <SignTx />;   // + simulation + security check
  case 'RequestAddress': return <Connect />;
}

// src/ui/views/Approval/components/SignTx.tsx (abridged)
<SecurityCheckBadge />        /* pre-sign scan: risky spender, phishing  */
<BalanceChange />             /* what the user loses, before they sign   */
<GasSelector />
<Footer><Button block loading={isLoading}>Sign</Button></Footer>`,
    thru: `// Signing is password-gated (auth: 'signing') — good, and stricter
// than Rabby's default. But it is one route among 14:
//
//   src/ui/app/routes/send.js → modal('password') → bridge.send('tx.send')
//
// There is no surface that states WHAT is being signed in human terms:
// no decoded instruction list, no balance delta, no origin binding.
// For an unknown program the user is signing a byte blob blind. */
const ok = await modal.password({ reason: 'Sign this transaction' });
await bridge.send('tx.send', payload);`,
    fix:
      "Build an Approval surface now, even with no dApp provider: a dedicated full-height route that renders the decoded instruction list, the exact delta to every balance, the fee, the network, and a 'what you are signing' sentence. When a provider contract is eventually verified, this route is the window that opens.",
    fixCode: `// src/ui/app/routes/approval.js — one surface, three uiTypes
// mounted by test-route-lifecycle.mjs like every other route.
export function approval(ctx) {
  const { request } = ctx;
  return h('div', { class: 'screen approval' }, [
    originBar(request.origin),                                  /* who asks */
    h('h1', { class: 'approval__verb' }, verbOf(request.type)), /* what   */
    previewPanel(request),                                      /* decoded */
    deltaPanel(request),       /* every balance change, signed + direction */
    feePanel(request),         /* fee + reserve, tabular figures            */
    footer(
      button({ label: 'Reject', variant: 'ghost', onClick: () => ctx.reject() }),
      button({ label: 'Sign',   loading: ctx.pending,
               onClick: () => ctx.approve() }),
    ),
  ]);
}

function verbOf(t) {
  return { signTransaction: 'Sign this transaction',
           signMessage:     'Sign this message',
           connect:         'Connect to this site' }[t] ?? 'Approve request';
}`,
  },

  /* ─────────────────────────── BACKEND ─────────────────────────── */
  {
    id: "b1",
    group: "backend",
    index: 1,
    title: "Message surface: a 74-method allowlist beats a reflected controller",
    rabbyFile: "Rabby — src/utils/message/* + background window.wallet",
    thruFile: "Thru — src/shared/contract/manifest.js + src/background/api-router.js",
    severity: "HOLD",
    verdict:
      "Keep yours. Rabby exposes walletController to its own contexts by mounting it on the background window; your signed, validated, allowlisted contract is the smaller and better attack surface — do not 'modernise' this towards Rabby.",
    rabby: `// src/utils/message/message.ts (abridged) — a generic RPC envelope
// that reflects straight into the wallet controller's method table.
const walletController = new WalletController();
Object.keys(walletController).forEach((key) => {
  if (typeof walletController[key] === 'function') wallet[key] = walletController[key];
});
// background window is reachable from any extension page via
// chrome.runtime.getBackgroundPage() — trust is intra-extension.
// Consequence: every public method is callable by every context.`,
    thru: `// src/shared/contract/manifest.js — contract v7, 74 methods.
// A method either exists here and is dispatched, or it is rejected.
export const manifest = {
  'vault.create':   { auth: 'password', returns: 'json' },
  'vault.unlock':   { auth: 'none',     returns: 'json' },
  'account.sign':   { auth: 'signing',  returns: 'json' },
  'secret.export':  { auth: 'password', returns: 'json' },
  'network.setActive': { auth: 'password', returns: 'json' },
  // ...
};

// src/background/api-router.js
export async function route(method, params, ctx) {
  const spec = manifest[method];
  if (!spec) return deny('UNKNOWN_METHOD', method);
  await assertAuth(spec.auth, ctx);
  assertContract(method, params);          // shape + JSON-serialisability
  return dispatch(method, params, ctx);
}`,
    fix:
      "Nothing to fix here — record it as a deliberate divergence in AGENTS.md so a future agent stops trying to port Rabby's controller reflection. Two additions though: bind every request to its sender tab id, and version the contract so the UI and background cannot drift across an MV3 worker restart.",
    fixCode: `// 1 — sender binding. A method call without a trusted origin is denied.
export async function route(method, params, ctx) {
  const spec = manifest[method];
  if (!spec) return deny('UNKNOWN_METHOD', method);
  if (spec.origin !== 'internal' && !ctx.senderId) return deny('NO_SENDER');
  await assertAuth(spec.auth, ctx);
  assertContract(method, params);
  return dispatch(method, params, ctx);
}

// 2 — contract version handshake. The UI prints it in Settings › About;
//    test-contract.mjs fails if the two drift.
export const CONTRACT_VERSION = 7;
bridge.send('meta.hello').then(({ contractVersion }) => {
  if (contractVersion !== CONTRACT_VERSION) forceReload('CONTRACT_DRIFT');
});`,
  },
  {
    id: "b2",
    group: "backend",
    index: 2,
    title: "Vault: your KDF beats Rabby's — but auto-lock is missing",
    rabbyFile: "Rabby — src/background/service/keyring/index.ts (MetaMask keyring fork)",
    thruFile: "Thru — src/lib/vault.js (737 lines)",
    severity: "MAJOR",
    verdict:
      "PBKDF2-600k with AES-256-GCM and session-only plaintext is ahead of Rabby's forked keyring vault. What it lacks is the boring, essential half: a background-driven auto-lock that survives the MV3 worker being killed.",
    rabby: `// MetaMask-derived keyring controller, stored in chrome.storage.local
// (docs/background.md: "encrypted with aes, and store in chrome local storage")
async persistAllKeyrings() {
  const encryptedKeyrings = await Promise.all(
    this.keyrings.map(async (keyring) => ({
      type: keyring.type,
      data: await keyring.serialize(),
    })),
  );
  await this.store.updateAll({ vault: await this.encryptor.encrypt(password, {
    data: encryptedKeyrings, iv, salt,
  })});
}
// The decrypted keyring set lives in memory of the background page for the
// whole session — MV2 keeps that page alive, so the timeout is the guard.`,
    thru: `// src/lib/vault.js — good primitives, correctly scoped.
// PBKDF2-SHA256 600,000 iterations → AES-256-GCM.
//   chrome.storage.local   : the encrypted blob only
//   chrome.storage.session : decrypted vault + derived key (memory-ish)
// Password verification re-checks the ENCRYPTED BLOB, not session state.

export async function unlock(password) {
  const blob = await chrome.storage.local.get('vault');
  const plain = await decrypt(password, blob.vault);     // AES-256-GCM
  await chrome.storage.session.set({ vault: plain, key: derive(password) });
  // ...and then nothing ever locks it again unless the user asks.
  // MV3 kills the worker; storage.session survives to 30 days.
  // A stolen laptop is a wallet left unlocked. */
}`,
    fix:
      "Add a chrome.alarms-driven idle lock with a hard ceiling, persist the deadline so it survives worker teardown, and re-verify against the encrypted blob on every password-gated call (you already do the second). Lock on windows removal and on browser suspend.",
    fixCode: `// src/background/services/session-service.js
const IDLE_LIMIT_MS = 15 * 60_000;   // idle
const HARD_LIMIT_MS = 8 * 60 * 60_000; // absolute ceiling, never extended

export async function armAutoLock() {
  const now = Date.now();
  await chrome.storage.session.set({
    lockAt: now + IDLE_LIMIT_MS,
    hardLockAt: (await getHardLockAt()) ?? now + HARD_LIMIT_MS,
  });
  chrome.alarms.create('vault.lock', { when: Math.min(...await deadlines()) });
}

export async function touch() {          // called by api-router on every call
  if (!(await isUnlocked())) return;
  await armAutoLock();
}

chrome.alarms.onAlarm.addListener(async (a) => {
  if (a.name !== 'vault.lock') return;
  const [idle, hard] = await deadlines();
  if (Date.now() >= Math.min(idle, hard)) await lock('timeout');
  else chrome.alarms.create('vault.lock', { when: Math.min(idle, hard) });
});

chrome.runtime.onSuspend.addListener(() => lock('suspend'));
chrome.windows.onRemoved.addListener(() => lock('window-closed'));

// privacy: clear session state and close every approval on lock
async function lock(reason) {
  await chrome.storage.session.remove(['vault', 'key']);
  await eventService.emit('vault.locked', { reason });
}`,
  },
  {
    id: "b3",
    group: "backend",
    index: 3,
    title: "RPC flow: adopt a middleware pipeline, not an if-ladder",
    rabbyFile: "Rabby — src/background/controller/provider/rpcFlow.ts",
    thruFile: "Thru — src/background/services/* + src/lib/thru-client.js",
    severity: "MAJOR",
    verdict:
      "Rabby's request path is a composable middleware chain — wallet state, approval, rate limit, execution, error reporting. Yours is a switch with auth in front. The chain is what makes signing auditable.",
    rabby: `// src/background/controller/provider/rpcFlow.ts (abridged)
const flow = new Flow();
flow.use(this.connect);            /* session + origin binding          */
flow.use(this.getWalletState);     /* locked? -> approval job           */
flow.use(this.securityCheck);      /* pre-transaction scan              */
flow.use(this.requestApproval);    /* opens the notification window     */
flow.use(this.reportError);        /* normalised errors back to the dApp*/
flow.use(providerController[req.method]);
// Each step is separately testable and the order is explicit.`,
    thru: `// src/background/api-router.js — auth, then dispatch. Correct, but
// every service re-implements its own preconditions.
async function txSend(params, ctx) {
  await assertAuth('signing', ctx);
  if (!networkService.isActive()) throw new Error('NETWORK_UNBOUND');
  if (!vault.canSign(params.from)) throw new Error('NO_KEY');
  // ...fee check, nonce, encoding, emit, history indexing
}

// Bugs hide in the missing middle: an error thrown here reaches the UI as
// an untyped string, and nothing records that a signature was requested.`,
    fix:
      "Extract an explicit ordered pipeline with one normalised error envelope and one audit event per attempt. The pipeline is the place a future pre-sign simulation plugs in — the same hook Rabby uses for its security check.",
    fixCode: `// src/background/pipeline.js
export function pipeline(...steps) {
  return async (method, params, ctx) => {
    const state = { method, params, ctx };
    for (const step of steps) {
      try { await step(state); }
      catch (e) {
        await audit.record('call.rejected', { method, code: e.code ?? 'INTERNAL' });
        return { ok: false, error: { code: e.code ?? 'INTERNAL',
                                    message: e.message, data: e.data ?? null } };
      }
    }
    const result = await dispatch(state);
    await audit.record('call.ok', { method });
    return { ok: true, result };
  };
}

// src/background/services/* — small, ordered, individually tested
const signFlow = pipeline(
  requireSession,      /* sender bound, unlocked                        */
  requireAuth('signing'),
  validateContract,    /* manifest shape                                */
  validateNetwork,     /* configuredNetwork() bound to this request     */
  simulateOrExplain,   /* decoded instruction preview, human sentence   */
  requireApproval,     /* modal route — same surface as §03 pane 5      */
  execute,
);`,
  },
  {
    id: "b4",
    group: "backend",
    index: 4,
    title: "Provider injection: the one place you must NOT copy Rabby",
    rabbyFile: "Rabby — src/contentscript.js + src/pageProvider.js (EIP-1193)",
    thruFile: "Thru — deliberately absent (see README › Security basics)",
    severity: "HOLD",
    verdict:
      "Thru is not EVM and Thru has no verified extension provider contract. Fabricating window.thru from an iframe SDK is how a wallet becomes a liability. Keep the quarantine — but build the seam now so the day the spec lands is a two-file change.",
    rabby: `// contentscript.js injects pageProvider.js into the page context and
// bridges both directions over window.postMessage + port.postMessage.
const provider = new CustomEvent('ethereum#initialized'); // EIP-1193
window.ethereum = new EthProvider({ /* request, on, emit */ });

port.onMessage.addListener((msg) => {
  if (msg.type === 'broadcast') provider.emit(msg.event, msg.data);
});`,
    thru: `// README › Security basics
//   "Do not invent a fake window.thru provider or infer extension
//    compatibility from the hosted connect(), getSigningContext()
//    and signTransaction() methods. Wait for a verified
//    extension/BYO-signer contract."
//
// Correct. But today the seam does not exist at all: there is no
// contentscript entry in build.mjs, no flag, and no request table —
// so the day the contract is published the work starts from zero.
*/
`,
    fix:
      "Keep the surface at zero. Ship only the seam: a disabled flag, a request table with every method marked UNVERIFIED, and a build entry that is compiled but never injected. Rejected-by-default is a spec, silence is not.",
    fixCode: `// src/shared/flags.js
export const flags = {
  PROVIDER_INJECTION: false,   // hard-off until the contract is verified
};

// src/shared/provider-contract.js — the shape, without the promise
export const PROVIDER_METHODS = {
  'thru_requestAccounts':  { status: 'UNVERIFIED', needs: 'extension contract' },
  'thru_signTransaction':  { status: 'UNVERIFIED', needs: 'BYO-signer spec' },
  'thru_getSigningContext':{ status: 'UNVERIFIED', needs: 'extension contract' },
};
export const isProviderEnabled = () =>
  flags.PROVIDER_INJECTION === true &&
  Object.values(PROVIDER_METHODS).every((m) => m.status === 'VERIFIED');

// scripts/check-provider.mjs — npm test fails if anything injects early
// grep src/ for 'window.thru', 'ethereum#initialized', 'inpage' → 0 hits`,
  },
  {
    id: "b5",
    group: "backend",
    index: 5,
    title: "Network binding, openapi and the data layer you still owe",
    rabbyFile: "Rabby — src/background/service/chain.ts + openapi.ts + preference.ts",
    thruFile: "Thru — src/lib/networks.js (193 lines) + configureNetwork()",
    severity: "MAJOR",
    verdict:
      "You already learned Rabby's hardest lesson the hard way — a memoised client makes network switching cosmetic — and fixed it with configureNetwork(). The remaining gap is the read layer: Rabby never shows a spinner that can lie.",
    rabby: `// src/background/service/openapi.ts (abridged) — one debounced,
// cached, rate-limited data gateway. Every view reads through it.
const Openapi = {
  async httpPost(path, params) {
    const res = await rateLimiter(() => fetch(host + path, { method: 'POST', body }));
    return res;                       // + error normalisation, retry, cache
  },
  async getBalance(addr)   { return this.cache('bal:' + addr, () => this.httpPost('/v1/user/balance', { addr })); },
  async checkTx(tx)        { return this.httpPost('/v1/wallet/transaction/submit', tx); },
};
// service/chain.ts — chain list, auto-switch by dApp chainId, per-chain state.`,
    thru: `// src/lib/networks.js — every network is data, per-network fields are
// explicit: rpcUrl, explorerUrl, three program addresses,
// faucetStateAccount, faucetMaxPerClaim, baseFeeUnits, feeReserveUnits.
export async function configureNetwork(config) {
  client.rpcUrl = config.rpcUrl;
  client.programs = config.programs;   // contract v7: this is MANDATORY
}
// contract v7 quarantines custom activation and self-heals a stale
// active id to Alphanet before this binding call. Strong.

// Still missing: a read layer with cache + in-flight dedupe + stale flags.
// Balances and history currently refetch per render and can flash empty,
// which reads as "broken" rather than "loading".
*/
`,
    fix:
      "Add one read gateway above thru-client: in-flight de-duplication, a 15s cache, and an explicit data state (idle | loading | fresh | stale | error) rendered as skeleton, never as 0.00 THRU. Zero and unknown must never look the same.",
    fixCode: `// src/background/services/read-service.js
const cache = new Map();     // key -> { at, value }
const inflight = new Map();  // key -> Promise
const TTL = 15_000;

export function read(key, fetcher) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return Promise.resolve({ state: 'fresh', ...hit.value });
  if (inflight.has(key)) return inflight.get(key));
  const p = fetcher().then((v) => {
    cache.set(key, { at: Date.now(), value: v });
    inflight.delete(key);
    return { state: hit ? 'stale' : 'loading-done', ...v };
  }).catch((e) => ({ state: 'error', error: e.message }));
  inflight.set(key, p);
  return p;
}

// UI rule, enforced in the balance widget:
//   state === 'error' || 'loading'  → skeleton, NEVER 0.00 THRU
//   state === 'stale'               → show cached value + a 40% opacity rule`,
  },
];

export const frontendPanes = panes.filter((p) => p.group === "frontend");
export const backendPanes = panes.filter((p) => p.group === "backend");
export const rabbbyNote = RABBY_NOTE;
