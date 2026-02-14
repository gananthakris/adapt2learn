"use client";

import { useMemo, useState } from "react";
import type { SeedQuiz } from "@/lib/types";

export function QuizInterface({ quiz }: { quiz: SeedQuiz | null }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!quiz) return 0;
    return quiz.questions.reduce((acc, q) => (answers[q.id] === q.correctAnswer ? acc + 1 : acc), 0);
  }, [answers, quiz]);

  if (!quiz) {
    return <div className="rounded-lg border border-[var(--border)] bg-white p-4">Quiz not found.</div>;
  }

  return (
    <section className="space-y-4 rounded-xl border border-[var(--border)] bg-white p-5">
      <h1 className="text-2xl font-semibold">{quiz.title}</h1>
      {quiz.questions.map((q, index) => (
        <article key={q.id} className="rounded-lg border border-[var(--border)] p-4">
          <p className="font-medium">{index + 1}. {q.prompt}</p>
          <div className="mt-2 space-y-2">
            {q.options.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={q.id}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={(event) => setAnswers((prev) => ({ ...prev, [q.id]: event.target.value }))}
                />
                {option}
              </label>
            ))}
          </div>
          {submitted && (
            <p className="mt-2 text-sm text-[var(--muted)]">
              {answers[q.id] === q.correctAnswer ? "Correct" : `Incorrect. ${q.explanation}`}
            </p>
          )}
        </article>
      ))}
      <button className="rounded-md bg-[var(--accent)] px-4 py-2 text-white" onClick={() => setSubmitted(true)}>
        Submit Quiz
      </button>
      {submitted && <p className="font-semibold">Score: {score}/{quiz.questions.length}</p>}
    </section>
  );
}
