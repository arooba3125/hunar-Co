import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { findSampleCreator, sampleDesigns } from "./sample-content";

// Shows SAMPLE designs only. See sample-content.ts.
export function FeaturedDesigns() {
  return (
    <section id="featured-designs" className="py-section">
      <Container>
        <SectionHeading
          eyebrow="Featured designs"
          title="Pieces looking for their people"
          description="A preview of how designs will appear. The cards below use sample content."
        />

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sampleDesigns.map((design) => {
            const creator = findSampleCreator(design.creatorId);
            const percent = Math.min(
              100,
              Math.round((design.interestCount / design.interestThreshold) * 100),
            );

            return (
              <li key={design.id} className="group">
                <div className="relative">
                  <ImagePlaceholder label="Design photo" tone={design.tone} />
                  <span className="absolute right-3 top-3 rounded-control bg-ink/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-paper">
                    Sample
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-medium">{design.title}</h3>
                {creator && (
                  <p className="mt-1 text-sm text-muted">
                    by {creator.name} · {creator.city}
                  </p>
                )}

                {/* Interest progress (sample numbers) */}
                <div className="mt-4">
                  <div
                    className="h-1.5 overflow-hidden rounded-control bg-line"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={design.interestThreshold}
                    aria-valuenow={design.interestCount}
                    aria-label="Sample interest progress"
                  >
                    <div
                      className="h-full rounded-control bg-brand"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {design.interestCount} of {design.interestThreshold}{" "}
                    interests (sample)
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
