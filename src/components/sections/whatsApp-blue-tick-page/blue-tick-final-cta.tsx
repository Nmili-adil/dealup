import { ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { localizedHref } from "@/lib/i18n/path";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";

export function BlueTickFinalCta({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["whatsappBlueTick"]["finalCta"];
}) {
  return (
    <Section spacing="md">
      <MotionReveal>
        <div className="relative isolate overflow-hidden rounded-3xl bg-brand-dark px-6 py-9 text-white shadow-e3 sm:px-10 lg:px-12 lg:py-11">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <span className="absolute -end-20 -top-32 size-80 rounded-full bg-[#2f80ed]/25 blur-3xl" />
            <span className="absolute -bottom-40 start-1/4 size-72 rounded-full bg-brand/20 blur-3xl" />
            <span className="absolute inset-0 bg-grid-inverted mask-fade-edges" />
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#9bd1ff]">
                <BadgeCheck className="size-4" aria-hidden="true" />
                {dictionary.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-4xl">
                {dictionary.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">{dictionary.description}</p>
              <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-white/55">
                <ShieldCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                {dictionary.note}
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="inverted" className="rounded-lg px-7">
                <a href={localizedHref(locale, "/#early-access")}>
                  {dictionary.primaryCta}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" className="rounded-lg border border-white/40 bg-transparent px-7 hover:bg-white/10">
                <a href="#blue-tick-requirements">{dictionary.secondaryCta}</a>
              </Button>
            </div>
          </div>
        </div>
      </MotionReveal>
    </Section>
  );
}
