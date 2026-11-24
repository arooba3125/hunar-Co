"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { CreatorApplication } from "@/types";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { FilterSelect, optionsWithAll } from "@/components/ui/filter-select";
import { Pill } from "@/components/ui/pill";
import { formatDate } from "@/lib/format";
import { EmptyState } from "@/features/dashboard/dashboard-ui";
import {
  applicationStatusLabels,
  applicationStatusTone,
  userStatusLabels,
  userStatusTone,
} from "@/features/demo/labels";
import { SearchField } from "@/features/products/catalogue-filters";
import { categoryLabels } from "@/features/products/labels";
import { getProductsByCreator, sampleCreators } from "@/features/products/sample-data";
import { ActionMessage, AdminPageHeader, RowButton, tableStyles } from "./admin-shell";
import { useAdminDemo } from "./admin-demo-context";

type PendingDecision = { application: CreatorApplication; decision: "approved" | "rejected" };

const disciplineLabel = (discipline: CreatorApplication["discipline"]) =>
  discipline === "other" ? "Other" : categoryLabels[discipline];

export function AdminCreators() {
  const { applications, setApplicationStatus, users } = useAdminDemo();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("pending");
  const [pending, setPending] = useState<PendingDecision | null>(null);
  const [message, setMessage] = useState("");
  const messageRef = useRef<HTMLParagraphElement>(null);

  const search = query.trim().toLowerCase();
  const visible = applications.filter(
    (a) =>
      (status === "all" || a.status === status) &&
      (!search || a.name.toLowerCase().includes(search) || a.city.toLowerCase().includes(search)),
  );

  const confirm = () => {
    if (!pending) return;
    setApplicationStatus(pending.application.id, pending.decision);
    setMessage(
      `${pending.application.name}'s application was ${pending.decision} (demo only, nothing was sent).`,
    );
    setPending(null);
  };

  return (
    <>
      <AdminPageHeader title="Creators">
        Review applications from people who want to join, and see existing creator profiles.
      </AdminPageHeader>

      <ActionMessage ref={messageRef} message={message} />

      {/* Applications */}
      <section aria-labelledby="applications-heading">
        <h2 id="applications-heading" className="text-2xl font-medium">
          Applications
        </h2>
        <div className="mb-4 mt-4 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
          <div className="md:w-72">
            <SearchField
              id="application-search"
              label="Search applications by name or city"
              placeholder="Search name or city"
              value={query}
              onChange={setQuery}
            />
          </div>
          <FilterSelect
            id="application-status"
            label="Status"
            value={status}
            onChange={setStatus}
            options={optionsWithAll(applicationStatusLabels)}
          />
        </div>

        {visible.length === 0 ? (
          <EmptyState title="No applications here">
            {status === "pending"
              ? "Every application has been reviewed. Change the status filter to see decisions."
              : "Try a different search or status."}
          </EmptyState>
        ) : (
          <div className={tableStyles.wrapper}>
            <table className={tableStyles.table}>
              <caption className="sr-only">Creator applications</caption>
              <thead className={tableStyles.head}>
                <tr>
                  <th scope="col" className={tableStyles.th}>Applicant</th>
                  <th scope="col" className={tableStyles.th}>Discipline</th>
                  <th scope="col" className={tableStyles.th}>Submitted</th>
                  <th scope="col" className={tableStyles.th}>Status</th>
                  <th scope="col" className={tableStyles.th}>
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((application) => (
                  <tr key={application.id} className={tableStyles.row}>
                    <th scope="row" className={`${tableStyles.td} max-w-xs font-normal`}>
                      <span className="block font-medium">{application.name}</span>
                      <span className="block text-xs text-muted">{application.city}</span>
                      <span className="mt-1 block text-xs text-muted">{application.summary}</span>
                      <a
                        href={application.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-xs text-brand underline"
                      >
                        Portfolio (example link)<span className="sr-only">, opens in a new tab</span>
                      </a>
                    </th>
                    <td className={tableStyles.td}>{disciplineLabel(application.discipline)}</td>
                    <td className={`${tableStyles.td} whitespace-nowrap text-muted`}>
                      {formatDate(application.submittedOn)}
                    </td>
                    <td className={tableStyles.td}>
                      <Pill tone={applicationStatusTone[application.status]}>
                        {applicationStatusLabels[application.status]}
                      </Pill>
                    </td>
                    <td className={tableStyles.td}>
                      {application.status === "pending" ? (
                        <div className="flex gap-2">
                          <RowButton tone="primary" onClick={() => setPending({ application, decision: "approved" })}>
                            Approve<span className="sr-only"> {application.name}</span>
                          </RowButton>
                          <RowButton tone="danger" onClick={() => setPending({ application, decision: "rejected" })}>
                            Reject<span className="sr-only"> {application.name}</span>
                          </RowButton>
                        </div>
                      ) : (
                        <span className="text-xs text-muted">Decided</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Profiles */}
      <section aria-labelledby="profiles-heading" className="mt-12">
        <h2 id="profiles-heading" className="text-2xl font-medium">
          Creator profiles
        </h2>
        <div className={`${tableStyles.wrapper} mt-4`}>
          <table className={tableStyles.table}>
            <caption className="sr-only">Creator profiles</caption>
            <thead className={tableStyles.head}>
              <tr>
                <th scope="col" className={tableStyles.th}>Creator</th>
                <th scope="col" className={tableStyles.th}>Discipline</th>
                <th scope="col" className={tableStyles.th}>Listings</th>
                <th scope="col" className={tableStyles.th}>Account</th>
                <th scope="col" className={tableStyles.th}>
                  <span className="sr-only">Profile link</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sampleCreators.map((creator) => {
                const account = users.find((u) => u.creatorId === creator.id);
                return (
                  <tr key={creator.id} className={tableStyles.row}>
                    <th scope="row" className={`${tableStyles.td} font-medium`}>
                      {creator.name}
                      <span className="block text-xs font-normal text-muted">{creator.city}</span>
                    </th>
                    <td className={tableStyles.td}>{categoryLabels[creator.category]}</td>
                    <td className={tableStyles.td}>{getProductsByCreator(creator.id).length}</td>
                    <td className={tableStyles.td}>
                      {account ? (
                        <Pill tone={userStatusTone[account.status]}>{userStatusLabels[account.status]}</Pill>
                      ) : (
                        <span className="text-muted">No account</span>
                      )}
                    </td>
                    <td className={tableStyles.td}>
                      <Link href={`/creators/${creator.slug}`} className="text-sm font-medium text-brand hover:underline">
                        View profile<span className="sr-only"> of {creator.name}</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <ConfirmDialog
        open={pending !== null}
        title={pending?.decision === "approved" ? "Approve this application?" : "Reject this application?"}
        confirmLabel={pending?.decision === "approved" ? "Approve" : "Reject"}
        tone={pending?.decision === "rejected" ? "danger" : "default"}
        onConfirm={confirm}
        onCancel={() => setPending(null)}
        fallbackFocusRef={messageRef}
      >
        {pending && (
          <p>
            {pending.decision === "approved"
              ? `${pending.application.name} would be invited to set up a creator profile.`
              : `${pending.application.name} would be told their application wasn't accepted.`}{" "}
            In this demo nothing is sent and the change is lost on reload.
          </p>
        )}
      </ConfirmDialog>
    </>
  );
}
