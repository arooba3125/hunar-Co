"use client";

import type { Role } from "@/types";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { roleLabels } from "@/features/demo/labels";
import { dashboardPaths } from "./demo-session";
import { useDemoAuth } from "./use-demo-auth";

type AccessDeniedProps = {
  currentRole: Role;
  requiredRole: Role;
};

// Shown when the demo role doesn't match the area being opened.
export function AccessDenied({ currentRole, requiredRole }: AccessDeniedProps) {
  const { signOut } = useDemoAuth();

  return (
    <Container className="py-section">
      <div className="mx-auto max-w-xl rounded-card border border-line bg-surface p-8 text-center sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          Access denied
        </p>
        <h1 className="mt-3 text-title font-medium">This area isn&rsquo;t for your account</h1>
        <p className="mt-4 leading-relaxed text-muted">
          You&rsquo;re signed in to the demo as a{" "}
          <strong className="text-ink">{roleLabels[currentRole]}</strong>. This page is for{" "}
          {roleLabels[requiredRole].toLowerCase()} accounts.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={dashboardPaths[currentRole]}>Go to my dashboard</ButtonLink>
          <button type="button" onClick={signOut} className={buttonClasses("secondary")}>
            Log out
          </button>
        </div>
        <p className="mt-6 text-xs text-muted">
          Demo only: this check runs in the browser and is not real security.
        </p>
      </div>
    </Container>
  );
}
