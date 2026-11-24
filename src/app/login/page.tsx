import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout, AuthSwitch } from "@/features/auth/auth-layout";
import { DemoAccountsPanel } from "@/features/auth/demo-accounts-panel";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to HunarCo"
      intro="Follow the designs you're interested in, or manage your creator listings."
      aside={<DemoAccountsPanel />}
    >
      {/* LoginForm reads ?next= from the URL, which needs a Suspense boundary */}
      <Suspense fallback={<p className="text-muted">Loading form…</p>}>
        <LoginForm />
      </Suspense>
      <AuthSwitch text="New to HunarCo?" href="/signup" linkText="Create an account" />
    </AuthLayout>
  );
}
