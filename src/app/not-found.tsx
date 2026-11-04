import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotFoundView } from "@/components/sections/not-found-view";
import { defaultLocale, isRtl } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/**
 * The site's 404, for URLs that match no route at all.
 *
 * Only `app/not-found.tsx` catches globally unmatched URLs — one nested in a
 * route group handles just that group. The app has no single `app/layout.tsx`
 * (the `(root)` and `[locale]` groups each provide their own root layout), so
 * Next wraps this in its built-in `DefaultLayout`. That layout owns `<html>`
 * and `<body>`: rendering our own here hydrates as a mismatch. Hence the
 * stylesheet import and the font/`dir` wrapper below, rather than a document.
 *
 * With `output: "export"` this becomes `out/404.html`, which static hosts serve
 * for unknown paths. The locale is unknowable here — the URL matched nothing —
 * so it uses the default locale, the same choice `/` makes when it redirects.
 */
export default async function NotFound() {
  const dictionary = await getDictionary(defaultLocale);

  return (
    <div
      lang={defaultLocale}
      dir={isRtl(defaultLocale) ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
    >
      <NotFoundView locale={defaultLocale} dictionary={dictionary.notFound} standalone />
    </div>
  );
}
