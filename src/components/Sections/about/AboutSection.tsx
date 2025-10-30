"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { AboutSectionResponseType } from "@/types/About";
import { LangType } from "@/types";
import { getAboutSectionData } from "@/lib/Api/AboutSection";
import Image from "next/image";

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
            <Image
              src={AboutData?.data?.image || "/Logo/ForDark.png"}
              alt="3d scene"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
