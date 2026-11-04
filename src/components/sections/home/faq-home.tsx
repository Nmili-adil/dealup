import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import Image from "next/image";

export function FaqHome({ dictionary }: { dictionary: Dictionary["home"]["faq"] }) {
  return (
    <Section id="faq" tone="white" spacing="sm">
      <Container className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-14">
        <MotionReveal x={-20} y={0} className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-hover">
            {dictionary.label}
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-balance text-text-primary sm:text-3xl">
            {dictionary.headline}
          </h2>
    
          <div className="max-w-[480px] text-base leading-relaxed text-text-secondary sm:text-lg">
            <Image src="/svgs/undraw_faq_pgxi.svg" alt="FAQ" width={480} height={300} />
          </div>
        </MotionReveal>

        <Accordion type="single" collapsible className="flex w-full flex-col gap-3">
          {dictionary.items.map((item, index) => (
            <MotionReveal key={item.q} delay={index * 0.05}>
              <AccordionItem value={`home-faq-${index}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            </MotionReveal>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
