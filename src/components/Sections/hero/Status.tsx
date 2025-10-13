import React from "react";
import { motion, Variants } from "framer-motion";
import { useLocale } from "next-intl";
import { LangType } from "@/types";

interface Props {
  status: {
    projects_count: number;
    clients_count: number;
    years_experience: number;
  };
  itemVariants: Variants;
}

const Status = ({ status, itemVariants }: Props) => {
  const lang = useLocale() as LangType;
  const StatusList = [
    {
      number: `${status.projects_count}+`,
      label: lang === "ar" ? "المشاريع المنجزة" : "Projects Completed",
    },
    {
      number: `${status.clients_count}+`,
      label: lang === "ar" ? "عدد العملاء" : "Clients Count",
    },
    {
      number: `${status.years_experience}+`,
      label: lang === "ar" ? "سنوات الخبرة" : "Years Experience",
    },
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-3 gap-3 md:gap-8 max-w-2xl mx-auto"
    >
      {StatusList.map((stat, index) => (
        <div
          key={index}
          className="text-center border border-gray-400/40 rounded-md pb-2 px-6"
        >
          <div className="text-lg md:text-2xl sm:text-3xl font-bold tech-text-gradient mb-1">
            {stat.number}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
};

export default Status;
