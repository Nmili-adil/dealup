import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { FeatureRelatedCopy } from "./copy";

/**
 * Cross-feature discovery: a compact band of internal links that connects
 * this page to the rest of the product. Builds the internal linking network
 * that matters for both UX and SEO.
 */
export function FeatureRelated({
  locale,
  copy,
}: {
  locale: Locale;
  copy: FeatureRelatedCopy;
}) {
  return (
    <Section tone="mint" spacing="lg" aria-labelledby="feature-related-title">
      <Container className="max-w-[1080px]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="feature-related-title"
            className="text-2xl font-semibold tracking-[-0.03em] text-text-primary sm:text-3xl"
          >
            {copy.title}
          </h2>
          {copy.description ? (
            <p className="max-w-sm text-sm leading-6 text-text-secondary">{copy.description}</p>
          ) : null}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {copy.items.map((item, index) => (
            <MotionReveal key={item.href} delay={(index % 3) * 0.05}>
              <Link
                href={localizedHref(locale, item.href)}
                className="group flex h-full flex-col gap-1 rounded-2xl border border-border/70 bg-white p-4 shadow-e1 transition-colors duration-300 hover:border-brand/40"
              >
                <span className="text-sm font-semibold text-text-primary group-hover:text-brand-hover">
                  {item.title}
                </span>
                <span className="text-sm leading-6 text-text-secondary">{item.description}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-hover">
                  {item.title}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden="true" />
                </span>
              </Link>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
