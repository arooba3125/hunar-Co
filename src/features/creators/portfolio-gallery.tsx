import Link from "next/link";
import type { Product } from "@/types";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

// A grid of every image from a creator's designs. Each tile links to its design.
// Built from the products' existing gallery data, so nothing is duplicated.
export function PortfolioGallery({ products }: { products: Product[] }) {
  const tiles = products.flatMap((product) =>
    product.gallery.map((image) => ({ product, image })),
  );

  if (tiles.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {tiles.map(({ product, image }) => (
        <li key={`${product.id}-${image.label}`}>
          <Link
            href={`/discover/${product.slug}`}
            className="group block rounded-media focus-visible:outline-offset-4"
          >
            <ImagePlaceholder
              label={image.label}
              tone={image.tone}
              aspect="aspect-square"
              className="transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="mt-2 block text-sm text-muted group-hover:text-ink">
              {product.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
