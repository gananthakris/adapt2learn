import type { InstructorState } from "@/lib/types";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: string;
  gradient: string;
  highlight?: boolean;
};

function StatCard({ label, value, icon, gradient, highlight }: StatCardProps) {
  return (
    <div className="card p-6 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
            {label}
          </p>
          <div className="mt-3">
            <span className={`text-5xl font-bold ${highlight ? 'text-[var(--color-terracotta)]' : 'gradient-text'}`}>
              {value}
            </span>
          </div>
        </div>
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export function ClassOverviewCards({ stats }: { stats: InstructorState }) {
  const cards = [
    {
      label: 'Total Students',
      value: stats.totalStudents,
      icon: '👥',
      gradient: 'from-[var(--color-forest-light)] to-[var(--color-forest-deep)]'
    },
    {
      label: 'Average Mastery',
      value: `${stats.averageMastery}%`,
      icon: '📊',
      gradient: 'from-[var(--color-lavender)] to-[#9B86B0]'
    },
    {
      label: 'Active Today',
      value: stats.activeToday,
      icon: '⚡',
      gradient: 'from-[var(--color-amber)] to-[#F4A261]'
    },
    {
      label: 'At Risk',
      value: stats.atRiskCount,
      icon: '⚠️',
      gradient: 'from-[var(--color-terracotta)] to-[#D16850]',
      highlight: true
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-4 animate-fade-in-up">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}
