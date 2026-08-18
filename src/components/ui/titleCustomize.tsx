import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const titleVariants = cva(
  "font-semibold tracking-tight text-balance",
  {
    variants: {
      variant: {
        default: "text-text-primary",

        brand: "text-brand",

        muted: "text-text-secondary",

        inverted: "text-white",

        ai: "text-ai",

        gradient:
          "bg-gradient-to-r from-brand to-ai bg-clip-text text-transparent",
      },

      size: {
        xs: "text-lg leading-7",

        sm: "text-xl leading-8",

        md: "text-2xl leading-tight md:text-3xl",

        lg: "text-3xl leading-tight md:text-4xl",

        xl: "text-4xl leading-[1.1] md:text-5xl",

        hero:
          "text-4xl leading-[1.05] md:text-5xl lg:text-6xl xl:text-7xl",
      },

      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },

      weight: {
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
      align: "left",
      weight: "semibold",
    },
  }
);

type TitleElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  as?: TitleElement;
}

function Title({
  className,
  variant,
  size,
  align,
  weight,
  as: Comp = "h2",
  ...props
}: TitleProps) {
  return (
    <Comp
      className={cn(
        titleVariants({
          variant,
          size,
          align,
          weight,
        }),
        className
      )}
      {...props}
    >
    </Comp>
  );
}



const gradientTextVariants = cva(
  "inline-block bg-clip-text text-transparent",
  {
    variants: {
      variant: {
        brand:
          "bg-gradient-to-r from-brand via-brand-hover to-brand-dark",

        ai:
          "bg-gradient-to-r from-brand via-ai to-brand",

        mint:
          "bg-gradient-to-r from-brand to-emerald-400",

        purple:
          "bg-gradient-to-r from-ai to-purple-400",

        warm:
          "bg-gradient-to-r from-orange-400 via-pink-500 to-ai",
      },

      direction: {
        right: "bg-gradient-to-r",
        left: "bg-gradient-to-l",
        bottom: "bg-gradient-to-b",
        top: "bg-gradient-to-t",
      },
    },

    defaultVariants: {
      variant: "brand",
      direction: "right",
    },
  }
);

interface GradientTextProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof gradientTextVariants> {}


function GradientText({
  className,
  variant,
  direction,
  ...props
}: GradientTextProps) {
  return (
    <span
      className={cn(
        gradientTextVariants({
          variant,
          direction,
        }),
        className
      )}
      {...props}
    />
  );
}



export { Title, titleVariants, GradientText, gradientTextVariants };