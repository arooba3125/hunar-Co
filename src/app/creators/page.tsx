import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CreatorDirectory } from "@/features/creators/creator-directory";
import { JoinCallout } from "@/features/creators/join-callout";
import { SampleNotice } from "@/features/products/sample-notice";
import { getProductsByCreator, sampleCreators } from "@/features/products/sample-data";

export const metadata: Metadata = {
  title: "Creators",
  description:
    "Meet the Pakistani fashion designers, artists, and craftspeople showing their work on HunarCo.",
};

export default function CreatorsPage() {
  // Count each creator's listings here on the server, so the browser
  // only receives the numbers, not the full product list.
  const listingCounts = Object.fromEntries(
    sampleCreators.map((creator) => [creator.id, getProductsByCreator(creator.id).length]),
  );

  return (
    <>
      <section className="border-b border-line bg-sand">
        <Container className="py-14 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Creators
          </p>
          <h1 className="text-display font-medium">The people behind the work</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            HunarCo features fashion designers, artists, and craftspeople from
            across Pakistan. Get to know each creator, see their portfolio, and
            find the designs they have listed.
          </p>
        </Container>
      </section>

      <Container className="py-10 md:py-14">
        <div className="mb-8">
          <SampleNotice>
            All creators on this page are sample profiles for demonstration. They
            are not real people.
          </SampleNotice>
        </div>
        <CreatorDirectory creators={sampleCreators} listingCounts={listingCounts} />
      </Container>

      <JoinCallout />
    </>
  );
}
