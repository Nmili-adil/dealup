import { MessageCircle, Users, Globe, Zap } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [MessageCircle, Users, Globe, Zap];

export function TrustBar({ dictionary }: { dictionary: Dictionary["home"]["trustBar"] }) {
  return (
    <section className="bg-white py-7">
      <Container>
        <MotionReveal>
          <ul className="grid gap-5 rounded-3xl bg-surface-mint px-6 py-5 sm:grid-cols-2 md:grid-cols-4 md:px-9">
            {dictionary.map((item, index) => {
              const Icon = icons[index];
              return (
                <li key={item.title} className="flex items-center gap-3">
                  <Icon
                    className="size-7 shrink-0 text-brand-dark"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="flex flex-col leading-snug">
                    <span className="text-sm font-medium text-text-primary">
                      {item.title}
                    </span>
                    <span className="text-sm text-text-secondary">
                      {item.description}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </MotionReveal>
      </Container>
    </section>
  );
}
