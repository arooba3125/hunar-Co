import type { Metadata } from "next";
import { AdminDashboard } from "@/features/admin/admin-dashboard";

// Shown only after the browser reads the demo session (see RoleGate), so it
// can't be prerendered as an instant page. Opts out of that dev-only check.
export const instant = false;

export const metadata: Metadata = { title: "Admin dashboard" };

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
