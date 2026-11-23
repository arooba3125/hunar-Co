import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { sampleCreators } from "./sample-content";

const categoryLabels = {
  fashion: "Fashion design",
  art: "Art",
  craft: "Craft",
};

// Shows SAMPLE creators only. See sample-content.ts.
export function FeaturedCreators() {
  return (
    <section id="featured-creators" className="border-t border-line py-section">
      <Container>
        <SectionHeading
          eyebrow="Creators"
          title="The hands behind the work"
          description="Every design on HunarCo is linked to the person who made it. These profiles are placeholders."
        />

        <ul className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {sampleCreators.map((creator) => (
            <li key={creator.id}>
              <ImagePlaceholder
                label="Creator portrait"
                tone={creator.tone}
                aspect="aspect-square"
              />
              <h3 className="mt-4 text-lg font-medium">{creator.name}</h3>
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
