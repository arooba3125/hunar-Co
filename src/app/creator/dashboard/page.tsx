import type { Metadata } from "next";
import { CreatorDashboard } from "@/features/dashboard/creator-dashboard";

// Shown only after the browser reads the demo session (see RoleGate), so it
// can't be prerendered as an instant page. Opts out of that dev-only check.
export const instant = false;

export const metadata: Metadata = { title: "Creator dashboard" };

export default function CreatorDashboardPage() {
  return <CreatorDashboard />;
}
