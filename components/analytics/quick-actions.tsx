'use client';

import { ExportReports } from './export-reports';
import type { InstructorState } from '@/lib/types';

export function QuickActions({
  state,
  onCreateAssignment,
  onSendAnnouncement
}: {
  state: InstructorState;
  onCreateAssignment: () => void;
  onSendAnnouncement: () => void;
}) {
  return (
    <div className="card p-6 animate-fade-in-up stagger-3">
      <h4 className="text-[var(--color-text-primary)] font-medium mb-4">Quick Actions</h4>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={onCreateAssignment}
          className="btn btn-primary flex items-center gap-2"
        >
          <span>📝</span>
          <span>Create Assignment</span>
        </button>

        <button
          onClick={onSendAnnouncement}
          className="btn btn-secondary flex items-center gap-2"
        >
          <span>📢</span>
          <span>Send Announcement</span>
        </button>

        <ExportReports state={state} />
      </div>
    </div>
  );
}
