import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// Shown when someone visits /discover/<slug> for a design that doesn't exist.
export default function ProductNotFound() {
  return (
    <Container className="py-section text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
        Design not found
      </p>
      <h1 className="mt-3 text-title font-medium">We couldn&rsquo;t find that design</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        It may have been removed, or the link may be wrong.
      </p>
      <ButtonLink href="/discover" size="lg" className="mt-8">
        Browse all designs
      </ButtonLink>
    </Container>
  );
}
