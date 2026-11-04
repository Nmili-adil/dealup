import { Plus } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function AiDealUpFaq({
  dictionary,
}: {
  dictionary: Dictionary["aiDealUp"]["faq"];
}) {
  const splitAt = Math.ceil(dictionary.items.length / 2);
  const columns = [dictionary.items.slice(0, splitAt), dictionary.items.slice(splitAt)];

  return (
    <Section spacing="lg" aria-labelledby="aidealup-faq-title">
      <SectionHeader
        id="aidealup-faq-title"
        eyebrow={dictionary.eyebrow}
        headline={dictionary.title}
        description={dictionary.description}
        align="center"
      />

      <div className="mx-auto mt-9 grid max-w-5xl items-start gap-3 lg:grid-cols-2">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-3">
            {column.map((item) => (
              <details key={item.question} className="group overflow-hidden rounded-2xl border border-border/80 bg-white shadow-e1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-start text-sm font-semibold text-text-primary marker:content-none hover:text-brand-hover">
                  <span>{item.question}</span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-mint text-brand-hover transition-colors group-open:bg-brand-dark group-open:text-white">
                    <Plus className="size-4 transition-transform group-open:rotate-45" aria-hidden="true" />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-6 text-text-secondary">{item.answer}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
