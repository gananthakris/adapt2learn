export function engagementScore(minutesLearned: number, quizzesCompleted: number, streakDays: number) {
  const normalized = Math.min(1, minutesLearned / 180) * 0.5 + Math.min(1, quizzesCompleted / 6) * 0.3 + Math.min(1, streakDays / 7) * 0.2;
  return Math.round(normalized * 100);
}

export function isAtRisk(avgMastery: number, weeklyMinutes: number) {
  return avgMastery < 0.45 || weeklyMinutes < 45;
}
