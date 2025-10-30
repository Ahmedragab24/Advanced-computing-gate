"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView, Variants, easeOut } from "framer-motion";
import { ArrowRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjectsData } from "@/lib/Api/ProjectsSection";
import { LangType } from "@/types";
import { ProjectType } from "@/types/Projects";
import ProjectCard from "@/components/Cards/ProjectCard";

export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const ref = useRef(null);
  const lang = useLocale() as LangType;
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjectsData(lang);
      const Projects = data?.data || [];
      setProjects(Projects);
    };

    fetchData();
  }, [lang]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  const displayedProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-20 bg-gradient-to-b from-background/50 to-background relative overflow-hidden"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {t("badge")}
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            <span className="tech-text-gradient">{t("title")}</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20"
        >
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>

        {projects.length > 6 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mt-16"
          >
            <motion.div variants={itemVariants}>
              <Button
                variant="tech"
                size="lg"
                className="group"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? t("viewLess") : t("viewAll")}
                {showAll ? (
                  <ArrowUp className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                ) : (
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
