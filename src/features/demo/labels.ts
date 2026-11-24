// Display labels and badge colours for demo statuses and roles.

import type { ApplicationStatus, ReviewStatus, Role, UserStatus } from "@/types";

export const roleLabels: Record<Role, string> = {
  buyer: "Buyer",
  creator: "Creator",
  admin: "Admin",
};

export const reviewStatusLabels: Record<ReviewStatus, string> = {
  "in-review": "In review",
  "changes-requested": "Changes requested",
  approved: "Approved",
  rejected: "Rejected",
};

export const applicationStatusLabels: Record<ApplicationStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

export const userStatusLabels: Record<UserStatus, string> = {
  active: "Active",
  invited: "Invited",
  suspended: "Suspended",
};

// Shared colour styles for status pills, by meaning rather than by status.
export const toneStyles = {
  neutral: "bg-surface text-ink border-line",
  warning: "bg-accent/20 text-brand-dark border-accent/50",
  success: "bg-sage/15 text-sage border-sage/40",
  danger: "bg-brand/10 text-brand-dark border-brand/30",
  muted: "bg-ink/5 text-muted border-line",
} as const;

export type Tone = keyof typeof toneStyles;

export const reviewStatusTone: Record<ReviewStatus, Tone> = {
  "in-review": "warning",
  "changes-requested": "neutral",
  approved: "success",
  rejected: "danger",
};

export const applicationStatusTone: Record<ApplicationStatus, Tone> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

export const userStatusTone: Record<UserStatus, Tone> = {
  active: "success",
  invited: "neutral",
  suspended: "danger",
};
