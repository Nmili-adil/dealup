import { MessageSquareOff, Repeat, Sparkles, TrendingDown } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Card, IconTile } from "@/components/ui/card";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [MessageSquareOff, Repeat, TrendingDown];

export function Problem({ dictionary }: { dictionary: Dictionary["problem"] }) {
  const [beforeBrand, afterBrand] = dictionary.transition.split("Dealup");

  return (
    <Section tone="mint" decoration="grid">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          align="center"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.headline}
        />

        <div className="grid gap-6 sm:grid-cols-3">
          {dictionary.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <MotionReveal key={item.title} delay={index * 0.08} className="h-full">
                <Card interactive padding="lg" className="group h-full gap-4">
                  <span className="absolute end-6 top-6 text-sm font-semibold tabular-nums text-text-secondary">
                    0{index + 1}
                  </span>
                  <IconTile className="group-hover:bg-brand-dark group-hover:text-white">
                    <Icon aria-hidden="true" />
                  </IconTile>
                  <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="leading-relaxed text-text-secondary">{item.description}</p>
                </Card>
              </MotionReveal>
            );
          })}
        </div>

        <MotionReveal delay={0.3} className="flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-brand-dark/15 bg-white px-6 py-3 shadow-e2">
            <Sparkles className="size-5 shrink-0 text-brand-hover" aria-hidden="true" />
            <p className="text-lg font-semibold text-text-primary sm:text-xl">
              {beforeBrand}
              {afterBrand !== undefined ? (
                <GradientText variant="brand">Dealup</GradientText>
              ) : null}
              {afterBrand}
            </p>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
