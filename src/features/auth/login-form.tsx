"use client";

// Demo login form. ⚠️ Not real authentication: see demo-session.ts.
// The password is checked only for length, never compared, saved or sent.

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { DemoUser } from "@/types";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { FormAlert, TextField } from "@/components/ui/form-fields";
import { PasswordField } from "@/components/ui/password-field";
import { simulateSubmission } from "@/lib/demo-submit";
import { isValidEmail } from "@/lib/validation";
import { roleLabels } from "@/features/demo/labels";
import { dashboardPaths, findDemoUserByEmail, landingPathFor } from "./demo-session";
import { useDemoAuth } from "./use-demo-auth";

type Errors = { email?: string; password?: string };

export function LoginForm() {
  const auth = useDemoAuth();
  const router = useRouter();
  const next = useSearchParams().get("next");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const finishSignIn = (user: DemoUser) => {
    setPassword(""); // never keep the password around
    setStatus("success");
    auth.signIn(user);
    router.push(landingPathFor(user.role, next));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const found: Errors = {};
    if (!email.trim()) found.email = "Please enter your email address.";
    else if (!isValidEmail(email)) found.email = "Please enter a valid email address.";
    if (!password) found.password = "Please enter your password.";
    else if (password.length < 8) found.password = "Passwords are at least 8 characters.";
    setErrors(found);

    if (found.email || found.password) {
      document.getElementById(found.email ? "login-email" : "login-password")?.focus();
      return;
    }

    setStatus("submitting");
    await simulateSubmission(600);

    const user = findDemoUserByEmail(email);
    if (!user || !user.loginable) {
      setStatus("idle");
      setPassword("");
      setSubmitError(
        "We couldn't sign you in with those details. In this demo, use one of the demo accounts listed on this page.",
      );
      return;
    }
    finishSignIn(user);
  };

  // Already signed in: offer the dashboard instead of the form.
  if (auth.status === "signed-in" && status !== "success") {
    return (
      <FormAlert tone="success">
        <p className="font-medium text-ink">
          You&rsquo;re signed in to the demo as {auth.displayName} ({roleLabels[auth.user.role]}).
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <ButtonLink href={dashboardPaths[auth.user.role]}>Go to my dashboard</ButtonLink>
          <button type="button" onClick={auth.signOut} className={buttonClasses("secondary")}>
            Log out
          </button>
        </div>
      </FormAlert>
    );
  }

  if (status === "success") {
    return (
      <FormAlert tone="success">
        <p role="status" className="font-medium text-ink">
          Signed in. Taking you to your dashboard…
        </p>
      </FormAlert>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      {errorCount > 0 && (
        <FormAlert tone="error">
          Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} below.
        </FormAlert>
      )}
      {submitError && <FormAlert tone="error">{submitError}</FormAlert>}

      <TextField
        id="login-email"
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email) setErrors({ ...errors, email: undefined });
        }}
        error={errors.email}
      />
      <PasswordField
        id="login-password"
        label="Password"
        // "off" so browsers don't offer to save this demo password
        autoComplete="off"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) setErrors({ ...errors, password: undefined });
        }}
        hint="For the demo accounts, any password of 8 or more characters works."
        error={errors.password}
      />

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-brand underline-offset-4 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClasses("primary", "lg", "w-full disabled:cursor-wait disabled:opacity-70")}
      >
        {status === "submitting" ? "Signing in…" : "Log in"}
      </button>

      <DemoAccountButtons onChoose={finishSignIn} />
    </form>
  );
}

// One-click sign-in for each demo account, so every role is easy to try.
function DemoAccountButtons({ onChoose }: { onChoose: (user: DemoUser) => void }) {
  const accounts = ["buyer@demo.hunarco.test", "creator@demo.hunarco.test", "admin@demo.hunarco.test"]
    .map((email) => findDemoUserByEmail(email))
    .filter((user): user is DemoUser => Boolean(user));

  return (
    <div className="border-t border-line pt-5">
      <p className="text-sm font-medium">Or try a demo account</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {accounts.map((user) => (
          <li key={user.id}>
            <button
              type="button"
              onClick={() => onChoose(user)}
              className={buttonClasses("secondary", "md", "w-full")}
            >
              Demo {roleLabels[user.role]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
