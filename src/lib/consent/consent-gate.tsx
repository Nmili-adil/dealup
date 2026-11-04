"use client";

import type { ReactNode } from "react";
import { useConsent } from "./consent-provider";
import type { ConsentCategory } from "./consent";

/**
 * Render children (typically a <script>) only once the visitor has consented
 * to the given category.
 *
 * Example — a gated analytics snippet:
 *
 *   <ConsentGate category="analytics">
 *     <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX" />
 *   </ConsentGate>
 *
 * The provider also sets `data-consent-<category>` on <html> and fires a
 * `dealup:consent` CustomEvent, so third-party scripts can self-gate without
 * importing this module.
 */
export function ConsentGate({
  category,
  children,
}: {
  category: ConsentCategory;
  children: ReactNode;
}) {
  const { allows } = useConsent();
  return allows(category) ? <>{children}</> : null;
}
