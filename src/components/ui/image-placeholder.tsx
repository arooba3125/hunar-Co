// A patterned block that stands in for a real photo until one is added.
// Replace it with next/image and a file from public/images/ later, e.g.
// <Image src="/images/design-1.jpg" alt="..." fill />

export type PlaceholderTone = "brand" | "deep" | "accent" | "sage";

const toneColors: Record<PlaceholderTone, { bg: string; ink: string }> = {
  brand: { bg: "var(--color-brand)", ink: "var(--color-paper)" },
  deep: { bg: "var(--color-deep)", ink: "var(--color-accent)" },
  accent: { bg: "var(--color-accent)", ink: "var(--color-brand-dark)" },
  sage: { bg: "var(--color-sage)", ink: "var(--color-sand)" },
};

type ImagePlaceholderProps = {
  /** Describes what the real image will show. Also used as alt text. */
  label: string;
  tone?: PlaceholderTone;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/5]" */
  aspect?: string;
  className?: string;
};

export function ImagePlaceholder({
  label,
  tone = "brand",
  aspect = "aspect-[4/5]",
  className = "",
}: ImagePlaceholderProps) {
  const { bg, ink } = toneColors[tone];

  // A repeating diamond lattice, loosely inspired by block-print textiles.
  const faint = `color-mix(in srgb, ${ink} 25%, transparent)`;
  const pattern = {
    backgroundColor: bg,
    backgroundImage: `
      radial-gradient(circle at center, ${ink} 0 2px, transparent 2.5px),
      linear-gradient(45deg, transparent 46%, ${faint} 46% 54%, transparent 54%),
      linear-gradient(-45deg, transparent 46%, ${faint} 46% 54%, transparent 54%)`,
    backgroundSize: "28px 28px",
  };

  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={`relative overflow-hidden rounded-media ${aspect} ${className}`.trim()}
      style={pattern}
    >
      <span className="absolute bottom-3 left-3 rounded-control bg-paper/90 px-3 py-1 text-xs font-medium text-ink">
        {label}
      </span>
    </div>
  );
}
