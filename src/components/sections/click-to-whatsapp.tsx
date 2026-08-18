import { Megaphone, MessageCircle, Workflow, UserCheck, UserCog, Trophy, ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Megaphone, MessageCircle, Workflow, UserCheck, UserCog, Trophy];

export function ClickToWhatsapp({ dictionary }: { dictionary: Dictionary["clickToWhatsapp"] }) {
  return (
    <Section tone="mint">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          align="center"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.headline}
          description={dictionary.description}
        />

        <MotionReveal className="flex flex-wrap items-center justify-center gap-3">
          {dictionary.funnel.map((step, index) => {
            const Icon = icons[index];
            return (
              <Fragment key={step}>
                <div className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium text-text-primary shadow-sm">
                  <Icon className="size-4 text-brand-hover" aria-hidden="true" />
                  {step}
                </div>
                {index < dictionary.funnel.length - 1 ? (
                  <ChevronRight className="size-4 shrink-0 text-text-muted rtl:rotate-180" aria-hidden="true" />
                ) : null}
              </Fragment>
            );
          })}
        </MotionReveal>
      </Container>
    </Section>
  );
}
