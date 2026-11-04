import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { Mockup } from "@/components/product/mockup";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** The same shot for each language; only the caption changes. */
const SHOTS = ["forms-lang-fr", "forms-lang-ar", "forms-lang-en"];
const RATIOS = ["712 / 1426", "765 / 1500", "694 / 1355"];

export function FormsLanguages({
  dictionary,
}: {
  dictionary: Dictionary["whatsappForms"]["languages"];
}) {
  return (
    <Section tone="mint" spacing="lg" aria-labelledby="forms-languages-title">
      <Container className="max-w-[1280px]">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="forms-languages-title"
            className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
          >
            <GradientText>{dictionary.title}</GradientText>
          </h2>
          <p className="mt-3 text-base leading-7 text-text-secondary">
            {dictionary.subtitle}
          </p>
        </div>

        <ul className="mt-9 grid gap-5 sm:grid-cols-3">
          {dictionary.items.map((item, index) => (
            <li key={item.label}>
              <MotionReveal delay={index * 0.08}>
                {/* The figure still groups the phone with its caption; only the
                  card chrome goes, so the three renders float on the band. */}
                <figure className="flex h-full flex-col">
                  <div className="relative mx-auto w-fit">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-[14%] bottom-[2%] -z-10 h-6 rounded-[50%] bg-brand-dark/15 blur-xl"
                    />
                    <Mockup
                      name={SHOTS[index]}
                      alt={`${dictionary.imageAlt} — ${item.label}`}
                      ratio={RATIOS[index]}
                      sizes="(max-width: 640px) 72vw, 26vw"
                      className="mx-auto max-h-[360px] w-auto object-contain drop-shadow-[0_16px_26px_rgba(6,64,47,0.16)]"
                    />
                  </div>
                  <figcaption className="mt-4 text-center">
                    {/* The language name renders in its own script, so it keeps
                      its own direction regardless of the page's. */}
                    <span
                      dir="auto"
                      className="block text-sm font-semibold text-text-primary"
                    >
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-text-on-sand">
                      {item.caption}
                    </span>
                  </figcaption>
                </figure>
              </MotionReveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
