import Link from "next/link";

export default function HomePage() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
      <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Adapt2Learn</p>
      <h1 className="mt-2 text-4xl font-bold leading-tight">Real-time adaptive learning with AI tutoring and visual skill mapping.</h1>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">
        This MVP demonstrates the full learning loop: diagnose gaps, generate targeted content, tutor in context, and update mastery live.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link className="rounded-md bg-[var(--accent)] px-4 py-2 text-white" href="/dashboard">
          Open learner dashboard
        </Link>
        <Link className="rounded-md border border-[var(--border)] px-4 py-2" href="/class-analytics">
          Open instructor view
        </Link>
      </div>
    </section>
  );
}
