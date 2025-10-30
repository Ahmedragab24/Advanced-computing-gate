"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();

  const particleColor = theme === "dark" ? "#22c55e" : "#166534";

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={particlesPosition}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        transparent
        color={particleColor}
        size={0.08}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export function ParticleBackground() {
  const [canRender, setCanRender] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const isClient = typeof window !== "undefined";
      if (!isClient) return;

      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setCanRender(Boolean(gl));
    } catch (error) {
      console.warn("WebGL not supported for ParticleBackground:", error);
      setHasError(true);
      setCanRender(false);
    }
  }, []);

  if (hasError || !canRender) {
    return null;
  }

  try {
    return (
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: "transparent" }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
        >
          <ParticleField />
        </Canvas>
      </div>
    );
  } catch (error) {
    console.warn("Error rendering ParticleBackground:", error);
    return null;
  }
}
