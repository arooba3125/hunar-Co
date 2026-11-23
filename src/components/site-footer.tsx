import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-deep text-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div className="max-w-sm">
          <Wordmark tone="light" />
          <p className="mt-5 leading-relaxed text-paper/75">
            {siteConfig.description}
          </p>
        </div>

        {footerNav.map((group) => (
          <div key={group.title}>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {group.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-paper/80 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-paper/15">
        <Container className="py-6 text-sm text-paper/60">
          {siteConfig.name} is a student marketing project.
        </Container>
      </div>
    </footer>
  );
}
