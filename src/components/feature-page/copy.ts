/**
 * Shared copy shapes for the feature/solution page system.
 *
 * Each shape mirrors a dictionary namespace slice that lives in
 * src/messages/{en,fr,ar}.json. Components render ONLY these keys, so a page
 * can be composed declaratively from a dictionary slice without bespoke JSX.
 *
 * Optional sections are chosen per page: a page that omits e.g. `comparison`
 * from its dictionary simply doesn't render it. This keeps every page sharing
 * one system while letting each page tell its own story.
 */

export type FeatureHeroCopy = {
  breadcrumb: string;
  badge: string;
  headlineLead: string;
  headlineAccent: string;
  headlineTail?: string;
  description: string;
  imageAlt: string;
};

export type FeatureProblemCopy = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
};

export type FeatureBenefitsCopy = {
  eyebrow: string;
  title: string;
  description?: string;
  items: { title: string; description: string }[];
};

export type FeatureCapabilitiesCopy = {
  eyebrow: string;
  title: string;
  description?: string;
  items: { title: string; description: string; points: string[] }[];
};

export type FeatureWorkflowCopy = {
  eyebrow: string;
  title: string;
  description?: string;
  steps: { title: string; description: string }[];
};

export type FeatureUseCasesCopy = {
  eyebrow: string;
  title: string;
  description?: string;
  items: { title: string; description: string }[];
};

export type FeatureComparisonCopy = {
  eyebrow: string;
  title: string;
  description?: string;
  manualLabel: string;
  dealupLabel: string;
  rows: { label: string; manual: string; dealup: string }[];
};

export type FeatureRelatedCopy = {
  eyebrow?: string;
  title: string;
  description?: string;
  items: { title: string; description: string; href: string }[];
};

export type FeatureFaqCopy = {
  title: string;
  items: { question: string; answer: string }[];
};

export type FeatureFinalCtaCopy = {
  title: string;
  description: string;
  primaryCta?: string;
  secondaryCta?: string;
};

export type FeatureMetaCopy = {
  title: string;
  description: string;
};

export type FeaturePageCopy = {
  meta: FeatureMetaCopy;
  hero: FeatureHeroCopy;
  problem?: FeatureProblemCopy;
  benefits?: FeatureBenefitsCopy;
  capabilities?: FeatureCapabilitiesCopy;
  workflow?: FeatureWorkflowCopy;
  comparison?: FeatureComparisonCopy;
  useCases?: FeatureUseCasesCopy;
  related?: FeatureRelatedCopy;
  faq?: FeatureFaqCopy;
  finalCta?: FeatureFinalCtaCopy;
};
