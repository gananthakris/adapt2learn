import type { Recommendation } from "@/lib/types";
import { reactSkillGraph } from "@/data/skills/react-skill-graph";

const scoreByMastery = {
  NOT_STARTED: 0,
  BEGINNER: 1,
  DEVELOPING: 2,
  PROFICIENT: 3,
  EXPERT: 4
} as const;

export function recommendNextSkills(limit = 3): Recommendation[] {
  const locked = new Set(
    reactSkillGraph.edges
      .filter((edge) => {
        const source = reactSkillGraph.skills.find((skill) => skill.id === edge.from);
        return source ? scoreByMastery[source.masteryLevel] < scoreByMastery.DEVELOPING : true;
      })
      .map((edge) => edge.to)
  );

  return reactSkillGraph.skills
    .filter((skill) => scoreByMastery[skill.masteryLevel] < scoreByMastery.PROFICIENT)
    .filter((skill) => !locked.has(skill.id))
    .slice(0, limit)
    .map((skill) => ({
      skillId: skill.id,
      topicId: skill.topicId,
      title: skill.title,
      reason: "Prerequisites are met and mastery is below proficient."
    }));
}
