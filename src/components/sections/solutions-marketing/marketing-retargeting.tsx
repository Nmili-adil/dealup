import { RotateCcw, ShoppingCart, TrendingUp } from "lucide-react";
import { Mockup } from "@/components/product/mockup";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [ShoppingCart, RotateCcw, TrendingUp];
/** One campaign creative per play, in the same order as `retargeting.items`. */
const creatives = [
  "campaign-creative-fashion",
  "campaign-creative-ceramics",
  "campaign-creative-beauty",
];

export function MarketingRetargeting({
  dictionary,
}: {
  dictionary: Dictionary["marketingSolution"]["retargeting"];
}) {
  return (
    <Section tone="light" spacing="lg" aria-labelledby="marketing-retargeting-title">
      <Container className="max-w-[1280px]">
        <SectionHeader
          id="marketing-retargeting-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="center"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {dictionary.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <MotionReveal key={item.title} delay={0.05 * index} className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-dark/8 bg-white shadow-e1">
                  {/* The creative each play would actually send. */}
                  <Mockup
                    name={creatives[index]}
                    alt={dictionary.imageAlts[index]}
                    ratio="12 / 5"
                    sizes="(max-width: 640px) 92vw, 30vw"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <span className="grid size-11 place-items-center rounded-2xl bg-surface-mint text-brand-hover">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{item.description}</p>
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