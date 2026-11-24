"use client";

// A row of tabs-style links for moving between pages in an account area.
// Marks the current page with aria-current for screen readers.

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/site-config";
import { Container } from "@/components/ui/container";

export function SectionNav({ label, links }: { label: string; links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <div className="border-b border-line bg-paper">
      <Container>
        <nav aria-label={label} className="-mb-px flex gap-6 overflow-x-auto">
          {links.map((link) => {
            const current = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`whitespace-nowrap border-b-2 py-4 text-sm font-medium transition-colors ${
                  current ? "border-brand text-ink" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
