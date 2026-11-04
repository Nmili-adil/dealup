import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import { Breadcrumbs } from "./breadcrumbs";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { FeatureHeroCopy } from "./copy";

/**
 * Shared feature/solution hero. Warm sand, glows and a faint grid behind the
 * text column; the caller supplies the product visual on the right. Renders a
 * Home › Features › <page> breadcrumb and the two standard CTAs.
 */
export function FeatureHero({
  locale,
  copy,
  homeLabel,
  parentLabel,
  parentHref,
  primaryCta,
  secondaryCta,
  visual,
}: {
  locale: Locale;
  copy: FeatureHeroCopy;
  homeLabel: string;
  parentLabel: string;
  /** Omit when the parent section has no index page — renders as plain text. */
  parentHref?: string;
  primaryCta: string;
  secondaryCta: string;
  visual?: React.ReactNode;
}) {
  return (
    <section className="relative -mt-18 overflow-hidden bg-linear-to-b from-cream via-sand to-sand pb-14 pt-20 sm:pb-16 sm:pt-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -end-32 -top-40 size-[520px] rounded-full bg-brand/12 blur-3xl" />
        <span className="absolute -bottom-48 -start-24 size-[420px] rounded-full bg-brand/8 blur-3xl" />
        <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
        <span className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-white" />
      </div>

      <Container className="relative">
        <Breadcrumbs
          locale={locale}
          ariaLabel={copy.breadcrumb}
          crumbs={[
            { label: homeLabel, href: "/" },
            { label: parentLabel, href: parentHref },
            { label: copy.breadcrumb, current: true },
          ]}
        />

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
          <div className="relative z-10 flex flex-col items-start gap-5">
            <MotionReveal delay={0.02}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-hover ring-1 ring-brand-dark/10">
                <Check className="size-3.5 shrink-0" aria-hidden="true" />
                {copy.badge}
              </span>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <h1 className="max-w-[620px] text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-balance text-text-primary sm:text-5xl lg:text-[56px]">
                {copy.headlineLead} <GradientText>{copy.headlineAccent}</GradientText>
                {copy.headlineTail ? <> {copy.headlineTail}</> : null}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <p className="max-w-xl text-base leading-relaxed text-text-on-sand sm:text-lg">
                {copy.description}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-dark shadow-brand hover:bg-brand-hover">
                  <a href={localizedHref(locale, "/#early-access")}>{primaryCta}</a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="border-brand/40 bg-white/70">
                  <a href={localizedHref(locale, "/book-demo")}>{secondaryCta}</a>
                </Button>
              </div>
            </MotionReveal>
          </div>

          {visual ? (
            <MotionReveal delay={0.16} duration={0.7} y={20} scale={0.97}>
              {visual}
            </MotionReveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
