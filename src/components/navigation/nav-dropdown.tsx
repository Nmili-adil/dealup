"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { localizedHref } from "@/lib/i18n/path";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/locales";

type NavItem = { title: string; description: string; href: string };

/** Above this many entries the panel splits into two columns. */
const TWO_COLUMN_THRESHOLD = 4;

/**
 * Grace period before a hover-opened panel closes, in ms. The panel sits 14px
 * below its trigger, so the pointer leaves the trigger before it reaches the
 * panel; without this the menu would shut in that gap.
 */
const CLOSE_DELAY_MS = 120;

export function NavDropdown({
  label,
  items,
  locale,
}: {
  label: string;
  items: readonly NavItem[];
  locale: Locale;
}) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openNow = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const closeSoon = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  // Matched on the full href, not the first path segment: the products and
  // industries groups both live under /solutions/, so a segment test would
  // light up two triggers at once.
  const hrefs = items.map((item) => localizedHref(locale, item.href));
  const activeIndex = hrefs.findIndex((href) => pathname.startsWith(href));
  const twoColumn = items.length > TWO_COLUMN_THRESHOLD;

  return (
    // Not modal: the default blocks pointer events outside the panel, which
    // would stop the pointer from reaching a sibling trigger.
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") openNow();
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") closeSoon();
          }}
          className={cn(
            "group relative inline-flex h-9 items-center gap-1 rounded-full px-3 text-sm font-medium",
            "transition-colors hover:bg-surface-mint data-[state=open]:bg-surface-mint",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
            activeIndex >= 0 ? "text-brand-hover" : "text-text-primary"
          )}
        >
          {label}
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180",
              activeIndex >= 0 ? "text-brand-hover" : "text-text-muted"
            )}
            aria-hidden="true"
          />
          {activeIndex >= 0 ? (
            <span
              className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand-hover"
              aria-hidden="true"
            />
          ) : null}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={14}
          collisionPadding={16}
          onPointerEnter={cancelClose}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") closeSoon();
          }}
          className={cn(
            "nav-panel z-50 rounded-2xl border border-border bg-white p-2 shadow-e3",
            twoColumn
              ? "grid w-[min(92vw,600px)] grid-cols-2 gap-1"
              : "flex w-[min(92vw,340px)] flex-col gap-1"
          )}
        >
          {items.map((item, index) => (
            <DropdownMenu.Item key={item.href} asChild>
              <Link
                href={hrefs[index]}
                aria-current={index === activeIndex ? "page" : undefined}
                className={cn(
                  "flex flex-col gap-0.5 rounded-xl px-3 py-2.5 text-start outline-none transition-colors",
                  "hover:bg-surface-mint focus-visible:bg-surface-mint",
                  index === activeIndex && "bg-surface-mint"
                )}
              >
                <span
                  className={cn(
                    "text-sm font-medium",
                    index === activeIndex ? "text-brand-hover" : "text-text-primary"
                  )}
                >
                  {item.title}
                </span>
                <span className="text-[13px] leading-snug text-text-secondary">
                  {item.description}
                </span>
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
