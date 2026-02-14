import Link from "next/link";
import type { SkillGraphData } from "@/lib/types";

const masteryColors: Record<string, string> = {
  NOT_STARTED: "#dfe4ea",
  BEGINNER: "#ffd6a5",
  DEVELOPING: "#ffad60",
  PROFICIENT: "#6cc084",
  EXPERT: "#3f7d58"
};

export function SkillGraph({ graph, title }: { graph: SkillGraphData; title: string }) {
  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="rounded-xl border border-[var(--border)] bg-white p-5">
        <p className="mb-4 text-sm text-[var(--muted)]">Node color maps to mastery level. Click any skill to open its learning topic.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {graph.skills.map((skill) => (
            <Link key={skill.id} href={`/topics/${skill.topicId}`} className="rounded-lg border p-4" style={{ borderColor: masteryColors[skill.masteryLevel] ?? "#dfe4ea" }}>
              <p className="font-medium">{skill.title}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{skill.masteryLevel.replace("_", " ")}</p>
              <p className="mt-2 text-xs">Prerequisites: {graph.edges.filter((edge) => edge.to === skill.id).map((edge) => edge.fromTitle).join(", ") || "None"}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
