import {
  EyeOff,
  KeyRound,
  Lock,
  ShieldCheck,
  Trash2,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated items by index. */
const ICONS: LucideIcon[] = [UserCheck, EyeOff, Lock, KeyRound, ShieldCheck, Trash2];

export function FormsPrivacy({
  dictionary,
}: {
  dictionary: Dictionary["whatsappForms"]["privacy"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="forms-privacy-title">
      <h2
        id="forms-privacy-title"
        className="text-center text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
      >
        <GradientText>{dictionary.title}</GradientText>
      </h2>

      <ul className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {dictionary.items.map((item, index) => {
          const Icon = ICONS[index];
          return (
            <li key={item.title}>
              <MotionReveal delay={index * 0.05}>
                <div className="flex items-start gap-3">
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
