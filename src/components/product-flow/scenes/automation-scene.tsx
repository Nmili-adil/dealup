"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { AnimatedNumber } from "../animated-number";
import { FLOW_DATA, FLOW_EASE } from "../flow-stages";
import { CheckRow, Chip, Rise, ScreenFrame } from "./scene-parts";
import { Currency } from "@/lib/currency/currency-provider";
import type { FlowCopy } from "../flow-copy";

/**
 * Chapter 03 — the reply is read, the intent is classified, the order updates.
 *
 * The mini workflow activates node by node so automation is shown happening
 * rather than described.
 */
export function AutomationScene({
  copy,
  locale,
  beat,
}: {
  copy: FlowCopy["automation"];
  locale: string;
  beat: number;
}) {
  const activeNodes = Math.max(0, Math.min(Math.floor((beat - 4) / 3), copy.nodes.length));

  return (
    <ScreenFrame
      title={copy.panelTitle}
      active={3}
      trailing={<Chip tone="mint">{copy.orderValue}</Chip>}
    >
      <div className="grid h-full grid-cols-[1fr_1.05fr] gap-[1.1em]">
        <div className="flex min-w-0 flex-col gap-[0.6em]">
          <Rise delay={0.05} className="flex flex-col gap-[0.4em] rounded-[0.5em] bg-[#e9e2d8] p-[0.6em]">
            <p className="max-w-[92%] self-start rounded-[0.6em] rounded-ss-[0.2em] bg-white px-[0.7em] py-[0.5em] text-[0.72em] leading-snug text-neutral-900">
              {copy.customerMessage}
            </p>
          </Rise>

          <Rise delay={0.16} className="flex items-center gap-[0.5em]">
            <span className="grid size-[1.5em] place-items-center rounded-[0.4em] bg-ai/15 text-ai">
              <Sparkles className="size-[0.95em]" />
            </span>
            <span className="text-[0.8em] font-semibold">{copy.aiTitle}</span>
            <span className="ms-auto flex items-center gap-[0.3em] text-[0.62em] text-text-secondary">
              <span className="size-[0.4em] rounded-full bg-brand" />
              {copy.liveLabel}
            </span>
          </Rise>

          <div className="grid grid-cols-2 gap-[0.5em]">
            {[
              [copy.intentLabel, copy.intentValue],
              [copy.sentimentLabel, copy.sentimentValue],
              [copy.languageLabel, copy.languageValue],
              [copy.orderLabel, copy.orderValue],
            ].map(([label, value], i) => (
              <Rise key={label} delay={0.22 + i * 0.06} className="rounded-[0.45em] border border-black/6 bg-white px-[0.6em] py-[0.45em]">
                <p className="text-[0.62em] text-text-secondary">{label}</p>
                <p className="text-[0.78em] font-semibold">{value}</p>
              </Rise>
            ))}
          </div>

          {/* Extraction rows give the classification something to sit on. */}
          <Rise delay={0.44} className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[0.5em] border border-black/6 bg-white">
            {copy.extracted.map((row) => (
              <span key={row.label} className="flex items-center justify-between gap-[0.5em] border-b border-black/5 px-[0.7em] py-[0.42em] last:border-b-0">
                <span className="text-[0.66em] text-text-secondary">{row.label}</span>
                <span className="text-[0.7em] font-medium"><Currency text={row.value} /></span>
              </span>
            ))}
          </Rise>

          <Rise delay={0.5} className="flex items-center justify-between rounded-[0.45em] bg-ai/8 px-[0.7em] py-[0.5em]">
            <span className="text-[0.68em] font-medium text-ai">{copy.confidenceLabel}</span>
            <span className="text-[1em] font-semibold text-ai">
              <AnimatedNumber
                value={FLOW_DATA.confidence}
                locale={locale}
                active={beat >= 6}
                suffix="%"
                duration={900}
              />
            </span>
          </Rise>
        </div>

        {/* Mini workflow — nodes light up in sequence, connectors draw between. */}
        <div className="flex min-w-0 flex-col gap-[0.5em]">
          <p className="text-[0.66em] font-semibold uppercase tracking-[0.1em] text-text-secondary">
            {copy.workflowLabel}
          </p>
          {copy.nodes.map((node, i) => {
            const on = i < activeNodes;
            return (
              <div key={node} className="flex flex-col">
                <motion.span
                  animate={{
                    opacity: on ? 1 : 0.35,
                    borderColor: on ? "rgba(32,198,106,0.5)" : "rgba(0,0,0,0.08)",
                  }}
                  transition={{ duration: 0.4, ease: FLOW_EASE }}
                  className="flex items-center gap-[0.5em] rounded-[0.45em] border bg-white px-[0.7em] py-[0.5em] shadow-e1"
                >
                  <motion.span
                    animate={{ backgroundColor: on ? "#20c66a" : "#e4e7ec" }}
                    transition={{ duration: 0.4 }}
                    className="size-[0.5em] shrink-0 rounded-full"
                  />
                  <span className="text-[0.72em] font-medium">{node}</span>
                  <motion.span
                    animate={{ opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ms-auto text-[0.6em] text-brand-hover"
                  >
                    {copy.doneLabel}
                  </motion.span>
                </motion.span>
                {i < copy.nodes.length - 1 ? (
                  <span className="ms-[1.1em] h-[0.7em] w-px overflow-hidden bg-black/8">
                    <motion.span
                      className="block size-full bg-brand"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: i < activeNodes - 1 ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "linear" }}
                      style={{ transformOrigin: "top" }}
                    />
                  </span>
                ) : null}
              </div>
            );
          })}

          <div className="mt-[0.4em] flex flex-col gap-[0.35em] rounded-[0.5em] border border-black/6 bg-white p-[0.7em]">
            {copy.checks.map((check, i) => (
              <CheckRow key={check} label={check} delay={0.55 + i * 0.12} />
            ))}
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[0.5em] border border-black/6 bg-white">
            <span className="border-b border-black/6 px-[0.7em] py-[0.4em] text-[0.6em] font-semibold uppercase tracking-[0.08em] text-text-secondary">
              {copy.runsLabel}
            </span>
            {copy.runs.map((run, i) => (
              <Rise
                key={run.label}
                delay={0.7 + i * 0.1}
                className="flex items-center justify-between gap-[0.5em] border-b border-black/5 px-[0.7em] py-[0.35em] last:border-b-0"
              >
                <span className="flex min-w-0 items-center gap-[0.4em]">
                  <span className="size-[0.4em] shrink-0 rounded-full bg-brand" />
                  <span className="truncate text-[0.63em]">{run.label}</span>
                </span>
                <span className="shrink-0 text-[0.58em] text-text-secondary">{run.time}</span>
              </Rise>
            ))}
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}
