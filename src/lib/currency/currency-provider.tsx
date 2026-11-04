"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/locales";

/**
 * Currency is resolved per visitor, not per locale: the same French page shows
 * MAD inside Morocco and USD everywhere else, at a 1:1 amount (no conversion).
 *
 * Copy keeps a `{cur}` token wherever a currency label belongs, so amounts stay
 * untouched and only the label is swapped at render time.
 */
export const CURRENCY_TOKEN = "{cur}";

export type CurrencyCode = "MAD" | "USD";

const LABELS: Record<Locale, Record<CurrencyCode, string>> = {
  en: { MAD: "MAD", USD: "USD" },
  fr: { MAD: "MAD", USD: "USD" },
  ar: { MAD: "درهم", USD: "USD" },
};

/** Outside Morocco (and before detection) the site prices in USD. */
const DEFAULT_CURRENCY: CurrencyCode = "USD";
const CACHE_KEY = "dealup.currency";
const MOROCCO_TIME_ZONES = /^Africa\/(Casablanca|El_Aaiun)$/;

type CurrencyContextValue = {
  currency: CurrencyCode;
  label: string;
  format: (text: string) => string;
};

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: DEFAULT_CURRENCY,
  label: LABELS.en[DEFAULT_CURRENCY],
  format: (text) => text.split(CURRENCY_TOKEN).join(LABELS.en[DEFAULT_CURRENCY]),
});

/**
 * Detects the visitor's country client-side, because the site is a static
 * export with no server runtime.
 *
 * 1. Same-origin `/cdn-cgi/trace` (available when the site is served by
 *    Cloudflare) yields the edge's country code without a third-party request.
 * 2. Otherwise fall back to the device time zone — `Africa/Casablanca` is
 *    Morocco-only.
 * 3. Anything unresolved stays on USD.
 */
async function detectCurrency(): Promise<CurrencyCode> {
  try {
    const cached = window.sessionStorage.getItem(CACHE_KEY);
    if (cached === "MAD" || cached === "USD") return cached;
  } catch {
    // Private mode / storage disabled: detection still runs.
  }

  let country: string | undefined;

  try {
    const response = await fetch("/cdn-cgi/trace", {
      cache: "no-store",
      signal: AbortSignal.timeout(1500),
    });
    if (response.ok) {
      const body = await response.text();
      country = /^loc=([A-Z]{2})$/m.exec(body)?.[1];
    }
  } catch {
    // Not behind Cloudflare, offline, or timed out: use the time zone instead.
  }

  if (!country) {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (MOROCCO_TIME_ZONES.test(timeZone ?? "")) country = "MA";
    } catch {
      // Intl unavailable: stay on the default.
    }
  }

  const currency: CurrencyCode = country === "MA" ? "MAD" : DEFAULT_CURRENCY;

  try {
    window.sessionStorage.setItem(CACHE_KEY, currency);
  } catch {
    // Ignore storage failures.
  }

  return currency;
}

export function CurrencyProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  // Starts at the default so the server HTML and the first client render match;
  // the detected currency lands right after hydration.
  const [currency, setCurrency] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  useEffect(() => {
    let active = true;
    void detectCurrency().then((detected) => {
      if (active) setCurrency(detected);
    });
    return () => {
      active = false;
    };
  }, []);

  const label = LABELS[locale][currency];

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        label,
        format: (text) =>
          text.includes(CURRENCY_TOKEN) ? text.split(CURRENCY_TOKEN).join(label) : text,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

/** Renders copy that carries a `{cur}` token with the visitor's currency label. */
export function Currency({ text }: { text: string }) {
  const { format } = useCurrency();
  return <>{format(text)}</>;
}
