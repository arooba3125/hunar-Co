"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { LaunchStatus, Product } from "@/types";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { FilterSelect, optionsWithAll } from "@/components/ui/filter-select";
import { formatDate } from "@/lib/format";
import { EmptyState, StatCard } from "@/features/dashboard/dashboard-ui";
import { SearchField } from "@/features/products/catalogue-filters";
import { InterestProgress } from "@/features/products/interest-progress";
import { statusLabels } from "@/features/products/labels";
import { getCreatorById, sampleProducts } from "@/features/products/sample-data";
import { StatusBadge } from "@/features/products/status-badge";
import { ActionMessage, AdminPageHeader, tableStyles } from "./admin-shell";
import { useAdminDemo } from "./admin-demo-context";

type PendingChange = { product: Product; from: LaunchStatus; to: LaunchStatus };

const statusOptions = (Object.keys(statusLabels) as LaunchStatus[]).map((value) => ({
  value,
  label: statusLabels[value],
}));

export function AdminLaunches() {
  const { launchStatuses, setLaunchStatus } = useAdminDemo();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [pending, setPending] = useState<PendingChange | null>(null);
  const [message, setMessage] = useState("");
  const messageRef = useRef<HTMLParagraphElement>(null);
  // The status picked in each row's dropdown, before "Update" is pressed.
  const [drafts, setDrafts] = useState<Record<string, LaunchStatus>>({});

  const search = query.trim().toLowerCase();
  const visible = sampleProducts.filter(
    (p) =>
      (filter === "all" || launchStatuses[p.id] === filter) &&
      (!search || p.name.toLowerCase().includes(search)),
  );
  const countWith = (status: LaunchStatus) =>
    sampleProducts.filter((p) => launchStatuses[p.id] === status).length;

  const confirm = () => {
    if (!pending) return;
    setLaunchStatus(pending.product.id, pending.to);
    setDrafts((previous) => {
      const next = { ...previous };
      delete next[pending.product.id];
      return next;
    });
    setMessage(
      `"${pending.product.name}" changed to ${statusLabels[pending.to].toLowerCase()} in the admin demo. The public pages are not affected.`,
    );
    setPending(null);
  };

  return (
    <>
      <AdminPageHeader title="Launches">
        Interest progress against each design&rsquo;s target. Changing a status here updates this
        demo panel only; the public Discover pages keep their sample status.
      </AdminPageHeader>

      <ActionMessage ref={messageRef} message={message} />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statusOptions.map((option) => (
          <StatCard key={option.value} label={option.label} value={countWith(option.value)} />
        ))}
      </div>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
        <div className="md:w-72">
          <SearchField
            id="launch-search"
            label="Search launches by design name"
            placeholder="Search designs"
            value={query}
            onChange={setQuery}
          />
        </div>
        <FilterSelect
          id="launch-filter"
          label="Status"
          value={filter}
          onChange={setFilter}
          options={optionsWithAll(statusLabels)}
        />
      </div>

      {visible.length === 0 ? (
        <EmptyState title="No launches match">Try a different search or status.</EmptyState>
      ) : (
        <div className={tableStyles.wrapper}>
          <table className={`${tableStyles.table} min-w-[48rem]`}>
            <caption className="sr-only">Launch progress</caption>
            <thead className={tableStyles.head}>
              <tr>
                <th scope="col" className={tableStyles.th}>Design</th>
                <th scope="col" className={`${tableStyles.th} w-64`}>Interest vs target</th>
                <th scope="col" className={tableStyles.th}>Closes</th>
                <th scope="col" className={tableStyles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((product) => {
                const current = launchStatuses[product.id];
                const draft = drafts[product.id] ?? current;
                const selectId = `launch-status-${product.id}`;
                return (
                  <tr key={product.id} className={tableStyles.row}>
                    <th scope="row" className={`${tableStyles.td} font-normal`}>
                      <Link href={`/discover/${product.slug}`} className="block font-medium hover:text-brand hover:underline">
                        {product.name}
                      </Link>
                      <span className="text-xs text-muted">{getCreatorById(product.creatorId)?.name}</span>
                    </th>
                    <td className={tableStyles.td}>
                      <InterestProgress current={product.interestCount} target={product.interestTarget} />
                    </td>
                    <td className={`${tableStyles.td} whitespace-nowrap text-muted`}>{formatDate(product.closesOn)}</td>
                    <td className={tableStyles.td}>
                      <div className="flex flex-col items-start gap-2">
                        <StatusBadge status={current} />
                        <label htmlFor={selectId} className="sr-only">
                          Change launch status for {product.name}
                        </label>
                        <div className="flex gap-2">
                          <select
                            id={selectId}
                            value={draft}
                            onChange={(event) =>
                              setDrafts({ ...drafts, [product.id]: event.target.value as LaunchStatus })
                            }
                            className="h-9 rounded-control border border-line bg-paper px-3 text-xs focus:border-ink"
                          >
                            {statusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            disabled={draft === current}
                            onClick={() => setPending({ product, from: current, to: draft })}
                            className="h-9 whitespace-nowrap rounded-control border border-line px-3 text-xs font-medium hover:border-ink disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Update<span className="sr-only"> status for {product.name}</span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={pending !== null}
        title="Change launch status?"
        confirmLabel="Change status"
        tone={pending?.to === "closed" ? "danger" : "default"}
        onConfirm={confirm}
        onCancel={() => setPending(null)}
        fallbackFocusRef={messageRef}
      >
        {pending && (
          <p>
            <strong className="text-ink">{pending.product.name}</strong> will change from{" "}
            {statusLabels[pending.from]} to <strong className="text-ink">{statusLabels[pending.to]}</strong>. In
            a real system interested buyers might be notified. Nothing is sent in this demo.
          </p>
        )}
      </ConfirmDialog>
    </>
  );
}
