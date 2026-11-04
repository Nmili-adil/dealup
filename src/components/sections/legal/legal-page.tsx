import { Container } from "@/components/layout/container";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { headingId } from "@/components/sections/help/article-body";
import type { LegalPageContent } from "@/content/legal/types";

export function LegalPage({
  content,
  backLabel,
  backHref,
}: {
  content: LegalPageContent;
  backLabel: string;
  backHref: string;
}) {
  const headings = content.sections.map((s) => s.title);

  return (
    <div className="bg-white">
      {/* Hero band */}
      <div className="border-b border-border/70 bg-linear-to-b from-cream to-sand/50 pb-10 pt-26 sm:pt-28">
        <Container className="max-w-[1280px]">
          <h1 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-balance text-text-primary sm:text-[42px]">
            {content.hero.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-text-on-sand sm:text-lg">
            {content.hero.summary}
          </p>
          <p className="mt-3 text-sm text-text-secondary">
            {content.hero.lastUpdated}
          </p>
        </Container>
      </div>

      {/* Content grid */}
      <Container className="max-w-[1280px]">
        <div className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:gap-14">
          <article className="min-w-0 max-w-[68ch]">
            <MotionReveal>
              <div className="flex flex-col gap-8">
                {content.sections.map((section) => (
                  <section key={section.title}>
                    <h2
                      id={headingId(section.title)}
                      className="scroll-mt-28 pt-3 text-xl font-semibold tracking-[-0.02em] text-text-primary sm:text-2xl"
                    >
                      {section.title}
                    </h2>
                    <div className="mt-4 flex flex-col gap-4">
                      {section.blocks.map((block, index) => {
                        if (block.kind === "h2") {
                          return (
                            <h3
                              key={index}
                              className="text-lg font-semibold text-text-primary"
                            >
                              {block.text}
                            </h3>
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

                        return (
                          <p
                            key={index}
                            className="text-base leading-7 text-text-secondary"
                          >
                            {block.text}
                          </p>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </MotionReveal>
          </article>

          {/* Table of contents sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-labelledby="legal-toc-title">
              <p
                id="legal-toc-title"
                className="text-xs font-semibold uppercase tracking-[0.1em] text-text-secondary"
              >
                {backLabel}
              </p>
              <ul className="mt-3 flex flex-col gap-2 border-s border-border/70 ps-4">
                {headings.map((h) => (
                  <li key={h}>
                    <a
                      href={`#${headingId(h)}`}
                      className="text-sm leading-6 text-text-secondary transition-colors hover:text-brand-hover"
                    >
                      {h}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </Container>
    </div>
  );
}
