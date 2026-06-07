"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "@/components/reveal/WordReveal";
import { TiltCard } from "@/components/interaction/Magnetic";

// Re-export so existing imports from other sections still resolve.
export { SectionHeader } from "@/components/reveal/WordReveal";

const capabilities = [
  {
    code: "01",
    icon: "hex",
    title: "Inteligencia",
    es: "Tecnología avanzada que potencia decisiones.",
    en: "Modelos de razonamiento, RAG empresarial y motores de decisión que convierten datos crudos en ventaja estratégica.",
    tags: ["LLMs", "RAG", "Vector DB", "Reasoning"],
  },
  {
    code: "02",
    icon: "chip",
    title: "Automatización",
    es: "Procesos inteligentes que optimizan y escalan.",
    en: "Agentes autónomos y workflows que orquestan operaciones críticas con precisión y consistencia ininterrumpida.",
    tags: ["Agents", "Workflows", "Orchestration", "MCP"],
  },
  {
    code: "03",
    icon: "evo",
    title: "Evolución",
    es: "Innovación constante para un futuro sin límites.",
    en: "Plataformas que aprenden, se adaptan y evolucionan con tu organización. Infraestructura preparada para la próxima década.",
    tags: ["Adaptive", "Scalable", "Resilient", "Future-proof"],
  },
];

function IconHex() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none">
      <path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z" stroke="#A6FF00" strokeWidth="1.4" />
      <path d="M20 11 L27 15 L27 25 L20 29 L13 25 L13 15 Z" stroke="#A6FF00" strokeWidth="1" opacity="0.6" />
      <circle cx="20" cy="20" r="1.6" fill="#A6FF00" />
    </svg>
  );
}

function IconChip() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none">
      <rect x="10" y="10" width="20" height="20" rx="2" stroke="#A6FF00" strokeWidth="1.4" />
      <rect x="15" y="15" width="10" height="10" rx="1" stroke="#A6FF00" strokeWidth="1" opacity="0.7" />
      {[14, 20, 26].map((y) => (
        <g key={y}>
          <line x1="6" y1={y} x2="10" y2={y} stroke="#A6FF00" strokeWidth="1.2" />
          <line x1="30" y1={y} x2="34" y2={y} stroke="#A6FF00" strokeWidth="1.2" />
        </g>
      ))}
      {[14, 20, 26].map((x) => (
        <g key={x}>
          <line x1={x} y1="6" x2={x} y2="10" stroke="#A6FF00" strokeWidth="1.2" />
          <line x1={x} y1="30" x2={x} y2="34" stroke="#A6FF00" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}

function IconEvo() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none">
      <path d="M8 26 L20 14 L32 26" stroke="#A6FF00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 32 L20 20 L32 32" stroke="#A6FF00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
    </svg>
  );
}

function CapabilityIcon({ kind }: { kind: string }) {
  if (kind === "hex") return <IconHex />;
  if (kind === "chip") return <IconChip />;
  return <IconEvo />;
}

export function Capabilities() {
  return (
    <section id="capacidades" className="relative py-32 lg:py-44">
      <div className="absolute inset-0 grid-fine opacity-40 mask-bottom-fade" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="CAPACIDADES NÚCLEO"
          parts={[
            { text: "Tres pilares.", className: "text-metallic" },
            { text: " Un sistema", className: "text-nexus-chrome/60" },
            { text: " indivisible.", className: "text-neon-grad" },
          ]}
        />

        <div className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {capabilities.map((cap, i) => (
            <CapabilityCard key={cap.code} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({
  cap,
  index,
}: {
  cap: (typeof capabilities)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard max={6} scale={1.015} className="group relative">
        <div className="relative overflow-hidden rounded-2xl p-px">
          {/* gradient border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-nexus-chrome/15 via-nexus-chrome/[0.02] to-transparent" />
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-b from-nexus-neon/30 via-nexus-neon/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />

          <div className="glass-panel relative rounded-2xl p-8 lg:p-10">
            <span className="corner-mark tl" />
            <span className="corner-mark tr" />
            <span className="corner-mark bl" />
            <span className="corner-mark br" />

            <div className="flex items-start justify-between">
              <div className="rounded-xl border border-nexus-neon/20 bg-nexus-neon/[0.04] p-3 transition-all duration-500 group-hover:border-nexus-neon/50 group-hover:bg-nexus-neon/[0.08] group-hover:shadow-neon-sm">
                <CapabilityIcon kind={cap.icon} />
              </div>
              <span className="font-mono text-[10px] tracking-wider2 text-nexus-chrome/35">
                / {cap.code}
              </span>
            </div>

            <h3 className="mt-8 font-display text-2xl font-light tracking-tight text-nexus-chrome lg:text-3xl">
              {cap.title}
            </h3>
            <p className="mt-3 text-[13px] font-medium tracking-wide text-nexus-neon/85">
              {cap.es}
            </p>
            <p className="mt-5 text-[14px] leading-relaxed text-nexus-chrome/55">
              {cap.en}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {cap.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-nexus-chrome/10 bg-nexus-carbon/40 px-2.5 py-1 font-mono text-[9px] tracking-wider2 text-nexus-chrome/55"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* scan line */}
            <div className="ring-scan absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
