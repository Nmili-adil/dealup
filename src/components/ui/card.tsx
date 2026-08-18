import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const cardVariants = cva(
  "rounded-2xl border transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border-border bg-white text-text-primary",

        elevated:
          "border-border/60 bg-white text-text-primary shadow-sm hover:shadow-md",

        outline:
          "border-border bg-transparent text-text-primary hover:border-brand/40",

        mint:
          "border-brand/10 bg-surface-mint text-text-primary",

        brand:
          "border-brand bg-brand text-white",

        ai:
          "border-ai/20 bg-ai/5 text-text-primary",

        interactive:
          "border-border bg-white text-text-primary shadow-sm hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md cursor-pointer",
      },

      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {}

function Card({
  className,
  variant,
  size,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function CardTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-lg font-semibold leading-tight tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-sm leading-relaxed text-text-secondary",
        className
      )}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("mt-5", className)}
      {...props}
    />
  );
}

function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "mt-6 flex items-center gap-3",
        className
      )}
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
};