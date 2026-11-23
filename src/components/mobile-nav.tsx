"use client";

// "use client" lets this component use state (open / closed) in the browser.

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NavLink } from "@/lib/site-config";
import { ButtonLink } from "@/components/ui/button";

type MobileNavProps = {
  links: NavLink[];
  action: NavLink;
};

// Menu button and drop-down panel shown on small screens only.
export function MobileNav({ links, action }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  // Close the menu when the Escape key is pressed.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-control border border-line text-ink"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-lg"
        >
          <nav aria-label="Main" className="flex flex-col px-gutter py-4">
            {links.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={close}
                className="border-b border-line/70 py-3 text-lg text-ink"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-5" onClick={close}>
              <ButtonLink href={action.href} size="lg" className="w-full">
                {action.label}
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
