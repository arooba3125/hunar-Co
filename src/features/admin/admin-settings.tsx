"use client";

import { useState } from "react";
import { buttonClasses } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { FormAlert, TextField } from "@/components/ui/form-fields";
import { defaultDemoSettings, type DemoSettings } from "@/features/demo/demo-data";
import { AdminPageHeader } from "./admin-shell";
import { useAdminDemo } from "./admin-demo-context";

type Errors = Partial<Record<"platformName" | "defaultInterestTarget" | "campaignLengthDays" | "closingSoonDays" | "newCategory", string>>;

// Number fields are edited as text, then checked on save.
type Draft = Omit<DemoSettings, "defaultInterestTarget" | "campaignLengthDays" | "closingSoonDays"> & {
  defaultInterestTarget: string;
  campaignLengthDays: string;
  closingSoonDays: string;
};

const toDraft = (settings: DemoSettings): Draft => ({
  ...settings,
  defaultInterestTarget: String(settings.defaultInterestTarget),
  campaignLengthDays: String(settings.campaignLengthDays),
  closingSoonDays: String(settings.closingSoonDays),
});

function wholeNumberError(value: string, min: number, max: number) {
  const number = Number(value);
  if (!value.trim() || !Number.isInteger(number) || number < min || number > max) {
    return `Enter a whole number from ${min} to ${max}.`;
  }
  return undefined;
}

export function AdminSettings() {
  const { settings, saveSettings } = useAdminDemo();
  const [draft, setDraft] = useState<Draft>(() => toDraft(settings));
  const [newCategory, setNewCategory] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const change = (patch: Partial<Draft>) => {
    setDraft((previous) => ({ ...previous, ...patch }));
    setSaved(false);
  };

  const addCategory = () => {
    const label = newCategory.trim();
    if (!label) {
      setErrors({ ...errors, newCategory: "Type a category name first." });
      return;
    }
    if (draft.categories.some((c) => c.label.toLowerCase() === label.toLowerCase())) {
      setErrors({ ...errors, newCategory: "That category already exists." });
      return;
    }
    const id = `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${draft.categories.length + 1}`;
    change({ categories: [...draft.categories, { id, label, visible: true }] });
    setNewCategory("");
    setErrors({ ...errors, newCategory: undefined });
  };

  const save = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found: Errors = {
      platformName: draft.platformName.trim() ? undefined : "Please enter a platform name.",
      defaultInterestTarget: wholeNumberError(draft.defaultInterestTarget, 1, 10000),
      campaignLengthDays: wholeNumberError(draft.campaignLengthDays, 7, 365),
      closingSoonDays: wholeNumberError(draft.closingSoonDays, 1, 60),
    };
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof Errors)[]).find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(`setting-${firstInvalid}`)?.focus();
      return;
    }
    saveSettings({
      ...draft,
      platformName: draft.platformName.trim(),
      categories: draft.categories.map((c) => ({ ...c, label: c.label.trim() || c.id })),
      defaultInterestTarget: Number(draft.defaultInterestTarget),
      campaignLengthDays: Number(draft.campaignLengthDays),
      closingSoonDays: Number(draft.closingSoonDays),
    });
    setSaved(true);
  };

  const reset = () => {
    saveSettings(defaultDemoSettings);
    setDraft(toDraft(defaultDemoSettings));
    setErrors({});
    setSaved(false);
    setConfirmReset(false);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <>
      <AdminPageHeader title="Settings">
        Demo platform settings. Saving updates this admin session only (try changing the platform
        name and watch the sidebar).
      </AdminPageHeader>

      <form noValidate onSubmit={save} className="max-w-2xl space-y-8">
        {errorCount > 0 && <FormAlert tone="error">Please fix the highlighted settings.</FormAlert>}
        {saved && (
          <FormAlert tone="success">
            <p className="text-sm">Settings saved for this demo session. Nothing was sent to a server.</p>
          </FormAlert>
        )}

        <fieldset className="space-y-4 rounded-card border border-line bg-surface p-5 sm:p-6">
          <legend className="px-1 text-lg font-medium">General</legend>
          <TextField
            id="setting-platformName"
            label="Platform name"
            value={draft.platformName}
            onChange={(e) => change({ platformName: e.target.value })}
            error={errors.platformName}
          />
        </fieldset>

        <fieldset className="rounded-card border border-line bg-surface p-5 sm:p-6">
          <legend className="px-1 text-lg font-medium">Categories</legend>
          <p className="text-sm text-muted">Rename categories or hide them from the demo site filters.</p>
          <ul className="mt-4 space-y-3">
            {draft.categories.map((category, index) => (
              <li key={category.id} className="flex flex-wrap items-end gap-3">
                <div className="min-w-48 flex-1">
                  <TextField
                    id={`category-${category.id}`}
                    label={`Category ${index + 1} name`}
                    value={category.label}
                    onChange={(e) =>
                      change({
                        categories: draft.categories.map((c) =>
                          c.id === category.id ? { ...c, label: e.target.value } : c,
                        ),
                      })
                    }
                  />
                </div>
                <label className="flex h-11 items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={category.visible}
                    onChange={(e) =>
                      change({
                        categories: draft.categories.map((c) =>
                          c.id === category.id ? { ...c, visible: e.target.checked } : c,
                        ),
                      })
                    }
                    className="h-5 w-5 accent-brand"
                  />
                  Shown on site<span className="sr-only">: {category.label}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-end gap-3 border-t border-line pt-5">
            <div className="min-w-48 flex-1">
              <TextField
                id="setting-newCategory"
                label="Add a category"
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  if (errors.newCategory) setErrors({ ...errors, newCategory: undefined });
                }}
                onKeyDown={(e) => {
                  // Enter adds the category instead of submitting the whole form.
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCategory();
                  }
                }}
                error={errors.newCategory}
              />
            </div>
            <button type="button" onClick={addCategory} className={`${buttonClasses("secondary")} mb-px`}>
              Add
            </button>
          </div>
        </fieldset>

        <fieldset className="grid gap-4 rounded-card border border-line bg-surface p-5 sm:grid-cols-3 sm:p-6">
          <legend className="px-1 text-lg font-medium">Launch defaults</legend>
          <TextField
            id="setting-defaultInterestTarget"
            label="Default interest target"
            type="number"
            inputMode="numeric"
            value={draft.defaultInterestTarget}
            onChange={(e) => change({ defaultInterestTarget: e.target.value })}
            hint="Interests needed"
            error={errors.defaultInterestTarget}
          />
          <TextField
            id="setting-campaignLengthDays"
            label="Campaign length"
            type="number"
            inputMode="numeric"
            value={draft.campaignLengthDays}
            onChange={(e) => change({ campaignLengthDays: e.target.value })}
            hint="Days"
            error={errors.campaignLengthDays}
          />
          <TextField
            id="setting-closingSoonDays"
            label="“Closing soon” from"
            type="number"
            inputMode="numeric"
            value={draft.closingSoonDays}
            onChange={(e) => change({ closingSoonDays: e.target.value })}
            hint="Days before closing"
            error={errors.closingSoonDays}
          />
        </fieldset>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClasses("primary", "lg")}>
            Save settings
          </button>
          <button type="button" onClick={() => setConfirmReset(true)} className={buttonClasses("secondary", "lg")}>
            Reset to defaults
          </button>
        </div>
      </form>

      <ConfirmDialog
        open={confirmReset}
        title="Reset all settings?"
        confirmLabel="Reset"
        tone="danger"
        onConfirm={reset}
        onCancel={() => setConfirmReset(false)}
      >
        <p>Every setting on this page goes back to its default value, including categories you added.</p>
      </ConfirmDialog>
    </>
  );
}
