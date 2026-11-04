import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { GradientText } from "@/components/ui/titleCustomize";
import { ArticleBody, headingId } from "./article-body";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Article, HelpContent } from "@/content/help";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function HelpArticlePage({
  locale,
  article,
  siblings,
  ui,
  help,
  categoryTitle,
}: {
  locale: Locale;
  article: Article;
  /** Every article in the same category, in order, for prev/next and the rail. */
  siblings: readonly Article[];
  ui: HelpContent["ui"];
  help: Dictionary["help"];
  categoryTitle: string;
}) {
  const position = siblings.findIndex((a) => a.slug === article.slug);
  const previous = position > 0 ? siblings[position - 1] : null;
  const next = position < siblings.length - 1 ? siblings[position + 1] : null;
  const headings = article.blocks.filter((b) => b.kind === "h2");
  const isDraft = article.status === "draft";

  return (
    <div className="bg-white">
      <div className="border-b border-border/70 bg-linear-to-b from-cream to-sand/50 pb-10 pt-26 sm:pt-28">
        <Container className="max-w-[1280px]">
          <nav aria-label={ui.backToHelp}>
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
              <li>
                <Link href={localizedHref(locale, "/help")} className="hover:text-brand-hover hover:underline">
                  {ui.backToHelp}
                </Link>
              </li>
              <ChevronRight className="size-3 shrink-0 rtl:rotate-180" aria-hidden="true" />
              <li aria-current="page" className="font-medium text-text-primary">
                {categoryTitle}
              </li>
            </ol>
          </nav>

          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-balance text-text-primary sm:text-[42px]">
            {article.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-text-on-sand sm:text-lg">
            {article.summary}
          </p>
          {isDraft ? (
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-strong">
              <PenLine className="size-3.5" aria-hidden="true" />
              {ui.draftBadge}
            </span>
          ) : null}
        </Container>
      </div>

      <Container className="max-w-[1280px]">
        <div className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-14">
          <article className="min-w-0 max-w-[68ch]">
            {isDraft ? (
              <div className="rounded-2xl border border-border/80 bg-surface-mint/40 p-6">
                <h2 className="text-lg font-semibold text-text-primary">{ui.draftTitle}</h2>
                <p className="mt-2 text-base leading-7 text-text-secondary">{ui.draftBody}</p>
                <Button asChild size="lg" className="mt-5 bg-brand-dark hover:bg-brand-hover">
                  <a href={localizedHref(locale, "/#early-access")}>{help.contact.primaryCta}</a>
                </Button>
              </div>
            ) : (
              <ArticleBody blocks={article.blocks} />
            )}

            {/* Prev / next within the same topic. */}
            {previous || next ? (
              <nav className="mt-12 grid gap-3 border-t border-border/70 pt-7 sm:grid-cols-2">
                {previous ? (
                  <Link
                    href={localizedHref(locale, `/help/${previous.category}/${previous.slug}`)}
                    className="group flex flex-col gap-1 rounded-2xl border border-border/80 p-4 transition-colors hover:border-brand/40"
                  >
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
                      <ArrowLeft className="size-3.5 rtl:rotate-180" aria-hidden="true" />
                      {ui.previous}
                    </span>
                    <span className="text-sm font-medium text-text-primary group-hover:text-brand-hover">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    href={localizedHref(locale, `/help/${next.category}/${next.slug}`)}
                    className="group flex flex-col items-end gap-1 rounded-2xl border border-border/80 p-4 text-end transition-colors hover:border-brand/40"
                  >
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
                      {ui.next}
                      <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-text-primary group-hover:text-brand-hover">
                      {next.title}
                    </span>
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </article>

          {/* Rail: table of contents, then the rest of the topic. */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            {headings.length > 0 ? (
              <nav aria-labelledby="toc-title" className="mb-8">
                <p id="toc-title" className="text-xs font-semibold uppercase tracking-[0.1em] text-text-secondary">
                  {ui.onThisPage}
                </p>
                <ul className="mt-3 flex flex-col gap-2 border-s border-border/70 ps-4">
                  {headings.map((h) => (
                    <li key={h.text}>
                      <a
                        href={`#${headingId(h.text)}`}
                        className="text-sm leading-6 text-text-secondary transition-colors hover:text-brand-hover"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <nav aria-labelledby="siblings-title">
              <p id="siblings-title" className="text-xs font-semibold uppercase tracking-[0.1em] text-text-secondary">
                {ui.inCategory}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {siblings.map((sibling) => {
                  const current = sibling.slug === article.slug;
                  return (
                    <li key={sibling.slug}>
                      <Link
                        href={localizedHref(locale, `/help/${sibling.category}/${sibling.slug}`)}
                        aria-current={current ? "page" : undefined}
                        className={
                          "block rounded-lg px-3 py-2 text-sm leading-6 transition-colors " +
                          (current
                            ? "bg-surface-mint font-medium text-brand-hover"
                            : "text-text-secondary hover:bg-surface-mint/50 hover:text-text-primary")
                        }
                      >
                        {sibling.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-8 rounded-2xl border border-border/80 bg-white p-5 shadow-e1">
              <p className="text-sm font-semibold text-text-primary">
                <GradientText>{ui.helpfulTitle}</GradientText>
              </p>
              <p className="mt-1.5 text-xs leading-5 text-text-secondary">{ui.helpfulBody}</p>
              <Link
                href={localizedHref(locale, "/#early-access")}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-hover hover:underline"
              >
                {ui.helpfulCta}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
