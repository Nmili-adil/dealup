import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/**
 * Shared 404 body.
 *
 * Rendered by the localized `[locale]/not-found` (inside the site chrome) and
 * by the global `not-found`, which becomes `out/404.html` under static export
 * and carries its own document because the app has no single root layout.
 */
export function NotFoundView({
  locale,
  dictionary,
  standalone = false,
}: {
  locale: Locale;
  dictionary: Dictionary["notFound"];
  /** True when rendered outside the site chrome, so it owns the full height. */
  standalone?: boolean;
}) {
  return (
    <section
      className={
        standalone
          ? "relative isolate flex min-h-dvh items-center overflow-hidden bg-sand py-20"
          : "relative isolate overflow-hidden bg-sand py-20 lg:py-28"
      }
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -right-24 -top-32 size-[460px] rounded-full bg-brand/12 blur-3xl" />
        <span className="absolute -bottom-40 -left-24 size-[380px] rounded-full bg-brand/8 blur-3xl" />
        <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
      </div>

      <Container className="flex flex-col items-center gap-8 text-center">
        {/* Decorative: the code is repeated as text in the eyebrow below, so
            screen readers are not read a bare number. */}
        <span
          aria-hidden="true"
          className="bg-linear-to-b from-brand-dark/25 to-brand-dark/5 bg-clip-text text-[110px] font-semibold leading-none tracking-tight text-transparent sm:text-[150px]"
        >
          {dictionary.code}
        </span>

        <div className="-mt-4 flex max-w-xl flex-col items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-hover ring-1 ring-brand-dark/10">
            <Compass className="size-3.5" aria-hidden="true" />
            {dictionary.eyebrow}
          </span>

          <h1 className="text-3xl font-semibold leading-[1.12] tracking-tight text-balance text-text-primary sm:text-4xl lg:text-[42px]">
            {dictionary.headline}
          </h1>

          <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
            {dictionary.description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="bg-brand-dark shadow-brand hover:bg-brand-hover">
            <Link href={localizedHref(locale, "/")}>
              {dictionary.primaryCta}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="border-brand/30 bg-white/70">
            <Link href={localizedHref(locale, "/#early-access")}>{dictionary.secondaryCta}</Link>
          </Button>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-brand-dark/10 pt-7">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
            {dictionary.linksLabel}
          </span>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {dictionary.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={localizedHref(locale, link.href)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-dark/10 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-text-primary transition-colors hover:border-brand/40 hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover"
                >
                  {link.title}
                  <ArrowUpRight className="size-3.5 text-text-secondary rtl:-scale-x-100" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
