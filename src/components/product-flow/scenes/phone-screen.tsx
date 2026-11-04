"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Mockup } from "@/components/product/mockup";
import { Currency } from "@/lib/currency/currency-provider";
import { Camera, Check, CheckCheck, Mic, Paperclip, Send, Smile } from "lucide-react";
import { FLOW_EASE, type StageId } from "../flow-stages";
import type { FlowCopy } from "../flow-copy";

/**
 * The customer's side of the story. It is the same thread throughout — the
 * chapter only decides how far along it has got, which is what makes the
 * campaign, the reply and the agent's answer read as one conversation.
 */
export function PhoneScreen({
  copy,
  campaign,
  stageId,
  beat,
}: {
  copy: FlowCopy["conversation"];
  campaign: FlowCopy["campaign"];
  stageId: StageId;
  beat: number;
}) {
  const order: StageId[] = ["campaign", "reply", "automation", "handover", "analytics"];
  const stageIndex = order.indexOf(stageId);

  // Which beats of the thread have happened by now.
  const showCampaign = stageIndex > 0 || beat >= 12;
  const showTyping = stageIndex === 1 && beat >= 5 && beat < 11;
  const showReply = stageIndex > 1 || (stageIndex === 1 && beat >= 11);
  const showAgent = stageIndex > 3 || (stageIndex === 3 && beat >= 14);
  const read = stageIndex >= 2;

  return (
    <div
      // The frame is a fixed 340px that the stage then scales down, so the root
      // has to be phone-sized (as a real 340px-wide handset would be) for the
      // thread to survive that scaling and stay readable.
      style={{ fontSize: "17px" }}
      className="flex min-h-[646px] flex-col bg-[#e7ded5]"
    >
      <div className="flex shrink-0 items-center gap-[0.5em] bg-brand-dark px-[0.7em] py-[0.55em] text-white">
        <span className="grid size-[1.9em] shrink-0 place-items-center overflow-hidden rounded-full bg-white/15">
          <Image
            src="/assets/logos/dealup-mark.webp"
            alt=""
            width={752}
            height={502}
            className="w-[75%] object-contain"
          />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-[1em] font-semibold leading-tight">{copy.contact}</span>
          <span className="text-[0.8em] leading-tight text-white/65">{copy.status}</span>
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-end gap-[0.45em] p-[0.6em]">
        <Bubble show={showCampaign} side="in">
          {/* The media header the campaign was composed with, as received. */}
          <span className="mb-[0.35em] block overflow-hidden rounded-[0.4em]">
            <Mockup
              name="product-bag"
              alt={campaign.productAlt}
              ratio="398 / 164"
              sizes="(max-width: 1024px) 18vw, 9vw"
              className="w-full object-cover"
            />
          </span>
          <span className="mb-[0.25em] flex items-baseline justify-between gap-[0.4em]">
            <span className="min-w-0 truncate font-semibold">{campaign.productName}</span>
            <span dir="ltr" className="shrink-0 font-semibold"><Currency text={campaign.productPrice} /></span>
          </span>
          {copy.businessMessage}
          <div className="mt-[0.35em] flex flex-col gap-[0.2em]">
            {copy.quickReplies.map((reply) => (
              <span key={reply} className="rounded bg-black/4 py-0.5 text-center text-[0.8em] font-medium text-[#0a7cff]">
                {reply}
              </span>
            ))}
          </div>
        </Bubble>

        <motion.span
          animate={{ opacity: showTyping ? 1 : 0, scale: showTyping ? 1 : 0.9 }}
          transition={{ duration: 0.25 }}
          className="flex w-fit items-center gap-[0.2em] self-end rounded-[1em] bg-[#d9fdd3] px-[0.7em] py-[0.5em]"
        >
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="size-[0.3em] rounded-full bg-neutral-500 animate-[demo-typing_1s_ease-in-out_infinite]"
              style={{ animationDelay: `${dot * 0.16}s` }}
            />
          ))}
        </motion.span>

        <Bubble show={showReply} side="out">
          <span className="flex items-end gap-1.5">
            {copy.customerReply}
            {read ? (
              <CheckCheck className="size-[0.8em] shrink-0 translate-y-px text-[#34b7f1]" aria-hidden="true" />
            ) : (
              <Check className="size-[0.8em] shrink-0 translate-y-px text-neutral-400" aria-hidden="true" />
            )}
          </span>
        </Bubble>

        <Bubble show={showAgent} side="in">
          {copy.agentReply}
        </Bubble>
      </div>

      {/* Composer. While the customer is typing it holds their draft and the
          action button turns into send — the same beat the bubble arrives on. */}
      <div className="flex shrink-0 items-center gap-[0.4em] px-[0.5em] pb-[1.5em] pt-[0.35em]">
        <span className="flex min-w-0 flex-1 items-center gap-[0.4em] rounded-full bg-white px-[0.6em] py-[0.45em] shadow-sm">
          <Smile className="size-[0.95em] shrink-0 text-neutral-400" aria-hidden="true" />
          <span
            className={
              "min-w-0 flex-1 truncate text-[0.78em] " +
              (showTyping ? "text-neutral-900" : "text-neutral-400")
            }
          >
            {showTyping ? copy.customerReply : copy.composer}
          </span>
          <Paperclip className="size-[0.95em] shrink-0 text-neutral-400" aria-hidden="true" />
          <Camera className="size-[0.95em] shrink-0 text-neutral-400" aria-hidden="true" />
        </span>
        <motion.span
          animate={{ scale: showTyping ? 1.06 : 1 }}
          transition={{ duration: 0.25, ease: FLOW_EASE }}
          className="grid size-[2.1em] shrink-0 place-items-center rounded-full bg-brand-hover text-white shadow-sm"
        >
          {showTyping ? (
            <Send className="size-[0.95em] rtl:-scale-x-100" aria-hidden="true" />
          ) : (
            <Mic className="size-[1em]" aria-hidden="true" />
          )}
        </motion.span>
      </div>
    </div>
  );
}

function Bubble({
  show,
  side,
  children,
}: {
  show: boolean;
  side: "in" | "out";
  children: React.ReactNode;
}) {
  return (
    <motion.span
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10, scale: show ? 1 : 0.96 }}
      transition={{ duration: 0.5, ease: FLOW_EASE }}
      className={
        "max-w-[88%] rounded-2xl px-2.5 py-1.5 text-[1em] leading-snug text-neutral-900 shadow-sm " +
        (side === "out" ? "self-end rounded-se-[0.25em] bg-[#d9fdd3]" : "self-start rounded-ss-[0.25em] bg-white")
      }
    >
      {children}
    </motion.span>
  );
}
