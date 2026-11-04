import { Plug } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Integrations({ dictionary }: { dictionary: Dictionary["integrations"] }) {
  return (
    <Section tone="light">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          align="center"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.headline}
          description={dictionary.description}
        />

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {dictionary.items.map((item, index) => (
            <li key={item}>
              <MotionReveal delay={(index % 4) * 0.06}>
                <div className="group flex h-full items-center gap-3 rounded-2xl border border-border/70 bg-white p-4 shadow-e1 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-e2">
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-mint text-brand-hover transition-colors duration-300 group-hover:bg-brand-dark group-hover:text-white"
                  >
                    <Plug className="size-4" />
                  </span>
                  <span className="text-sm font-medium text-balance text-text-primary">
                    {item}
                  </span>
                </div>
              </MotionReveal>
            </li>
          ))}
        </ul>

        <p className="text-center text-sm text-text-secondary">{dictionary.note}</p>
      </Container>
    </Section>
  );
}
