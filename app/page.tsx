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

      {/* 🆕 How It Works Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="gradient-text">How It Works</h2>
            <p className="mt-4 text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Three steps to transform your learning experience
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="relative">
              <div className="card p-8 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-forest-light)] to-[var(--color-forest-deep)] flex items-center justify-center text-white text-3xl mb-6">
                  📊
                </div>
                <div className="inline-block px-3 py-1 bg-[var(--color-forest-deep)]/10 text-[var(--color-forest-deep)] rounded-full text-sm font-medium mb-4">
                  Step 1
                </div>
                <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
                  Assess
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Our AI identifies your current skill level across the knowledge graph. Quick assessments reveal what you know and what's next.
                </p>
              </div>
              {/* Arrow connector (hidden on mobile) */}
              <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-[var(--color-forest-mid)] to-[var(--color-forest-light)]">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--color-forest-light)] rounded-full"></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="card p-8 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-terracotta)] flex items-center justify-center text-white text-3xl mb-6">
                  🌱
                </div>
                <div className="inline-block px-3 py-1 bg-[var(--color-amber)]/10 text-[var(--color-terracotta)] rounded-full text-sm font-medium mb-4">
                  Step 2
                </div>
                <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
                  Adapt
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  The platform generates a personalized learning path that adapts in real-time based on your performance and progress.
                </p>
              </div>
              {/* Arrow connector */}
              <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-terracotta)]">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--color-terracotta)] rounded-full"></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="card p-8 h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-lavender)] to-[#9B86B0] flex items-center justify-center text-white text-3xl mb-6">
                🚀
              </div>
              <div className="inline-block px-3 py-1 bg-[var(--color-lavender)]/10 text-[#9B86B0] rounded-full text-sm font-medium mb-4">
                Step 3
              </div>
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
                Advance
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                AI tutoring supports you at every step. Watch your skills bloom as you progress through the knowledge network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🆕 Product Screenshots Section */}
      <section className="px-6 py-20 bg-[var(--color-canvas-subtle)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="gradient-text">See the Platform in Action</h2>
            <p className="mt-4 text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              A complete adaptive learning ecosystem that grows with your learners
            </p>
          </div>

          <div className="space-y-24">
            {/* Screenshot 1: Skill Graph */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block px-3 py-1 bg-[var(--color-forest-deep)]/10 text-[var(--color-forest-deep)] rounded-full text-sm font-medium mb-4">
                  Visual Knowledge Mapping
                </div>
                <h3 className="text-3xl font-semibold text-[var(--color-text-primary)] mb-4">
                  Interactive Skill Graph
                </h3>
                <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                  See prerequisite relationships as an organic network. Each skill blooms through growth stages from Seed to Flourishing.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                    <span className="text-[var(--color-text-secondary)]">Real-time mastery visualization with color-coded stages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                    <span className="text-[var(--color-text-secondary)]">Interactive filtering by mastery level</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                    <span className="text-[var(--color-text-secondary)]">Click any skill to start learning</span>
                  </li>
                </ul>
                <Link href="/skill-graph" className="inline-flex items-center gap-2 mt-6 text-[var(--color-forest-deep)] font-medium hover:gap-3 transition-all">
                  Explore Skill Graph
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
              <div className="order-1 md:order-2 card p-6 bg-white shadow-strong">
                <div className="aspect-video bg-gradient-to-br from-[var(--color-forest-light)]/20 to-[var(--color-forest-deep)]/20 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🌳</div>
                    <p className="text-[var(--color-text-secondary)]">
                      Interactive skill network with organic growth visualization
                    </p>
                    <Link href="/skill-graph" className="inline-block mt-4 px-6 py-2 bg-[var(--color-forest-deep)] text-white rounded-lg hover:shadow-lg transition-all">
                      View Live Demo
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshot 2: Learner Dashboard */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="card p-6 bg-white shadow-strong">
                <div className="aspect-video bg-gradient-to-br from-[var(--color-amber)]/20 to-[var(--color-terracotta)]/20 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">📈</div>
                    <p className="text-[var(--color-text-secondary)]">
                      Personalized dashboard with progress tracking and recommendations
                    </p>
                    <Link href="/dashboard" className="inline-block mt-4 px-6 py-2 bg-[var(--color-terracotta)] text-white rounded-lg hover:shadow-lg transition-all">
                      View Your Dashboard
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-block px-3 py-1 bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta)] rounded-full text-sm font-medium mb-4">
                  Personalized Learning
                </div>
                <h3 className="text-3xl font-semibold text-[var(--color-text-primary)] mb-4">
                  Learner Dashboard
                </h3>
                <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                  Track your progress, see personalized recommendations, and celebrate your learning milestones.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-terracotta)] mt-1">✓</span>
                    <span className="text-[var(--color-text-secondary)]">AI-powered next-topic recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-terracotta)] mt-1">✓</span>
                    <span className="text-[var(--color-text-secondary)]">Learning streaks and achievement tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-terracotta)] mt-1">✓</span>
                    <span className="text-[var(--color-text-secondary)]">Visual progress bars and mastery levels</span>
                  </li>
                </ul>
                <Link href="/dashboard" className="inline-flex items-center gap-2 mt-6 text-[var(--color-terracotta)] font-medium hover:gap-3 transition-all">
                  Start Learning
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Screenshot 3: AI Tutor */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block px-3 py-1 bg-[var(--color-lavender)]/10 text-[#9B86B0] rounded-full text-sm font-medium mb-4">
                  Intelligent Support
                </div>
                <h3 className="text-3xl font-semibold text-[var(--color-text-primary)] mb-4">
                  AI Tutor
                </h3>
                <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                  Get instant, context-aware guidance whenever you need it. Our AI tutor understands your progress and provides personalized support.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-lavender)] mt-1">✓</span>
                    <span className="text-[var(--color-text-secondary)]">Context-aware responses based on your skill level</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-lavender)] mt-1">✓</span>
                    <span className="text-[var(--color-text-secondary)]">24/7 availability with streaming responses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--color-lavender)] mt-1">✓</span>
                    <span className="text-[var(--color-text-secondary)]">Conversational learning with follow-up questions</span>
                  </li>
                </ul>
                <Link href="/tutor" className="inline-flex items-center gap-2 mt-6 text-[var(--color-lavender)] font-medium hover:gap-3 transition-all">
                  Try AI Tutor
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
              <div className="order-1 md:order-2 card p-6 bg-white shadow-strong">
                <div className="aspect-video bg-gradient-to-br from-[var(--color-lavender)]/20 to-[#9B86B0]/20 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🤖</div>
                    <p className="text-[var(--color-text-secondary)]">
                      Real-time AI tutoring with conversational interface
                    </p>
                    <Link href="/tutor" className="inline-block mt-4 px-6 py-2 bg-[var(--color-lavender)] text-white rounded-lg hover:shadow-lg transition-all">
                      Chat with AI Tutor
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshot 4: Instructor Analytics */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="card p-6 bg-white shadow-strong">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">📊</div>
                    <p className="text-[var(--color-text-secondary)]">
                      Comprehensive analytics dashboard for instructors
                    </p>
                    <Link href="/class-analytics" className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                      View Analytics
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                  Instructor Tools
                </div>
                <h3 className="text-3xl font-semibold text-[var(--color-text-primary)] mb-4">
                  Class Analytics
                </h3>
                <p className="text-lg text-[var(--color-text-secondary)] mb-6">
                  Powerful insights into class performance, skill gaps, and at-risk learners. Take data-driven action.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-[var(--color-text-secondary)]">Real-time class overview with key metrics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-[var(--color-text-secondary)]">Skill gap analysis with struggling student identification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-[var(--color-text-secondary)]">At-risk detection with intervention recommendations</span>
                  </li>
                </ul>
                <Link href="/class-analytics" className="inline-flex items-center gap-2 mt-6 text-blue-600 font-medium hover:gap-3 transition-all">
                  Explore Analytics
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🆕 Social Proof + Metrics Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="gradient-text">Measurable Learning Outcomes</h2>
            <p className="mt-4 text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Backed by adaptive learning research and real-world results
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            <div className="card p-8 text-center hover:shadow-strong transition-all">
              <div className="text-5xl font-bold gradient-text mb-2">3x</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Faster skill acquisition vs traditional learning</div>
            </div>
            <div className="card p-8 text-center hover:shadow-strong transition-all">
              <div className="text-5xl font-bold gradient-text mb-2">92%</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Learner satisfaction with personalized paths</div>
            </div>
            <div className="card p-8 text-center hover:shadow-strong transition-all">
              <div className="text-5xl font-bold gradient-text mb-2">60%</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Reduction in time-to-proficiency</div>
            </div>
            <div className="card p-8 text-center hover:shadow-strong transition-all">
              <div className="text-5xl font-bold gradient-text mb-2">85%</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Knowledge retention after 30 days</div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[var(--color-amber)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[var(--color-text-secondary)] italic mb-6">
                "The skill graph visualization completely changed how I approach learning. Seeing the connections between concepts helped me understand the bigger picture."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-forest-light)] to-[var(--color-forest-deep)] flex items-center justify-center text-white font-semibold">
                  SJ
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-text-primary)]">Sarah Johnson</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">Computer Science Student</div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[var(--color-amber)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[var(--color-text-secondary)] italic mb-6">
                "As an instructor, the analytics dashboard gives me unprecedented insight into where my students are struggling. I can intervene before they fall behind."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-amber)] flex items-center justify-center text-white font-semibold">
                  MC
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-text-primary)]">Michael Chen</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">React Instructor</div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[var(--color-amber)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[var(--color-text-secondary)] italic mb-6">
                "The AI tutor is like having a personal mentor available 24/7. It adapts explanations to my level and never makes me feel stupid for asking questions."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-lavender)] to-[#9B86B0] flex items-center justify-center text-white font-semibold">
                  AP
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-text-primary)]">Aisha Patel</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">Professional Developer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Original - Preserved) */}
      <section className="px-6 py-20 bg-[var(--color-canvas-subtle)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center gradient-text">Core Technology</h2>
          <p className="mt-4 text-center text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Built on proven adaptive learning algorithms and modern AI
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

      {/* 🆕 Comparison Table Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="gradient-text">Why Choose Adapt2Learn?</h2>
            <p className="mt-4 text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Not just another LMS—a true AI-native adaptive learning platform
            </p>
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 font-semibold text-[var(--color-text-primary)]">Feature</th>
                  <th className="text-center p-6 font-semibold text-[var(--color-text-secondary)]">Traditional LMS</th>
                  <th className="text-center p-6 font-semibold text-[var(--color-text-secondary)]">Basic Adaptive</th>
                  <th className="text-center p-6 font-semibold text-[var(--color-forest-deep)] bg-[var(--color-forest-deep)]/5">Adapt2Learn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-text-primary)]">Visual Skill Graph</td>
                  <td className="p-6 text-center text-2xl">❌</td>
                  <td className="p-6 text-center">
                    <span className="text-sm text-[var(--color-text-secondary)]">⚠️ Limited</span>
                  </td>
                  <td className="p-6 text-center bg-[var(--color-forest-deep)]/5">
                    <span className="text-[var(--color-forest-deep)] font-medium">✅ Full Network</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-text-primary)]">Real-Time Adaptation</td>
                  <td className="p-6 text-center text-2xl">❌</td>
                  <td className="p-6 text-center">
                    <span className="text-sm text-[var(--color-text-secondary)]">⚠️ Basic</span>
                  </td>
                  <td className="p-6 text-center bg-[var(--color-forest-deep)]/5">
                    <span className="text-[var(--color-forest-deep)] font-medium">✅ Advanced</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-text-primary)]">AI Tutor (24/7)</td>
                  <td className="p-6 text-center text-2xl">❌</td>
                  <td className="p-6 text-center text-2xl">❌</td>
                  <td className="p-6 text-center bg-[var(--color-forest-deep)]/5">
                    <span className="text-[var(--color-forest-deep)] font-medium">✅ Included</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-text-primary)]">Bayesian Knowledge Tracing</td>
                  <td className="p-6 text-center text-2xl">❌</td>
                  <td className="p-6 text-center">
                    <span className="text-sm text-[var(--color-text-secondary)]">⚠️ Simple</span>
                  </td>
                  <td className="p-6 text-center bg-[var(--color-forest-deep)]/5">
                    <span className="text-[var(--color-forest-deep)] font-medium">✅ Full BKT</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-text-primary)]">Instructor Analytics</td>
                  <td className="p-6 text-center">
                    <span className="text-sm text-[var(--color-text-secondary)]">⚠️ Basic Reports</span>
                  </td>
                  <td className="p-6 text-center">
                    <span className="text-sm text-[var(--color-text-secondary)]">⚠️ Limited</span>
                  </td>
                  <td className="p-6 text-center bg-[var(--color-forest-deep)]/5">
                    <span className="text-[var(--color-forest-deep)] font-medium">✅ Advanced</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-text-primary)]">Learning Path Personalization</td>
                  <td className="p-6 text-center text-2xl">❌</td>
                  <td className="p-6 text-center">
                    <span className="text-sm text-[var(--color-text-secondary)]">⚠️ Rule-Based</span>
                  </td>
                  <td className="p-6 text-center bg-[var(--color-forest-deep)]/5">
                    <span className="text-[var(--color-forest-deep)] font-medium">✅ AI-Powered</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 🆕 Use Cases Section */}
      <section className="px-6 py-20 bg-[var(--color-canvas-subtle)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="gradient-text">Adaptive Learning Across Every Context</h2>
            <p className="mt-4 text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              From K-12 to corporate training—personalized learning that works everywhere
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Use Case 1: Education */}
            <div className="card p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-forest-light)] to-[var(--color-forest-deep)] flex items-center justify-center text-white text-3xl mb-6">
                🎓
              </div>
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
                K-12 & Higher Education
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-6">
                Transform classrooms with visual learning paths that adapt to each student's pace and style.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Track individual student progress</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Identify at-risk learners early</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Differentiated instruction at scale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Gamified achievement tracking</span>
                </li>
              </ul>
            </div>

            {/* Use Case 2: Corporate Training */}
            <div className="card p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-amber)] flex items-center justify-center text-white text-3xl mb-6">
                💼
              </div>
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
                Corporate Training
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-6">
                Accelerate workforce development with AI-powered skill mapping and personalized learning paths.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-terracotta)] mt-1">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">60% faster onboarding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-terracotta)] mt-1">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Skills gap identification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-terracotta)] mt-1">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Role-based learning paths</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-terracotta)] mt-1">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Measurable ROI tracking</span>
                </li>
              </ul>
            </div>

            {/* Use Case 3: Professional Development */}
            <div className="card p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-lavender)] to-[#9B86B0] flex items-center justify-center text-white text-3xl mb-6">
                🚀
              </div>
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
                Professional Development
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-6">
                Continuous learning for professionals who need to stay ahead in rapidly evolving fields.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-lavender)] mt-1">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Self-paced skill development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-lavender)] mt-1">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Certification preparation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-lavender)] mt-1">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Career pathway visualization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--color-lavender)] mt-1">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">24/7 AI mentorship</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Use Cases Row */}
          <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            {/* Use Case 4: Compliance Training */}
            <div className="card p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl mb-4">
                ✅
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                Compliance & Certification
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Ensure regulatory compliance with adaptive training that tracks mastery and completion.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 text-sm mt-0.5">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Automated compliance tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 text-sm mt-0.5">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Audit trail and reporting</span>
                </li>
              </ul>
            </div>

            {/* Use Case 5: Bootcamps */}
            <div className="card p-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-2xl mb-4">
                ⚡
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                Coding Bootcamps & Intensive Programs
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Accelerate learning with real-time adaptation for intensive skill development programs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-sm mt-0.5">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Rapid skill acquisition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-sm mt-0.5">✓</span>
                  <span className="text-sm text-[var(--color-text-secondary)]">Project-based mastery tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 🆕 Technical Credibility Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="gradient-text">Built on Modern AI Infrastructure</h2>
            <p className="mt-4 text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Production-grade technology stack designed for scale and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Tech Stack 1: Frontend */}
            <div className="card p-6">
              <div className="text-4xl mb-4">⚛️</div>
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">Frontend</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li>• Next.js 14+ (React)</li>
                <li>• Server-Side Rendering</li>
                <li>• Edge Caching</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>

            {/* Tech Stack 2: AI/ML */}
            <div className="card p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">AI & Machine Learning</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li>• Bayesian Knowledge Tracing</li>
                <li>• Natural Language Processing</li>
                <li>• Adaptive Algorithms</li>
                <li>• Real-Time Inference</li>
                <li>• LLM Integration</li>
              </ul>
            </div>

            {/* Tech Stack 3: Data */}
            <div className="card p-6">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">Data & Analytics</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li>• Graph Database (Skills)</li>
                <li>• Real-Time Analytics</li>
                <li>• Learning Event Tracking</li>
                <li>• Performance Metrics</li>
                <li>• Export & Reporting</li>
              </ul>
            </div>

            {/* Tech Stack 4: Integration */}
            <div className="card p-6">
              <div className="text-4xl mb-4">🔌</div>
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">Integration Ready</h4>
              <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li>• LTI 1.3 Support</li>
                <li>• SCORM Compatible</li>
                <li>• xAPI (Tin Can)</li>
                <li>• REST API</li>
                <li>• SSO/SAML</li>
              </ul>
            </div>
          </div>

          {/* Architecture Diagram (Simplified Visual) */}
          <div className="mt-16 card p-8 bg-gradient-to-br from-[var(--color-canvas-subtle)] to-white">
            <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-8 text-center">
              System Architecture
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="font-semibold text-[var(--color-forest-deep)] mb-3">Presentation Layer</div>
                <div className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <div>→ Responsive UI</div>
                  <div>→ Real-Time Updates</div>
                  <div>→ Offline Support</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="font-semibold text-[var(--color-terracotta)] mb-3">Intelligence Layer</div>
                <div className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <div>→ Bayesian Tracking</div>
                  <div>→ Path Generation</div>
                  <div>→ AI Tutor Engine</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="font-semibold text-[var(--color-lavender)] mb-3">Data Layer</div>
                <div className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <div>→ Skill Graph DB</div>
                  <div>→ User Progress</div>
                  <div>→ Analytics Events</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🆕 Pricing/Plans Section */}
      <section className="px-6 py-20 bg-[var(--color-canvas-subtle)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="gradient-text">Choose Your Learning Journey</h2>
            <p className="mt-4 text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Flexible plans for individuals, instructors, and institutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plan 1: Learner */}
            <div className="card p-8">
              <div className="text-[var(--color-text-secondary)] font-medium mb-2">Learner</div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-[var(--color-text-primary)]">Free</span>
              </div>
              <p className="text-[var(--color-text-secondary)] mb-8">
                Perfect for individual learners exploring adaptive education
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">Visual skill graph access</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">Personalized learning paths</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">AI tutor support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">Progress tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">Achievement system</span>
                </li>
              </ul>
              <Link href="/dashboard" className="btn btn-ghost w-full text-center">
                Get Started Free
              </Link>
            </div>

            {/* Plan 2: Instructor */}
            <div className="card p-8 ring-2 ring-[var(--color-forest-deep)] relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[var(--color-forest-mid)] to-[var(--color-forest-deep)] text-white text-sm font-medium rounded-full">
                Most Popular
              </div>
              <div className="text-[var(--color-forest-deep)] font-medium mb-2">Instructor</div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-[var(--color-text-primary)]">$49</span>
                <span className="text-[var(--color-text-secondary)]">/month</span>
              </div>
              <p className="text-[var(--color-text-secondary)] mb-8">
                For educators managing classes and tracking student progress
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]"><strong>Everything in Learner</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">Class management dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">Skill gap analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">At-risk student detection</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">Up to 50 students</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">Export reports (CSV)</span>
                </li>
              </ul>
              <Link href="/class-analytics" className="btn btn-primary w-full text-center">
                Start Free Trial
              </Link>
            </div>

            {/* Plan 3: Institution */}
            <div className="card p-8">
              <div className="text-[var(--color-text-secondary)] font-medium mb-2">Institution</div>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-[var(--color-text-primary)]">Custom</span>
              </div>
              <p className="text-[var(--color-text-secondary)] mb-8">
                For schools and organizations with advanced requirements
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]"><strong>Everything in Instructor</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">Unlimited students & instructors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">SSO/SAML integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">LTI 1.3, SCORM, xAPI</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">Dedicated support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--color-forest-mid)] mt-1">✓</span>
                  <span className="text-[var(--color-text-secondary)]">Custom branding</span>
                </li>
              </ul>
              <a href="mailto:sales@adapt2learn.com" className="btn btn-secondary w-full text-center">
                Contact Sales
              </a>
            </div>
          </div>

          {/* Pricing FAQ */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              All plans include a 14-day free trial. No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* 🆕 FAQ Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="gradient-text">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-[var(--color-text-secondary)]">
              Everything you need to know about Adapt2Learn
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <details className="card p-6 group">
              <summary className="cursor-pointer font-semibold text-[var(--color-text-primary)] flex items-center justify-between">
                How does the AI tutor work?
                <svg className="w-5 h-5 text-[var(--color-text-secondary)] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                Our AI tutor uses natural language processing and context from your skill graph to provide personalized explanations. It understands where you are in your learning journey and adapts responses to your level. Think of it as a personal mentor available 24/7.
              </p>
            </details>

            {/* FAQ 2 */}
            <details className="card p-6 group">
              <summary className="cursor-pointer font-semibold text-[var(--color-text-primary)] flex items-center justify-between">
                What makes this different from a traditional LMS?
                <svg className="w-5 h-5 text-[var(--color-text-secondary)] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                Traditional LMS platforms deliver static content in a fixed sequence. Adapt2Learn uses Bayesian Knowledge Tracing to predict your mastery level in real-time and adapts the learning path dynamically. Our visual skill graph shows prerequisite relationships, making learning more intuitive and engaging.
              </p>
            </details>

            {/* FAQ 3 */}
            <details className="card p-6 group">
              <summary className="cursor-pointer font-semibold text-[var(--color-text-primary)] flex items-center justify-between">
                Can I use this for corporate training?
                <svg className="w-5 h-5 text-[var(--color-text-secondary)] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                Absolutely! Adapt2Learn works great for corporate training, onboarding, compliance training, and professional development. Our platform accelerates skill acquisition by 3x and provides clear ROI through analytics on time-to-proficiency and skill gap identification.
              </p>
            </details>

            {/* FAQ 4 */}
            <details className="card p-6 group">
              <summary className="cursor-pointer font-semibold text-[var(--color-text-primary)] flex items-center justify-between">
                Is my data secure?
                <svg className="w-5 h-5 text-[var(--color-text-secondary)] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                Yes. We use industry-standard encryption for data in transit and at rest. Institution plans include SSO/SAML integration, role-based access control, and audit logs. We're FERPA compliant and working toward SOC 2 certification.
              </p>
            </details>

            {/* FAQ 5 */}
            <details className="card p-6 group">
              <summary className="cursor-pointer font-semibold text-[var(--color-text-primary)] flex items-center justify-between">
                What is Bayesian Knowledge Tracing?
                <svg className="w-5 h-5 text-[var(--color-text-secondary)] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                Bayesian Knowledge Tracing (BKT) is a probabilistic model that estimates your mastery of each skill based on your performance. It predicts whether you truly understand a concept or just got lucky on an assessment. This allows the platform to identify knowledge gaps early and recommend the right next steps.
              </p>
            </details>

            {/* FAQ 6 */}
            <details className="card p-6 group">
              <summary className="cursor-pointer font-semibold text-[var(--color-text-primary)] flex items-center justify-between">
                Can I integrate this with my existing LMS?
                <svg className="w-5 h-5 text-[var(--color-text-secondary)} group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                Yes! Institution plans include LTI 1.3, SCORM, and xAPI support for seamless integration with Canvas, Blackboard, Moodle, and other major LMS platforms. You can use Adapt2Learn as a complementary adaptive layer while maintaining your existing infrastructure.
              </p>
            </details>

            {/* FAQ 7 */}
            <details className="card p-6 group">
              <summary className="cursor-pointer font-semibold text-[var(--color-text-primary)] flex items-center justify-between">
                How quickly can I get started?
                <svg className="w-5 h-5 text-[var(--color-text-secondary)] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                Learners can start immediately with our free plan—no credit card required. Instructors get a 14-day free trial with full access to class analytics. For institutions, we typically complete setup and integration within 1-2 weeks.
              </p>
            </details>

            {/* FAQ 8 */}
            <details className="card p-6 group">
              <summary className="cursor-pointer font-semibold text-[var(--color-text-primary)] flex items-center justify-between">
                What subjects/topics does Adapt2Learn support?
                <svg className="w-5 h-5 text-[var(--color-text-secondary)] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-[var(--color-text-secondary)]">
                Currently, we have pre-built skill graphs for computer science (React, JavaScript, Python), mathematics, and professional skills. Institution plans include custom skill graph creation for any subject or domain—we'll work with you to map your curriculum into our adaptive system.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA Section (Original - Enhanced) */}
      <section className="px-6 py-20 bg-gradient-to-br from-[var(--color-forest-light)]/10 via-white to-[var(--color-lavender)]/10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="card p-12 bg-white/80 backdrop-blur-sm">
            <h2 className="gradient-text">Ready to Transform Learning?</h2>
            <p className="mt-6 text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Join thousands of learners and educators experiencing the future of adaptive education. Start your journey today—no credit card required.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/dashboard" className="btn btn-primary text-lg px-8 py-4">
                Start Learning Free
              </Link>
              <Link href="/class-analytics" className="btn btn-secondary text-lg px-8 py-4">
                Try Instructor View
              </Link>
              <Link href="/skill-graph" className="btn btn-ghost text-lg px-8 py-4">
                Explore Demo
              </Link>
            </div>
            <p className="mt-8 text-sm text-[var(--color-text-secondary)]">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
