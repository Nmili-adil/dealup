import { Mockup } from "@/components/product/mockup";
import { GradientText } from "@/components/ui/titleCustomize";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/**
 * "How you can use the API" — alternating rows of copy and a product shot.
 *
 * Screenshots stay in code and pair with the dictionary by index. Rows swap
 * sides from `lg` up; below that everything stacks copy-first so the reading
 * order matches the visual order in both directions.
 */
const SHOTS = [
  { name: "wba-campaign", ratio: "1086 / 1448" },
  { name: "click-to-whatsapp", ratio: "1146 / 1307" },
  { name: "wba-chatbot", ratio: "989 / 1454" },
  { name: "wba-notifications", ratio: "1325 / 1060" },
  { name: "wba-verification", ratio: "1122 / 1402" },
  { name: "wba-analytics", ratio: "1652 / 847" },
  { name: "chats-ai-detail", ratio: "1350 / 985" },
];

export function ApiHowToUse({
  dictionary,
}: {
  dictionary: Dictionary["whatsappBusinessApi"]["howToUse"];
}) {
  return (
    <section aria-labelledby="api-how-to-use-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="api-how-to-use-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          {dictionary.title} <GradientText>{dictionary.highlight}</GradientText>
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">{dictionary.subtitle}</p>
      </div>

      <ul className="mt-12 flex flex-col gap-16 lg:gap-20">
        {dictionary.items.map((item, index) => {
          const shot = SHOTS[index];
          const flipped = index % 2 === 1;
          return (
            <li
              key={item.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <MotionReveal
                delay={0.04}
                className={cn("min-w-0", flipped && "lg:order-2")}
              >
                <h3 className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-text-primary sm:text-[30px] lg:text-[34px]">
                  <GradientText>{item.title}</GradientText>
                </h3>
                <p className="mt-4 max-w-md text-base leading-7 text-text-secondary lg:text-[17px] lg:leading-8">
                  {item.description}
                </p>
              </MotionReveal>

              <MotionReveal
                delay={0.12}
                scale={0.97}
                className={cn("min-w-0", flipped && "lg:order-1")}
              >
                  <Mockup
                    name={shot.name}
                    alt={item.imageAlt}
                    ratio={shot.ratio}
                    sizes="(max-width: 1024px) 90vw, 46vw"
                    className="mx-auto max-h-[440px] w-auto  object-contain  lg:max-h-[520px]"
                  />
              </MotionReveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
