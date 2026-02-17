'use client';

import type { SkillGap, StudentProgress } from '@/lib/types';

type SkillGapDrilldownProps = {
  skillGap: SkillGap | null;
  students: StudentProgress[];
  onClose: () => void;
};

export function SkillGapDrilldown({ skillGap, students, onClose }: SkillGapDrilldownProps) {
  if (!skillGap) return null;

  const strugglingStudents = students.filter(s =>
    skillGap.strugglingStudentIds.includes(s.id)
  );

  const proficientStudents = students.filter(s =>
    !skillGap.strugglingStudentIds.includes(s.id)
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-strong max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[var(--color-terracotta)] to-[#D16850] text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{skillGap.skillName}</h2>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-1">
                  📊 {skillGap.percentage}% struggling
                </span>
                <span className="flex items-center gap-1">
                  👥 {skillGap.strugglingCount} of {skillGap.totalStudents} students
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-3xl leading-none transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="card p-4">
              <p className="text-sm text-[var(--color-text-secondary)] mb-1">Struggling</p>
              <p className="text-3xl font-bold text-[var(--color-terracotta)]">
                {skillGap.strugglingCount}
              </p>
            </div>
            <div className="card p-4">
              <p className="text-sm text-[var(--color-text-secondary)] mb-1">Proficient</p>
              <p className="text-3xl font-bold text-[var(--color-forest-deep)]">
                {proficientStudents.length}
              </p>
            </div>
            <div className="card p-4">
              <p className="text-sm text-[var(--color-text-secondary)] mb-1">Gap Percentage</p>
              <p className="text-3xl font-bold text-[var(--color-amber)]">
                {skillGap.percentage}%
              </p>
            </div>
          </div>

          {/* Struggling Students */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[var(--color-terracotta)]">
                Students Struggling with {skillGap.skillName}
              </h3>
              <span className="text-sm text-[var(--color-text-secondary)]">
                {strugglingStudents.length} students
              </span>
            </div>

            {strugglingStudents.length > 0 ? (
              <div className="space-y-3">
                {strugglingStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 bg-red-50/50 border-l-4 border-[var(--color-terracotta)] rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-[var(--color-text-primary)]">
                        {student.name}
                      </h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-[var(--color-text-secondary)]">
                        <span>Overall: {student.overallProgress}%</span>
                        <span>•</span>
                        <span>Streak: {student.streak} days</span>
                        <span>•</span>
                        <span>{student.lastActive}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 bg-white border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        Assign Practice
                      </button>
                      <button className="px-3 py-1.5 bg-white border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-[var(--color-text-secondary)]">
                No students struggling with this skill
              </p>
            )}
          </div>

          {/* Suggested Actions */}
          <div className="card p-6 bg-[var(--color-canvas-subtle)]">
            <h3 className="text-xl font-semibold text-[var(--color-forest-deep)] mb-4">
              Suggested Interventions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="btn btn-primary flex items-center justify-center gap-2">
                <span>📝</span>
                <span>Create Practice Assignment</span>
              </button>
              <button className="btn btn-secondary flex items-center justify-center gap-2">
                <span>📢</span>
                <span>Send Group Message</span>
              </button>
              <button className="btn btn-ghost flex items-center justify-center gap-2">
                <span>👥</span>
                <span>Form Study Group</span>
              </button>
              <button className="btn btn-ghost flex items-center justify-center gap-2">
                <span>📚</span>
                <span>Share Resources</span>
              </button>
            </div>
          </div>

          {/* Proficient Students (Collapsed) */}
          <details className="card p-6">
            <summary className="cursor-pointer font-semibold text-[var(--color-forest-deep)] mb-4">
              Proficient Students ({proficientStudents.length})
            </summary>
            <div className="space-y-2 mt-4">
              {proficientStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 bg-green-50/50 border-l-4 border-green-500 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-[var(--color-text-primary)]">
                      {student.name}
                    </span>
                    <span className="ml-3 text-sm text-[var(--color-text-secondary)]">
                      {student.overallProgress}% overall
                    </span>
                  </div>
                  <span className="text-green-600 font-medium">✓ Proficient</span>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
