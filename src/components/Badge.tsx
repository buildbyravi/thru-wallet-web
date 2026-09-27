const tones: Record<string, string> = {
  STABLE: "bg-ink text-paper",
  ALPHA: "bg-accent-light text-accent-dark",
  PLANNED: "bg-paper-3 text-warm",
  RELEASE: "bg-ink text-paper",
  FIX: "bg-paper-3 text-ink",
  DOCS: "bg-paper-2 text-warm",
  SECURITY: "bg-alert-soft text-alert",
  NOTE: "bg-paper-2 text-warm",
  SMOKE: "bg-accent-light text-accent-dark",
  open: "bg-paper-3 text-warm",
  blocked: "bg-alert-soft text-alert",
  done: "bg-moss text-ink",
  pass: "bg-moss text-ink",
  fail: "bg-alert-soft text-alert",
};

export function Badge({ value }: { value: string }) {
  return (
    <span className={`label inline-flex rounded-full px-2 py-1 ${tones[value] ?? "bg-paper-2 text-warm"}`}>
      {value}
    </span>
  );
}
