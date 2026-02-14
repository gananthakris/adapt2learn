"use client";

import Link from "next/link";
import type { DashboardState } from "@/lib/types";

export function DashboardOverview({ state }: { state: DashboardState }) {
  const totalSkills = 8; // Based on React course
  const progress = (state.mastered / totalSkills) * 100;

  return (
    <section className="space-y-8">
      {/* Welcome Header */}
      <div className="animate-fade-in-up">
        <h1>
          <span className="gradient-text">Your Learning Garden</span>
        </h1>
        <p className="mt-3 text-xl text-[var(--color-text-secondary)]">
          Track your growth, nurture your skills
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-3 animate-fade-in-up stagger-1">
        {/* Mastered Skills */}
        <div className="card p-6 group">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
                Skills Flourishing
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-5xl font-bold gradient-text">{state.mastered}</span>
                <span className="text-2xl text-[var(--color-text-tertiary)]">/ {totalSkills}</span>
              </div>
              <div className="mt-4 progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                {Math.round(progress)}% complete
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-forest-light)] to-[var(--color-forest-deep)] flex items-center justify-center text-white text-2xl">
              ✦
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="card p-6 group">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
                Growth Streak
              </p>
              <div className="mt-3">
                <span className="text-5xl font-bold gradient-text">{state.streak}</span>
                <span className="text-xl text-[var(--color-text-tertiary)] ml-2">days</span>
              </div>
              <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                {state.streak >= 7 ? "🔥 On fire! Keep going!" : "Build your consistency"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-terracotta)] to-[#D16850] flex items-center justify-center text-white text-2xl">
              🔥
            </div>
          </div>
        </div>

        {/* Time This Week */}
        <div className="card p-6 group">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
                Time Invested
              </p>
              <div className="mt-3">
                <span className="text-5xl font-bold gradient-text">{state.minutesThisWeek}</span>
                <span className="text-xl text-[var(--color-text-tertiary)] ml-2">min</span>
              </div>
              <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                This week • {Math.round(state.minutesThisWeek / 7)} min/day avg
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-lavender)] to-[#9B86B0] flex items-center justify-center text-white text-2xl">
              ⏱
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="card p-8 animate-fade-in-up stagger-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[var(--color-forest-deep)]">Recommended Next Steps</h3>
            <p className="mt-1 text-[var(--color-text-secondary)]">
              Personalized paths based on your mastery and prerequisites
            </p>
          </div>
          <Link href="/skill-graph" className="btn btn-ghost text-sm">
            View Full Graph
          </Link>
        </div>

        <div className="space-y-3">
          {state.recommendations.length > 0 ? (
            state.recommendations.map((item, idx) => (
              <Link
                key={item.skillId}
                href={`/topics/${item.topicId}`}
                className="block group"
              >
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-canvas-subtle)] hover:bg-white transition-all duration-300 border-2 border-transparent hover:border-[var(--color-forest-light)]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-forest-light)] to-[var(--color-forest-deep)] flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-forest-deep)] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      {item.reason || "Ready to learn • Prerequisites met"}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="w-6 h-6 text-[var(--color-forest-mid)] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-forest-light)] to-[var(--color-forest-deep)] flex items-center justify-center text-white text-3xl mx-auto mb-4">
                🎉
              </div>
              <p className="text-lg font-medium text-[var(--color-text-primary)]">
                All caught up!
              </p>
              <p className="mt-2 text-[var(--color-text-secondary)]">
                You've completed all available skills. Check back for more content.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 animate-fade-in-up stagger-3">
        <Link href="/tutor" className="card p-6 group hover:shadow-lg transition-all">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-lavender)] to-[#9B86B0] flex items-center justify-center text-white text-2xl">
              💬
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-[var(--color-text-primary)]">Ask AI Tutor</h4>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Get personalized help and explanations
              </p>
            </div>
            <svg className="w-5 h-5 text-[var(--color-text-tertiary)] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        <Link href="/analytics" className="card p-6 group hover:shadow-lg transition-all">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-terracotta)] to-[#D16850] flex items-center justify-center text-white text-2xl">
              📊
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-[var(--color-text-primary)]">View Analytics</h4>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Track your progress and insights
              </p>
            </div>
            <svg className="w-5 h-5 text-[var(--color-text-tertiary)] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
}
