"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode, type PointerEvent } from "react";

/**
 * <Magnetic>: child translates toward the cursor while it's nearby.
 * Use to wrap CTAs / important links. Strength controls how much of the
 * cursor offset the element follows (0.1 subtle, 0.4 dramatic).
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 280, damping: 22, mass: 0.6 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={"inline-block " + (className ?? "")}
      data-cursor="hot"
    >
      {children}
    </motion.div>
  );
}

/**
 * <TiltCard>: rotates child in 3D based on cursor position over the card.
 * Internal layers using `data-tilt-layer={depth}` will translate-z for true parallax.
 */
export function TiltCard({
  children,
  max = 8,
  scale = 1.02,
  className,
  style,
}: {
  children: ReactNode;
  max?: number;
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sc = useMotionValue(1);

  const srx = useSpring(rx, { stiffness: 240, damping: 22, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 240, damping: 22, mass: 0.5 });
  const ssc = useSpring(sc, { stiffness: 240, damping: 22, mass: 0.5 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(-py * max);
    ry.set(px * max);
    sc.set(scale);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    sc.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{
        rotateX: srx,
        rotateY: sry,
        scale: ssc,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
