import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** The plain-language definition, on a mint band. */
export function WmWhat({
  dictionary,
}: {
  dictionary: Dictionary["whatsappMarketing"]["what"];
}) {
  return (
    <Section tone="mint" spacing="md" aria-labelledby="wm-what-title">
      <MotionReveal>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="wm-what-title"
            className="text-2xl font-semibold tracking-[-0.03em] text-text-primary sm:text-3xl"
          >
            <GradientText>{dictionary.title}</GradientText>
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary sm:text-[17px] sm:leading-8">
            {dictionary.body}
          </p>
        </div>
      </MotionReveal>
    </Section>
  );
}
