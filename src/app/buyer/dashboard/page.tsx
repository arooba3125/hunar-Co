import type { Metadata } from "next";
import { BuyerDashboard } from "@/features/dashboard/buyer-dashboard";

// Shown only after the browser reads the demo session (see RoleGate), so it
// can't be prerendered as an instant page. Opts out of that dev-only check.
export const instant = false;

export const metadata: Metadata = { title: "My interests" };

export default function BuyerDashboardPage() {
  return <BuyerDashboard />;
}
