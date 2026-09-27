"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export function PrimaryNav() {
  const path = usePathname();

  return (
    <nav aria-label="Primary" className="flex flex-wrap gap-x-4 gap-y-2">
      {site.nav.map((item) => {
        const active = item.href === "/" ? path === "/" : path === item.href || path.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`label ${active ? "text-ink underline decoration-accent decoration-2 underline-offset-4" : "text-warm hover:text-ink"}`}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
