import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function WmBreadcrumb({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["whatsappMarketing"]["breadcrumb"];
}) {
  return (
    <nav aria-label={dictionary.products} className="pt-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
        <li>
          <Link href={localizedHref(locale, "/")} className="hover:text-brand-hover hover:underline">
            {dictionary.home}
          </Link>
        </li>
        <ChevronRight className="size-3 shrink-0 rtl:rotate-180" aria-hidden="true" />
        <li>{dictionary.products}</li>
        <ChevronRight className="size-3 shrink-0 rtl:rotate-180" aria-hidden="true" />
        <li aria-current="page" className="font-medium text-text-primary">{dictionary.current}</li>
      </ol>
    </nav>
  );
}
