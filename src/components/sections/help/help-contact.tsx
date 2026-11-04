import { CalendarCheck, Mail, MessageCircle, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated channels by index. */
const ICONS: LucideIcon[] = [MessageCircle, Mail, CalendarCheck];

export function HelpContact({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["help"]["contact"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="help-contact-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="help-contact-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          <GradientText>{dictionary.title}</GradientText>
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">{dictionary.description}</p>
      </div>

      <ul className="mt-9 grid gap-4 sm:grid-cols-3">
        {dictionary.channels.map((channel, index) => {
          const Icon = ICONS[index];
          return (
            <li key={channel.title}>
              <MotionReveal delay={index * 0.07}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-border/80 bg-white p-5 shadow-e1">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-mint text-brand-hover"
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary">
                      <GradientText>{channel.title}</GradientText>
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-text-secondary">
                      {channel.description}
                    </p>
                  </div>
                </div>
              </MotionReveal>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild size="lg" className="bg-brand-dark shadow-brand hover:bg-brand-hover">
          <a href={localizedHref(locale, "/#early-access")}>{dictionary.primaryCta}</a>
        </Button>
        <Button asChild size="lg" variant="secondary" className="border-brand/40">
          <a href={localizedHref(locale, "/#early-access")}>{dictionary.secondaryCta}</a>
        </Button>
      </div>
    </Section>
  );
}
