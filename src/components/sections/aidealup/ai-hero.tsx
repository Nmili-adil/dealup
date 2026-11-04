import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/path";

type HeroCopy = Dictionary["aiDealUp"]["hero"];

export function AiDealUpHero({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: HeroCopy;
}) {
  return (
    <section className="relative isolate -mt-18 overflow-hidden bg-[#f8f7f2] pb-16 pt-28 sm:pb-20 sm:pt-30 lg:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -end-40 -top-48 size-[680px] rounded-full bg-ai/13 blur-3xl" />
        <span className="absolute -bottom-56 -start-32 size-[560px] rounded-full bg-brand/12 blur-3xl" />
        <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
        <span className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-white" />
      </div>

      <Container className="relative max-w-[1360px]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-5">
          <div className="relative z-10 flex flex-col items-start gap-6">
            <MotionReveal delay={0.02}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-ai-dark ring-1 ring-ai/20 backdrop-blur-sm">
                <Sparkles className="size-3.5 text-ai" aria-hidden="true" />
                {dictionary.badge}
              </span>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <h1 className="max-w-[680px] text-4xl font-semibold leading-[1.02] tracking-[-0.052em] text-balance text-text-primary sm:text-5xl lg:text-[62px]">
                {dictionary.headlineLead} <GradientText variant="ai">{dictionary.headlineAccent}</GradientText>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <p className="max-w-xl text-base leading-relaxed text-text-on-sand sm:text-lg">
                {dictionary.description}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-dark shadow-brand hover:bg-brand-hover">
                  <a href={localizedHref(locale, "/#early-access")}>
                    {dictionary.primaryCta}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="border-brand-dark/15 bg-white/75">
                  <a href="#aidealup-workflow">{dictionary.secondaryCta}</a>
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.26}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                {dictionary.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-sm text-text-on-sand">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand/12 text-brand-hover">
                      <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.14} duration={0.75} y={22} scale={0.97}>
            <div className="relative mx-auto w-full max-w-[820px] lg:-me-16 xl:-me-24">
              <span className="pointer-events-none absolute inset-x-[12%] bottom-[5%] -z-10 h-24 rounded-[50%] bg-brand-dark/20 blur-3xl" />
              <Image
                src="/assets/aidealup/aidealup-hero-dashboard.webp"
                alt={dictionary.imageAlt}
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 96vw, 58vw"
                preload
                className="h-auto w-full drop-shadow-[0_32px_48px_rgba(6,64,47,0.18)]"
              />

              <div className="absolute bottom-[5%] start-[3%] hidden max-w-[230px] rounded-2xl border border-white/70 bg-white/90 p-4 shadow-e3 backdrop-blur-md sm:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ai">{dictionary.floatLabel}</p>
                <p className="mt-1.5 text-sm font-semibold text-text-primary">{dictionary.floatTitle}</p>
                <div className="mt-3 flex items-end gap-1">
                  {[42, 58, 74, 64, 88, 96].map((height, index) => (
                    <span
                      key={height}
                      className={index === 5 ? "w-4 rounded-sm bg-ai" : "w-4 rounded-sm bg-brand/30"}
                      style={{ height }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
