"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function MobileMenu({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const [open, setOpen] = useState(false);
  const groups = [
    { label: dictionary.nav.products.label, items: dictionary.nav.products.items },
    { label: dictionary.nav.solutions.label, items: dictionary.nav.solutions.items },
    { label: dictionary.nav.features.label, items: dictionary.nav.features.items },
    { label: dictionary.nav.integrations.label, items: dictionary.nav.integrations.items },
    { label: dictionary.nav.resources.label, items: dictionary.nav.resources.items },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={dictionary.mobileNav.open}
          className="inline-flex size-10 items-center justify-center rounded-full text-text-primary lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-ink/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed inset-y-0 end-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto bg-white p-6"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.25 }}
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-lg font-semibold text-text-primary">
                    Dealup
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label={dictionary.mobileNav.close}
                      className="inline-flex size-10 items-center justify-center rounded-full text-text-primary"
                    >
                      <X className="size-5" aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>

                <nav className="mt-8 flex flex-1 flex-col gap-6">
                  {groups.map((group) => (
                    <div key={group.label} className="flex flex-col gap-2">
                      <span className="text-sm font-semibold text-text-secondary">
                        {group.label}
                      </span>
                      <ul className="flex flex-col gap-1">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={localizedHref(locale, item.href)}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-2 py-2 text-text-primary hover:bg-surface-mint"
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link
                    href={localizedHref(locale, "/pricing")}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm font-semibold text-text-primary hover:bg-surface-mint"
                  >
                    {dictionary.nav.pricing}
                  </Link>
                </nav>

                <div className="mt-auto flex flex-col gap-3 pt-6">
                  <Button asChild variant="secondary">
                    <Link href={localizedHref(locale, "/login")}>{dictionary.nav.login}</Link>
                  </Button>
                  <Button asChild>
                    <Link href={localizedHref(locale, "/get-started")}>
                      {dictionary.nav.getStarted}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
