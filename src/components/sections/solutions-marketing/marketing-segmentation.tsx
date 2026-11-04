import { Check, Search, Users } from "lucide-react";
import { Mockup } from "@/components/product/mockup";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function MarketingSegmentation({
  dictionary,
}: {
  dictionary: Dictionary["marketingSolution"]["segmentation"];
}) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="marketing-segmentation-title">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <SectionHeader
          id="marketing-segmentation-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.1}>
          <ul className="mt-6 space-y-3">
            {dictionary.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-6 text-text-primary">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-hover" strokeWidth={2.3} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </MotionReveal>

        <MotionReveal delay={0.12} className="lg:col-start-2 lg:row-start-1">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e3">
            <div className="flex items-center gap-2 border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-4 py-3">
              <Search className="size-4 text-text-secondary" aria-hidden="true" />
              <span className="truncate text-sm text-text-secondary">{dictionary.searchLabel}</span>
            </div>

            <div className="flex flex-wrap gap-2 px-4 pt-4">
              {dictionary.chips.map((chip, index) => (
                <span
                  key={chip}
                  className={
                    index === 0
                      ? "rounded-full bg-brand-dark px-3 py-1 text-xs font-medium text-white"
                      : "rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-text-secondary"
                  }
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="p-4">
              <div className="overflow-hidden rounded-xl border border-border/70">
                <div className="flex items-center gap-3 bg-surface-mint/60 px-4 py-2 text-xs font-medium text-text-secondary">
                  <Users className="size-3.5 text-brand-hover" aria-hidden="true" />
                  {dictionary.countLabel}
                </div>
                {dictionary.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 border-t border-border/70 px-4 py-3"
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium text-text-primary">
                      <span className="grid size-5 place-items-center rounded-md border border-brand/30 bg-brand/8 text-brand-hover">
                        <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {row.label}
                    </span>
                    <span className="text-xs tabular-nums text-text-secondary">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.18}>
          <Mockup
            name="marketing-segmentation"
            alt={dictionary.imageAlt}
            ratio="3 / 2"
            sizes="(max-width: 1280px) 94vw, 1180px"
            className="mt-8 rounded-2xl border border-border shadow-e2"
          />
        </MotionReveal>
      </Container>
    </Section>
  );
}