import type { Metadata } from "next";
import { AdminSettings } from "@/features/admin/admin-settings";

// Shown only after the browser reads the demo session (see RoleGate), so it
// can't be prerendered as an instant page. Opts out of that dev-only check.
export const instant = false;

export const metadata: Metadata = { title: "Admin: settings" };

export default function AdminSettingsPage() {
  return <AdminSettings />;
}
