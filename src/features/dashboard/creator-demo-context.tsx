"use client";

// Shared demo state for the creator area (/creator/...).
// It lives in the /creator layout, so the dashboard and the "new design"
// page see the same data while you move between them. It is NOT saved:
// reloading the page or logging out resets it.

import { createContext, useContext, useState } from "react";
import type { Category, DesignSubmission } from "@/types";
import { useDemoAuth } from "@/features/auth/use-demo-auth";
import { demoSubmissions } from "@/features/demo/demo-data";
import { getCreatorById } from "@/features/products/sample-data";

export type CreatorProfileDraft = {
  name: string;
  city: string;
  discipline: Category | "";
  bio: string;
  portfolioUrl: string;
};

type CreatorDemoState = {
  creatorId: string;
  /** Slug of the public profile page, if this creator has one */
  publicSlug?: string;
  profile: CreatorProfileDraft;
  submissions: DesignSubmission[];
  updateProfile: (profile: CreatorProfileDraft) => void;
  addSubmission: (submission: Omit<DesignSubmission, "id" | "creatorId">) => void;
};

const CreatorDemoContext = createContext<CreatorDemoState | null>(null);

export function CreatorDemoProvider({ children }: { children: React.ReactNode }) {
  const auth = useDemoAuth();
  const user = auth.status === "signed-in" ? auth.user : null;
  const creator = user?.creatorId ? getCreatorById(user.creatorId) : undefined;
  const creatorId = user?.creatorId ?? user?.id ?? "unknown";

  // Starting values come from the sample data (or are empty for a new creator).
  const [profile, setProfile] = useState<CreatorProfileDraft>(() => ({
    name: auth.status === "signed-in" ? auth.displayName : "",
    city: creator?.city ?? "",
    discipline: creator?.category ?? "",
    bio: creator?.bio ?? "",
    portfolioUrl: "",
  }));
  const [submissions, setSubmissions] = useState<DesignSubmission[]>(() =>
    demoSubmissions.filter((submission) => submission.creatorId === creatorId),
  );

  const addSubmission: CreatorDemoState["addSubmission"] = (submission) => {
    setSubmissions((previous) => [
      { ...submission, id: `demo-submission-${Date.now()}`, creatorId },
      ...previous,
    ]);
  };

  return (
    <CreatorDemoContext.Provider
      value={{
        creatorId,
        publicSlug: creator?.slug,
        profile,
        submissions,
        updateProfile: setProfile,
        addSubmission,
      }}
    >
      {children}
    </CreatorDemoContext.Provider>
  );
}

export function useCreatorDemo() {
  const value = useContext(CreatorDemoContext);
  if (!value) throw new Error("useCreatorDemo must be used inside CreatorDemoProvider");
  return value;
}
