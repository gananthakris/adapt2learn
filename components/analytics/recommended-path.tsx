import Link from "next/link";
import type { Recommendation } from "@/lib/types";

export function RecommendedPath({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white p-4">
      <h2 className="font-medium">Recommended Learning Path</h2>
      <ul className="mt-2 space-y-1 text-sm">
        {recommendations.map((item) => (
          <li key={item.skillId}>
            <Link href={`/topics/${item.topicId}`} className="text-[var(--sky)] underline">{item.title}</Link>
            <span className="text-[var(--muted)]"> - {item.reason}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
