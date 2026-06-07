"use client";

import { motion, useInView } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { SectionHeader } from "@/components/reveal/WordReveal";

/* Tech nodes — 12 around the ring, ordered for natural cluster grouping */
const nodes = [
  { id: "claude", label: "CLAUDE", category: "model" },
  { id: "gpt", label: "GPT", category: "model" },
  { id: "llama", label: "LLAMA", category: "model" },
  { id: "bedrock", label: "AWS BEDROCK", category: "cloud" },
  { id: "vercel", label: "VERCEL AI", category: "cloud" },
  { id: "modal", label: "MODAL", category: "cloud" },
  { id: "pgvector", label: "PGVECTOR", category: "data" },
  { id: "pinecone", label: "PINECONE", category: "data" },
  { id: "langgraph", label: "LANGGRAPH", category: "agent" },
  { id: "mcp", label: "MCP", category: "agent" },
  { id: "otel", label: "OTEL", category: "obs" },
  { id: "datadog", label: "DATADOG", category: "obs" },
];

const categoryLabel: Record<string, string> = {
  model: "MODELO",
  cloud: "INFRA",
  data: "RETRIEVAL",
  agent: "ORQUESTACIÓN",
  obs: "OBSERVABILIDAD",
};

const RADIUS = 230;
const SVG_SIZE = 640;

// Round to 2 decimals so SSR (Node V8) and CSR (browser V8) produce identical
// floating-point strings — avoids React hydration mismatches.
const round2 = (n: number) => Math.round(n * 100) / 100;

function nodePos(i: number) {
  // Distribute 12 evenly around a circle, starting from top, going clockwise
  const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
  return {
    x: round2(SVG_SIZE / 2 + Math.cos(angle) * RADIUS),
    y: round2(SVG_SIZE / 2 + Math.sin(angle) * RADIUS),
    angle,
  };
}

export function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [hovered, setHovered] = useState<string | null>(null);

  const positions = useMemo(() => nodes.map((_, i) => nodePos(i)), []);

  // Adjacency: each node connects to its two neighbors + to the center
  const adjacency = useMemo(() => {
    const map: Record<string, string[]> = {};
    nodes.forEach((n, i) => {
      const prev = nodes[(i - 1 + nodes.length) % nodes.length].id;
      const next = nodes[(i + 1) % nodes.length].id;
      map[n.id] = [prev, next, "_center_"];
    });
    return map;
  }, []);

  const isHighlighted = (id: string) => {
    if (!hovered) return false;
    if (id === hovered) return true;
    return adjacency[hovered]?.includes(id);
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-32 lg:py-44">
      <div className="absolute inset-0 grid-overlay opacity-20 mask-radial-fade" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nexus-chrome/15 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: copy + categories */}
          <div>
            <SectionHeader
              eyebrow="TECH STACK · CONSTELLATION"
              parts={[
                { text: "Construido con", className: "text-nexus-chrome/60" },
                { text: "las herramientas", className: "text-metallic", newLine: true },
                { text: "que la frontera elige.", className: "text-neon-grad", newLine: true },
              ]}
            />
            <p className="mt-8 max-w-md text-[14.5px] leading-relaxed text-nexus-chrome/55">
              No casamos con un único proveedor. Elegimos el modelo, la base
              vectorial, el orquestador y el cloud que mejor encajan con tu
              dominio y tus SLOs.
            </p>

            <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
              {Object.entries(categoryLabel).map(([key, label]) => (
                <li
                  key={key}
                  onMouseEnter={() => {
                    const node = nodes.find((n) => n.category === key);
                    if (node) setHovered(node.id);
                  }}
                  onMouseLeave={() => setHovered(null)}
                  className="group flex cursor-default items-center gap-3 rounded-lg border border-nexus-chrome/10 bg-nexus-carbon/30 px-3 py-2 transition-colors hover:border-nexus-neon/40 hover:bg-nexus-neon/[0.04]"
                >
                  <span className="flex h-1.5 w-1.5">
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-nexus-neon shadow-[0_0_6px_#A6FF00]" />
                  </span>
                  <span className="font-mono text-[10px] tracking-wider2 text-nexus-chrome/70 group-hover:text-nexus-chrome">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: SVG constellation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[520px]">
              {/* Background concentric rings */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {[1, 0.78, 0.55, 0.3].map((scale, i) => (
                  <div
                    key={i}
                    style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
                    className="absolute rounded-full border border-nexus-chrome/[0.06]"
                  />
                ))}
              </div>

              <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} className="relative h-full w-full">
                <defs>
                  <linearGradient id="ts-line" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#A6FF00" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#A6FF00" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="ts-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Center → node spokes */}
                {nodes.map((n, i) => {
                  const p = positions[i];
                  const active = !hovered || isHighlighted(n.id);
                  return (
                    <line
                      key={"c-" + n.id}
                      x1={SVG_SIZE / 2}
                      y1={SVG_SIZE / 2}
                      x2={p.x}
                      y2={p.y}
                      stroke="#A6FF00"
                      strokeOpacity={active ? 0.35 : 0.08}
                      strokeWidth="0.6"
                      style={{ transition: "stroke-opacity 0.4s" }}
                    />
                  );
                })}

                {/* Ring neighbor connections */}
                {nodes.map((n, i) => {
                  const nxt = (i + 1) % nodes.length;
                  const a = positions[i];
                  const b = positions[nxt];
                  const active =
                    !hovered ||
                    isHighlighted(n.id) ||
                    isHighlighted(nodes[nxt].id);
                  return (
                    <line
                      key={"r-" + i}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="#A6FF00"
                      strokeOpacity={active ? 0.32 : 0.06}
                      strokeWidth="0.6"
                      style={{ transition: "stroke-opacity 0.4s" }}
                    />
                  );
                })}

                {/* Center hex brand mark */}
                <g transform={`translate(${SVG_SIZE / 2}, ${SVG_SIZE / 2})`}>
                  <polygon
                    points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16"
                    fill="none"
                    stroke="#c8ccd1"
                    strokeWidth="1.2"
                  />
                  <motion.circle
                    r="9"
                    fill="#A6FF00"
                    filter="url(#ts-glow)"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <circle r="3" fill="#eaffb3" />
                </g>

                {/* Nodes */}
                {nodes.map((n, i) => {
                  const p = positions[i];
                  const active = !hovered || isHighlighted(n.id);
                  const isHover = hovered === n.id;
                  return (
                    <g
                      key={n.id}
                      transform={`translate(${p.x}, ${p.y})`}
                      onMouseEnter={() => setHovered(n.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={{ cursor: "pointer" }}
                      data-cursor="hot"
                    >
                      {/* Hit area */}
                      <circle r="22" fill="transparent" />
                      {/* Halo on hover */}
                      <motion.circle
                        r={isHover ? 14 : 9}
                        fill="#A6FF00"
                        opacity={active ? 0.18 : 0.05}
                        filter="url(#ts-glow)"
                        style={{ transition: "all 0.3s" }}
                      />
                      {/* Core dot */}
                      <circle
                        r={isHover ? 5 : 3.4}
                        fill={active ? "#A6FF00" : "#5a8a00"}
                        style={{ transition: "all 0.3s" }}
                      />
                      {/* Label — flip side based on which half of the ring */}
                      <text
                        x={p.x > SVG_SIZE / 2 ? 14 : -14}
                        y="4"
                        textAnchor={p.x > SVG_SIZE / 2 ? "start" : "end"}
                        fontFamily="var(--font-jetbrains)"
                        fontSize="11"
                        letterSpacing="2"
                        fill={
                          isHover ? "#eaffb3" : active ? "rgba(232,234,237,0.7)" : "rgba(232,234,237,0.3)"
                        }
                        style={{ transition: "fill 0.3s", pointerEvents: "none" }}
                      >
                        {n.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Bottom telemetry */}
              <div className="absolute -bottom-2 left-0 right-0 flex items-center justify-between font-mono text-[9px] tracking-wider2 text-nexus-chrome/40">
                <span>NODES · {nodes.length}</span>
                <span>{hovered ? `→ ${nodes.find((n) => n.id === hovered)?.label}` : "HOVER A NODE"}</span>
                <span>EDGES · {nodes.length * 3}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
