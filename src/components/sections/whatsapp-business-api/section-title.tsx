import { GradientText } from "@/components/ui/titleCustomize";

/** The heading block the API page's sections share. */
export function SectionTitle({
  id,
  eyebrow,
  title,
  highlight,
  description,
  centered = true,
}: {
  /** Set when the surrounding section names itself via `aria-labelledby`. */
  id?: string;
  eyebrow?: string;
  title: string;
  /** Trailing phrase rendered in the brand gradient, as `SectionHeader` does. */
  highlight?: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-hover">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl">
        {title}
        {highlight ? (
          <>
            {" "}
            <GradientText>{highlight}</GradientText>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-text-secondary">{description}</p>
      ) : null}
    </div>
  );
}
