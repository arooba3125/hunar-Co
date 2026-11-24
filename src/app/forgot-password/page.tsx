import type { Metadata } from "next";
import { AuthLayout, AuthSwitch } from "@/features/auth/auth-layout";
import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";

export const metadata: Metadata = { title: "Reset your password" };

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      eyebrow="Forgot password"
      title="Reset your password"
      intro="Enter the email you signed up with and we'll send you a link to choose a new password."
    >
      <ForgotPasswordForm />
      <AuthSwitch text="Remembered it?" href="/login" linkText="Back to log in" />
      <AuthSwitch text="New to HunarCo?" href="/signup" linkText="Create an account" />
    </AuthLayout>
  );
}
