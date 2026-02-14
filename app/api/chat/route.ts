import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { message?: string };
  const message = body.message ?? "";

  const reply = `Let's break this down: ${message}. Start with one small practice task, then re-check with a 3-question quiz.`;
  return NextResponse.json({ reply });
}
