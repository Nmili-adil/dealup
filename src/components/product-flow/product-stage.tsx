"use client";

import { AnimatePresence, motion } from "motion/react";
import { LaptopMockup } from "@/components/product/laptop-mockup";
import { PhoneMockup } from "@/components/product/phone-mockup";
import { FLOW_EASE, STAGE_CAMERA, type StageId } from "./flow-stages";
import { MessageTravel } from "./message-travel";
import { CampaignScene } from "./scenes/campaign-scene";
import { AutomationScene } from "./scenes/automation-scene";
import { HandoffScene } from "./scenes/handoff-scene";
import { AnalyticsScene } from "./scenes/analytics-scene";
import { PhoneScreen } from "./scenes/phone-screen";
import type { FlowCopy } from "./flow-copy";

/**
 * One persistent scene for the whole story.
 *
 * The laptop, the phone, the light and the connector are mounted once and
 * never swapped; only the camera framing and the laptop's screen change
 * between chapters. That is what keeps this from reading as five slides.
 */
export function ProductStage({
  copy,
  locale,
  stageId,
  beat,
  reduced,
}: {
  copy: FlowCopy;
  locale: string;
  stageId: StageId;
  beat: number;
  reduced: boolean;
}) {
  const camera = STAGE_CAMERA[stageId];
  const move = reduced
    ? { duration: 0 }
    : { duration: 0.85, ease: FLOW_EASE };

  // Chapter two lives on the phone, so the laptop holds the sent campaign.
  const laptopStage: StageId = stageId === "reply" ? "campaign" : stageId;

  return (
    <div
      role="img"
      aria-label={copy.stageLabel}
      className="relative mx-auto w-full max-w-[980px]"
    >
      {/* Ambient light, drifting toward whichever device carries the story. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{ x: `${camera.glowX}%` }}
        transition={move}
      >
        <span className="absolute left-[28%] top-[18%] size-[380px] -translate-x-1/2 rounded-full bg-[#8ef0b5]/8 blur-3xl" />
        <span className="absolute right-[16%] bottom-[6%] size-[260px] rounded-full bg-brand/8 blur-3xl" />
      </motion.div>

      {/* Reserve the stage box up front so hydration never shifts the page.
          `--pk` scales the phone, whose frame is a fixed 340px by design; the
          laptop is fluid and simply takes a share of the stage width. */}
      <div className="relative aspect-[4/3] w-full [--pk:0.36] sm:aspect-[16/10] sm:[--pk:0.44] md:[--pk:0.48] lg:aspect-[2/1] lg:[--pk:0.52] xl:[--pk:0.58]">
        <MessageTravel active={!reduced && stageId === "automation" && beat < 8} />

        {/* Laptop */}
        <motion.div
          className="absolute inset-x-0 top-0 mx-auto w-[92%] origin-top sm:w-[82%] lg:w-[72%]"
          animate={{ x: `${camera.laptopX * 0.14}%`, scale: camera.laptopScale }}
          transition={move}
        >
          <LaptopMockup className="w-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={laptopStage}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={reduced ? { duration: 0 } : { duration: 0.42, ease: FLOW_EASE }}
                className="size-full"
              >
                {laptopStage === "campaign" ? (
                  <CampaignScene copy={copy.campaign} ui={copy.ui} locale={locale} beat={beat} />
                ) : laptopStage === "automation" ? (
                  <AutomationScene copy={copy.automation} locale={locale} beat={beat} />
                ) : laptopStage === "handover" ? (
                  <HandoffScene copy={copy.handoff} ui={copy.ui} beat={beat} />
                ) : (
                  <AnalyticsScene copy={copy.analytics} ui={copy.ui} locale={locale} beat={beat} />
                )}
              </motion.div>
            </AnimatePresence>
          </LaptopMockup>
        </motion.div>

        {/* Phone — always present, only ever reframed. */}
        <motion.div
          className="absolute bottom-[2%] end-[-6%] origin-bottom-right rtl:origin-bottom-left"
          animate={{
            x: `${camera.phoneX * 0.6}%`,
            y: `${camera.phoneY}%`,
            scale: camera.phoneScale,
          }}
          transition={move}
        >
          <div
            className="origin-bottom-right rtl:origin-bottom-left"
            style={{ transform: "scale(var(--pk))" }}
          >
            <PhoneMockup>
              <PhoneScreen
              copy={copy.conversation}
              campaign={copy.campaign}
              stageId={stageId}
              beat={beat}
            />
            </PhoneMockup>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
