import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="hair mt-24 bg-paper-2/60">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="mono text-[15px] font-medium">{site.name}</div>
            <p className="mt-3 max-w-[32ch] text-[14px] leading-relaxed text-warm">
              {site.descriptor} Not production-ready — {site.network}.
            </p>
          </div>
          <div>
            <div className="label text-warm-2">Product</div>
            <ul className="mt-3 space-y-2 text-[14px]">
              <li><Link className="hover:text-accent-dark" href="/#features">Features</Link></li>
              <li><Link className="hover:text-accent-dark" href="/changelog">Changelog</Link></li>
              <li><Link className="hover:text-accent-dark" href="/docs/roadmap">Roadmap</Link></li>
            </ul>
          </div>
          <div>
            <div className="label text-warm-2">Docs</div>
            <ul className="mt-3 space-y-2 text-[14px]">
              <li><Link className="hover:text-accent-dark" href="/docs/installation">Installation</Link></li>
              <li><Link className="hover:text-accent-dark" href="/docs/security-model">Security model</Link></li>
              <li><Link className="hover:text-accent-dark" href="/docs/ai-and-mcp">AI agents &amp; MCP</Link></li>
            </ul>
          </div>
          <div>
            <div className="label text-warm-2">For machines</div>
            <ul className="mt-3 space-y-2 text-[14px]">
              <li><a className="hover:text-accent-dark" href="/llms.txt">/llms.txt</a></li>
              <li><a className="hover:text-accent-dark" href="/llms-full.txt">/llms-full.txt</a></li>
              <li><a className="hover:text-accent-dark" href={site.repos.extension} target="_blank" rel="noreferrer">Extension source</a></li>
              <li><a className="hover:text-accent-dark" href={site.repos.website} target="_blank" rel="noreferrer">Website source</a></li>
            </ul>
          </div>
        </div>
        <div className="hair mt-10 flex flex-wrap items-center justify-between gap-3 pt-6">
          <span className="label text-dim">
            {site.name} — unofficial, experimental, self-custody. Alphanet/devnet funds only.
          </span>
          <span className="label text-dim">Contract {site.currentContractVersion}</span>
        </div>
      </div>
    </footer>
  );
}
