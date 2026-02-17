'use client';

import type { AnalyticsState } from "@/lib/types";

export function LearnerAnalytics({ state }: { state: AnalyticsState }) {
  const maxMastery = Math.max(...state.masteryTrend.map(d => d.value));
  const maxTime = Math.max(...state.timeByTopic.map(d => d.minutes));

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1>
          <span className="gradient-text">Your Learning Analytics</span>
        </h1>
        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
          Track your progress and see how you're growing
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Mastery Progression Chart */}
        <div className="card p-8 animate-fade-in-up stagger-1">
          <h2 className="text-2xl font-semibold text-[var(--color-forest-deep)] mb-6">
            Mastery Progression
          </h2>

          <div className="space-y-6">
            {/* Chart */}
            <div className="relative h-64 flex items-end justify-around gap-2 bg-[var(--color-canvas-subtle)] rounded-xl p-6">
              {/* Y-axis labels */}
              <div className="absolute left-2 top-4 bottom-4 flex flex-col justify-between text-xs text-[var(--color-text-tertiary)]">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              {/* Grid lines */}
              <div className="absolute left-12 right-4 top-4 bottom-4">
                {[0, 25, 50, 75, 100].map((line) => (
                  <div
                    key={line}
                    className="absolute w-full border-t border-gray-200"
                    style={{ bottom: `${line}%` }}
                  />
                ))}
              </div>

              {/* Bars */}
              {state.masteryTrend.map((item, idx) => {
                const heightPercent = (item.value / maxMastery) * 100;
                const isHighest = item.value === maxMastery;

                return (
                  <div key={item.week} className="flex-1 flex flex-col items-center justify-end group relative">
                    {/* Bar */}
                    <div
                      className="w-full rounded-t-lg transition-all duration-700 hover:opacity-80"
                      style={{
                        height: `${heightPercent}%`,
                        background: `linear-gradient(to top, ${
                          isHighest ? 'var(--color-amber)' : 'var(--color-forest-mid)'
                        }, ${
                          isHighest ? 'var(--color-terracotta)' : 'var(--color-forest-light)'
                        })`,
                        boxShadow: isHighest ? '0 -4px 12px rgba(244, 162, 97, 0.4)' : 'none',
                        animationDelay: `${idx * 0.1}s`
                      }}
                    />

                    {/* Hover tooltip */}
                    <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-[var(--color-forest-deep)] text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                        {Math.round(item.value * 100)}% mastery
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--color-forest-deep)]"></div>
                      </div>
                    </div>

                    {/* Label */}
                    <div className="mt-2 text-sm font-medium text-[var(--color-text-secondary)]">
                      {item.week}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[var(--color-canvas-subtle)] rounded-lg">
                <div className="text-2xl font-bold gradient-text">
                  {Math.round(state.masteryTrend[state.masteryTrend.length - 1].value * 100)}%
                </div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-1">Current</div>
              </div>
              <div className="text-center p-4 bg-[var(--color-canvas-subtle)] rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  +{Math.round((state.masteryTrend[state.masteryTrend.length - 1].value - state.masteryTrend[0].value) * 100)}%
                </div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-1">Growth</div>
              </div>
              <div className="text-center p-4 bg-[var(--color-canvas-subtle)] rounded-lg">
                <div className="text-2xl font-bold gradient-text">
                  {state.masteryTrend.length}
                </div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-1">Weeks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Spent by Topic Chart */}
        <div className="card p-8 animate-fade-in-up stagger-2">
          <h2 className="text-2xl font-semibold text-[var(--color-forest-deep)] mb-6">
            Time Spent by Topic
          </h2>

          <div className="space-y-4">
            {state.timeByTopic.map((item, idx) => {
              const widthPercent = (item.minutes / maxTime) * 100;
              const isLongest = item.minutes === maxTime;

              return (
                <div key={item.topic} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[var(--color-text-primary)]">
                      {item.topic}
                    </span>
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {item.minutes} min
                    </span>
                  </div>

                  <div className="h-8 bg-[var(--color-canvas-subtle)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 flex items-center justify-end px-3"
                      style={{
                        width: `${widthPercent}%`,
                        background: `linear-gradient(90deg, ${
                          isLongest ? 'var(--color-terracotta)' : 'var(--color-lavender)'
                        }, ${
                          isLongest ? 'var(--color-amber)' : 'var(--color-forest-light)'
                        })`,
                        animationDelay: `${idx * 0.1}s`
                      }}
                    >
                      {widthPercent > 25 && (
                        <span className="text-xs font-medium text-white">
                          {item.minutes} min
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Total time */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-[var(--color-text-primary)]">
                  Total Time
                </span>
                <div className="text-right">
                  <div className="text-3xl font-bold gradient-text">
                    {state.timeByTopic.reduce((sum, item) => sum + item.minutes, 0)}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Insights */}
      <div className="card p-8 animate-fade-in-up stagger-3">
        <h2 className="text-2xl font-semibold text-[var(--color-forest-deep)] mb-6">
          Learning Insights
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Most practiced topic */}
          <div className="flex items-start gap-4 p-4 bg-[var(--color-canvas-subtle)] rounded-xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-amber)] flex items-center justify-center text-white text-2xl flex-shrink-0">
              🔥
            </div>
            <div>
              <div className="text-sm text-[var(--color-text-secondary)]">Most Practiced</div>
              <div className="text-lg font-semibold text-[var(--color-text-primary)] mt-1">
                {state.timeByTopic.reduce((max, item) => item.minutes > max.minutes ? item : max).topic}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                {Math.max(...state.timeByTopic.map(t => t.minutes))} minutes
              </div>
            </div>
          </div>

          {/* Average study time */}
          <div className="flex items-start gap-4 p-4 bg-[var(--color-canvas-subtle)] rounded-xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-lavender)] to-[#9B86B0] flex items-center justify-center text-white text-2xl flex-shrink-0">
              ⏱
            </div>
            <div>
              <div className="text-sm text-[var(--color-text-secondary)]">Avg per Topic</div>
              <div className="text-lg font-semibold text-[var(--color-text-primary)] mt-1">
                {Math.round(state.timeByTopic.reduce((sum, item) => sum + item.minutes, 0) / state.timeByTopic.length)} min
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                Study time average
              </div>
            </div>
          </div>

          {/* Progress rate */}
          <div className="flex items-start gap-4 p-4 bg-[var(--color-canvas-subtle)] rounded-xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-forest-light)] to-[var(--color-forest-deep)] flex items-center justify-center text-white text-2xl flex-shrink-0">
              📈
            </div>
            <div>
              <div className="text-sm text-[var(--color-text-secondary)]">Growth Rate</div>
              <div className="text-lg font-semibold text-[var(--color-text-primary)] mt-1">
                +{Math.round((state.masteryTrend[state.masteryTrend.length - 1].value - state.masteryTrend[0].value) / state.masteryTrend.length * 100)}%
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                Per week average
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
