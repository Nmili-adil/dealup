"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CONSENT_CATEGORIES,
  type ConsentCategory,
  type ConsentState,
  hasConsent,
  readConsent,
  writeConsent,
} from "./consent";

/** Custom event dispatched on <html> whenever consent changes, so external /
 *  tagged scripts can subscribe without importing this module. */
export const CONSENT_EVENT = "dealup:consent";

export interface ConsentContextValue {
  /** Current consent state (defaults until the visitor chooses). */
  consent: ConsentState;
  /** True once a consent cookie for the current version exists. */
  decided: boolean;
  /** Allow/disallow one non-essential category. */
  setPreference: (category: ConsentCategory, allowed: boolean) => void;
  /** Opt in to every category. */
  acceptAll: () => void;
  /** Keep only essential cookies. */
  rejectAll: () => void;
  /** True if a given category is currently allowed. */
  allows: (category: ConsentCategory) => boolean;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

/** Reflects consent onto <html data-consent-*> and notifies subscribers. */
function syncDocument(state: ConsentState): void {
  if (typeof document === "undefined") return;
  for (const { id } of CONSENT_CATEGORIES) {
    document.documentElement.setAttribute(`data-consent-${id}`, String(state[id]));
  }
  document.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

const EMPTY_DEFAULTS: ConsentState = { essential: true, analytics: false, marketing: false };

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(EMPTY_DEFAULTS);
  const [decided, setDecided] = useState(false);

  // Read the stored choice once on mount and surface it to the DOM.
  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setDecided(hasConsent());
    syncDocument(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apply = useCallback((next: ConsentState) => {
    setConsent(next);
    setDecided(true);
    writeConsent(next);
    syncDocument(next);
  }, []);

  const setPreference = useCallback(
    (category: ConsentCategory, allowed: boolean) => {
      if (category === "essential") return; // always on
      setConsent((prev) => {
        const next = { ...prev, [category]: allowed };
        setDecided(true);
        writeConsent(next);
        syncDocument(next);
        return next;
      });
    },
    []
  );

  const acceptAll = useCallback(() => {
    apply({ essential: true, analytics: true, marketing: true });
  }, [apply]);

  const rejectAll = useCallback(() => {
    apply({ essential: true, analytics: false, marketing: false });
  }, [apply]);

  const allows = useCallback(
    (category: ConsentCategory) => consent[category],
    [consent]
  );

  const value = useMemo<ConsentContextValue>(
    () => ({ consent, decided, setPreference, acceptAll, rejectAll, allows }),
    [consent, decided, setPreference, acceptAll, rejectAll, allows]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

/** Access the consent context from any client component. */
export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within a <ConsentProvider>.");
  }
  return ctx;
}
