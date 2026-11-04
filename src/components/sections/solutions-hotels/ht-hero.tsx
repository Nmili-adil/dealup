import { ArrowDownRight, Check, Hotel } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/path";

type HeroCopy = Dictionary["hotelsSolution"]["hero"];

export function HtHero({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: HeroCopy;
}) {
  return (
    <section className="relative isolate -mt-18 overflow-hidden bg-gradient-to-b from-cream via-sand to-white pb-16 pt-28 sm:pb-20 sm:pt-30">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -end-36 -top-48 size-[640px] rounded-full bg-brand/14 blur-3xl" />
        <span className="absolute -bottom-60 -start-32 size-[520px] rounded-full bg-ai/12 blur-3xl" />
        <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
      </div>

      <Container className="max-w-[1360px]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
          <div className="relative z-10 flex flex-col items-start gap-6">
            <MotionReveal delay={0.02}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-hover ring-1 ring-brand-dark/10 backdrop-blur-sm">
                <Hotel className="size-3.5" aria-hidden="true" />
                {dictionary.badge}
              </span>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <h1 className="max-w-[640px] text-4xl font-semibold leading-[1.02] tracking-[-0.052em] text-balance text-text-primary sm:text-5xl lg:text-[60px]">
                {dictionary.headlineLead} <GradientText>{dictionary.headlineAccent}</GradientText>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <p className="max-w-xl text-base leading-relaxed text-text-on-sand sm:text-lg">{dictionary.description}</p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-dark shadow-brand hover:bg-brand-hover">
                  <a href="#ht-inbox">
                    {dictionary.primaryCta}
                    <ArrowDownRight className="size-4 rtl:-rotate-90" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="border-brand-dark/15 bg-white/75">
                  <a href={localizedHref(locale, "/book-demo")}>{dictionary.secondaryCta}</a>
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.26}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {dictionary.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-sm text-text-on-sand">
                    <Check className="size-4 shrink-0 text-brand-hover" strokeWidth={2.3} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.14} duration={0.75} y={22} scale={0.97}>
            <div className="relative mx-auto w-full max-w-[860px] lg:-me-16 xl:-me-24">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[8%] bottom-[4%] -z-10 h-24 rounded-[50%] bg-brand-dark/20 blur-3xl"
              />
              <Mockup
                name="hotels-hero-command-center"
                alt={dictionary.windowTitle}
                sizes="(min-width: 1280px) 760px, (min-width: 1024px) 52vw, 94vw"
                priority
                className="relative z-10 mx-auto max-h-[660px] object-contain"
              />
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
