"use client";

import { motion } from "motion/react";
import { Send, Sparkles } from "lucide-react";
import { FLOW_EASE } from "../flow-stages";
import { Chip, Rise, ScreenFrame } from "./scene-parts";
import { Currency } from "@/lib/currency/currency-provider";
import type { FlowCopy } from "../flow-copy";

/**
 * Chapter 04 — the same conversation moves into the shared inbox and a named
 * agent picks it up, so the handover reads as continuous rather than a reset.
 */
export function HandoffScene({
  copy,
  ui,
  beat,
}: {
  copy: FlowCopy["handoff"];
  ui: FlowCopy["ui"];
  beat: number;
}) {
  const joined = beat >= 8;
  const typing = beat >= 10 && beat < 14;
  const replied = beat >= 14;

  return (
    <ScreenFrame title={copy.panelTitle} active={2} trailing={<Chip tone="mint">{copy.orderValue}</Chip>}>
      <div className="grid h-full grid-cols-[0.72fr_1.28fr_0.62fr] gap-[0.8em]">
        {/* Conversation list */}
        <div className="flex min-w-0 flex-col overflow-hidden rounded-[0.5em] border border-black/6 bg-white">
          <span className="flex items-center justify-between border-b border-black/6 px-[0.7em] py-[0.5em]">
            <span className="text-[0.66em] font-semibold uppercase tracking-[0.08em] text-text-secondary">
              {copy.listLabel}
            </span>
            <span className="rounded-full bg-brand/12 px-[0.45em] text-[0.6em] font-semibold text-brand-hover">
              {copy.contacts.length}
            </span>
          </span>
          <span className="flex items-center gap-[0.3em] border-b border-black/6 px-[0.5em] py-[0.35em]">
            {[ui.filterAll, ui.tabUnassigned, ui.tabMine].map((tab, i) => (
              <span
                key={tab}
                className={
                  "rounded-[0.3em] px-[0.4em] py-[0.2em] text-[0.56em] font-medium " +
                  (i === 0 ? "bg-brand-dark text-white" : "text-text-secondary")
                }
              >
                {tab}
              </span>
            ))}
          </span>
          {copy.contacts.map((contact, i) => (
            <Rise
              key={contact.name}
              delay={0.06 + i * 0.07}
              className={`flex items-center gap-[0.5em] border-b border-black/5 px-[0.6em] py-[0.5em] last:border-b-0 ${
                i === 0 ? "bg-surface-mint" : ""
              }`}
            >
              <span className="grid size-[1.5em] shrink-0 place-items-center rounded-full bg-brand/15 text-[0.6em] font-semibold text-brand-hover">
                {contact.initials}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[0.7em] font-semibold">{contact.name}</span>
                <span className="truncate text-[0.62em] text-text-secondary">{contact.preview}</span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-[0.2em]">
                <span dir="ltr" className="text-[0.58em] tabular-nums text-text-secondary">{contact.time}</span>
                <span className="rounded-full bg-black/5 px-[0.4em] text-[0.55em] font-medium text-text-secondary">
                  {contact.state}
                </span>
              </span>
            </Rise>
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-[0.5em]">
          {/* What the AI already worked out, so the agent has context. */}
          <Rise delay={0.18} className="rounded-[0.45em] border border-ai/25 bg-ai/6 px-[0.7em] py-[0.5em]">
            <span className="flex items-center gap-[0.35em] text-[0.6em] font-semibold uppercase tracking-[0.08em] text-ai">
              <Sparkles className="size-[0.8em]" />
              {copy.summaryTitle}
            </span>
            <p className="mt-[0.2em] text-[0.68em] leading-snug text-text-primary">{copy.summaryBody}</p>
          </Rise>

          <div className="flex min-h-0 flex-1 flex-col justify-end gap-[0.35em] rounded-[0.45em] bg-[#e9e2d8] p-[0.6em]">
            <span className="max-w-[86%] self-end rounded-[0.55em] rounded-se-[0.2em] bg-[#d9fdd3] px-[0.7em] py-[0.4em] text-[0.68em] leading-snug text-neutral-900">
              {copy.businessMessage}
            </span>
            <span className="max-w-[86%] self-start rounded-[0.55em] rounded-ss-[0.2em] bg-white px-[0.7em] py-[0.4em] text-[0.68em] leading-snug text-neutral-900">
              {copy.customerMessage}
            </span>

            <motion.span
              animate={{ opacity: typing ? 1 : 0, height: typing ? "auto" : 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-[0.25em] self-end overflow-hidden rounded-[0.55em] bg-[#d9fdd3] px-[0.7em] py-[0.35em]"
            >
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="size-[0.35em] rounded-full bg-neutral-500 animate-[demo-typing_1s_ease-in-out_infinite]"
                  style={{ animationDelay: `${dot * 0.16}s` }}
                />
              ))}
            </motion.span>

            <motion.span
              initial={false}
              animate={{ opacity: replied ? 1 : 0, y: replied ? 0 : 6 }}
              transition={{ duration: 0.45, ease: FLOW_EASE }}
              className="max-w-[86%] self-end rounded-[0.55em] rounded-se-[0.2em] bg-[#d9fdd3] px-[0.7em] py-[0.4em] text-[0.68em] leading-snug text-neutral-900"
            >
              {copy.agentReply}
            </motion.span>
          </div>

          <div className="flex items-center gap-[0.5em]">
            {/* The agent arriving. */}
            <motion.div
              initial={false}
              animate={{ opacity: joined ? 1 : 0, y: joined ? 0 : 8 }}
              transition={{ duration: 0.5, ease: FLOW_EASE }}
              className="flex shrink-0 items-center gap-[0.4em] rounded-[0.45em] border border-brand/35 bg-surface-mint px-[0.6em] py-[0.45em]"
            >
              <span className="grid size-[1.4em] shrink-0 place-items-center rounded-full bg-brand-dark text-[0.58em] font-semibold text-white">
                {copy.agentInitials}
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="text-[0.66em] font-semibold text-text-primary">{copy.agentName}</span>
                <span className="text-[0.58em] text-brand-hover">{copy.joinedLabel}</span>
              </span>
            </motion.div>
            <span className="flex min-w-0 flex-1 items-center justify-between rounded-full border border-black/8 bg-white px-[0.8em] py-[0.45em]">
              <span className="text-[0.66em] text-text-secondary">{copy.composer}</span>
              <Send className="size-[0.8em] text-brand-hover" />
            </span>
          </div>
        </div>

        {/* Customer context, the third pane every shared inbox has. */}
        <Rise delay={0.3} className="flex min-w-0 flex-col overflow-hidden rounded-[0.5em] border border-black/6 bg-white">
          <span className="border-b border-black/6 px-[0.6em] py-[0.45em] text-[0.6em] font-semibold uppercase tracking-[0.08em] text-text-secondary">
            {copy.contextLabel}
          </span>
          <span className="flex flex-col items-center gap-[0.25em] border-b border-black/6 py-[0.6em]">
            <span className="grid size-[2.1em] place-items-center rounded-full bg-brand/15 text-[0.7em] font-semibold text-brand-hover">
              {copy.contacts[0].initials}
            </span>
            <span className="text-[0.68em] font-semibold">{copy.contacts[0].name}</span>
          </span>
          <div className="flex min-h-0 flex-1 flex-col">
            {copy.context.map((row) => (
              <span key={row.label} className="flex flex-col gap-[0.1em] border-b border-black/5 px-[0.6em] py-[0.4em] last:border-b-0">
                <span className="text-[0.58em] text-text-secondary">{row.label}</span>
                <span dir="ltr" className="truncate text-[0.64em] font-medium rtl:text-end"><Currency text={row.value} /></span>
              </span>
            ))}
          </div>
        </Rise>
      </div>
    </ScreenFrame>
  );
}
