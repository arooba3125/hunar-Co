import type { Metadata } from "next";
import { AdminUsers } from "@/features/admin/admin-users";

// Shown only after the browser reads the demo session (see RoleGate), so it
// can't be prerendered as an instant page. Opts out of that dev-only check.
export const instant = false;

export const metadata: Metadata = { title: "Admin: users" };

export default function AdminUsersPage() {
  return <AdminUsers />;
}
