"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/locales";
import type { ConsentCopy } from "@/lib/consent/consent";
import { CookieBanner } from "./cookie-banner";
import { CookiePreferences } from "./cookie-preferences";

/**
 * Event name the footer's "Cookie preferences" trigger dispatches to reopen
 * the dialog from anywhere on the site.
 */
export const SHOW_PREFERENCES_EVENT = "dealup:show-preferences";

/**
 * Top-level cookie consent system. Mount once in the locale layout:
 *
 *   <CookieConsent locale={locale} dictionary={dictionary.cookieConsent} />
 *
 * Must be mounted inside the <ConsentProvider> that owns the shared consent
 * state and cookie.
 */
export function CookieConsent({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: ConsentCopy;
}) {
  return <CookieConsentInner locale={locale} dictionary={dictionary} />;
}

function CookieConsentInner({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: ConsentCopy;
}) {
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  // Let the footer (or any code) reopen the preferences dialog.
  useEffect(() => {
    const open = () => setPreferencesOpen(true);
    window.addEventListener(SHOW_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(SHOW_PREFERENCES_EVENT, open);
  }, []);

  return (
    <>
      <CookieBanner
        locale={locale}
        dictionary={dictionary}
        onCustomize={() => setPreferencesOpen(true)}
      />
      <CookiePreferences
        open={preferencesOpen}
        onOpenChange={setPreferencesOpen}
        dictionary={dictionary}
      />
    </>
  );
}
