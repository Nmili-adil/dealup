"use client";

import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";

type NavItem = { title: string; description: string; href: string };

export function NavDropdown({
  label,
  items,
  locale,
}: {
  label: string;
  items: readonly NavItem[];
  locale: Locale;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="group flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {label}
          <ChevronDown
            className="size-4 text-text-muted transition-transform group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={12}
          className="z-50 grid w-[min(90vw,640px)] grid-cols-2 gap-1 rounded-2xl border border-border bg-white p-3 shadow-xl"
        >
          {items.map((item) => (
            <DropdownMenu.Item key={item.href} asChild>
              <Link
                href={localizedHref(locale, item.href)}
                className="flex flex-col gap-0.5 rounded-xl p-3 text-start outline-none transition-colors hover:bg-surface-mint focus-visible:bg-surface-mint"
              >
                <span className="text-sm font-medium text-text-primary">{item.title}</span>
                <span className="text-sm text-text-secondary">{item.description}</span>
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
