import { Users, Megaphone, MessageSquare } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Users, Megaphone, MessageSquare];

export function EarlyAccess({ dictionary }: { dictionary: Dictionary["home"]["earlyAccess"] }) {
  return (
    <Section id="early-access" tone="white" spacing="sm">
      <Container>
        <MotionReveal>
          <div className="grid gap-8 rounded-3xl bg-surface-mint px-6 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:gap-12 md:px-10">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-hover">
                {dictionary.eyebrow}
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-balance text-text-primary sm:text-3xl">
                {dictionary.headline}
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-text-secondary">
                {dictionary.description}
              </p>
            </div>

            {/* Labels without figures, on purpose: the product is in early
                access, so there are no measured numbers to publish yet. */}
            <ul className="grid gap-6 sm:grid-cols-3">
              {dictionary.stats.map((stat, index) => {
                const Icon = icons[index];
                return (
                  <li key={stat} className="flex flex-col gap-3">
                    <Icon
                      className="size-7 text-text-primary"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-snug text-balance text-text-primary">
                      {stat}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
