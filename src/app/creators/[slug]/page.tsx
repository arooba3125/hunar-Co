import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { JoinCallout } from "@/features/creators/join-callout";
import { PortfolioGallery } from "@/features/creators/portfolio-gallery";
import { categoryLabels } from "@/features/products/labels";
import { ProductCard } from "@/features/products/product-card";
import { SampleNotice } from "@/features/products/sample-notice";
import {
  getCreatorBySlug,
  getProductsByCreator,
  sampleCreators,
} from "@/features/products/sample-data";

// Build a page for every sample creator ahead of time.
export function generateStaticParams() {
  return sampleCreators.map((creator) => ({ slug: creator.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/creators/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);
  if (!creator) return { title: "Creator not found" };
  return { title: creator.name, description: creator.bio };
}

export default async function CreatorProfilePage({ params }: PageProps<"/creators/[slug]">) {
  const { slug } = await params;
  const creator = getCreatorBySlug(slug);

  // Unknown slug: show src/app/creators/[slug]/not-found.tsx
  if (!creator) notFound();

  const products = getProductsByCreator(creator.id);

  return (
    <>
      <Container className="pt-8 md:pt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/creators" className="hover:text-ink hover:underline">
                Creators
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {creator.name}
            </li>
          </ol>
        </nav>
      </Container>

      {/* Profile header */}
      <Container className="grid gap-10 py-8 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-14 md:py-12 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <ImagePlaceholder
          label="Creator portrait"
          tone={creator.tone}
          aspect="aspect-[4/5]"
          className="max-w-sm"
        />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {categoryLabels[creator.category]}
            {creator.city && (
              <span className="font-normal normal-case tracking-normal text-muted">
                {" "}
                · {creator.city}
              </span>
            )}
          </p>
          <h1 className="mt-3 text-display font-medium">{creator.name}</h1>

          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
            {(creator.biography ?? (creator.bio ? [creator.bio] : [])).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-muted">Discipline</dt>
              <dd className="mt-1 font-medium">{categoryLabels[creator.category]}</dd>
            </div>
            {creator.city && (
              <div>
                <dt className="text-muted">Based in</dt>
                <dd className="mt-1 font-medium">{creator.city}</dd>
              </div>
            )}
            <div>
              <dt className="text-muted">Designs on HunarCo</dt>
              <dd className="mt-1 font-medium">{products.length}</dd>
            </div>
          </dl>

          <div className="mt-8 max-w-2xl">
            <SampleNotice>
              This is a sample profile. The name, biography, city and designs are
              placeholders, not a real person.
            </SampleNotice>
          </div>
        </div>
      </Container>

      {/* Portfolio */}
      {products.length > 0 && (
        <section className="border-t border-line py-section" aria-labelledby="portfolio">
          <Container>
            <h2 id="portfolio" className="text-title font-medium">
              Portfolio
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Images from {creator.name}&rsquo;s designs. Select one to see the design.
            </p>
            <div className="mt-10">
              <PortfolioGallery products={products} />
            </div>
          </Container>
        </section>
      )}

      {/* Listings */}
      <section className="bg-sand py-section" aria-labelledby="listings">
        <Container>
          <h2 id="listings" className="text-title font-medium">
            Designs on HunarCo
          </h2>

          {products.length > 0 ? (
            <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} creator={creator} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-card border border-dashed border-ink/20 bg-surface px-6 py-14 text-center">
              <h3 className="text-2xl font-medium">No designs listed yet</h3>
              <p className="mx-auto mt-3 max-w-md text-muted">
                {creator.name} hasn&rsquo;t listed any designs. In the meantime, explore
                work from other creators.
              </p>
              <ButtonLink href="/discover" variant="secondary" className="mt-6">
                Discover designs
              </ButtonLink>
            </div>
          )}
        </Container>
      </section>

      <JoinCallout />
    </>
  );
}
