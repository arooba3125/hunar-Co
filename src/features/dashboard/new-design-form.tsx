"use client";

// Demo "submit a new design" form for creators.
// ⚠️ SIMULATED: nothing is uploaded, sent or published. The chosen image is
// previewed with a temporary browser-only URL (URL.createObjectURL) and is
// never read or stored. The new submission is added to this tab's demo state
// only, so it shows on the dashboard until the page is reloaded.

import { useEffect, useRef, useState } from "react";
import type { Category } from "@/types";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { FormAlert, SelectField, TextAreaField, TextField } from "@/components/ui/form-fields";
import { formatPrice } from "@/lib/format";
import { simulateSubmission } from "@/lib/demo-submit";
import { categoryLabels } from "@/features/products/labels";
import { useCreatorDemo } from "./creator-demo-context";

const MIN_PRICE = 500;
const MAX_PRICE = 1_000_000;
const MAX_IMAGE_MB = 5;
const DESCRIPTION_MIN = 30;

type Fields = {
  title: string;
  category: Category | "";
  description: string;
  price: string;
};
type Errors = Partial<Record<keyof Fields | "image", string>>;

const emptyFields: Fields = { title: "", category: "", description: "", price: "" };

const fieldIds: Record<keyof Errors, string> = {
  title: "design-title",
  category: "design-category",
  description: "design-description",
  price: "design-price",
  image: "design-image",
};

const categoryOptions = (Object.keys(categoryLabels) as Category[]).map((value) => ({
  value,
  label: categoryLabels[value],
}));

export function NewDesignForm() {
  const { addSubmission } = useCreatorDemo();
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [image, setImage] = useState<{ name: string; url: string } | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submittedTitle, setSubmittedTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Free the temporary preview URL when the image changes or the page closes.
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.url);
    };
  }, [image]);

  // Move focus to the confirmation once it appears.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((previous) => ({ ...previous, [key]: value }));
    if (errors[key]) setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const chooseImage = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((previous) => ({ ...previous, image: "Please choose an image file (JPG, PNG or WebP)." }));
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setErrors((previous) => ({ ...previous, image: `Please choose an image under ${MAX_IMAGE_MB} MB.` }));
      return;
    }
    setErrors((previous) => ({ ...previous, image: undefined }));
    setImage({ name: file.name, url: URL.createObjectURL(file) });
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found: Errors = {};
    const price = Number(fields.price);
    if (!fields.title.trim()) found.title = "Please give your design a title.";
    if (!fields.category) found.category = "Please choose a category.";
    if (fields.description.trim().length < DESCRIPTION_MIN) {
      found.description = `Please describe the design in at least ${DESCRIPTION_MIN} characters.`;
    }
    if (!fields.price) found.price = "Please enter a proposed price.";
    else if (!Number.isInteger(price) || price < MIN_PRICE || price > MAX_PRICE) {
      found.price = `Please enter a whole number from ${formatPrice(MIN_PRICE)} to ${formatPrice(MAX_PRICE)}.`;
    }
    if (!image) found.image = "Please choose an image to preview your design.";
    setErrors(found);

    const firstInvalid = (Object.keys(fieldIds) as (keyof Errors)[]).find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(fieldIds[firstInvalid])?.focus();
      return;
    }

    setStatus("submitting");
    await simulateSubmission();
    addSubmission({
      title: fields.title.trim(),
      category: fields.category as Category,
      pricePkr: price,
      submittedOn: new Date().toISOString().slice(0, 10),
      reviewStatus: "in-review",
    });
    setSubmittedTitle(fields.title.trim());
    setFields(emptyFields);
    removeImage();
    setStatus("success");
  };

  if (status === "success") {
    return (
      <FormAlert tone="success">
        <h2 ref={successRef} tabIndex={-1} className="text-2xl font-medium outline-none">
          Demo submission added
        </h2>
        <p className="mt-2 leading-relaxed text-muted">
          &ldquo;{submittedTitle}&rdquo; now appears on your dashboard as <strong className="text-ink">In review</strong>.
          This is a simulation: nothing was uploaded, sent to HunarCo, or published.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/creator/dashboard">Back to dashboard</ButtonLink>
          <button type="button" onClick={() => setStatus("idle")} className={buttonClasses("secondary")}>
            Submit another design
          </button>
        </div>
      </FormAlert>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-5">
        {errorCount > 0 && (
          <FormAlert tone="error">
            Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} below.
          </FormAlert>
        )}
        <TextField
          id={fieldIds.title}
          label="Design title"
          maxLength={80}
          value={fields.title}
          onChange={(e) => update("title", e.target.value)}
          error={errors.title}
        />
        <SelectField
          id={fieldIds.category}
          label="Category"
          placeholder="Choose one"
          options={categoryOptions}
          value={fields.category}
          onChange={(e) => update("category", e.target.value as Category)}
          error={errors.category}
        />
        <TextAreaField
          id={fieldIds.description}
          label="Description"
          rows={6}
          maxLength={1000}
          value={fields.description}
          onChange={(e) => update("description", e.target.value)}
          hint={`Materials, size, technique, and what makes it yours. At least ${DESCRIPTION_MIN} characters (${fields.description.trim().length} so far).`}
          error={errors.description}
        />
        <TextField
          id={fieldIds.price}
          label="Proposed price (PKR)"
          type="number"
          inputMode="numeric"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100}
          value={fields.price}
          onChange={(e) => update("price", e.target.value)}
          hint={
            Number(fields.price) > 0
              ? `Buyers would see ${formatPrice(Number(fields.price))}.`
              : "What you expect each piece to cost buyers, in rupees."
          }
          error={errors.price}
          inputClassName="sm:w-48"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={buttonClasses("primary", "lg", "w-full sm:w-auto disabled:cursor-wait disabled:opacity-70")}
        >
          {status === "submitting" ? "Submitting…" : "Submit design (demo)"}
        </button>
      </div>

      {/* Image picker and preview */}
      <div>
        <label htmlFor={fieldIds.image} className="text-sm font-medium">
          Design image
        </label>
        <div
          className={`mt-2 overflow-hidden rounded-media border-2 border-dashed bg-surface ${
            errors.image ? "border-brand" : "border-line"
          }`}
        >
          {image ? (
            // A plain <img> because the preview is a temporary blob: URL that
            // next/image can't optimise.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image.url} alt="Preview of your chosen design image" className="aspect-[4/5] w-full object-cover" />
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center p-6 text-center text-sm text-muted">
              No image chosen yet
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          id={fieldIds.image}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => chooseImage(e.target.files?.[0])}
          aria-invalid={Boolean(errors.image)}
          aria-describedby={`${fieldIds.image}-hint${errors.image ? ` ${fieldIds.image}-error` : ""}`}
          className="mt-3 block w-full text-sm file:mr-3 file:rounded-control file:border file:border-ink/25 file:bg-surface file:px-4 file:py-2 file:text-sm file:font-medium hover:file:border-ink"
        />
        <p id={`${fieldIds.image}-hint`} className="mt-1.5 text-sm text-muted">
          JPG, PNG or WebP, up to {MAX_IMAGE_MB} MB. The preview stays in your browser and is never
          uploaded.
        </p>
        {errors.image && (
          <p id={`${fieldIds.image}-error`} className="mt-1 text-sm text-brand">
            {errors.image}
          </p>
        )}
        {image && (
          <button type="button" onClick={removeImage} className="mt-2 text-sm font-medium text-brand hover:underline">
            Remove image<span className="sr-only"> {image.name}</span>
          </button>
        )}
      </div>
    </form>
  );
}
