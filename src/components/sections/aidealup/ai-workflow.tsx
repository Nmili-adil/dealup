import { ArrowDown, BriefcaseBusiness, ChartNoAxesCombined, CircleCheckBig, Link2, MailCheck, ScanSearch } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [BriefcaseBusiness, Link2, ScanSearch, MailCheck, CircleCheckBig, ChartNoAxesCombined];

export function AiDealUpWorkflow({
  dictionary,
}: {
  dictionary: Dictionary["aiDealUp"]["workflow"];
}) {
  return (
    <Section id="aidealup-workflow" tone="forest" spacing="lg" decoration="grid" aria-labelledby="aidealup-workflow-title">
      <Container className="max-w-[1280px]">
        <SectionHeader
          id="aidealup-workflow-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          tone="inverted"
          align="center"
        />

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div aria-hidden="true" className="absolute start-[29px] top-12 hidden h-[calc(100%-6rem)] w-px bg-linear-to-b from-brand via-ai to-brand md:block" />
          <div className="space-y-4">
            {dictionary.items.map((item, index) => {
              const Icon = icons[index];
              return (
                <MotionReveal key={item.title} delay={0.04 * index}>
                  <article className="group relative grid gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-sm transition-colors hover:border-brand/35 hover:bg-white/[0.08] md:grid-cols-[60px_0.8fr_1.2fr] md:items-center md:gap-6">
                    <span className="relative z-10 grid size-[60px] place-items-center rounded-2xl border border-white/15 bg-brand-dark text-brand-light shadow-[0_0_0_7px_rgba(4,51,39,0.9)]">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-light">
                        {dictionary.stepLabel} {index + 1}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="text-sm leading-6 text-white/65">{item.description}</p>
                    {index < dictionary.items.length - 1 ? (
                      <ArrowDown className="absolute -bottom-4 start-[22px] z-20 size-4 text-brand md:hidden" aria-hidden="true" />
                    ) : null}
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
