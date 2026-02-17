'use client';

import { useState } from 'react';

type AnnouncementModalProps = {
  isOpen: boolean;
  onClose: () => void;
  className: string;
  totalStudents: number;
};

export function AnnouncementModal({ isOpen, onClose, className, totalStudents }: AnnouncementModalProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState<'all' | 'at-risk'>('all');
  const [priority, setPriority] = useState<'normal' | 'important' | 'urgent'>('normal');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    setSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSending(false);
    setSent(true);

    // Reset after 2 seconds
    setTimeout(() => {
      setSent(false);
      setTitle('');
      setMessage('');
      setRecipients('all');
      setPriority('normal');
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  if (sent) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-strong max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-4xl mx-auto mb-4">
            ✓
          </div>
          <h3 className="text-2xl font-bold text-[var(--color-forest-deep)] mb-2">
            Announcement Sent!
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Your message has been delivered to {recipients === 'all' ? 'all students' : 'at-risk students'}
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
        <div className="sticky top-0 bg-gradient-to-r from-[var(--color-lavender)] to-[#9B86B0] text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-1">Send Announcement</h2>
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
          {/* Recipients */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
              Send To
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="recipients"
                  value="all"
                  checked={recipients === 'all'}
                  onChange={(e) => setRecipients(e.target.value as any)}
                />
                <div>
                  <div className="font-medium">All Students</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    {totalStudents} recipients
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="recipients"
                  value="at-risk"
                  checked={recipients === 'at-risk'}
                  onChange={(e) => setRecipients(e.target.value as any)}
                />
                <div>
                  <div className="font-medium">At-Risk Only</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    4 recipients
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
              Priority
            </label>
            <div className="flex gap-3">
              {(['normal', 'important', 'urgent'] as const).map((p) => (
                <label
                  key={p}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    priority === p
                      ? 'border-[var(--color-forest-mid)] bg-[var(--color-forest-light)]/10'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={p}
                    checked={priority === p}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="sr-only"
                  />
                  <span className="font-medium capitalize">{p}</span>
                  {p === 'urgent' && <span>🚨</span>}
                  {p === 'important' && <span>⚠️</span>}
                </label>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Announcement Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Important: Quiz on Friday"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-[var(--color-forest-mid)] transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your announcement here..."
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-[var(--color-forest-mid)] transition-colors resize-none"
            />
            <p className="text-sm text-[var(--color-text-secondary)] mt-2">
              {message.length} characters
            </p>
          </div>

          {/* Preview */}
          {title && message && (
            <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-xs font-medium text-[var(--color-text-secondary)] mb-3">
                PREVIEW
              </p>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                {priority !== 'normal' && (
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium mb-2 ${
                    priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {priority === 'urgent' ? '🚨' : '⚠️'} {priority.toUpperCase()}
                  </div>
                )}
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  {title}
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap">
                  {message}
                </p>
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
              onClick={handleSend}
              disabled={!title || !message || sending}
              className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>📢</span>
                  Send Announcement
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
