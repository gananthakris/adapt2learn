import type { InstructorState } from "@/lib/types";

export function InstructorAnalytics({ state }: { state: InstructorState }) {
  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">Instructor Analytics</h1>
      <div className="rounded-xl border border-[var(--border)] bg-white p-4">
        <p className="text-sm text-[var(--muted)]">Class Overview</p>
        <p className="text-xl font-semibold">{state.activeLearners} active learners</p>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-white p-4">
        <h2 className="font-medium">At-Risk Learners</h2>
        <ul className="mt-2 space-y-1">
          {state.atRisk.map((learner) => (
            <li key={learner.id}>{learner.name} - {learner.reason}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
