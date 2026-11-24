"use client";

// "Register interest" button and the pop-up form it opens.
//
// DEMO ONLY: there is no backend yet. Submitting the form does NOT send or
// save anything. The details stay in this component's memory and are cleared
// as soon as the form succeeds or the dialog closes. Nothing is written to
// localStorage, cookies, or any external service. Replace
// `simulateSubmission` with a real request (e.g. to Supabase) in a later stage.

import { useId, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { CheckboxField, FormAlert, TextField } from "@/components/ui/form-fields";
import { simulateSubmission } from "@/lib/demo-submit";
import { isValidEmail } from "@/lib/validation";

const MAX_QUANTITY = 10;

type Fields = {
  name: string;
  email: string;
  quantity: string;
  consent: boolean;
};

type FieldErrors = Partial<Record<keyof Fields, string>>;

type Status = "idle" | "submitting" | "success";

const emptyFields: Fields = { name: "", email: "", quantity: "1", consent: false };

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};
  const quantity = Number(fields.quantity);

  if (!fields.name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!fields.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(fields.email)) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
    errors.quantity = `Please choose a whole number from 1 to ${MAX_QUANTITY}.`;
  }
  if (!fields.consent) {
    errors.consent = "Please agree to be contacted so we can update you about this design.";
  }
  return errors;
}

type InterestFormProps = {
  productName: string;
  /** When false, the button is replaced with a short explanation */
  acceptingInterest: boolean;
};

export function InterestForm({ productName, acceptingInterest }: InterestFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formId = useId();
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");
  const [confirmedQuantity, setConfirmedQuantity] = useState(0);

  const ids = {
    title: `${formId}-title`,
    name: `${formId}-name`,
    email: `${formId}-email`,
    quantity: `${formId}-quantity`,
    consent: `${formId}-consent`,
  };

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  // Runs whenever the dialog closes (button, Escape key, or backdrop click).
  // Clears everything so no personal details are kept around.
  const handleClose = () => {
    setFields(emptyFields);
    setErrors({});
    setStatus("idle");
    setSubmitError("");
  };

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((previous) => ({ ...previous, [key]: value }));
    // Clear a field's error as soon as the person edits it.
    if (errors[key]) setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const foundErrors = validate(fields);
    setErrors(foundErrors);

    const firstInvalid = (Object.keys(foundErrors) as (keyof Fields)[])[0];
    if (firstInvalid) {
      document.getElementById(ids[firstInvalid])?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await simulateSubmission();
      setConfirmedQuantity(Number(fields.quantity));
      setFields(emptyFields); // forget the details straight away
      setStatus("success");
    } catch {
      setStatus("idle");
      setSubmitError("Something went wrong and your interest wasn't registered. Please try again.");
    }
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  if (!acceptingInterest) {
    return (
      <p className="rounded-card border border-line bg-surface px-5 py-4 text-sm text-muted">
        Interest registration is closed for this design.
      </p>
    );
  }

  return (
    <>
      <button type="button" onClick={openDialog} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
        Register interest
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={ids.title}
        onClose={handleClose}
        // Clicking the dark backdrop (outside the panel) closes the dialog.
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
        className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-card bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/60"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Register interest
              </p>
              <h2 id={ids.title} className="mt-2 text-2xl font-medium">
                {productName}
              </h2>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Close"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-line hover:border-ink"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <p className="mt-4 rounded-media bg-accent/15 px-4 py-3 text-sm">
            <strong>Demo only.</strong> This is not an order or payment. Your details
            are not sent or saved anywhere.
          </p>

          {status === "success" ? (
            <div className="mt-6">
              <FormAlert tone="success">
                <h3 className="text-xl font-medium">Demo registration complete</h3>
                <p className="mt-2 text-muted">
                  You registered interest in {confirmedQuantity}{" "}
                  {confirmedQuantity === 1 ? "piece" : "pieces"}. Because this is a
                  demo, no real order has been placed, nobody will contact you, and
                  your details have already been cleared.
                </p>
              </FormAlert>
              <button type="button" onClick={closeDialog} className={buttonClasses("secondary", "md", "mt-6")}>
                Close
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-5">
              {errorCount > 0 && (
                <FormAlert tone="error">
                  Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} below.
                </FormAlert>
              )}
              {submitError && <FormAlert tone="error">{submitError}</FormAlert>}

              <TextField
                id={ids.name}
                label="Name"
                type="text"
                autoComplete="name"
                value={fields.name}
                onChange={(e) => update("name", e.target.value)}
                error={errors.name}
              />
              <TextField
                id={ids.email}
                label="Email"
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={(e) => update("email", e.target.value)}
                error={errors.email}
              />
              <TextField
                id={ids.quantity}
                label="How many would you be interested in?"
                type="number"
                inputMode="numeric"
                min={1}
                max={MAX_QUANTITY}
                step={1}
                value={fields.quantity}
                onChange={(e) => update("quantity", e.target.value)}
                hint={`From 1 to ${MAX_QUANTITY}.`}
                error={errors.quantity}
                inputClassName="sm:w-32"
              />
              <CheckboxField
                id={ids.consent}
                checked={fields.consent}
                onChange={(checked) => update("consent", checked)}
                error={errors.consent}
                label="I agree to HunarCo contacting me by email about this design, including whether it reaches its target."
              />

              <button
                type="submit"
                disabled={status === "submitting"}
                className={buttonClasses("primary", "lg", "w-full disabled:cursor-wait disabled:opacity-70")}
              >
                {status === "submitting" ? "Registering…" : "Register interest (demo)"}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
