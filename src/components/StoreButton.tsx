import { chromeStoreUrl } from "@/content/site";

export function StoreButton({
  variant = "store",
  label = "Add to Chrome",
}: {
  variant?: "store" | "ink" | "line" | "ghost";
  label?: string;
}) {
  const tone =
    variant === "ink"
      ? "btn-ink"
      : variant === "line"
        ? "btn-line"
        : variant === "ghost"
          ? "btn-ghost"
          : "btn-store";

  return (
    <a className={`btn ${tone}`} href={chromeStoreUrl} target="_blank" rel="noopener noreferrer">
      <ChromeGlyph />
      {label}
    </a>
  );
}

function ChromeGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="2.1" fill="currentColor" />
      <path d="M8 2.2h5.2M3.4 10.6 6.6 8.8M12.6 10.6 9.4 8.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
