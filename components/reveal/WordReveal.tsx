"use client";

import { motion, useInView } from "motion/react";
import { Fragment, useRef } from "react";

/**
 * Per-word slide-up mask reveal. Gradient classes (text-metallic, text-neon-grad)
 * MUST land on the inner span — background-clip:text doesn't inherit through wrappers.
 */
export function WordReveal({
  text,
  wrapperClassName,
  wordClassName,
  baseDelay = 0,
  step = 0.07,
  active,
}: {
  text: string;
  wrapperClassName?: string;
  wordClassName?: string;
  baseDelay?: number;
  step?: number;
  active: boolean;
}) {
  const words = text.split(" ").filter(Boolean);
  return (
    <span className={wrapperClassName}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom leading-[1]">
            <motion.span
              className={"inline-block will-change-transform leading-[0.98] " + (wordClassName ?? "")}
              initial={{ y: "110%" }}
              animate={active ? { y: "0%" } : { y: "110%" }}
              transition={{
                delay: baseDelay + i * step,
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

/* ---------------- Section headers built on WordReveal ---------------- */
export type TitlePart = {
  text: string;
  className?: string;
  newLine?: boolean;
};

/**
 * Scroll-triggered section header. Eyebrow slides in, then each title part
 * does a word-by-word mask reveal. Parts with `newLine: true` start on a
 * fresh line.
 */
export function SectionHeader({
  eyebrow,
  parts,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  parts: TitlePart[];
  align?: "left" | "center";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  // Compute cumulative word-staggered delays so reveals feel continuous across parts
  let runningDelay = 0.18;
  const partDelays = parts.map((p) => {
    const d = runningDelay;
    runningDelay += p.text.split(" ").length * 0.07 + 0.05;
    return d;
  });

  return (
    <div ref={ref} className={align === "center" ? "text-center " + className : className}>
      <div
        className={"flex items-center gap-3 " + (align === "center" ? "justify-center" : "")}
      >
        <motion.span
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ originX: align === "center" ? 0.5 : 0 }}
          className="h-px w-8 bg-nexus-neon shadow-[0_0_8px_#A6FF00]"
        />
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="label-mono text-nexus-neon"
        >
          {eyebrow}
        </motion.span>
      </div>
      <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-balance">
        {parts.map((p, i) => {
          const next = parts[i + 1];
          // Insert a hard space between adjacent parts unless next part starts on a new line
          const needsSep = next && !next.newLine;
          return (
            <Fragment key={i}>
              <WordReveal
                active={inView}
                text={p.text.trim()}
                wordClassName={p.className}
                wrapperClassName={p.newLine ? "block" : ""}
                baseDelay={partDelays[i]}
              />
              {needsSep ? " " : null}
            </Fragment>
          );
        })}
      </h2>
    </div>
  );
}
