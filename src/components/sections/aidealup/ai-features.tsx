import Image from "next/image";
import { Bot, FileSearch, Gauge, KanbanSquare, MessageCircleMore, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const featureIcons = [FileSearch, Bot, KanbanSquare];
const detailIcons = [Gauge, MessageCircleMore, SlidersHorizontal];

export function AiDealUpFeatures({
  dictionary,
}: {
  dictionary: Dictionary["aiDealUp"]["features"];
}) {
  return (
    <Section tone="mint" spacing="lg" decoration="grid" aria-labelledby="aidealup-features-title">
      <Container className="max-w-[1280px]">
        <SectionHeader
          id="aidealup-features-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="center"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {dictionary.items.map((item, index) => {
            const Icon = featureIcons[index];
            const DetailIcon = detailIcons[index];
            return (
              <MotionReveal key={item.title} delay={0.07 * index} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-dark/10 bg-white p-6 shadow-e1 transition-transform duration-300 hover:-translate-y-1 hover:shadow-e3">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-dark text-white shadow-brand">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-ai-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ai-dark">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.025em] text-text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">{item.description}</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border/70 pt-4 text-sm font-medium text-brand-hover">
                    <DetailIcon className="size-4.5" aria-hidden="true" />
                    {item.outcome}
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>

        <MotionReveal delay={0.16}>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-brand-dark/10 bg-white shadow-e3">
            <div className="grid items-center lg:grid-cols-[1.12fr_0.88fr]">
              <div className="relative min-h-[330px] p-4 sm:p-8 lg:min-h-[520px]">
                <Image
                  src="/assets/aidealup/screening-use-case.webp"
                  alt={dictionary.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 94vw, 58vw"
                  className="object-contain p-3 sm:p-5"
                />
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ai">{dictionary.spotlightEyebrow}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-balance text-text-primary sm:text-3xl">
                  {dictionary.spotlightTitle}
                </h3>
                <p className="mt-4 text-base leading-7 text-text-secondary">{dictionary.spotlightDescription}</p>
                <ul className="mt-6 space-y-3">
                  {dictionary.spotlightPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-6 text-text-primary">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
