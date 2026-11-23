type SectionHeadingProps = {
  /** Small label above the title, e.g. "How it works" */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use "light" on dark backgrounds */
  tone?: "dark" | "light";
  className?: string;
};

// The standard heading block used at the top of each section.
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  const eyebrowColor = tone === "light" ? "text-accent" : "text-brand";
  const titleColor = tone === "light" ? "text-paper" : "text-ink";
  const bodyColor = tone === "light" ? "text-paper/75" : "text-muted";

  return (
    <div className={`max-w-2xl ${alignment} ${className}`.trim()}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={`text-title font-medium ${titleColor}`}>{title}</h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${bodyColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
