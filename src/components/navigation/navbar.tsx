"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { NavDropdown } from "./nav-dropdown";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { localizedHref } from "@/lib/i18n/path";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Navbar({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { nav } = dictionary;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md",
        "transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border/70 bg-cream/90 shadow-e2"
          : "border-transparent bg-cream/70"
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-3 py-3">
        <Link
          href={localizedHref(locale, "/")}
          className="inline-flex items-center gap-2 text-brand-hover"
          aria-label={dictionary.common.homeLinkLabel}
        >
          <Logo priority markHeight={34} wordHeight={21} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <NavDropdown label={nav.products.label} items={nav.products.items} locale={locale} />
          <NavDropdown label={nav.industries.label} items={nav.industries.items} locale={locale} />
          <NavDropdown label={nav.features.label} items={nav.features.items} locale={locale} />
          <NavDropdown label={nav.solutions.label} items={nav.solutions.items} locale={locale} />
          <NavDropdown label={nav.resources.label} items={nav.resources.items} locale={locale} />
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher currentLocale={locale} label={dictionary.footer.languageLabel} />
          <Button asChild size="sm" variant="secondary" className="hidden xl:inline-flex">
            <Link href={localizedHref(locale, "/book-demo")}>{nav.bookDemo}</Link>
          </Button>
          <Button asChild size="sm" className="hidden bg-brand-dark hover:bg-brand-hover md:inline-flex">
            <Link href={localizedHref(locale, "/contact")}>{nav.getStarted}</Link>
          </Button>
          <MobileMenu locale={locale} dictionary={dictionary} />
        </div>
      </Container>
    </header>
  );
}
