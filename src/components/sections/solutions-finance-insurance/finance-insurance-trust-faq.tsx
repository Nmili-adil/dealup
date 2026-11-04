import { Boxes, Check, Globe2, LockKeyhole } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function FinanceInsuranceTrustFaq({
  dictionary,
}: {
  dictionary: Dictionary["financeInsuranceSolution"]["trustFaq"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="finance-insurance-trust-title">
      <div className="grid items-start gap-8 lg:grid-cols-3 lg:gap-10">
        <article>
          <span className="grid size-10 place-items-center rounded-xl bg-surface-mint text-brand-hover"><Boxes className="size-5" aria-hidden="true" /></span>
          <h2 id="finance-insurance-trust-title" className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-text-primary">{dictionary.connectTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary">{dictionary.connectDescription}</p>
          <ul className="mt-5 space-y-2.5">
            {dictionary.connectPoints.map((point) => <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-text-primary"><Check className="mt-1 size-4 shrink-0 text-brand-hover" aria-hidden="true" />{point}</li>)}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {dictionary.integrations.map((integration) => <span key={integration} className="rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-text-secondary">{integration}</span>)}
          </div>
        </article>

        <article>
          <span className="grid size-10 place-items-center rounded-xl bg-ai-soft text-ai-dark"><LockKeyhole className="size-5" aria-hidden="true" /></span>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-text-primary">{dictionary.responsibilityTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-text-secondary">{dictionary.responsibilityDescription}</p>
          <ul className="mt-5 space-y-2.5">
            {dictionary.responsibilityPoints.map((point) => <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-text-primary"><Globe2 className="mt-1 size-4 shrink-0 text-ai" aria-hidden="true" />{point}</li>)}
          </ul>
        </article>

        <article>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-hover">{dictionary.faqEyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-text-primary">{dictionary.faqTitle}</h2>
          <Accordion type="single" collapsible className="mt-5 space-y-2.5">
            {dictionary.faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={`finance-insurance-faq-${index}`} className="rounded-xl border-border/80 shadow-none data-[state=open]:shadow-none">
                <AccordionTrigger className="px-4 py-3 text-sm font-semibold">{item.question}</AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-xs leading-5">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </article>
      </div>
    </Section>
  );
}
