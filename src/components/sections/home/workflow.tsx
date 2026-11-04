import { Fragment } from "react";
import { Megaphone, MessageCircle, Workflow as WorkflowIcon, Sparkles, BarChart3, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { PhoneAutomationChat } from "@/components/product/phone-automation-chat";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const icons = [Megaphone, MessageCircle, WorkflowIcon, Sparkles, BarChart3];

export function Workflow({ dictionary }: { dictionary: Dictionary["home"]["workflow"] }) {
  return (
    <Section tone="white" spacing="sm">
      <Container className="flex flex-col gap-6">
        <MotionReveal>
          <div className="flex flex-col gap-6 rounded-3xl bg-surface-mint px-6 py-8 lg:px-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-hover">
                {dictionary.eyebrow}
              </span>
              <h2 className="text-2xl font-semibold tracking-tight text-balance text-text-primary sm:text-3xl">
                {dictionary.headline}
              </h2>
            </div>

            {/* Ordered: this is the sequence a conversation moves through. */}
            <ol className="flex flex-col gap-4 md:flex-row md:items-center md:gap-2">
              {dictionary.chips.map((chip, index) => {
                const Icon = icons[index];
                const isLast = index === dictionary.chips.length - 1;
                return (
                  <Fragment key={chip.title}>
                    <li className="flex min-w-0 flex-1 items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand-dark shadow-e1"
                      >
                        <Icon className="size-5" strokeWidth={1.5} />
                      </span>
                      <span className="flex min-w-0 flex-col leading-snug">
                        <span className="text-sm font-semibold text-text-primary">
                          {chip.title}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {chip.description}
                        </span>
                      </span>
                    </li>

                    {!isLast ? (
                      <ArrowRight
                        aria-hidden="true"
                        className="hidden size-4 shrink-0 text-brand/50 rtl:rotate-180 md:block"
                      />
                    ) : null}
                  </Fragment>
                );
              })}
            </ol>
          </div>
        </MotionReveal>

        {/* The phone shows the conversation the customer receives; the desktop
            shows the flow that produced it. Paired so the section reads as
            cause and effect rather than two unrelated screenshots.
            Phone first in the DOM, so the stacked mobile order matches the
            left-to-right order on desktop. */}
        <MotionReveal delay={0.1}>
          <div className="relative mx-auto flex max-w-[1020px] flex-col items-center gap-8 lg:block">
            {/* PhoneMockup is a fixed 360x710; scale it and reserve the scaled
                box so it never leaves a gap when stacked on small screens.
                Side by side only from lg: between md and lg the container is
                narrower than the phone needs, so it would sit on the desktop
                instead of beside it. Below lg the two simply stack. */}
            <div className="relative h-[calc(710px*var(--phone-s))] w-[calc(360px*var(--phone-s))] [--phone-s:0.62] sm:[--phone-s:0.72] lg:absolute lg:bottom-0 lg:start-0 lg:[--phone-s:0.76]">
              <div
                className="absolute start-0 top-0 origin-top-left rtl:origin-top-right"
                style={{ transform: "scale(var(--phone-s))" }}
              >
                <PhoneAutomationChat conversation={dictionary.conversation} />
              </div>
            </div>

            <Mockup
              name="automation-template"
              alt={dictionary.imageAlt}
              sizes="(min-width: 768px) 70vw, 96vw"
              ratio="1299 / 1061"
              className="w-full max-w-[660px] lg:ms-auto"
            />
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
