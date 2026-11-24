import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// The "Apply to join" banner used at the bottom of creator pages.
export function JoinCallout() {
  return (
    <section className="bg-deep py-section text-paper" aria-labelledby="join-callout">
      <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            For creators
          </p>
          <h2 id="join-callout" className="mt-3 text-title font-medium">
            Make original work? Show it on HunarCo.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-paper/75">
            Pakistani fashion designers, artists, and craftspeople can apply to list
            their designs and see who wants them before production.
          </p>
        </div>
        <ButtonLink href="/join-as-creator" variant="light" size="lg">
          Apply to join
        </ButtonLink>
      </Container>
    </section>
  );
}
