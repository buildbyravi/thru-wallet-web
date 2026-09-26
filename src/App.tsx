import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  FileText,
  GitBranch,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import {
  aiMcp,
  architectureFlow,
  buildAiBrief,
  codeSamples,
  docs,
  featureGroups,
  heroMetrics,
  navItems,
  openDocSlots,
  roadmap,
  securityPrinciples,
  site,
  updates,
} from "./data/site";

function isExternal(path: string) {
  return path.startsWith("http://") || path.startsWith("https://");
}

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
          },
          () => undefined,
        );
      }}
      className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:border-accent hover:text-accent"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : label}
    </button>
  );
}

function downloadText(filename: string, body: string) {
  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16 md:py-24">
      <div className="section-rule pt-5">
        <p className="label text-accent">{eyebrow}</p>
        <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(280px,0.55fr)] lg:items-end">
          <h2 className="max-w-[13ch] text-[clamp(34px,5.5vw,72px)] font-[700] leading-[0.94] tracking-[-0.055em]">
            {title}
          </h2>
          {lead && <p className="max-w-[48ch] text-[18px] leading-[1.55] text-muted md:text-[20px]">{lead}</p>}
        </div>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function LinkIcon({ path }: { path: string }) {
  return isExternal(path) ? <ExternalLink className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />;
}

function CodeCard({ title, code }: { title: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-ink text-paper shadow-soft">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-paper/65">
          <TerminalSquare className="h-4 w-4 text-accent-soft" />
          {title}
        </div>
        <CopyButton text={code} label="Copy" />
      </div>
      <pre className="overflow-auto px-5 py-5 text-[13px] leading-[1.7] text-paper/80">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function WalletMock() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="absolute -inset-8 rounded-[48px] bg-accent/10 blur-3xl" />
      <div className="relative rounded-[36px] border border-ink/10 bg-ink p-3 shadow-soft">
        <div className="rounded-[28px] bg-[#f8f6ef] p-4 text-ink">
          <div className="flex items-center justify-between border-b border-rule pb-4">
            <div>
              <p className="label text-muted">Thru Wallet</p>
              <p className="mt-1 text-[15px] font-semibold">Alphanet account</p>
            </div>
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-5 rounded-[24px] bg-white p-5 shadow-card">
            <p className="label text-muted">Spendable balance</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="mono text-[44px] font-black leading-none tracking-[-0.07em]">12.480</span>
              <span className="mb-1 text-sm font-bold text-muted">THRU</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {['Send', 'Receive', 'Faucet'].map((action) => (
                <div key={action} className="rounded-2xl border border-rule bg-paper px-3 py-3 text-center text-[12px] font-bold">
                  {action}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {[
              ["Native transfer", "pending review", "+1 block"],
              ["Token balances", "fresh", "now"],
              ["History cache", "storage paint", "instant"],
            ].map(([name, state, time]) => (
              <div key={name} className="flex items-center justify-between rounded-2xl border border-rule bg-white px-4 py-3">
                <div>
                  <p className="text-[14px] font-bold leading-tight">{name}</p>
                  <p className="text-[12px] text-muted">{state}</p>
                </div>
                <p className="mono text-[11px] text-muted">{time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState<string>(navItems[0].id);
  const reduce = useReducedMotion();
  const aiBrief = useMemo(() => buildAiBrief(), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (firstVisible?.target.id) setActive(firstVisible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.08, 0.25, 0.6] },
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <a href="#overview" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-white shadow-card">
              <LockKeyhole className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-[15px] font-black tracking-[-0.03em]">{site.shortName}</span>
              <span className="label block text-muted">extension site</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-3 py-2 text-[13px] font-bold transition ${
                  active === item.id ? "bg-ink text-white" : "text-muted hover:bg-white/70 hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={site.repoUrl}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-black text-white shadow-card transition hover:bg-accent-ink"
          >
            <GitBranch className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>

      <main>
        <section id="overview" className="relative overflow-hidden px-5 pb-16 pt-32 md:px-8 md:pb-24 lg:pt-40">
          <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute bottom-[-18%] right-[-8%] h-[520px] w-[520px] rounded-full bg-sky/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_450px] lg:items-center">
            <div>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 0.61, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.16em] text-muted shadow-card"
              >
                <Sparkles className="h-4 w-4 text-accent" />
                {site.eyebrow}
              </motion.div>

              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.05, ease: [0.22, 0.61, 0.36, 1] }}
                className="mt-7 max-w-[10ch] text-[clamp(58px,10vw,132px)] font-black leading-[0.82] tracking-[-0.085em]"
              >
                Wallet for the Thru native L1.
              </motion.h1>

              <p className="mt-7 max-w-[62ch] text-[19px] leading-[1.55] text-muted md:text-[22px]">
                {site.summary}
              </p>

              <div className="mt-7 rounded-[28px] border border-warn/25 bg-warn-soft p-5 text-[15px] leading-[1.6] text-warn-ink">
                <strong className="font-black">Status note:</strong> {site.warning}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={site.repoUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[14px] font-black text-white shadow-card transition hover:bg-accent-ink"
                >
                  <GitBranch className="h-4 w-4" />
                  Open extension repo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#docs"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-5 py-3 text-[14px] font-black text-ink shadow-card transition hover:border-accent hover:text-accent"
                >
                  <BookOpen className="h-4 w-4" />
                  Read docs
                </a>
                <a
                  href={site.llmUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-5 py-3 text-[14px] font-black text-ink shadow-card transition hover:border-accent hover:text-accent"
                >
                  <FileText className="h-4 w-4" />
                  llms.txt
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-[13px] text-muted">
                <CopyButton text={aiBrief} label="Copy AI brief" />
                <button
                  type="button"
                  onClick={() => downloadText("thru-wallet-ai-brief.txt", aiBrief)}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:border-accent hover:text-accent"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Download brief
                </button>
                <span>{site.sourceBaseline}</span>
              </div>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.12, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <WalletMock />
            </motion.div>
          </div>

          <div className="relative mx-auto mt-14 grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="rounded-[26px] border border-ink/10 bg-white/70 p-5 shadow-card backdrop-blur">
                <p className="label text-muted">{metric.label}</p>
                <p className="mono mt-3 text-[42px] font-black leading-none tracking-[-0.06em]">{metric.value}</p>
                <p className="mt-3 text-[14px] leading-[1.45] text-muted">{metric.note}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Section
            id="features"
            eyebrow="Product surface"
            title="What the extension is built to do."
            lead="The public site now describes Thru Wallet directly: current shipped surfaces, still-open checks, and the boundaries future features must respect."
          >
            <div className="grid gap-4 md:grid-cols-2">
              {featureGroups.map((group) => (
                <article key={group.title} className="rounded-[30px] border border-ink/10 bg-white/72 p-6 shadow-card">
                  <h3 className="text-[24px] font-black tracking-[-0.04em]">{group.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-[1.55] text-muted">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="architecture"
            eyebrow="Architecture"
            title="Small seams, strict boundaries."
            lead="The extension keeps wallet UI, background auth, services, vault, RPC, and network configuration separate so later product work can be added without touching the sacred layers."
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
              <div className="rounded-[34px] border border-ink/10 bg-white/72 p-6 shadow-card md:p-8">
                <div className="space-y-4">
                  {architectureFlow.map((item, index) => (
                    <div key={item.title} className="grid gap-4 rounded-[24px] border border-ink/10 bg-paper p-5 md:grid-cols-[56px_minmax(0,1fr)]">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-sm font-black text-white">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <h3 className="text-[20px] font-black tracking-[-0.035em]">{item.title}</h3>
                          <code className="rounded-full bg-white px-3 py-1 text-[12px] text-accent-ink">{item.path}</code>
                        </div>
                        <p className="mt-2 text-[15px] leading-[1.55] text-muted">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <CodeCard title="run locally" code={codeSamples.install} />
                <CodeCard title="source shape" code={codeSamples.architecture} />
              </div>
            </div>
          </Section>

          <Section
            id="security"
            eyebrow="Security posture"
            title="No secrets outside the wallet."
            lead="This is the copy users and future contributors should keep seeing: what is safe today, what is deliberately unsupported, and what requires a browser or live-chain verification pass."
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {securityPrinciples.map((principle) => (
                <article key={principle.title} className="rounded-[28px] border border-ink/10 bg-white/72 p-6 shadow-card">
                  <ShieldCheck className="h-6 w-6 text-accent" />
                  <h3 className="mt-5 text-[21px] font-black tracking-[-0.04em]">{principle.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-muted">{principle.body}</p>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="docs"
            eyebrow="Docs hub"
            title="Docs that stay easy to extend."
            lead="New docs and updates are intentionally data-driven: add one markdown file, one card, or one changelog entry without redesigning the page."
          >
            <div className="grid gap-4 lg:grid-cols-3">
              {docs.map((doc) => (
                <a
                  key={doc.title}
                  href={doc.path}
                  className="group rounded-[28px] border border-ink/10 bg-white/72 p-6 shadow-card transition hover:-translate-y-1 hover:border-accent/50"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="label rounded-full bg-accent-soft px-3 py-1 text-accent-ink">{doc.tag}</span>
                    <span className="text-accent transition group-hover:translate-x-1">
                      <LinkIcon path={doc.path} />
                    </span>
                  </div>
                  <h3 className="mt-6 text-[23px] font-black tracking-[-0.045em]">{doc.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-muted">{doc.description}</p>
                  <p className="mt-5 break-all text-[12px] font-bold text-accent-ink">{doc.path}</p>
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-[34px] border border-ink/10 bg-ink p-6 text-white shadow-soft md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="label text-paper/55">Open slots</p>
                  <h3 className="mt-2 text-[28px] font-black tracking-[-0.05em]">Where to add more later</h3>
                </div>
                <a href="/docs/content-guide.md" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-black text-ink">
                  Content guide <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {openDocSlots.map((slot) => (
                  <div key={slot.name} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                    <h4 className="font-black tracking-[-0.03em]">{slot.name}</h4>
                    <p className="mt-2 text-[14px] leading-[1.55] text-paper/70">{slot.edit}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section
            id="updates"
            eyebrow="Changelog"
            title="Updates with minimal edits."
            lead="The page exposes a short update stream and links to a longer markdown changelog. Keep the newest entry first and mirror only the public headline on this page."
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(300px,0.5fr)]">
              <div className="rounded-[34px] border border-ink/10 bg-white/72 p-6 shadow-card md:p-8">
                <div className="space-y-5">
                  {updates.map((update) => (
                    <article key={`${update.date}-${update.title}`} className="border-b border-rule pb-5 last:border-0 last:pb-0">
                      <p className="label text-accent">{update.date}</p>
                      <h3 className="mt-2 text-[24px] font-black tracking-[-0.045em]">{update.title}</h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-muted">{update.body}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-[34px] border border-ink/10 bg-paper-2 p-6 shadow-card md:p-8">
                <p className="label text-muted">Roadmap boundaries</p>
                <div className="mt-5 space-y-4">
                  {roadmap.map((item) => (
                    <div key={item.step} className="rounded-[22px] bg-white/72 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="mono text-[13px] font-black text-accent-ink">{item.step}</span>
                        <span className="rounded-full bg-paper px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-muted">
                          {item.status}
                        </span>
                      </div>
                      <h3 className="mt-3 text-[18px] font-black tracking-[-0.03em]">{item.title}</h3>
                      <p className="mt-2 text-[14px] leading-[1.55] text-muted">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section
            id="ai"
            eyebrow="AI and MCP"
            title="Readable by agents, safe for humans."
            lead="The site provides llms.txt and MCP guidance while keeping the wallet's human approval and signing boundaries intact."
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)]">
              <div className="rounded-[34px] border border-ink/10 bg-white/72 p-6 shadow-card md:p-8">
                <h3 className="text-[28px] font-black tracking-[-0.05em]">MCP companion rule</h3>
                <p className="mt-4 text-[17px] leading-[1.65] text-muted">{aiMcp.localRule}</p>

                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {[
                    ["Allowed reads", aiMcp.allowed],
                    ["Protected intents", aiMcp.protected],
                    ["Forbidden", aiMcp.forbidden],
                  ].map(([title, items]) => (
                    <div key={title as string} className="rounded-[24px] border border-ink/10 bg-paper p-5">
                      <h4 className="text-[17px] font-black tracking-[-0.03em]">{title as string}</h4>
                      <ul className="mt-4 space-y-2">
                        {(items as readonly string[]).map((item) => (
                          <li key={item} className="text-[13px] leading-[1.45] text-muted">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={aiMcp.explorerMcp} className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-[13px] font-black text-white">
                    Explorer MCP <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a href={aiMcp.protocolLlm} className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-[13px] font-black text-ink">
                    Protocol llm.txt <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a href={site.mcpUrl} className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-[13px] font-black text-ink">
                    Website MCP doc <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <CodeCard title="AI read first" code={codeSamples.aiContext} />
            </div>
          </Section>
        </div>
      </main>

      <footer className="mt-12 border-t border-ink/10 bg-ink px-5 py-10 text-paper md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[24px] font-black tracking-[-0.05em]">{site.name}</p>
            <p className="mt-2 max-w-[68ch] text-[14px] leading-[1.6] text-paper/65">
              Built for the extension at <a className="text-accent-soft underline underline-offset-4" href={site.repoUrl}>buildbyravi/thru-wallet-ext</a>. Keep docs factual, short, and explicit about unsupported states.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="rounded-full border border-white/15 px-4 py-2 text-[13px] font-black text-paper/80 hover:text-white" href="/docs/changelog.md">
              Changelog
            </a>
            <a className="rounded-full border border-white/15 px-4 py-2 text-[13px] font-black text-paper/80 hover:text-white" href="/llms.txt">
              llms.txt
            </a>
            <a className="rounded-full border border-white/15 px-4 py-2 text-[13px] font-black text-paper/80 hover:text-white" href={site.repoUrl}>
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
