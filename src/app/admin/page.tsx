import { redirect } from "next/navigation";

// /admin on its own goes straight to the admin dashboard.
export default function AdminIndexPage() {
  redirect("/admin/dashboard");
}
