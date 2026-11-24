"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { DesignSubmission, ReviewStatus } from "@/types";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { FilterSelect, optionsWithAll } from "@/components/ui/filter-select";
import { TextAreaField } from "@/components/ui/form-fields";
import { Pill } from "@/components/ui/pill";
import { formatDate, formatPrice } from "@/lib/format";
import { EmptyState } from "@/features/dashboard/dashboard-ui";
import { reviewStatusLabels, reviewStatusTone } from "@/features/demo/labels";
import { SearchField } from "@/features/products/catalogue-filters";
import { categoryLabels } from "@/features/products/labels";
import { getCreatorById } from "@/features/products/sample-data";
import { ActionMessage, AdminPageHeader, RowButton, tableStyles } from "./admin-shell";
import { useAdminDemo } from "./admin-demo-context";

type Decision = Exclude<ReviewStatus, "in-review">;
type PendingDecision = { submission: DesignSubmission; decision: Decision };

const dialogCopy: Record<Decision, { title: string; confirm: string; body: string }> = {
  approved: {
    title: "Approve this design?",
    confirm: "Approve",
    body: "In a real system the design would be scheduled to go live on Discover.",
  },
  "changes-requested": {
    title: "Request changes?",
    confirm: "Request changes",
    body: "The creator would see your note on their dashboard and could resubmit.",
  },
  rejected: {
    title: "Reject this design?",
    confirm: "Reject",
    body: "The creator would be told the design won't be listed.",
  },
};

export function AdminDesigns() {
  const { submissions, setReviewStatus } = useAdminDemo();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [pending, setPending] = useState<PendingDecision | null>(null);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const messageRef = useRef<HTMLParagraphElement>(null);

  const search = query.trim().toLowerCase();
  const visible = submissions.filter((s) => {
    const creatorName = getCreatorById(s.creatorId)?.name.toLowerCase() ?? "";
    return (
      (status === "all" || s.reviewStatus === status) &&
      (category === "all" || s.category === category) &&
      (!search || s.title.toLowerCase().includes(search) || creatorName.includes(search))
    );
  });

  const open = (submission: DesignSubmission, decision: Decision) => {
    setNote("");
    setPending({ submission, decision });
  };

  const confirm = () => {
    if (!pending) return;
    const reviewNote =
      pending.decision === "approved" ? undefined : note.trim() || "No note added (demo).";
    setReviewStatus(pending.submission.id, pending.decision, reviewNote);
    setMessage(
      `"${pending.submission.title}" is now ${reviewStatusLabels[pending.decision].toLowerCase()} (demo only, nothing was sent).`,
    );
    setPending(null);
  };

  return (
    <>
      <AdminPageHeader title="Designs">
        Design submissions from creators. Approve, request changes, or reject anything that is
        waiting for review.
      </AdminPageHeader>

      <ActionMessage ref={messageRef} message={message} />

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
        <div className="md:w-72">
          <SearchField
            id="design-search"
            label="Search designs by title or creator"
            placeholder="Search title or creator"
            value={query}
            onChange={setQuery}
          />
        </div>
        <FilterSelect
          id="design-status"
          label="Status"
          value={status}
          onChange={setStatus}
          options={optionsWithAll(reviewStatusLabels)}
        />
        <FilterSelect
          id="design-category"
          label="Category"
          value={category}
          onChange={setCategory}
          options={optionsWithAll(categoryLabels)}
        />
      </div>

      <p aria-live="polite" className="mb-3 text-sm text-muted">
        Showing {visible.length} of {submissions.length} submissions
      </p>

      {visible.length === 0 ? (
        <EmptyState title="No submissions match">Try a different search or filter.</EmptyState>
      ) : (
        <div className={tableStyles.wrapper}>
          <table className={tableStyles.table}>
            <caption className="sr-only">Design submissions</caption>
            <thead className={tableStyles.head}>
              <tr>
                <th scope="col" className={tableStyles.th}>Design</th>
                <th scope="col" className={tableStyles.th}>Price</th>
                <th scope="col" className={tableStyles.th}>Submitted</th>
                <th scope="col" className={tableStyles.th}>Status</th>
                <th scope="col" className={tableStyles.th}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((submission) => {
                const creator = getCreatorById(submission.creatorId);
                const canDecide =
                  submission.reviewStatus === "in-review" ||
                  submission.reviewStatus === "changes-requested";
                return (
                  <tr key={submission.id} className={tableStyles.row}>
                    <th scope="row" className={`${tableStyles.td} max-w-xs font-normal`}>
                      <span className="block font-medium">
                        {submission.productSlug ? (
                          <Link href={`/discover/${submission.productSlug}`} className="hover:text-brand hover:underline">
                            {submission.title}
                          </Link>
                        ) : (
                          submission.title
                        )}
                      </span>
                      <span className="block text-xs text-muted">
                        {categoryLabels[submission.category]} · {creator?.name ?? "Unknown creator"}
                      </span>
                      {submission.reviewNote && (
                        <span className="mt-1 block text-xs text-muted">Note: {submission.reviewNote}</span>
                      )}
                    </th>
                    <td className={`${tableStyles.td} whitespace-nowrap`}>{formatPrice(submission.pricePkr)}</td>
                    <td className={`${tableStyles.td} whitespace-nowrap text-muted`}>
                      {formatDate(submission.submittedOn)}
                    </td>
                    <td className={tableStyles.td}>
                      <Pill tone={reviewStatusTone[submission.reviewStatus]}>
                        {reviewStatusLabels[submission.reviewStatus]}
                      </Pill>
                    </td>
                    <td className={tableStyles.td}>
                      {canDecide ? (
                        <div className="flex flex-wrap gap-2">
                          <RowButton tone="primary" onClick={() => open(submission, "approved")}>
                            Approve<span className="sr-only"> {submission.title}</span>
                          </RowButton>
                          {submission.reviewStatus !== "changes-requested" && (
                            <RowButton onClick={() => open(submission, "changes-requested")}>
                              Request changes<span className="sr-only"> to {submission.title}</span>
                            </RowButton>
                          )}
                          <RowButton tone="danger" onClick={() => open(submission, "rejected")}>
                            Reject<span className="sr-only"> {submission.title}</span>
                          </RowButton>
                        </div>
                      ) : (
                        <span className="text-xs text-muted">Decided</span>
                      )}
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
        title={pending ? dialogCopy[pending.decision].title : ""}
        confirmLabel={pending ? dialogCopy[pending.decision].confirm : "Confirm"}
        tone={pending?.decision === "rejected" ? "danger" : "default"}
        onConfirm={confirm}
        onCancel={() => setPending(null)}
        fallbackFocusRef={messageRef}
      >
        {pending && (
          <>
            <p>
              <strong className="text-ink">{pending.submission.title}</strong>.{" "}
              {dialogCopy[pending.decision].body} Nothing is sent in this demo.
            </p>
            {pending.decision !== "approved" && (
              <div className="mt-4">
                <TextAreaField
                  id="review-note"
                  label="Note to the creator"
                  optional
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            )}
          </>
        )}
      </ConfirmDialog>
    </>
  );
}
