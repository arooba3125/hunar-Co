import Link from "next/link";
import { Container } from "@/components/ui/container";

type AuthLayoutProps = {
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
  /** Extra panel beside the form on large screens (e.g. demo accounts) */
  aside?: React.ReactNode;
};

// Shared frame for /login, /signup and /forgot-password.
export function AuthLayout({ eyebrow, title, intro, children, aside }: AuthLayoutProps) {
  return (
    <div className="bg-sand">
      <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,32rem)_1fr] lg:items-start lg:gap-16">
        <div className="rounded-card border border-line bg-paper p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{eyebrow}</p>
          <h1 className="mt-3 text-title font-medium">{title}</h1>
          <div className="mt-3 leading-relaxed text-muted">{intro}</div>
          <div className="mt-6">
            <DemoAuthNotice />
          </div>
          <div className="mt-6">{children}</div>
        </div>
        {aside && <div>{aside}</div>}
      </Container>
    </div>
  );
}

// The notice shown on every auth screen.
export function DemoAuthNotice() {
  return (
    <p className="rounded-media border border-accent/50 bg-accent/10 px-4 py-3 text-sm leading-relaxed">
      <strong>Demo sign-in.</strong> Accounts are simulated in your browser. Passwords are never
      saved or sent anywhere, and no emails are sent.
    </p>
  );
}

// Small "Don't have an account? Sign up" style line under a form.
export function AuthSwitch({ text, href, linkText }: { text: string; href: string; linkText: string }) {
  return (
    <p className="mt-6 text-center text-sm text-muted">
      {text}{" "}
      <Link href={href} className="font-medium text-brand underline-offset-4 hover:underline">
        {linkText}
      </Link>
    </p>
  );
}
