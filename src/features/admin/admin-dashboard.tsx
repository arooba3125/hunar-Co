"use client";

import Link from "next/link";
import { DemoDataNotice, StatCard } from "@/features/dashboard/dashboard-ui";
import { getCreatorById, sampleProducts } from "@/features/products/sample-data";
import { formatDate } from "@/lib/format";
import { AdminPageHeader } from "./admin-shell";
import { useAdminDemo } from "./admin-demo-context";

export function AdminDashboard() {
  const { users, applications, submissions, launchStatuses } = useAdminDemo();

  const pendingApplications = applications.filter((a) => a.status === "pending");
  const designsInReview = submissions.filter((s) => s.reviewStatus === "in-review");
  const liveLaunches = sampleProducts.filter((p) =>
    ["open", "closing-soon"].includes(launchStatuses[p.id]),
  );
  const closingSoon = sampleProducts.filter((p) => launchStatuses[p.id] === "closing-soon");

  return (
    <>
      <AdminPageHeader title="Dashboard">
        An overview of the demo platform. All counts come from fictional sample data and update as
        you make changes in this session.
      </AdminPageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Users" value={users.length} note="Demo accounts" />
        <StatCard label="Creators" value={users.filter((u) => u.role === "creator").length} />
        <StatCard label="Design submissions" value={submissions.length} />
        <StatCard
          label="Pending reviews"
          value={pendingApplications.length + designsInReview.length}
          note={`${pendingApplications.length} applications, ${designsInReview.length} designs`}
        />
        <StatCard label="Live launches" value={liveLaunches.length} note="Collecting interest" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <AttentionList
          title="Creator applications"
          href="/admin/creators"
          linkText="Review applications"
          empty="No applications waiting."
          items={pendingApplications.map((a) => ({
            key: a.id,
            primary: a.name,
            secondary: `${a.city} · submitted ${formatDate(a.submittedOn)}`,
          }))}
        />
        <AttentionList
          title="Designs in review"
          href="/admin/designs"
          linkText="Review designs"
          empty="No designs waiting for review."
          items={designsInReview.map((s) => ({
            key: s.id,
            primary: s.title,
            secondary: `${getCreatorById(s.creatorId)?.name ?? "Unknown creator"} · ${formatDate(s.submittedOn)}`,
          }))}
        />
        <AttentionList
          title="Launches closing soon"
          href="/admin/launches"
          linkText="Manage launches"
          empty="No launches are closing soon."
          items={closingSoon.map((p) => ({
            key: p.id,
            primary: p.name,
            secondary: `${p.interestCount} of ${p.interestTarget} interests · closes ${formatDate(p.closesOn)}`,
          }))}
        />
      </div>

      <div className="mt-8">
        <DemoDataNotice>
          These are not real users or business results. Numbers reset when you reload the page.
        </DemoDataNotice>
      </div>
    </>
  );
}

function AttentionList({
  title,
  href,
  linkText,
  empty,
  items,
}: {
  title: string;
  href: string;
  linkText: string;
  empty: string;
  items: { key: string; primary: string; secondary: string }[];
}) {
  return (
    <section className="flex flex-col rounded-card border border-line bg-surface p-5">
      <h2 className="text-xl font-medium">
        {title} <span className="text-base text-muted">({items.length})</span>
      </h2>
      {items.length === 0 ? (
        <p className="mt-3 flex-1 text-sm text-muted">{empty}</p>
      ) : (
        <ul className="mt-3 flex-1 divide-y divide-line">
          {items.slice(0, 4).map((item) => (
            <li key={item.key} className="py-2.5 text-sm">
              <p className="font-medium">{item.primary}</p>
              <p className="text-muted">{item.secondary}</p>
            </li>
          ))}
        </ul>
      )}
      <Link href={href} className="mt-4 text-sm font-medium text-brand underline-offset-4 hover:underline">
        {linkText} →
      </Link>
    </section>
  );
}
