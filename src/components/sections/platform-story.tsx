import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { PlatformShowcase, type ShowcaseShot } from "@/components/product/platform-showcase";
import mockups from "@/lib/mockups.generated.json";
import type { Dictionary } from "@/lib/i18n/get-dictionary";


const shots: ShowcaseShot[] = [
  mockups["compaign-mockup"],
  mockups["chats-mockup"],
  mockups["automation-template"],
  mockups["chats-ai-detail"],
  mockups["analytics-mockup"],
];

export function PlatformStory({
  dictionary,
}: {
  dictionary: Dictionary["platformStory"];
}) {
  return (
    <Section tone="light" spacing="lg" decoration="grid">
      <Container className="flex flex-col gap-12">
        <SectionHeader eyebrow={dictionary.eyebrow} headline={dictionary.headline} />

        <PlatformShowcase
          steps={dictionary.steps}
          shots={shots}
          captionLabel={dictionary.captionLabel}
          pauseLabel={dictionary.pauseLabel}
          playLabel={dictionary.playLabel}
        />
      </Container>
    </Section>
  );
}
