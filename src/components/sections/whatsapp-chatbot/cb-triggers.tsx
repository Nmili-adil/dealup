import {
  FileText,
  Hash,
  MousePointerClick,
  ShoppingBag,
  SquareStack,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated triggers by index. */
const ICONS: LucideIcon[] = [Hash, MousePointerClick, SquareStack, Webhook, ShoppingBag, FileText];

export function CbTriggers({
  dictionary,
}: {
  dictionary: Dictionary["whatsappChatbot"]["triggers"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="cb-triggers-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="cb-triggers-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          {dictionary.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">{dictionary.subtitle}</p>
      </div>

      <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {dictionary.items.map((item, index) => {
          const Icon = ICONS[index];
          return (
            <li key={item.title}>
              <MotionReveal delay={index * 0.05}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-border/80 bg-white p-4 shadow-e1 transition-colors hover:border-brand/30">
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-mint text-brand-hover"
                  >
                    <Icon className="size-4.5" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary">
                      <GradientText>{item.title}</GradientText>
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-text-secondary">{item.description}</p>
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
