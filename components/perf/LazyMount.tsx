"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mount children only once their wrapper enters the viewport (with margin).
 * Used to defer expensive Three.js canvases until the user scrolls near them.
 * Once mounted, stays mounted (so we don't tear down WebGL contexts).
 */
export function LazyMount({
  children,
  rootMargin = "200px",
  className,
  fallback = null,
}: {
  children: React.ReactNode;
  rootMargin?: string;
  className?: string;
  fallback?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!ref.current || mounted) return;
    const el = ref.current;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible) {
          setMounted(true);
          obs.disconnect();
        }
      },
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {mounted ? children : fallback}
    </div>
  );
}
