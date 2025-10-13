"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ParticleBackground } from "@/components/Sections/particles/ParticleField";
import { FloatingOrbs } from "@/components/Sections/particles/FloatingOrbs";
import { easeOut } from "framer-motion";
import { HeroSectionResponseType } from "@/types/Hero";
import { getHeroSectionData } from "@/lib/Api/HeroSection";
import { LangType } from "@/types";
import ContactBtns from "@/components/Buttons/ContactBtns";
import Status from "./Status";

export function HeroSection() {
  const lang = useLocale() as LangType;
  const heroRef = useRef<HTMLDivElement>(null);
  const [HeroData, setHeroData] = useState<HeroSectionResponseType>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHeroSectionData(lang);
      const Hero = data || undefined;
      setHeroData(Hero);
    };

    fetchData();
  }, [lang]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <FloatingOrbs />

      <div
        ref={heroRef}
        className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/40"
      />

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect border">
              <Sparkles className="w-4 h-4 text-primary mx-2" />
              <span className="text-sm font-medium text-primary">
                {HeroData?.data.subtitle}
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="block tech-text-gradient md:max-w-2xl mx-auto">
              {HeroData?.data.title}
            </span>
            <span className="block text-gray-600/90 dark:text-gray-400/90 mt-2 text-sm sm:text-lg md:text-xl lg:text-2xl md:max-w-2xl mx-auto">
              {HeroData?.data.description}
            </span>
          </motion.h1>

          <ContactBtns itemVariants={itemVariants} />

          <Status
            status={{
              projects_count: HeroData?.data.projects_count || 0,
              clients_count: HeroData?.data.clients_count || 0,
              years_experience: HeroData?.data.years_experience || 0,
            }}
            itemVariants={itemVariants}
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
