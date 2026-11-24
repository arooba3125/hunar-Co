import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { categoryLabels } from "@/features/products/labels";
import { sampleCreators as allCreators } from "@/features/products/sample-data";

const sampleCreators = allCreators.slice(0, 4);

// Shows SAMPLE creators only. See features/products/sample-data.ts.
export function FeaturedCreators() {
  return (
    <section id="featured-creators" className="border-t border-line py-section">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Creators"
            title="The hands behind the work"
            description="Every design on HunarCo is linked to the person who made it. These profiles are placeholders."
          />
          <Link
            href="/creators"
            className="text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            See all creators →
          </Link>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {sampleCreators.map((creator) => (
            <li key={creator.id}>
              <Link href={`/creators/${creator.slug}`} className="group block rounded-media">
                <ImagePlaceholder
                  label="Creator portrait"
                  tone={creator.tone}
                  aspect="aspect-square"
                  className="transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <h3 className="mt-4 text-lg font-medium group-hover:text-brand">
                  {creator.name}
                </h3>
              </Link>
              <p className="text-sm text-muted">
                {categoryLabels[creator.category]} · {creator.city}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
