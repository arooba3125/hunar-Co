import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

// Two side-by-side panels: one for buyers, one for creators.
export function AudienceActions() {
  return (
    <section id="for-creators" className="bg-deep py-section text-paper">
      <Container>
        <SectionHeading
          eyebrow="Get involved"
          title="Two ways to be part of HunarCo"
          tone="light"
          align="center"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-card border border-paper/15 bg-paper/5 p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              For buyers
            </p>
            <h3 className="mt-3 text-2xl font-medium md:text-3xl">
              Find work you won&rsquo;t see anywhere else
            </h3>
            <p className="mt-4 flex-1 leading-relaxed text-paper/75">
              Discover original designs and register interest in the ones you
              love. Your interest helps a design reach its production goal.
            </p>
            <div className="mt-8">
              <ButtonLink href="/discover" variant="light" size="lg">
                Explore designs
              </ButtonLink>
            </div>
          </div>

          <div className="flex flex-col rounded-card bg-brand p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">
              For creators
            </p>
            <h3 className="mt-3 text-2xl font-medium md:text-3xl">
              Show your work and see who wants it
            </h3>
            <p className="mt-4 flex-1 leading-relaxed text-paper/85">
              Share your designs with buyers, set an interest goal, and learn
              which pieces people want before you invest in making them.
            </p>
            <div className="mt-8">
              <ButtonLink href="/join-as-creator" variant="light" size="lg">
                Apply to join
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
