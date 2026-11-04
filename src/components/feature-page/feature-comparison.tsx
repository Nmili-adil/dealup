import { Check, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { SectionHeader } from "@/components/layout/section-header";
import type { FeatureComparisonCopy } from "./copy";

/**
 * "Manual WhatsApp vs Dealup" — a simple two-column truth table. Rows are
 * plain HTML with an accessible caption; no JS, no horizontal scroll on
 * mobile because the columns stay at a fixed label width.
 */
export function FeatureComparison({ copy }: { copy: FeatureComparisonCopy }) {
  return (
    <Section spacing="md" aria-labelledby="feature-comparison-title">
      <Container className="max-w-[880px]">
        <SectionHeader
          id="feature-comparison-title"
          eyebrow={copy.eyebrow}
          headline={copy.title}
          description={copy.description}
          align="center"
        />

        <MotionReveal>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-e1">
            <table className="w-full table-fixed border-collapse text-sm">
              <caption className="sr-only">{copy.title}</caption>
              <thead>
                <tr className="bg-sand/70 text-start">
                  <th scope="col" className="w-[38%] px-4 py-3.5 text-start" aria-hidden="true" />
                  <th scope="col" className="w-[31%] px-4 py-3.5 text-start font-medium text-text-secondary">
                    {copy.manualLabel}
                  </th>
                  <th scope="col" className="w-[31%] px-4 py-3.5 text-start font-semibold text-brand-hover">
                    {copy.dealupLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {copy.rows.map((row) => (
                  <tr key={row.label} className="border-t border-border/70">
                    <th
                      scope="row"
                      className="px-4 py-3 text-start font-medium text-text-primary"
                    >
                      {row.label}
                    </th>
                    <td className="px-4 py-3 align-top text-text-secondary">
                      <span className="inline-flex items-start gap-1.5">
                        <X
                          className="mt-0.5 size-3.5 shrink-0 text-accent-strong"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                        <span className="text-xs leading-5">{row.manual}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <span className="inline-flex items-start gap-1.5">
                        <Check
                          className="mt-0.5 size-3.5 shrink-0 text-brand-hover"
                          strokeWidth={3}
                          aria-hidden="true"
                        />
                        <span className="text-xs font-medium leading-5 text-text-primary">
                          {row.dealup}
                        </span>
                      </span>
                    </td>
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
