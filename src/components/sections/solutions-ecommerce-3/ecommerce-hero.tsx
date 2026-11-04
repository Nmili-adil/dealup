import Image from "next/image";
import { ArrowRight, BadgeCheck, Check, ShoppingBag } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/path";

type HeroCopy = Dictionary["ecommerceSolution"]["hero"];

export function EcommerceHero({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: HeroCopy;
}) {
  return (
    <section className="relative isolate -mt-18 overflow-hidden bg-[#faf8f1] pb-16 pt-28 sm:pb-20 sm:pt-30">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -end-40 -top-52 size-[680px] rounded-full bg-brand/12 blur-3xl" />
        <span className="absolute -bottom-56 -start-36 size-[520px] rounded-full bg-[#e7b873]/18 blur-3xl" />
        <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
        <span className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-white" />
      </div>

      <Container className="max-w-[1360px]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-8">
          <div className="relative z-10 flex flex-col items-start gap-6">
            <MotionReveal delay={0.02}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-hover ring-1 ring-brand-dark/10 backdrop-blur-sm">
                <ShoppingBag className="size-3.5" aria-hidden="true" />
                {dictionary.badge}
              </span>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <h1 className="max-w-[650px] text-4xl font-semibold leading-[1.02] tracking-[-0.052em] text-balance text-text-primary sm:text-5xl lg:text-[62px]">
                {dictionary.headlineLead} <GradientText>{dictionary.headlineAccent}</GradientText>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.14}>
              <p className="max-w-xl text-base leading-relaxed text-text-on-sand sm:text-lg">{dictionary.description}</p>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-dark shadow-brand hover:bg-brand-hover">
                  <a href="#ecommerce-catalog">
                    {dictionary.primaryCta}
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="border-brand-dark/15 bg-white/75">
                  <a href={localizedHref(locale, "/#early-access")}>{dictionary.secondaryCta}</a>
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
            <div className="relative mx-auto w-full max-w-[820px] lg:-me-16 xl:-me-24">
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-[10%] bottom-[4%] -z-10 h-20 rounded-[50%] bg-brand-dark/20 blur-3xl" />
              <Image
                src="/assets/ecommerce/ecommerce-hero-mockup.webp"
                alt={dictionary.imageAlt}
                width={1536}
                height={1024}
                sizes="(max-width: 1024px) 96vw, 60vw"
                preload
                className="h-auto w-full drop-shadow-[0_32px_44px_rgba(6,64,47,0.16)]"
              />
              <div className="absolute bottom-[5%] end-[2%] flex items-center gap-2 rounded-full border border-brand/20 bg-white/90 px-3 py-2 text-xs font-semibold text-brand-dark shadow-e2 backdrop-blur-sm">
                <BadgeCheck className="size-4 text-brand" aria-hidden="true" />
                {dictionary.visualNote}
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
