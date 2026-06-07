"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "@/components/reveal/WordReveal";

type Layer = {
  n: string;
  name: string;
  role: string;
  desc: string;
  tags: string[];
};

const layers: Layer[] = [
  {
    n: "06",
    name: "INTERFACE",
    role: "Streaming UI · Generative UX",
    desc: "Donde la inteligencia se vuelve experiencia. Respuestas en stream, UI generativa, observabilidad expuesta al usuario final.",
    tags: ["React 19", "Vercel AI", "Realtime"],
  },
  {
    n: "05",
    name: "ORCHESTRATION",
    role: "Agentes + workflows",
    desc: "Coordinación entre modelos, herramientas y datos. Memoria persistente, planeación, decisiones encadenadas con guardrails.",
    tags: ["LangGraph", "MCP", "Tool registry"],
  },
  {
    n: "04",
    name: "RETRIEVAL",
    role: "Memoria semántica",
    desc: "Hybrid search (BM25 + vectores) con re-ranking. Contexto curado para que el modelo razone sobre datos reales y verificables.",
    tags: ["pgvector", "BM25", "Re-rank"],
  },
  {
    n: "03",
    name: "MODEL",
    role: "El razonador",
    desc: "El núcleo cognitivo. Selección por dominio, latencia y SLO. Modelos foundation + adaptadores ligeros cuando hace falta.",
    tags: ["Claude", "GPT", "Fine-tunes"],
  },
  {
    n: "02",
    name: "EMBEDDINGS",
    role: "Significado vectorizado",
    desc: "Representaciones densas y dispersas. Domain-tuning del corpus para que la similaridad refleje semántica del negocio.",
    tags: ["text-emb-3", "Domain-tuned", "Sparse"],
  },
  {
    n: "01",
    name: "DATA",
    role: "Sustrato del sistema",
    desc: "Ingestion, limpieza, governance y lineage. La base sin la cual cualquier modelo razona sobre el vacío.",
    tags: ["Snowflake", "S3", "Streaming"],
  },
];

export function Anatomy() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-32 lg:py-44">
      {/* Background atmosphere */}
      <div className="absolute inset-0 grid-fine opacity-20 mask-radial-fade" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nexus-chrome/15 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="ANATOMÍA · CAT/06"
            parts={[
              { text: "Seis capas.", className: "text-metallic" },
              { text: "Un sistema", className: "text-nexus-chrome/60", newLine: true },
              { text: "que respira.", className: "text-neon-grad" },
            ]}
          />
          <p className="max-w-sm text-[14px] leading-relaxed text-nexus-chrome/55">
            Cada Nexus se construye en capas con responsabilidades estancas,
            APIs estables y eval suites propios. Si una capa falla, las demás
            no se contaminan.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6 lg:mt-20 lg:gap-12">
          {/* Exploded stack (left, larger) */}
          <div className="col-span-12 lg:col-span-7">
            <ExplodedStack inView={inView} />
          </div>

          {/* Detail callouts (right) */}
          <div className="col-span-12 lg:col-span-5">
            <CalloutList inView={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Exploded perspective stack ============ */

function ExplodedStack({ inView }: { inView: boolean }) {
  return (
    <div className="relative mx-auto" style={{ perspective: "1400px" }}>
      <div
        style={{
          transform: "rotateX(18deg) rotateZ(-1deg)",
          transformStyle: "preserve-3d",
        }}
        className="relative space-y-4"
      >
        {layers.map((l, i) => (
          <motion.div
            key={l.n}
            initial={{ opacity: 0, y: 40, rotateX: 35 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              delay: 0.15 + i * 0.09,
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <StackPlate layer={l} index={i} />
          </motion.div>
        ))}

        {/* Vertical neon spine connecting layers */}
        <motion.span
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.8, duration: 1.4, ease: "easeOut" }}
          style={{ originY: 0 }}
          className="pointer-events-none absolute left-[14px] top-0 h-full w-px bg-gradient-to-b from-nexus-neon/60 via-nexus-neon/30 to-transparent shadow-[0_0_8px_#A6FF00]"
        />
      </div>

      {/* Bottom platform reflection */}
      <div
        aria-hidden
        className="pointer-events-none mx-auto mt-6 h-20 max-w-md bg-gradient-to-b from-nexus-neon/[0.06] to-transparent"
        style={{ filter: "blur(20px)" }}
      />
    </div>
  );
}

function StackPlate({ layer, index }: { layer: Layer; index: number }) {
  return (
    <div className="group relative">
      {/* Subtle gradient border wrapper */}
      <div className="relative overflow-hidden rounded-xl p-px">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-nexus-chrome/15 via-nexus-chrome/[0.04] to-transparent" />
        <div className="glass-panel relative flex items-center gap-5 rounded-xl px-6 py-5">
          {/* Left rail accent */}
          <span className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-nexus-neon/40 via-nexus-neon to-nexus-neon/40 shadow-[0_0_8px_#A6FF00]" />

          {/* Layer number */}
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-md border border-nexus-neon/30 bg-nexus-neon/[0.05] font-mono text-[11px] tracking-wider2 text-nexus-neon">
            {layer.n}
          </span>

          {/* Mini hex glyph */}
          <span className="flex h-7 w-7 flex-none items-center justify-center">
            <svg viewBox="0 0 20 20" className="h-full w-full">
              <polygon
                points="10,2 18,6 18,14 10,18 2,14 2,6"
                stroke="#A6FF00"
                strokeWidth="1.1"
                fill="none"
              />
              <circle cx="10" cy="10" r="2.2" fill="#A6FF00" />
            </svg>
          </span>

          {/* Layer info */}
          <div className="flex-1">
            <div className="flex items-baseline gap-3">
              <h4 className="font-display text-base font-medium tracking-tight text-nexus-chrome">
                {layer.name}
              </h4>
              <span className="font-mono text-[10px] tracking-wider2 text-nexus-chrome/45">
                {layer.role}
              </span>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {layer.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-nexus-chrome/10 bg-nexus-carbon/40 px-2 py-0.5 font-mono text-[9px] tracking-wider2 text-nexus-chrome/55"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Status indicator */}
          <span className="flex flex-none items-center gap-2 font-mono text-[9px] tracking-wider2 text-nexus-chrome/40">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nexus-neon opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-nexus-neon" />
            </span>
            OK
          </span>

          {/* Background number watermark */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-1 font-display text-[60px] font-light leading-none text-nexus-chrome/[0.03]"
          >
            {layer.n}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============ Detail callout list ============ */

function CalloutList({ inView }: { inView: boolean }) {
  return (
    <ul className="space-y-6">
      {layers.map((l, i) => (
        <motion.li
          key={l.n}
          initial={{ opacity: 0, x: 16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4 + i * 0.08, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative border-l border-nexus-chrome/15 pl-5"
        >
          <span className="absolute left-0 top-1.5 -translate-x-1/2 rounded-full bg-nexus-void p-1">
            <span className="block h-1.5 w-1.5 rounded-full bg-nexus-neon shadow-[0_0_6px_#A6FF00]" />
          </span>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[10px] tracking-wider2 text-nexus-neon">
              {l.n}
            </span>
            <span className="font-display text-base font-medium tracking-tight text-nexus-chrome">
              {l.name}
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-nexus-chrome/60">
            {l.desc}
          </p>
        </motion.li>
      ))}
    </ul>
  );
}
