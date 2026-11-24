// A visible note that the content on a page is placeholder data.
export function SampleNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-3 rounded-card border border-accent/50 bg-accent/10 px-4 py-3 text-sm text-ink">
      <span
        aria-hidden="true"
        className="mt-0.5 rounded-control bg-ink px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-paper"
      >
        Sample
      </span>
      <span>{children}</span>
    </p>
  );
}
