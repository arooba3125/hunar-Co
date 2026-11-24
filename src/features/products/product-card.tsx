import Link from "next/link";
import type { Creator, Product } from "@/types";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { formatPrice } from "@/lib/format";
import { categoryLabels } from "./labels";
import { InterestProgress } from "./interest-progress";
import { StatusBadge } from "./status-badge";

type ProductCardProps = {
  product: Product;
  creator?: Creator;
};

// One design in a grid: image, name, creator, price, progress and status.
export function ProductCard({ product, creator }: ProductCardProps) {
  const href = `/discover/${product.slug}`;
  const cover = product.gallery[0];

  return (
    <article className="group flex h-full flex-col">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block">
        <ImagePlaceholder
          label={cover?.label ?? product.name}
          tone={cover?.tone ?? "brand"}
          className="transition-transform duration-300 group-hover:scale-[1.015]"
        />
        <span className="absolute right-3 top-3 rounded-control bg-ink/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-paper">
          Sample
        </span>
      </Link>

      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {categoryLabels[product.category]}
          </span>
          <StatusBadge status={product.status} />
        </div>

        <h3 className="mt-3 text-xl font-medium">
          <Link href={href} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>
        {creator && (
          <p className="mt-1 text-sm text-muted">
            by{" "}
            <Link
              href={`/creators/${creator.slug}`}
              className="underline-offset-4 hover:text-ink hover:underline"
            >
              {creator.name}
            </Link>
          </p>
        )}

        <p className="mt-3 text-lg font-semibold">{formatPrice(product.pricePkr)}</p>

        <div className="mt-4">
          <InterestProgress
            current={product.interestCount}
            target={product.interestTarget}
          />
        </div>

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1 self-start text-sm font-medium text-brand underline-offset-4 hover:underline"
        >
          View details
          <span className="sr-only"> for {product.name}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
