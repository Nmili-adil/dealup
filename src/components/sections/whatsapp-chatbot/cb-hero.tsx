import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { GradientText } from "@/components/ui/titleCustomize";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Copy = Dictionary["whatsappChatbot"];

/**
 * Opening block, with the Flow Builder announcement riding above it.
 *
 * A plain `<section>` rather than the shared `Section`: it runs full-bleed
 * under the fixed navbar and owns bespoke padding.
 */
export function CbHero({
  locale,
  dictionary,
  announcement,
}: {
  locale: Locale;
  dictionary: Copy["hero"];
  announcement: Copy["announcement"];
}) {
  return (
    <section className="relative -mt-18 overflow-hidden bg-linear-to-b from-cream via-sand to-sand pb-14 pt-24 sm:pb-16 sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -end-32 -top-40 size-[520px] rounded-full bg-brand/12 blur-3xl" />
        <span className="absolute -bottom-48 -start-24 size-[420px] rounded-full bg-brand/8 blur-3xl" />
        <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
        <span className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-white" />
      </div>

      <Container className="relative">
        <MotionReveal>
          <a
            href="#cb-builder-title"
            className="flex w-fit items-center gap-2 rounded-full bg-brand-dark px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover"
          >
            <span className="rounded-full bg-[#8ef0b5] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-dark">
              New
            </span>
            <span className="max-w-[62ch] truncate sm:whitespace-normal">{announcement.text}</span>
            <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#8ef0b5]">
              {announcement.cta}
              <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
            </span>
          </a>
        </MotionReveal>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8">
          <div className="relative z-10 flex flex-col items-start gap-6">
            <MotionReveal delay={0.06}>
              <h1 className="max-w-[620px] text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-balance text-text-primary sm:text-5xl lg:text-[56px]">
                {dictionary.headlineLead} <GradientText>{dictionary.headlineAccent}</GradientText>{" "}
                {dictionary.headlineTail}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.12}>
              <p className="max-w-xl text-base leading-relaxed text-text-on-sand sm:text-lg">
                {dictionary.description}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.18}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-brand-hover ring-1 ring-brand-dark/10">
                <ShieldCheck className="size-3.5 shrink-0" aria-hidden="true" />
                {dictionary.badge}
              </span>
            </MotionReveal>

            <MotionReveal delay={0.24}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-brand-dark shadow-brand hover:bg-brand-hover">
                  <a href={localizedHref(locale, "/#early-access")}>{dictionary.primaryCta}</a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="border-brand/40 bg-white/70">
                  <a href="#cb-book-demo">{dictionary.secondaryCta}</a>
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.3}>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {dictionary.reassurances.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-sm text-text-on-sand">
                    <Check className="size-4 shrink-0 text-brand-hover" strokeWidth={2.2} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </MotionReveal>

            {/* The three interface languages, as the design shows them. */}
            <MotionReveal delay={0.36}>
              <ul className="flex flex-wrap items-center gap-2 border-t border-brand-dark/10 pt-4">
                {dictionary.languages.map((language) => (
                  <li
                    key={language}
                    className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-text-on-sand ring-1 ring-brand-dark/8"
                  >
                    {language}
                  </li>
                ))}
              </ul>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.16} duration={0.7} y={20} scale={0.97}>
            <div className="relative mx-auto w-full max-w-[720px] lg:max-w-none lg:-me-4 xl:-me-10">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-brand/10 blur-3xl"
              />
              {/* The render's corners are transparent, so it takes light and a
                  contact shadow — a card would only box it in and let the glow
                  leak through the empty corners as a tinted panel. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[12%] bottom-[4%] -z-10 h-10 rounded-[50%] bg-brand-dark/15 blur-2xl"
              />
              <Mockup
                name="cb-hero"
                alt={dictionary.imageAlt}
                ratio="1349 / 1036"
                sizes="(max-width: 1024px) 94vw, 56vw"
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
