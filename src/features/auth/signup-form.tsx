"use client";

// Demo sign-up form. ⚠️ Nothing is created on a server and the password is
// never saved or sent. Signing up starts a demo session as an empty
// "New buyer" or "New creator" account so the empty states can be explored.
// Admin accounts cannot be created here on purpose.

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Role } from "@/types";
import { buttonClasses } from "@/components/ui/button";
import { FormAlert, RadioCardGroup, TextField } from "@/components/ui/form-fields";
import { PasswordField } from "@/components/ui/password-field";
import { simulateSubmission } from "@/lib/demo-submit";
import { isValidEmail } from "@/lib/validation";
import { dashboardPaths, findDemoUser, findDemoUserByEmail } from "./demo-session";
import { useDemoAuth } from "./use-demo-auth";

type SignupRole = Extract<Role, "buyer" | "creator">;

type Fields = {
  name: string;
  email: string;
  role: SignupRole | "";
  password: string;
  confirmPassword: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const emptyFields: Fields = { name: "", email: "", role: "", password: "", confirmPassword: "" };

const fieldIds: Record<keyof Fields, string> = {
  name: "signup-name",
  email: "signup-email",
  role: "signup-role-0",
  password: "signup-password",
  confirmPassword: "signup-confirm",
};

const roleOptions = [
  { value: "buyer", label: "Buyer", description: "Discover designs and register interest." },
  { value: "creator", label: "Creator", description: "Show your work and submit designs." },
];

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) errors.email = "Please enter your email address.";
  else if (!isValidEmail(fields.email)) errors.email = "Please enter a valid email address.";
  if (!fields.role) errors.role = "Please choose whether you're joining as a buyer or a creator.";
  if (!fields.password) {
    errors.password = "Please create a password.";
  } else if (fields.password.length < 8 || !/[A-Za-z]/.test(fields.password) || !/\d/.test(fields.password)) {
    errors.password = "Use at least 8 characters, including a letter and a number.";
  }
  if (!fields.confirmPassword) errors.confirmPassword = "Please type your password again.";
  else if (fields.confirmPassword !== fields.password) errors.confirmPassword = "The passwords don't match.";
  return errors;
}

export function SignupForm() {
  const auth = useDemoAuth();
  const router = useRouter();
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((previous) => ({ ...previous, [key]: value }));
    if (errors[key]) setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const found = validate(fields);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Fields)[])[0];
    if (firstInvalid) {
      document.getElementById(fieldIds[firstInvalid])?.focus();
      return;
    }

    setStatus("submitting");
    await simulateSubmission(700);

    if (findDemoUserByEmail(fields.email)) {
      setStatus("idle");
      setSubmitError("An account with this email already exists in the demo. Try logging in instead.");
      return;
    }

    const role = fields.role as SignupRole;
    const placeholderAccount = findDemoUser(role === "buyer" ? "demo-new-buyer" : "demo-new-creator");
    if (!placeholderAccount) return;

    const name = fields.name;
    setFields(emptyFields); // clears the passwords from memory straight away
    setStatus("success");
    auth.signIn(placeholderAccount, name);
    router.push(dashboardPaths[role]);
  };

  if (status === "success") {
    return (
      <FormAlert tone="success">
        <p role="status" className="font-medium text-ink">
          Demo account ready. Taking you to your dashboard…
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
      {submitError && (
        <FormAlert tone="error">
          {submitError}{" "}
          <Link href="/login" className="font-medium underline">
            Log in
          </Link>
        </FormAlert>
      )}

      <RadioCardGroup
        name="signup-role"
        legend="I'm joining as a…"
        value={fields.role}
        onChange={(value) => update("role", value as SignupRole)}
        options={roleOptions}
        error={errors.role}
      />
      <TextField
        id={fieldIds.name}
        label="Your name"
        type="text"
        autoComplete="name"
        value={fields.name}
        onChange={(e) => update("name", e.target.value)}
        error={errors.name}
      />
      <TextField
        id={fieldIds.email}
        label="Email"
        type="email"
        autoComplete="email"
        value={fields.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />
      <PasswordField
        id={fieldIds.password}
        label="Password"
        autoComplete="off"
        value={fields.password}
        onChange={(e) => update("password", e.target.value)}
        hint="At least 8 characters, including a letter and a number."
        error={errors.password}
      />
      <PasswordField
        id={fieldIds.confirmPassword}
        label="Confirm password"
        autoComplete="off"
        value={fields.confirmPassword}
        onChange={(e) => update("confirmPassword", e.target.value)}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClasses("primary", "lg", "w-full disabled:cursor-wait disabled:opacity-70")}
      >
        {status === "submitting" ? "Creating account…" : "Create demo account"}
      </button>
    </form>
  );
}
