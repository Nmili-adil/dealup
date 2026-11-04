import type { LegalContent } from "./types";
import { legalEN } from "./en";
import { legalFR } from "./fr";
import { legalAR } from "./ar";
import type { Locale } from "@/lib/i18n/locales";

const byLocale: Record<Locale, LegalContent> = { en: legalEN, fr: legalFR, ar: legalAR };

export function getLegalContent(locale: Locale): LegalContent {
  return byLocale[locale];
}

export type { LegalContent, LegalPageContent, LegalPageKey } from "./types";
