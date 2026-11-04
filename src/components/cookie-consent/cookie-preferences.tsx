"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { CONSENT_CATEGORIES, type ConsentCategory, type ConsentCopy } from "@/lib/consent/consent";
import { useConsent } from "@/lib/consent/consent-provider";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

/**
 * Granular cookie-preferences dialog. Reopened from the banner's "Customize"
 * action and from the footer's "Cookie preferences" control.
 */
export function CookiePreferences({
  open,
  onOpenChange,
  dictionary,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dictionary: ConsentCopy;
}) {
  const { consent, setPreference, acceptAll, rejectAll } = useConsent();
  const t = dictionary.preferences;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border/70 bg-white p-6 shadow-e4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-semibold tracking-tight text-text-primary">
                {t.title}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm leading-6 text-text-secondary">
                {t.body}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label={t.close}
              className="rounded-md p-1.5 text-text-secondary transition-colors hover:bg-surface-mint hover:text-text-primary"
            >
              <X className="size-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {CONSENT_CATEGORIES.map((category) => {
              const on = consent[category.id];
              const required = category.required;
              const label = dictionary.categories[category.labelKey];
              const description = dictionary.categories[category.descriptionKey];
              return (
                <div
                  key={category.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-white p-4"
                >
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <p className="text-sm font-semibold text-text-primary">{label}</p>
                    <p className="text-xs leading-5 text-text-secondary">{description}</p>
                    {required ? (
                      <span className="mt-1 w-fit rounded-full bg-surface-mint px-2 py-0.5 text-[11px] font-medium text-brand-hover">
                        {t.requiredNote}
                      </span>
                    ) : null}
                  </div>
                  <Toggle
                    checked={on}
                    disabled={required}
                    onCheckedChange={(v) => setPreference(category.id as ConsentCategory, v)}
                    label={label as string}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
            <Button variant="secondary" size="sm" onClick={rejectAll}>
              {t.rejectAll}
            </Button>
            <Button variant="ghost" size="sm" onClick={acceptAll}>
              {t.acceptAll}
            </Button>
            <Button variant="primary" size="sm" onClick={() => onOpenChange(false)}>
              {t.save}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Minimal accessible switch. */
function Toggle({
  checked,
  disabled,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        checked ? "bg-brand" : "bg-border",
        disabled && "cursor-not-allowed opacity-70"
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute start-0.5 top-0.5 size-5 rounded-full bg-white shadow-sm ring-1 ring-ink/5 transition-transform",
          checked ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}
