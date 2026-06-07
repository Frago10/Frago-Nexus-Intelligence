"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

const BRAND_NEON = new THREE.Color("#A6FF00");
const BRAND_DIM = new THREE.Color("#5a8a00");
const BRAND_SILVER = new THREE.Color("#c8ccd1");

type NetParams = {
  nodeCount: number;
  radius: number;
  connectionDistance: number;
};

function NeuralNetwork({ nodeCount, radius, connectionDistance }: NetParams) {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse, viewport } = useThree();

  // Generate fibonacci-sphere-like distribution of nodes on a sphere shell + interior
  const { positions, velocities, basePositions } = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const velocities = new Float32Array(nodeCount * 3);
    const basePositions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      // mostly on a sphere shell for that "neural core" look, some interior
      const onShell = Math.random() > 0.35;
      const r = onShell
        ? radius * (0.92 + Math.random() * 0.08)
        : radius * (0.3 + Math.random() * 0.6);
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;
      velocities[i * 3] = (Math.random() - 0.5) * 0.0012;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0012;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0012;
    }
    return { positions, velocities, basePositions };
  }, [nodeCount, radius]);

  // Per-node sizes & colors
  const { sizes, colors } = useMemo(() => {
    const sizes = new Float32Array(nodeCount);
    const colors = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const t = Math.random();
      sizes[i] = 0.018 + Math.random() * 0.045;
      const c =
        t > 0.82
          ? BRAND_NEON
          : t > 0.55
          ? BRAND_SILVER
          : BRAND_DIM;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { sizes, colors };
  }, [nodeCount]);

  // Pre-allocated line buffer; max possible segments capped for perf
  const maxSegments = nodeCount * 6;
  const linePositions = useMemo(
    () => new Float32Array(maxSegments * 6),
    [maxSegments]
  );
  const lineColors = useMemo(
    () => new Float32Array(maxSegments * 6),
    [maxSegments]
  );

  // Pointer-reactive target rotation
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const posArr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    // Update node positions with gentle drift + return-to-base spring
    for (let i = 0; i < nodeCount; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;
      posArr[ix] += velocities[ix] + Math.sin(t * 0.4 + i) * 0.0008;
      posArr[iy] += velocities[iy] + Math.cos(t * 0.45 + i * 0.7) * 0.0008;
      posArr[iz] += velocities[iz] + Math.sin(t * 0.3 + i * 0.5) * 0.0008;

      // mild pull back to base
      posArr[ix] += (basePositions[ix] - posArr[ix]) * 0.004;
      posArr[iy] += (basePositions[iy] - posArr[iy]) * 0.004;
      posArr[iz] += (basePositions[iz] - posArr[iz]) * 0.004;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rebuild lines (O(n^2) capped) — keep nodeCount modest for perf
    let segIdx = 0;
    const cd2 = connectionDistance * connectionDistance;
    for (let i = 0; i < nodeCount; i++) {
      const ix = i * 3;
      for (let j = i + 1; j < nodeCount; j++) {
        if (segIdx >= maxSegments) break;
        const jx = j * 3;
        const dx = posArr[ix] - posArr[jx];
        const dy = posArr[ix + 1] - posArr[jx + 1];
        const dz = posArr[ix + 2] - posArr[jx + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < cd2) {
          const seg = segIdx * 6;
          linePositions[seg] = posArr[ix];
          linePositions[seg + 1] = posArr[ix + 1];
          linePositions[seg + 2] = posArr[ix + 2];
          linePositions[seg + 3] = posArr[jx];
          linePositions[seg + 4] = posArr[jx + 1];
          linePositions[seg + 5] = posArr[jx + 2];

          // alpha-encoded color via brightness based on proximity
          const fade = 1 - Math.sqrt(d2) / connectionDistance;
          const r = 0.65 * fade;
          const g = 1.0 * fade;
          const b = 0.0;
          lineColors[seg] = r;
          lineColors[seg + 1] = g;
          lineColors[seg + 2] = b;
          lineColors[seg + 3] = r;
          lineColors[seg + 4] = g;
          lineColors[seg + 5] = b;
          segIdx++;
        }
      }
    }
    // zero out unused segments
    for (let k = segIdx * 6; k < maxSegments * 6; k++) {
      linePositions[k] = 0;
      lineColors[k] = 0;
    }
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, segIdx * 2);

    // pointer-reactive rotation (lerp)
    targetRot.current.x += (mouse.y * 0.25 - targetRot.current.x) * 0.04;
    targetRot.current.y += (mouse.x * 0.4 - targetRot.current.y) * 0.04;
    groupRef.current.rotation.x = targetRot.current.x + t * 0.04;
    groupRef.current.rotation.y = targetRot.current.y + t * 0.08;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
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
          <bufferAttribute
            attach="attributes-size"
            args={[sizes, 1]}
            count={sizes.length}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            count={lineColors.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

function CoreGlow() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      const s = 1 + Math.sin(t * 1.4) * 0.08;
      ref.current.scale.set(s, s, s);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshBasicMaterial
        color="#A6FF00"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export function NeuralScene({
  className,
  nodeCount = 90,
  radius = 2.4,
  connectionDistance = 1.05,
}: {
  className?: string;
  nodeCount?: number;
  radius?: number;
  connectionDistance?: number;
}) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 5]} intensity={1.2} color="#A6FF00" />
          <pointLight position={[-4, -3, 2]} intensity={0.6} color="#c8ccd1" />
          <CoreGlow />
          <NeuralNetwork
            nodeCount={nodeCount}
            radius={radius}
            connectionDistance={connectionDistance}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
