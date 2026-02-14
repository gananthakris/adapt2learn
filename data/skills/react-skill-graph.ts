import type { SkillGraphData } from "@/lib/types";

export const reactSkillGraph: SkillGraphData = {
  skills: [
    { id: "skill-jsx", title: "JSX Basics", topicId: "topic-jsx", masteryLevel: "DEVELOPING" },
    { id: "skill-components", title: "Components", topicId: "topic-components", masteryLevel: "DEVELOPING" },
    { id: "skill-props", title: "Props", topicId: "topic-props", masteryLevel: "BEGINNER" },
    { id: "skill-state", title: "State", topicId: "topic-state", masteryLevel: "BEGINNER" },
    { id: "skill-forms", title: "Forms", topicId: "topic-forms", masteryLevel: "NOT_STARTED" },
    { id: "skill-hooks", title: "Hooks", topicId: "topic-hooks", masteryLevel: "NOT_STARTED" },
    { id: "skill-useeffect", title: "useEffect", topicId: "topic-useeffect", masteryLevel: "NOT_STARTED" },
    { id: "skill-custom-hooks", title: "Custom Hooks", topicId: "topic-custom-hooks", masteryLevel: "NOT_STARTED" }
  ],
  edges: [
    { from: "skill-jsx", fromTitle: "JSX Basics", to: "skill-components" },
    { from: "skill-components", fromTitle: "Components", to: "skill-props" },
    { from: "skill-props", fromTitle: "Props", to: "skill-state" },
    { from: "skill-state", fromTitle: "State", to: "skill-forms" },
    { from: "skill-state", fromTitle: "State", to: "skill-hooks" },
    { from: "skill-hooks", fromTitle: "Hooks", to: "skill-useeffect" },
    { from: "skill-useeffect", fromTitle: "useEffect", to: "skill-custom-hooks" }
  ]
};
