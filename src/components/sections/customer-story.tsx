import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function CustomerStory({ dictionary }: { dictionary: Dictionary["customerStory"] }) {
  return (
    <Section tone="mint" spacing="sm">
      <Container>
        <MotionReveal className="mx-auto max-w-3xl">
          <Card
            padding="lg"
            className="items-center gap-5 text-center sm:p-12"
          >
            <Badge variant="brand">{dictionary.badge}</Badge>

            <SectionHeader
              align="center"
              eyebrow={dictionary.eyebrow}
              headline={dictionary.headline}
            />

            <p className="max-w-xl leading-relaxed text-text-secondary">
              {dictionary.placeholderNote}
            </p>
          </Card>
        </MotionReveal>
      </Container>
    </Section>
  );
}
