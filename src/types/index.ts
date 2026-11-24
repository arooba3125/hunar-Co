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
