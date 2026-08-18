import { cn } from "@/lib/utils/cn";

export function ProductWindow({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-ink/20",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-mint/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        {title ? (
          <span className="ms-2 text-xs font-medium text-text-muted">{title}</span>
        ) : null}
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}
