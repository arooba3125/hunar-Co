"use client";

// Creator application form for /join-as-creator.
//
// DEMO ONLY: there is no backend yet. Submitting does NOT send the
// application to HunarCo or save it anywhere. The details live only in this
// component's memory and are cleared as soon as the demo submission succeeds.
// Nothing is written to localStorage, cookies, or any external service.
// Replace `simulateSubmission` with a real request in a later stage.
//
// Deliberately NOT collected: identity documents, payment details, phone
// numbers, or home addresses.

import { useEffect, useRef, useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import {
  CheckboxField,
  FormAlert,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/form-fields";
import { simulateSubmission } from "@/lib/demo-submit";
import { isValidEmail, isValidWebUrl } from "@/lib/validation";

const DESCRIPTION_MIN = 50;
const DESCRIPTION_MAX = 800;

const disciplineOptions = [
  { value: "fashion", label: "Fashion design" },
  { value: "art", label: "Art" },
  { value: "crafts", label: "Crafts" },
  { value: "other", label: "Other creative work" },
];

type Fields = {
  fullName: string;
  email: string;
  city: string;
  discipline: string;
  portfolioUrl: string;
  description: string;
  consent: boolean;
};

type FieldErrors = Partial<Record<keyof Fields, string>>;

type Status = "idle" | "submitting" | "success";

const emptyFields: Fields = {
  fullName: "",
  email: "",
  city: "",
  discipline: "",
  portfolioUrl: "",
  description: "",
  consent: false,
};

// The id of each field's control, used for labels and to move focus to errors.
const fieldIds: Record<keyof Fields, string> = {
  fullName: "apply-full-name",
  email: "apply-email",
  city: "apply-city",
  discipline: "apply-discipline",
  portfolioUrl: "apply-portfolio",
  description: "apply-description",
  consent: "apply-consent",
};

function validate(fields: Fields): FieldErrors {
  const errors: FieldErrors = {};
  const descriptionLength = fields.description.trim().length;

  if (!fields.fullName.trim()) errors.fullName = "Please enter your full name.";

  if (!fields.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(fields.email)) {
    errors.email = "Please enter a valid email address, like name@example.com.";
  }

  if (!fields.city.trim()) errors.city = "Please enter the city you work in.";

  if (!fields.discipline) errors.discipline = "Please choose your creative discipline.";

  if (!fields.portfolioUrl.trim()) {
    errors.portfolioUrl = "Please add a link to your portfolio or social media.";
  } else if (!isValidWebUrl(fields.portfolioUrl)) {
    errors.portfolioUrl =
      "Please enter a full web address starting with https://, for example https://instagram.com/yourname.";
  }

  if (descriptionLength === 0) {
    errors.description = "Please tell us a little about your work.";
  } else if (descriptionLength < DESCRIPTION_MIN) {
    errors.description = `Please write at least ${DESCRIPTION_MIN} characters (you have ${descriptionLength}).`;
  } else if (descriptionLength > DESCRIPTION_MAX) {
    errors.description = `Please keep it under ${DESCRIPTION_MAX} characters.`;
  }

  if (!fields.consent) {
    errors.consent = "Please agree to be contacted so we can respond to your application.";
  }

  return errors;
}

export function ApplicationForm() {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");
  const successRef = useRef<HTMLHeadingElement>(null);
  const previousStatus = useRef<Status>("idle");

  // Move keyboard focus after the screen changes, so keyboard and screen
  // reader users land in the right place:
  // - on success, to the confirmation heading
  // - after "Fill in the form again", back to the first field
  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    } else if (status === "idle" && previousStatus.current === "success") {
      document.getElementById(fieldIds.fullName)?.focus();
    }
    previousStatus.current = status;
  }, [status]);

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((previous) => ({ ...previous, [key]: value }));
    if (errors[key]) setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const foundErrors = validate(fields);
    setErrors(foundErrors);

    const firstInvalid = (Object.keys(foundErrors) as (keyof Fields)[])[0];
    if (firstInvalid) {
      document.getElementById(fieldIds[firstInvalid])?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await simulateSubmission();
      setFields(emptyFields); // forget the details straight away
      setStatus("success");
    } catch {
      setStatus("idle");
      setSubmitError(
        "Something went wrong and your application wasn't sent. Please try again.",
      );
    }
  };

  const startAgain = () => {
    setStatus("idle");
    setErrors({});
  };

  if (status === "success") {
    return (
      <FormAlert tone="success">
        <h3 ref={successRef} tabIndex={-1} className="text-2xl font-medium outline-none">
          Demo application complete
        </h3>
        <p className="mt-3 leading-relaxed text-muted">
          Thank you for trying the form. Because this is a demo, your application
          has <strong className="text-ink">not</strong> been sent to HunarCo and
          nobody will contact you. Your details have already been cleared from
          this page.
        </p>
        <button type="button" onClick={startAgain} className={buttonClasses("secondary", "md", "mt-6")}>
          Fill in the form again
        </button>
      </FormAlert>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const descriptionLength = fields.description.trim().length;

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6" aria-describedby="apply-demo-note">
      <p id="apply-demo-note" className="rounded-media bg-accent/15 px-4 py-3 text-sm">
        <strong>Demo form.</strong> Submitting does not send anything to HunarCo or
        save your details anywhere.
      </p>

      {errorCount > 0 && (
        <FormAlert tone="error">
          Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} below.
        </FormAlert>
      )}
      {submitError && <FormAlert tone="error">{submitError}</FormAlert>}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={fieldIds.fullName}
          label="Full name"
          type="text"
          autoComplete="name"
          value={fields.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          error={errors.fullName}
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
        <TextField
          id={fieldIds.city}
          label="City"
          type="text"
          autoComplete="address-level2"
          value={fields.city}
          onChange={(e) => update("city", e.target.value)}
          hint="The city only. We don't need your address."
          error={errors.city}
        />
        <SelectField
          id={fieldIds.discipline}
          label="Creative discipline"
          placeholder="Choose one"
          options={disciplineOptions}
          value={fields.discipline}
          onChange={(e) => update("discipline", e.target.value)}
          error={errors.discipline}
        />
      </div>

      <TextField
        id={fieldIds.portfolioUrl}
        label="Portfolio or social media link"
        type="url"
        inputMode="url"
        placeholder="https://"
        value={fields.portfolioUrl}
        onChange={(e) => update("portfolioUrl", e.target.value)}
        hint="A website, Instagram, Behance or similar page that shows your work."
        error={errors.portfolioUrl}
      />

      <TextAreaField
        id={fieldIds.description}
        label="About your work"
        rows={6}
        maxLength={DESCRIPTION_MAX}
        value={fields.description}
        onChange={(e) => update("description", e.target.value)}
        hint={`What do you make, and what makes it yours? ${DESCRIPTION_MIN}–${DESCRIPTION_MAX} characters. ${descriptionLength} written so far.`}
        error={errors.description}
      />

      <CheckboxField
        id={fieldIds.consent}
        checked={fields.consent}
        onChange={(checked) => update("consent", checked)}
        error={errors.consent}
        label="I agree to HunarCo contacting me by email about this application."
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClasses("primary", "lg", "w-full sm:w-auto disabled:cursor-wait disabled:opacity-70")}
      >
        {status === "submitting" ? "Submitting…" : "Submit application (demo)"}
      </button>
    </form>
  );
}
