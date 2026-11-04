import { Boxes, Check, Globe2, LockKeyhole, Plus } from "lucide-react";
import { Section } from "@/components/layout/section";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function EcommerceTrustFaq({
  dictionary,
}: {
  dictionary: Dictionary["ecommerceSolution"]["trustFaq"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="ecommerce-trust-title">
      <div className="grid items-start gap-8 lg:grid-cols-3 lg:gap-10">
        <article>
          <span className="grid size-10 place-items-center rounded-xl bg-surface-mint text-brand-hover"><Boxes className="size-5" aria-hidden="true" /></span>
          <h2 id="ecommerce-trust-title" className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-text-primary">{dictionary.connectTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary">{dictionary.connectDescription}</p>
          <ul className="mt-5 space-y-2.5">{dictionary.connectPoints.map((point) => <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-text-primary"><Check className="mt-1 size-4 shrink-0 text-brand-hover" aria-hidden="true" />{point}</li>)}</ul>
          <div className="mt-6 flex flex-wrap gap-2">{dictionary.integrations.map((integration) => <span key={integration} className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-text-secondary">{integration}</span>)}</div>
        </article>

        <article>
          <span className="grid size-10 place-items-center rounded-xl bg-ai-soft text-ai-dark"><LockKeyhole className="size-5" aria-hidden="true" /></span>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-text-primary">{dictionary.responsibilityTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary">{dictionary.responsibilityDescription}</p>
          <ul className="mt-5 space-y-2.5">{dictionary.responsibilityPoints.map((point) => <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-text-primary"><Globe2 className="mt-1 size-4 shrink-0 text-ai" aria-hidden="true" />{point}</li>)}</ul>
        </article>

        <article>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.faqEyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-text-primary">{dictionary.faqTitle}</h2>
          <div className="mt-5 space-y-2.5">{dictionary.faqItems.map((item) => <details key={item.question} className="group overflow-hidden rounded-xl border border-border/80 bg-white"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-start text-sm font-semibold text-text-primary marker:content-none"><span>{item.question}</span><Plus className="size-4 shrink-0 text-brand-hover transition-transform group-open:rotate-45" aria-hidden="true" /></summary><p className="px-4 pb-4 text-xs leading-5 text-text-secondary">{item.answer}</p></details>)}</div>
        </article>
      </div>
    </Section>
  );
}
