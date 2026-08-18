import { Container } from "@/components/layout/container";

export function Trust({ dictionary }: { dictionary: { heading: string } }) {
  return (
    <section className="border-y border-border bg-white py-10">
      <Container>
        <p className="text-center text-lg font-medium text-text-secondary text-balance">
          {dictionary.heading}
        </p>
      </Container>
    </section>
  );
}
