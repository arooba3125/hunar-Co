import { RoleGate } from "@/features/auth/role-gate";
import { AdminDemoProvider } from "@/features/admin/admin-demo-context";
import { AdminShell } from "@/features/admin/admin-shell";

// Every page under /admin is shown only to the demo Admin role.
//
// ⚠️ Demo only. In production, admin pages and every admin action must be
// authorized on a trusted server (and in the database's access rules).
// Hiding pages in the browser does not stop someone calling an API directly.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGate role="admin">
      <AdminDemoProvider>
        <AdminShell>{children}</AdminShell>
      </AdminDemoProvider>
    </RoleGate>
  );
}
