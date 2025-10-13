"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  Variants,
  easeOut,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { LangType } from "@/types";
import { TestimonialType } from "@/types/Testimonial";
import { getTestimonialsData } from "@/lib/Api/TestimonialSection";
import TestimonialCard from "@/components/Cards/TestimonialCard";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const lang = useLocale() as LangType;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTestimonialsData(lang);
      setTestimonials(data?.data || []);
    };
    fetchData();
  }, [lang]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

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

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-background/50 to-background"
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
              {t("title")}
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="tech-text-gradient">{t("subtitle")}</span>
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
          className="relative max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {testimonials.length > 0 && (
              <TestimonialCard
                key={testimonials[currentIndex].id}
                testimonial={testimonials[currentIndex]}
              />
            )}
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className={`flex justify-center items-center gap-4 mt-8`}>
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 glass-effect rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label={t("previous")}
              >
                {lang === "ar" ? (
                  <ChevronRight className="w-6 h-6" />
                ) : (
                  <ChevronLeft className="w-6 h-6" />
                )}
              </button>

              <div className="flex mx-4 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 glass-effect rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label={t("next")}
              >
                {lang === "ar" ? (
                  <ChevronLeft className="w-6 h-6" />
                ) : (
                  <ChevronRight className="w-6 h-6" />
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
