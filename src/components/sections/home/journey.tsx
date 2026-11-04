import { MousePointerClick, Zap, BadgeCheck, Truck, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const stepIcons = [MousePointerClick, Zap, BadgeCheck, Truck, TrendingUp];

export function Journey({ dictionary }: { dictionary: Dictionary["home"]["journey"] }) {
  const lastIndex = dictionary.steps.length - 1;

  return (
    <Section tone="white" spacing="md">
      <Container className="grid items-center gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-16">
        <div className="flex flex-col gap-7">
          <MotionReveal x={-24} y={0} className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-surface-mint px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-hover">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
              {dictionary.eyebrow}
            </span>

            <h2 className="text-3xl font-semibold tracking-tight text-balance text-text-primary sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
              {dictionary.headline}
            </h2>
          </MotionReveal>

          {/* Ordered: the sequence is the message. The rail is a gradient that
              fades out at the end, so the five steps read as one path with
              direction rather than a plain divider. */}
          <ol className="relative flex flex-col gap-1">
            <span
              aria-hidden="true"
              // 32px = the row's 12px padding + half the 40px icon, so the
              // rail runs through the centre of every marker.
              className="absolute inset-y-7 start-8 w-px bg-linear-to-b from-brand/50 via-brand/30 to-transparent"
            />

            {dictionary.steps.map((step, index) => {
              const Icon = stepIcons[index];
              const isLast = index === lastIndex;
              return (
                <li key={step.title}>
                  <MotionReveal x={-16} y={0} delay={index * 0.07}>
                    <div className="group relative flex items-start gap-4 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-surface-mint/60">
                      <span
                        aria-hidden="true"
                        className={
                          isLast
                            ? "relative z-10 grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-brand ring-4 ring-white transition-transform duration-300 group-hover:scale-105"
                            : "relative z-10 grid size-10 shrink-0 place-items-center rounded-xl bg-brand-dark text-white ring-4 ring-white transition-transform duration-300 group-hover:scale-105"
                        }
                      >
                        <Icon className="size-4.5" strokeWidth={1.75} />
                      </span>

                      <span className="flex flex-col gap-1 pt-0.5">
                        <span className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold tabular-nums text-brand-hover">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm font-semibold text-text-primary">
                            {step.title}
                          </span>
                        </span>
                        <span className="text-sm leading-relaxed text-text-secondary">
                          {step.description}
                        </span>
                      </span>
                    </div>
                  </MotionReveal>
                </li>
              );
            })}
          </ol>
        </div>

        <MotionReveal x={24} y={0} delay={0.1} className="relative">
          {/* Layered backdrop: a masked brand bloom plus two faint rings, so the
              phone sits in depth instead of on a flat disc with a hard edge. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 grid place-items-center"
          >
            <span className="absolute size-[78%] rounded-full bg-brand/12 blur-3xl" />
            <span className="absolute aspect-square w-[74%] rounded-full border border-brand/15" />
            <span className="absolute aspect-square w-[92%] rounded-full border border-brand/10" />
          </div>

          {/* `animate-float` is already defined globally, and the global
              reduced-motion rule collapses it to a static frame. */}
          <div className="animate-float">
            <Mockup
              name="hero-commerce-phone"
              alt={dictionary.imageAlt}
              sizes="(min-width: 768px) 34vw, 72vw"
              ratio="800 / 1199"
              className="mx-auto max-w-[270px] drop-shadow-2xl"
            />
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
