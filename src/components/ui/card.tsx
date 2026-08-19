import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const cardVariants = cva(
  "relative flex flex-col rounded-2xl transition-[transform,box-shadow,border-color] duration-300 ease-out",
  {
    variants: {
      tone: {
        // Light sections: white surface lifted off the page.
        surface: "border border-border/70 bg-white shadow-e1",
        // Featured / primary offer.
        featured: "border border-brand/40 bg-white shadow-e3",
        // Dark sections (forest / violet): glass over the deep background.
        glass: "border border-white/12 bg-white/[0.06] backdrop-blur-sm",
      },
      interactive: {
        true: "hover:-translate-y-1",
        false: "",
      },
      padding: {
        none: "",
        sm: "p-5",
        md: "p-6",
        lg: "p-7 sm:p-8",
      },
    },
    compoundVariants: [
      {
        tone: "surface",
        interactive: true,
        class: "hover:border-brand/35 hover:shadow-e3",
      },
      {
        tone: "featured",
        interactive: true,
        class: "hover:shadow-e4",
      },
      {
        tone: "glass",
        interactive: true,
        class: "hover:border-white/25 hover:bg-white/[0.1]",
      },
    ],
    defaultVariants: {
      tone: "surface",
      interactive: false,
      padding: "md",
    },
  }
);

function Card({
  className,
  tone,
  interactive,
  padding,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      className={cn(cardVariants({ tone, interactive, padding, className }))}
      {...props}
    />
  );
}

const iconTileVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
  {
    variants: {
      tone: {
        brand: "bg-brand-dark/6 text-brand-dark ring-1 ring-brand-dark/10",
        ai: "bg-ai/20 text-ai-on-dark ring-1 ring-ai/35",
        inverted: "bg-white/10 text-brand ring-1 ring-white/15",
      },
      size: {
        sm: "size-10 [&>svg]:size-5",
        md: "size-12 [&>svg]:size-6",
      },
    },
    defaultVariants: { tone: "brand", size: "md" },
  }
);

/**
 * Consistent container for a section/feature icon. Keeps icon sizing, stroke
 * weight and optical alignment uniform instead of bare floating glyphs.
 */
function IconTile({
  className,
  tone,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof iconTileVariants>) {
  return (
    <span
      aria-hidden="true"
      className={cn(iconTileVariants({ tone, size, className }))}
      {...props}
    />
  );
}

/* --- Optional slots, preserved from the original card module --- */

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-header" className={cn("flex flex-col gap-1.5", className)} {...props} />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-lg font-semibold leading-tight tracking-tight", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-text-secondary", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("mt-5", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("mt-6 flex items-center gap-3", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
  IconTile,
  iconTileVariants,
};
