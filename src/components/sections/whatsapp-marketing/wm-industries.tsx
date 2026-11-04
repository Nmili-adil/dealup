"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Mockup } from "@/components/product/mockup";
import { GradientText } from "@/components/ui/titleCustomize";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Screenshot assets stay in code and pair with translated tabs by stable id. */
const SHOTS: Record<string, { name: string; ratio: string }> = {
  ecommerce: { name: "ecommerce-catalog-orders", ratio: "1536 / 1024" },
  realestate: { name: "real-estate-hero", ratio: "1307 / 903" },
  hotels: { name: "wba-notifications", ratio: "1325 / 1060" },
  education: { name: "education-admissions-flow", ratio: "1536 / 1024" },
  healthcare: { name: "healthcare-hero", ratio: "1536 / 1024" },
  agencies: { name: "marketing-builder", ratio: "1536 / 1024" },
};

/** Industry tabs, following the WAI-ARIA tabs pattern. */
export function WmIndustries({
  dictionary,
}: {
  dictionary: Dictionary["whatsappMarketing"]["industries"];
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabs = dictionary.tabs;

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const prev = rtl ? "ArrowRight" : "ArrowLeft";
    let target: number | null = null;
    if (event.key === next) target = (active + 1) % tabs.length;
    else if (event.key === prev) target = (active - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = tabs.length - 1;
    if (target === null) return;
    event.preventDefault();
    setActive(target);
    tabRefs.current[target]?.focus();
  }

  return (
    <Section spacing="lg" aria-labelledby="wm-industries-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="wm-industries-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          {dictionary.title} <GradientText>{dictionary.highlight}</GradientText>
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">{dictionary.subtitle}</p>
      </div>

      <div className="mt-9 overflow-hidden rounded-3xl border border-border/70 bg-white shadow-e1">
        {/* Scrolls rather than wrapping on narrow screens, so the row keeps one baseline. */}
        <div
          role="tablist"
          aria-label={dictionary.subtitle}
          className="flex snap-x snap-mandatory gap-1 overflow-x-auto border-b border-border/70 bg-surface-mint/40 p-1.5 lg:justify-center lg:overflow-visible"
        >
          {tabs.map((tab, index) => {
            const selected = index === active;
            return (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[index] = el; }}
                type="button"
                role="tab"
                id={`wm-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`wm-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={onKeyDown}
                className={cn(
                  "shrink-0 snap-start rounded-xl px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover",
                  selected
                    ? "bg-white text-brand-hover shadow-e1 ring-1 ring-brand/25"
                    : "text-text-secondary hover:bg-white/60 hover:text-text-primary"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {tabs.map((tab, index) => {
          const shot = SHOTS[tab.id] ?? SHOTS.ecommerce;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`wm-panel-${tab.id}`}
              aria-labelledby={`wm-tab-${tab.id}`}
              hidden={index !== active}
              tabIndex={0}
              className="p-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-hover sm:p-7"
            >
              <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
                <div className="flex min-h-[300px] items-center justify-center">
                  <Mockup
                    name={shot.name}
                    alt={tab.imageAlt}
                    ratio={shot.ratio}
                    sizes="(max-width: 1024px) 86vw, 40vw"
                    className="max-h-[320px] w-auto object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-text-primary sm:text-[28px]">
                    <GradientText>{tab.title}</GradientText>
                  </h3>
                  <p className="mt-3 max-w-lg text-base leading-7 text-text-secondary">
                    {tab.description}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {tab.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-text-primary">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-hover"
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
