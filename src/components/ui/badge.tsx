import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        neutral: "bg-surface-mint text-text-secondary",
        brand: "bg-brand/10 text-brand-hover",
        ai: "bg-ai/10 text-ai",
        hot: "bg-orange-100 text-orange-700",
        cold: "bg-sky-100 text-sky-700",
        success: "bg-emerald-100 text-emerald-700",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };
