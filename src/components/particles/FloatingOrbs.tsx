"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function FloatingOrb({
  position,
  color,
  speed,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.1}
        emissive={color}
        emissiveIntensity={1.2} // 👈 نور أقوى
        transparent
        opacity={0.8} // 👈 شوية شفافية علشان البلور يبان
      />
    </Sphere>
  );
}

export function FloatingOrbs() {
  const orbs = useMemo(
    () => [
      {
        position: [-8, -2, -5] as [number, number, number],
        color: "#22c55e",
        speed: 0.5,
      },
      {
        position: [6, 2, -2] as [number, number, number],
        color: "#e950a4e3",
        speed: 0.7,
      },
      {
        position: [-6, 3, -12] as [number, number, number],
        color: "#8b5cf6",
        speed: 0.3,
      },
      {
        position: [6, -3, -6] as [number, number, number],
        color: "#06b6d4",
        speed: 0.6,
      },
    ],
    []
  );

  return (
    <div className="fixed inset-0 z-0 blur-3xl">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.05} />
        <pointLight position={[10, 10, 10]} intensity={0.1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.1} />

        {orbs.map((orb, index) => (
          <FloatingOrb key={index} {...orb} />
        ))}

        <EffectComposer>
          <Bloom
            intensity={0.1} // 👈 أقوى بكتير
            luminanceThreshold={0.9} // 👈 يبان على كل الألوان المضيئة
            luminanceSmoothing={0.9} // 👈 بلور ناعم
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
