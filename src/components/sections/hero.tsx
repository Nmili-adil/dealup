import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { GradientText, Title } from "../ui/titleCustomize";

export function Hero({ locale, dictionary }: { locale: Locale; dictionary: Dictionary["hero"] }) {
  return (
    <section className="relative -mt-18 overflow-hidden pb-20 pt-24 lg:min-h-[620px] lg:pb-28 lg:pt-32">
      <Image
        src="/assets/hero-section-bg.png"
        alt=""
        fill
        priority
        className="-z-10 object-cover"
      />

      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-start gap-6">
          <MotionReveal x={-28} y={0} delay={0}>
            <Eyebrow>{dictionary.eyebrow}</Eyebrow>
          </MotionReveal>

          <MotionReveal x={-28} y={0} delay={0.08}>
            <Title size="xl" align="left">
              {dictionary.headline}
              <GradientText variant="brand">{dictionary.hightlight}</GradientText>
            </Title>
          </MotionReveal>

          <MotionReveal x={-28} y={0} delay={0.16}>
            <p className="max-w-lg text-lg leading-relaxed text-black">
              {dictionary.subheadline}
            </p>
          </MotionReveal>

          <MotionReveal x={-28} y={0} delay={0.24}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={localizedHref(locale, "/get-started")}>{dictionary.primaryCta}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href={localizedHref(locale, "/book-demo")}>{dictionary.secondaryCta}</Link>
              </Button>
            </div>
          </MotionReveal>

          {/* <MotionReveal x={-28} y={0} delay={0.32}>
            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
              {dictionary.trustReducers.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm text-black">
                  <CheckCircle2 className="size-4 text-brand-dark" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </MotionReveal> */}
        </div>

        <MotionReveal
          x={72}
          y={0}
          delay={0.3}
          duration={0.7}
          className="relative mx-auto w-full max-w-md lg:absolute lg:inset-y-0 lg:end-0 lg:mx-0 lg:flex lg:w-[48%] lg:max-w-none lg:items-center"
        >
          <div className="relative w-full">
            <Image
              src="/assets/hero-section-desktop.png"
              alt="Tableau de bord Dealup sur ordinateur portable"
              width={648}
              height={546}
              priority
              className="relative z-10 -rotate-5 top-25 -right-[10%]"
            />

            <MotionReveal
              x={40}
              y={0}
              delay={0.5}
              duration={0.6}
              className="absolute -bottom-15 end-0 z-20 w-[28%]"
            >
              <Image
                src="/assets/hero-section-phone.png"
                alt="Conversation WhatsApp sur téléphone"
                width={1086}
                height={1448}
                className="h-auto w-full drop-shadow-2xl object-cover"
              />
            </MotionReveal>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
