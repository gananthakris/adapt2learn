"use client";

import Link from "next/link";
import { useState } from "react";
import type { SkillGraphData } from "@/lib/types";

const masteryConfig: Record<string, { color: string; bg: string; label: string; icon: string }> = {
  NOT_STARTED: {
    color: "var(--mastery-seed)",
    bg: "linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)",
    label: "Seed",
    icon: "○"
  },
  BEGINNER: {
    color: "var(--mastery-sprout)",
    bg: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
    label: "Sprout",
    icon: "◐"
  },
  DEVELOPING: {
    color: "var(--mastery-grow)",
    bg: "linear-gradient(135deg, #86EFAC 0%, #4ADE80 100%)",
    label: "Growing",
    icon: "◑"
  },
  PROFICIENT: {
    color: "var(--mastery-bloom)",
    bg: "linear-gradient(135deg, var(--color-forest-light) 0%, var(--color-forest-mid) 100%)",
    label: "Blooming",
    icon: "●"
  },
  EXPERT: {
    color: "var(--mastery-flourish)",
    bg: "linear-gradient(135deg, var(--color-forest-deep) 0%, #0F3A21 100%)",
    label: "Flourishing",
    icon: "✦"
  }
};

// Simple hierarchical layout positions
const layoutPositions: Record<string, { x: number; y: number }> = {
  "skill-jsx": { x: 50, y: 50 },
  "skill-components": { x: 50, y: 150 },
  "skill-props": { x: 50, y: 250 },
  "skill-state": { x: 50, y: 350 },
  "skill-forms": { x: 20, y: 470 },
  "skill-hooks": { x: 80, y: 470 },
  "skill-useeffect": { x: 80, y: 590 },
  "skill-custom-hooks": { x: 80, y: 710 }
};

export function SkillGraph({ graph, title }: { graph: SkillGraphData; title: string }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [filterMastery, setFilterMastery] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Get position for a skill (default to center if not defined)
  const getPosition = (skillId: string) => layoutPositions[skillId] || { x: 50, y: 50 };

  // Filter skills
  const filteredSkills = graph.skills.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMastery = filterMastery === "all" || skill.masteryLevel === filterMastery;
    return matchesSearch && matchesMastery;
  });

  // Calculate stats
  const masteryStats = {
    NOT_STARTED: graph.skills.filter(s => s.masteryLevel === 'NOT_STARTED').length,
    BEGINNER: graph.skills.filter(s => s.masteryLevel === 'BEGINNER').length,
    DEVELOPING: graph.skills.filter(s => s.masteryLevel === 'DEVELOPING').length,
    PROFICIENT: graph.skills.filter(s => s.masteryLevel === 'PROFICIENT').length,
    EXPERT: graph.skills.filter(s => s.masteryLevel === 'EXPERT').length,
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="text-center animate-fade-in-up">
        <h1 className="gradient-text">{title}</h1>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Your learning journey visualized as an organic network. Watch your skills grow from seed to flourish.
        </p>
      </div>

      {/* Controls */}
      <div className="card p-6 animate-fade-in-up stagger-1">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-[var(--border)] rounded-lg outline-none focus:border-[var(--color-forest-mid)] transition-colors"
            />
          </div>

          {/* Filter by mastery */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterMastery("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterMastery === "all"
                  ? "bg-[var(--color-forest-mid)] text-white"
                  : "bg-white border border-[var(--border)] text-[var(--color-text-secondary)] hover:border-[var(--color-forest-mid)]"
              }`}
            >
              All ({graph.skills.length})
            </button>
            {Object.entries(masteryConfig).map(([level, config]) => {
              const count = masteryStats[level as keyof typeof masteryStats];
              if (count === 0) return null;
              return (
                <button
                  key={level}
                  onClick={() => setFilterMastery(level)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    filterMastery === level
                      ? "bg-[var(--color-forest-mid)] text-white"
                      : "bg-white border border-[var(--border)] text-[var(--color-text-secondary)] hover:border-[var(--color-forest-mid)]"
                  }`}
                >
                  <span style={{ color: filterMastery === level ? 'white' : config.color }}>{config.icon}</span>
                  {config.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up stagger-2">
        {Object.entries(masteryConfig).map(([level, config]) => {
          const count = masteryStats[level as keyof typeof masteryStats];
          return (
            <div key={level} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm">
              <span className="text-xl" style={{ color: config.color }}>{config.icon}</span>
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                {config.label} ({count})
              </span>
            </div>
          );
        })}
      </div>

      {/* Graph Canvas */}
      <div className="card p-8 animate-fade-in-up stagger-3">
        {filteredSkills.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-[var(--color-canvas-subtle)] flex items-center justify-center text-4xl mx-auto mb-4">
              🔍
            </div>
            <p className="text-lg text-[var(--color-text-secondary)]">
              No skills found matching "{searchTerm}"
            </p>
          </div>
        ) : (
          <div className="relative w-full h-[800px] overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-canvas)] to-[var(--color-canvas-subtle)]">
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {graph.edges.map((edge, idx) => {
              const from = getPosition(edge.from);
              const to = getPosition(edge.to);

              // Calculate control points for smooth curves
              const dx = to.x - from.x;
              const dy = to.y - from.y;
              const curve = Math.abs(dx) * 0.5;

              const path = `M ${from.x},${from.y + 30} C ${from.x + curve},${from.y + 30 + dy/3} ${to.x - curve},${to.y - 30 - dy/3} ${to.x},${to.y - 30}`;

              const isHighlighted = hoveredSkill === edge.from || hoveredSkill === edge.to;

              return (
                <g key={`edge-${idx}`}>
                  <path
                    d={path}
                    fill="none"
                    stroke={isHighlighted ? "var(--color-forest-mid)" : "var(--color-forest-light)"}
                    strokeWidth={isHighlighted ? "3" : "2"}
                    strokeOpacity={isHighlighted ? "0.6" : "0.2"}
                    strokeLinecap="round"
                    strokeDasharray={isHighlighted ? "none" : "4 4"}
                    filter={isHighlighted ? "url(#glow)" : "none"}
                    className="transition-all duration-300"
                  />
                  {/* Arrowhead */}
                  <circle
                    cx={to.x}
                    cy={to.y - 30}
                    r="3"
                    fill={isHighlighted ? "var(--color-forest-mid)" : "var(--color-forest-light)"}
                    fillOpacity={isHighlighted ? "0.8" : "0.4"}
                  />
                </g>
              );
            })}
          </svg>

          {/* Skill nodes */}
          {filteredSkills.map((skill, idx) => {
            const pos = getPosition(skill.id);
            const config = masteryConfig[skill.masteryLevel] || masteryConfig.NOT_STARTED;
            const isHovered = hoveredSkill === skill.id;

            return (
              <Link
                key={skill.id}
                href={`/topics/${skill.topicId}`}
                className="absolute skill-node animate-grow-in"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}px`,
                  transform: "translate(-50%, -50%)",
                  zIndex: isHovered ? 20 : 10,
                  animationDelay: `${idx * 0.1}s`,
                  opacity: 0
                }}
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div
                  className="relative px-6 py-4 rounded-2xl shadow-lg transition-all duration-500"
                  style={{
                    background: config.bg,
                    minWidth: "160px",
                    transform: isHovered ? "scale(1.1)" : "scale(1)"
                  }}
                >
                  {/* Growth icon */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-lg" style={{ color: config.color }}>
                    {config.icon}
                  </div>

                  {/* Skill content */}
                  <div className="text-center">
                    <div className={`font-semibold text-sm ${skill.masteryLevel === 'EXPERT' || skill.masteryLevel === 'PROFICIENT' ? 'text-white' : 'text-[var(--color-text-primary)]'}`}>
                      {skill.title}
                    </div>
                    <div className={`mt-1 text-xs font-medium ${skill.masteryLevel === 'EXPERT' || skill.masteryLevel === 'PROFICIENT' ? 'text-white/80' : 'text-[var(--color-text-secondary)]'}`}>
                      {config.label}
                    </div>
                  </div>

                  {/* Hover tooltip */}
                  {isHovered && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-4 py-2 bg-[var(--color-forest-deep)] text-white text-xs rounded-lg shadow-xl whitespace-nowrap pointer-events-none z-50">
                      Click to learn {skill.title}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[var(--color-forest-deep)]"></div>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        )}

        {/* Graph Info */}
        {filteredSkills.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-6 justify-center text-center">
          <div>
            <div className="text-2xl font-bold gradient-text">{graph.skills.length}</div>
            <div className="text-sm text-[var(--color-text-secondary)]">Total Skills</div>
          </div>
          <div>
            <div className="text-2xl font-bold gradient-text">{graph.edges.length}</div>
            <div className="text-sm text-[var(--color-text-secondary)]">Prerequisites</div>
          </div>
          <div>
            <div className="text-2xl font-bold gradient-text">
              {graph.skills.filter(s => s.masteryLevel !== 'NOT_STARTED').length}
            </div>
            <div className="text-sm text-[var(--color-text-secondary)]">Skills Growing</div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
