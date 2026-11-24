import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { formatDate, formatPrice } from "@/lib/format";
import { categoryLabels, isAcceptingInterest } from "@/features/products/labels";
import { InterestForm } from "@/features/products/interest-form";
import { InterestProgress } from "@/features/products/interest-progress";
import { ProductCard } from "@/features/products/product-card";
import { ProductGallery } from "@/features/products/product-gallery";
import { SampleNotice } from "@/features/products/sample-notice";
import { StatusBadge } from "@/features/products/status-badge";
import {
  getCreatorById,
  getProductBySlug,
  getRelatedProducts,
  sampleProducts,
} from "@/features/products/sample-data";

// Build a page for every sample design ahead of time.
export function generateStaticParams() {
  return sampleProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/discover/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Design not found" };
  return { title: product.name, description: product.summary };
}

export default async function ProductPage({ params }: PageProps<"/discover/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  // Unknown slug: show src/app/discover/[slug]/not-found.tsx
  if (!product) notFound();

  const creator = getCreatorById(product.creatorId);
  const related = getRelatedProducts(product);
  const accepting = isAcceptingInterest(product.status);

  return (
    <>
      <Container className="pt-8 md:pt-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/discover" className="hover:text-ink hover:underline">
                Discover
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>
      </Container>

      {/* Main product area */}
      <Container className="grid gap-10 py-8 md:py-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.gallery} />

        <div className="lg:pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {categoryLabels[product.category]}
            </span>
            <StatusBadge status={product.status} />
          </div>

          <h1 className="mt-4 text-title font-medium">{product.name}</h1>
          {creator && (
            <p className="mt-2 text-muted">
              by{" "}
              <Link
                href={`/creators/${creator.slug}`}
                className="font-medium text-ink underline-offset-4 hover:underline"
              >
                {creator.name}
              </Link>
              {creator.city && ` · ${creator.city}`}
            </p>
          )}

          <p className="mt-6 text-3xl font-semibold">{formatPrice(product.pricePkr)}</p>
          <p className="mt-1 text-sm text-muted">
            Expected price (sample). Nothing is charged when you register interest.
          </p>

          <div className="mt-8 rounded-card border border-line bg-surface p-5 sm:p-6">
            <InterestProgress
              current={product.interestCount}
              target={product.interestTarget}
              size="lg"
            />
            <dl className="mt-5 grid gap-4 border-t border-line pt-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted">Interest closes (sample date)</dt>
                <dd className="mt-1 font-medium">{formatDate(product.closesOn)}</dd>
              </div>
              <div>
                <dt className="text-muted">Estimated timeline</dt>
                <dd className="mt-1 font-medium">{product.estimatedTimeline}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6">
            <InterestForm productName={product.name} acceptingInterest={accepting} />
            {accepting && (
              <p className="mt-3 text-sm text-muted">
                Free and non-binding. It is not an order.
              </p>
            )}
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-medium">About this design</h2>
            <p className="mt-3 leading-relaxed text-muted">{product.description}</p>
            <ul className="mt-5 space-y-2">
              {product.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-sm">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <SampleNotice>
              This design, its creator, price, interest numbers and dates are sample
              content.
            </SampleNotice>
          </div>
        </div>
      </Container>

      {/* What happens next */}
      <section className="bg-sand py-section" aria-labelledby="what-happens">
        <Container>
          <h2 id="what-happens" className="text-title font-medium">
            What happens next
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            How HunarCo plans to handle each design. Details may change as the
            platform develops.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-card border border-line bg-surface p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
                If the target is reached
              </p>
              <p className="mt-3 leading-relaxed">
                HunarCo may work with the creator to plan a production run. Everyone
                who registered interest would be contacted with the confirmed price
                and timeline, and could decide then whether to order. Nobody would be
                charged before that point.
              </p>
            </div>
            <div className="rounded-card border border-line bg-surface p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                If the target isn&rsquo;t reached
              </p>
              <p className="mt-3 leading-relaxed">
                Registration closes on the closing date and the design is not
                produced. Nobody is charged, because no payment is ever taken at the
                interest stage, and nothing more is needed from you. The creator may
                relaunch the design later.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* About the creator */}
      {creator && (
        <section className="py-section" aria-labelledby="about-creator">
          <Container className="grid items-center gap-8 md:grid-cols-[12rem_1fr]">
            <ImagePlaceholder label="Creator portrait" tone={creator.tone} aspect="aspect-square" className="max-w-48" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                About the creator
              </p>
              <h2 id="about-creator" className="mt-2 text-2xl font-medium">
                {creator.name}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {categoryLabels[creator.category]}
                {creator.city && ` · ${creator.city}`}
              </p>
              {creator.bio && <p className="mt-4 max-w-2xl leading-relaxed text-muted">{creator.bio}</p>}
              <Link
                href={`/creators/${creator.slug}`}
                className="mt-5 inline-flex text-sm font-medium text-brand underline-offset-4 hover:underline"
              >
                View {creator.name}&rsquo;s profile<span aria-hidden="true">&nbsp;→</span>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* More designs */}
      {related.length > 0 && (
        <section className="border-t border-line py-section" aria-labelledby="more-designs">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="more-designs" className="text-title font-medium">
                More in {categoryLabels[product.category]}
              </h2>
              <Link href="/discover" className="text-sm font-medium text-brand underline-offset-4 hover:underline">
                See all designs →
              </Link>
            </div>
            <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <ProductCard product={item} creator={getCreatorById(item.creatorId)} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
