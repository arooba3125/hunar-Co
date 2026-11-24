"use client";

// The interactive part of the Discover page. It keeps the chosen filters in
// state and works out which designs to show.

import { useMemo, useState } from "react";
import type { Creator, Product } from "@/types";
import { buttonClasses } from "@/components/ui/button";
import {
  CategoryButtons,
  SearchField,
  SortSelect,
  type CategoryFilter,
  type SortOption,
} from "./catalogue-filters";
import { ProductCard } from "./product-card";

type ProductCatalogueProps = {
  products: Product[];
  creators: Creator[];
};

export function ProductCatalogue({ products, creators }: ProductCatalogueProps) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const creatorsById = useMemo(
    () => new Map(creators.map((creator) => [creator.id, creator])),
    [creators],
  );

  const visibleProducts = useMemo(() => {
    const search = query.trim().toLowerCase();

    const filtered = products.filter((product) => {
      if (category !== "all" && product.category !== category) return false;
      if (!search) return true;
      const creatorName = creatorsById.get(product.creatorId)?.name ?? "";
      return (
        product.name.toLowerCase().includes(search) ||
        creatorName.toLowerCase().includes(search)
      );
    });

    // Copy before sorting so the original list isn't changed.
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "newest":
          return b.listedOn.localeCompare(a.listedOn);
        case "price-low":
          return a.pricePkr - b.pricePkr;
        case "price-high":
          return b.pricePkr - a.pricePkr;
        default:
          // Featured first, then newest
          return (
            Number(b.featured) - Number(a.featured) ||
            b.listedOn.localeCompare(a.listedOn)
          );
      }
    });
  }, [products, creatorsById, category, query, sort]);

  const resetFilters = () => {
    setCategory("all");
    setQuery("");
    setSort("featured");
  };

  const count = visibleProducts.length;

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col gap-4 rounded-card border border-line bg-surface/60 p-4 md:p-5 lg:flex-row lg:items-center lg:justify-between">
        <CategoryButtons value={category} onChange={setCategory} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="sm:w-72">
            <SearchField value={query} onChange={setQuery} />
          </div>
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Announced to screen readers whenever the results change */}
      <p aria-live="polite" className="mt-6 text-sm text-muted">
        Showing {count} {count === 1 ? "design" : "designs"}
      </p>

      {count > 0 ? (
        <ul className="mt-6 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                creator={creatorsById.get(product.creatorId)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-card border border-dashed border-line px-6 py-16 text-center">
          <h2 className="text-2xl font-medium">No designs match</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Try a different search term or category.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className={buttonClasses("secondary", "md", "mt-6")}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
