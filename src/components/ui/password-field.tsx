"use client";

// A password input with a Show / Hide button. Matches the other form fields.

import { useState, type InputHTMLAttributes, type ReactNode } from "react";

type PasswordFieldProps = {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type">;

export function PasswordField({ id, label, hint, error, ...inputProps }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const describedBy =
    [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`block h-11 w-full rounded-media border bg-surface pl-4 pr-20 text-base text-ink focus:border-ink ${
            error ? "border-brand" : "border-line"
          }`}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-controls={id}
          aria-pressed={visible}
          className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 rounded-control px-3 text-sm font-medium text-brand hover:bg-brand/5"
        >
          {visible ? "Hide" : "Show"}
          <span className="sr-only"> password</span>
        </button>
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-brand">
          {error}
        </p>
      )}
    </div>
  );
}
