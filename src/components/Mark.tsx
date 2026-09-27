export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="currentColor" />
      <rect x="9" y="6" width="3.2" height="20" fill="#f3f0e9" />
      <rect x="19.8" y="6" width="3.2" height="20" fill="#f3f0e9" />
      <rect x="14.2" y="13" width="3.6" height="6" fill="#5c6bf5" />
    </svg>
  );
}
