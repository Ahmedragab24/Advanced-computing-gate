"use client";

import { ServiceType } from "@/types/Services";
import React from "react";
import Tilt from "react-parallax-tilt";
import { motion, Variants } from "framer-motion";
import { Code, Cloud, Zap, Headphones } from "lucide-react";

interface Props {
  service: ServiceType;
  itemVariants: Variants;
}

const ServiceCard = ({ service, itemVariants }: Props) => {
  const services = [
    {
      icon: Code,
      keys: ["Software", "Development", "app", "website", "البرمجيات", "تطوير"],
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Cloud,
      keys: [
        "Cloud",
        "Computing",
        "Hosting",
        "Server",
        "Storage",
        "الحوسبة",
        "السحابية",
      ],
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Zap,
      keys: ["Digital", "marketing", "seo", "ads", "الرقمي", "التحول"],
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Headphones,
      keys: ["Support", "customer", "help", "التقني", "دعم", "الدعم"],
      color: "from-orange-500 to-red-600",
    },
  ];

  const title = service.title.toLowerCase();

  const matchedService =
    services.find((s) =>
      s.keys.some((key) => title.includes(key.toLowerCase()))
    ) || services[0];

  const Icon = matchedService.icon;
  const color = matchedService.color;

  return (
    <Tilt
      key={service.id}
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      scale={1.05}
      transitionSpeed={400}
      gyroscope={true}
      className="group"
    >
      <motion.div
        variants={itemVariants}
        className="glass-effect rounded-2xl p-8 h-full hover:tech-glow transition-all duration-300"
      >
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </motion.div>
    </Tilt>
  );
};

export default ServiceCard;
