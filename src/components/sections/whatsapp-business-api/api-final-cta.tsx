import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function ApiFinalCta({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["whatsappBusinessApi"]["finalCta"];
}) {
  return (
    <MotionReveal>
      <Section
        className="overflow-hidden rounded-3xl bg-brand-dark px-6 py-5 text-white sm:px-10 lg:px-12"
        aria-labelledby="final-api-cta"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8de7b5]">
              {dictionary.eyebrow}
            </p>
            <h2 id="final-api-cta" className="mt-2 max-w-2xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              {dictionary.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">{dictionary.description}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild size="lg" variant="inverted" className="rounded-lg px-7">
              {/* The pricing section this used to target no longer exists. */}
              <a href={localizedHref(locale, "/#early-access")}>{dictionary.primaryCta}</a>
            </Button>
            <Button asChild size="lg" className="rounded-lg border border-white/50 bg-transparent px-7 hover:bg-white/10">
              <a href="#how-it-works">{dictionary.secondaryCta}</a>
            </Button>
          </div>
        </div>
      </Section>
    </MotionReveal>
  );
}
