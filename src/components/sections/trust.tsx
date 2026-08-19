import { BadgeCheck, Languages, Users, Zap } from "lucide-react";
import { Container } from "@/components/layout/container";
import { GradientText } from "../ui/titleCustomize";

const pillars = [BadgeCheck, Zap, Users, Languages];

export function Trust({
  dictionary,
}: {
  dictionary: { heading: string; headingColored: string; pillars: string[] };
}) {
  return (
    <section className="relative border-y border-border bg-white py-12">
      <Container className="flex flex-col items-center gap-8">
        <p className="text-center text-lg font-normal text-balance text-text-secondary">
          {dictionary.heading}
          <GradientText>{dictionary.headingColored}</GradientText>
        </p>

        {/* Capability pillars — factual product claims, not invented metrics. */}
        <ul className="grid w-full max-w-4xl grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10">
          {dictionary.pillars.map((pillar, index) => {
            const Icon = pillars[index];
            return (
              <li
                key={pillar}
                className="flex items-center gap-2.5 text-sm font-medium text-text-primary"
              >
                <Icon className="size-4 shrink-0 text-brand-hover" aria-hidden="true" />
                <span className="text-balance">{pillar}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
