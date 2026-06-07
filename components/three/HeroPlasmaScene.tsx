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

/**
 * Hero-grade Plasma Neural Core.
 * Hi-density particle synapse around a brilliant pulsing core. Particles
 * connect dynamically based on proximity. Mouse + scroll reactive.
 */
function PlasmaCore({ scrollProgress }: { scrollProgress: { current: number } }) {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const haloRef = useRef<THREE.Mesh>(null!);
  const { mouse } = useThree();
  const N = 110;

  const { positions, velocities, sizes } = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const velocities = new Float32Array(N * 3);
    const sizes = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const onShell = Math.random() > 0.3;
      const r = onShell
        ? 2.0 + Math.random() * 0.4
        : 0.6 + Math.random() * 1.3;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);
      velocities[i * 3] = (Math.random() - 0.5) * 0.0025;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0025;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0025;
      sizes[i] = 0.5 + Math.random() * 1.2;
    }
    return { positions, velocities, sizes };
  }, []);

  const maxSeg = N * 5;
  const linePos = useMemo(() => new Float32Array(maxSeg * 6), [maxSeg]);
  const lineColor = useMemo(() => new Float32Array(maxSeg * 6), [maxSeg]);

  const target = useRef({ rx: 0, ry: 0 });

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const sp = scrollProgress.current;

    // Smooth pointer parallax
    target.current.ry += (mouse.x * 0.5 - target.current.ry) * 0.04;
    target.current.rx += (-mouse.y * 0.3 - target.current.rx) * 0.04;

    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    // Scroll-driven outward push (particles disperse as you leave hero)
    const shellTarget = 2.1 + sp * 1.4;

    for (let i = 0; i < N; i++) {
      arr[i * 3] += velocities[i * 3] + Math.sin(t * 0.4 + i) * 0.0008;
      arr[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(t * 0.45 + i * 0.7) * 0.0008;
      arr[i * 3 + 2] += velocities[i * 3 + 2] + Math.sin(t * 0.3 + i * 0.5) * 0.0008;

      const dx = arr[i * 3], dy = arr[i * 3 + 1], dz = arr[i * 3 + 2];
      const r = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const k = 1 + (shellTarget - r) * 0.014;
      arr[i * 3] *= k;
      arr[i * 3 + 1] *= k;
      arr[i * 3 + 2] *= k;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rebuild lines
    let seg = 0;
    const cd = 0.9 + sp * 0.4; // longer reach as it disperses
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

    if (groupRef.current) {
      groupRef.current.rotation.y =
        target.current.ry + t * 0.12 + sp * Math.PI * 0.4;
      groupRef.current.rotation.x =
        target.current.rx + Math.sin(t * 0.3) * 0.12 + sp * 0.3;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.06 - sp * 0.3;
      // Slight overall scale reduction for breathing room
      const baseScale = 0.9 - sp * 0.18;
      groupRef.current.scale.setScalar(baseScale);
    }

    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2.6) * 0.14 + Math.sin(t * 6.1) * 0.04;
      coreRef.current.scale.setScalar(pulse * (1 - sp * 0.25));
    }
    if (haloRef.current) {
      const pulse = 1 + Math.sin(t * 1.8) * 0.10;
      haloRef.current.scale.setScalar(pulse * (1 - sp * 0.2));
      (haloRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.08 + Math.sin(t * 1.4) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Brilliant inner core — slimmer so it doesn't compete with text */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial color={[1.8, 3.2, 0]} toneMapped={false} />
      </mesh>
      {/* Soft halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial
          color="#A6FF00"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          color={[1.6, 2.8, 0]}
          sizeAttenuation
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      {/* Edges */}
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
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 3, 4]} intensity={1.6} color="#A6FF00" />
      <pointLight position={[-4, -2, 3]} intensity={1.0} color="#7acc00" />
      <pointLight position={[2, -3, -3]} intensity={0.6} color="#c8ccd1" />
    </>
  );
}

export function HeroPlasmaScene({
  className,
  scrollProgress,
}: {
  className?: string;
  scrollProgress: { current: number };
}) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 36 }}
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
          <PlasmaCore scrollProgress={scrollProgress} />
          <EffectComposer>
            <Bloom
              intensity={0.85}
              luminanceThreshold={0.4}
              luminanceSmoothing={0.4}
              mipmapBlur
              radius={0.75}
            />
            <ChromaticAberration
              offset={[0.0006, 0.001]}
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
