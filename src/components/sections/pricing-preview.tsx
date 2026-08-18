import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function PricingPreview({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["pricingPreview"];
}) {
  return (
    <Section tone="mint">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          align="center"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.headline}
          description={dictionary.description}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {dictionary.plans.map((plan, index) => (
            <MotionReveal key={plan.name} delay={index * 0.08}>
              <div
                className={cn(
                  "flex h-full flex-col gap-6 rounded-2xl border bg-white p-8",
                  index === 1 ? "border-brand shadow-lg shadow-brand/10" : "border-border"
                )}
              >
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">{plan.name}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{plan.description}</p>
                </div>
                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-text-primary">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={index === 1 ? "primary" : "secondary"}>
                  <Link href={localizedHref(locale, "/contact")}>{dictionary.cta}</Link>
                </Button>
              </div>
            </MotionReveal>
          ))}
        </div>

        <p className="text-center text-sm text-text-muted">{dictionary.note}</p>
      </Container>
    </Section>
  );
}
