"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "Copy",
  onDark = false,
}: {
  text: string;
  label?: string;
  onDark?: boolean;
}) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => {
            setDone(true);
            setTimeout(() => setDone(false), 1600);
          },
          () => undefined,
        );
      }}
      className={
        "label border px-2 py-[3px] transition-colors duration-[120ms] " +
        (onDark
          ? "border-white/30 text-paper hover:bg-white/10"
          : "border-ink/30 text-ink hover:bg-ink/10")
      }
    >
      {done ? "Copied \u2713" : label}
    </button>
  );
}
