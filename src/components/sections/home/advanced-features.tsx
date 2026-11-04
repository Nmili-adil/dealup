"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { DemoInbox } from "@/components/product/demo/demo-inbox";
import { DemoAnalytics } from "@/components/product/demo/demo-analytics";
import { DemoAutomation } from "@/components/product/demo/demo-automation";
import { DemoBroadcast } from "@/components/product/demo/demo-broadcast";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** AiSensy's reveal: 20px rise, 0.95 → 1, 400ms ease-in-out, staggered. */
const REVEAL = { duration: 0.4, y: 20, scale: 0.95, ease: "easeInOut" } as const;
const DELAYS = [0.03, 0.09, 0.12, 0.18];

/** Their GIF widths (420/650/630/420) imply a mirrored two-column bento. */
const SPANS = [
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
];

export function AdvancedFeatures({
  dictionary,
}: {
  dictionary: Dictionary["home"]["advancedFeatures"];
}) {
  // Looping content needs a stop control (WCAG 2.2.2). One toggle for the
  // whole section rather than one per card, to keep the grid uncluttered.
  const [playing, setPlaying] = useState(true);

  const demos = [DemoInbox, DemoAnalytics, DemoAutomation, DemoBroadcast];

  return (
    <Section id="features" tone="white" spacing="lg">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <MotionReveal duration={0.6}>
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-text-primary sm:text-4xl">
              {dictionary.headline}
            </h2>
          </MotionReveal>
          <MotionReveal duration={0.6} delay={0.06}>
            <p className="max-w-xl text-lg text-text-secondary">
              {dictionary.subheadline}
            </p>
          </MotionReveal>

          <MotionReveal duration={0.6} delay={0.12}>
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-pressed={!playing}
              className="mt-1 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border/70 bg-white px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-brand/40 hover:text-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover"
            >
              {playing ? (
                <Pause className="size-3.5" aria-hidden="true" />
              ) : (
                <Play className="size-3.5" aria-hidden="true" />
              )}
              {playing ? dictionary.pauseLabel : dictionary.playLabel}
            </button>
          </MotionReveal>
        </div>

        <ul className="grid gap-5 lg:grid-cols-5">
          {dictionary.items.map((item, index) => {
            const Demo = demos[index];
            return (
              <li key={item.title} className={cn("h-full", SPANS[index])}>
                <MotionReveal {...REVEAL} delay={DELAYS[index]} className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-3xl border border-border/70 bg-white p-5 shadow-e1 transition-[box-shadow,border-color] duration-300 hover:border-brand/25 hover:shadow-e2 sm:p-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <Demo label={item.demoLabel} playing={playing} />
                    </div>
                  </div>
                </MotionReveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
