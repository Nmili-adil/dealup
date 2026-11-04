"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { localizedHref } from "@/lib/i18n/path";
import { Currency } from "@/lib/currency/currency-provider";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Billing = "monthly" | "annual";

const FEATURED_INDEX = 1;

export function PricingPlans({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary["pricing"];
}) {
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <Section tone="mint" spacing="lg" decoration="glow" id="plans" aria-label={dictionary.ariaLabel}>
      <Container className="flex flex-col gap-10">
        {/* Monthly / annual toggle */}
        <MotionReveal>
          <div
            role="group"
            aria-label={dictionary.toggleLabel}
            className="mx-auto inline-flex items-center rounded-full border border-border bg-white p-1 shadow-e1"
          >
            <button
              type="button"
              aria-pressed={billing === "monthly"}
              onClick={() => setBilling("monthly")}
              className={cn(
                "cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                billing === "monthly"
                  ? "bg-brand text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              {dictionary.toggle.monthly}
            </button>
            <button
              type="button"
              aria-pressed={billing === "annual"}
              onClick={() => setBilling("annual")}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                billing === "annual"
                  ? "bg-brand text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              {dictionary.toggle.annual}
              <span
                aria-hidden="true"
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  billing === "annual" ? "bg-white/20 text-white" : "bg-brand/15 text-brand-hover"
                )}
              >
                {dictionary.toggle.save}
              </span>
            </button>
          </div>
        </MotionReveal>

        {/* Plan cards */}
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {dictionary.plans.map((plan, index) => {
            const isFeatured = index === FEATURED_INDEX;
            const price = billing === "annual" ? plan.annual : plan.monthly;

            return (
              <MotionReveal key={plan.name} delay={index * 0.08} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col gap-6 rounded-3xl border bg-white p-7 transition-[transform,box-shadow,border-color] duration-300 sm:p-8",
                    isFeatured
                      ? "border-brand/40 shadow-e3 ring-1 ring-brand/20 lg:-translate-y-4 lg:hover:-translate-y-5 hover:shadow-e4"
                      : "border-border/70 shadow-e1 hover:border-brand/30 hover:shadow-e2"
                  )}
                >
                  {isFeatured ? (
                    <span className="absolute -top-3 start-1/2 -translate-x-1/2 rounded-full bg-brand-dark px-3 py-1 text-xs font-semibold text-white shadow-e2 rtl:translate-x-1/2">
                      {dictionary.popularLabel}
                    </span>
                  ) : null}

                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">{plan.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 border-b border-border/70 pb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold text-text-secondary">
                        <Currency text={dictionary.currency} />
                      </span>
                      <span className="text-4xl font-bold tracking-tight text-text-primary tabular-nums sm:text-5xl">
                        {price}
                      </span>
                      <span className="text-sm font-medium text-text-secondary">
                        {dictionary.period}
                      </span>
                      {billing === "annual" ? (
                        <span className="text-sm font-medium text-text-muted line-through">
                          <Currency text={`${dictionary.currency} ${plan.monthly}`} />
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-text-muted">
                      {billing === "annual" ? dictionary.annualNote : dictionary.monthlyNote}
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

                  <Button
                    asChild
                    size="lg"
                    variant={isFeatured ? "primary" : "secondary"}
                    className="w-full rounded-xl"
                  >
                    <Link href={localizedHref(locale, "/#early-access")}>{plan.cta}</Link>
                  </Button>

                  <p className="text-center text-xs text-text-muted">{plan.noCardNote}</p>
                </div>
              </MotionReveal>
            );
          })}
        </div>

        <MotionReveal delay={0.1}>
          <p className="text-center text-sm text-text-secondary">{dictionary.note}</p>
          <p className="mt-2 text-center">
            <Link
              href={localizedHref(locale, "/contact")}
              className="inline-block text-sm font-medium text-brand-hover underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {dictionary.contactLink}
            </Link>
          </p>
        </MotionReveal>
      </Container>
    </Section>
  );
}
