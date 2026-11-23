import { siteConfig } from "@/lib/site-config";

// Home page placeholder. The real design comes in a later stage.
export default function HomePage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">{siteConfig.name}</h1>
      <p className="mt-4 text-lg text-foreground/70">{siteConfig.tagline}</p>
      <p className="mt-10 text-sm text-foreground/50">
        Project foundation is running. Pages are coming soon.
      </p>
    </section>
  );
}
