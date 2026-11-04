import { Plus } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Two balanced columns of native disclosure widgets — no JS needed. */
export function ApiFaq({
  dictionary,
}: {
  dictionary: Dictionary["whatsappBusinessApi"]["faq"];
}) {
  const columns = [dictionary.items.slice(0, 4), dictionary.items.slice(4)];

  return (
    <Section spacing="lg" aria-labelledby="faq-title">
      <SectionHeader id="faq-title" headline={dictionary.title} />
      <div className="mt-3 grid items-start gap-2 lg:grid-cols-2">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-1">
            {column.map((item) => (
              <details key={item.question} className="group overflow-hidden rounded-xl border border-border/70 bg-white">
                <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-4 px-4 py-2 text-sm font-medium text-text-primary marker:content-none hover:text-brand-hover">
                  <span>{item.question}</span>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border/80 text-text-secondary group-open:border-brand/40 group-open:bg-brand/10 group-open:text-brand-hover">
                    <Plus className="size-4 transition-transform group-open:rotate-45" aria-hidden="true" />
                  </span>
                </summary>
                <p className="px-4 pb-4 text-sm leading-relaxed text-text-secondary">{item.answer}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
