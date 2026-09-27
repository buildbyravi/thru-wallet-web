import Link from "next/link";
import { chromeStoreUrl, extensionId, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-rule">
      <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="label text-warm">Extension</p>
          <p className="mt-3 max-w-sm font-serif text-2xl leading-tight tracking-[-0.03em]">
            Add Thru Wallet from the Chrome Web Store, or read the source before you do.
          </p>
          <a className="text-link mt-4 inline-block" href={chromeStoreUrl} target="_blank" rel="noopener noreferrer">
            chromewebstore.google.com/detail/thru-wallet/{extensionId}
          </a>
          <p className="mt-4 max-w-md text-sm text-warm">{site.warning}</p>
        </div>
        <div>
          <p className="label text-warm">On this site</p>
          <ul className="mt-3 space-y-1.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link className="text-ink hover:text-accent-dark" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="text-ink hover:text-accent-dark" href="/desk">
                Desk
              </Link>
            </li>
            <li>
              <Link className="text-ink hover:text-accent-dark" href="/llms.txt">
                llms.txt
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label text-warm">Outside</p>
          <ul className="mt-3 space-y-1.5">
            <li>
              <a className="text-link" href={chromeStoreUrl} target="_blank" rel="noopener noreferrer">
                Chrome Web Store
              </a>
            </li>
            <li>
              <a className="text-link" href={site.repos.extension} target="_blank" rel="noopener noreferrer">
                Extension repository
              </a>
            </li>
            <li>
              <a className="text-link" href={site.repos.website} target="_blank" rel="noopener noreferrer">
                Website repository
              </a>
            </li>
            <li>
              <a className="text-link" href={site.links.privacy} target="_blank" rel="noopener noreferrer">
                Privacy policy
              </a>
            </li>
            <li>
              <a className="text-link" href={site.links.explorer} target="_blank" rel="noopener noreferrer">
                scan.thru.org
              </a>
            </li>
            <li>
              <a className="text-link" href={site.links.thruDocs} target="_blank" rel="noopener noreferrer">
                Thru docs
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <p className="label text-dim">Unofficial · {site.listing.version} listed · contract {site.contract.version}</p>
          <p className="label text-dim">Not Unto Labs</p>
        </div>
      </div>
    </footer>
  );
}
