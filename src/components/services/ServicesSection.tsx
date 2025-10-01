"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import Tilt from "react-parallax-tilt"; // ✅ استدعاء المكتبة
import { Code, Cloud, Zap, Headphones } from "lucide-react";

export function ServicesSection() {
  const t = useTranslations("services");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    { icon: Code, key: "software", color: "from-green-500 to-emerald-600" },
    { icon: Cloud, key: "cloud", color: "from-blue-500 to-cyan-600" },
    { icon: Zap, key: "digital", color: "from-purple-500 to-violet-600" },
    { icon: Headphones, key: "support", color: "from-orange-500 to-red-600" },
  ];

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
      id="services"
      ref={ref}
      className="py-20 bg-gradient-to-b from-background/50 to-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
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
        </motion.div>

        {/* الكروت مع tilt-effect */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => (
            <Tilt
              key={service.key}
              tiltMaxAngleX={15} // 🔥 أقصى ميلان X
              tiltMaxAngleY={15} // 🔥 أقصى ميلان Y
              perspective={1000} // العمق
              scale={1.05} // تكبير بسيط عند الميلان
              transitionSpeed={400}
              gyroscope={true} // يدعم الموبايل
              className="group"
            >
              <motion.div
                variants={itemVariants}
                className="glass-effect rounded-2xl p-8 h-full hover:tech-glow"
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`${service.key}.description`)}
                </p>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
