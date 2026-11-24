import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ProductCatalogue } from "@/features/products/product-catalogue";
import { SampleNotice } from "@/features/products/sample-notice";
import { sampleCreators, sampleProducts } from "@/features/products/sample-data";

export const metadata: Metadata = {
  title: "Discover designs",
  description:
    "Browse original designs from Pakistani fashion designers, artists, and craftspeople, and register interest in the ones you love.",
};

export default function DiscoverPage() {
  return (
    <>
      <section className="border-b border-line bg-sand">
        <Container className="py-14 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Discover
          </p>
          <h1 className="text-display font-medium">Original designs, waiting for you</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Browse work from fashion designers, artists, and craftspeople. Register
            interest in the pieces you would like to own. When a design reaches its
            target, HunarCo may coordinate a production run with its creator.
          </p>
        </Container>
      </section>

      <Container className="py-10 md:py-14">
        <div className="mb-8">
          <SampleNotice>
            All designs, creators, prices and interest numbers on this page are
            sample content for demonstration.
          </SampleNotice>
        </div>
        <ProductCatalogue products={sampleProducts} creators={sampleCreators} />
      </Container>
    </>
  );
}
