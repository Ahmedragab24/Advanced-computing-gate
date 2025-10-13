"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

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

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.elapsedTime;
      meshRef.current.rotation.y = t * speed * 0.3; 
      meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 24, 24]} position={position}>
      <MeshDistortMaterial
        color={color}
        distort={0.25} 
        speed={1.5} 
        roughness={0.3}
        metalness={0.05}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.75}
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
    <div className="fixed inset-0 z-0 blur-2xl">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 70 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]} 
      >
        <ambientLight intensity={0.05} />
        <pointLight position={[10, 10, 10]} intensity={0.05} />
        <directionalLight position={[-5, 5, 5]} intensity={0.05} />

        {orbs.map((orb, index) => (
          <FloatingOrb key={index} {...orb} />
        ))}

      </Canvas>
    </div>
  );
}
