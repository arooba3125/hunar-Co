import { toneStyles, type Tone } from "@/features/demo/labels";

// A small rounded label, e.g. for a status or role.
export function Pill({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-control border px-2.5 py-1 text-xs font-medium ${toneStyles[tone]}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
