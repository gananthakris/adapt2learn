import Link from "next/link";

export function ContinueLearning({ topicId, title }: { topicId: string; title: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-4">
      <p className="text-sm text-[var(--muted)]">Continue Learning</p>
      <Link href={`/topics/${topicId}`} className="mt-1 inline-block text-lg font-semibold text-[var(--sky)] underline">
        {title}
      </Link>
    </div>
  );
}
