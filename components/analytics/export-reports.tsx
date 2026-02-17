'use client';

import { useState } from 'react';
import type { StudentProgress, InstructorState } from '@/lib/types';

function downloadCSV(data: string, filename: string) {
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function generateStudentProgressCSV(students: StudentProgress[]): string {
  const headers = ['Name', 'Overall Progress (%)', 'Last Active', 'Streak (days)', 'At Risk'];
  const rows = students.map(s => [
    s.name,
    s.overallProgress.toString(),
    s.lastActive,
    s.streak.toString(),
    s.isAtRisk ? 'Yes' : 'No'
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  return csv;
}

function generateClassSummaryCSV(state: InstructorState): string {
  const summary = [
    ['Metric', 'Value'],
    ['Class Name', state.availableClasses.find(c => c.id === state.currentClass)?.name || 'Unknown'],
    ['Total Students', state.totalStudents.toString()],
    ['Average Mastery', `${state.averageMastery}%`],
    ['Active Today', state.activeToday.toString()],
    ['At Risk Count', state.atRiskCount.toString()],
    [''],
    ['Skill Gaps'],
    ['Skill', 'Struggling %', 'Struggling Count'],
    ...state.skillGaps.map(sg => [sg.skillName, `${sg.percentage}%`, sg.strugglingCount.toString()])
  ];

  return summary.map(row => row.join(',')).join('\n');
}

export function ExportReports({ state }: { state: InstructorState }) {
  const [isOpen, setIsOpen] = useState(false);
  const [exportType, setExportType] = useState<'students' | 'summary' | 'full'>('students');

  const handleExport = () => {
    const className = state.availableClasses.find(c => c.id === state.currentClass)?.name || 'class';
    const timestamp = new Date().toISOString().split('T')[0];

    if (exportType === 'students') {
      const csv = generateStudentProgressCSV(state.students);
      downloadCSV(csv, `${className}-student-progress-${timestamp}.csv`);
    } else if (exportType === 'summary') {
      const csv = generateClassSummaryCSV(state);
      downloadCSV(csv, `${className}-class-summary-${timestamp}.csv`);
    } else {
      // Full report - both summary and students
      const summaryCsv = generateClassSummaryCSV(state);
      const studentsCsv = generateStudentProgressCSV(state.students);
      const fullCsv = `${summaryCsv}\n\n\nSTUDENT DETAILS\n${studentsCsv}`;
      downloadCSV(fullCsv, `${className}-full-report-${timestamp}.csv`);
    }

    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn btn-ghost flex items-center gap-2"
      >
        <span>📊</span>
        <span>Export Report</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsOpen(false)}>
      <div
        className="bg-white rounded-2xl shadow-strong max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[var(--color-forest-deep)]">Export Report</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Choose the type of report to export as CSV:
          </p>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="exportType"
                value="students"
                checked={exportType === 'students'}
                onChange={(e) => setExportType(e.target.value as any)}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-[var(--color-text-primary)]">
                  Student Progress Report
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Detailed list of all {state.totalStudents} students with progress, activity, and streak data
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="exportType"
                value="summary"
                checked={exportType === 'summary'}
                onChange={(e) => setExportType(e.target.value as any)}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-[var(--color-text-primary)]">
                  Class Summary Report
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Overview metrics and skill gap analysis for the class
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="exportType"
                value="full"
                checked={exportType === 'full'}
                onChange={(e) => setExportType(e.target.value as any)}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-[var(--color-text-primary)]">
                  Full Report
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Complete report including summary and all student details
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg font-medium text-[var(--color-text-primary)] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex-1 btn btn-primary"
          >
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
}
