import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="rounded-xl border border-[var(--border)] bg-white p-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="mt-2 text-[var(--muted)]">
        Amplify Auth UI is not yet integrated in this screen. After configuring sandbox outputs and OAuth secrets,
        wire a hosted UI callback here.
      </p>
      <div className="mt-4">
        <Link href="/dashboard" className="rounded-md bg-[var(--accent)] px-4 py-2 text-white">
          Continue in Demo Mode
        </Link>
      </div>
    </section>
  );
}
