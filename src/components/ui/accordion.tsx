"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const Accordion = AccordionPrimitive.Root;

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "overflow-hidden rounded-2xl border border-border/70 bg-white shadow-e1 transition-[box-shadow,border-color] duration-300",
        "data-[state=open]:border-brand/30 data-[state=open]:shadow-e2",
        className
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 cursor-pointer items-center justify-between gap-4 px-5 py-5 text-start text-base font-medium text-text-primary transition-colors",
          "hover:text-brand-hover",
          // Keep a visible keyboard indicator — inset so it is never clipped
          // by the item's overflow-hidden rounding.
          "focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brand-hover",
          className
        )}
        {...props}
      >
        <span className="text-balance">{children}</span>
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-full border border-border/80 text-text-secondary transition-colors duration-200 group-hover:border-brand/40 group-hover:text-brand-hover group-data-[state=open]:border-brand/40 group-data-[state=open]:bg-brand/10 group-data-[state=open]:text-brand-hover"
        >
          <Plus className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-45" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("px-5 pb-5 leading-relaxed text-text-secondary", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
