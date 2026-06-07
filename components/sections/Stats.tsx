"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";

const stats = [
  { value: 142, label: "MODELOS EN PRODUCCIÓN", suffix: "" },
  { value: 99.998, label: "UPTIME PROMEDIO", suffix: "%", decimals: 3 },
  { value: 27, label: "AGENTES AUTÓNOMOS", suffix: "" },
  { value: 84, label: "LATENCIA P50 (MS)", suffix: "ms" },
];

export function Stats() {
  return (
    <section className="relative border-y border-nexus-chrome/10 py-20">
      <div className="absolute inset-0 grid-fine opacity-25" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nexus-neon/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-nexus-neon/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {stats.map((s, i) => (
            <StatItem key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const decimals = stat.decimals ?? 0;
  const rounded = useTransform(count, (v) =>
    v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(count, stat.value, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.12,
      });
      return controls.stop;
    }
  }, [inView, count, stat.value, index]);

  return (
    <div ref={ref} className="relative flex flex-col">
      <div className="flex items-baseline gap-1">
        <motion.span className="font-display text-4xl font-light tracking-tight text-metallic md:text-5xl">
          {rounded}
        </motion.span>
        <span className="font-display text-2xl font-light text-nexus-neon md:text-3xl">
          {stat.suffix}
        </span>
      </div>
      <span className="mt-3 font-mono text-[10px] tracking-wider2 text-nexus-chrome/45">
        {stat.label}
      </span>
      <span className="mt-3 h-px w-12 bg-gradient-to-r from-nexus-neon to-transparent" />
    </div>
  );
}
