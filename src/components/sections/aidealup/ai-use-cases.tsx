import { Building2, Globe2, Layers, UsersRound } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [UsersRound, Building2, Layers, Globe2];

export function AiDealUpUseCases({
  dictionary,
}: {
  dictionary: Dictionary["aiDealUp"]["useCases"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="aidealup-use-cases-title">
      <Container className="max-w-[1280px]">
        <SectionHeader
          id="aidealup-use-cases-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="center"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {dictionary.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <MotionReveal key={item.title} delay={0.05 * index} className="h-full">
                <article className="group relative isolate h-full overflow-hidden rounded-3xl border border-border/80 bg-[#fbfbf8] p-6 shadow-e1 sm:p-7">
                  <span aria-hidden="true" className="absolute -end-12 -top-12 -z-10 size-40 rounded-full bg-brand/8 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                  <div className="flex items-start gap-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-hover shadow-e1 ring-1 ring-brand-dark/8">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.025em] text-text-primary">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">{item.description}</p>
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-ai-dark">{item.result}</p>
                    </div>
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
