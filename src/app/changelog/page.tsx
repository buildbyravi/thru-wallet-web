import type { Metadata } from "next";
import { changelog } from "@/content/changelog";
import { Badge } from "@/components/Badge";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Changelog \u2014 ${site.name}`,
  description: "Dated history of Thru Wallet extension changes.",
};

export default function ChangelogPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <div className="label text-accent-dark">Changelog</div>
      <h1 className="mt-3 max-w-[22ch] text-[clamp(32px,5vw,56px)] font-[350] leading-[1.05] tracking-[-0.025em]">
        What shipped, and when.
      </h1>
      <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-warm">
        Newest first. Adding an entry is a one-file edit — see{" "}
        <a href="/docs/contributing" className="text-accent-dark underline underline-offset-4">
          Contributing to this site
        </a>
        .
      </p>

      <ol className="mt-14 space-y-14">
        {changelog.map((entry) => (
          <li key={entry.version} className="hair grid gap-3 pt-6 sm:grid-cols-[140px_1fr]">
            <div className="flex flex-row gap-3 sm:flex-col sm:gap-2">
              <span className="mono text-[13px] text-warm-2">{entry.date}</span>
              <Badge tone={entry.tag} />
            </div>
            <div>
              <h2 className="text-[20px] font-medium leading-snug">
                <span className="mono text-warm-2">{entry.version}</span> — {entry.title}
              </h2>
              <ul className="mt-3 space-y-1.5 text-[14.5px] leading-relaxed text-warm">
                {entry.changes.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-dim">&bull;</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
