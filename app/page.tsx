import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <div className="animate-fade-in-up stagger-1">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-forest-deep)]/5 text-[var(--color-forest-deep)] text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-Native Adaptive Learning
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="mt-8 max-w-4xl animate-fade-in-up stagger-2">
            <span className="gradient-text text-balance">
              Learning that grows
            </span>
            <br />
            <span className="text-[var(--color-text-primary)]">
              with every learner
            </span>
          </h1>

          {/* Hero Description */}
          <p className="mt-8 max-w-2xl text-xl md:text-2xl text-[var(--color-text-secondary)] leading-relaxed animate-fade-in-up stagger-3">
            Visualize knowledge as an <strong className="text-[var(--color-forest-deep)] font-semibold">organic network</strong>.
            Track mastery in real-time. Let AI guide every step of the journey.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-wrap gap-4 animate-fade-in-up stagger-4">
            <Link href="/dashboard" className="btn btn-primary">
              <span>Start Learning</span>
              <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="/skill-graph" className="btn btn-ghost">
              <span>Explore Skill Graph</span>
            </Link>
            <Link href="/class-analytics" className="btn btn-secondary">
              <span>Instructor View</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up stagger-5">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">100%</div>
              <div className="mt-2 text-sm text-[var(--color-text-secondary)]">Personalized</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">Real-time</div>
              <div className="mt-2 text-sm text-[var(--color-text-secondary)]">Adaptation</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">AI-Powered</div>
              <div className="mt-2 text-sm text-[var(--color-text-secondary)]">Tutoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">Visual</div>
              <div className="mt-2 text-sm text-[var(--color-text-secondary)]">Progress</div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-[var(--color-forest-light)]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[var(--color-terracotta)]/10 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-[var(--color-canvas-subtle)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center gradient-text">How it works</h2>
          <p className="mt-4 text-center text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Transform static courses into living, breathing learning experiences
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-8 animate-grow-in stagger-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-forest-light)] to-[var(--color-forest-deep)] flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="mt-6">Visual Skill Graph</h3>
              <p className="mt-3 text-[var(--color-text-secondary)]">
                See prerequisite relationships as an organic network. Watch mastery bloom in real-time with color-coded growth stages.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-8 animate-grow-in stagger-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-terracotta)] to-[#D16850] flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="mt-6">Bayesian Tracking</h3>
              <p className="mt-3 text-[var(--color-text-secondary)]">
                Advanced Knowledge Tracing algorithm predicts mastery and identifies gaps before learners struggle.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-8 animate-grow-in stagger-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-lavender)] to-[#9B86B0] flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="mt-6">AI Tutor</h3>
              <p className="mt-3 text-[var(--color-text-secondary)]">
                Context-aware AI provides personalized guidance, explanations, and support exactly when needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="card p-12">
            <h2 className="gradient-text">Ready to experience adaptive learning?</h2>
            <p className="mt-6 text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Join the future of education where every path is personalized, every insight is actionable, and every learner flourishes.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/dashboard" className="btn btn-primary text-lg px-8 py-4">
                Start Your Journey
              </Link>
              <Link href="/skill-graph" className="btn btn-ghost text-lg px-8 py-4">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
