import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/Section";
import { privacy } from "@/content/privacy";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/privacy");

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16">
      <PageHeader
        path="/privacy"
        kicker="Privacy"
        title="Nothing leaves your browser but signed transactions."
        lede={privacy.intro}
        meta={`Policy last updated ${privacy.lastUpdated} · published here ${privacy.updatedOn}`}
      />

      <div className="mt-10 max-w-3xl">
        <p className="text-warm">{privacy.scope}</p>

        <nav aria-label="Sections" className="mt-8 rounded-2xl border border-rule bg-paper-2/40 p-5">
          <p className="label text-warm">On this page</p>
          <ol className="mt-3 grid list-decimal gap-1 pl-5 text-sm text-warm sm:grid-cols-2">
            {privacy.sections.map((section, index) => (
              <li key={section.heading}>
                <a className="hover:text-ink hover:underline hover:underline-offset-4" href={`#section-${index + 1}`}>
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 space-y-12">
          {privacy.sections.map((section, index) => (
            <section key={section.heading} id={`section-${index + 1}`} className="scroll-mt-8">
              <p className="label text-accent-dark">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 font-serif text-3xl leading-tight font-light tracking-[-0.03em]">
                {section.heading}
              </h2>
              <p className="mt-3 text-warm">{section.body}</p>
              {"bullets" in section && section.bullets.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-warm">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {"endpoint" in section ? (
                <div className="mt-4 rounded-xl border border-rule bg-paper-2/60 px-4 py-3">
                  <p className="label text-warm">The only allowed endpoint</p>
                  <p className="mono mt-1 text-sm break-all">{section.endpoint}</p>
                </div>
              ) : null}
              {"note" in section ? (
                <p className="mt-4 border-l-2 border-accent bg-accent-light/40 px-4 py-3 text-sm text-warm">
                  {section.note}
                </p>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-12 border-t border-rule pt-6">
          <p className="text-warm">
            Prefer the policy in plain text? It is also served at{" "}
            <Link className="text-link" href="/llms.txt">
              /llms.txt
            </Link>
            , and the extension&rsquo;s source — including the vault and network code this page describes — is at{" "}
            <a className="text-link" href={site.repos.extension} target="_blank" rel="noopener noreferrer">
              github.com/buildbyravi/thru-wallet-ext
            </a>
            .
          </p>
          <p className="mt-4 text-sm text-warm">
            Not affiliated with or endorsed by Unto Labs. Betanet testnet funds only. The extension has not been
            security-audited.
          </p>
          <p className="mt-6">
            <Link className="text-link" href="/security">
              Security model
            </Link>
            <span className="text-warm"> · </span>
            <Link className="text-link" href="/install">
              Install
            </Link>
            <span className="text-warm"> · </span>
            <Link className="text-link" href="/status">
              Status
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
