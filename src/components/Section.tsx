import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  kicker,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  kicker?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-8 py-16 md:py-24 ${className}`}>
      <header className="hair pt-5">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="label text-accent-dark">{eyebrow}</span>
          {kicker && <span className="label text-warm">{kicker}</span>}
        </div>
        <h2 className="mt-3 max-w-[26ch] text-[clamp(28px,4.4vw,48px)] font-[350] leading-[1.05] tracking-[-0.025em]">
          {title}
        </h2>
      </header>
      <div className="mt-10">{children}</div>
    </section>
  );
}
