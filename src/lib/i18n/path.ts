import type { Locale } from "./locales";

/** Builds a locale-prefixed href from a locale-agnostic path (e.g. "/pricing" -> "/fr/pricing/"). */
export function localizedHref(locale: Locale, path: string = "/"): string {
  const normalized = path === "/" ? "" : path.replace(/^\/|\/$/g, "");
  return normalized ? `/${locale}/${normalized}/` : `/${locale}/`;
}

/** Swaps the locale segment of a full pathname, preserving the rest of the path. */
export function replaceLocaleInPath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  segments.shift();
  const rest = segments.join("/");
  return rest ? `/${nextLocale}/${rest}/` : `/${nextLocale}/`;
}
