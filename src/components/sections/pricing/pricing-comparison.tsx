import { Check, Minus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const FEATURED_INDEX = 1;

type CellValue = boolean | string | number;

function Cell({ value, label }: { value: CellValue; label: string }) {
  if (value === true) {
    return (
      <td className="px-5 py-3.5 text-center">
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className="mx-auto grid size-6 place-items-center rounded-full bg-brand/15"
        >
          <Check className="size-3.5 text-brand-hover" />
        </span>
      </td>
    );
  }

  if (value === false) {
    return (
      <td className="px-5 py-3.5 text-center">
        <span className="sr-only">{label}</span>
        <span aria-hidden="true" className="mx-auto grid size-6 place-items-center">
          <Minus className="size-3.5 text-text-muted" />
        </span>
      </td>
    );
  }

  return <td className="px-5 py-3.5 text-center font-medium text-text-secondary">{value}</td>;
}

export function PricingComparison({
  dictionary,
}: {
  dictionary: Dictionary["pricing"];
}) {
  const { comparison, plans, popularLabel } = dictionary;

  return (
    <Section id="compare" tone="white" spacing="lg" aria-labelledby="pricing-compare-title">
      <Container className="flex flex-col gap-12">
        <SectionHeader
          id="pricing-compare-title"
          align="center"
          eyebrow={comparison.eyebrow}
          headline={comparison.headline}
          description={comparison.description}
        />

        <MotionReveal>
          <div className="overflow-x-auto rounded-2xl border border-border/70 bg-white shadow-e1">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border/70">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 bg-white px-5 py-4 text-start text-xs font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {comparison.featureColumn}
                  </th>
                  {plans.map((plan, index) => (
                    <th
                      key={plan.name}
                      scope="col"
                      className={cn(
                        "px-5 py-4 text-center font-semibold",
                        index === FEATURED_INDEX ? "text-brand-hover" : "text-text-primary"
                      )}
                    >
                      {plan.name}
                      {index === FEATURED_INDEX ? (
                        <span className="block text-[11px] font-medium text-text-muted">
                          {popularLabel}
                        </span>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-border/60 last:border-0 hover:bg-surface-mint/50"
                  >
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-white px-5 py-3.5 text-start font-medium text-text-primary"
                    >
                      {row.feature}
                    </th>
                    <Cell value={row.start} label={comparison.included} />
                    <Cell value={row.pro} label={comparison.included} />
                    <Cell value={row.business} label={comparison.included} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
