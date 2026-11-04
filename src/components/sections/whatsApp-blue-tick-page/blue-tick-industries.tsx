import {
  GraduationCap,
  HeartPulse,
  Landmark,
  Megaphone,
  Plane,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const ICONS: LucideIcon[] = [ShoppingBag, Landmark, GraduationCap, HeartPulse, Plane, Megaphone];

export function BlueTickIndustries({
  dictionary,
}: {
  dictionary: Dictionary["whatsappBlueTick"]["industries"];
}) {
  return (
    <Section tone="forest" spacing="lg" decoration="grid" aria-labelledby="blue-tick-industries-title">
      <Container className="max-w-[1280px]">
        <SectionHeader
          id="blue-tick-industries-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="center"
          tone="inverted"
        />

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.items.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <li key={item.title}>
                <MotionReveal delay={index * 0.05} className="h-full">
                  <article className="flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-sm transition-colors hover:bg-white/10">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#8de7b5]">
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-white/65">{item.description}</p>
                    </div>
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
