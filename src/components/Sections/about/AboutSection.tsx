"use client";

import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Text3D,
  Center,
  Instances,
  Instance,
  Environment,
  useMatcapTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { damp } from "maath/easing";
import { AboutSectionResponseType } from "@/types/About";
import { LangType } from "@/types";
import { getAboutSectionData } from "@/lib/Api/AboutSection";

function InstancedCrystals() {
  const crystalData = useMemo(
    () => [
      {
        p: [-3, 1.5, 0] as [number, number, number],
        s: 0.6,
        c: "#60a5fa",
        speed: 0.6,
      },
      {
        p: [3, 1.5, 0] as [number, number, number],
        s: 0.7,
        c: "#34d399",
        speed: 0.7,
      },
      {
        p: [-2, -2, 0] as [number, number, number],
        s: 0.8,
        c: "#a78bfa",
        speed: 0.8,
      },
      {
        p: [2, -2, 0] as [number, number, number],
        s: 0.9,
        c: "#f472b6",
        speed: 0.9,
      },
    ],
    []
  );

  return (
    <Instances limit={crystalData.length} range={crystalData.length}>
      <icosahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        metalness={0.6}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        reflectivity={1}
      />
      {crystalData.map((data, i) => (
        <Crystal key={i} {...data} />
      ))}
    </Instances>
  );
}

function Crystal({
  p,
  s,
  c,
  speed,
}: {
  p: [number, number, number];
  s: number;
  c: string;
  speed: number;
}) {
  const ref = useRef<THREE.InstancedMesh>(null!);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = t * 0.6;
    ref.current.rotation.y = t * 0.4;

    const newY = p[1] + Math.sin(t * 2) * 0.15;

    damp(ref.current.position, "y", newY, 0.25, delta);
  });

  return <Instance ref={ref} scale={s} position={p} color={c} />;
}

function ProfessionalText() {
  const textRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  const [matcap] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

  useFrame((state) => {
    const x = (state.mouse.x * viewport.width) / 50;
    const y = (state.mouse.y * viewport.height) / 50;

    textRef.current.rotation.y = THREE.MathUtils.lerp(
      textRef.current.rotation.y,
      x,
      0.1
    );
    textRef.current.rotation.x = THREE.MathUtils.lerp(
      textRef.current.rotation.x,
      -y,
      0.1
    );
  });

  return (
    <Center ref={textRef}>
      <Text3D
        font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
        size={0.6}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.01}
        bevelSegments={5}
      >
        ComputingGate
        <meshMatcapMaterial matcap={matcap} />
      </Text3D>
    </Center>
  );
}

function TechScene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />

      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      <ProfessionalText />
      <InstancedCrystals />

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export function AboutSection() {
  const t = useTranslations("about");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const lang = useLocale() as LangType;
  const [AboutData, setAboutData] = useState<AboutSectionResponseType>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAboutSectionData(lang);
      const About = data || undefined;
      setAboutData(About);
    };

    fetchData();
  }, [lang]);

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
      dir={lang === "ar" ? "rtl" : "ltr"}
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
              <span className="tech-text-gradient">
                {AboutData?.data?.title}
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              {AboutData?.data?.description}
            </motion.p>
          </div>

          {/* 3D Scene */}
          <motion.div
            variants={itemVariants}
            className="h-96 lg:h-[500px] rounded-2xl overflow-hidden glass-effect border !border-primary/30 dark:!border-primary/20 cursor-grab"
          >
            <Canvas
              camera={{ position: [0, 0, 8], fov: 50 }}
              performance={{ min: 0.5, max: 1 }}
            >
              <TechScene />
            </Canvas>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
