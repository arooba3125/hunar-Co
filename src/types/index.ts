// Shared TypeScript types for HunarCo.
// These are early drafts; adjust them as the real data model is decided.

import type { PlaceholderTone } from "@/components/ui/image-placeholder";

export type Category = "fashion" | "art" | "crafts";

export interface Creator {
  id: string;
  /** URL-friendly name, used in /creators/[slug] */
  slug: string;
  name: string;
  /** The creator's discipline */
  category: Category;
  city?: string;
  /** One or two sentences for cards */
  bio?: string;
  /** Longer biography for the profile page, one string per paragraph */
  biography?: string[];
  /** Colour used for this creator's placeholder portrait */
  tone: PlaceholderTone;
}

/**
 * Where a design is in its launch:
 * - open: collecting interest
 * - closing-soon: collecting interest, closing date is near
 * - target-reached: interest target met; HunarCo may coordinate production
 * - closed: no longer collecting interest
 */
export type LaunchStatus = "open" | "closing-soon" | "target-reached" | "closed";

export interface GalleryImage {
  /** What the real photo will show; used as alt text */
  label: string;
  tone: PlaceholderTone;
}

export interface Product {
  id: string;
  /** URL-friendly name, used in /discover/[slug] */
  slug: string;
  name: string;
  category: Category;
  creatorId: string;
  /** One-line summary for cards */
  summary: string;
  /** Longer description for the detail page */
  description: string;
  /** Short bullet points: materials, size, technique */
  details: string[];
  /** Expected price in Pakistani rupees, whole numbers */
  pricePkr: number;
  interestCount: number;
  /** Interests needed before production may be coordinated */
  interestTarget: number;
  status: LaunchStatus;
  featured: boolean;
  /** ISO date (YYYY-MM-DD) the design was listed; used for "Newest" */
  listedOn: string;
  /** ISO date (YYYY-MM-DD) interest registration closes */
  closesOn: string;
  /** Rough timeline if the target is reached */
  estimatedTimeline: string;
  gallery: GalleryImage[];
}

// ---------------------------------------------------------------------------
// Demo accounts and dashboard records (Stage 6).
// Used only by the frontend demo; a real backend would define these.
// ---------------------------------------------------------------------------

export type Role = "buyer" | "creator" | "admin";

export type UserStatus = "active" | "invited" | "suspended";

export interface DemoUser {
  id: string;
  name: string;
  /** Fictional address on the reserved .test domain */
  email: string;
  role: Role;
  status: UserStatus;
  /** ISO date (YYYY-MM-DD) */
  joinedOn: string;
  city?: string;
  /** For creators: which sample creator profile belongs to this account */
  creatorId?: string;
  /** True for the accounts listed on the login page */
  loginable?: boolean;
}

export interface BuyerInterest {
  productId: string;
  quantity: number;
  /** ISO date (YYYY-MM-DD) */
  registeredOn: string;
}

/** Where a creator's design submission is in HunarCo's review */
export type ReviewStatus = "in-review" | "changes-requested" | "approved" | "rejected";

export interface DesignSubmission {
  id: string;
  creatorId: string;
  title: string;
  category: Category;
  pricePkr: number;
  /** ISO date (YYYY-MM-DD) */
  submittedOn: string;
  reviewStatus: ReviewStatus;
  /** Set once the design is live on /discover */
  productSlug?: string;
  /** Feedback from the reviewer */
  reviewNote?: string;
}

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface CreatorApplication {
  id: string;
  name: string;
  city: string;
  discipline: Category | "other";
  portfolioUrl: string;
  summary: string;
  /** ISO date (YYYY-MM-DD) */
  submittedOn: string;
  status: ApplicationStatus;
}
