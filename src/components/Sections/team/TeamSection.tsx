"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, Variants, easeOut } from "framer-motion";
import { Award, Users, Clock } from "lucide-react";
import { useLocale } from "next-intl";
import { LangType } from "@/types";
import { TeamResponseType } from "@/types/Team";
import { getTeamData } from "@/lib/Api/TeamSection";
import MemberCard from "@/components/Cards/MemberCard";

export function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const lang = useLocale() as LangType;
  const [TeamData, setTeamData] = useState<TeamResponseType>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeamData(lang);
      const Team = data || undefined;
      setTeamData(Team);
    };

    fetchData();
  }, [lang]);

  const stats = [
    {
      icon: Users,
      number: `${TeamData?.data?.counters?.team_members}+`,
      label: lang === "ar" ? "أعضاء الفريق" : "Team Members",
    },
    {
      icon: Award,
      number: `${TeamData?.data?.counters?.certifications}+`,
      label: lang === "ar" ? "الشهادات" : "Certifications",
    },
    {
      icon: Clock,
      number: `${TeamData?.data?.counters?.years_experience}+`,
      label: lang === "ar" ? "سنوات الخبرة" : "Years Experience",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
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

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-t from-background/70 to-background/40 relative z-20 overflow-hidden"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="tech-text-gradient">Our Expert Team</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col md:flex-row gap-2 justify-center items-center glass-effect rounded-xl p-3 hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl font-bold tech-text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <stat.icon className="w-3 h-3 text-primary" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TeamData?.data?.members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
