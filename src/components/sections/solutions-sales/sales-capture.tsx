import { Check, UserPlus } from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { PhoneMockup } from "@/components/product/phone-mockup";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function SalesCapture({
  dictionary,
}: {
  dictionary: Dictionary["salesSolution"]["capture"];
}) {
  return (
    <Section id="sales-lead-forms" tone="white" spacing="lg" aria-labelledby="sales-capture-title">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <MotionReveal delay={0.1} className="lg:col-start-2 lg:row-start-1">
          <PhoneMockup className="mx-auto">
            <div className="flex h-full flex-col px-3 py-4">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-white">
                <span className="grid size-7 place-items-center rounded-full bg-brand/25 text-brand">
                  <UserPlus className="size-3.5" aria-hidden="true" />
                </span>
                {dictionary.formTitle}
              </p>

              <div className="mt-4 space-y-2.5">
                {dictionary.fields.map((field, index) => (
                  <label key={field} className="block">
                    <span className="text-[11px] font-medium text-white/60">{field}</span>
                    <span className="mt-1 block rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-[13px] text-white/40">
                      {index === 0 ? "Salma" : index === 1 ? "City centre" : "A 4-seat plan"}
                    </span>
                  </label>
                ))}
              </div>

              <span className="mt-4 inline-flex items-center justify-center rounded-full bg-brand px-4 py-2.5 text-[13px] font-semibold text-white">
                {dictionary.submitLabel}
              </span>

              <span className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-brand/15 px-3 py-1.5 text-[11px] font-medium text-[#8ef0b5]">
                <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                {dictionary.toastLabel}
              </span>
            </div>
          </PhoneMockup>
        </MotionReveal>

        <SectionHeader
          id="sales-capture-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="start"
        />

        <MotionReveal delay={0.2}>
          <ul className="mt-6 space-y-3 lg:col-start-1 lg:row-start-2">
            {dictionary.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-6 text-text-primary">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-hover" strokeWidth={2.3} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </MotionReveal>
      </Container>
    </Section>
  );
}