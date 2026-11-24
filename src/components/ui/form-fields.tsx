// Shared form controls. Each one draws its label, an optional hint, and an
// error message, and wires them up for screen readers (aria-describedby,
// aria-invalid). Use them in any form so all forms look and behave the same.

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const controlBase =
  "mt-2 block w-full rounded-media border bg-surface px-4 text-base text-ink focus:border-ink";

const borderFor = (error?: string) => (error ? "border-brand" : "border-line");

type FieldBaseProps = {
  /** Must be unique on the page; also used to focus the field on errors */
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  /** Adds "(optional)" to the label */
  optional?: boolean;
};

// Works out which hint/error ids describe the control.
function describedBy(id: string, hint?: ReactNode, error?: string) {
  const ids = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

function Label({ id, label, optional }: Pick<FieldBaseProps, "id" | "label" | "optional">) {
  return (
    <label htmlFor={id} className="text-sm font-medium text-ink">
      {label}
      {optional && <span className="font-normal text-muted"> (optional)</span>}
    </label>
  );
}

function Messages({ id, hint, error }: Pick<FieldBaseProps, "id" | "hint" | "error">) {
  return (
    <>
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
    </>
  );
}

type TextFieldProps = FieldBaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & { inputClassName?: string };

export function TextField({
  id,
  label,
  hint,
  error,
  optional,
  inputClassName = "",
  ...inputProps
}: TextFieldProps) {
  return (
    <div>
      <Label id={id} label={label} optional={optional} />
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, hint, error)}
        className={`${controlBase} h-11 ${borderFor(error)} ${inputClassName}`}
        {...inputProps}
      />
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

type TextAreaFieldProps = FieldBaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

export function TextAreaField({
  id,
  label,
  hint,
  error,
  optional,
  rows = 5,
  ...textareaProps
}: TextAreaFieldProps) {
  return (
    <div>
      <Label id={id} label={label} optional={optional} />
      <textarea
        id={id}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, hint, error)}
        className={`${controlBase} py-3 leading-relaxed ${borderFor(error)}`}
        {...textareaProps}
      />
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

type SelectFieldProps = FieldBaseProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
    options: { value: string; label: string }[];
    /** Text for the empty first option, e.g. "Choose one" */
    placeholder?: string;
  };

export function SelectField({
  id,
  label,
  hint,
  error,
  optional,
  options,
  placeholder,
  ...selectProps
}: SelectFieldProps) {
  return (
    <div>
      <Label id={id} label={label} optional={optional} />
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, hint, error)}
        className={`${controlBase} h-11 ${borderFor(error)}`}
        {...selectProps}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Messages id={id} hint={hint} error={error} />
    </div>
  );
}

type CheckboxFieldProps = {
  id: string;
  label: ReactNode;
  error?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckboxField({ id, label, error, checked, onChange }: CheckboxFieldProps) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-5 w-5 shrink-0 accent-brand"
        />
        <label htmlFor={id} className="text-sm leading-relaxed">
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-brand">
          {error}
        </p>
      )}
    </div>
  );
}

// A message box at the top of a form. "error" is announced to screen readers
// immediately; "success" is announced politely.
export function FormAlert({
  tone,
  children,
}: {
  tone: "error" | "success";
  children: ReactNode;
}) {
  if (tone === "success") {
    return (
      <div role="status" className="rounded-card border border-sage/40 bg-sage/10 p-5">
        {children}
      </div>
    );
  }
  return (
    <div
      role="alert"
      className="rounded-media border border-brand/40 bg-brand/5 px-4 py-3 text-sm text-brand-dark"
    >
      {children}
    </div>
  );
}
