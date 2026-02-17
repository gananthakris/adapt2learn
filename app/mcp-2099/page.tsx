import type { Metadata } from "next";
import MCP2099 from "@/components/mcp-2099";

export const metadata: Metadata = {
  title: "MCP-2099 — Hyper-Futuristic Interface",
  description: "Master Control Program 2099 — hyper-futuristic showcase component.",
};

export default function MCP2099Page() {
  return <MCP2099 />;
}
