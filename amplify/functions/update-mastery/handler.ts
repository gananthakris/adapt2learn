import type { Handler } from "aws-lambda";

function updateScore(current: number, isCorrect: boolean) {
  const delta = isCorrect ? 0.08 : -0.06;
  return Math.max(0, Math.min(1, current + delta));
}

export const handler: Handler = async (event) => {
  const currentScore = Number(event?.arguments?.currentScore ?? 0.4);
  const isCorrect = Boolean(event?.arguments?.isCorrect);
  const nextScore = updateScore(currentScore, isCorrect);

  return {
    masteryScore: nextScore,
    updatedAt: new Date().toISOString()
  };
};
