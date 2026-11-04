import Image from "next/image";
import { ArrowRight, Check, MessagesSquare } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/path";

export function HealthcareInbox({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["healthcareSolution"]["inbox"];
}) {
  return (
    <Section tone="mint" spacing="lg" decoration="grid" aria-labelledby="healthcare-inbox-title">
      <Container className="max-w-[1360px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.34fr_0.66fr] lg:gap-12">
          <MotionReveal y={20}>
            <Image
              src="/assets/healthcare/healthcare-inbox-shared.webp"
              alt={dictionary.imageAlt}
              width={1536}
              height={1024}
              sizes="(max-width: 1024px) 96vw, 68vw"
              className="h-auto w-full drop-shadow-[0_24px_36px_rgba(6,64,47,0.11)]"
            />
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">
              <MessagesSquare className="size-4" aria-hidden="true" />
              {dictionary.eyebrow}
            </p>
            <h2 id="healthcare-inbox-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance text-text-primary sm:text-4xl">
              {dictionary.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">{dictionary.description}</p>
            <ul className="mt-6 space-y-3">
              {dictionary.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-6 text-text-primary">
                  <Check className="mt-1 size-4 shrink-0 text-brand-hover" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <Button asChild variant="secondary" className="mt-7 border-brand/35 bg-white">
              <a href={localizedHref(locale, "/#early-access")}>
                {dictionary.cta}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </a>
            </Button>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
