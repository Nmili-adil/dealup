import { cn } from "@/lib/utils/cn";

export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1520px] px-6 lg:px-10", className)}>
      {children}
    </Tag>
  );
}
