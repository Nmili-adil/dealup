import Link from "next/link";
import { Heart } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { CookiePreferencesTrigger } from "@/components/cookie-consent/cookie-preferences-trigger";
import { LocaleSwitcher } from "@/components/navigation/locale-switcher";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Footer({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const year = new Date().getFullYear();
  const { nav, footer } = dictionary;

  const columns = [
    { title: footer.columns.platform, items: nav.products.items },
    { title: footer.columns.features, items: nav.features.items },
    { title: footer.columns.solutions, items: nav.solutions.items },
    { title: footer.columns.industries, items: nav.industries.items },
    { title: footer.columns.company, items: footer.companyLinks },
  ];

  return (
    <footer className="border-t border-border/60 bg-white text-text-secondary">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_repeat(6,minmax(0,1fr))]">
          <div className="flex flex-col gap-3">
            <Link
              href={localizedHref(locale, "/")}
              // The logo is decorative imagery, so the link needs its own name.
              aria-label={dictionary.common.homeLinkLabel}
              className="inline-flex w-fit items-center gap-2 text-brand-hover"
            >
              <Logo markHeight={34} wordHeight={21} />
            </Link>
            <p className="max-w-[260px] text-sm leading-relaxed text-text-secondary">
              {footer.description}
            </p>
          </div>

    
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-text-primary">{column.title}</span>
              <ul className="flex flex-col gap-2">
                {column.items.slice(0, 6).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={localizedHref(locale, item.href)}
                      className="text-sm text-text-secondary transition-colors duration-200 hover:text-brand-hover hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border/70 pt-7 text-sm sm:flex-row sm:justify-between">
          <p className="text-text-secondary">
            © {year} {footer.copyright}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {footer.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={localizedHref(locale, link.href)}
                className="text-text-secondary transition-colors duration-200 hover:text-brand-hover hover:underline"
              >
                {link.title}
              </Link>
            ))}
            <CookiePreferencesTrigger label={dictionary.cookieConsent.footerLabel} />
            <span className="mx-1 hidden h-4 w-px bg-border sm:inline-block" aria-hidden="true" />
            <span className="inline-flex items-center gap-1 text-text-secondary">
              {footer.madeWith.prefix}
              <Heart className="size-3.5 fill-current text-red-500" aria-hidden="true" />
              {footer.madeWith.suffix}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center border-t border-border/40 pt-5 sm:justify-end">
          <LocaleSwitcher currentLocale={locale} label={footer.languageLabel} />
        </div>
      </Container>
    </footer>
  );
}
