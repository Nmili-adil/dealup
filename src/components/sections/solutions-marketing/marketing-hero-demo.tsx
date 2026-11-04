"use client";

import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Braces,
  Camera,
  CheckCheck,
  ChevronLeft,
  CornerUpLeft,
  Eye,
  Lock,
  Mic,
  MousePointerClick,
  Phone,
  Plus,
  Reply,
  Send,
  Sparkles,
  TrendingUp,
  TvMinimalPlay,
  Users,
  Video,
} from "lucide-react";
import { ChatBubble } from "@/components/product/chat-bubble";
import { Mockup } from "@/components/product/mockup";
import { PanelStat } from "@/components/product/panel-stat";
import { PhoneMockup } from "@/components/product/phone-mockup";
import { useDemoLoop } from "@/components/product/use-demo-loop";
import { Currency } from "@/lib/currency/currency-provider";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type HeroCopy = Dictionary["marketingSolution"]["hero"];

/** Stage beats: agent typing → message + replies → customer typing → reply.
 *  The last beat doubles as the hold on the finished thread. */
const TYPING_MS = 1000;
const LANDED_MS = 2000;
const REPLY_MS = 1000;
const LOOP_PAUSE_MS = 2600;
const DURATIONS = [TYPING_MS, LANDED_MS, REPLY_MS, LOOP_PAUSE_MS] as const;

/**
 * One consistent campaign. Every rate shown in the panel is derived from these
 * so the numbers survive scrutiny: 2,438 of 3,090 reached (79%), and read /
 * replied / clicked are all shares of what was delivered.
 */
const AUDIENCE_TOTAL = 3090;
const DELIVERED_TARGET = 2438;
const READ_TARGET = 1925;
const REPLIED_TARGET = 412;
const CLICKED_TARGET = 268;

const formatCount = (n: number) => n.toLocaleString("en-US");

/**
 * Eased count-up while `active`; used for the live delivery numbers.
 *
 * Restarts from zero whenever `active` becomes true again, and renders zero
 * outright while it is false. State only ever changes inside `requestAnimationFrame`
 * callbacks — never synchronously from the effect body — so the sequence stays
 * free of cascading renders (the same discipline as the phone-thread beats in
 * this file and in `phone-automation-chat.tsx`).
 *
 * The deactivation reset is itself deferred one frame so the value renders as
 * zero immediately and the reset cannot paint a stale finished number between
 * re-activations.
 */
function useCountUp(active: boolean, target: number, duration = 750) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      const raf = requestAnimationFrame(() => setCount(0));
      return () => cancelAnimationFrame(raf);
    }

    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (start === 0) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, duration, target]);

  return active ? count : 0;
}

/**
 * The hero mockup: a WhatsApp broadcast that plays itself, message by message,
 * with the customer's quick replies and reply landing — and, beside the phone,
 * a live campaign panel whose funnel ticks up as the thread progresses.
 *
 * The phone is the shared `PhoneMockup` at its fixed 360×710, scaled down
 * through `--phone-s` inside a reserved box (the same technique as the home
 * workflow section) so the frame keeps its proportions and the panel has room
 * to sit beside it rather than on top of it.
 *
 * Runs only while visible, and under `prefers-reduced-motion` renders the whole
 * thread and final numbers at once so the story is still readable without
 * movement. The unit is decorative (the copy beside it carries the meaning), so
 * it is exposed to assistive tech as a single labelled image.
 */
export function MarketingHeroDemo({ copy }: { copy: HeroCopy }) {
  const { ref: rootRef, stage, staticMode } = useDemoLoop(DURATIONS);

  // Stage → what is on screen. Static mode shows the finished conversation.
  const typingAgent = !staticMode && stage === 0;
  const showAgent = staticMode || stage >= 1;
  const typingCustomer = !staticMode && stage === 2;
  const showCustomer = staticMode || stage >= 3;
  const read = staticMode || stage >= 3;

  const animate = !staticMode;
  const deliveredCount = useCountUp(showAgent && animate, DELIVERED_TARGET);
  const readCount = useCountUp(read && animate, READ_TARGET);
  const repliedCount = useCountUp(read && animate, REPLIED_TARGET);
  const clickedCount = useCountUp(read && animate, CLICKED_TARGET);

  /**
   * Settled figures win once the count-up lands, so the panel never sticks a
   * frame short of the real number. The rate is withheld until then — a final
   * percentage beside a still-counting value would be arithmetic that does not
   * add up on screen.
   */
  const stat = (count: number, target: number, of: number) => {
    const settled = staticMode || count >= target;
    return {
      value: settled ? formatCount(target) : formatCount(count),
      rate: settled ? `${Math.round((target / of) * 100)}%` : undefined,
    };
  };

  const delivered = stat(deliveredCount, DELIVERED_TARGET, AUDIENCE_TOTAL);
  const readStat = stat(readCount, READ_TARGET, DELIVERED_TARGET);
  const replied = stat(repliedCount, REPLIED_TARGET, DELIVERED_TARGET);
  const clicked = stat(clickedCount, CLICKED_TARGET, DELIVERED_TARGET);
  const sendProgress = Math.round((DELIVERED_TARGET / AUDIENCE_TOTAL) * 100);

  const typingDots = (side: "start" | "end") => (
    <span
      className={cn(
        "flex items-center gap-1 px-2",
        side === "end" ? "self-end" : "self-start"
      )}
    >
      {[0, 1, 2].map((dot) => (
        <span
          key={dot}
          className="size-1.5 animate-[demo-typing_1s_ease-in-out_infinite] rounded-full bg-white/40"
          style={{ animationDelay: `${dot * 0.16}s` }}
        />
      ))}
    </span>
  );

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={copy.visualNote}
      className="relative mx-auto w-fit"
    >
      <div aria-hidden="true">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-5">
          {/* Reserved box for the scaled phone: `PhoneMockup` is a fixed
              360×710, so the wrapper holds the scaled footprint and the frame
              is transformed inside it. */}
          <div className="relative h-[calc(710px*var(--phone-s))] w-[calc(360px*var(--phone-s))] shrink-0 [--phone-s:0.66] sm:[--phone-s:0.74] lg:[--phone-s:0.78]">
            <span className="pointer-events-none absolute inset-x-[12%] bottom-[3%] -z-10 h-16 rounded-[50%] bg-brand-dark/22 blur-3xl" />

            <div
              className="absolute start-0 top-0 origin-top-left rtl:origin-top-right"
              style={{ transform: "scale(var(--phone-s))" }}
            >
              <PhoneMockup>
                {/* 646 = PhoneMockup's min-h-[690px] screen less its pt-11 status bar.
                    A definite height is what lets the thread crop from the top. */}
                <div className="flex h-[646px] flex-col bg-[#0b141a]">
                  {/* Chat header, as the customer's device shows it */}
                  <div className="flex shrink-0 items-center gap-2 border-b border-white/5 bg-[#101d25] px-3 pb-2.5 pt-1.5">
                    <ChevronLeft className="size-4 shrink-0 text-white/55" aria-hidden="true" />
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/25 text-[13px] font-semibold text-brand">
                      AL
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1">
                        <span className="truncate text-[13px] font-semibold text-white">
                          {copy.chatTitle}
                        </span>
                        <BadgeCheck
                          className="size-3.5 shrink-0 text-brand"
                          strokeWidth={2.4}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="block truncate text-[11px] text-white/45">
                        {copy.broadcastLabel}
                      </span>
                    </span>
                    <Video className="size-4 shrink-0 text-white/45" aria-hidden="true" />
                    <Phone className="size-4 shrink-0 text-white/45" aria-hidden="true" />
                  </div>

                  {/* Thread, anchored to the bottom the way a real chat sits */}
                  <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
                    <span className="mx-auto flex items-center gap-1 rounded-md bg-[#182b34] px-2 py-1 text-center text-[9px] leading-3 text-[#ffd279]/80">
                      <Lock className="size-2.5 shrink-0" aria-hidden="true" />
                      {copy.encryptionNote}
                    </span>

                    {/* Prior conversation. The broadcast lands in a thread this
                        customer already has with the shop, which is what makes
                        the opt-in credible — and it fills the frame the way a
                        real chat is filled. `overflow-hidden` with the thread
                        anchored to the bottom crops the oldest turns, exactly
                        as a scrolled chat does. */}
                    <span className="mx-auto rounded-md bg-[#182b34] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.08em] text-white/50">
                      {copy.historyDate}
                    </span>

                    {copy.history.map((turn) => {
                      const incoming = turn.from === "customer";
                      return (
                        <ChatBubble key={turn.time} from={incoming ? "customer" : "agent"}>
                          <span className="text-[13px]">{turn.text}</span>
                          <span
                            className={cn(
                              "mt-0.5 flex items-center justify-end gap-1 text-[10px]",
                              incoming ? "text-text-secondary" : "text-white/70"
                            )}
                          >
                            {turn.time}
                            {incoming ? null : <CheckCheck className="size-3 text-sky-400" />}
                          </span>
                        </ChatBubble>
                      );
                    })}

                    <span className="mx-auto rounded-md bg-[#182b34] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.08em] text-white/50">
                      {copy.dateDivider}
                    </span>

                    {showAgent ? (
                      <div className="flex animate-[demo-row-in_0.32s_ease-out_both] justify-end">
                        <div className="w-[84%] overflow-hidden rounded-2xl rounded-se-sm bg-brand text-white shadow-sm">
                          {/* Template media header — the campaign creative the
                              template was composed with, as the customer
                              receives it. Same asset and framing as the
                              campaign scene in `phone-screen.tsx`. */}
                          <div className="relative h-[84px] overflow-hidden">
                            <Mockup
                              name="campaign-creative-fashion"
                              alt={copy.templateImageAlt}
                              ratio="12 / 5"
                              sizes="260px"
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                            {/* Scrim, so the caption holds up over the photo. */}
                            <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />
                            <span className="absolute end-2 top-2 rounded-full bg-white/95 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-brand-dark shadow-sm">
                              {copy.templateHeaderTitle}
                            </span>
                            <span className="absolute inset-x-2.5 bottom-2 text-[10px] font-semibold leading-3 text-white">
                              {copy.templateHeaderSubtitle}
                            </span>
                          </div>

                          <div className="px-3 pb-2 pt-2">
                            <p className="text-[13px] leading-[1.45]">{copy.messageText}</p>
                            <p className="mt-1.5 text-[10px] leading-3 text-white/60">
                              {copy.templateFooter}
                            </p>
                            <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/70">
                              {copy.agentTime}
                              <CheckCheck
                                className={cn(
                                  "size-3 transition-colors duration-500",
                                  read ? "text-sky-400" : "text-white/45"
                                )}
                              />
                            </span>
                          </div>

                          {/* Quick replies sit attached under the body, split by
                              hairlines — how WhatsApp renders template buttons. */}
                          <div className="border-t border-white/20">
                            {copy.replyOptions.map((option, index) => (
                              <span
                                key={option}
                                className={cn(
                                  "flex animate-[demo-row-in_0.4s_ease-out_both] items-center justify-center gap-1.5 py-2 text-[12px] font-semibold text-white",
                                  index > 0 && "border-t border-white/20"
                                )}
                              >
                                <CornerUpLeft className="size-3" aria-hidden="true" />
                                <Currency text={option} />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {typingAgent ? typingDots("end") : null}

                    {showCustomer ? (
                      <div className="animate-[demo-row-in_0.32s_ease-out_both]">
                        <ChatBubble from="customer">
                          <Currency text={copy.customerMessage} />
                          <span className="mt-1 flex justify-end text-[10px] text-text-secondary">
                            {copy.customerTime}
                          </span>
                        </ChatBubble>
                      </div>
                    ) : null}

                    {typingCustomer ? typingDots("start") : null}
                  </div>

                  {/* Composer — the strip that makes the frame read as a live
                      chat rather than a cropped screenshot. */}
                  <div className="flex shrink-0 items-center gap-2 px-3 pb-6 pt-1">
                    <span className="flex h-9 flex-1 items-center gap-2 rounded-full bg-[#1f2c33] px-3">
                      <Plus className="size-4 shrink-0 text-white/45" aria-hidden="true" />
                      <span className="flex-1 truncate text-[12px] text-white/35">
                        {copy.composerPlaceholder}
                      </span>
                      <Camera className="size-4 shrink-0 text-white/45" aria-hidden="true" />
                    </span>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Mic className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </PhoneMockup>
            </div>
          </div>

          {/* Live campaign panel, synced to the same beats */}
          <div className="hidden w-[276px] shrink-0 lg:block lg:mt-6">
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-white/95 shadow-e4 backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full bg-[#28c840] transition-opacity duration-500",
                    read ? "opacity-100" : "opacity-60"
                  )}
                />
                <span className="min-w-0 flex-1 truncate text-xs font-semibold text-text-primary">
                  {copy.floaterTitle}
                </span>
                <span className="shrink-0 rounded-full bg-surface-mint px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-brand-hover">
                  {copy.panelStatus}
                </span>
              </div>

              <div className="space-y-3 p-3.5">
                <p className="text-[11px] leading-4 text-text-secondary">
                  {copy.floaterSummary}
                </p>

                <div className="rounded-lg bg-surface-mint/70 px-2.5 py-2">
                  <span className="flex items-center gap-1.5 text-[10px] font-medium text-text-secondary">
                    <Users className="size-3 shrink-0 text-brand-hover" aria-hidden="true" />
                    {copy.audienceLabel}
                  </span>
                  <span className="mt-0.5 block text-[11px] font-semibold text-text-primary">
                    {copy.audienceValue}
                  </span>
                  <span className="mt-1.5 flex flex-wrap gap-1">
                    {copy.segments.map((segment) => (
                      <span
                        key={segment}
                        className="rounded-full border border-brand/25 bg-white px-1.5 py-0.5 text-[9px] font-medium text-brand-hover"
                      >
                        {segment}
                      </span>
                    ))}
                  </span>
                </div>

                <div>
                  <span className="block h-1.5 overflow-hidden rounded-full bg-border/70">
                    <span
                      className="block h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
                      style={{ width: showAgent || staticMode ? `${sendProgress}%` : "0%" }}
                    />
                  </span>
                  <span className="mt-1 block text-[10px] tabular-nums text-text-secondary">
                    {copy.progressLabel}
                  </span>
                </div>

                {/* The merge tags stay visible here — the phone shows them
                    already resolved, so this is where the personalization is
                    legible as a mechanism. */}
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-brand/30 px-2.5 py-1.5">
                  <Braces className="size-3 shrink-0 text-brand-hover" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[9px] font-medium uppercase tracking-[0.06em] text-text-secondary">
                      {copy.personalizationLabel}
                    </span>
                    <span className="block truncate font-mono text-[10px] text-brand-hover">
                      {copy.personalizationValue}
                    </span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <PanelStat icon={Send} label={copy.metricLabels[0]} {...delivered} />
                  <PanelStat icon={Eye} label={copy.metricLabels[1]} {...readStat} />
                  <PanelStat icon={Reply} label={copy.metricLabels[2]} {...replied} />
                  <PanelStat
                    icon={MousePointerClick}
                    label={copy.metricLabels[3]}
                    {...clicked}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-border bg-surface-mint/60 px-3.5 py-2.5">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-brand-hover">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                </span>
                {/* Label on its own line: the trend reads "+18% vs last
                    campaign", which has no room beside a truncating label. */}
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-medium text-text-secondary">
                    {copy.revenueLabel}
                  </span>
                  <span className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="text-[13px] font-semibold tabular-nums text-text-primary">
                      <Currency text={copy.revenueValue} />
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-brand-hover">
                      <TrendingUp className="size-3" aria-hidden="true" />
                      {copy.revenueTrend}
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-text-secondary">
          <TvMinimalPlay className="size-3.5 text-brand-hover" aria-hidden="true" />
          {copy.visualNote}
        </p>
      </div>
    </div>
  );
}
