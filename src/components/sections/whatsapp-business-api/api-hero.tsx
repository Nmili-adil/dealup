import { BadgeCheck, Headphones, Inbox, ShieldCheck, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type HeroCopy = Dictionary["whatsappBusinessApi"]["hero"];

/** Icons stay in code and pair with the translated highlights by index. */
const heroHighlightIcons: LucideIcon[] = [BadgeCheck, Inbox, ShieldCheck, Headphones];

/**
 * The page's opening. A plain `<section>` rather than the shared `Section`,
 * because the hero owns bespoke vertical padding and runs full-bleed under the
 * navbar — the shared spacing scale would fight both.
 */
export function ApiHero({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: HeroCopy;
}) {
  return (
    <section className="relative -mt-18 overflow-hidden bg-linear-to-b from-cream via-sand to-sand pb-14 pt-28 sm:pb-16 sm:pt-30">
      {/* Layered backdrop, matching the homepage hero: two blooms, a faint
          grid masked at the edges, and a fade into the white page below. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -end-32 -top-40 size-[520px] rounded-full bg-brand/12 blur-3xl" />
        <span className="absolute -bottom-48 -start-24 size-[420px] rounded-full bg-brand/8 blur-3xl" />
        <span className="absolute inset-0 bg-grid-faint mask-fade-edges" />
        <span className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-b from-transparent to-white" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
          <div className="relative z-10 flex flex-col items-start gap-6">
            <MotionReveal delay={0.02}>
              <span className="flex items-center gap-2 text-xs font-semibold uppercase leading-snug tracking-[0.14em] text-brand-hover">
                <BadgeCheck className="size-4 shrink-0" aria-hidden="true" />
                {dictionary.badge}
              </span>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <h1 className="max-w-[620px] text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-balance text-text-primary sm:text-5xl md:text-[50px] lg:text-[58px]">
                {dictionary.headlineLead}
                <span className="mt-1 block text-brand-hover">{dictionary.headlineAccent}</span>
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
                  {/* The pricing section this used to target no longer exists,
                      so the primary action goes to the live sign-up form. */}
                  <a href={localizedHref(locale, "/#early-access")}>{dictionary.primaryCta}</a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="border-brand/40 bg-white/70">
                  <a href="#how-it-works">{dictionary.secondaryCta}</a>
                </Button>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.26}>
              {/* Each item carries its own icon, so it stays legible when the
                  row wraps — a fixed grid broke the longest label onto two
                  lines and left the row on a ragged baseline. */}
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                {dictionary.highlights.map((label, index) => {
                  const Icon = heroHighlightIcons[index];
                  return (
                    <li key={label} className="flex items-center gap-1.5 text-sm text-text-on-sand">
                      <Icon className="size-4 shrink-0 text-brand-hover" strokeWidth={1.8} aria-hidden="true" />
                      {label}
                    </li>
                  );
                })}
              </ul>
            </MotionReveal>
          </div>

          <HeroVisual dictionary={dictionary} />
        </div>
      </Container>
    </section>
  );
}

function HeroVisual({ dictionary }: { dictionary: HeroCopy }) {
  return (
    <MotionReveal delay={0.16} duration={0.7} y={20} scale={0.97}>
      {/* The render carries its own warm backdrop, a shade deeper than the
          hero's sand. Framing it rather than floating it keeps that edge a
          deliberate one instead of a mismatch. */}
      <div className="relative mx-auto w-full max-w-[660px] lg:max-w-none lg:-me-8 xl:-me-16">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-brand/10 blur-3xl"
        />
        <div className="overflow-hidden rounded-2xl shadow-e4 ring-1 ring-brand-dark/10">
          <Mockup
            name="whatsappbusiness-api"
            alt={dictionary.imageAlt}
            ratio="16 / 9"
            sizes="(max-width: 1024px) 92vw, 50vw"
            priority
            className="block"
          />
        </div>
      </div>
    </MotionReveal>
  );
}
