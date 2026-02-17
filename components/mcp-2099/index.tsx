"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

/* ─────────────────────────────────────────────
   ADAPT-2099 — Mastery Control Protocol
   Adapt2Learn's AI learning engine visualised.
   Zero external animation deps — pure CSS keyframes.
───────────────────────────────────────────── */

const PANELS = [
  {
    label: "Mastery Index",
    value: "73.4%",
    sub: "Avg learner mastery across all skills",
    fill: 73,
    shimmerDelay: "0s",
    dotDelay: "0s",
    accent: "var(--mcp-cyan)",
  },
  {
    label: "Active Learners",
    value: "24",
    sub: "Connected to BKT engine now",
    fill: 60,
    shimmerDelay: "1.4s",
    dotDelay: "0.5s",
    accent: "var(--mcp-magenta)",
  },
  {
    label: "Knowledge Nodes",
    value: "8 skills",
    sub: "Skill graph nodes being traced",
    fill: 85,
    shimmerDelay: "2.8s",
    dotDelay: "1s",
    accent: "var(--mcp-electric)",
  },
];

const STREAM_CHARS = [
  "BKT", "pK", "pT", "JSX", "∆p", "↑",
  "Hook", "◈", "Skill", "Quiz", "AI", "Mastery", "Learn", "0.92",
];

const CIRCUIT_NODES: [number, number][] = [
  [200, 100], [200, 200], [350, 200], [350, 150], [500, 150],
  [900, 100], [900, 250], [750, 250], [750, 150], [600, 150],
  [250, 700], [250, 600], [400, 600], [400, 650], [500, 650],
  [950, 700], [950, 600], [800, 600], [800, 650], [700, 650],
];

export default function MCP2099() {
  const [glitchActive, setGlitchActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const scheduleGlitch = useCallback(() => {
    const delay = 2200 + Math.random() * 3800;
    timerRef.current = setTimeout(() => {
      setGlitchActive(true);
      setTimeout(() => {
        setGlitchActive(false);
        scheduleGlitch();
      }, 90 + Math.random() * 160);
    }, delay);
  }, []);

  useEffect(() => {
    scheduleGlitch();
    return () => clearTimeout(timerRef.current);
  }, [scheduleGlitch]);

  // Pre-compute stream positions — stable across renders
  const streams = useMemo(
    () =>
      STREAM_CHARS.map((char, i) => ({
        id: i,
        left: `${4 + i * 6.7}%`,
        delay: `${(i * 0.42).toFixed(2)}s`,
        duration: `${(2.6 + (i % 5) * 0.55).toFixed(2)}s`,
        char,
      })),
    []
  );

  return (
    <>
      <style>{CSS}</style>

      <div className="mcp-root">
        {/* ── Perspective Grid ── */}
        <div className="mcp-grid" aria-hidden="true">
          <div className="mcp-grid-plane" />
        </div>

        {/* ── Scanlines ── */}
        <div className="mcp-scanlines" aria-hidden="true" />

        {/* ── Radial vignette ── */}
        <div className="mcp-vignette" aria-hidden="true" />

        {/* ── Corner brackets ── */}
        {(["tl", "tr", "bl", "br"] as const).map((pos) => (
          <div key={pos} className={`mcp-corner mcp-corner--${pos}`} aria-hidden="true" />
        ))}

        {/* ── Circuit SVG ── */}
        <svg
          className="mcp-circuit"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path className="mcp-trace" style={{ "--pd": "0.4s" } as React.CSSProperties}
            d="M 0 100 H 200 V 200 H 350 V 150 H 500" />
          <path className="mcp-trace" style={{ "--pd": "0.7s" } as React.CSSProperties}
            d="M 1200 100 H 900 V 250 H 750 V 150 H 600" />
          <path className="mcp-trace" style={{ "--pd": "1.1s" } as React.CSSProperties}
            d="M 0 700 H 250 V 600 H 400 V 650 H 500" />
          <path className="mcp-trace" style={{ "--pd": "1.4s" } as React.CSSProperties}
            d="M 1200 700 H 950 V 600 H 800 V 650 H 700" />

          {CIRCUIT_NODES.map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.5" fill="var(--mcp-cyan)" opacity="0.7" />
          ))}
          {/* Skill labels at circuit endpoints */}
          {([
            [500, 138, "JSX"],
            [600, 138, "Hooks"],
            [500, 638, "Props"],
            [700, 638, "State"],
          ] as [number, number, string][]).map(([x, y, label]) => (
            <text key={label} x={x} y={y} fill="rgba(0,255,245,0.5)"
              fontSize="11" fontFamily="'Share Tech Mono', monospace" textAnchor="middle">
              {label}
            </text>
          ))}
        </svg>

        {/* ── Floating data streams ── */}
        <div className="mcp-streams" aria-hidden="true">
          {streams.map((s) => (
            <div
              key={s.id}
              className="mcp-stream"
              style={{
                left: s.left,
                animationDelay: s.delay,
                animationDuration: s.duration,
              }}
            >
              {Array.from({ length: 20 }, (_, j) => (
                <div key={j} style={{ opacity: j % 3 === 0 ? 0.6 : 0.25 }}>
                  {s.char}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ─────────────── MAIN CONTENT ─────────────── */}
        <div className="mcp-content">

          {/* ── Pulsing Core ── */}
          <div className="mcp-core-wrap" aria-hidden="true">
            {/* Orbital rings */}
            <div className="mcp-orbital mcp-orbital--1">
              <div className="mcp-orbital-dot mcp-orbital-dot--cyan" />
            </div>
            <div className="mcp-orbital mcp-orbital--2">
              <div className="mcp-orbital-dot mcp-orbital-dot--magenta" />
            </div>

            {/* Concentric rings */}
            <div className="mcp-core">
              <div className="mcp-ring mcp-ring--1" />
              <div className="mcp-ring mcp-ring--2" />
              <div className="mcp-ring mcp-ring--3" />
              <div className="mcp-ring mcp-ring--4" />
              {/* Hexagonal center */}
              <div className="mcp-hex-core" />
            </div>
          </div>

          {/* ── Title ── */}
          <div className="mcp-title-wrap">
            <h1
              className={`mcp-title${glitchActive ? " mcp-title--glitch" : ""}`}
              aria-label="ADAPT-2099"
            >
              ADAPT·2099
            </h1>
            <p className="mcp-subtitle">
              Mastery Control Protocol · Bayesian Knowledge Engine
            </p>
          </div>

          {/* ── Holographic Panels ── */}
          <div className="mcp-panels" role="group" aria-label="System metrics">
            {PANELS.map((p) => (
              <div
                key={p.label}
                className="mcp-panel"
                style={{ "--sd": p.shimmerDelay } as React.CSSProperties}
              >
                <div className="mcp-panel__header">
                  <span
                    className="mcp-panel__dot"
                    style={{
                      "--dd": p.dotDelay,
                      background: p.accent,
                      boxShadow: `0 0 8px ${p.accent}`,
                    } as React.CSSProperties}
                  />
                  <span className="mcp-panel__label">{p.label}</span>
                </div>
                <div className="mcp-panel__value">{p.value}</div>
                <div className="mcp-panel__sub">{p.sub}</div>
                <div className="mcp-panel__track">
                  <div
                    className="mcp-panel__fill"
                    style={{
                      "--fw": `${p.fill}%`,
                      background: `linear-gradient(90deg, var(--mcp-blue), ${p.accent})`,
                      boxShadow: `0 0 8px ${p.accent}`,
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Status Bar ── */}
        <footer className="mcp-status" aria-label="System status">
          <div className="mcp-status__item">
            <span className="mcp-status__led" />
            BKT ENGINE ACTIVE
          </div>
          <div className="mcp-status__item">24 LEARNERS ONLINE</div>
          <div className="mcp-status__item">8 SKILL DOMAINS</div>
          <div className="mcp-status__item">ADAPTIVE PATHS: COMPUTING</div>
          <div className="mcp-status__ticker" aria-hidden="true">
            BAYESIAN KNOWLEDGE TRACING ACTIVE · COMPUTING pKNOWN FOR 24 LEARNERS · SKILL GRAPH SYNC COMPLETE ·
            ADAPTIVE PATH ENGINE ONLINE · AI TUTOR RESPONDING · QUIZ CALIBRATION IN PROGRESS · MASTERY THRESHOLD: 0.85 ·
            KNOWLEDGE NODES: 8 ACTIVE · PREREQUISITE CHAINS VALIDATED · ADAPT-2099 FULLY OPERATIONAL · &nbsp;&nbsp;
            BAYESIAN KNOWLEDGE TRACING ACTIVE · COMPUTING pKNOWN FOR 24 LEARNERS · SKILL GRAPH SYNC COMPLETE ·
          </div>
        </footer>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   All CSS is self-contained here — no external files needed.
   Uses Google Fonts imported via @import for portability.
───────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Share+Tech+Mono&display=swap');

  .mcp-root {
    --mcp-cyan:     #00FFF5;
    --mcp-magenta:  #FF00AA;
    --mcp-electric: #9B5FFF;
    --mcp-blue:     #0060FF;
    --mcp-void:     #000510;
    --mcp-panel-bg: rgba(0, 255, 245, 0.035);
    --mcp-border:   rgba(0, 255, 245, 0.18);
    --mcp-glow-c:   0 0 18px rgba(0,255,245,.65), 0 0 55px rgba(0,255,245,.2);
    --mcp-glow-m:   0 0 18px rgba(255,0,170,.65), 0 0 55px rgba(255,0,170,.2);

    position: relative;
    width: 100%;
    min-height: 100vh;
    background: var(--mcp-void);
    font-family: 'Share Tech Mono', 'Courier New', monospace;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  /* ── Perspective Grid ── */
  .mcp-grid {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .mcp-grid-plane {
    position: absolute;
    inset: -30% -20%;
    background-image:
      linear-gradient(rgba(0,255,245,.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,245,.1) 1px, transparent 1px);
    background-size: 55px 55px;
    transform: rotateX(62deg) translateY(-8%) scale(2.8);
    transform-origin: center 68%;
    animation: mcp-grid-scroll 7s linear infinite;
  }
  @keyframes mcp-grid-scroll {
    from { background-position: 0 0; }
    to   { background-position: 0 55px; }
  }

  /* ── Scanlines ── */
  .mcp-scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,.13) 2px,
      rgba(0,0,0,.13) 4px
    );
    pointer-events: none;
    z-index: 10;
    animation: mcp-scan-move 10s linear infinite;
  }
  @keyframes mcp-scan-move {
    from { background-position: 0 0; }
    to   { background-position: 0 -120px; }
  }

  /* ── Vignette ── */
  .mcp-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 45%, transparent 25%, rgba(0,5,16,.9) 100%);
    pointer-events: none;
    z-index: 6;
  }

  /* ── Corner brackets ── */
  .mcp-corner {
    position: absolute;
    width: 22px;
    height: 22px;
    z-index: 25;
    border-color: var(--mcp-cyan);
    border-style: solid;
    opacity: .7;
  }
  .mcp-corner--tl { top: 1.25rem; left: 1.25rem; border-width: 2px 0 0 2px; }
  .mcp-corner--tr { top: 1.25rem; right: 1.25rem; border-width: 2px 2px 0 0; }
  .mcp-corner--bl { bottom: 2.8rem; left: 1.25rem; border-width: 0 0 2px 2px; }
  .mcp-corner--br { bottom: 2.8rem; right: 1.25rem; border-width: 0 2px 2px 0; }

  /* ── Circuit SVG ── */
  .mcp-circuit {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 3;
    opacity: .18;
  }
  .mcp-trace {
    stroke: var(--mcp-cyan);
    stroke-width: 1;
    fill: none;
    stroke-dasharray: 350;
    stroke-dashoffset: 350;
    animation: mcp-trace-draw 2.5s ease-out forwards;
    animation-delay: var(--pd, 0s);
  }
  @keyframes mcp-trace-draw {
    to { stroke-dashoffset: 0; }
  }

  /* ── Data streams ── */
  .mcp-streams {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 2;
  }
  .mcp-stream {
    position: absolute;
    bottom: -30px;
    font-size: 9px;
    line-height: 1.8;
    color: rgba(0,255,245,.35);
    animation: mcp-stream-rise linear infinite;
    white-space: nowrap;
  }
  @keyframes mcp-stream-rise {
    from { transform: translateY(0);     opacity: 0; }
    8%   { opacity: 1; }
    88%  { opacity: .4; }
    to   { transform: translateY(-108vh); opacity: 0; }
  }

  /* ── Main content wrapper ── */
  .mcp-content {
    position: relative;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
    padding: 2rem 1.5rem 3.5rem;
  }

  /* ── Core assembly ── */
  .mcp-core-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.5rem;
    width: 240px;
    height: 240px;
  }

  /* Orbital arms */
  .mcp-orbital {
    position: absolute;
    border-radius: 50%;
    border-style: dashed;
    border-width: 1px;
  }
  .mcp-orbital--1 {
    width: 230px; height: 230px;
    border-color: rgba(0,255,245,.22);
    animation: mcp-orbit-cw 9s linear infinite;
  }
  .mcp-orbital--2 {
    width: 195px; height: 195px;
    border-color: rgba(255,0,170,.18);
    animation: mcp-orbit-ccw 13s linear infinite;
    transform: rotate(55deg);
  }
  @keyframes mcp-orbit-cw  { to { transform: rotate(360deg); } }
  @keyframes mcp-orbit-ccw { to { transform: rotate(-360deg); } }

  .mcp-orbital-dot {
    position: absolute;
    top: -5px; left: 50%;
    width: 9px; height: 9px;
    border-radius: 50%;
    transform: translateX(-50%);
  }
  .mcp-orbital-dot--cyan    { background: var(--mcp-cyan);    box-shadow: var(--mcp-glow-c); }
  .mcp-orbital-dot--magenta { background: var(--mcp-magenta); box-shadow: var(--mcp-glow-m); }

  /* Concentric rings */
  .mcp-core {
    position: relative;
    width: 170px; height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mcp-ring {
    position: absolute;
    border-radius: 50%;
    border-style: solid;
    animation: mcp-ring-pulse 3s ease-in-out infinite;
  }
  .mcp-ring--1 { width: 170px; height: 170px; border-width: 1px; border-color: var(--mcp-cyan);    box-shadow: var(--mcp-glow-c); animation-delay: 0s;    opacity: .8; }
  .mcp-ring--2 { width: 135px; height: 135px; border-width: 1px; border-color: rgba(0,255,245,.5); animation-delay: .4s;   opacity: .5; }
  .mcp-ring--3 { width: 100px; height: 100px; border-width: 1px; border-color: var(--mcp-magenta); box-shadow: var(--mcp-glow-m); animation-delay: .8s; opacity: .7; }
  .mcp-ring--4 { width: 66px;  height: 66px;  border-width: 2px; border-color: var(--mcp-cyan);    animation-delay: 1.2s; opacity: .9; }

  @keyframes mcp-ring-pulse {
    0%,100% { transform: scale(1);    opacity: var(--base-op, .8); }
    50%      { transform: scale(1.06); opacity: .3; }
  }

  /* Hex core */
  .mcp-hex-core {
    position: relative;
    z-index: 2;
    width: 48px; height: 48px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background: radial-gradient(circle, #ffffff 0%, var(--mcp-cyan) 45%, var(--mcp-blue) 100%);
    animation: mcp-hex-breathe 2.2s ease-in-out infinite;
    box-shadow:
      0 0 35px var(--mcp-cyan),
      0 0 80px rgba(0,255,245,.4),
      inset 0 0 20px rgba(255,255,255,.35);
  }
  @keyframes mcp-hex-breathe {
    0%,100% { transform: scale(1);    filter: brightness(1); }
    50%      { transform: scale(1.18); filter: brightness(1.4); }
  }

  /* ── Title ── */
  .mcp-title-wrap {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  .mcp-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2.2rem, 6vw, 4.2rem);
    font-weight: 900;
    color: var(--mcp-cyan);
    letter-spacing: .28em;
    text-transform: uppercase;
    margin: 0;
    position: relative;
    text-shadow:
      0 0 18px rgba(0,255,245,.85),
      0 0 55px rgba(0,255,245,.3);
    transition: color .05s, text-shadow .05s;
  }
  .mcp-title::after {
    content: 'ADAPT·2099';
    position: absolute;
    inset: 0;
    color: var(--mcp-magenta);
    clip-path: polygon(0 38%, 100% 38%, 100% 56%, 0 56%);
    opacity: 0;
    pointer-events: none;
  }
  .mcp-title--glitch {
    animation: mcp-glitch-main .15s steps(2) forwards;
  }
  .mcp-title--glitch::after {
    opacity: .85;
    animation: mcp-glitch-after .15s steps(2) forwards;
  }
  @keyframes mcp-glitch-main {
    0%   { transform: translate(-5px,-2px); color: var(--mcp-magenta); text-shadow: 0 0 18px rgba(255,0,170,.9); }
    33%  { transform: translate(4px, 2px);  color: #fff; }
    66%  { transform: translate(-2px,1px);  color: var(--mcp-cyan); }
    100% { transform: none; color: var(--mcp-cyan); text-shadow: 0 0 18px rgba(0,255,245,.85),0 0 55px rgba(0,255,245,.3); }
  }
  @keyframes mcp-glitch-after {
    0%   { transform: translateX(-7px); opacity: .9; }
    50%  { transform: translateX(5px);  opacity: .5; }
    100% { transform: none;             opacity: 0; }
  }

  .mcp-subtitle {
    font-size: .68rem;
    letter-spacing: .42em;
    color: rgba(0,255,245,.42);
    text-transform: uppercase;
    margin-top: .55rem;
  }

  /* ── Panels ── */
  .mcp-panels {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    max-width: 860px;
    width: 90%;
  }
  @media (max-width: 640px) {
    .mcp-panels { grid-template-columns: 1fr; }
  }

  .mcp-panel {
    background: var(--mcp-panel-bg);
    border: 1px solid var(--mcp-border);
    padding: 1.3rem 1.2rem;
    position: relative;
    overflow: hidden;
    clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px));
    transition: border-color .3s, box-shadow .3s;
  }
  .mcp-panel:hover {
    border-color: rgba(0,255,245,.5);
    box-shadow: 0 0 22px rgba(0,255,245,.12), inset 0 0 22px rgba(0,255,245,.04);
  }

  /* Shimmer sweep */
  .mcp-panel::before {
    content: '';
    position: absolute;
    top: 0; left: -120%;
    width: 55%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0,255,245,.07), transparent);
    animation: mcp-shimmer 5s ease-in-out infinite;
    animation-delay: var(--sd, 0s);
  }
  @keyframes mcp-shimmer {
    0%   { left: -120%; }
    45%,100% { left: 220%; }
  }

  .mcp-panel__header {
    display: flex;
    align-items: center;
    gap: .5rem;
    font-size: .62rem;
    letter-spacing: .18em;
    color: var(--mcp-cyan);
    opacity: .65;
    text-transform: uppercase;
    margin-bottom: .7rem;
  }
  .mcp-panel__dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    animation: mcp-dot-blink 1.6s ease-in-out infinite;
    animation-delay: var(--dd, 0s);
  }
  @keyframes mcp-dot-blink {
    0%,100% { opacity: 1; }
    50%      { opacity: .15; }
  }
  .mcp-panel__value {
    font-family: 'Orbitron', sans-serif;
    font-size: 1.55rem;
    font-weight: 700;
    color: #fff;
    line-height: 1;
    margin-bottom: .2rem;
  }
  .mcp-panel__sub {
    font-size: .6rem;
    color: rgba(255,255,255,.28);
    letter-spacing: .08em;
  }
  .mcp-panel__track {
    margin-top: .8rem;
    height: 2px;
    background: rgba(0,255,245,.08);
    border-radius: 1px;
    overflow: hidden;
  }
  .mcp-panel__fill {
    height: 100%;
    border-radius: 1px;
    animation: mcp-fill-in 1.8s ease-out forwards;
    animation-delay: .6s;
    width: 0;
  }
  @keyframes mcp-fill-in {
    to { width: var(--fw, 75%); }
  }

  /* ── Status bar ── */
  .mcp-status {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 38px;
    background: rgba(0,255,245,.025);
    border-top: 1px solid rgba(0,255,245,.1);
    display: flex;
    align-items: center;
    padding: 0 1.8rem;
    gap: 2rem;
    z-index: 30;
    overflow: hidden;
  }
  .mcp-status__item {
    font-size: .58rem;
    letter-spacing: .14em;
    color: rgba(0,255,245,.38);
    text-transform: uppercase;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: .45rem;
    flex-shrink: 0;
  }
  .mcp-status__led {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #00FF94;
    box-shadow: 0 0 7px #00FF94;
    animation: mcp-dot-blink .9s ease-in-out infinite;
  }
  .mcp-status__ticker {
    position: absolute;
    right: 0;
    white-space: nowrap;
    font-size: .56rem;
    letter-spacing: .12em;
    color: rgba(0,255,245,.18);
    text-transform: uppercase;
    animation: mcp-ticker 28s linear infinite;
    pointer-events: none;
  }
  @keyframes mcp-ticker {
    from { transform: translateX(100vw); }
    to   { transform: translateX(-200%); }
  }
`;
