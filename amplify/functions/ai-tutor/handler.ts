import type { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  const message = event?.arguments?.message ?? "";
  const topic = event?.arguments?.topicId ?? "general";

  return {
    sessionId: event?.arguments?.sessionId ?? `session-${Date.now()}`,
    reply: `Topic ${topic}: focus on one concept, run one example, then explain it back in your own words. Prompt received: ${message}`
  };
};
