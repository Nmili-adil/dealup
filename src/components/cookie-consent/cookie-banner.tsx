"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useConsent } from "@/lib/consent/consent-provider";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { ConsentCopy } from "@/lib/consent/consent";
import { Button } from "@/components/ui/button";

/**
 * Non-blocking consent banner shown on first visit (no consent cookie yet).
 * Slides up with a CSS entrance that collapses under prefers-reduced-motion.
 */
export function CookieBanner({
  locale,
  dictionary,
  onCustomize,
}: {
  locale: Locale;
  dictionary: ConsentCopy;
  onCustomize: () => void;
}) {
  const { acceptAll, rejectAll, decided } = useConsent();
  const t = dictionary.banner;

  // Don't show once the visitor has made a choice for this consent version.
  if (decided) return null;

  return (
    <aside
      role="region"
      aria-label={t.title}
      className="cookie-banner fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 rounded-2xl border border-border/70 bg-white/95 p-5 shadow-e3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
          <span className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-surface-mint text-brand-hover sm:grid">
            <Cookie className="size-5" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-col gap-1.5">
            <p className="text-sm font-semibold text-text-primary">{t.title}</p>
            <p className="text-sm leading-6 text-text-secondary">{t.body}</p>
            <Link
              href={localizedHref(locale, "/cookies")}
              className="mt-1 w-fit text-sm font-medium text-brand-hover underline-offset-4 hover:underline"
            >
              {t.policyLink}
            </Link>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          <Button variant="ghost" size="sm" onClick={onCustomize}>
            {t.customize}
          </Button>
          <Button variant="secondary" size="sm" onClick={rejectAll}>
            {t.rejectAll}
          </Button>
          <Button variant="primary" size="sm" onClick={acceptAll}>
            {t.acceptAll}
          </Button>
        </div>
      </div>
    </aside>
  );
}
