import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// Shown for any address on the site that doesn't exist.
export default function NotFound() {
  return (
    <Container className="py-section text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
        Page not found
      </p>
      <h1 className="mt-3 text-title font-medium">This page doesn&rsquo;t exist</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        Check the address, or head back to the home page.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Go to home page
        </ButtonLink>
        <ButtonLink href="/discover" size="lg" variant="secondary">
          Discover designs
        </ButtonLink>
      </div>
    </Container>
  );
}
