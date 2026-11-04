import { Mockup } from "@/components/product/mockup";

/**
 * Standard hero visual: a Mockup key wrapped in the same glow + ring frame
 * used across the platform's product heroes. Keeps feature heroes visually
 * consistent with the existing product pages.
 */
export function HeroMockup({
  name,
  alt,
  sizes = "(max-width: 1024px) 92vw, 50vw",
  ratio = "16 / 10",
  priority = true,
  className,
}: {
  name: string;
  alt: string;
  sizes?: string;
  ratio?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[660px] lg:max-w-none lg:-me-8 xl:-me-16">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-brand/10 blur-3xl"
      />
      <Mockup
        name={name}
        alt={alt}
        ratio={ratio}
        sizes={sizes}
        priority={priority}
        className={className ?? "block"}
      />
    </div>
  );
}
