import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export function Hero() {
  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-12 py-section lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Original work from Pakistan
          </p>
          <h1 className="text-display font-medium text-ink">
            Where Pakistan&rsquo;s makers meet the people who{" "}
            <em className="text-brand">want their work</em>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            HunarCo showcases fashion designers, artists, and craftspeople.
            Buyers register interest in the designs they love, and when a
            design reaches its goal, HunarCo may help bring it into production.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/discover" size="lg">
              Explore designs
            </ButtonLink>
            <ButtonLink href="/join-as-creator" size="lg" variant="secondary">
              I&rsquo;m a creator
            </ButtonLink>
          </div>
        </div>

        {/* Image collage: placeholders until real photos are added */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <ImagePlaceholder
            label="Featured textile"
            tone="brand"
            aspect="aspect-[3/4]"
            className="translate-y-6"
          />
          <div className="grid gap-4 sm:gap-5">
            <ImagePlaceholder label="Studio portrait" tone="deep" aspect="aspect-square" />
            <ImagePlaceholder label="Craft detail" tone="accent" aspect="aspect-square" />
          </div>
        </div>
      </Container>
    </section>
  );
}
