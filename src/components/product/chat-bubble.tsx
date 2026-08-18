import { cn } from "@/lib/utils/cn";

export function ChatBubble({
  from,
  children,
  className,
}: {
  from: "customer" | "agent" | "ai";
  children: React.ReactNode;
  className?: string;
}) {
  const isCustomer = from === "customer";

  return (
    <div className={cn("flex", isCustomer ? "justify-start" : "justify-end", className)}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isCustomer && "rounded-ss-sm bg-white text-text-primary shadow-sm",
          from === "agent" && "rounded-se-sm bg-brand text-white",
          from === "ai" && "rounded-se-sm border border-ai/30 bg-white text-ai-dark shadow-sm"
        )}
      >
        {children}
      </div>
    </div>
  );
}
