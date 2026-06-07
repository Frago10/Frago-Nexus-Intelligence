"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      if (r > 0.92) {
        arr[i * 3] = 0.65;
        arr[i * 3 + 1] = 1.0;
        arr[i * 3 + 2] = 0.0;
      } else if (r > 0.6) {
        arr[i * 3] = 0.78;
        arr[i * 3 + 1] = 0.8;
        arr[i * 3 + 2] = 0.82;
      } else {
        arr[i * 3] = 0.22;
        arr[i * 3 + 1] = 0.25;
        arr[i * 3 + 2] = 0.28;
      }
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.y = t * 0.02;
    ref.current.rotation.x = Math.sin(t * 0.05) * 0.08;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t * 0.4 + i) * 0.0005;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export function ParticleField({
  className,
  count = 600,
}: {
  className?: string;
  count?: number;
}) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.25]}
        frameloop="always"
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <Particles count={count} />
        </Suspense>
      </Canvas>
    </div>
  );
}
