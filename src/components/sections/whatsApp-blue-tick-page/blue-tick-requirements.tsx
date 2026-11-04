import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  KeyRound,
  MessageSquareText,
  Newspaper,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const ICONS: LucideIcon[] = [
  MessageSquareText,
  ShieldCheck,
  Building2,
  KeyRound,
  Newspaper,
  BadgeCheck,
];

export function BlueTickRequirements({
  dictionary,
}: {
  dictionary: Dictionary["whatsappBlueTick"]["requirements"];
}) {
  return (
    <Section id="blue-tick-requirements" spacing="lg" aria-labelledby="blue-tick-requirements-title">
      <div className="grid items-start gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <MotionReveal>
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              id="blue-tick-requirements-title"
              eyebrow={dictionary.eyebrow}
              headline={dictionary.title}
              description={dictionary.description}
            />
            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brand-dark p-4 text-white">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#8de7b5]" aria-hidden="true" />
              <p className="text-sm leading-6 text-white/75">{dictionary.note}</p>
            </div>
          </div>
        </MotionReveal>

        <ol className="grid gap-3 sm:grid-cols-2">
          {dictionary.items.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <li key={item.title}>
                <MotionReveal delay={index * 0.05} className="h-full">
                  <article className="h-full rounded-2xl border border-border/80 bg-white p-5 shadow-e1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-surface-mint text-brand-hover">
                        <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="text-xs font-semibold tabular-nums text-text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[15px] font-semibold leading-snug text-text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{item.description}</p>
                  </article>
                </MotionReveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
