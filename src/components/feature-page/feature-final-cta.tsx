import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { FeatureFinalCtaCopy } from "./copy";

/**
 * Shared end-of-page conversion banner on the deep forest band.
 * CTAs point at the lead form and the booking page.
 */
export function FeatureFinalCta({
  locale,
  copy,
  primaryCta,
  secondaryCta,
}: {
  locale: Locale;
  copy: FeatureFinalCtaCopy;
  primaryCta: string;
  secondaryCta: string;
}) {
  return (
    <Section spacing="lg">
      <MotionReveal>
        <div className="flex flex-col items-center gap-6  bg-brand-dark bg-[url('/assets/features/CTA-background-1916.webp')] bg-cover bg-center px-6 py-12 text-center text-white sm:px-10">
          <h2
            id="feature-final-cta"
            className="max-w-2xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
          >
            {copy.title}
          </h2>
          <p className="max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            {copy.description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="inverted" className="rounded-lg px-7">
              <a href={localizedHref(locale, "/contact")}>
                {copy.primaryCta ?? primaryCta}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-lg border border-white/50 bg-transparent px-7 hover:bg-white/10"
            >
              <a href={localizedHref(locale, "/book-demo")}>
                {copy.secondaryCta ?? secondaryCta}
              </a>
            </Button>
          </div>
        </div>
      </MotionReveal>
    </Section>
  );
}
