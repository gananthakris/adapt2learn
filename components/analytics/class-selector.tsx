'use client';

export function ClassSelector({
  currentClass,
  availableClasses,
  onClassChange
}: {
  currentClass: string;
  availableClasses: { id: string; name: string }[];
  onClassChange: (classId: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-[var(--color-text-secondary)]">Class:</span>

      <select
        value={currentClass}
        onChange={(e) => onClassChange(e.target.value)}
        className="px-4 py-2 border border-[var(--border)] rounded-lg bg-white text-[var(--color-text-primary)] font-medium outline-none focus:border-[var(--color-forest-mid)] transition-colors"
      >
        {availableClasses.map((cls) => (
          <option key={cls.id} value={cls.id}>
            {cls.name}
          </option>
        ))}
      </select>
    </div>
  );
}
