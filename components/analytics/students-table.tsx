'use client';

import { useState } from 'react';
import type { StudentProgress } from "@/lib/types";

function StudentRow({ student, onClick }: { student: StudentProgress; onClick: () => void }) {
  return (
    <tr
      className={`border-b border-[var(--border)] hover:bg-[var(--color-canvas-subtle)] transition-colors cursor-pointer ${
        student.isAtRisk ? 'border-l-4 border-l-[var(--color-terracotta)]' : ''
      }`}
      onClick={onClick}
    >
      <td className="py-4 px-4 font-medium">{student.name}</td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${student.overallProgress}%` }}
            />
          </div>
          <span className="text-sm text-[var(--color-text-secondary)] w-12">
            {student.overallProgress}%
          </span>
        </div>
      </td>

      <td className="py-4 px-4 text-sm text-[var(--color-text-secondary)]">
        {student.lastActive}
      </td>

      <td className="py-4 px-4">
        <span className={student.streak >= 7 ? 'font-medium' : ''}>
          {student.streak}{' '}
          {student.streak >= 7 ? '🔥' : ''}
          {student.streak === 0 ? '⚠️' : ''}
        </span>
      </td>

      <td className="py-4 px-4">
        <button className="text-[var(--color-text-tertiary)] hover:text-[var(--color-forest-deep)] transition-colors">
          ›
        </button>
      </td>
    </tr>
  );
}

export function StudentsTable({
  students,
  onStudentClick
}: {
  students: StudentProgress[];
  onStudentClick: (student: StudentProgress) => void;
}) {
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'streak'>('progress');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'progress') return b.overallProgress - a.overallProgress;
      if (sortBy === 'streak') return b.streak - a.streak;
      return 0;
    });

  return (
    <div className="card p-8 animate-fade-in-up stagger-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[var(--color-forest-deep)]">Students</h3>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-[var(--border)] rounded-lg bg-white text-[var(--color-text-primary)] outline-none focus:border-[var(--color-forest-mid)] transition-colors"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-[var(--border)] rounded-lg bg-white text-[var(--color-text-primary)] outline-none focus:border-[var(--color-forest-mid)] transition-colors"
          >
            <option value="progress">Sort by Progress</option>
            <option value="name">Sort by Name</option>
            <option value="streak">Sort by Streak</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-[var(--border)]">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-[var(--color-text-primary)]">Name</th>
              <th className="text-left py-3 px-4 font-medium text-[var(--color-text-primary)]">Progress</th>
              <th className="text-left py-3 px-4 font-medium text-[var(--color-text-primary)]">Last Active</th>
              <th className="text-left py-3 px-4 font-medium text-[var(--color-text-primary)]">Streak</th>
              <th className="text-left py-3 px-4 font-medium text-[var(--color-text-primary)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                onClick={() => onStudentClick(student)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
