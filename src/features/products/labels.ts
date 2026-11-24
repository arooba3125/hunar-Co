// Human-readable labels for category and status values.

import type { Category, LaunchStatus } from "@/types";

export const categoryLabels: Record<Category, string> = {
  fashion: "Fashion",
  art: "Art",
  crafts: "Crafts",
};

export const statusLabels: Record<LaunchStatus, string> = {
  open: "Collecting interest",
  "closing-soon": "Closing soon",
  "target-reached": "Target reached",
  closed: "Closed",
};

/** Whether buyers can still register interest for this status */
export function isAcceptingInterest(status: LaunchStatus) {
  return status === "open" || status === "closing-soon";
}
