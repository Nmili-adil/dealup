import { ArrowRight, Bot, CircleCheckBig, Headphones, MessageCircle, PackageCheck, Search, ShoppingCart } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Search, Bot, MessageCircle, CircleCheckBig, ShoppingCart, PackageCheck, Headphones];

export function EcommerceJourney({
  dictionary,
}: {
  dictionary: Dictionary["ecommerceSolution"]["journey"];
}) {
  return (
    <Section spacing="md" aria-labelledby="ecommerce-journey-title">
      <Container className="max-w-[1360px]">
        <MotionReveal>
          <h2 id="ecommerce-journey-title" className="text-2xl font-semibold tracking-[-0.035em] text-text-primary sm:text-3xl">{dictionary.title}</h2>
          <p className="mt-2 text-sm text-text-secondary">{dictionary.description}</p>
        </MotionReveal>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {dictionary.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <MotionReveal key={item.title} delay={0.04 * index} className="h-full">
                <article className="relative flex h-full flex-col rounded-2xl border border-brand-dark/8 bg-[#f8faf6] p-4">
                  <span className="grid size-9 place-items-center rounded-xl bg-white text-brand-hover shadow-e1">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-text-secondary">{item.description}</p>
                  {index < dictionary.items.length - 1 ? (
                    <ArrowRight aria-hidden="true" className="absolute -end-2.5 top-7 z-10 hidden size-4 text-brand/45 rtl:rotate-180 lg:block" />
                  ) : null}
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
