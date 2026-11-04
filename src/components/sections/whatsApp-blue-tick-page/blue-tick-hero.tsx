import {
  BadgeCheck,
  Check,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import { localizedHref } from "@/lib/i18n/path";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";

type HeroCopy = Dictionary["whatsappBlueTick"]["hero"];

export function BlueTickHero({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: HeroCopy;
}) {
  return (
    <section className="relative isolate -mt-18 overflow-hidden bg-linear-to-b from-cream via-sand to-sand pb-16 pt-28 sm:pb-20 sm:pt-30">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -end-24 -top-40 size-[560px] rounded-full bg-[#2f80ed]/12 blur-3xl" />
        <span className="absolute -bottom-52 -start-20 size-[440px] rounded-full bg-brand/10 blur-3xl" />
        <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
        <span className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-white" />
      </div>

      <Container className="relative max-w-[1280px]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8">
          <div className="relative z-10 flex flex-col items-start gap-6">
            <MotionReveal delay={0.02}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3.5 py-1.5 text-xs font-semibold text-brand-hover ring-1 ring-brand-dark/10 backdrop-blur-sm">
                <BadgeCheck className="size-4 text-[#2f80ed]" aria-hidden="true" />
                {dictionary.badge}
              </span>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <h1 className="max-w-[650px] text-4xl font-semibold leading-[1.03] tracking-[-0.048em] text-balance text-text-primary sm:text-5xl lg:text-[60px]">
                {dictionary.headlineLead} <GradientText>{dictionary.headlineAccent}</GradientText>
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
                  <a href={localizedHref(locale, "/#early-access")}>{dictionary.primaryCta}</a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="border-brand/35 bg-white/75">
                  <a href="#blue-tick-requirements">{dictionary.secondaryCta}</a>
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.26}>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                {dictionary.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-sm text-text-on-sand">
                    <Check className="size-4 shrink-0 text-brand-hover" strokeWidth={2.3} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </MotionReveal>
          </div>

          <BlueTickProfileVisual dictionary={dictionary} />
        </div>
      </Container>
    </section>
  );
}

function BlueTickProfileVisual({ dictionary }: { dictionary: HeroCopy }) {
  return (
    <MotionReveal delay={0.16} duration={0.7} y={20} scale={0.97}>
      <div className="relative mx-auto w-full max-w-[720px] lg:-me-8 xl:-me-14">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[8%] bottom-[5%] -z-10 h-16 rounded-[50%] bg-brand-dark/20 blur-3xl"
        />
        <Image
          src="/assets/whatsapp-blue-tick/blue-tick-hero-cutout.png"
          alt={dictionary.imageAlt}
          width={1536}
          height={1024}
          sizes="(max-width: 1024px) 94vw, 55vw"
          preload
          className="h-auto w-full drop-shadow-[0_28px_42px_rgba(6,64,47,0.18)]"
        />
      </div>
    </MotionReveal>
  );
}
