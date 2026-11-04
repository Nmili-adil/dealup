import { Info } from "lucide-react";
import type { Block } from "@/content/help";

/** Renders one article's blocks. Headings carry ids so the TOC can link them. */
export function ArticleBody({ blocks }: { blocks: readonly Block[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, index) => {
        if (block.kind === "h2") {
          return (
            <h2
              key={index}
              id={headingId(block.text)}
              className="scroll-mt-28 pt-3 text-xl font-semibold tracking-[-0.02em] text-text-primary sm:text-2xl"
            >
              {block.text}
            </h2>
          );
        }

        if (block.kind === "p") {
          return (
            <p key={index} className="text-base leading-7 text-text-secondary">
              {block.text}
            </p>
          );
        }

        if (block.kind === "list") {
          return (
            <ul key={index} className="flex flex-col gap-2.5">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base leading-7 text-text-secondary"
                >
                  <span
                    aria-hidden="true"
                    className="mt-3 size-1.5 shrink-0 rounded-full bg-brand"
                  />
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        if (block.kind === "steps") {
          return (
            <ol key={index} className="flex flex-col gap-4">
              {block.items.map((item, stepIndex) => (
                <li key={item.title} className="flex gap-3.5">
                  <span
                    aria-hidden="true"
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-dark text-xs font-semibold tabular-nums text-white"
                  >
                    {stepIndex + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-text-primary">{item.title}</p>
                    <p className="mt-1 text-base leading-7 text-text-secondary">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          );
        }

        return (
          <aside
            key={index}
            className="flex gap-3 rounded-2xl border border-brand/25 bg-surface-mint/60 p-4"
          >
            <Info className="mt-0.5 size-4.5 shrink-0 text-brand-hover" aria-hidden="true" />
            <p className="text-sm leading-6 text-text-primary">{block.text}</p>
          </aside>
        );
      })}
    </div>
  );
}

/** Stable, URL-safe id from a heading's text, for the table of contents. */
export function headingId(text: string) {
  return (
    "s-" +
    text
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9؀-ۿ]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}
