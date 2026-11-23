// Shared TypeScript types for HunarCo.
// These are early drafts to guide later work; adjust them as the data model is decided.

export type CreatorCategory = "fashion" | "art" | "craft";

export interface Creator {
  id: string;
  name: string;
  category: CreatorCategory;
  city?: string;
  bio?: string;
}

export interface Design {
  id: string;
  creatorId: string;
  title: string;
  description?: string;
  imageUrl?: string;
  /** Number of registered interests needed before production may be coordinated. */
  interestThreshold: number;
  interestCount: number;
}
