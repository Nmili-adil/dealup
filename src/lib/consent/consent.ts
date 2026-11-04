/**
 * Cookie consent core — categories, cookie persistence and helpers.
 *
 * Everything here is client-side: the site is a static export with no server
 * runtime, so consent state lives entirely in a browser cookie. The consent
 * UI and gating hooks import from this module (see `consent-provider.tsx`).
 */

/** Cookie that records the visitor's consent choices. */
export const CONSENT_COOKIE = "dealup_consent";

/** Bump when the category set or the copy materially changes, to re-ask. */
export const CONSENT_VERSION = "2026-09-02";

/** Consent lifetime in days (a year — the common professional default). */
export const CONSENT_MAX_AGE_DAYS = 365;

export type ConsentCategory = "essential" | "analytics" | "marketing";

/** Whether each category is currently allowed. */
export type ConsentState = Record<ConsentCategory, boolean>;

export type ConsentCategoryCopyKey =
  | "essential"
  | "essentialDescription"
  | "analytics"
  | "analyticsDescription"
  | "marketing"
  | "marketingDescription";

export interface ConsentCopy {
  banner: {
    title: string;
    body: string;
    acceptAll: string;
    rejectAll: string;
    customize: string;
    policyLink: string;
  };
  preferences: {
    title: string;
    body: string;
    acceptAll: string;
    rejectAll: string;
    save: string;
    close: string;
    requiredNote: string;
  };
  categories: Record<ConsentCategoryCopyKey, string>;
  footerLabel: string;
}

export interface ConsentCategoryDef {
  id: ConsentCategory;
  /** i18n key under `cookieConsent.categories.<id>.label` */
  labelKey: ConsentCategoryCopyKey;
  /** i18n key under `cookieConsent.categories.<id>.description` */
  descriptionKey: ConsentCategoryCopyKey;
  /** Essential cookies cannot be turned off. */
  required: boolean;
}

/** The category set shown in the banner/preferences, mirroring /cookies. */
export const CONSENT_CATEGORIES: ConsentCategoryDef[] = [
  { id: "essential", labelKey: "essential", descriptionKey: "essentialDescription", required: true },
  { id: "analytics", labelKey: "analytics", descriptionKey: "analyticsDescription", required: false },
  { id: "marketing", labelKey: "marketing", descriptionKey: "marketingDescription", required: false },
];

const DEFAULTS: ConsentState = { essential: true, analytics: false, marketing: false };

/**
 * Parse a stored consent cookie value into a complete ConsentState.
 * Unknown/malformed values fall back to the defaults per category.
 */
export function parseConsent(raw: string | undefined | null): ConsentState {
  if (!raw) return { ...DEFAULTS };
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentState> & { version?: string };
    // Re-ask if the cookie predates the current version.
    if (parsed.version !== CONSENT_VERSION) return { ...DEFAULTS };
    return {
      essential: true, // never negotiable
      analytics: typeof parsed.analytics === "boolean" ? parsed.analytics : false,
      marketing: typeof parsed.marketing === "boolean" ? parsed.marketing : false,
    };
  } catch {
    return { ...DEFAULTS };
  }
}

/** Serialise a ConsentState to the JSON stored in the consent cookie. */
export function serializeConsent(state: ConsentState): string {
  return JSON.stringify({ ...state, version: CONSENT_VERSION });
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : undefined;
}

function writeCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

/** Read and parse the stored consent, or the defaults if none/expired. */
export function readConsent(): ConsentState {
  return parseConsent(readCookie(CONSENT_COOKIE));
}

/** Persist a consent state to the cookie, bumping the expiry window. */
export function writeConsent(state: ConsentState): void {
  writeCookie(CONSENT_COOKIE, serializeConsent(state), CONSENT_MAX_AGE_DAYS * 24 * 60 * 60);
}

/** True once the visitor has made a choice for the current consent version. */
export function hasConsent(): boolean {
  if (typeof document === "undefined") return false;
  const raw = readCookie(CONSENT_COOKIE);
  if (!raw) return false;
  try {
    return (JSON.parse(raw) as { version?: string }).version === CONSENT_VERSION;
  } catch {
    return false;
  }
}
