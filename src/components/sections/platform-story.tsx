import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { ScrollStory } from "@/components/motion/scroll-story";
import { ProductWindow } from "@/components/product/product-window";
import { MetricCard } from "@/components/product/metric-card";
import { ChatBubble } from "@/components/product/chat-bubble";
import { WorkflowNode, WorkflowConnector } from "@/components/product/workflow-node";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function PlatformStory({
  dictionary,
  productUi,
}: {
  dictionary: Dictionary["platformStory"];
  productUi: Dictionary["productUi"];
}) {
  const visuals = [
    <ProductWindow key="campaigns" title={dictionary.steps[0].title}>
      <div className="flex flex-col gap-3 p-4">
        <div className="h-3 w-2/3 rounded-full bg-surface-mint" />
        <div className="h-3 w-1/2 rounded-full bg-surface-mint" />
        <div className="grid grid-cols-3 gap-2 pt-2">
          <MetricCard label={productUi.sent} value="12.4k" />
          <MetricCard label={productUi.read} value="91%" />
          <MetricCard label={productUi.replied} value="34%" />
        </div>
      </div>
    </ProductWindow>,
    <ProductWindow key="inbox" title={dictionary.steps[1].title}>
      <div className="flex flex-col gap-2 p-4">
        <ChatBubble from="customer">{productUi.deliveryQuestion}</ChatBubble>
        <ChatBubble from="agent">{productUi.deliveryAnswer}</ChatBubble>
      </div>
    </ProductWindow>,
    <ProductWindow key="automations" title={dictionary.steps[2].title}>
      <div className="flex flex-col items-center gap-2 p-4">
        <WorkflowNode label={productUi.newLead} tone="neutral" />
        <WorkflowConnector />
        <WorkflowNode label={productUi.aiQualification} tone="brand" />
      </div>
    </ProductWindow>,
    <ProductWindow key="ai" title={dictionary.steps[3].title}>
      <div className="flex flex-col gap-2 p-4">
        <ChatBubble from="customer">{productUi.stockQuestion}</ChatBubble>
        <ChatBubble from="ai">{productUi.aiStockSuggestion}</ChatBubble>
      </div>
    </ProductWindow>,
    <ProductWindow key="analytics" title={dictionary.steps[4].title}>
      <div className="grid grid-cols-2 gap-3 p-4">
        <MetricCard label={productUi.revenue} value="18 450 MAD" trend="+12%" />
        <MetricCard label={productUi.conversion} value="24%" trend="+3%" />
      </div>
    </ProductWindow>,
  ];

  return (
    <Section tone="light">
      <Container className="flex flex-col gap-14">
        <SectionHeader eyebrow={dictionary.eyebrow} headline={dictionary.headline} />
        <ScrollStory steps={[...dictionary.steps]} visuals={visuals} />
      </Container>
    </Section>
  );
}
