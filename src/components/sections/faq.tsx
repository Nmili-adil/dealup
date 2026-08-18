import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Faq({ dictionary }: { dictionary: Dictionary["faq"] }) {
  return (
    <Section tone="light">
      <Container className="mx-auto flex max-w-3xl flex-col gap-10">
        <SectionHeader align="center" eyebrow={dictionary.eyebrow} headline={dictionary.headline} />

        <Accordion type="single" collapsible className="w-full">
          {dictionary.items.map((item, index) => (
            <AccordionItem key={item.q} value={`item-${index}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
