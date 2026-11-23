import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-foreground/60">
        {siteConfig.name}, a student marketing project.
      </div>
    </footer>
  );
}
