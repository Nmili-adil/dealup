"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useConsent } from "@/lib/consent/consent-provider";
import { ConsentGate } from "@/lib/consent/consent-gate";

/**
 * Third-party measurement tags, each gated on the consent category that the
 * cookie policy (/cookies) declares it under:
 *
 *   analytics -> Google Analytics 4 (_ga, _gid, _gat)
 *   marketing -> Meta Pixel        (_fbp, _fbc)
 *
 * Nothing loads before the visitor opts in, so no vendor cookie is written on
 * a first visit. Withdrawing consent stops collection on the spot (the tag
 * cannot be un-loaded once evaluated) and deletes the cookies it already set.
 *
 * IDs come from the build-time env vars in `.env.example`; an unset ID simply
 * renders nothing, which is what keeps preview/dev builds untracked.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const GA_COOKIE_PREFIXES = ["_ga", "_gid", "_gat"];
const META_COOKIE_PREFIXES = ["_fbp", "_fbc"];

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
    _fbq?: unknown;
  }
}

export function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <MetaPixel />
    </>
  );
}

function GoogleAnalytics() {
  const { allows } = useConsent();
  const allowed = allows("analytics");

  // gtag.js stays resident once evaluated, so revocation flips Google's
  // official kill switch instead of relying on unmounting the <Script>.
  useEffect(() => {
    if (!GA_ID) return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !allowed;
    if (!allowed) clearCookies(GA_COOKIE_PREFIXES);
  }, [allowed]);

  if (!GA_ID) return null;

  return (
    <ConsentGate category="analytics">
      <Script
        id="ga-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GA_ID}');`}
      </Script>
    </ConsentGate>
  );
}

function MetaPixel() {
  const { allows } = useConsent();
  const allowed = allows("marketing");
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  // fbq keeps running once loaded; 'revoke' is Meta's supported off switch.
  useEffect(() => {
    if (!PIXEL_ID) return;
    window.fbq?.("consent", allowed ? "grant" : "revoke");
    if (!allowed) clearCookies(META_COOKIE_PREFIXES);
  }, [allowed]);

  // The pixel snippet only fires PageView on the initial evaluation; App
  // Router navigations are client-side, so each route change needs its own.
  useEffect(() => {
    if (!PIXEL_ID || !allowed) return;
    if (lastPath.current === null) {
      lastPath.current = pathname; // the snippet already counted this one
      return;
    }
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    window.fbq?.("track", "PageView");
  }, [allowed, pathname]);

  if (!PIXEL_ID) return null;

  return (
    <ConsentGate category="marketing">
      {/* No <noscript> fallback pixel: it would fire for JS-disabled visitors,
          who can never reach the consent banner to allow it. */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
fbq('track','PageView');`}
      </Script>
    </ConsentGate>
  );
}

/**
 * Expire every cookie whose name starts with one of `prefixes`. Vendor cookies
 * are set on the registrable domain, so each candidate scope has to be tried —
 * a delete only takes effect on an exact path/domain match.
 */
function clearCookies(prefixes: string[]): void {
  if (typeof document === "undefined") return;

  const { hostname } = window.location;
  const labels = hostname.split(".");
  const domains = [
    undefined,
    hostname,
    ...(labels.length > 2 ? [`.${labels.slice(-2).join(".")}`] : [`.${hostname}`]),
  ];

  for (const cookie of document.cookie.split("; ")) {
    const name = cookie.split("=")[0];
    if (!prefixes.some((prefix) => name === prefix || name.startsWith(`${prefix}_`))) continue;

    for (const domain of domains) {
      document.cookie =
        `${name}=; path=/; max-age=0; SameSite=Lax` +
        (domain ? `; domain=${domain}` : "");
    }
  }
}
