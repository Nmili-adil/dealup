"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpen,
  CreditCard,
  FileText,
  Plug,
  Rocket,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { GradientText } from "@/components/ui/titleCustomize";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Article } from "@/content/help";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Copy = Dictionary["help"];

/** Icons stay in code and pair with the translated categories by id. */
const ICONS: Record<string, LucideIcon> = {
  start: Rocket,
  api: BookOpen,
  templates: FileText,
  automation: Sparkles,
  integrations: Plug,
  billing: CreditCard,
};

/** Case- and accent-insensitive, so "modele" still finds "modèle". */
function normalise(value: string) {
  return value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/**
 * Search plus the topic grid.
 *
 * The search filters the list that is already on the page rather than
 * pretending to query a backend — every article shown here is real content in
 * the dictionary, so a query either narrows it or reports honestly that
 * nothing matched.
 */
export function HelpBrowser({
  locale,
  dictionary,
  articles,
}: {
  locale: Locale;
  dictionary: Copy;
  articles: readonly Article[];
}) {
  const [query, setQuery] = useState("");
  const { hero, categories, empty } = dictionary;

  const results = useMemo(() => {
    const q = normalise(query.trim());

    return categories.items
      .map((category) => {
        const inCategory = articles.filter((a) => a.category === category.id);
        if (!q) return { category, articles: inCategory };

        // A hit on the topic name keeps all of its articles; otherwise the
        // article list itself is narrowed, matching title and summary.
        const categoryHit =
          normalise(category.title).includes(q) || normalise(category.description).includes(q);
        const matched = categoryHit
          ? inCategory
          : inCategory.filter(
              (a) => normalise(a.title).includes(q) || normalise(a.summary).includes(q)
            );
        return { category, articles: matched };
      })
      .filter((r) => r.articles.length > 0);
  }, [query, categories.items, articles]);

  return (
    <>
      {/* ---------- search ---------- */}
      <div className="mx-auto mt-8 w-full max-w-xl">
        <label htmlFor="help-search" className="sr-only">
          {hero.searchLabel}
        </label>
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute start-4 top-1/2 size-4.5 -translate-y-1/2 text-text-secondary"
          />
          <input
            id="help-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={hero.searchPlaceholder}
            className="h-13 w-full rounded-full border border-border bg-white ps-12 pe-4 text-base text-text-primary shadow-e1 outline-none transition-colors placeholder:text-text-secondary focus-visible:border-brand/50 focus-visible:ring-2 focus-visible:ring-brand/25"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-text-on-sand">
            {hero.popularLabel}
          </span>
          {hero.popular.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-text-on-sand ring-1 ring-brand-dark/8 transition-colors hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- results ---------- */}
      <div className="mt-14">
        <h2 className="text-center text-2xl font-semibold tracking-[-0.03em] text-text-primary sm:text-3xl">
          <GradientText>{categories.title}</GradientText>
        </h2>

        {/* Announced to a screen reader when the count changes under typing. */}
        <p aria-live="polite" className="sr-only">
          {results.length} {categories.countLabel}
        </p>

        {results.length === 0 ? (
          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border/80 bg-white p-8 text-center shadow-e1">
            <h3 className="text-lg font-semibold text-text-primary">{empty.title}</h3>
            <p className="mt-2 text-sm leading-6 text-text-secondary">{empty.description}</p>
          </div>
        ) : (
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map(({ category, articles }) => {
              const Icon = ICONS[category.id];
              return (
                <li key={category.id}>
                  <article className="flex h-full flex-col rounded-2xl border border-border/80 bg-white p-5 shadow-e1 transition-colors hover:border-brand/30">
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-mint text-brand-hover"
                      >
                        <Icon className="size-5" strokeWidth={1.8} />
                      </span>
                      <h3 className="text-[15px] font-semibold leading-snug text-text-primary">
                        <GradientText>{category.title}</GradientText>
                      </h3>
                    </span>

                    <p className="mt-2.5 text-sm leading-6 text-text-secondary">
                      {category.description}
                    </p>

                    <ul className="mt-4 flex flex-col gap-1.5 border-t border-border/60 pt-3.5">
                      {articles.map((article) => (
                        <li key={article.slug}>
                          <Link
                            href={localizedHref(
                              locale,
                              `/help/${article.category}/${article.slug}`
                            )}
                            className="flex items-start gap-2 rounded text-[13px] leading-6 text-text-primary transition-colors hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1 shrink-0 rounded-full bg-brand"
                            />
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <span
                      className={cn(
                        "mt-4 text-xs text-text-secondary",
                        !query && "opacity-70"
                      )}
                    >
                      {articles.length} {categories.countLabel}
                    </span>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
