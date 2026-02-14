export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, idx) => (
        <div key={idx} className="h-4 animate-pulse rounded bg-[var(--border)]" />
      ))}
    </div>
  );
}
