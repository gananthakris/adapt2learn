import type { Metadata } from "next";
import MCP2099 from "@/components/mcp-2099";

export const metadata: Metadata = {
  title: "ADAPT-2099 — Mastery Control Protocol",
  description: "Adapt2Learn's AI learning engine visualised — Bayesian Knowledge Tracing in real-time.",
};

export default function MCP2099Page() {
  return <MCP2099 />;
}
