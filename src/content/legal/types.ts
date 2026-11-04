/**
 * Legal page content.
 *
 * Lives outside `src/messages` on purpose: the dictionaries are serialised into
 * every page's RSC payload, and long legal text would ride along with every page.
 * These modules are imported only by the legal routes.
 */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "list"; items: string[] };

export interface LegalPageContent {
  /** Page hero — last-updated date and summary. */
  hero: {
    title: string;
    summary: string;
    lastUpdated: string;
  };
  /** Ordered sections rendered as blocks. */
  sections: {
    title: string;
    blocks: Block[];
  }[];
}

export type LegalPageKey = "privacy" | "terms" | "cookies";

export type LegalContent = Record<LegalPageKey, LegalPageContent>;
