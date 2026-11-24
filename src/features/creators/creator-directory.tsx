"use client";

// The interactive grid on /creators, with a discipline filter.

import { useState } from "react";
import type { Creator } from "@/types";
import { buttonClasses } from "@/components/ui/button";
import { CategoryButtons, type CategoryFilter } from "@/features/products/catalogue-filters";
import { CreatorCard } from "./creator-card";

type CreatorDirectoryProps = {
  creators: Creator[];
  /** Number of listings per creator id, worked out on the server */
  listingCounts: Record<string, number>;
};

export function CreatorDirectory({ creators, listingCounts }: CreatorDirectoryProps) {
  const [discipline, setDiscipline] = useState<CategoryFilter>("all");

  const visible =
    discipline === "all"
      ? creators
      : creators.filter((creator) => creator.category === discipline);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryButtons value={discipline} onChange={setDiscipline} label="Filter by discipline" />
        <p aria-live="polite" className="text-sm text-muted">
          Showing {visible.length} {visible.length === 1 ? "creator" : "creators"}
        </p>
      </div>

      {visible.length > 0 ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((creator) => (
            <li key={creator.id}>
              <CreatorCard creator={creator} listingCount={listingCounts[creator.id] ?? 0} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-card border border-dashed border-line px-6 py-16 text-center">
          <h2 className="text-2xl font-medium">No creators in this discipline yet</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Try another discipline, or check back as more creators join.
          </p>
          <button
            type="button"
            onClick={() => setDiscipline("all")}
            className={buttonClasses("secondary", "md", "mt-6")}
          >
            Show all creators
          </button>
        </div>
      )}
    </div>
  );
}
