import { cn } from "@/lib/utils/cn";

export function PhoneMockup({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-[300px] overflow-hidden rounded-[2.25rem] border-[6px] border-ink bg-ink shadow-2xl shadow-ink/30",
        className
      )}
    >
      <div className="flex h-6 items-center justify-center bg-ink">
        <div className="h-3.5 w-24 rounded-full bg-black" />
      </div>
      <div className="min-h-[520px] bg-surface-mint">{children}</div>
    </div>
  );
}
