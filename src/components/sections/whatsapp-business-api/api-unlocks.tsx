import { Check, CheckCircle2, X } from "lucide-react";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionTitle } from "./section-title";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** What the API adds over the Business app, as a side-by-side comparison. */
export function ApiUnlocks({
  dictionary,
}: {
  dictionary: Dictionary["whatsappBusinessApi"]["unlocks"];
}) {
  return (
    <Section
      className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      aria-labelledby="unlocks-title"
    >
      <MotionReveal>
        <div className="lg:sticky lg:top-28">
          <SectionTitle
            id="unlocks-title"
            centered={false}
            title={dictionary.title}
            highlight={dictionary.highlight}
            description={dictionary.description}
          />
          <div className="mt-7 space-y-3">
            {dictionary.items.map((item) => (
              <div key={item.label} className="flex items-start gap-3 text-sm text-text-primary">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#169248]" aria-hidden="true" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </MotionReveal>

      <MotionReveal delay={0.1}>
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-e2">
          <div className="grid grid-cols-[1.25fr_1fr_1fr] border-b border-border bg-[#f8faf9] text-center text-xs font-semibold text-text-primary sm:text-sm">
            <span className="p-3 text-start">{dictionary.capabilityColumn}</span>
            <span className="border-s border-[#bfe7cd] bg-[#ecf8ef] p-3 text-[#0a7a37]">{dictionary.apiColumn}</span>
            <span className="border-s border-border p-3">{dictionary.appColumn}</span>
          </div>
          {dictionary.items.map((item) => (
            <div key={item.label} className="grid grid-cols-[1.25fr_1fr_1fr] border-b border-border/70 text-sm last:border-b-0">
              <span className="p-3 text-text-primary">{item.label}</span>
              <span className="grid place-items-center border-s border-[#bfe7cd] bg-[#f8fdf9] p-3">
                <Check className="size-5 text-[#159447]" strokeWidth={2.2} aria-label={dictionary.includedLabel} />
              </span>
              <span className="grid place-items-center border-s border-border p-3">
                {item.inApp ? (
                  <Check className="size-5 text-[#159447]" aria-label={dictionary.includedLabel} />
                ) : (
                  <X className="size-5 text-text-secondary" aria-label={dictionary.notIncludedLabel} />
                )}
              </span>
            </div>
          ))}
        </div>
      </MotionReveal>
    </Section>
  );
}
