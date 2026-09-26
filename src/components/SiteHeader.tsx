import Link from "next/link";
import { site } from "@/content/site";
import { Badge } from "./Badge";

export function SiteHeader() {
  return (
    <header className="grain sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="mono text-[15px] font-medium tracking-tight text-ink">
            {site.name}
          </span>
          <span className="label text-warm-2">{site.tagline}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label text-warm transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block">
            <Badge tone={site.status} />
          </span>
          <a
            href={site.repos.extension}
            target="_blank"
            rel="noreferrer"
            className="label border border-ink/30 px-3 py-[7px] text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            GitHub &#8599;
          </a>
        </div>
      </div>
      <nav className="flex items-center gap-5 overflow-x-auto border-t border-rule px-6 py-2 md:hidden">
        {site.nav.map((item) => (
          <Link key={item.href} href={item.href} className="label shrink-0 text-warm">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
