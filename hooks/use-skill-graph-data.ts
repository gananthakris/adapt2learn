"use client";

import { useMemo } from "react";
import { reactSkillGraph } from "@/data/skills/react-skill-graph";

export function useSkillGraphData() {
  const graph = useMemo(() => reactSkillGraph, []);
  return { graph, isLoading: false };
}
