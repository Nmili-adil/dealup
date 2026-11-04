import { ArrowRight, HeartPulse } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/path";

export function HealthcareFinalCta({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["healthcareSolution"]["finalCta"];
}) {
  return (
    <Section spacing="md">
      <MotionReveal>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-dark px-6 py-10 text-white shadow-e3 sm:px-10 lg:px-14 lg:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <span className="absolute -end-24 -top-40 size-96 rounded-full bg-brand/25 blur-3xl" />
            <span className="absolute -bottom-44 start-1/4 size-80 rounded-full bg-[#e7b873]/15 blur-3xl" />
            <span className="absolute inset-0 bg-grid-inverted mask-fade-edges" />
          </div>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-light">
                <HeartPulse className="size-4" aria-hidden="true" />
                {dictionary.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-4xl">{dictionary.title}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">{dictionary.description}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="inverted" className="rounded-xl px-7">
                <a href={localizedHref(locale, "/book-demo")}>
                  {dictionary.primaryCta}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" className="rounded-xl border border-white/35 bg-transparent px-7 hover:bg-white/10">
                <a href={localizedHref(locale, "/#early-access")}>{dictionary.secondaryCta}</a>
              </Button>
            </div>
          </div>
        </div>
      </MotionReveal>
    </Section>
  );
}
