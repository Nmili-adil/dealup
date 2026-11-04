import { Armchair, BriefcaseBusiness, Cookie, Headphones, PackageOpen, Shirt } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Shirt, PackageOpen, Headphones, Armchair, Cookie, BriefcaseBusiness];

export function EcommercePlaybooks({
  dictionary,
}: {
  dictionary: Dictionary["ecommerceSolution"]["playbooks"];
}) {
  return (
    <Section tone="mint" spacing="lg" decoration="grid" aria-labelledby="ecommerce-playbooks-title">
      <Container className="max-w-[1280px]">
        <SectionHeader id="ecommerce-playbooks-title" eyebrow={dictionary.eyebrow} headline={dictionary.title} description={dictionary.description} align="center" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.items.map((item, index) => { const Icon = icons[index]; return (
            <MotionReveal key={item.title} delay={0.05 * index} className="h-full">
              <article className="h-full rounded-2xl border border-brand-dark/8 bg-white p-5 shadow-e1">
                <span className="grid size-11 place-items-center rounded-2xl bg-surface-mint text-brand-hover"><Icon className="size-5" aria-hidden="true" /></span>
                <h3 className="mt-5 text-base font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{item.description}</p>
              </article>
            </MotionReveal>
          ); })}
        </div>
      </Container>
    </Section>
  );
}
