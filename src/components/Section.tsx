import type { ReactNode } from "react";

export function Section({
  id,
  kicker,
  title,
  lede,
  action,
  children,
}: {
  id?: string;
  kicker: string;
  title: string;
  lede?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-rule py-16 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-2xl">
          <p className="label text-warm">{kicker}</p>
          <h2 className="mt-2 font-serif text-[2rem] leading-[1.05] font-light tracking-[-0.03em] sm:text-4xl">{title}</h2>
          {lede ? <p className="mt-3 max-w-xl text-warm">{lede}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function PageHeader({
  kicker,
  title,
  lede,
  meta,
}: {
  kicker: string;
  title: string;
  lede: string;
  meta?: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="label text-warm">{kicker}</p>
      <h1 className="mt-3 font-serif text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.96] font-light tracking-[-0.035em]">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-warm">{lede}</p>
      {meta ? <p className="label mt-5 text-dim">{meta}</p> : null}
    </header>
  );
}
