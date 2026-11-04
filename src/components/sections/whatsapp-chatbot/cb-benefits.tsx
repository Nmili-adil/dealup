import { Clock, MessageSquare, UserCheck, type LucideIcon } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated items by index. */
const ICONS: LucideIcon[] = [MessageSquare, UserCheck, Clock];

export function CbBenefits({
  dictionary,
}: {
  dictionary: Dictionary["whatsappChatbot"]["benefits"];
}) {
  return (
    <Section spacing="md" aria-label={dictionary.items[0].title}>
      <ul className="grid gap-4 md:grid-cols-3">
        {dictionary.items.map((item, index) => {
          const Icon = ICONS[index];
          return (
            <li key={item.title}>
              <MotionReveal delay={index * 0.07}>
                <div className="flex h-full items-start gap-3.5 rounded-2xl border border-border/80 bg-white p-5 shadow-e1">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-mint text-brand-hover"
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-[15px] font-semibold leading-snug text-text-primary">
                      <GradientText>{item.title}</GradientText>
                    </h2>
                    <p className="mt-1.5 text-sm leading-6 text-text-secondary">{item.description}</p>
                  </div>
                </div>
              </MotionReveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
