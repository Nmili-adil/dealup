import { Code2, Headphones, ShieldCheck, UsersRound, type LucideIcon } from "lucide-react";
import { GradientText } from "@/components/ui/titleCustomize";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "./section-title";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated items by index. */
const supportIcons: LucideIcon[] = [ShieldCheck, Code2, Headphones, UsersRound];

export function ApiSupport({
  dictionary,
}: {
  dictionary: Dictionary["whatsappBusinessApi"]["support"];
}) {
  return (
    <Section aria-labelledby="local-support-title">
      <SectionTitle id="local-support-title" title={dictionary.title} highlight={dictionary.highlight} />
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dictionary.items.map((item, index) => {
          const Icon = supportIcons[index];
          return (
            <MotionReveal key={item.title} delay={index * 0.07}>
              <article className="h-full rounded-2xl border border-border/80 bg-white p-3 shadow-e1">
                <Icon className="size-7 text-brand-hover" strokeWidth={1.7} aria-hidden="true" />
                <h3 className="mt-4 text-sm font-semibold text-text-primary">
                  <GradientText>{item.title}</GradientText>
                </h3>
                <p className="mt-2 text-xs leading-5 text-text-secondary">{item.description}</p>
              </article>
            </MotionReveal>
          );
        })}
      </div>
    </Section>
  );
}
