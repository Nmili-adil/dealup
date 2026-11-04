import Image from "next/image";
import Link from "next/link";
import { Webhook } from "lucide-react";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "./section-title";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Brand marks we ship; HubSpot is set as type because we have no mark for it. */
const LOGOS: Array<[string, string]> = [
  ["Shopify", "/assets/logos/shopify.svg"],
  ["WooCommerce", "/assets/logos/woocommerce.svg"],
  ["WordPress", "/assets/logos/wordpress.svg"],
];

export function ApiIntegrations({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["whatsappBusinessApi"]["integrations"];
}) {
  return (
    <Section aria-labelledby="integrations-title">
      <SectionTitle id="integrations-title" title={dictionary.title} highlight={dictionary.highlight} />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {LOGOS.map(([label, src], index) => (
          <MotionReveal key={label} delay={index * 0.07}>
            <div className="flex h-20 items-center justify-center rounded-2xl border border-border bg-white p-4 shadow-e1">
              <Image src={src} alt={label} width={150} height={42} loading="eager" className="max-h-9 w-auto max-w-full" />
            </div>
          </MotionReveal>
        ))}
        <MotionReveal delay={0.21}>
          <div className="flex h-20 items-center justify-center gap-2 rounded-2xl border border-border bg-white p-4 text-xl font-semibold tracking-tight text-[#263238] shadow-e1">
            <span className="text-[#ff7a59]">Hub</span>
            <span>Spot</span>
          </div>
        </MotionReveal>
        <MotionReveal delay={0.28}>
          <Link
            href={localizedHref(locale, "/#integrations")}
            className="flex h-20 items-center justify-center gap-2 rounded-2xl border border-border bg-white p-4 text-sm font-semibold text-text-primary shadow-e1 transition-colors hover:border-brand/40 hover:bg-surface-mint"
          >
            <Webhook className="size-5 text-brand-hover" aria-hidden="true" /> {dictionary.moreLabel}
          </Link>
        </MotionReveal>
      </div>
    </Section>
  );
}
