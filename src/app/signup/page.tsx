import type { Metadata } from "next";
import { AuthLayout, AuthSwitch } from "@/features/auth/auth-layout";
import { SignupForm } from "@/features/auth/signup-form";

export const metadata: Metadata = { title: "Create an account" };

export default function SignupPage() {
  return (
    <AuthLayout
      eyebrow="Join HunarCo"
      title="Create an account"
      intro="Buyers follow designs they love. Creators show their work and see who wants it."
      aside={
        <aside className="rounded-card border border-line bg-surface p-6 text-sm leading-relaxed sm:p-8">
          <h2 className="text-2xl font-medium">What happens in the demo</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            <li>You&rsquo;re signed in to an empty demo buyer or creator account.</li>
            <li>Your name is shown until you reload the page. It isn&rsquo;t saved.</li>
            <li>Your email and password are not saved or sent anywhere.</li>
            <li>
              Admin accounts can&rsquo;t be created here. Use the demo admin account on the log-in
              page.
            </li>
          </ul>
        </aside>
      }
    >
      <SignupForm />
      <AuthSwitch text="Already have an account?" href="/login" linkText="Log in" />
    </AuthLayout>
  );
}
