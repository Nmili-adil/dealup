import Image from "next/image";
import { ArrowUpRight, Check, ShieldCheck, Wallet, Webhook } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Copy = Dictionary["whatsappMarketing"];

/** The platforms named in the stack column, from the brand marks we ship. */
const LOGOS = [
  { label: "Shopify", src: "/assets/logos/shopify.svg" },
  { label: "WooCommerce", src: "/assets/logos/woocommerce.svg" },
  { label: "WordPress", src: "/assets/logos/wordpress.svg" },
  { label: "Google Sheets", src: "/assets/logos/google-sheets.svg" },
  { label: "Zapier", src: "/assets/logos/zapier.svg" },
  { label: "Make", src: "/assets/logos/make.svg" },
];

/** Three practical columns: how to send, what it connects to, what it costs. */
export function WmOperating({
  responsibly,
  stack,
  fees,
}: {
  responsibly: Copy["responsibly"];
  stack: Copy["stack"];
  fees: Copy["fees"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="wm-operating-title">
      <h2 id="wm-operating-title" className="sr-only">
        {responsibly.title}
      </h2>

      <div className="grid gap-5 lg:grid-cols-3">
        <MotionReveal>
          <div className="h-full rounded-2xl border border-border/80 bg-white p-6 shadow-e1">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-surface-mint text-brand-hover">
              <ShieldCheck className="size-5" strokeWidth={1.8} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-text-primary">
              <GradientText>{responsibly.title}</GradientText>
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {responsibly.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-text-secondary">
                  <Check className="mt-1 size-3.5 shrink-0 text-brand-hover" strokeWidth={3} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <div className="h-full rounded-2xl border border-border/80 bg-white p-6 shadow-e1">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-surface-mint text-brand-hover">
              <Webhook className="size-5" strokeWidth={1.8} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-text-primary">
              <GradientText>{stack.title}</GradientText>
            </h3>
            <p className="mt-2 text-sm leading-6 text-text-secondary">{stack.description}</p>
            <ul className="mt-4 grid grid-cols-3 gap-2">
              {LOGOS.map((logo) => (
                <li
                  key={logo.label}
                  className="flex h-14 items-center justify-center rounded-xl border border-border bg-white p-2.5"
                >
                  <Image
                    src={logo.src}
                    alt={logo.label}
                    width={120}
                    height={34}
                    className="max-h-6 w-auto max-w-full object-contain"
                  />
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-text-secondary">{stack.moreLabel}</p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.16}>
          <div className="h-full rounded-2xl border border-border/80 bg-white p-6 shadow-e1">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-xl bg-surface-mint text-brand-hover">
              <Wallet className="size-5" strokeWidth={1.8} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-text-primary">
              <GradientText>{fees.title}</GradientText>
            </h3>
            <p className="mt-2 text-sm leading-6 text-text-secondary">{fees.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {fees.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border bg-surface-mint/60 px-3 py-1 text-xs font-medium text-brand-hover"
                >
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://developers.facebook.com/docs/whatsapp/pricing/"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-hover hover:underline"
            >
              {fees.linkLabel}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </a>
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}
