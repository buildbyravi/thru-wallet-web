"use client";

import { useState } from "react";

type CopyState = "idle" | "copied" | "failed";

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [state, setState] = useState<CopyState>("idle");

  return (
    <button
      type="button"
      className="label rounded-full border border-white/20 px-2.5 py-1 text-paper hover:bg-white/10"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setState("copied");
        } catch {
          // The clipboard API is unavailable outside a secure context and can be refused by
          // permission. Saying so beats a button that silently keeps saying "Copy".
          setState("failed");
        }
        window.setTimeout(() => setState("idle"), 1800);
      }}
    >
      {state === "copied" ? "Copied" : state === "failed" ? "Press ⌘C" : label}
    </button>
  );
}
