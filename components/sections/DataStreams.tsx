"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "@/components/sections/Capabilities";

const streams = [
  { tag: "INGESTION", lines: ["api://stream.connect", "validating schema", "buffering 12.4MB/s", "→ vector store"] },
  { tag: "REASONING", lines: ["model :: claude-opus-4-7", "context 184k tokens", "tools[6] mounted", "→ executing"] },
  { tag: "EXECUTION", lines: ["agent :: orchestrator", "task chain ✓ 24/24", "guardrails ok", "→ committed"] },
  { tag: "TELEMETRY", lines: ["latency p50: 84ms", "evals passed 99.4%", "drift = 0.002", "→ stable"] },
];

export function DataStreams() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      id="inteligencia"
      className="relative overflow-hidden py-32 lg:py-44"
    >
      <div className="absolute inset-0 grid-overlay opacity-30 mask-radial-fade" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="LIVE DATA STREAMS"
          parts={[
            { text: "Inteligencia", className: "text-metallic" },
            { text: " en", className: "text-nexus-chrome/60" },
            { text: " movimiento.", className: "text-neon-grad" },
          ]}
        />

        <motion.div
          style={{ y, opacity }}
          className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {streams.map((s, i) => (
            <StreamCard key={s.tag} stream={s} index={i} />
          ))}
        </motion.div>

        {/* Horizontal data stream tickers */}
        <div className="mt-16 space-y-3">
          <StreamTicker
            speed="40s"
            items={[
              "MODEL ✦ claude-opus-4-7",
              "AGENT ✦ orchestrator-v3",
              "STATUS ✦ NOMINAL",
              "REGION ✦ eu-west-1",
              "TPS ✦ 12,402",
              "EVAL ✦ 99.42%",
              "DRIFT ✦ 0.002",
              "QUEUE ✦ 0",
              "VECTOR ✦ pgvector",
              "RETRIEVAL ✦ hybrid-bm25",
            ]}
          />
          <StreamTicker
            speed="55s"
            reverse
            items={[
              "INFERENCE ✧ 84ms p50",
              "GUARDRAILS ✧ ok",
              "TOOLS ✧ 6 mounted",
              "MEMORY ✧ 184k ctx",
              "POLICY ✧ enforced",
              "TRACE ✧ otlp://ingest",
              "ENCRYPT ✧ aes-256-gcm",
              "AUDIT ✧ sealed",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function StreamCard({
  stream,
  index,
}: {
  stream: (typeof streams)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="glass-panel relative overflow-hidden rounded-xl p-5"
    >
      <span className="corner-mark tl" />
      <span className="corner-mark br" />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-wider2 text-nexus-neon">
          {stream.tag}
        </span>
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nexus-neon opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-nexus-neon" />
        </span>
      </div>
      <div className="mt-5 space-y-2">
        {stream.lines.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
            className="font-mono text-[11px] tracking-wide text-nexus-chrome/60"
          >
            <span className="mr-2 text-nexus-neon/60">›</span>
            {line}
          </motion.div>
        ))}
      </div>
      {/* progress bar */}
      <div className="mt-6 h-px w-full overflow-hidden bg-nexus-chrome/10">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-nexus-neon to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
        />
      </div>
    </motion.div>
  );
}

function StreamTicker({
  items,
  speed,
  reverse,
}: {
  items: string[];
  speed: string;
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden border-y border-nexus-chrome/8 py-3">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{
          animation: `marquee ${speed} linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-mono text-[11px] tracking-wider2 text-nexus-chrome/45"
          >
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
}
