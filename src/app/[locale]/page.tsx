import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { JsonLd, buildFaqJsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { Trust } from "@/components/sections/trust";
import { Problem } from "@/components/sections/problem";
import { PlatformStory } from "@/components/sections/platform-story";
import { Campaigns } from "@/components/sections/campaigns";
import { TeamInbox } from "@/components/sections/team-inbox";
import { Automation } from "@/components/sections/automation";
import { AiAgents } from "@/components/sections/ai-agents";
import { MoroccanSolutions } from "@/components/sections/moroccan-solutions";
import { ClickToWhatsapp } from "@/components/sections/click-to-whatsapp";
import { Analytics } from "@/components/sections/analytics";
import { CustomerStory } from "@/components/sections/customer-story";
import { Integrations } from "@/components/sections/integrations";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { Security } from "@/components/sections/security";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <JsonLd data={buildFaqJsonLd(dictionary.faq.items)} />

      {/* Section tones alternate deliberately: light surfaces carry the product
          story, the two dark beats (TeamInbox / AiAgents) break the scroll, and
          the mint beats group the "why + how" moments. */}
      <Hero locale={locale} dictionary={dictionary.hero} />
      <Trust dictionary={dictionary.trust} />
      <Problem dictionary={dictionary.problem} />
      <PlatformStory dictionary={dictionary.platformStory} />
      <Campaigns dictionary={dictionary.campaigns} />
      {/* <TeamInbox dictionary={dictionary.teamInbox} /> */}
      {/* <Automation dictionary={dictionary.automation} /> */}
      {/* <AiAgents dictionary={dictionary.aiAgents} productUi={dictionary.productUi} /> */}
      {/* <MoroccanSolutions dictionary={dictionary.moroccanSolutions} /> */}
      <ClickToWhatsapp locale={locale} dictionary={dictionary.clickToWhatsapp} />
      <Analytics dictionary={dictionary.analytics} />
      <CustomerStory dictionary={dictionary.customerStory} />
      <Integrations dictionary={dictionary.integrations} />
      <PricingPreview locale={locale} dictionary={dictionary.pricingPreview} />
      <Security dictionary={dictionary.security} />
      <Faq dictionary={dictionary.faq} />
      <FinalCta locale={locale} dictionary={dictionary.finalCta} />
    </>
  );
}
