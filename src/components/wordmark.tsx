import Link from "next/link";

type WordmarkProps = {
  /** Use "light" on dark backgrounds */
  tone?: "dark" | "light";
};

// The HunarCo name with a small eight-point star, a motif common in
// South Asian tilework and textiles. Swap for a real logo file later.
export function Wordmark({ tone = "dark" }: WordmarkProps) {
  const text = tone === "light" ? "text-paper" : "text-ink";
  const accent = tone === "light" ? "text-accent" : "text-brand";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 ${text}`}
      aria-label="HunarCo home"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 text-brand"
        aria-hidden="true"
      >
        <rect x="5" y="5" width="14" height="14" fill="currentColor" />
        <rect
          x="5"
          y="5"
          width="14"
          height="14"
          fill="currentColor"
          transform="rotate(45 12 12)"
        />
        <circle cx="12" cy="12" r="3" className="fill-accent" />
      </svg>
      <span className="font-display text-2xl font-medium tracking-tight">
        Hunar<span className={accent}>Co</span>
      </span>
    </Link>
  );
}
