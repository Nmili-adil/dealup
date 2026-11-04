"use client";

import { SHOW_PREFERENCES_EVENT } from "./cookie-consent";

/**
 * Opens the cookie-preferences dialog from anywhere on the site (used in the
 * footer). The dialog itself is mounted by <CookieConsent> in the layout, so
 * this just broadcasts the open request via a window event.
 */
export function CookiePreferencesTrigger({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(SHOW_PREFERENCES_EVENT))}
      className="text-text-secondary transition-colors duration-200 hover:text-brand-hover hover:underline"
    >
      {label}
    </button>
  );
}
