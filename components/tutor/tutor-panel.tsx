'use client';

import { useState, useRef, useEffect } from "react";
import { useChatStreaming } from "@/hooks/use-chat-streaming";

export function TutorPanel() {
  const [message, setMessage] = useState("");
  const { history, isLoading, sendMessage } = useChatStreaming();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const suggestedQuestions = [
    "What are React Hooks?",
    "How does useState work?",
    "When should I use useEffect?",
    "What's the difference between props and state?"
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1>
          <span className="gradient-text">AI Tutor</span>
        </h1>
        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
          Get personalized help with React concepts anytime
        </p>
      </div>

      {/* Chat Container */}
      <div className="card overflow-hidden animate-fade-in-up stagger-1">
        {/* Chat messages area */}
        <div className="h-[500px] overflow-y-auto bg-gradient-to-br from-[var(--color-canvas)] to-[var(--color-canvas-subtle)] p-6 space-y-4">
          {/* Welcome message */}
          {history.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-lavender)] to-[#9B86B0] flex items-center justify-center text-white text-4xl mx-auto mb-4 shadow-lg">
                🤖
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-forest-deep)] mb-2">
                Hi! I'm your AI tutor
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-6">
                Ask me anything about React and I'll help you learn
              </p>

              {/* Suggested questions */}
              <div className="max-w-md mx-auto space-y-2">
                <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">
                  Try asking:
                </p>
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setMessage(question);
                      sendMessage(question);
                    }}
                    className="w-full text-left px-4 py-3 bg-white rounded-lg border border-[var(--border)] hover:border-[var(--color-forest-mid)] hover:shadow-md transition-all duration-200 text-sm"
                  >
                    💬 {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message history */}
          {history.map((item, idx) => (
            <div
              key={`${item.role}-${idx}`}
              className={`flex ${item.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                  item.role === "user"
                    ? "bg-gradient-to-br from-[var(--color-forest-mid)] to-[var(--color-forest-deep)] text-white"
                    : "bg-white text-[var(--color-text-primary)] border border-[var(--border)]"
                }`}
              >
                {/* Role label */}
                <div className={`text-xs uppercase font-medium mb-2 ${
                  item.role === "user" ? "text-white/70" : "text-[var(--color-text-tertiary)]"
                }`}>
                  {item.role === "user" ? "You" : "AI Tutor"}
                </div>

                {/* Message content */}
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {item.content}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="bg-white rounded-2xl px-5 py-3 shadow-sm border border-[var(--border)]">
                <div className="text-xs uppercase font-medium text-[var(--color-text-tertiary)] mb-2">
                  AI Tutor
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[var(--color-forest-light)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-[var(--color-forest-mid)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-[var(--color-forest-deep)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-sm text-[var(--color-text-secondary)]">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="bg-white border-t border-[var(--border)] p-6">
          <form
            className="flex gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (!message.trim() || isLoading) return;
              sendMessage(message);
              setMessage("");
            }}
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="flex-1 px-5 py-3 rounded-xl border-2 border-[var(--border)] bg-white text-[var(--color-text-primary)] outline-none focus:border-[var(--color-forest-mid)] transition-colors placeholder:text-[var(--color-text-tertiary)]"
              placeholder="Ask about React state, hooks, or next study step..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[var(--color-forest-mid)] to-[var(--color-forest-deep)] text-white shadow-lg hover:shadow-xl hover:scale-105"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Send
                  <span>→</span>
                </span>
              )}
            </button>
          </form>

          {/* Helper text */}
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
            <span>💡</span>
            <span>Powered by AI • Context-aware • Available 24/7</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up stagger-2">
        <div className="card p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-forest-light)] to-[var(--color-forest-deep)] flex items-center justify-center text-white text-2xl mx-auto mb-3">
            🎯
          </div>
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
            Context-Aware
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Understands your current progress and skill level
          </p>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-lavender)] to-[#9B86B0] flex items-center justify-center text-white text-2xl mx-auto mb-3">
            💬
          </div>
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
            Conversational
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Ask follow-up questions and dive deeper
          </p>
        </div>

        <div className="card p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-amber)] flex items-center justify-center text-white text-2xl mx-auto mb-3">
            ⚡
          </div>
          <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">
            Instant Help
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Get answers immediately, any time of day
          </p>
        </div>
      </div>
    </section>
  );
}
