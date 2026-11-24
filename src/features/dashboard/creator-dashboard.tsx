"use client";

// Creator dashboard: profile completion, design submissions, profile editing.
// Everything here is demo state from creator-demo-context.tsx.

import { useState } from "react";
import Link from "next/link";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FormAlert, SelectField, TextAreaField, TextField } from "@/components/ui/form-fields";
import { Pill } from "@/components/ui/pill";
import { formatDate, formatPrice } from "@/lib/format";
import { isValidWebUrl } from "@/lib/validation";
import { useDemoAuth } from "@/features/auth/use-demo-auth";
import { reviewStatusLabels, reviewStatusTone } from "@/features/demo/labels";
import { categoryLabels } from "@/features/products/labels";
import { InterestProgress } from "@/features/products/interest-progress";
import { getProductBySlug } from "@/features/products/sample-data";
import { StatusBadge } from "@/features/products/status-badge";
import { type CreatorProfileDraft, useCreatorDemo } from "./creator-demo-context";
import { DashboardIntro, DemoDataNotice, EmptyState, Panel } from "./dashboard-ui";

const disciplineOptions = (Object.keys(categoryLabels) as (keyof typeof categoryLabels)[]).map(
  (value) => ({ value, label: categoryLabels[value] }),
);

export function CreatorDashboard() {
  const auth = useDemoAuth();
  const { profile, submissions, publicSlug } = useCreatorDemo();
  const welcomeName = auth.status === "signed-in" ? auth.displayName : profile.name;

  // Profile completion: each item is done or not.
  const checklist = [
    { label: "Add your name", done: Boolean(profile.name.trim()) },
    { label: "Add your city", done: Boolean(profile.city.trim()) },
    { label: "Choose your discipline", done: Boolean(profile.discipline) },
    { label: "Write a short bio (40+ characters)", done: profile.bio.trim().length >= 40 },
    { label: "Add a portfolio link", done: Boolean(profile.portfolioUrl.trim()) },
    { label: "Submit your first design", done: submissions.length > 0 },
  ];
  const completed = checklist.filter((item) => item.done).length;
  const percent = Math.round((completed / checklist.length) * 100);

  return (
    <>
      <DashboardIntro
        eyebrow="Creator dashboard"
        title={`Welcome, ${welcomeName}`}
        actions={
          <>
            <ButtonLink href="/creator/designs/new">Submit a new design</ButtonLink>
            {publicSlug && (
              <ButtonLink href={`/creators/${publicSlug}`} variant="secondary">
                View public profile
              </ButtonLink>
            )}
          </>
        }
      >
        Track your design submissions, see how launched designs are doing, and keep your profile up
        to date.
      </DashboardIntro>

      <Container className="space-y-8 py-10 md:py-12">
        <DemoDataNotice>
          Fictional sample data. Edits and submissions stay in this browser tab and are lost on
          reload.
        </DemoDataNotice>

        <Panel id="completion" title="Profile completion" description={`${completed} of ${checklist.length} steps done`}>
          <div
            role="progressbar"
            aria-label="Profile completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="h-2.5 overflow-hidden rounded-control bg-line"
          >
            <div
              className={`h-full rounded-control ${percent === 100 ? "bg-sage" : "bg-brand"}`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-medium">{percent}% complete</p>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {checklist.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                    item.done ? "bg-sage text-paper" : "border border-line"
                  }`}
                >
                  {item.done ? "✓" : ""}
                </span>
                <span className={item.done ? "text-muted line-through" : ""}>
                  {item.label}
                  <span className="sr-only">{item.done ? " (done)" : " (to do)"}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
          <Panel
            id="submissions"
            title="Your designs"
            description="Submissions and their review or launch status."
            actions={
              submissions.length > 0 && (
                <ButtonLink href="/creator/designs/new" variant="secondary">
                  New design
                </ButtonLink>
              )
            }
          >
            {submissions.length === 0 ? (
              <EmptyState
                title="No designs yet"
                action={<ButtonLink href="/creator/designs/new">Submit your first design</ButtonLink>}
              >
                Submit a design for review. Once approved, it goes live on Discover and buyers can
                register interest.
              </EmptyState>
            ) : (
              <ul className="divide-y divide-line">
                {submissions.map((submission) => {
                  const product = submission.productSlug ? getProductBySlug(submission.productSlug) : undefined;
                  return (
                    <li key={submission.id} className="py-5 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-medium">{submission.title}</h3>
                          <p className="text-sm text-muted">
                            {categoryLabels[submission.category]} · {formatPrice(submission.pricePkr)} ·
                            submitted {formatDate(submission.submittedOn)}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Pill tone={reviewStatusTone[submission.reviewStatus]}>
                            {reviewStatusLabels[submission.reviewStatus]}
                          </Pill>
                          {product && <StatusBadge status={product.status} />}
                        </div>
                      </div>
                      {submission.reviewNote && (
                        <p className="mt-3 rounded-media bg-sand px-4 py-3 text-sm">
                          <strong>Reviewer note:</strong> {submission.reviewNote}
                        </p>
                      )}
                      {product && (
                        <div className="mt-3 max-w-md">
                          <InterestProgress current={product.interestCount} target={product.interestTarget} />
                          <Link
                            href={`/discover/${product.slug}`}
                            className="mt-2 inline-block text-sm font-medium text-brand underline-offset-4 hover:underline"
                          >
                            View live listing<span className="sr-only">: {product.name}</span> →
                          </Link>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>

          <CreatorProfileEditor />
        </div>
      </Container>
    </>
  );
}

type ProfileErrors = Partial<Record<keyof CreatorProfileDraft, string>>;

function CreatorProfileEditor() {
  const { profile, updateProfile } = useCreatorDemo();
  const [draft, setDraft] = useState(profile);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof CreatorProfileDraft>(key: K, value: CreatorProfileDraft[K]) => {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setSaved(false);
    if (errors[key]) setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const save = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found: ProfileErrors = {};
    if (!draft.name.trim()) found.name = "Please enter your name.";
    if (draft.portfolioUrl.trim() && !isValidWebUrl(draft.portfolioUrl)) {
      found.portfolioUrl = "Please enter a full web address starting with https://.";
    }
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`creator-${firstInvalid}`)?.focus();
      return;
    }
    updateProfile({ ...draft, name: draft.name.trim() });
    setSaved(true);
  };

  return (
    <Panel id="edit-profile" title="Edit profile" description="Shown on your public creator page.">
      <form noValidate onSubmit={save} className="space-y-4">
        {saved && (
          <FormAlert tone="success">
            <p className="text-sm">Profile updated for this demo session. Nothing was sent to a server.</p>
          </FormAlert>
        )}
        <TextField
          id="creator-name"
          label="Display name"
          value={draft.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
        />
        <TextField
          id="creator-city"
          label="City"
          optional
          value={draft.city}
          onChange={(e) => update("city", e.target.value)}
        />
        <SelectField
          id="creator-discipline"
          label="Discipline"
          optional
          placeholder="Choose one"
          options={disciplineOptions}
          value={draft.discipline}
          onChange={(e) => update("discipline", e.target.value as CreatorProfileDraft["discipline"])}
        />
        <TextAreaField
          id="creator-bio"
          label="Short bio"
          optional
          rows={4}
          maxLength={300}
          value={draft.bio}
          onChange={(e) => update("bio", e.target.value)}
          hint={`${draft.bio.length}/300 characters`}
        />
        <TextField
          id="creator-portfolioUrl"
          label="Portfolio link"
          optional
          type="url"
          placeholder="https://"
          value={draft.portfolioUrl}
          onChange={(e) => update("portfolioUrl", e.target.value)}
          error={errors.portfolioUrl}
        />
        <button type="submit" className={buttonClasses("primary", "md", "w-full")}>
          Save profile
        </button>
      </form>
    </Panel>
  );
}
