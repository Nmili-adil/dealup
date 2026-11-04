import type { Locale } from "./locales";

/**
 * Builds a locale-prefixed href from a locale-agnostic path
 * (e.g. "/pricing" -> "/fr/pricing/", "/#faq" -> "/fr/#faq").
 *
 * The fragment is split off first: normalising the whole string would push the
 * trailing slash past the "#" and produce "/fr/#faq/", which matches nothing.
 */
export function localizedHref(locale: Locale, path: string = "/"): string {
  const [rawPath, fragment] = path.split("#");
  const normalized = rawPath.replace(/^\/|\/$/g, "");
  const base = normalized ? `/${locale}/${normalized}/` : `/${locale}/`;
  return fragment ? `${base}#${fragment}` : base;
}

/** Swaps the locale segment of a full pathname, preserving the rest of the path. */
export function replaceLocaleInPath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  segments.shift();
  const rest = segments.join("/");
  return rest ? `/${nextLocale}/${rest}/` : `/${nextLocale}/`;
}
