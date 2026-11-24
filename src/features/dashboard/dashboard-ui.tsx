// Small building blocks shared by the buyer, creator and admin screens.

import { Container } from "@/components/ui/container";

type DashboardIntroProps = {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  /** Buttons shown beside the heading */
  actions?: React.ReactNode;
};

// The welcome band at the top of the buyer and creator dashboards.
export function DashboardIntro({ eyebrow, title, children, actions }: DashboardIntroProps) {
  return (
    <section className="border-b border-line bg-sand">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between md:py-14">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
          <h1 className="mt-3 text-title font-medium">{title}</h1>
          {children && <div className="mt-3 leading-relaxed text-muted">{children}</div>}
        </div>
        {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
      </Container>
    </section>
  );
}

// A white card with a heading, used for each block on a dashboard.
export function Panel({
  title,
  description,
  actions,
  children,
  id,
}: {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="rounded-card border border-line bg-surface p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id={headingId} className="text-2xl font-medium">
            {title}
          </h2>
          {description && <p className="mt-1 text-sm text-muted">{description}</p>}
        </div>
        {actions}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

// A number with a label, e.g. "4 designs followed".
export function StatCard({ label, value, note }: { label: string; value: number | string; note?: string }) {
  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-display text-4xl font-medium">{value}</p>
      {note && <p className="mt-1 text-xs text-muted">{note}</p>}
    </div>
  );
}

// Friendly message for an empty list, with an optional action.
export function EmptyState({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-dashed border-ink/20 bg-paper px-6 py-12 text-center">
      <h3 className="text-xl font-medium">{title}</h3>
      <div className="mx-auto mt-2 max-w-md text-muted">{children}</div>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

// Reminder that a screen uses demo data and local state only.
export function DemoDataNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-media border border-accent/50 bg-accent/10 px-4 py-3 text-sm">
      <strong>Demo.</strong> {children}
    </p>
  );
}
