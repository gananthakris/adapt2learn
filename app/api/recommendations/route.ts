import { NextResponse } from "next/server";
import { recommendNextSkills } from "@/lib/recommendation-rules";

export async function GET() {
  return NextResponse.json({ recommendations: recommendNextSkills() });
}

export async function POST() {
  return NextResponse.json({ ok: true });
}
