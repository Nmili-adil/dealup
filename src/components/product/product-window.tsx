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
        "overflow-hidden rounded-2xl border border-border/60 bg-white shadow-e4",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-linear-to-b from-white to-surface-mint/70 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        {title ? (
          <span className="ms-2 truncate text-xs font-medium text-text-secondary">
            {title}
          </span>
        ) : null}
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}
