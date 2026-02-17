'use client';

import type { AtRiskStudent } from '@/lib/types';

function RiskLevelBadge({ level }: { level: 'high' | 'medium' | 'low' }) {
  const styles = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-orange-100 text-orange-800 border-orange-300',
    low: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  };

  const icons = {
    high: '🚨',
    medium: '⚠️',
    low: '⚡',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${styles[level]}`}>
      <span>{icons[level]}</span>
      <span className="uppercase">{level} Risk</span>
    </span>
  );
}

function SuggestedInterventions({ riskLevel }: { riskLevel: 'high' | 'medium' | 'low' }) {
  const interventions = {
    high: [
      'Schedule one-on-one meeting',
      'Assign peer tutor',
      'Contact parent/guardian',
      'Review learning plan'
    ],
    medium: [
      'Send check-in message',
      'Recommend practice exercises',
      'Monitor progress weekly'
    ],
    low: [
      'Send encouragement message',
      'Share helpful resources'
    ]
  };

  return (
    <div className="mt-3 pl-4 border-l-2 border-gray-200">
      <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-2">
        Suggested Interventions:
      </p>
      <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
        {interventions[riskLevel].map((intervention, idx) => (
          <li key={idx}>• {intervention}</li>
        ))}
      </ul>
    </div>
  );
}

export function AtRiskStudents({ students, onStudentClick }: { students: AtRiskStudent[]; onStudentClick?: (studentId: string) => void }) {
  if (students.length === 0) {
    return (
      <div className="card p-8 animate-fade-in-up stagger-3">
        <h3 className="text-[var(--color-forest-deep)] mb-4">At-Risk Students</h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-3xl mx-auto mb-4">
            ✓
          </div>
          <p className="text-lg font-medium text-[var(--color-text-primary)]">
            All students on track!
          </p>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            No students currently at risk
          </p>
        </div>
      </div>
    );
  }

  // Sort by risk level (high → medium → low)
  const sortedStudents = [...students].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.riskLevel] - order[b.riskLevel];
  });

  return (
    <div className="card p-8 animate-fade-in-up stagger-3">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[var(--color-forest-deep)]">At-Risk Students</h3>
        <span className="text-sm text-[var(--color-text-secondary)]">
          {students.length} student{students.length !== 1 ? 's' : ''} need attention
        </span>
      </div>

      <div className="space-y-4">
        {sortedStudents.map((student) => (
          <div
            key={student.id}
            className="border-l-4 border-[var(--color-terracotta)] bg-red-50/50 p-4 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
            onClick={() => onStudentClick?.(student.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">
                  {student.name}
                </h4>
                <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                  <span>{student.overallProgress}% mastery</span>
                  <span>•</span>
                  <span>Last active: {student.lastActive}</span>
                </div>
              </div>
              <RiskLevelBadge level={student.riskLevel} />
            </div>

            <div className="space-y-1 mb-3">
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                Risk Factors:
              </p>
              <ul className="text-sm text-[var(--color-text-primary)] space-y-1">
                {student.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[var(--color-terracotta)]">▸</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            <SuggestedInterventions riskLevel={student.riskLevel} />

            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1.5 bg-white border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--color-text-primary)] hover:bg-gray-50 transition-colors">
                Send Message
              </button>
              <button className="px-3 py-1.5 bg-white border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--color-text-primary)] hover:bg-gray-50 transition-colors">
                Assign Work
              </button>
              <button className="px-3 py-1.5 bg-white border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--color-text-primary)] hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
