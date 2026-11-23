import Link from "next/link";
import { mainNav, primaryAction } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/90 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between gap-6 md:h-20">
        <Wordmark />

        {/* Desktop and tablet navigation */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {mainNav.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Hidden on the smallest screens, where it moves into the menu */}
          <div className="hidden sm:block">
            <ButtonLink href={primaryAction.href}>{primaryAction.label}</ButtonLink>
          </div>
          <MobileNav links={mainNav} action={primaryAction} />
        </div>
      </Container>
    </header>
  );
}
