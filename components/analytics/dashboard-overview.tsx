import Link from "next/link";
import type { DashboardState } from "@/lib/types";

export function DashboardOverview({ state }: { state: DashboardState }) {
  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">Learner Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-white p-4"><p className="text-sm text-[var(--muted)]">Mastered Skills</p><p className="text-3xl font-bold">{state.mastered}</p></div>
        <div className="rounded-xl border border-[var(--border)] bg-white p-4"><p className="text-sm text-[var(--muted)]">Current Streak</p><p className="text-3xl font-bold">{state.streak} days</p></div>
        <div className="rounded-xl border border-[var(--border)] bg-white p-4"><p className="text-sm text-[var(--muted)]">Time This Week</p><p className="text-3xl font-bold">{state.minutesThisWeek} min</p></div>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-white p-4">
        <p className="text-sm text-[var(--muted)]">Next For You</p>
        <ul className="mt-2 space-y-2">
          {state.recommendations.map((item) => (
            <li key={item.skillId}>
              <Link className="text-[var(--sky)] underline" href={`/topics/${item.topicId}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
