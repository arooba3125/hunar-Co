import Link from "next/link";
import type { Creator } from "@/types";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { categoryLabels } from "@/features/products/labels";

type CreatorCardProps = {
  creator: Creator;
  /** How many designs this creator has listed */
  listingCount: number;
};

// One creator in a grid: portrait, name, discipline, short bio and profile link.
export function CreatorCard({ creator, listingCount }: CreatorCardProps) {
  const href = `/creators/${creator.slug}`;

  return (
    <article className="group flex h-full flex-col rounded-card border border-line bg-surface p-4 transition-colors hover:border-ink/30">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block">
        <ImagePlaceholder label="Creator portrait" tone={creator.tone} aspect="aspect-square" />
        <span className="absolute right-3 top-3 rounded-control bg-ink/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-paper">
          Sample
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {categoryLabels[creator.category]}
          {creator.city && <span className="font-normal normal-case tracking-normal text-muted"> · {creator.city}</span>}
        </p>
        <h3 className="mt-2 text-xl font-medium">
          <Link href={href} className="hover:text-brand">
            {creator.name}
          </Link>
        </h3>
        {creator.bio && <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{creator.bio}</p>}

        <div className="mt-5 flex items-center justify-between gap-3 text-sm">
          <span className="text-muted">
            {listingCount === 0
              ? "No listings yet"
              : `${listingCount} ${listingCount === 1 ? "design" : "designs"} listed`}
          </span>
          <Link href={href} className="font-medium text-brand underline-offset-4 hover:underline">
            View profile<span className="sr-only"> of {creator.name}</span>
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
