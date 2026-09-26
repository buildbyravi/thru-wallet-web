import Link from "next/link";
import { site } from "@/content/site";
import { features } from "@/content/features";
import { changelog } from "@/content/changelog";
import { Badge } from "@/components/Badge";
import { Section } from "@/components/Section";
import { CodeBlock } from "@/components/CodeBlock";

export default function HomePage() {
  const latest = changelog.slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={site.status} />
          <span className="label text-warm-2">{site.network}</span>
        </div>
        <h1 className="mt-6 max-w-[18ch] text-[clamp(38px,7vw,76px)] font-[350] leading-[1.02] tracking-[-0.03em]">
          A self-custody wallet extension, built for Thru&rsquo;s alphanet.
        </h1>
        <p className="mt-6 max-w-[58ch] text-[19px] leading-relaxed text-warm">
          {site.summary} No injected provider, no dApp connections — just real key management,
          balances, faucet claims, and native sends, in your browser.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={site.repos.extension}
            target="_blank"
            rel="noreferrer"
            className="label border border-ink bg-ink px-5 py-3 text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            View source on GitHub
          </a>
          <Link
            href="/docs/installation"
            className="label border border-ink/30 px-5 py-3 text-ink transition-colors hover:bg-ink/10"
          >
            Install the extension
          </Link>
          <Link href="/docs" className="label text-accent-dark underline underline-offset-4">
            Read the docs →
          </Link>
        </div>

        <div className="hair mt-14 grid gap-8 pt-8 sm:grid-cols-3">
          <Stat value="12-word" label="BIP-39 mnemonic, SLIP-0010 Ed25519" />
          <Stat value="600,000" label="PBKDF2 iterations before AES-256-GCM" />
          <Stat value={site.currentContractVersion} label="Current background API contract" />
        </div>
      </section>

      {/* Warning strip */}
      <section className="hair py-8">
        <div className="flex flex-col gap-3 border border-alert/40 bg-alert/5 p-5 sm:flex-row sm:items-start">
          <span className="label shrink-0 text-alert">Warning</span>
          <p className="text-[15px] leading-relaxed text-ink">
            Not production-ready and not security-reviewed. Use alphanet/devnet funds only until a
            security review and mainnet readiness are complete. See the{" "}
            <Link href="/docs/security-model" className="text-accent-dark underline underline-offset-2">
              security model
            </Link>{" "}
            for exactly what is and isn&rsquo;t implemented.
          </p>
        </div>
      </section>

      {/* Features */}
      <Section id="features" eyebrow="01" kicker="What works" title="Everything you need to hold and move THRU on alphanet.">
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="hair pt-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[19px] font-medium leading-snug">{f.title}</h3>
                <Badge tone={f.status} />
              </div>
              <p className="mt-2 text-[14.5px] leading-relaxed text-warm">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Quick install */}
      <Section eyebrow="02" kicker="Get started" title="Load it unpacked in under five minutes.">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_280px]">
          <CodeBlock
            label="install & build"
            code={`git clone ${site.repos.extension}.git\ncd thru-wallet-ext\nnpm install\nnpm run build\n# then chrome://extensions -> Developer mode -> Load unpacked -> dist/`}
          />
          <aside className="space-y-6">
            <div>
              <div className="label text-warm-2">Next</div>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-warm">
                Full walkthrough, including the popup/side-panel reload trap and faucet claims, lives
                in the docs.
              </p>
            </div>
            <Link
              href="/docs/installation"
              className="label inline-block border border-ink/30 px-3 py-[7px] text-ink hover:bg-ink/10"
            >
              Installation guide →
            </Link>
          </aside>
        </div>
      </Section>

      {/* Architecture */}
      <Section eyebrow="03" kicker="Under the hood" title="UI never touches secrets. The background worker does.">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_280px]">
          <ArchDiagram />
          <aside className="space-y-6">
            <div>
              <div className="label text-warm-2">Enforced, not just documented</div>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-warm">
                A manifest-defined contract allowlists every method the UI can call. Signing only
                ever happens in the background service worker.
              </p>
            </div>
            <Link
              href="/docs/architecture"
              className="label inline-block border border-ink/30 px-3 py-[7px] text-ink hover:bg-ink/10"
            >
              Full architecture doc →
            </Link>
          </aside>
        </div>
      </Section>

      {/* Changelog teaser */}
      <Section eyebrow="04" kicker="Shipping log" title="Latest updates.">
        <div className="space-y-8">
          {latest.map((entry) => (
            <div key={entry.version} className="hair grid gap-2 pt-5 sm:grid-cols-[120px_1fr]">
              <div className="flex flex-col gap-2">
                <span className="mono text-[13px] text-warm-2">{entry.date}</span>
                <Badge tone={entry.tag} />
              </div>
              <div>
                <h3 className="text-[18px] font-medium leading-snug">
                  <span className="mono text-warm-2">{entry.version}</span> — {entry.title}
                </h3>
                <ul className="mt-2 space-y-1 text-[14px] leading-relaxed text-warm">
                  {entry.changes.slice(0, 2).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <Link href="/changelog" className="label mt-8 inline-block text-accent-dark underline underline-offset-4">
          Full changelog →
        </Link>
      </Section>

      {/* AI/MCP teaser */}
      <Section eyebrow="05" kicker="Open surface" title="Built to be read by AI agents, and extended by them.">
        <div className="grid gap-6 sm:grid-cols-3">
          <PointerCard
            href="/llms.txt"
            title="/llms.txt"
            body="A short, llms.txt-format index of this project for LLMs, generated straight from the docs."
          />
          <PointerCard
            href="/llms-full.txt"
            title="/llms-full.txt"
            body="Every doc page and the full changelog, concatenated for agents that want the whole corpus at once."
          />
          <PointerCard
            href="/docs/ai-and-mcp"
            title="AI agents & MCP"
            body="The safety model for any future wallet MCP companion, plus an open section for new integrations."
          />
        </div>
      </Section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="mono text-[22px] text-ink">{value}</div>
      <div className="mt-1 text-[13px] leading-snug text-warm-2">{label}</div>
    </div>
  );
}

function PointerCard({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="hair block pt-5 transition-colors hover:bg-paper-2/60">
      <div className="mono text-[15px] text-accent-dark">{title}</div>
      <p className="mt-2 text-[14px] leading-relaxed text-warm">{body}</p>
    </Link>
  );
}

function ArchDiagram() {
  const rows = [
    { layer: "UI \u2014 popup / side panel", detail: "bridge.send(method, params)" },
    { layer: "Background \u2014 api-router.js", detail: "auth + contract validation + dispatch" },
    { layer: "Services \u2014 background/services/*", detail: "native, token, network, balance, pending, history" },
    { layer: "Core libs \u2014 vault.js, thru-client.js", detail: "crypto/session/keyring, RPC/tx/program" },
    { layer: "@thru/sdk, @thru/crypto, @thru/programs", detail: "the real Thru packages" },
  ];
  return (
    <div className="not-prose overflow-hidden rounded-sm border border-ink/10 bg-plate text-paper">
      {rows.map((r, i) => (
        <div
          key={r.layer}
          className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
            i !== rows.length - 1 ? "border-b border-white/10" : ""
          }`}
        >
          <span className="mono text-[13.5px] text-paper">{r.layer}</span>
          <span className="label text-warm-2">{r.detail}</span>
        </div>
      ))}
    </div>
  );
}
