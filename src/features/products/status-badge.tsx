import type { LaunchStatus } from "@/types";
import { statusLabels } from "./labels";

const styles: Record<LaunchStatus, string> = {
  open: "bg-surface text-ink border-line",
  "closing-soon": "bg-accent/20 text-brand-dark border-accent/50",
  "target-reached": "bg-sage/15 text-sage border-sage/40",
  closed: "bg-ink/5 text-muted border-line",
};

// A small pill showing the launch status of a design.
export function StatusBadge({ status }: { status: LaunchStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-control border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  );
}
