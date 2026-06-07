"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction } from "postprocessing";

const N = 220; // particle count

/* ===================== Formation generators =====================
   Each takes (i, total) and returns a fixed target position for that
   particle within the formation. Time-based jitter is added later. */

function spherePos(i: number, total: number): [number, number, number] {
  // fibonacci sphere — even distribution on a shell
  const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  const r = 2.05;
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
}

function hexGridPos(i: number): [number, number, number] {
  // 3D hex-ish lattice (cube root layout with row offsets)
  const side = 6;
  const layer = Math.floor(i / (side * side));
  const row = Math.floor(i / side) % side;
  const col = i % side;
  const xOffset = (row % 2) * 0.28;
  return [
    (col - side / 2 + 0.5) * 0.62 + xOffset,
    (row - side / 2 + 0.5) * 0.56,
    (layer - 2.5) * 0.54,
  ];
}

function helixPos(i: number, total: number): [number, number, number] {
  const turns = 4;
  const u = (i / total) * Math.PI * 2 * turns;
  const arm = i % 2 === 0 ? 0 : Math.PI;
  const r = 1.45;
  return [
    Math.cos(u + arm) * r,
    (i / total - 0.5) * 4.6,
    Math.sin(u + arm) * r,
  ];
}

function torusPos(i: number, total: number): [number, number, number] {
  const R = 2.0;
  const r = 0.55;
  const wraps = 7;
  const u = (i / total) * Math.PI * 2 * wraps;
  const v = ((i * 0.61803398875) % 1) * Math.PI * 2; // golden-ratio v
  return [
    (R + r * Math.cos(v)) * Math.cos(u),
    r * Math.sin(v) * 1.6,
    (R + r * Math.cos(v)) * Math.sin(u),
  ];
}

const FORMATIONS = [spherePos, hexGridPos, helixPos, torusPos] as const;

function smoothstep(x: number) {
  return x * x * (3 - 2 * x);
}

/* ===================== The particle system ===================== */

function MorphingNet({
  scrollProgress,
}: {
  scrollProgress: { current: number };
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const { mouse } = useThree();

  // Pre-allocate buffers
  const positions = useMemo(() => new Float32Array(N * 3), []);
  const maxSeg = N * 4;
  const linePos = useMemo(() => new Float32Array(maxSeg * 6), [maxSeg]);
  const lineColor = useMemo(() => new Float32Array(maxSeg * 6), [maxSeg]);

  const target = useRef({ rx: 0, ry: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const sp = Math.max(0, Math.min(1, scrollProgress.current));

    // Pointer parallax (very subtle)
    target.current.ry += (mouse.x * 0.3 - target.current.ry) * 0.04;
    target.current.rx += (-mouse.y * 0.2 - target.current.rx) * 0.04;

    // Pick formation index based on scroll progress
    const stages = FORMATIONS.length - 1; // 3 transitions across 4 forms
    const p = sp * stages;
    const idx = Math.min(Math.floor(p), stages - 1);
    const ft = p - idx;
    const eased = smoothstep(ft);

    const fromFn = FORMATIONS[idx];
    const toFn = FORMATIONS[idx + 1];

    // Update particle positions
    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < N; i++) {
      const a = fromFn(i, N);
      const b = toFn(i, N);
      // gentle living jitter (smaller when transitioning to keep clean morph)
      const jitterAmp = 0.04 * (1 - eased * 0.6);
      const jx = Math.sin(t * 0.8 + i * 0.31) * jitterAmp;
      const jy = Math.cos(t * 0.7 + i * 0.27) * jitterAmp;
      const jz = Math.sin(t * 0.9 + i * 0.43) * jitterAmp;
      arr[i * 3] = a[0] + (b[0] - a[0]) * eased + jx;
      arr[i * 3 + 1] = a[1] + (b[1] - a[1]) * eased + jy;
      arr[i * 3 + 2] = a[2] + (b[2] - a[2]) * eased + jz;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rebuild lines (capped)
    let seg = 0;
    const cd = 0.95; // connection distance
    const cd2 = cd * cd;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (seg >= maxSeg) break;
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < cd2) {
          const s6 = seg * 6;
          linePos[s6] = arr[i * 3];
          linePos[s6 + 1] = arr[i * 3 + 1];
          linePos[s6 + 2] = arr[i * 3 + 2];
          linePos[s6 + 3] = arr[j * 3];
          linePos[s6 + 4] = arr[j * 3 + 1];
          linePos[s6 + 5] = arr[j * 3 + 2];
          const fade = 1 - Math.sqrt(d2) / cd;
          const r = 0.5 * fade;
          const g = 1.0 * fade;
          lineColor[s6] = r;
          lineColor[s6 + 1] = g;
          lineColor[s6 + 2] = 0;
          lineColor[s6 + 3] = r;
          lineColor[s6 + 4] = g;
          lineColor[s6 + 5] = 0;
          seg++;
        }
      }
    }
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, seg * 2);

    // Group rotation: gentle continuous + scroll-aligned tilt
    if (groupRef.current) {
      groupRef.current.rotation.y =
        target.current.ry + t * 0.06 + sp * Math.PI * 0.6;
      groupRef.current.rotation.x =
        target.current.rx + Math.sin(t * 0.2) * 0.08 + (sp - 0.5) * 0.4;
    }

    // Pulsing core
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2.4) * 0.18 + Math.sin(t * 5.7) * 0.04;
      // Core fades during morph transitions (so the formation reads cleanly)
      const fade = 1 - Math.min(1, Math.abs(ft - 0.5) * 1.4);
      coreRef.current.scale.setScalar(pulse * (0.4 + 0.6 * (1 - eased * 0.5)));
      (coreRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.85 - fade * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Brilliant core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshBasicMaterial
          color={[1.8, 3.2, 0]}
          toneMapped={false}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Soft halo */}
      <mesh>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial
          color="#A6FF00"
          transparent
          opacity={0.10}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={N}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color={[1.6, 2.8, 0]}
          sizeAttenuation
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePos, 3]}
            count={linePos.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColor, 3]}
            count={lineColor.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 4]} intensity={1.4} color="#A6FF00" />
      <pointLight position={[-4, -2, 3]} intensity={0.9} color="#7acc00" />
      <pointLight position={[2, -3, -3]} intensity={0.5} color="#c8ccd1" />
    </>
  );
}

export function MorphingPlasma({
  className,
  scrollProgress,
}: {
  className?: string;
  scrollProgress: { current: number };
}) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 38 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <MorphingNet scrollProgress={scrollProgress} />
          <EffectComposer>
            <Bloom
              intensity={1.0}
              luminanceThreshold={0.32}
              luminanceSmoothing={0.4}
              mipmapBlur
              radius={0.8}
            />
            <ChromaticAberration
              offset={[0.0005, 0.0009]}
              blendFunction={BlendFunction.NORMAL}
              radialModulation={false}
              modulationOffset={0}
            />
            <Vignette eskil={false} offset={0.3} darkness={0.55} />
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
