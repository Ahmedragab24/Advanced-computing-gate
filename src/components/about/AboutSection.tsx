"use client";

import { useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

function TechCube({
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
      const t = state.clock.elapsedTime * speed;
      meshRef.current.rotation.x = t * 0.6;
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.position.y = position[1] + Math.sin(t * 2) * 0.15; // حركة ناعمة لأعلى وأسفل
    }
  });

  return (
    <Box ref={meshRef} args={[1.3, 1.3, 1.3]} position={position}>
      <meshPhysicalMaterial
        color={color}
        metalness={0.6}
        roughness={0.15}
        clearcoat={1}
        clearcoatRoughness={0.05}
        reflectivity={1}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Box>
  );
}

function TechScene() {
  const cubes = useMemo(
    () => [
      {
        position: [-3, 1.5, 0] as [number, number, number],
        color: "#60a5fa",
        speed: 0.6,
      },
      {
        position: [3, 1.5, 0] as [number, number, number],
        color: "#34d399",
        speed: 0.7,
      },
      {
        position: [-2, -2, 0] as [number, number, number],
        color: "#a78bfa",
        speed: 0.8,
      },
      {
        position: [2, -2, 0] as [number, number, number],
        color: "#f472b6",
        speed: 0.9,
      },
    ],
    []
  );

  return (
    <>
      {/* 💡 إضاءة محسنة */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#60a5fa" />
      <pointLight position={[5, -2, -5]} intensity={0.8} color="#f472b6" />

      {/* 🏷️ اسم الشركة 3D صغير في النص بألوان متداخلة */}
      <Center>
        <Text3D
          font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.15}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.015}
          bevelSegments={5}
        >
          ComputingGate
          <meshStandardMaterial
            metalness={0.4}
            roughness={0.4}
            envMapIntensity={0.4}
            color="#ffff"
            emissive="#1cce5e"
            emissiveIntensity={0.4}
          />
        </Text3D>
      </Center>

      {/* 🧊 المكعبات حوالين النص */}
      {cubes.map((cube, i) => (
        <TechCube key={i} {...cube} />
      ))}

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.7} />
    </>
  );
}

export function AboutSection() {
  const t = useTranslations("about");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <div>
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {t("subtitle")}
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            >
              <span className="tech-text-gradient">{t("title")}</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              {t("description")}
            </motion.p>
          </div>

          {/* 3D Scene */}
          <motion.div
            variants={itemVariants}
            className="h-96 lg:h-[500px] rounded-2xl overflow-hidden glass-effect border !border-primary/30 dark:!border-primary/20"
          >
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
              <TechScene />
            </Canvas>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
