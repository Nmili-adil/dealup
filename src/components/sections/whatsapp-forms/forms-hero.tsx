import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { GradientText } from "@/components/ui/titleCustomize";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Copy = Dictionary["whatsappForms"];

/**
 * Opening block, with the announcement riding above it.
 *
 * A plain `<section>` rather than the shared `Section`: it runs full-bleed
 * under the fixed navbar and owns bespoke padding.
 */
export function FormsHero({
  locale,
  dictionary,
  announcement,
}: {
  locale: Locale;
  dictionary: Copy["hero"];
  announcement: Copy["announcement"];
}) {
  return (
    <section className="relative -mt-18 overflow-hidden bg-linear-to-b from-cream via-sand to-sand pb-16 pt-24 sm:pb-20 sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -end-32 -top-40 size-[520px] rounded-full bg-brand/12 blur-3xl" />
        <span className="absolute -bottom-48 -start-24 size-[420px] rounded-full bg-brand/8 blur-3xl" />
        <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
        <span className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-white" />
      </div>

      <Container className="relative">
        <MotionReveal>
          <a
            href="#forms-use-cases-title"
            className="flex w-fit items-center gap-2 rounded-full bg-brand-dark px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover"
          >
            <span className="rounded-full bg-[#8ef0b5] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-dark">
              New
            </span>
            <span className="max-w-[58ch] truncate sm:whitespace-normal">{announcement.text}</span>
            <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#8ef0b5]">
              {announcement.cta}
              <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
            </span>
          </a>
        </MotionReveal>

        <div className="mt-7 grid items-center gap-10 lg:mt-9 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-6">
          <div className="relative z-10 flex flex-col items-start gap-5 sm:gap-6">
            <MotionReveal delay={0.04}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-hover ring-1 ring-brand-dark/10">
                {dictionary.badge}
              </span>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h1 className="max-w-[620px] text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-balance text-text-primary sm:text-5xl lg:text-[58px]">
                {dictionary.headlineLead} <GradientText>{dictionary.headlineAccent}</GradientText>{" "}
                {dictionary.headlineTail}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.16}>
              <p className="max-w-xl text-base leading-relaxed text-text-on-sand sm:text-lg">
                {dictionary.description}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.22}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-dark shadow-brand hover:bg-brand-hover">
                  <a href="#forms-use-cases-title">{dictionary.primaryCta}</a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="border-brand/40 bg-white/70">
                  <a href={localizedHref(locale, "/#early-access")}>{dictionary.secondaryCta}</a>
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.28}>
              <p className="flex items-center gap-1.5 text-xs text-text-on-sand">
                <ShieldCheck className="size-3.5 shrink-0 text-brand-hover" aria-hidden="true" />
                {dictionary.note}
              </p>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.16} duration={0.7} y={20} scale={0.97}>
            {/* The render's corners are transparent, so it needs light and a
                surface to sit on — not a card, which only boxes it in and lets
                the glow leak through the empty corners as a tinted panel. */}
            <div className="relative mx-auto w-full max-w-[720px] lg:max-w-none lg:-me-4 xl:-me-10">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/12 blur-3xl"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[12%] bottom-[6%] -z-10 h-10 rounded-[50%] bg-brand-dark/15 blur-2xl"
              />
              <Mockup
                name="forms-hero"
                alt={dictionary.imageAlt}
                ratio="1436 / 1067"
                sizes="(max-width: 1024px) 94vw, 58vw"
                priority
                className="block w-full drop-shadow-[0_24px_36px_rgba(6,64,47,0.16)]"
              />
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
