"use client";

import { useState } from "react";
import { useChatStreaming } from "@/hooks/use-chat-streaming";

export function TutorPanel() {
  const [message, setMessage] = useState("");
  const { history, isLoading, sendMessage } = useChatStreaming();

  return (
    <section className="grid gap-4 rounded-xl border border-[var(--border)] bg-white p-5">
      <h1 className="text-2xl font-semibold">AI Tutor</h1>
      <div className="h-[420px] space-y-3 overflow-y-auto rounded-lg border border-[var(--border)] bg-[#fcfbf8] p-3">
        {history.map((item, idx) => (
          <div key={`${item.role}-${idx}`} className={item.role === "assistant" ? "text-[var(--fg)]" : "text-[var(--sky)]"}>
            <p className="text-xs uppercase">{item.role}</p>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (!message.trim()) return;
          sendMessage(message);
          setMessage("");
        }}
      >
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="flex-1 rounded-md border border-[var(--border)] px-3 py-2"
          placeholder="Ask about React state, hooks, or next study step"
        />
        <button disabled={isLoading} className="rounded-md bg-[var(--accent)] px-4 py-2 text-white disabled:opacity-60">
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </form>
    </section>
  );
}
