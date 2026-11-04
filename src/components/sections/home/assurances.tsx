import { Lock, Headphones, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Lock, Headphones, MessageCircle];

export function Assurances({ dictionary }: { dictionary: Dictionary["home"]["assurances"] }) {
  return (
    <Section tone="white" spacing="sm">
      <Container>
        <MotionReveal>
          <ul className="grid gap-8 rounded-3xl bg-surface-mint px-6 py-8 md:grid-cols-3 md:gap-0 md:px-10">
            {dictionary.map((item, index) => {
              const Icon = icons[index];
              return (
                <li
                  key={item.title}
                  className={
                    // Dividers between columns only, never a trailing rule.
                    index > 0 ? "md:border-s md:border-brand-dark/10 md:ps-8" : "md:pe-8"
                  }
                >
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-12 shrink-0 place-items-center rounded-full bg-white/70 text-brand-dark"
                    >
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-semibold text-text-primary">{item.title}</span>
                      <span className="text-sm leading-relaxed text-text-secondary">
                        {item.description}
                      </span>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </MotionReveal>
      </Container>
    </Section>
  );
}
