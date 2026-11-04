import type { Metadata } from "next";
import { Cairo, Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/layout/footer";
import { CookieConsent } from "@/components/cookie-consent/cookie-consent";
import { ConsentProvider } from "@/lib/consent/consent-provider";
import { CurrencyProvider } from "@/lib/currency/currency-provider";
import { Analytics } from "@/components/analytics/analytics";
import { JsonLd, buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/components/seo/json-ld";
import { locales, isRtl, isLocale, type Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildPageMetadata, siteUrl } from "@/lib/seo/metadata";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Arabic locale face. `latin` is included because Arabic pages carry Latin
   brand names and figures; `preload: false` keeps fr/en from fetching Cairo,
   since all three locales share this layout. */
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const dictionary = await getDictionary(rawLocale);

  return {
    ...buildPageMetadata({
      locale: rawLocale,
      path: "/",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
    }),
    metadataBase: new URL(siteUrl),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale: Locale = rawLocale;
  const dictionary = await getDictionary(locale);
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable}${
        isRtl(locale) ? ` ${cairo.variable}` : ""
      } h-full antialiased`}
    >

      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {/* One consent source of truth for the whole page: the banner, the
            preferences dialog and the gated measurement tags all read it. */}
        <CurrencyProvider locale={locale}>
          <ConsentProvider>
            <JsonLd data={buildOrganizationJsonLd(siteUrl)} />
            <JsonLd data={buildWebsiteJsonLd(siteUrl)} />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
            >
              {dictionary.common.skipToContent}
            </a>
            <Navbar locale={locale} dictionary={dictionary} />
            <main id="main-content" className="flex-1 pt-18">
              {children}
            </main>
            <Footer locale={locale} dictionary={dictionary} />
            <CookieConsent locale={locale} dictionary={dictionary.cookieConsent} />
            <Analytics />
          </ConsentProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
