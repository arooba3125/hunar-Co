import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// Shown when someone visits /creators/<slug> for a creator that doesn't exist.
export default function CreatorNotFound() {
  return (
    <Container className="py-section text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
        Creator not found
      </p>
      <h1 className="mt-3 text-title font-medium">We couldn&rsquo;t find that creator</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        The profile may have been removed, or the link may be wrong.
      </p>
      <ButtonLink href="/creators" size="lg" className="mt-8">
        Browse all creators
      </ButtonLink>
    </Container>
  );
}
