import type { HelpContent } from "./types";
import { helpEN } from "./en";
import { helpFR } from "./fr";
import { helpAR } from "./ar";
import type { Locale } from "@/lib/i18n/locales";

const byLocale: Record<Locale, HelpContent> = { en: helpEN, fr: helpFR, ar: helpAR };

export function getHelpContent(locale: Locale): HelpContent {
  return byLocale[locale];
}

export type { Article, Block, HelpContent } from "./types";
