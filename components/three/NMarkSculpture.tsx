"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  ToneMapping,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction } from "postprocessing";

/**
 * 3D N-mark — the brand letterform extruded as real geometry,
 * with metallic PBR body and a neon-emissive slash crossing through it.
 * Cinematic bloom + ACES tone mapping. Cursor + scroll-reactive.
 */

function buildNGeometries(depth = 0.42) {
  // Left bar (rectangle), CCW with Y up
  const leftBar = new THREE.Shape();
  leftBar.moveTo(-1.216, -1.444);
  leftBar.lineTo(-0.684, -1.444);
  leftBar.lineTo(-0.684, 1.444);
  leftBar.lineTo(-1.216, 1.444);
  leftBar.closePath();

  // Right bar + diagonal as one complex polygon (matches LogoMark.tsx SVG path 2)
  const rightBar = new THREE.Shape();
  rightBar.moveTo(-0.684, 1.444);
  rightBar.lineTo(-0.152, 1.444);
  rightBar.lineTo(0.684, -0.76);
  rightBar.lineTo(0.684, 1.444);
  rightBar.lineTo(1.216, 1.444);
  rightBar.lineTo(1.216, -1.444);
  rightBar.lineTo(0.684, -1.444);
  rightBar.lineTo(-0.152, 0.76);
  rightBar.lineTo(-0.152, -1.444);
  rightBar.lineTo(-0.684, -1.444);
  rightBar.closePath();

  const opts: THREE.ExtrudeGeometryOptions = {
    depth,
    bevelEnabled: true,
    bevelSegments: 6,
    bevelSize: 0.028,
    bevelThickness: 0.04,
    curveSegments: 8,
  };

  const g1 = new THREE.ExtrudeGeometry(leftBar, opts);
  const g2 = new THREE.ExtrudeGeometry(rightBar, opts);
  g1.translate(0, 0, -depth / 2);
  g2.translate(0, 0, -depth / 2);
  g1.computeVertexNormals();
  g2.computeVertexNormals();
  return { left: g1, right: g2 };
}

function NMark({ scrollProgress }: { scrollProgress: { current: number } }) {
  const groupRef = useRef<THREE.Group>(null!);
  const slashRef = useRef<THREE.Mesh>(null!);
  const slashOuterRef = useRef<THREE.Mesh>(null!);
  const { mouse } = useThree();

  const { left, right } = useMemo(() => buildNGeometries(0.45), []);

  // Slash geometry — sized to extend just past the N silhouette
  const slashGeo = useMemo(() => new THREE.BoxGeometry(3.4, 0.05, 0.12), []);
  const slashOuterGeo = useMemo(() => new THREE.BoxGeometry(3.55, 0.16, 0.14), []);

  // Smoothed targets for cursor parallax
  const target = useRef({ rx: 0, ry: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Smooth mouse-driven rotation target
    target.current.ry += (mouse.x * 0.35 - target.current.ry) * 0.04;
    target.current.rx += (-mouse.y * 0.22 - target.current.rx) * 0.04;

    if (groupRef.current) {
      const sp = scrollProgress.current;
      // Hero-card pose: small Y-bob (never edge-on), slight downward tilt.
      // Scroll progress adds a full spin so the user discovers the back.
      const baseY = Math.sin(t * 0.45) * 0.28;
      const baseX = -0.08 + Math.sin(t * 0.32) * 0.04;
      groupRef.current.rotation.y = target.current.ry + baseY + sp * Math.PI * 1.6;
      groupRef.current.rotation.x = target.current.rx + baseX + sp * 0.5;
      // gentle floating + offset right so it sits in its column
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.05 - sp * 0.4;
      groupRef.current.position.x = 0.35;
      // baseline scale + subtle scale-down on scroll
      const s = 0.78 - sp * 0.2;
      groupRef.current.scale.setScalar(s);
    }

    // Slash pulse — animate emissive intensity (dialed down so metallic body
    // remains the focal mass, slash is the accent)
    if (slashRef.current) {
      const mat = slashRef.current.material as THREE.MeshBasicMaterial;
      const pulse = 1.4 + Math.sin(t * 2.0) * 0.3 + Math.sin(t * 5.3) * 0.1;
      mat.color.setRGB(0.55 * pulse, 0.92 * pulse, 0.0);
    }
    if (slashOuterRef.current) {
      const mat = slashOuterRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.22 + Math.sin(t * 1.6) * 0.06;
      mat.color.setRGB(0.3, 0.55, 0.0);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Metallic N body — two meshes (left bar + right bar/diagonal complex) */}
      <mesh geometry={left} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#cfd3d8"
          metalness={1}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.6}
          reflectivity={1}
        />
      </mesh>
      <mesh geometry={right} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#cfd3d8"
          metalness={1}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.6}
          reflectivity={1}
        />
      </mesh>

      {/* Neon slash — outer halo */}
      <mesh
        ref={slashOuterRef}
        geometry={slashOuterGeo}
        rotation={[0, 0, -Math.PI / 5.5]}
        position={[0, 0, 0.32]}
      >
        <meshBasicMaterial
          color={[0.8, 1.5, 0]}
          transparent
          opacity={0.3}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Neon slash — bright core */}
      <mesh
        ref={slashRef}
        geometry={slashGeo}
        rotation={[0, 0, -Math.PI / 5.5]}
        position={[0, 0, 0.34]}
      >
        <meshBasicMaterial color={[1.6, 2.8, 0]} toneMapped={false} />
      </mesh>
    </group>
  );
}

function CinematicLights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      {/* Key */}
      <directionalLight
        position={[5, 6, 7]}
        intensity={2.2}
        color="#ffffff"
      />
      {/* Cool rim from behind */}
      <directionalLight
        position={[-6, 3, -4]}
        intensity={0.9}
        color="#c0d8ff"
      />
      {/* Subtle fill */}
      <directionalLight
        position={[2, -3, 4]}
        intensity={0.45}
        color="#e8eaed"
      />
      {/* Neon accent below */}
      <pointLight position={[0, -3, 3]} intensity={3.5} distance={10} color="#A6FF00" />
      {/* Neon back-glow */}
      <pointLight position={[2.5, 2.5, -4]} intensity={2.2} distance={9} color="#7acc00" />
    </>
  );
}

export function NMarkSculpture({
  className,
  scrollProgress,
}: {
  className?: string;
  scrollProgress: { current: number };
}) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 28 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
        }}
      >
        <Suspense fallback={null}>
          <CinematicLights />
          <NMark scrollProgress={scrollProgress} />

          <EffectComposer>
            <Bloom
              intensity={0.85}
              luminanceThreshold={0.35}
              luminanceSmoothing={0.35}
              mipmapBlur
              radius={0.7}
            />
            <ChromaticAberration
              offset={[0.0006, 0.001]}
              blendFunction={BlendFunction.NORMAL}
              radialModulation={false}
              modulationOffset={0}
            />
            <Vignette eskil={false} offset={0.3} darkness={0.6} />
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
