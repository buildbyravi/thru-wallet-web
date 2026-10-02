import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/Section";
import { customNetworkPreconditions, gaps, securityPrinciples, signingNotes } from "@/content/security";

export const metadata: Metadata = {
  title: "Security",
  description: "Thru Wallet security principles, signing policy, quarantined networks, and open gaps.",
};

export default function SecurityPage() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16">
      <PageHeader
        kicker="Security"
        title="A boundary, not a badge."
        lede="The extension is not security-reviewed. These principles describe how the source is supposed to behave. They are not a promise that every path has been attacked."
      />
      <div className="mt-10 border-l-2 border-alert bg-alert-soft/70 px-4 py-3 text-sm text-alert">
        Do not import a recovery phrase that protects anything of value. Betanet testnet funds only.
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {securityPrinciples.map((principle) => (
          <article key={principle.title} className="rounded-2xl border border-rule p-5">
            <h2 className="font-serif text-2xl leading-tight tracking-[-0.03em]">{principle.title}</h2>
            <p className="mt-3 text-warm">{principle.body}</p>
          </article>
        ))}
      </div>
      <section className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Signing policy</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-warm">
            {signingNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Custom networks stay off</h2>
          <p className="mt-3 text-warm">All four have to land together before activation is even a design discussion again.</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-warm">
            {customNetworkPreconditions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </section>
      <section className="mt-14">
        <h2 className="font-serif text-3xl font-light tracking-[-0.03em]">Open gaps</h2>
        <ul className="mt-5 divide-y divide-rule border-y border-rule">
          {gaps.map((gap) => (
            <li key={gap} className="py-3 text-warm">
              {gap}
            </li>
          ))}
        </ul>
        <p className="mt-5">
          <Link className="text-link" href="/status">
            Browser checklist on the status page
          </Link>
        </p>
      </section>
    </main>
  );
}
