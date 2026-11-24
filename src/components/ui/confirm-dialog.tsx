"use client";

// A pop-up that asks "Are you sure?" before a consequential action.
// Uses the browser's built-in <dialog> element, which traps keyboard focus,
// closes on Escape, and returns focus to the button that opened it.

import { useEffect, useId, useRef } from "react";
import { buttonClasses } from "./button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  /** Explains what will happen */
  children: React.ReactNode;
  confirmLabel: string;
  /** "danger" styles the confirm button for destructive actions */
  tone?: "default" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
  /**
   * Element to focus after closing if the button that opened the dialog has
   * gone (e.g. an "Approve" button that disappears once approved).
   */
  fallbackFocusRef?: React.RefObject<HTMLElement | null>;
};

export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  tone = "default",
  onConfirm,
  onCancel,
  fallbackFocusRef,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // Open or close the native dialog when the `open` prop changes.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      openerRef.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
    }
    if (!open && dialog.open) {
      dialog.close();
      // Put focus somewhere sensible: back on the opener if it still exists.
      const opener = openerRef.current;
      const canRefocus = opener?.isConnected && !opener.hasAttribute("disabled");
      if (canRefocus) opener.focus();
      else fallbackFocusRef?.current?.focus();
    }
  }, [open, fallbackFocusRef]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      // Escape key or closing by any other route counts as "cancel".
      onClose={() => {
        if (open) onCancel();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onCancel();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-card bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/60"
    >
      <div className="p-6 sm:p-8">
        <h2 id={titleId} className="text-2xl font-medium">
          {title}
        </h2>
        <div className="mt-3 leading-relaxed text-muted">{children}</div>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          {/* Cancel comes first in the page order, so the dialog focuses it when it
              opens and pressing Enter never confirms by accident */}
          <button type="button" onClick={onCancel} className={buttonClasses("secondary")}>
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={
              tone === "danger"
                ? buttonClasses("primary", "md", "bg-brand-dark hover:bg-ink")
                : buttonClasses("primary")
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
