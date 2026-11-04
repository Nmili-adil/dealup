import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** The flow canvas, shown at full width — it is the product's centrepiece. */
export function CbBuilder({
  dictionary,
}: {
  dictionary: Dictionary["whatsappChatbot"]["builder"];
}) {
  return (
    <Section tone="mint" spacing="lg" aria-labelledby="cb-builder-title">
      <Container className="max-w-[1280px]">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="cb-builder-title"
            className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
          >
            {dictionary.title}{" "}
            <GradientText>{dictionary.highlight}</GradientText>
          </h2>
          <p className="mt-3 text-base leading-7 text-text-secondary">
            {dictionary.subtitle}
          </p>
        </div>

        <MotionReveal delay={0.1} scale={0.98}>
          <div className="relative mt-9">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[10%] bottom-[1%] -z-10 h-10 rounded-[50%] bg-brand-dark/12 blur-2xl"
            />
            <Mockup
              name="cb-flow"
              alt={dictionary.imageAlt}
              ratio="1605 / 851"
              sizes="(max-width: 1280px) 96vw, 1220px"
              className="w-full object-contain drop-shadow-[0_26px_40px_rgba(6,64,47,0.16)]"
            />
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
