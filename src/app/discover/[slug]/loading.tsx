import { Container } from "@/components/ui/container";

// Shown while a design page is loading. Next.js uses this file automatically
// as a loading boundary for /discover/[slug].
export default function ProductLoading() {
  return (
    <Container className="py-10">
      <div role="status" aria-label="Loading design" className="animate-pulse">
        <div className="h-4 w-40 rounded-control bg-line" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="aspect-[4/5] rounded-media bg-line" />
          <div className="space-y-4 lg:pt-4">
            <div className="h-4 w-24 rounded-control bg-line" />
            <div className="h-10 w-3/4 rounded-control bg-line" />
            <div className="h-4 w-1/3 rounded-control bg-line" />
            <div className="h-8 w-32 rounded-control bg-line" />
            <div className="h-36 rounded-card bg-line" />
            <div className="h-12 w-48 rounded-control bg-line" />
          </div>
        </div>
      </div>
    </Container>
  );
}
