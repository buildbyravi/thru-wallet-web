const TONES: Record<string, string> = {
  STABLE: "text-accent-dark border-accent-dark",
  ALPHA: "text-alert border-alert",
  PLANNED: "text-warm-2 border-warm-2/60",
  SECURITY: "text-alert border-alert",
  DOCS: "text-warm-2 border-warm-2/60",
  DESIGN: "text-accent-dark border-accent-dark",
};

export function Badge({ tone, children }: { tone: string; children?: React.ReactNode }) {
  const cls = TONES[tone] ?? "text-warm-2 border-warm-2/60";
  return (
    <span className={`label inline-flex items-center border px-2 py-[3px] ${cls}`}>
      {children ?? tone}
    </span>
  );
}
