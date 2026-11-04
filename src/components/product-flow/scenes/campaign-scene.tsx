"use client";

import { motion } from "motion/react";
import { Check, CheckCheck, Send, Users } from "lucide-react";
import { Mockup } from "@/components/product/mockup";
import { Currency } from "@/lib/currency/currency-provider";
import { AnimatedNumber } from "../animated-number";
import { FLOW_DATA, FLOW_EASE } from "../flow-stages";
import { Chip, Rise, ScreenFrame, Stat, Toolbar } from "./scene-parts";
import type { FlowCopy } from "../flow-copy";

/**
 * Chapter 01 — the campaign is composed and sent.
 *
 * Beats: the composer settles, the audience counts up, the WhatsApp preview
 * slides in, the send button is pressed, then status walks Ready → Sending →
 * Delivered while the progress bar fills.
 */
export function CampaignScene({
  copy,
  ui,
  locale,
  beat,
}: {
  copy: FlowCopy["campaign"];
  ui: FlowCopy["ui"];
  locale: string;
  beat: number;
}) {
  const pressed = beat >= 7;
  const sending = beat >= 8;
  const delivered = beat >= 14;

  return (
    <ScreenFrame
      title={copy.panelTitle}
      active={1}
      trailing={
        <Chip tone={delivered ? "mint" : sending ? "amber" : "neutral"}>
          {delivered ? copy.statusDelivered : sending ? copy.statusSending : copy.statusReady}
        </Chip>
      }
    >
      <div className="grid h-full grid-cols-[1.15fr_1fr] gap-[1.1em]">
        <div className="flex min-w-0 flex-col gap-[0.7em]">
          <Rise delay={0.05} className="flex items-center justify-between">
            <p className="text-[1em] font-semibold tracking-tight">{copy.name}</p>
            <span className="text-[0.7em] text-text-secondary">{copy.scheduleValue}</span>
          </Rise>

          <Rise delay={0.14} className="grid grid-cols-3 gap-[0.5em]">
            <Stat label={copy.audienceLabel}>
              <AnimatedNumber value={FLOW_DATA.recipients} locale={locale} active duration={900} />
            </Stat>
            <Stat label={copy.templateLabel}>
              <span className="text-[0.8em] font-medium">{copy.templateValue}</span>
            </Stat>
            <Stat label={copy.scheduleLabel}>
              <span className="text-[0.8em] font-medium">{copy.scheduleValue}</span>
            </Stat>
          </Rise>

          {/* Recipient rows, so the audience figure has something behind it. */}
          <Rise delay={0.17} className="grid grid-cols-3 gap-[0.5em]">
            {copy.kpis.map((kpi) => (
              <span key={kpi.label} className="flex items-center justify-between rounded-[0.4em] bg-black/3 px-[0.6em] py-[0.35em]">
                <span className="text-[0.62em] text-text-secondary">{kpi.label}</span>
                <span dir="ltr" className="text-[0.7em] font-semibold tabular-nums">{kpi.value}</span>
              </span>
            ))}
          </Rise>

          <Rise delay={0.19}>
            <Toolbar search={ui.search} chips={[ui.filterAll, ui.filterActive]} />
          </Rise>

          <Rise delay={0.2} className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[0.5em] border border-black/6 bg-white">
            <span className="flex items-center gap-[0.6em] border-b border-black/6 bg-black/2 px-[0.7em] py-[0.4em]">
              <span className="size-[0.75em] shrink-0 rounded-[0.15em] border border-black/20" />
              <span className="min-w-0 flex-1 text-[0.6em] font-semibold uppercase tracking-[0.08em] text-text-secondary">
                {copy.segmentsHeadName}
              </span>
              <span className="text-[0.6em] font-semibold uppercase tracking-[0.08em] text-text-secondary">
                {copy.segmentsHeadCount}
              </span>
              <span className="w-[0.9em] shrink-0" />
            </span>
            {copy.segments.map((segment, i) => (
              <span
                key={segment.name}
                className="flex items-center gap-[0.6em] border-b border-black/5 px-[0.7em] py-[0.55em] last:border-b-0"
              >
                <span className="grid size-[0.75em] shrink-0 place-items-center rounded-[0.15em] bg-brand text-white">
                  <Check className="size-[0.6em]" strokeWidth={4} />
                </span>
                <span className="size-[1.1em] shrink-0 rounded-full bg-brand/12" />
                <span className="min-w-0 flex-1 truncate text-[0.72em] font-medium">{segment.name}</span>
                <span dir="ltr" className="text-[0.7em] tabular-nums text-text-secondary">{segment.count}</span>
                <motion.span
                  animate={{ opacity: delivered ? 1 : sending && i === 0 ? 1 : 0.25 }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                >
                  <CheckCheck className="size-[0.9em] text-brand-hover" />
                </motion.span>
              </span>
            ))}
            <span className="mt-auto flex items-center gap-[0.6em] border-t border-black/6 bg-black/2 px-[0.7em] py-[0.4em]">
              <span className="shrink-0 text-[0.58em] text-text-secondary">{ui.page}</span>
              <span className="min-w-0 flex-1 text-end text-[0.65em] font-semibold">{copy.totalLabel}</span>
              <span dir="ltr" className="text-[0.68em] font-semibold tabular-nums">
                <AnimatedNumber value={FLOW_DATA.recipients} locale={locale} active duration={0} />
              </span>
              <span className="w-[0.9em] shrink-0" />
            </span>
          </Rise>

          <Rise delay={0.28} className="flex items-center gap-[0.9em]">
            {[
              { label: copy.statusReady, on: true },
              { label: copy.statusSending, on: sending },
              { label: copy.statusDelivered, on: delivered },
            ].map((step) => (
              <span key={step.label} className="flex items-center gap-[0.4em]">
                <motion.span
                  animate={{ backgroundColor: step.on ? "#20c66a" : "#e4e7ec" }}
                  transition={{ duration: 0.35 }}
                  className="size-[0.5em] shrink-0 rounded-full"
                />
                <motion.span
                  animate={{ opacity: step.on ? 1 : 0.4 }}
                  transition={{ duration: 0.35 }}
                  className="text-[0.7em] font-medium"
                >
                  {step.label}
                </motion.span>
              </span>
            ))}
          </Rise>

          <Rise delay={0.22} className="flex items-center gap-[0.8em]">
            <motion.span
              animate={pressed ? { scale: [1, 0.95, 1] } : { scale: 1 }}
              transition={{ duration: 0.32, ease: FLOW_EASE }}
              className="inline-flex shrink-0 items-center gap-[0.4em] rounded-[0.5em] bg-brand-dark px-[0.9em] py-[0.55em] text-[0.75em] font-semibold text-white shadow-brand"
            >
              <Send className="size-[0.9em]" />
              {copy.sendCta}
            </motion.span>
            <span className="flex min-w-0 flex-1 flex-col gap-[0.3em]">
              <span className="h-[0.35em] overflow-hidden rounded-full bg-black/8">
                <motion.span
                  className="block h-full rounded-full bg-brand"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: sending ? 1 : 0 }}
                  transition={{ duration: sending ? 1.6 : 0, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
              <motion.span
                animate={{ opacity: sending ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-[0.3em] text-[0.65em] text-text-secondary"
              >
                <Users className="size-[0.8em]" />
                <AnimatedNumber
                  value={delivered ? FLOW_DATA.delivered : 0}
                  locale={locale}
                  active={sending}
                  duration={1400}
                />
                {" / "}
                <AnimatedNumber value={FLOW_DATA.recipients} locale={locale} active duration={0} />
                {" "}
                {copy.deliveredLabel}
              </motion.span>
            </span>
          </Rise>
        </div>

        {/* The exact message the phone receives a beat later. */}
        <Rise delay={0.34} className="flex min-w-0 flex-col rounded-[0.5em] border border-black/6 bg-[#e9e2d8]">
          <p className="border-b border-black/8 px-[0.7em] py-[0.5em] text-[0.62em] font-semibold uppercase tracking-[0.1em] text-text-secondary">
            {copy.previewTitle}
          </p>
          <div className="flex min-h-0 flex-1 flex-col gap-[0.4em] p-[0.7em]">
            {/* WhatsApp templates carry a media header; this is that image. */}
            <div className="overflow-hidden rounded-[0.6em] rounded-ss-[0.2em] bg-white shadow-e1">
              <Mockup
                name="product-bag"
                alt={copy.productAlt}
                ratio="398 / 164"
                sizes="(max-width: 1024px) 22vw, 13vw"
                className="w-full object-cover"
              />
              <span className="flex items-baseline justify-between gap-[0.4em] px-[0.7em] pt-[0.45em]">
                <span className="min-w-0 truncate text-[0.7em] font-semibold text-neutral-900">
                  {copy.productName}
                </span>
                <span dir="ltr" className="shrink-0 text-[0.68em] font-semibold text-neutral-900">
                  <Currency text={copy.productPrice} />
                </span>
              </span>
              <p className="px-[0.7em] pb-[0.5em] pt-[0.25em] text-[0.7em] leading-snug text-neutral-900">
                {copy.message}
              </p>
            </div>
            {copy.quickReplies.map((reply) => (
              <span
                key={reply}
                className="rounded-[0.4em] bg-white/85 py-[0.4em] text-center text-[0.68em] font-medium text-[#0a7cff] shadow-e1"
              >
                {reply}
              </span>
            ))}
            <motion.span
              animate={{ opacity: delivered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-auto flex items-center justify-end gap-[0.3em] text-[0.62em] text-text-secondary"
            >
              {copy.statusDelivered}
              <CheckCheck className="size-[0.85em] text-brand-hover" />
            </motion.span>
          </div>
        </Rise>
      </div>
    </ScreenFrame>
  );
}
