'use client';

import { useState } from 'react';

type AssignmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  className: string;
};

export function AssignmentModal({ isOpen, onClose, className }: AssignmentModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skillId, setSkillId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignTo, setAssignTo] = useState<'all' | 'at-risk' | 'specific'>('all');
  const [points, setPoints] = useState('100');
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const skills = [
    { id: 'jsx', name: 'JSX Syntax' },
    { id: 'components', name: 'Component Design' },
    { id: 'props', name: 'Props & Data Flow' },
    { id: 'state', name: 'State Management' },
    { id: 'hooks', name: 'React Hooks' },
  ];

  const handleCreate = async () => {
    setCreating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCreating(false);
    setCreated(true);

    // Reset after 2 seconds
    setTimeout(() => {
      setCreated(false);
      setTitle('');
      setDescription('');
      setSkillId('');
      setDueDate('');
      setAssignTo('all');
      setPoints('100');
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  if (created) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-strong max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-forest-light)] to-[var(--color-forest-deep)] flex items-center justify-center text-white text-4xl mx-auto mb-4">
            ✓
          </div>
          <h3 className="text-2xl font-bold text-[var(--color-forest-deep)] mb-2">
            Assignment Created!
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Students have been notified and can start working on it
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[var(--color-forest-mid)] to-[var(--color-forest-deep)] text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-1">Create Assignment</h2>
              <p className="text-white/90 text-sm">{className}</p>
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
          {/* Assignment Title */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Assignment Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Build a Counter Component"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-[var(--color-forest-mid)] transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the assignment objectives and requirements..."
              rows={5}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-[var(--color-forest-mid)] transition-colors resize-none"
            />
          </div>

          {/* Skill & Points Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Target Skill */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Target Skill *
              </label>
              <select
                value={skillId}
                onChange={(e) => setSkillId(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-[var(--color-forest-mid)] transition-colors bg-white"
              >
                <option value="">Select a skill...</option>
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Points */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                Points
              </label>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                min="0"
                max="1000"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-[var(--color-forest-mid)] transition-colors"
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Due Date *
            </label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-[var(--color-forest-mid)] transition-colors"
            />
          </div>

          {/* Assign To */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
              Assign To
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="assignTo"
                  value="all"
                  checked={assignTo === 'all'}
                  onChange={(e) => setAssignTo(e.target.value as any)}
                />
                <div className="flex-1">
                  <div className="font-medium">All Students</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Assign to everyone in the class
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="assignTo"
                  value="at-risk"
                  checked={assignTo === 'at-risk'}
                  onChange={(e) => setAssignTo(e.target.value as any)}
                />
                <div className="flex-1">
                  <div className="font-medium">At-Risk Students Only</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Extra practice for struggling students
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="assignTo"
                  value="specific"
                  checked={assignTo === 'specific'}
                  onChange={(e) => setAssignTo(e.target.value as any)}
                />
                <div className="flex-1">
                  <div className="font-medium">Specific Students</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Select individual students
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Preview */}
          {title && description && (
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-3">
                PREVIEW
              </p>
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {title}
                  </h4>
                  <span className="px-3 py-1 bg-[var(--color-forest-light)]/20 text-[var(--color-forest-deep)] rounded-full text-sm font-medium">
                    {points} pts
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4 whitespace-pre-wrap">
                  {description}
                </p>
                <div className="flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
                  {skillId && (
                    <span className="flex items-center gap-1">
                      🎯 {skills.find(s => s.id === skillId)?.name}
                    </span>
                  )}
                  {dueDate && (
                    <span className="flex items-center gap-1">
                      📅 Due: {new Date(dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-[var(--border)] rounded-lg font-medium text-[var(--color-text-primary)] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!title || !description || !skillId || !dueDate || creating}
              className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Creating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>📝</span>
                  Create Assignment
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
