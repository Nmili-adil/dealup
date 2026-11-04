import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { localizedHref } from "@/lib/i18n/path";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const FEATURED_INDEX = 1;

export function PricingTiers({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["home"]["pricing"];
}) {
  return (
    <Section tone="white" spacing="sm">
      <Container className="flex flex-col gap-7">
        <MotionReveal>
          <h2 className="text-center text-3xl font-semibold tracking-tight text-balance text-text-primary sm:text-4xl">
            {dictionary.headline}
          </h2>
        </MotionReveal>

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {dictionary.plans.map((plan, index) => {
            const isFeatured = index === FEATURED_INDEX;
            return (
              <MotionReveal key={plan.name} delay={index * 0.07} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col gap-5 rounded-2xl border bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 sm:p-7",
                    isFeatured
                      ? "border-brand/45 shadow-e2 hover:shadow-e3"
                      : "border-border/70 hover:border-brand/25 hover:shadow-e2"
                  )}
                >
                  {isFeatured ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold text-accent-strong">
                      {dictionary.popularLabel}
                    </span>
                  ) : null}

                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold text-text-primary">{plan.name}</h3>
                    <p className="text-sm text-text-secondary">{plan.description}</p>
                  </div>

                  <ul className="flex flex-1 flex-col gap-3 border-b border-border/70 pb-5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-text-secondary"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-brand-hover"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={localizedHref(locale, "/pricing")}
                    className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-text-primary transition-colors hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover"
                  >
                    {/* Names the plan for screen readers, since three links
                        otherwise share the same visible label. */}
                    <span>
                      {dictionary.cta}
                      <span className="sr-only"> — {plan.name}</span>
                    </span>
                    <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </div>
              </MotionReveal>
            );
          })}
        </div>

        <p className="text-center text-sm text-text-secondary">{dictionary.note}</p>
      </Container>
    </Section>
  );
}
