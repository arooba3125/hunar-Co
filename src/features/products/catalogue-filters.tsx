// Controls for the Discover page: category buttons, search box and sort menu.
// They don't hold any state themselves; the parent passes values and handlers.

import type { Category } from "@/types";
import { categoryLabels } from "./labels";

export type CategoryFilter = Category | "all";
export type SortOption = "featured" | "newest" | "price-low" | "price-high";

export const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  newest: "Newest",
  "price-low": "Price: low to high",
  "price-high": "Price: high to low",
};

const categoryOptions: CategoryFilter[] = ["all", "fashion", "art", "crafts"];

type CategoryButtonsProps = {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
  /** Read out by screen readers, e.g. "Filter by discipline" */
  label?: string;
};

export function CategoryButtons({
  value,
  onChange,
  label = "Filter by category",
}: CategoryButtonsProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {categoryOptions.map((option) => {
        const selected = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option)}
            className={`h-10 rounded-control border px-4 text-sm font-medium transition-colors ${
              selected
                ? "border-ink bg-ink text-paper"
                : "border-line bg-surface text-ink hover:border-ink/40"
            }`}
          >
            {option === "all" ? "All" : categoryLabels[option]}
          </button>
        );
      })}
    </div>
  );
}

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  /** Override these to reuse the search box elsewhere (e.g. the admin lists) */
  id?: string;
  label?: string;
  placeholder?: string;
};

export function SearchField({
  value,
  onChange,
  id = "catalogue-search",
  label = "Search by design or creator name",
  placeholder = "Search designs or creators",
}: SearchFieldProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      >
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-control border border-line bg-surface pl-11 pr-4 text-sm placeholder:text-muted/80 focus:border-ink"
      />
    </div>
  );
}

type SortSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="catalogue-sort" className="text-sm text-muted whitespace-nowrap">
        Sort by
      </label>
      <select
        id="catalogue-sort"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="h-11 rounded-control border border-line bg-surface px-4 text-sm focus:border-ink"
      >
        {(Object.keys(sortLabels) as SortOption[]).map((option) => (
          <option key={option} value={option}>
            {sortLabels[option]}
          </option>
        ))}
      </select>
    </div>
  );
}
