import { Clock, Headphones, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [ShieldCheck, Clock, Headphones];

export function CsTrust({
  dictionary,
}: {
  dictionary: Dictionary["customerSupportSolution"]["trust"];
}) {
  return (
    <Section tone="light" spacing="sm" aria-label={dictionary.label}>
      <Container className="max-w-[1280px]">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/40 sm:grid-cols-3">
          {dictionary.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={item.title} className="flex flex-col gap-2 bg-white p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-surface-mint text-brand-hover">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-1 text-base font-semibold text-text-primary">{item.title}</h2>
                <p className="text-sm leading-6 text-text-secondary">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
