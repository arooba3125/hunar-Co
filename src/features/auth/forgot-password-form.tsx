"use client";

// Demo "forgot password" form. ⚠️ No email is sent and nothing is reset.
// The success message is the same whether or not the email belongs to an
// account, which is good practice: it doesn't reveal who has an account.

import { useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { FormAlert, TextField } from "@/components/ui/form-fields";
import { simulateSubmission } from "@/lib/demo-submit";
import { isValidEmail } from "@/lib/validation";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = !email.trim()
      ? "Please enter your email address."
      : !isValidEmail(email)
        ? "Please enter a valid email address."
        : "";
    setError(message);
    if (message) {
      document.getElementById("forgot-email")?.focus();
      return;
    }

    setStatus("submitting");
    await simulateSubmission(700);
    setEmail("");
    setStatus("success");
  };

  if (status === "success") {
    return (
      <FormAlert tone="success">
        <h2 className="text-xl font-medium">Check your inbox</h2>
        <p className="mt-2 text-muted">
          If an account uses that email, we would send a link to reset the password.{" "}
          <strong className="text-ink">This is a demo, so no email has been sent.</strong>
        </p>
        <button type="button" onClick={() => setStatus("idle")} className={buttonClasses("secondary", "md", "mt-5")}>
          Try another email
        </button>
      </FormAlert>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      {error && <FormAlert tone="error">Please fix the field below.</FormAlert>}
      <TextField
        id="forgot-email"
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError("");
        }}
        error={error || undefined}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClasses("primary", "lg", "w-full disabled:cursor-wait disabled:opacity-70")}
      >
        {status === "submitting" ? "Sending…" : "Send reset link"}
      </button>
    </form>
  );
}
