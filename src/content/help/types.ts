/**
 * Help-centre article content.
 *
 * Lives outside `src/messages` on purpose: the dictionaries are serialised into
 * every page's RSC payload, and ~90 article bodies would ride along with the
 * homepage. These modules are imported only by the help routes.
 */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "steps"; items: { title: string; text: string }[] }
  | { kind: "note"; text: string };

export interface Article {
  slug: string;
  /** Matches a category id in the `help.categories` dictionary block. */
  category: string;
  title: string;
  summary: string;
  /**
   * `draft` marks an article whose body documents Dealup's own interface.
   * Those are scaffolded rather than written, because describing screens and
   * button labels that have not been verified would be inventing documentation
   * people are meant to follow.
   */
  status: "published" | "draft";
  blocks: Block[];
}

export interface HelpContent {
  articles: Article[];
  /** UI strings for the article and category pages. */
  ui: {
    backToHelp: string;
    onThisPage: string;
    inCategory: string;
    previous: string;
    next: string;
    draftBadge: string;
    draftTitle: string;
    draftBody: string;
    relatedTitle: string;
    helpfulTitle: string;
    helpfulBody: string;
    helpfulCta: string;
  };
}
