"use client";

import { ProjectType } from "@/types/Projects";
import React from "react";
import { motion, Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useLocale } from "next-intl";
import { LangType } from "@/types";

interface Props {
  project: ProjectType;
  itemVariants: Variants;
}

const ProjectCard = ({ project, itemVariants }: Props) => {
  const lang = useLocale() as LangType;

  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-2xl glass-effect border border-primary/20 hover:border-primary/40"
      whileHover={{
        y: -10,
        boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        scale: 1.03,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      <div className="relative h-64 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
            No image available
          </div>
        )}

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-gray-200/80 dark:bg-gray-900/80 text-foreground text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.project_link && (
          <div className="w-full">
            <a
              href={project.project_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="w-4 h-4 mx-2 group-hover/btn:translate-x-1 transition-transform" />
                {lang === "ar" ? "عرض المشروع" : "View Project"}
              </Button>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
