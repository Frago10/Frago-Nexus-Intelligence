"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

/* ===========================================================
   CONCEPT A — PLASMA NEURAL CORE
   A breathing sphere of neon particles connected by dynamic
   edges. A bright pulsing core anchors it. Feels like a living
   AI synapse.
   =========================================================== */
function PlasmaCore() {
  const groupRef = useRef<THREE.Group>(null!);
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const N = 75;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const velocities = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 1.7 + Math.random() * 0.5;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);
      velocities[i * 3] = (Math.random() - 0.5) * 0.0025;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0025;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0025;
    }
    return { positions, velocities };
  }, []);

  const maxSeg = N * 4;
  const linePos = useMemo(() => new Float32Array(maxSeg * 6), [maxSeg]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < N; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      // pull toward sphere shell
      const dx = arr[i * 3],
        dy = arr[i * 3 + 1],
        dz = arr[i * 3 + 2];
      const r = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const target = 1.95;
      const k = 1 + (target - r) * 0.012;
      arr[i * 3] *= k;
      arr[i * 3 + 1] *= k;
      arr[i * 3 + 2] *= k;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // rebuild edges
    let seg = 0;
    const cd = 1.0;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (seg >= maxSeg) break;
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < cd * cd) {
          const s6 = seg * 6;
          linePos[s6] = arr[i * 3];
          linePos[s6 + 1] = arr[i * 3 + 1];
          linePos[s6 + 2] = arr[i * 3 + 2];
          linePos[s6 + 3] = arr[j * 3];
          linePos[s6 + 4] = arr[j * 3 + 1];
          linePos[s6 + 5] = arr[j * 3 + 2];
          seg++;
        }
      }
    }
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, seg * 2);

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.22;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 2.6) * 0.18;
      coreRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      {/* bright core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial color={[2.2, 4.2, 0]} toneMapped={false} />
      </mesh>
      {/* soft halo */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color="#A6FF00"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color={[1.6, 2.6, 0]}
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
        </bufferGeometry>
        <lineBasicMaterial
          color="#A6FF00"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ===========================================================
   CONCEPT B — FACETED CRYSTAL
   A dark icosahedron with glowing neon edge wireframe + subtle
   internal glow. Reads as crystallized intelligence / data gem.
   =========================================================== */
function FacetedCrystal() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.LineSegments>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  const baseGeo = useMemo(() => new THREE.IcosahedronGeometry(1.8, 1), []);
  const wireGeo = useMemo(() => new THREE.EdgesGeometry(baseGeo), [baseGeo]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = t * 0.15;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.3;
      wireRef.current.rotation.x = t * 0.15;
    }
    if (innerRef.current) {
      const s2 = 1 + Math.sin(t * 1.6) * 0.12;
      innerRef.current.scale.setScalar(s2);
      innerRef.current.rotation.y = -t * 0.6;
      innerRef.current.rotation.x = -t * 0.4;
    }
  });

  return (
    <group>
      {/* outer solid icosahedron */}
      <mesh ref={meshRef} geometry={baseGeo}>
        <meshPhysicalMaterial
          color="#0a0a10"
          metalness={0.6}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.2}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* glowing edges */}
      <lineSegments ref={wireRef} geometry={wireGeo}>
        <lineBasicMaterial color={[1.8, 3.2, 0]} toneMapped={false} />
      </lineSegments>
      {/* inner pulsing core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color={[1.8, 3.4, 0]} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ===========================================================
   CONCEPT C — ENERGY TOROID
   A torus reactor — wireframe ring of neon plasma with bright
   particles streaming along it + a brilliant core. Iron-Man-style
   arc reactor.
   =========================================================== */
function EnergyToroid() {
  const groupRef = useRef<THREE.Group>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const N = 240;

  // initial particle positions sampled along the torus surface
  const positions = useMemo(() => {
    const arr = new Float32Array(N * 3);
    const R = 1.7;
    for (let i = 0; i < N; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const r = 0.5;
      arr[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
      arr[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
      arr[i * 3 + 2] = r * Math.sin(v);
    }
    return arr;
  }, []);

  const baseAngles = useMemo(() => {
    const a = new Float32Array(N * 2);
    for (let i = 0; i < N; i++) {
      a[i * 2] = Math.random() * Math.PI * 2; // u
      a[i * 2 + 1] = Math.random() * Math.PI * 2; // v
    }
    return a;
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const R = 1.7;
    const r = 0.5;
    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < N; i++) {
      const u = baseAngles[i * 2] + t * 0.6;
      const v = baseAngles[i * 2 + 1] + t * 0.3;
      arr[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
      arr[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
      arr[i * 3 + 2] = r * Math.sin(v);
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.x = -Math.PI / 3 + Math.sin(t * 0.4) * 0.08;
      groupRef.current.rotation.y = t * 0.18;
    }
    if (torusRef.current) {
      const sc = 1 + Math.sin(t * 1.8) * 0.04;
      torusRef.current.scale.setScalar(sc);
    }
  });

  return (
    <group ref={groupRef}>
      {/* wireframe torus body */}
      <mesh ref={torusRef}>
        <torusGeometry args={[1.7, 0.5, 14, 64]} />
        <meshBasicMaterial
          color="#A6FF00"
          wireframe
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* particle ring */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={N}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={[1.8, 3, 0]}
          sizeAttenuation
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </points>
      {/* brilliant core */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color={[2.2, 4, 0]} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color="#A6FF00"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ===========================================================
   CONCEPT D — MORPHING ORGANISM
   A wireframe icosahedron whose vertices breathe & ripple via
   procedural noise. Looks like a living digital creature.
   =========================================================== */
function MorphingOrganism() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  const baseGeo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1.7, 4);
    return g;
  }, []);
  const origPos = useMemo(() => {
    return new Float32Array(baseGeo.attributes.position.array);
  }, [baseGeo]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i += 3) {
      const x = origPos[i],
        y = origPos[i + 1],
        z = origPos[i + 2];
      // multi-octave noise-ish displacement
      const n =
        Math.sin(x * 2.5 + t * 1.4) * 0.6 +
        Math.cos(y * 2.7 + t * 1.1) * 0.45 +
        Math.sin(z * 2.3 + t * 0.9) * 0.5;
      const k = 1 + n * 0.085;
      pos[i] = x * k;
      pos[i + 1] = y * k;
      pos[i + 2] = z * k;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = t * 0.18;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;

    if (innerRef.current) {
      const sc = 1 + Math.sin(t * 2.2) * 0.18;
      innerRef.current.scale.setScalar(sc);
      innerRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={baseGeo}>
        <meshBasicMaterial
          color={[1.2, 2, 0]}
          wireframe
          transparent
          opacity={0.7}
          toneMapped={false}
        />
      </mesh>
      {/* solid inner core glow */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color={[2, 3.6, 0]} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial
          color="#A6FF00"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* =========== Shared Canvas wrapper =========== */
function SculptureCanvas({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.NoToneMapping,
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 4, 5]} intensity={1.2} />
      <pointLight position={[-3, 2, 3]} intensity={1.6} color="#A6FF00" />
      <pointLight position={[2, -3, -2]} intensity={1} color="#7acc00" />
      <Suspense fallback={null}>
        {children}
        <EffectComposer>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.35}
            mipmapBlur
            radius={0.7}
          />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

export function SculptureConceptA({ className }: { className?: string }) {
  return (
    <div className={className}>
      <SculptureCanvas>
        <PlasmaCore />
      </SculptureCanvas>
    </div>
  );
}
export function SculptureConceptB({ className }: { className?: string }) {
  return (
    <div className={className}>
      <SculptureCanvas>
        <FacetedCrystal />
      </SculptureCanvas>
    </div>
  );
}
export function SculptureConceptC({ className }: { className?: string }) {
  return (
    <div className={className}>
      <SculptureCanvas>
        <EnergyToroid />
      </SculptureCanvas>
    </div>
  );
}
export function SculptureConceptD({ className }: { className?: string }) {
  return (
    <div className={className}>
      <SculptureCanvas>
        <MorphingOrganism />
      </SculptureCanvas>
    </div>
  );
}
