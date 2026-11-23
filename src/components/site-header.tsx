import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          {siteConfig.name}
        </Link>
        {/* Navigation links will be added when pages exist. */}
      </div>
    </header>
  );
}
