import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";

export type BreadcrumbCrumb = { label: string; href?: string; current?: boolean };

/**
 * Generic breadcrumb for deep pages (features, solutions, industries).
 * Crumbs without an href render as plain text; the last crumb marks current.
 * Chevrons flip automatically in RTL.
 */
export function Breadcrumbs({
  locale,
  crumbs,
  ariaLabel,
}: {
  locale: Locale;
  crumbs: readonly BreadcrumbCrumb[];
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel} className="pt-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.label + index} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="size-3 shrink-0 rtl:rotate-180" aria-hidden="true" />
              ) : null}
              {crumb.href && !last ? (
                <Link
                  href={localizedHref(locale, crumb.href)}
                  className="hover:text-brand-hover hover:underline"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={last ? "font-medium text-text-primary" : "text-text-secondary"}>
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
