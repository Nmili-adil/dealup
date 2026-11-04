import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n/locales";

const redirectTarget = `/${defaultLocale}/products/whatsapp-marketing/`;

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: redirectTarget },
};

export default function WhatsAppMarketingRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${redirectTarget}`} />
      <p>
        Redirecting to <a href={redirectTarget}>{redirectTarget}</a>…
      </p>
    </>
  );
}
