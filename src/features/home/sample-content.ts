// ⚠️ TEMPORARY SAMPLE CONTENT
// Everything in this file is placeholder data for layout and design work only.
// These are NOT real creators or designs, and the interest numbers are made up
// to show how the interface looks. Replace this file with real data
// (from Supabase) in a later stage.

import type { Creator, Design } from "@/types";
import type { PlaceholderTone } from "@/components/ui/image-placeholder";

export const sampleCreators: (Creator & { tone: PlaceholderTone })[] = [
  {
    id: "sample-creator-1",
    name: "Sample Creator One",
    category: "fashion",
    city: "Lahore",
    bio: "Placeholder bio for a fashion designer.",
    tone: "brand",
  },
  {
    id: "sample-creator-2",
    name: "Sample Creator Two",
    category: "craft",
    city: "Multan",
    bio: "Placeholder bio for a craftsperson.",
    tone: "deep",
  },
  {
    id: "sample-creator-3",
    name: "Sample Creator Three",
    category: "art",
    city: "Karachi",
    bio: "Placeholder bio for an artist.",
    tone: "sage",
  },
  {
    id: "sample-creator-4",
    name: "Sample Creator Four",
    category: "craft",
    city: "Hyderabad",
    bio: "Placeholder bio for a craftsperson.",
    tone: "accent",
  },
];

export const sampleDesigns: (Design & { tone: PlaceholderTone })[] = [
  {
    id: "sample-design-1",
    creatorId: "sample-creator-1",
    title: "Sample design: embroidered kurta",
    interestThreshold: 50,
    interestCount: 18,
    tone: "brand",
  },
  {
    id: "sample-design-2",
    creatorId: "sample-creator-2",
    title: "Sample design: block-printed shawl",
    interestThreshold: 40,
    interestCount: 31,
    tone: "deep",
  },
  {
    id: "sample-design-3",
    creatorId: "sample-creator-3",
    title: "Sample design: miniature-style print",
    interestThreshold: 25,
    interestCount: 7,
    tone: "accent",
  },
];

export function findSampleCreator(id: string) {
  return sampleCreators.find((creator) => creator.id === id);
}
