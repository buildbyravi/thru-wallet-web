import Link from "next/link";
import { Mark } from "@/components/Mark";
import { StoreButton } from "@/components/StoreButton";

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Mark className="h-9 w-9 text-ink" />
          <span>
            <span className="block font-serif text-[1.35rem] leading-none tracking-[-0.03em]">Thru Wallet</span>
            <span className="label mt-1 block text-warm">Alphanet dossier</span>
          </span>
        </Link>
        <StoreButton />
      </div>
    </header>
  );
}
