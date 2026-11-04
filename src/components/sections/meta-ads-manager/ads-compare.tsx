import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/**
 * The three ad types side by side.
 *
 * A real `<table>` so the header cells associate with their column for screen
 * readers, wrapped in its own scroll container so a narrow screen scrolls the
 * table rather than the page.
 */
export function AdsCompare({
  dictionary,
}: {
  dictionary: Dictionary["metaAdsManager"]["compare"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="ads-compare-title">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="ads-compare-title"
          className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
        >
          <GradientText>{dictionary.title}</GradientText>
        </h2>
        <p className="mt-3 text-base leading-7 text-text-secondary">{dictionary.subtitle}</p>
      </div>

      <MotionReveal delay={0.08}>
        <div className="mt-9 overflow-x-auto rounded-2xl border border-border/80 shadow-e1">
          <table className="w-full min-w-[720px] border-collapse bg-white text-start text-sm">
            <thead>
              <tr className="bg-surface-mint/50">
                <th scope="col" className="p-4 text-start text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
                  {dictionary.featureLabel}
                </th>
                {dictionary.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="border-s border-border/70 p-4 text-start text-sm font-semibold text-text-primary"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dictionary.rows.map((row) => (
                <tr key={row.label} className="border-t border-border/70">
                  <th scope="row" className="p-4 text-start text-sm font-medium text-text-primary">
                    {row.label}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.label}-${index}`}
                      className="border-s border-border/70 p-4 align-top leading-6 text-text-secondary"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MotionReveal>
    </Section>
  );
}
