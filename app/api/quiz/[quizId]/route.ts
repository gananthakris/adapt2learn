import { NextRequest, NextResponse } from "next/server";
import { getQuizById } from "@/lib/seed-data";

export async function GET(_request: NextRequest, { params }: { params: { quizId: string } }) {
  const quiz = getQuizById(params.quizId);
  if (!quiz) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const sanitized = {
    ...quiz,
    questions: quiz.questions.map((question) => ({
      id: question.id,
      prompt: question.prompt,
      options: question.options,
      explanation: question.explanation
    }))
  };
  return NextResponse.json({ quiz: sanitized });
}
