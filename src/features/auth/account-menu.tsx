"use client";

// Header account area for large screens.
// Signed out: a "Log in" link. Signed in: a menu with the role's own links.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { roleLabels } from "@/features/demo/labels";
import { accountLinks } from "./account-links";
import { useDemoAuth } from "./use-demo-auth";

export function AccountMenu() {
  const auth = useDemoAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on Escape or on a click outside the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Keep the space reserved while the session is read, so the header doesn't jump.
  if (auth.status === "loading") return <span className="inline-block w-14" aria-hidden="true" />;

  if (auth.status === "signed-out") {
    return (
      <Link href="/login" className="whitespace-nowrap text-sm font-medium text-ink hover:text-brand">
        Log in
      </Link>
    );
  }

  const logOut = () => {
    setOpen(false);
    auth.signOut();
    router.push("/");
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="account-menu"
        className="flex h-10 items-center gap-2 rounded-control border border-line bg-surface pl-3 pr-2.5 text-sm hover:border-ink/40"
      >
        <span className="max-w-32 truncate font-medium">{auth.displayName}</span>
        <span className="rounded-control bg-sand px-2 py-0.5 text-xs text-muted">
          {roleLabels[auth.user.role]}
        </span>
        <svg viewBox="0 0 20 20" className="h-4 w-4 text-muted" aria-hidden="true">
          <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="sr-only">account menu</span>
      </button>

      {open && (
        <div
          id="account-menu"
          className="absolute right-0 top-full z-50 mt-2 w-60 rounded-card border border-line bg-paper p-2 shadow-lg"
        >
          <p className="px-3 pb-2 pt-1 text-xs text-muted">
            Demo {roleLabels[auth.user.role].toLowerCase()} account
          </p>
          <ul>
            {accountLinks[auth.user.role].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-media px-3 py-2 text-sm hover:bg-sand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-1 border-t border-line pt-1">
            <button
              type="button"
              onClick={logOut}
              className="block w-full rounded-media px-3 py-2 text-left text-sm text-brand hover:bg-sand"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Account links for the mobile menu panel.
export function MobileAccountLinks({ onNavigate }: { onNavigate: () => void }) {
  const auth = useDemoAuth();
  const router = useRouter();

  if (auth.status === "loading") return null;

  if (auth.status === "signed-out") {
    return (
      <div className="flex gap-4 border-b border-line/70 py-3 text-lg">
        <Link href="/login" onClick={onNavigate} className="text-ink">
          Log in
        </Link>
        <span aria-hidden="true" className="text-line">
          |
        </span>
        <Link href="/signup" onClick={onNavigate} className="text-ink">
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="border-b border-line/70 py-3">
      <p className="text-sm text-muted">
        Signed in as {auth.displayName} (demo {roleLabels[auth.user.role].toLowerCase()})
      </p>
      <ul className="mt-2">
        {accountLinks[auth.user.role].map((link) => (
          <li key={link.href}>
            <Link href={link.href} onClick={onNavigate} className="block py-2 text-lg text-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          onNavigate();
          auth.signOut();
          router.push("/");
        }}
        className="mt-1 py-2 text-lg text-brand"
      >
        Log out
      </button>
    </div>
  );
}
