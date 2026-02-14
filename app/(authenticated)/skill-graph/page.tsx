import { SkillGraph } from "@/components/graph/skill-graph";
import { reactSkillGraph } from "@/data/skills/react-skill-graph";

export default function SkillGraphPage() {
  return <SkillGraph graph={reactSkillGraph} title="React Fundamentals Skill Graph" />;
}
