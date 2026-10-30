import Link from "next/link";
import { BreadcrumbsJsonLd } from "@/components/JsonLd";

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Visible breadcrumbs plus the matching BreadcrumbList graph. Google asks for the structured data
 * to describe navigation a person can actually see, so both are rendered here or neither is.
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <>
      <BreadcrumbsJsonLd items={items} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={`${item.path}-${item.name}`} className="label flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-dim">
                  /
                </span>
              ) : null}
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="text-warm no-underline hover:text-ink">
                  {item.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
