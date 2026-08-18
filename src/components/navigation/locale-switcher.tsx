"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Globe, Check } from "lucide-react";
import { locales, localeNames, type Locale } from "@/lib/i18n/locales";
import { replaceLocaleInPath } from "@/lib/i18n/path";
import { cn } from "@/lib/utils/cn";

export function LocaleSwitcher({
  currentLocale,
  label,
}: {
  currentLocale: Locale;
  label: string;
}) {
  const pathname = usePathname() ?? `/${currentLocale}/`;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={label}
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-sm font-medium text-text-primary transition-colors hover:border-brand-hover"
        >
          <Globe className="size-4" aria-hidden="true" />
          {currentLocale.toUpperCase()}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-40 rounded-xl border border-border bg-white p-1.5 shadow-lg"
        >
          {locales.map((locale) => (
            <DropdownMenu.Item key={locale} asChild>
              <Link
                href={replaceLocaleInPath(pathname, locale)}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-text-primary outline-none hover:bg-surface-mint",
                  locale === currentLocale && "font-medium"
                )}
              >
                {localeNames[locale]}
                {locale === currentLocale ? (
                  <Check className="size-4 text-brand" aria-hidden="true" />
                ) : null}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
