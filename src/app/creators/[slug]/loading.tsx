import { Container } from "@/components/ui/container";

// Shown while a creator profile is loading. Next.js uses this file
// automatically as a loading boundary for /creators/[slug].
export default function CreatorLoading() {
  return (
    <Container className="py-10">
      <div role="status" aria-label="Loading creator profile" className="animate-pulse">
        <div className="h-4 w-40 rounded-control bg-line" />
        <div className="mt-8 grid gap-10 md:grid-cols-[18rem_1fr] md:gap-14">
          <div className="aspect-[4/5] max-w-sm rounded-media bg-line" />
          <div className="space-y-4">
            <div className="h-4 w-32 rounded-control bg-line" />
            <div className="h-12 w-2/3 rounded-control bg-line" />
            <div className="h-4 w-full max-w-xl rounded-control bg-line" />
            <div className="h-4 w-5/6 max-w-xl rounded-control bg-line" />
            <div className="h-4 w-4/6 max-w-xl rounded-control bg-line" />
          </div>
        </div>
      </div>
    </Container>
  );
}
