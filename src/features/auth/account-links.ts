import type { NavLink } from "@/lib/site-config";
import type { Role } from "@/types";

// The links each demo role sees in its account menu.
export const accountLinks: Record<Role, NavLink[]> = {
  buyer: [{ label: "My interests", href: "/buyer/dashboard" }],
  creator: [
    { label: "Creator dashboard", href: "/creator/dashboard" },
    { label: "Submit a design", href: "/creator/designs/new" },
  ],
  admin: [
    { label: "Admin dashboard", href: "/admin/dashboard" },
    { label: "Design reviews", href: "/admin/designs" },
    { label: "Creator applications", href: "/admin/creators" },
  ],
};
