import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { HeroVisual } from "./hero-visual";
import { Button } from "@/components/ui/button";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function HeroHome({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["home"]["hero"];
}) {
  return (
    <section className="relative -mt-18 overflow-hidden bg-sand pb-6 pt-28 sm:pt-30 md:min-h-[590px] md:pb-8 md:pt-28">
      <Image
        src="/assets/hero-section-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover object-center"
      />

      <Container className="grid items-center gap-8 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-4">
        <div className="flex flex-col items-start gap-6">
          <MotionReveal x={-24} y={0}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-hover">
              <BadgeCheck className="size-4" aria-hidden="true" />
              {dictionary.eyebrow}
            </span>
          </MotionReveal>

          <MotionReveal x={-24} y={0} delay={0.06}>
            <h1 className="max-w-[660px] text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-balance text-text-primary sm:text-5xl md:text-[50px] lg:text-[58px]">
              {dictionary.headline}
            </h1>
          </MotionReveal>

          <MotionReveal x={-24} y={0} delay={0.12}>
            <p className="max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {dictionary.subheadline}
            </p>
          </MotionReveal>

          <MotionReveal x={-24} y={0} delay={0.18}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-brand-dark hover:bg-brand-hover">
                <Link href={localizedHref(locale, "/#early-access")}>
                  {dictionary.primaryCta}
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="border-brand/40 bg-transparent">
                <Link href={localizedHref(locale, "/book-demo")}>
                  {dictionary.secondaryCta}
                </Link>
              </Button>
            </div>
          </MotionReveal>

          <MotionReveal x={-24} y={0} delay={0.24}>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {dictionary.reassurances.map((item, index) => (
                <li key={item} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span aria-hidden="true" className="h-4 w-px bg-brand-dark/15" />
                  ) : null}
                  <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                    <Check className="size-4 shrink-0 text-brand-hover" aria-hidden="true" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </MotionReveal>
        </div>

        <div className="md:-me-10 xl:-me-20">
          <HeroVisual alt={dictionary.imageAlt} />
        </div>
      </Container>
    </section>
  );
}
