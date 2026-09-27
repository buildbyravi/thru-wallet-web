import { CopyButton } from "@/components/CopyButton";

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl bg-plate text-paper">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
        <span className="label text-paper/70">{label ?? "Command"}</span>
        <CopyButton value={code} />
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4">
        <code className="mono text-[13px] leading-relaxed text-paper">{code}</code>
      </pre>
    </figure>
  );
}
