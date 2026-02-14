"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function useChatStreaming() {
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: "assistant", content: "I am your AI tutor. Ask me what to learn next." }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(content: string) {
    setHistory((prev) => [...prev, { role: "user", content }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content })
      });

      const data = (await response.json()) as { reply: string };
      setHistory((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setHistory((prev) => [...prev, { role: "assistant", content: "I could not reach the tutor service. Try again." }]);
    } finally {
      setIsLoading(false);
    }
  }

  return { history, isLoading, sendMessage };
}
