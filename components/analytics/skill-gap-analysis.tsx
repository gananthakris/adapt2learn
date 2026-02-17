'use client';

import type { SkillGap } from "@/lib/types";

function SkillGapRow({ gap, onClick }: { gap: SkillGap; onClick: () => void }) {
  // Color coding: Red >25%, Orange 15-25%, Green <15%
  const color = gap.percentage > 25
    ? 'var(--color-terracotta)'
    : gap.percentage > 15
    ? 'var(--color-amber)'
    : 'var(--color-forest-light)';

  return (
    <div
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--color-canvas-subtle)] transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="w-40 font-medium text-[var(--color-text-primary)]">
        {gap.skillName}
      </div>

      <div className="flex-1">
        <div className="progress-bar">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${gap.percentage}%`,
              background: color
            }}
          />
        </div>
      </div>

      <div className="w-32 text-right text-sm text-[var(--color-text-secondary)]">
        {gap.percentage}% ({gap.strugglingCount}/{gap.totalStudents})
      </div>

      <div className="text-[var(--color-text-tertiary)]">›</div>
    </div>
  );
}

export function SkillGapAnalysis({
  skillGaps,
  onSkillClick
}: {
  skillGaps: SkillGap[];
  onSkillClick: (gap: SkillGap) => void;
}) {
  const sortedGaps = skillGaps.sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="card p-8 animate-fade-in-up stagger-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[var(--color-forest-deep)]">Skill Gap Analysis</h3>
        <span className="text-sm text-[var(--color-text-secondary)]">
          Click to see details
        </span>
      </div>

      <div className="space-y-2">
        {sortedGaps.map((gap) => (
          <SkillGapRow key={gap.skillId} gap={gap} onClick={() => onSkillClick(gap)} />
        ))}
      </div>
    </div>
  );
}
