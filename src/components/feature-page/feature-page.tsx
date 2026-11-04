import type { Locale } from "@/lib/i18n/locales";
import type { FeaturePageCopy } from "./copy";
import { FeatureHero } from "./feature-hero";
import { FeatureProblem } from "./feature-problem";
import { FeatureBenefits } from "./feature-benefits";
import { FeatureCapabilities } from "./feature-capabilities";
import { FeatureWorkflow } from "./feature-workflow";
import { FeatureComparison } from "./feature-comparison";
import { FeatureUseCases } from "./feature-use-cases";
import { FeatureRelated } from "./feature-related";
import { FeatureFaq } from "./feature-faq";
import { FeatureFinalCta } from "./feature-final-cta";

/**
 * Assembles a feature/solution/industry page from a dictionary slice.
 *
 * Section order is fixed but every section is optional: a page that omits a
 * key from its dictionary simply skips it. `children` lets individual pages
 * inject bespoke, non-shared storytelling between the standard beat and the
 * cross-feature links — so pages share the system without reading as clones.
 */
export function FeaturePage({
  locale,
  copy,
  parentLabel,
  parentHref,
  homeLabel,
  primaryCta,
  secondaryCta,
  visual,
  children,
}: {
  locale: Locale;
  copy: FeaturePageCopy;
  parentLabel: string;
  parentHref?: string;
  homeLabel: string;
  primaryCta: string;
  secondaryCta: string;
  visual?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden bg-white">
      <FeatureHero
        locale={locale}
        copy={copy.hero}
        homeLabel={homeLabel}
        parentLabel={parentLabel}
        parentHref={parentHref}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        visual={visual}
      />

      {copy.problem ? <FeatureProblem copy={copy.problem} /> : null}
      {copy.benefits ? <FeatureBenefits copy={copy.benefits} /> : null}
      {copy.capabilities ? <FeatureCapabilities copy={copy.capabilities} /> : null}
      {copy.workflow ? <FeatureWorkflow copy={copy.workflow} /> : null}
      {copy.comparison ? <FeatureComparison copy={copy.comparison} /> : null}
      {copy.useCases ? <FeatureUseCases copy={copy.useCases} /> : null}

      {children}

      {copy.related ? <FeatureRelated locale={locale} copy={copy.related} /> : null}
      {copy.faq ? <FeatureFaq copy={copy.faq} /> : null}
      <FeatureFinalCta
        locale={locale}
        copy={copy.finalCta ?? { title: "", description: "" }}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />
    </div>
  );
}
