import { Plus } from "lucide-react";
import { Section } from "@/components/layout/section";
import { GradientText } from "@/components/ui/titleCustomize";
import type { FeatureFaqCopy } from "./copy";

/**
 * Two balanced columns of native disclosure widgets — no JS needed.
 * Same pattern as the platform's other FAQ sections.
 */
export function FeatureFaq({ copy }: { copy: FeatureFaqCopy }) {
  const half = Math.ceil(copy.items.length / 2);
  const columns = [copy.items.slice(0, half), copy.items.slice(half)];

  return (
    <Section spacing="lg" aria-labelledby="feature-faq-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="feature-faq-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          <GradientText>{copy.title}</GradientText>
        </h2>
      </div>

      <div className="mx-auto mt-8 grid max-w-5xl items-start gap-2 lg:grid-cols-2 lg:gap-x-5">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-2">
            {column.map((item) => (
              <details
                key={item.question}
                className="group overflow-hidden rounded-xl border border-border/70 bg-white"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-medium text-text-primary marker:content-none hover:text-brand-hover">
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
