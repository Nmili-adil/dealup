import { Headphones, Lock, MapPin, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils/cn";

/** Icons stay in code and pair with the translated items by index. */
const ICONS: LucideIcon[] = [MapPin, Lock, Headphones];

export function WmAssurances({
  dictionary,
}: {
  dictionary: Dictionary["whatsappMarketing"]["assurances"];
}) {
  return (
    <Section
      id="wm-assurances"
      tone="mint"
      spacing="lg"
      decoration="grid"
      aria-labelledby="wm-assurances-title"
      className="border-y border-brand-dark/5"
    >
      <Container className="grid max-w-[1280px] gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
        <MotionReveal className="max-w-xl">
          <span className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-hover ring-1 ring-brand-dark/8">
            {dictionary.eyebrow}
          </span>
          <h2
            id="wm-assurances-title"
            className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-balance text-text-primary sm:text-4xl"
          >
            {dictionary.title}
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-text-secondary sm:text-base">
            {dictionary.description}
          </p>
        </MotionReveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {dictionary.items.map((item, index) => {
            const Icon = ICONS[index];
            const featured = index === 0;
            return (
              <li key={item.title} className={cn("h-full", featured && "sm:col-span-2")}>
                <MotionReveal delay={index * 0.07} className="h-full">
                  <div
                    className={cn(
                      "group relative flex h-full overflow-hidden rounded-2xl p-5 shadow-e1 transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-1 hover:shadow-e3 sm:p-6",
                      featured
                        ? "min-h-[172px] border border-brand-dark bg-brand-dark text-white sm:min-h-[218px]"
                        : "min-h-[156px] border border-brand-dark/8 bg-white/90 backdrop-blur-sm hover:border-brand/25 hover:bg-white sm:min-h-[188px]"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 top-0 h-1 bg-linear-to-r",
                        featured
                          ? "from-brand via-[#e7b873] to-brand"
                          : "from-brand via-brand-hover to-[#e7b873]"
                      )}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute end-5 top-5 text-6xl font-semibold leading-none transition-colors",
                        featured
                          ? "text-white/[0.08] group-hover:text-brand/20"
                          : "text-brand-dark/[0.045] group-hover:text-brand/[0.1]"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="relative flex min-w-0 items-start gap-4">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid size-12 shrink-0 place-items-center rounded-xl ring-1 transition-colors",
                          featured
                            ? "bg-white/10 text-brand ring-white/15 group-hover:bg-brand group-hover:text-white"
                            : "bg-surface-mint text-brand-hover ring-brand-dark/8 group-hover:bg-brand group-hover:text-white"
                        )}
                      >
                        <Icon className="size-5" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <h3
                          className={cn(
                            "font-semibold leading-6",
                            featured ? "max-w-md text-xl text-white" : "text-base text-text-primary"
                          )}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={cn(
                            "mt-2 leading-6",
                            featured ? "max-w-2xl text-sm text-white/72 sm:text-base sm:leading-7" : "text-sm text-text-secondary"
                          )}
                        >
                          {item.description}
                        </p>
                      </div>
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
