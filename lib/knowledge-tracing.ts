export type BktState = {
  pKnown: number;
  pTransit: number;
  pSlip: number;
  pGuess: number;
};

export function updateBktMastery(state: BktState, isCorrect: boolean): number {
  const prior = state.pKnown;
  const likelihood = isCorrect ? prior * (1 - state.pSlip) : prior * state.pSlip;
  const alternative = isCorrect ? (1 - prior) * state.pGuess : (1 - prior) * (1 - state.pGuess);
  const posterior = likelihood / Math.max(likelihood + alternative, 1e-9);
  const transitioned = posterior + (1 - posterior) * state.pTransit;
  return Math.max(0, Math.min(1, transitioned));
}

export function masteryLevelFromProbability(score: number) {
  if (score >= 0.9) return "EXPERT";
  if (score >= 0.75) return "PROFICIENT";
  if (score >= 0.5) return "DEVELOPING";
  if (score >= 0.25) return "BEGINNER";
  return "NOT_STARTED";
}
