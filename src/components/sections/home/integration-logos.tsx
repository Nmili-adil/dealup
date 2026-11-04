import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { hasAsset } from "@/lib/has-asset";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/**
 * Slug per integration, matching the dictionary order. Drop the official SVG at
 * `public/assets/logos/<slug>.svg` and it replaces the lettermark automatically
 * — no code change. Official assets are used deliberately rather than
 * redrawn, so each brand's own usage guidelines stay intact.
 */
const slugs = ["shopify", "woocommerce", "wordpress", "zapier", "google-sheets", "make"];

export function IntegrationLogos({
  dictionary,
}: {
  dictionary: Dictionary["home"]["integrations"];
}) {
  return (
    <Section id="integrations" tone="white" spacing="sm">
      <Container className="flex flex-col items-center gap-8">
        <MotionReveal>
          <h2 className="text-center text-xl font-semibold text-balance text-brand-hover sm:text-2xl">
            {dictionary.headline}
          </h2>
        </MotionReveal>

        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {dictionary.items.map((item, index) => {
            const slug = slugs[index];
            const src = `/assets/logos/${slug}.svg`;
            const available = hasAsset(`assets/logos/${slug}.svg`);

            return (
              <li key={item}>
                <MotionReveal delay={index * 0.05}>
                  <span className="flex items-center gap-2.5">
                    {available ? (
                      /* eslint-disable-next-line @next/next/no-img-element --
                         a static SVG mark; next/image adds nothing here and
                         emits no srcset under `images.unoptimized`. */
                      <img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        width={28}
                        height={28}
                        loading="lazy"
                        decoding="async"
                        className="size-7 object-contain"
                      />
                    ) : (
                      /* Placeholder until the official SVG is supplied. */
                      <span
                        aria-hidden="true"
                        className="grid size-7 shrink-0 place-items-center rounded-md border border-dashed border-border bg-surface-mint text-[11px] font-semibold text-text-secondary"
                      >
                        {item.charAt(0)}
                      </span>
                    )}
                    <span className="text-base font-medium text-text-primary">
                      {item}
                    </span>
                  </span>
                </MotionReveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
