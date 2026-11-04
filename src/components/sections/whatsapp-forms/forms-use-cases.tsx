import {
  CalendarCheck,
  ClipboardList,
  MessageSquareHeart,
  PackageCheck,
  Repeat2,
  Ticket,
  UserCheck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { GradientText } from "@/components/ui/titleCustomize";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/** Icons stay in code and pair with the translated rows by index. */
const ICONS: LucideIcon[] = [
  UserCheck, CalendarCheck, PackageCheck, ClipboardList,
  Ticket, UtensilsCrossed, MessageSquareHeart, Repeat2,
];

/**
 * The use-case matrix.
 *
 * A real `<table>` so each cell is announced with its column, wrapped in its
 * own scroll container so a narrow screen scrolls the table, not the page.
 */
export function FormsUseCases({
  dictionary,
}: {
  dictionary: Dictionary["whatsappForms"]["useCases"];
}) {
  return (
    <Section spacing="lg" aria-labelledby="forms-use-cases-title">
      <h2
        id="forms-use-cases-title"
        className="mx-auto max-w-3xl text-center text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-4xl"
      >
        {dictionary.title}
      </h2>

      <MotionReveal delay={0.08}>
        <div className="mt-9 overflow-x-auto rounded-2xl border border-border/80 shadow-e1">
          <table className="w-full min-w-[760px] border-collapse bg-white text-start text-sm">
            <thead>
              <tr className="bg-surface-mint/50">
                <th scope="col" className="p-4 text-start text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
                  {dictionary.nameColumn}
                </th>
                <th scope="col" className="border-s border-border/70 p-4 text-start text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
                  {dictionary.whatColumn}
                </th>
                <th scope="col" className="border-s border-border/70 p-4 text-start text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
                  {dictionary.outcomeColumn}
                </th>
              </tr>
            </thead>
            <tbody>
              {dictionary.items.map((item, index) => {
                const Icon = ICONS[index];
                return (
                  <tr key={item.title} className="border-t border-border/70">
                    <th scope="row" className="p-4 text-start">
                      <span className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-mint text-brand-hover"
                        >
                          <Icon className="size-4" strokeWidth={1.8} />
                        </span>
                        <span className="text-sm font-semibold text-text-primary">
                          <GradientText>{item.title}</GradientText>
                        </span>
                      </span>
                    </th>
                    <td className="border-s border-border/70 p-4 align-middle leading-6 text-text-secondary">
                      {item.collects}
                    </td>
                    <td className="border-s border-border/70 p-4 align-middle leading-6 text-text-secondary">
                      {item.outcome}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </MotionReveal>
    </Section>
  );
}
