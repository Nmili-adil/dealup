import { ArrowDownRight, Check, HeartPulse } from "lucide-react";
import { Container } from "@/components/layout/container";
import { HealthcareHeroDemo } from "./healthcare-hero-demo";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/path";

export function HealthcareHero({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["healthcareSolution"]["hero"];
}) {
  return (
    <section className="relative isolate -mt-18 overflow-hidden bg-[#faf7ee] pb-16 pt-28 sm:pb-20 sm:pt-30">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -end-36 -top-48 size-[680px] rounded-full bg-[#9fc6d7]/22 blur-3xl" />
        <span className="absolute -bottom-52 -start-28 size-[520px] rounded-full bg-brand/12 blur-3xl" />
        <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
        <span className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-white" />
      </div>

      <Container className="max-w-[1380px]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-6">
          <div className="relative z-10 flex flex-col items-start gap-6">
            <MotionReveal delay={0.02}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-hover ring-1 ring-brand-dark/10 backdrop-blur-sm">
                <HeartPulse className="size-3.5" aria-hidden="true" />
                {dictionary.badge}
              </span>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <h1 className="max-w-[680px] text-4xl font-semibold leading-[1.02] tracking-[-0.052em] text-balance text-text-primary sm:text-5xl lg:text-[64px]">
                {dictionary.headlineLead} <GradientText>{dictionary.headlineAccent}</GradientText>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <p className="max-w-xl text-base leading-relaxed text-text-on-sand sm:text-lg">{dictionary.description}</p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-dark shadow-brand hover:bg-brand-hover">
                  <a href="#healthcare-journey">
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
            <HealthcareHeroDemo copy={dictionary} />
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
