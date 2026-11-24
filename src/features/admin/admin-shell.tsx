"use client";

// The admin area frame: persistent demo notice, sidebar navigation on large
// screens, and a scrollable link row on small screens.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { useAdminDemo } from "./admin-demo-context";

const adminNav = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Users", href: "/admin/users" },
  { label: "Creators", href: "/admin/creators" },
  { label: "Designs", href: "/admin/designs" },
  { label: "Launches", href: "/admin/launches" },
  { label: "Settings", href: "/admin/settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { settings } = useAdminDemo();

  return (
    <div className="bg-sand/50">
      {/* Persistent notice required on every admin page */}
      <div className="border-b border-accent/50 bg-accent/15">
        <Container className="py-2.5 text-center text-sm font-medium">
          Demo admin panel — changes are not saved to a server.
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:py-10">
        {/* min-w-0 lets the link row scroll sideways instead of widening the page */}
        <nav aria-label="Admin" className="min-w-0">
          <p className="mb-3 hidden text-xs font-semibold uppercase tracking-[0.18em] text-brand lg:block">
            {settings.platformName} admin
          </p>
          <ul className="-mx-1 flex gap-1 overflow-x-auto pb-1 lg:mx-0 lg:flex-col lg:overflow-visible">
            {adminNav.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`block whitespace-nowrap rounded-media px-3 py-2 text-sm font-medium transition-colors ${
                      current ? "bg-ink text-paper" : "text-muted hover:bg-surface hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-0">{children}</div>
      </Container>
    </div>
  );
}

// Heading block at the top of each admin page.
export function AdminPageHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h1 className="text-title font-medium">{title}</h1>
      {children && <p className="mt-2 max-w-2xl text-muted">{children}</p>}
    </div>
  );
}

// Shared classes for admin tables, so every list looks the same.
export const tableStyles = {
  wrapper: "overflow-x-auto rounded-card border border-line bg-surface",
  table: "w-full min-w-[40rem] text-left text-sm",
  head: "border-b border-line bg-sand/60 text-xs uppercase tracking-wider text-muted",
  th: "px-4 py-3 font-semibold",
  row: "border-b border-line last:border-0 align-top",
  td: "px-4 py-3",
};

// An action button sized for table rows.
export function RowButton({
  children,
  onClick,
  tone = "default",
}: {
  children: React.ReactNode;
  onClick: () => void;
  tone?: "default" | "danger" | "primary";
}) {
  const styles = {
    default: "border-line hover:border-ink",
    primary: "border-sage/50 text-sage hover:bg-sage/10",
    danger: "border-brand/30 text-brand hover:bg-brand/5",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-control border px-3 py-1.5 text-xs font-medium ${styles[tone]}`}
    >
      {children}
    </button>
  );
}

// Announces the result of an admin action to everyone, including screen readers.
// It can receive focus (tabIndex -1), so pass the same ref to ConfirmDialog's
// fallbackFocusRef to move focus here after a decision.
export function ActionMessage({
  message,
  ref,
}: {
  message: string;
  ref?: React.Ref<HTMLParagraphElement>;
}) {
  return (
    <p
      ref={ref}
      tabIndex={-1}
      aria-live="polite"
      className={
        message
          ? "mb-4 rounded-media border border-sage/40 bg-sage/10 px-4 py-3 text-sm"
          : "sr-only"
      }
    >
      {message}
    </p>
  );
}
