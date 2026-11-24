import type { Metadata } from "next";
import { AdminLaunches } from "@/features/admin/admin-launches";

// Shown only after the browser reads the demo session (see RoleGate), so it
// can't be prerendered as an instant page. Opts out of that dev-only check.
export const instant = false;

export const metadata: Metadata = { title: "Admin: launches" };

export default function AdminLaunchesPage() {
  return <AdminLaunches />;
}
