import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HelpArticlePage } from "@/components/sections/help/article-page";
import { getHelpContent } from "@/content/help";
import { locales, isLocale, type Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildPageMetadata } from "@/lib/seo/metadata";

type Params = { locale: string; category: string; slug: string };

/**
 * Every article is prerendered. The slug list is identical across locales
 * (enforced when the content modules are generated), so the English set is
 * enough to enumerate the routes.
 */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getHelpContent(locale).articles.map((article) => ({
      locale,
      category: article.category,
      slug: article.slug,
    }))
  );
}

export const dynamicParams = false;

function find(locale: Locale, category: string, slug: string) {
  const content = getHelpContent(locale);
  const article = content.articles.find((a) => a.slug === slug && a.category === category);
  return article ? { content, article } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale: rawLocale, category, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const found = find(rawLocale, category, slug);
  if (!found) notFound();

  return {
    ...buildPageMetadata({
      locale: rawLocale,
      path: `/help/${category}/${slug}`,
      title: `${found.article.title} | Dealup`,
      description: found.article.summary,
    }),
    // A scaffolded article has no body worth indexing yet.
    ...(found.article.status === "draft" ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function HelpArticleRoute({ params }: { params: Promise<Params> }) {
  const { locale: rawLocale, category, slug } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const found = find(locale, category, slug);
  if (!found) notFound();

  const dictionary = await getDictionary(locale);
  const siblings = found.content.articles.filter((a) => a.category === category);
  const categoryTitle =
    dictionary.help.categories.items.find((c) => c.id === category)?.title ?? category;

  return (
    <HelpArticlePage
      locale={locale}
      article={found.article}
      siblings={siblings}
      ui={found.content.ui}
      help={dictionary.help}
      categoryTitle={categoryTitle}
    />
  );
}
