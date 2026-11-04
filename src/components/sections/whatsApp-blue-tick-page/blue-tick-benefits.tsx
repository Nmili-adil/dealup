import { BadgeCheck, Eye, ShieldCheck, Trophy, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const BENEFITS: Array<{ icon: LucideIcon; tint: string }> = [
  { icon: BadgeCheck, tint: "bg-[#eaf3ff] text-[#236cc7]" },
  { icon: ShieldCheck, tint: "bg-chart-1/12 text-chart-1" },
  { icon: Eye, tint: "bg-chart-3/12 text-chart-3" },
  { icon: Trophy, tint: "bg-chart-2/12 text-chart-2" },
];

export function BlueTickBenefits({
  dictionary,
}: {
  dictionary: Dictionary["whatsappBlueTick"]["benefits"];
}) {
  return (
    <Section tone="mint" spacing="lg" decoration="grid" aria-labelledby="blue-tick-benefits-title">
      <Container className="max-w-[1280px]">
        <SectionHeader
          id="blue-tick-benefits-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="center"
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dictionary.items.map((item, index) => {
            const { icon: Icon, tint } = BENEFITS[index];
            return (
              <li key={item.title}>
                <MotionReveal delay={index * 0.06} className="h-full">
                  <article className="h-full rounded-2xl border border-white/80 bg-white/90 p-5 shadow-e1 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-e2">
                    <span className={cn("grid size-11 place-items-center rounded-xl", tint)}>
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold leading-snug text-text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{item.description}</p>
                  </article>
                </MotionReveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
