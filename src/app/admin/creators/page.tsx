import type { Metadata } from "next";
import { AdminCreators } from "@/features/admin/admin-creators";

// Shown only after the browser reads the demo session (see RoleGate), so it
// can't be prerendered as an instant page. Opts out of that dev-only check.
export const instant = false;

export const metadata: Metadata = { title: "Admin: creators" };

export default function AdminCreatorsPage() {
  return <AdminCreators />;
}
