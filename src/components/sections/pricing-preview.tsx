import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const FEATURED_INDEX = 1;

export function PricingPreview({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["pricingPreview"];
}) {
  return (
    <Section tone="mint" spacing="lg" decoration="glow">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          align="center"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.headline}
          description={dictionary.description}
        />

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {dictionary.plans.map((plan, index) => {
            const isFeatured = index === FEATURED_INDEX;
            return (
              <MotionReveal key={plan.name} delay={index * 0.08} className="h-full">
                <Card
                  tone={isFeatured ? "featured" : "surface"}
                  interactive
                  padding="lg"
                  className={
                    isFeatured
                      ? "h-full gap-6 ring-1 ring-brand/20 lg:-translate-y-3 lg:hover:-translate-y-4"
                      : "h-full gap-6"
                  }
                >
                  {isFeatured ? (
                    <span className="absolute -top-3 start-1/2 -translate-x-1/2 rounded-full bg-brand-dark px-3 py-1 text-xs font-semibold text-white shadow-e2 rtl:translate-x-1/2">
                      {dictionary.popularLabel}
                    </span>
                  ) : null}

                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">{plan.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="flex flex-1 flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-text-primary"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-brand/15"
                        >
                          <Check className="size-3 text-brand-hover" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button asChild variant={isFeatured ? "primary" : "secondary"}>
                    <Link href={localizedHref(locale, "/contact")}>{dictionary.cta}</Link>
                  </Button>
                </Card>
              </MotionReveal>
            );
          })}
        </div>

        <p className="text-center text-sm text-text-secondary">{dictionary.note}</p>
      </Container>
    </Section>
  );
}
