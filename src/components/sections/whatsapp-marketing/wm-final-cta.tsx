import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function WmFinalCta({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["whatsappMarketing"]["finalCta"];
}) {
  return (
    <Section spacing="lg">
      <MotionReveal>
        <div
          id="book-demo"
          className="flex flex-col items-center gap-6 rounded-3xl bg-brand-dark px-6 py-12 text-center text-white sm:px-10"
        >
          <h2
            id="wm-final-cta"
            className="max-w-2xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
          >
            {dictionary.title}
          </h2>
          <p className="max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            {dictionary.description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="inverted" className="rounded-lg px-7">
              <a href={localizedHref(locale, "/#early-access")}>{dictionary.primaryCta}</a>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-lg border border-white/50 bg-transparent px-7 hover:bg-white/10"
            >
              <a href={localizedHref(locale, "/#early-access")}>{dictionary.secondaryCta}</a>
            </Button>
          </div>
        </div>
      </MotionReveal>
    </Section>
  );
}
