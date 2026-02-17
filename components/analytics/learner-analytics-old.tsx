import type { AnalyticsState } from "@/lib/types";

export function LearnerAnalytics({ state }: { state: AnalyticsState }) {
  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">Learner Analytics</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-white p-4">
          <h2 className="font-medium">Mastery Progression</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {state.masteryTrend.map((item) => (
              <li key={item.week}>{item.week}: {Math.round(item.value * 100)}%</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-white p-4">
          <h2 className="font-medium">Time Spent by Topic</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {state.timeByTopic.map((item) => (
              <li key={item.topic}>{item.topic}: {item.minutes} min</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
