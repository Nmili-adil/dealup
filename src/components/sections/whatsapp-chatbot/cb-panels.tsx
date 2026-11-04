import { Check, Sparkles, Users } from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Copy = Dictionary["whatsappChatbot"];

/** The two halves of a good bot: what it answers, and when it steps aside. */
export function CbPanels({ ai, handover }: { ai: Copy["ai"]; handover: Copy["handover"] }) {
  return (
    <Section spacing="lg">
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel
          icon="ai"
          title={ai.title}
          description={ai.description}
          items={ai.items}
          shot={{ name: "cb-ai", ratio: "1422 / 862", alt: ai.imageAlt }}
          delay={0}
        />
        <Panel
          icon="handover"
          title={handover.title}
          description={handover.description}
          items={handover.items}
          shot={{ name: "cb-handover", ratio: "1367 / 929", alt: handover.imageAlt }}
          delay={0.1}
        />
      </div>
    </Section>
  );
}

function Panel({
  icon,
  title,
  description,
  items,
  shot,
  delay,
}: {
  icon: "ai" | "handover";
  title: string;
  description: string;
  items: readonly string[];
  shot: { name: string; ratio: string; alt: string };
  delay: number;
}) {
  const Icon = icon === "ai" ? Sparkles : Users;
  return (
    <MotionReveal delay={delay}>
      <div className="flex h-full flex-col rounded-3xl border border-border/80 bg-linear-to-b from-surface-mint/50 to-white p-6 shadow-e1 sm:p-7">
        <span
          aria-hidden="true"
          className={
            "grid size-10 place-items-center rounded-xl " +
            (icon === "ai" ? "bg-ai/12 text-ai" : "bg-brand/12 text-brand-hover")
          }
        >
          <Icon className="size-5" strokeWidth={1.8} />
        </span>

        <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-text-primary sm:text-2xl">
          <GradientText>{title}</GradientText>
        </h2>
        <p className="mt-2.5 text-sm leading-6 text-text-secondary">{description}</p>

        <ul className="mt-5 flex flex-col gap-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-text-primary">
              <span
                aria-hidden="true"
                className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-brand/15 text-brand-hover"
              >
                <Check className="size-2.5" strokeWidth={3.5} />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="relative mt-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[8%] bottom-[1%] -z-10 h-8 rounded-[50%] bg-brand-dark/12 blur-2xl"
          />
          <Mockup
            name={shot.name}
            alt={shot.alt}
            ratio={shot.ratio}
            sizes="(max-width: 1024px) 92vw, 46vw"
            className="w-full object-contain drop-shadow-[0_18px_28px_rgba(6,64,47,0.14)]"
          />
        </div>
      </div>
    </MotionReveal>
  );
}
