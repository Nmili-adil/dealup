import Link from "next/link";
import { Container } from "@/components/layout/container";
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

  const columns = [
    { title: dictionary.footer.columns.platform, items: dictionary.nav.products.items },
    { title: dictionary.footer.columns.solutions, items: dictionary.nav.solutions.items },
    { title: dictionary.footer.columns.features, items: dictionary.nav.features.items },
    { title: dictionary.footer.columns.integrations, items: dictionary.nav.integrations.items },
    { title: dictionary.footer.columns.resources, items: dictionary.nav.resources.items },
  ];

  return (
    <footer className="bg-brand-dark text-white/80">
      <Container className="py-16">
        <div className="flex items-start">
          <div className="col-span-2 flex flex-col gap-3">
            <span className="text-xl font-semibold text-white">Dealup</span>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              {dictionary.footer.description}
            </p>
          </div>
    <div className="flex items-start justify-evenly flex-1">


          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-white">{column.title}</span>
              <ul className="flex flex-col gap-2">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={localizedHref(locale, item.href)}
                      className="text-sm text-white/60 transition-colors hover:text-white duration-300 ease-in-out hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
    </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-white">{dictionary.footer.columns.company}</span>
            <ul className="flex flex-col gap-2">
              {dictionary.footer.companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localizedHref(locale, item.href)}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/50">
            © {year} {dictionary.footer.copyright}
          </p>
          <LocaleSwitcher currentLocale={locale} label={dictionary.footer.languageLabel} />
        </div>
      </Container>
    </footer>
  );
}
