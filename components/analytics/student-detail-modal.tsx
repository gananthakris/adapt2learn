'use client';

import { useState } from 'react';
import type { StudentProgress } from '@/lib/types';

type StudentDetailModalProps = {
  student: StudentProgress | null;
  onClose: () => void;
};

export function StudentDetailModal({ student, onClose }: StudentDetailModalProps) {
  if (!student) return null;

  // Mock skill mastery data
  const skillMastery = [
    { skill: 'JSX Syntax', mastery: student.overallProgress + 10 },
    { skill: 'Components', mastery: student.overallProgress + 5 },
    { skill: 'Props & Data Flow', mastery: student.overallProgress - 5 },
    { skill: 'State Management', mastery: student.overallProgress - 10 },
    { skill: 'React Hooks', mastery: student.overallProgress - 8 },
  ].map(s => ({ ...s, mastery: Math.max(0, Math.min(100, s.mastery)) }));

  // Mock activity timeline
  const activityTimeline = [
    { date: '2 hrs ago', activity: 'Completed quiz: State Management', type: 'quiz', score: 85 },
    { date: '5 hrs ago', activity: 'Studied: React Hooks', type: 'study', duration: 45 },
    { date: '1 day ago', activity: 'Completed quiz: Props', type: 'quiz', score: 92 },
    { date: '1 day ago', activity: 'Studied: Component Lifecycle', type: 'study', duration: 30 },
    { date: '2 days ago', activity: 'Completed assignment: Build a Todo App', type: 'assignment', score: 88 },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-strong max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[var(--color-forest-deep)] to-[var(--color-forest-mid)] text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{student.name}</h2>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  📊 {student.overallProgress}% Overall Progress
                </span>
                <span className="flex items-center gap-1">
                  🔥 {student.streak} Day Streak
                </span>
                <span className="flex items-center gap-1">
                  ⏱ Last Active: {student.lastActive}
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
          {/* At-Risk Warning */}
          {student.isAtRisk && (
            <div className="bg-red-50 border-l-4 border-[var(--color-terracotta)] p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--color-terracotta)] mb-1">
                    Student At Risk
                  </h4>
                  <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                    <li>• Low overall mastery ({student.overallProgress}%)</li>
                    {student.streak === 0 && <li>• No active learning streak</li>}
                    {student.lastActive.includes('day') && <li>• Inactive for multiple days</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Skill Mastery Breakdown */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-[var(--color-forest-deep)] mb-4">
              Skill Mastery Breakdown
            </h3>
            <div className="space-y-4">
              {skillMastery.map((skill) => (
                <div key={skill.skill}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[var(--color-text-primary)]">
                      {skill.skill}
                    </span>
                    <span className="text-sm text-[var(--color-text-secondary)]">
                      {skill.mastery}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${skill.mastery}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-[var(--color-forest-deep)] mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {activityTimeline.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-forest-light)] to-[var(--color-forest-deep)] flex items-center justify-center text-white">
                    {item.type === 'quiz' ? '📝' : item.type === 'assignment' ? '📋' : '📚'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[var(--color-text-primary)]">
                      {item.activity}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        {item.date}
                      </span>
                      {item.score && (
                        <span className={`text-sm font-medium ${item.score >= 80 ? 'text-green-600' : 'text-orange-600'}`}>
                          Score: {item.score}%
                        </span>
                      )}
                      {item.duration && (
                        <span className="text-sm text-[var(--color-text-secondary)]">
                          {item.duration} min
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-[var(--color-forest-deep)] mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="btn btn-primary flex items-center justify-center gap-2">
                <span>💬</span>
                <span>Send Message</span>
              </button>
              <button className="btn btn-secondary flex items-center justify-center gap-2">
                <span>📋</span>
                <span>Assign Work</span>
              </button>
              <button className="btn btn-ghost flex items-center justify-center gap-2">
                <span>📊</span>
                <span>View Full Report</span>
              </button>
              <button className="btn btn-ghost flex items-center justify-center gap-2">
                <span>📧</span>
                <span>Email Parent</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
