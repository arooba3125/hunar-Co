import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/features/products/product-card";
import { getCreatorById, sampleProducts } from "@/features/products/sample-data";

// Shows the first three featured SAMPLE designs. See features/products/sample-data.ts.
const featured = sampleProducts.filter((product) => product.featured).slice(0, 3);

export function FeaturedDesigns() {
  return (
    <section id="featured-designs" className="py-section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured designs"
            title="Pieces looking for their people"
            description="A preview of how designs will appear. The cards below use sample content."
          />
          <Link
            href="/discover"
            className="text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            See all designs →
          </Link>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} creator={getCreatorById(product.creatorId)} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
