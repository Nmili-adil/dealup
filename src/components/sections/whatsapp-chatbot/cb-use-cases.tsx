import {
  CalendarCheck,
  Headphones,
  Home,
  PackageCheck,
  ShoppingCart,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated use cases by index. */
const ICONS: LucideIcon[] = [ShoppingCart, Headphones, UserCheck, CalendarCheck, Home, PackageCheck];

export function CbUseCases({
  dictionary,
}: {
  dictionary: Dictionary["whatsappChatbot"]["useCases"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="cb-use-cases-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="cb-use-cases-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          <GradientText>{dictionary.title}</GradientText>
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">{dictionary.subtitle}</p>
      </div>

      <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dictionary.items.map((item, index) => {
          const Icon = ICONS[index];
          return (
            <li key={item.title}>
              <MotionReveal delay={index * 0.05}>
                <article className="h-full rounded-2xl border border-border/80 bg-white p-5 shadow-e1">
                  <span
                    aria-hidden="true"
                    className="grid size-11 place-items-center rounded-xl bg-surface-mint text-brand-hover"
                  >
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-text-primary">
                    <GradientText>{item.title}</GradientText>
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-text-secondary">{item.description}</p>
                </article>
              </MotionReveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
