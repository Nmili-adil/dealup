import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { NavDropdown } from "./nav-dropdown";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Navbar({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-white/85 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between py-3">
        <Link
          href={localizedHref(locale, "/")}
          className="text-xl font-semibold tracking-tight text-text-primary"
        >
          Dealup
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <NavDropdown label={dictionary.nav.products.label} items={dictionary.nav.products.items} locale={locale} />
          <NavDropdown label={dictionary.nav.solutions.label} items={dictionary.nav.solutions.items} locale={locale} />
          <NavDropdown label={dictionary.nav.features.label} items={dictionary.nav.features.items} locale={locale} />
          <NavDropdown label={dictionary.nav.integrations.label} items={dictionary.nav.integrations.items} locale={locale} />
          <NavDropdown label={dictionary.nav.resources.label} items={dictionary.nav.resources.items} locale={locale} />
          <Link
            href={localizedHref(locale, "/pricing")}
            className="rounded-full px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-mint"
          >
            {dictionary.nav.pricing}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher currentLocale={locale} label={dictionary.footer.languageLabel} />
          <Link
            href={localizedHref(locale, "/login")}
            className="hidden text-sm font-medium text-text-primary hover:text-brand-hover lg:inline-block"
          >
            {dictionary.nav.login}
          </Link>
          <Button asChild size="sm" className="hidden lg:inline-flex bg-brand-dark">
            <Link href={localizedHref(locale, "/get-started")}>{dictionary.nav.getStarted}</Link>
          </Button>
          <MobileMenu locale={locale} dictionary={dictionary} />
        </div>
      </Container>
    </header>
  );
}
