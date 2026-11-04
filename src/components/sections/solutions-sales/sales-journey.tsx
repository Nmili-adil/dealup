import {
  BarChart3,
  Handshake,
  MessageCircleMore,
  Search,
  Timer,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Section } from "@/components/layout/section";
import { SectionHeader } from "@/components/layout/section-header";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const ICONS: LucideIcon[] = [
  Search,
  UserPlus,
  Users,
  MessageCircleMore,
  Timer,
  Handshake,
  BarChart3,
];

/**
 * A static sales pipeline: every step is visible at once, so the user can scan
 * the full motion from capture to measurement without waiting for a carousel.
 */
export function SalesJourney({
  dictionary,
}: {
  dictionary: Dictionary["salesSolution"]["journey"];
}) {
  return (
    <Section
      tone="mint"
      spacing="lg"
      decoration="grid"
      aria-labelledby="sales-journey-title"
      className="border-y border-brand-dark/5"
    >
      <Container className="max-w-[1280px]">
        <SectionHeader
          id="sales-journey-title"
          eyebrow={dictionary.eyebrow}
          headline={dictionary.title}
          description={dictionary.description}
          align="center"
        />

        <div className="mt-12 rounded-[28px] border border-brand-dark/8 bg-white/82 p-3 shadow-e2 backdrop-blur-sm sm:p-5">
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            {dictionary.items.map((item, index) => {
              const Icon = ICONS[index];
              const isLast = index === dictionary.items.length - 1;
              const isSecondRow = index >= 4;

              return (
                <li
                  key={item.title}
                  className={cn(
                    "relative h-full",
                    isSecondRow ? "lg:col-span-4" : "lg:col-span-3",
                  )}
                >
                  <MotionReveal delay={index * 0.05} className="h-full">
                    <article
                      className={cn(
                        "group relative flex h-full min-h-[210px] flex-col overflow-hidden rounded-2xl border p-5 shadow-e1 transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:shadow-e3",
                        isLast
                          ? "border-brand-dark bg-brand-dark text-white"
                          : "border-border/80 bg-white hover:border-brand/30",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 top-0 h-1 bg-linear-to-r",
                          isLast
                            ? "from-brand via-[#e7b873] to-brand"
                            : "from-brand via-brand-hover to-[#e7b873]",
                        )}
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute end-5 top-5 text-5xl font-semibold leading-none transition-colors",
                          isLast
                            ? "text-white/[0.08] group-hover:text-brand/20"
                            : "text-brand-dark/[0.045] group-hover:text-brand/[0.1]",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="relative flex items-start justify-between gap-4">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "grid size-12 shrink-0 place-items-center rounded-xl ring-1 transition-colors",
                            isLast
                              ? "bg-white/10 text-brand ring-white/15 group-hover:bg-brand group-hover:text-white"
                              : "bg-surface-mint text-brand-hover ring-brand-dark/8 group-hover:bg-brand group-hover:text-white",
                          )}
                        >
                          <Icon className="size-5.5" strokeWidth={1.8} />
                        </span>
                      </div>

                      <div className="relative mt-8">
                        <h3
                          className={cn(
                            "text-base font-semibold leading-6",
                            isLast ? "text-white" : "text-text-primary",
                          )}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={cn(
                            "mt-2 text-sm leading-6",
                            isLast ? "text-white/72" : "text-text-secondary",
                          )}
                        >
                          {item.description}
                        </p>
                      </div>
                    </article>
                  </MotionReveal>

                  {!isLast ? (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute top-1/2 z-10 hidden h-px bg-brand-dark/12 lg:block",
                        index === 3
                          ? "-bottom-2 left-1/2 top-auto h-6 w-px"
                          : "-end-4 w-4",
                      )}
                    />
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
