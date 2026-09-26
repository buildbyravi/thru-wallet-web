import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DiffPlate } from "./components/DiffPlate";
import { ScorePlate } from "./components/ScorePlate";
import { ArchDiagram } from "./components/ArchDiagram";
import { Section, Note, Stamp, Code, CopyButton } from "./components/parts";
import { panes, frontendPanes, backendPanes, type Severity } from "./data/panes";
import {
  agentManifest,
  buildReport,
  findings,
  motionSpec,
  roadmap,
  tokenSpec,
  type Sev,
} from "./data/audit";

const NAV = [
  ["s00", "00", "Dossier"],
  ["s01", "01", "Scorecard"],
  ["s02", "02", "Architecture"],
  ["s03", "03", "Frontend"],
  ["s04", "04", "Backend"],
  ["s05", "05", "Register"],
  ["s06", "06", "System"],
  ["s07", "07", "Roadmap"],
  ["s08", "08", "Manifest"],
];

const SEV_ORDER: Record<Sev, number> = { BLOCKER: 0, MAJOR: 1, MINOR: 2 };

export default function App() {
  const [active, setActive] = useState("s00");
  const [filter, setFilter] = useState<"ALL" | Sev>("ALL");
  const reduce = useReducedMotion();

  const report = useMemo(() => buildReport(panes), []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.05, 0.25, 0.6] },
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const download = () => {
    const blob = new Blob([report], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "thru-wallet-remediation.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const shown = findings
    .filter((f) => filter === "ALL" || f.sev === filter)
    .sort((a, b) => SEV_ORDER[a.sev] - SEV_ORDER[b.sev]);

  return (
    <div className="grain min-h-screen bg-paper text-ink">
      {/* ── index rail ── */}
      <nav className="fixed left-0 top-0 z-30 hidden h-screen w-[212px] flex-col justify-between border-r border-rule px-6 py-9 xl:flex">
        <div>
          <div className="label text-defect">Thru × Rabby</div>
          <div className="label mt-2 text-warm-2">Teardown dossier</div>
          <ul className="mt-10 space-y-[10px]">
            {NAV.map(([id, num, name]) => (
              <li key={id}>
                <a
                  href={"#" + id}
                  className={
                    "group flex items-baseline gap-3 border-l-2 pl-3 transition-colors duration-[120ms] " +
                    (active === id ? "border-defect" : "border-transparent hover:border-rule")
                  }
                >
                  <span className={"label " + (active === id ? "text-defect" : "text-warm-2")}>{num}</span>
                  <span className={"text-[14px] " + (active === id ? "text-ink" : "text-warm")}>{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mono text-[10px] leading-[1.6] text-warm-2">
          contract v7 · 74 methods
          <br />
          rev. 2026.04
        </div>
      </nav>

      <div className="xl:pl-[212px]">
        <main className="mx-auto max-w-[1250px] px-6 md:px-10">
          {/* ─────────────────────────── 00 MASTHEAD ─────────────────────────── */}
          <header id="s00" className="relative scroll-mt-8 pb-16 pt-10 md:pt-14">
            <div className="hair flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
              <span className="label text-warm">Extension teardown dossier · rev. 2026.04</span>
              <span className="label text-warm-2">Subject: buildbyravi/thru-wallet-ext</span>
            </div>

            <div className="relative mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_38%]">
              <div className="relative z-10">
                <motion.h1
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                  className="text-[clamp(52px,8.4vw,124px)] font-[200] leading-[0.9] tracking-[-0.035em]"
                >
                  Frontend &amp;
                  <br />
                  backend
                  <br />
                  <span className="font-[300] italic">teardown</span>
                </motion.h1>

                <p className="verdict mt-8 max-w-[46ch] text-[21px] leading-[1.4] text-warm">
                  Line by line against <span className="mono text-[16px] not-italic text-ink">RabbyHub/Rabby</span> — with the
                  fixes written out, and one honest warning: you are on a different chain, and half of what makes Rabby good is
                  exactly what you must not copy.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={download}
                    className="label bg-ink px-5 py-[13px] text-paper transition-colors duration-[120ms] hover:bg-rabby-dark"
                  >
                    ↓ Download remediation.md
                  </button>
                  <a
                    href="#s08"
                    className="label border border-ink px-5 py-[12px] transition-colors duration-[120ms] hover:bg-rabby-light"
                  >
                    Agent manifest
                  </a>
                  <span className="text-warm-2">
                    <CopyButton text={report} label="Copy full report" />
                  </span>
                </div>

                <dl className="mono mt-12 grid max-w-[640px] grid-cols-[104px_minmax(0,1fr)] gap-x-5 gap-y-[6px] border-t border-rule pt-5 text-[11.5px]">
                  {[
                    ["SUBJECT", "github.com/buildbyravi/thru-wallet-ext · MV3, esbuild, vanilla ES modules"],
                    ["REFERENCE", "github.com/RabbyHub/Rabby (develop) · React + MobX + webpack, MV2/MV3"],
                    ["SCOPE", "10 comparison panes · 13 findings · 3-phase remediation"],
                    ["BASIS", "contract v7, 74 methods, 14 routes, vault 737 LOC, thru-client 1010 LOC"],
                  ].map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-warm-2">{k}</dt>
                      <dd className="text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative">
                <div className="sticky top-10">
                  <div className="grain min-h-[380px] w-full bg-paper-2 lg:min-h-[520px]">
                    <img
                      src="images/dossier.jpg"
                      alt="Printed engineering teardown dossier on vellum"
                      className="h-[380px] w-full object-cover object-right mix-blend-multiply lg:h-[520px]"
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <motion.div
                    initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.5 }}
                    className="absolute -left-4 top-6 z-20 -rotate-[3.5deg] border-[2px] border-defect bg-paper/90 px-5 py-3 lg:-left-10"
                  >
                    <div className="label text-defect">Verdict</div>
                    <div className="mono mt-1 text-[15px] font-[500] tracking-[0.04em] text-defect">
                      SURFACE LAGS · CORE LEADS
                    </div>
                  </motion.div>
                  <p className="mono mt-3 text-[10px] leading-[1.6] text-warm-2">
                    Plate 00 · teardown spread, vellum proof
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* ─────────────────────────── 01 SCORECARD ─────────────────────────── */}
          <Section
            id="s01"
            num="01"
            kicker="Measured divergence"
            title="Nine axes, scored on shipped surface and enforcement"
            notes={
              <>
                <Note label="How to read it">
                  The filled bar is Thru. The periwinkle tick is Rabby, plotted as the reference point — not a target to hit
                  blindly. Two axes run the other way.
                </Note>
                <Note label="Weighting">
                  A feature that exists but is not enforced by a test scores as if it did not exist. That rule is what puts
                  Thru ahead on A5 and A9.
                </Note>
                <Note label="The gap that matters">
                  A1–A3 and A8 are all visible in the first 200ms of opening the popup. Everything Thru is good at is invisible
                  until something goes wrong.
                </Note>
              </>
            }
          >
            <ScorePlate />
          </Section>

          {/* ─────────────────────────── 02 ARCHITECTURE ─────────────────────────── */}
          <Section
            id="s02"
            num="02"
            kicker="Plate 02 · two stacks"
            title="Four execution contexts, or two"
            notes={
              <>
                <Note label="Where Thru is cleaner">
                  One bridge caller, one DOM sink, one allowlist, and layering enforced over all of src/ by check-layering.mjs.
                  Rabby's walletController is a reflected method table on the background window.
                </Note>
                <Note label="Where Rabby is cleaner">
                  The request path is a middleware chain rather than a switch, so wallet state, approval, security scan and
                  error normalisation are ordered and individually testable.
                </Note>
                <Note label="Do not port">
                  pageProvider.js, ethers, MobX and the webpack build belong to an EVM wallet. Thru is not EVM and has no
                  verified extension provider contract.
                </Note>
              </>
            }
          >
            <ArchDiagram />
            <p className="verdict mt-8 max-w-[64ch] text-[19px] leading-[1.45]">
              Thru already has the harder half of an architecture: a narrow, typed, allowlisted boundary with the crypto
              below it and no UI import in sight. Rabby has the rarer half: a request pipeline where every step is auditable.
            </p>
          </Section>

          {/* ─────────────────────────── 03 FRONTEND ─────────────────────────── */}
          <Section
            id="s03"
            num="03"
            kicker="Frontend teardown · 5 panes"
            title="Why it reads as cheap — in the order the eye finds it"
            wide
            notes={null}
          >
            <p className="verdict max-w-[64ch] text-[19px] leading-[1.45]">
              Nothing here is a technology problem. Vanilla ES modules and a guarded <span className="mono text-[15px] not-italic">h()</span>{" "}
              can look as finished as any React app — the gap is entirely in primitives, tokens and states.
            </p>
            {frontendPanes.map((p) => (
              <DiffPlate key={p.id} pane={p} total={frontendPanes.length} />
            ))}
          </Section>

          {/* ─────────────────────────── 04 BACKEND ─────────────────────────── */}
          <Section
            id="s04"
            num="04"
            kicker="Backend teardown · 5 panes"
            title="Where your backend is already ahead — and where it is one alarm short"
            wide
            notes={null}
          >
            <p className="verdict max-w-[64ch] text-[19px] leading-[1.45]">
              Three of these five panes end in <span className="mono text-[15px] not-italic">HOLD</span>: keep your own design.
              A teardown that only knows how to say "do it like the reference" gets a wallet killed on a different chain.
            </p>
            {backendPanes.map((p) => (
              <DiffPlate key={p.id} pane={p} total={backendPanes.length} />
            ))}
          </Section>

          {/* ─────────────────────────── 05 REGISTER ─────────────────────────── */}
          <Section
            id="s05"
            num="05"
            kicker="Findings register · 13 items"
            title="Everything wrong, stamped and ordered"
            notes={
              <>
                <Note label="Severity rule">
                  BLOCKER = a user can lose funds, secrets or a signature. MAJOR = the product reads as unfinished. MINOR =
                  craft debt that compounds.
                </Note>
                <Note label="Fix order">
                  F-01, F-02 and F-03 are the only three that should touch your next commit. The rest are one sweep.
                </Note>
                <Note label="Already good">
                  h() as the only DOM sink, secret export behind password re-auth, BigInt amounts stringified over messages,
                  focus-trap.js. Do not regress these while fixing the rest.
                </Note>
              </>
            }
          >
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {(["ALL", "BLOCKER", "MAJOR", "MINOR"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFilter(s)}
                  className={
                    "label border px-3 py-[6px] transition-colors duration-[120ms] " +
                    (filter === s
                      ? "border-ink bg-ink text-paper"
                      : "border-rule text-warm hover:border-ink hover:text-ink")
                  }
                >
                  {s}
                  <span className="ml-2 opacity-60">
                    {s === "ALL" ? findings.length : findings.filter((f) => f.sev === s).length}
                  </span>
                </button>
              ))}
            </div>

            <ul className="border-t border-ink">
              {shown.map((f) => (
                <li
                  key={f.id}
                  className="grid gap-x-8 gap-y-3 border-b border-rule py-6 md:grid-cols-[92px_minmax(0,1fr)_minmax(0,1fr)]"
                >
                  <div className="flex items-start gap-3 md:block">
                    <div className="mono text-[13px] font-[500]">{f.id}</div>
                    <div className="md:mt-2">
                      <Stamp sev={f.sev as Severity} />
                    </div>
                    <div className="mono mt-2 text-[10px] text-warm-2">{f.ref}</div>
                  </div>
                  <div>
                    <h3 className="text-[19px] leading-[1.2] tracking-[-0.012em]">{f.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.5] text-warm">{f.detail}</p>
                  </div>
                  <div className="border-l-2 border-rabby pl-4">
                    <div className="label text-warm-2">Fix</div>
                    <p className="mt-2 text-[14.5px] leading-[1.5]">{f.fix}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          {/* ─────────────────────────── 06 SYSTEM ─────────────────────────── */}
          <Section
            id="s06"
            num="06"
            kicker="Design system · the premium feel, as numbers"
            title="The token sheet that makes it stop looking generated"
            notes={
              <>
                <Note label="Why warm paper">
                  A pure #FFFFFF surface with a pure #808080 muted grey is the single most common tell of generated UI. Warm
                  neutrals read as considered because they cannot happen by accident.
                </Note>
                <Note label="One accent rule">
                  #5C6BF5 appears once per screen region. If two things on one screen are periwinkle, one of them is wrong.
                </Note>
                <Note label="Tabular figures">
                  The cheapest quality signal available in a wallet. Amounts stop twitching on every refresh.
                </Note>
              </>
            }
          >
            <div className="overflow-x-auto border border-rule bg-white/60">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink">
                    <th className="label px-5 py-3 text-warm">Token</th>
                    <th className="label px-5 py-3 text-warm">Value</th>
                    <th className="label px-5 py-3 text-warm">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {tokenSpec.map(([name, value, role]) => (
                    <tr key={name} className="border-b border-rule/70 last:border-0">
                      <td className="mono whitespace-nowrap px-5 py-[10px] text-[12.5px]">{name}</td>
                      <td className="mono whitespace-nowrap px-5 py-[10px] text-[12.5px] text-rabby-dark">{value}</td>
                      <td className="px-5 py-[10px] text-[14.5px] leading-[1.45] text-warm">{role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mt-14 text-[24px] font-[350] tracking-[-0.02em]">Motion contract</h3>
            <div className="mt-5 overflow-x-auto border border-rule bg-white/60">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-ink">
                    <th className="label px-5 py-3 text-warm">Event</th>
                    <th className="label px-5 py-3 text-warm">Effect</th>
                    <th className="label px-5 py-3 text-warm">Duration</th>
                    <th className="label px-5 py-3 text-warm">Easing</th>
                    <th className="label px-5 py-3 text-warm">Where</th>
                  </tr>
                </thead>
                <tbody>
                  {motionSpec.map((r) => (
                    <tr key={r[0]} className="border-b border-rule/70 last:border-0">
                      <td className="px-5 py-[10px] text-[15px]">{r[0]}</td>
                      <td className="mono px-5 py-[10px] text-[12px]">{r[1]}</td>
                      <td className="mono px-5 py-[10px] text-[12px] text-rabby-dark">{r[2]}</td>
                      <td className="mono px-5 py-[10px] text-[11px] text-warm">{r[3]}</td>
                      <td className="px-5 py-[10px] text-[14px] leading-[1.45] text-warm">{r[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Code
              code={`/* src/popup/styles/tokens.css — the a11y half of the contract */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
button:focus:not(:focus-visible) { outline: none; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    transition-duration: .001ms !important;
  }
}

/* every amount in the product */
.amount, .balance, .fee, .delta {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.01em;
}`}
              label="D — tokens.css · focus, reduced motion, figures"
              tone="fix"
            />
          </Section>

          {/* ─────────────────────────── 07 ROADMAP ─────────────────────────── */}
          <Section
            id="s07"
            num="07"
            kicker="Migration ladder · 30 days"
            title="Fix order, with the files each step touches"
            notes={
              <>
                <Note label="Estimates">
                  Three phases, one engineer with the build agent on tap. P0 is roughly a week and removes every way a user can
                  lose funds through the interface.
                </Note>
                <Note label="Rule for the agent">
                  One task per commit. Each acceptance criterion must be a script or a test — if it cannot be asserted, it is
                  not done.
                </Note>
              </>
            }
          >
            <div className="space-y-12">
              {roadmap.map((r, i) => (
                <div key={r.phase} className="grid gap-x-8 gap-y-4 border-t border-ink pt-6 md:grid-cols-[132px_minmax(0,1fr)]">
                  <div>
                    <div className="text-[54px] font-[200] leading-[0.85] tracking-[-0.04em]">{r.phase}</div>
                    <div className="label mt-3 text-warm-2">{r.span}</div>
                    <div className="label mt-1 text-defect">{r.title}</div>
                  </div>
                  <ol className="space-y-4">
                    {r.items.map((it) => (
                      <li key={it[0]} className="grid gap-x-6 gap-y-1 border-b border-rule pb-4 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)_74px]">
                        <span className="mono text-[12.5px] text-rabby-dark">{it[0]}</span>
                        <span className="text-[15px] leading-[1.45] text-warm">{it[1]}</span>
                        <span className="mono text-[11px] text-warm-2 md:text-right">{it[2]}</span>
                      </li>
                    ))}
                  </ol>
                  {i === roadmap.length - 1 && <div className="hidden md:block" />}
                </div>
              ))}
            </div>
          </Section>

          {/* ─────────────────────────── 08 MANIFEST ─────────────────────────── */}
          <Section
            id="s08"
            num="08"
            kicker="Agent handoff"
            title="Give this to your build agent verbatim"
            wide
            notes={null}
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-w-0 bg-plate p-6 md:p-9">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-3">
                  <span className="label text-dim">08 · manifest.yaml · {agentManifest.split("\n").length} lines</span>
                  <span className="flex gap-2">
                    <CopyButton text={agentManifest} label="Copy manifest" onDark />
                    <button
                      type="button"
                      onClick={download}
                      className="label border border-white/30 px-2 py-[3px] text-paper transition-colors duration-[120ms] hover:bg-white/10"
                    >
                      ↓ .md
                    </button>
                  </span>
                </div>
                <pre className="mono max-h-[620px] overflow-auto pr-3 text-[11.5px] leading-[1.7] text-[#cfcaba]">
                  <code>{agentManifest}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-[22px] font-[350] leading-[1.15] tracking-[-0.02em]">How to run it</h3>
                <ol className="mt-5 space-y-5">
                  {[
                    ["Fetch both repos", "Have the agent read RabbyHub/Rabby (develop) and buildbyravi/thru-wallet-ext at the same commit, plus AGENTS.md and docs/DEFECT_LOG.md."],
                    ["Paste the manifest", "Section 08 verbatim as the task list. It is ordered: T-01 → T-09, P0 first."],
                    ["One task per commit", "Each acceptance criterion is a script or test. npm test must stay green on every step."],
                    ["Never the stack", "Reject any diff that adds React, MobX, ethers, Less or a window.thru provider."],
                  ].map(([t, d], i) => (
                    <li key={t} className="border-t border-rule pt-4">
                      <div className="flex items-baseline gap-3">
                        <span className="mono text-[12px] text-defect">0{i + 1}</span>
                        <span className="text-[17px] leading-tight">{t}</span>
                      </div>
                      <p className="mt-2 text-[14.5px] leading-[1.5] text-warm">{d}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Section>
        </main>

        {/* ─────────────────────────── COLOPHON ─────────────────────────── */}
        <footer className="relative mt-10 overflow-hidden bg-paper-2">
          <div className="grain min-h-[260px] w-full bg-paper-2 md:min-h-[340px]">
            <img
              src="images/plates.jpg"
              alt="Stacked service manual plates"
              className="h-[300px] w-full object-cover mix-blend-multiply md:h-[380px]"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div className="mx-auto max-w-[1250px] px-6 pb-14 md:px-10">
            <div className="hair grid gap-x-10 gap-y-6 pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_240px]">
              <p className="verdict max-w-[34ch] text-[20px] leading-[1.35]">
                Fix the surface without importing the stack. That is the whole report.
              </p>
              <div className="mono space-y-1 text-[11.5px] text-warm">
                <div>
                  SUBJECT ·{" "}
                  <a className="text-rabby-dark underline decoration-rule underline-offset-4" href="https://github.com/buildbyravi/thru-wallet-ext">
                    github.com/buildbyravi/thru-wallet-ext
                  </a>
                </div>
                <div>
                  REFERENCE ·{" "}
                  <a className="text-rabby-dark underline decoration-rule underline-offset-4" href="https://github.com/RabbyHub/Rabby">
                    github.com/RabbyHub/Rabby
                  </a>
                </div>
                <div className="text-warm-2">Rabby-side snippets abridged from (develop) — re-read each file at HEAD before editing.</div>
              </div>
              <div className="flex items-start justify-start md:justify-end">
                <span className="label border border-ink px-3 py-2">Rev. 2026.04 · 13 findings</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
