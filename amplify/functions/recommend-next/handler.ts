import type { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  const userId = event?.arguments?.userId;
  const limit = Number(event?.arguments?.limit ?? 3);

  return {
    userId,
    recommendations: [
      { skillId: "skill-state", title: "State", reason: "Low mastery and prerequisites complete" },
      { skillId: "skill-hooks", title: "Hooks", reason: "Unlocks useEffect progression" },
      { skillId: "skill-forms", title: "Forms", reason: "High practical impact for projects" }
    ].slice(0, limit)
  };
};
