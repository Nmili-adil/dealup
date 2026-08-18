import Link from "next/link";
import { CheckCircle2, TrendingUp, Zap } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/layout/eyebrow";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { ProductWindow } from "@/components/product/product-window";
import { PhoneMockup } from "@/components/product/phone-mockup";
import { ChatBubble } from "@/components/product/chat-bubble";
import { MetricCard } from "@/components/product/metric-card";
import { localizedHref } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { GradientText, Title } from "../ui/titleCustomize";

export function Hero({ locale, dictionary }: { locale: Locale; dictionary: Dictionary["hero"] }) {
  return (
    <section className="relative overflow-hidden bg-background pb-20 pt-16 lg:pb-28 lg:pt-24">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <MotionReveal className="flex flex-col items-start gap-6">
          <Eyebrow>{dictionary.eyebrow}</Eyebrow>
          {/* <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-balance text-text-primary sm:text-5xl lg:text-[64px]">
            {dictionary.headline}
          </h1> */}
          <Title  size="hero" align="left">
{dictionary.headline}
            <GradientText variant="warm">Hello world</GradientText>
          </Title>
          <p className="max-w-lg text-lg leading-relaxed text-text-secondary">
            {dictionary.subheadline}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={localizedHref(locale, "/get-started")}>{dictionary.primaryCta}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href={localizedHref(locale, "/book-demo")}>{dictionary.secondaryCta}</Link>
            </Button>
          </div>

          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {dictionary.trustReducers.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-sm text-text-muted">
                <CheckCircle2 className="size-4 text-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </MotionReveal>

        <MotionReveal delay={0.15} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative flex justify-center">
            <ProductWindow title={dictionary.windowTitle} className="w-full max-w-md">
              <div className="grid grid-cols-2 gap-3 p-4">
                <MetricCard
                  icon={TrendingUp}
                  label={dictionary.metrics[0].label}
                  value={dictionary.metrics[0].value}
                  trend={dictionary.metrics[0].trend}
                />
                <MetricCard
                  icon={Zap}
                  label={dictionary.metrics[1].label}
                  value={dictionary.metrics[1].value}
                  trend={dictionary.metrics[1].trend}
                />
              </div>
            </ProductWindow>

            <PhoneMockup className="absolute -bottom-10 -end-6 hidden w-[220px] shadow-2xl sm:block lg:-end-16">
              <div className="flex flex-col gap-2 p-3">
                <ChatBubble from="customer">{dictionary.demoChat.question}</ChatBubble>
                <ChatBubble from="agent">{dictionary.demoChat.answer}</ChatBubble>
              </div>
            </PhoneMockup>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
