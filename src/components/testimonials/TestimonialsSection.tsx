"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  Variants,
  easeOut,
  AnimatePresence,
} from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      position: "CEO",
      company: "TechCorp Solutions",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "ComputingGate transformed our entire digital infrastructure. Their cloud migration solution reduced our operational costs by 40% while improving performance significantly. Exceptional service and expertise.",
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      position: "CTO",
      company: "InnovateTech",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "Working with ComputingGate has been a game-changer for our business. Their AI-powered analytics platform provided insights we never had before. Professional, innovative, and results-driven team.",
    },
    {
      id: 3,
      name: "Michael Johnson",
      position: "Founder",
      company: "StartupHub",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "From concept to launch, ComputingGate delivered our mobile app ahead of schedule. Their attention to detail and user experience design is outstanding. Highly recommend their services.",
    },
    {
      id: 4,
      name: "Fatima Al-Rashid",
      position: "Director",
      company: "Digital First",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      rating: 5,
      text: "The cybersecurity platform ComputingGate developed for us has been instrumental in protecting our digital assets. Their expertise in security and compliance is unmatched. Excellent partnership.",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
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
      transition: { duration: 0.8, ease: easeOut }, // ✅ fix هنا
    },
  };

  return (
    <section
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
              Client Testimonials
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="tech-text-gradient">What Our Clients Say</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Don&apos;t just take our word for it. Here&apos;s what our satisfied
            clients have to say about working with ComputingGate.
          </motion.p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="glass-effect rounded-2xl p-8 lg:p-12 text-center"
            >
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Quote className="w-8 h-8 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  )
                )}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                &quot;{testimonials[currentTestimonial].text}&quot;
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="relative w-16 h-16">
                  <Image
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    fill
                    className="object-cover rounded-full border-2 border-primary/20"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].position},{" "}
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 glass-effect rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 glass-effect rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* Trusted By Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">
              <span className="tech-text-gradient">
                Trusted By Leading Companies
              </span>
            </h3>
            <p className="text-muted-foreground">
              We&apos;re proud to work with industry leaders who trust us with
              their technology needs.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60"
          >
            {[
              "TechCorp",
              "InnovateTech",
              "StartupHub",
              "Digital First",
              "CloudTech",
              "FutureSoft",
            ].map((name, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center justify-center p-4 glass-effect rounded-lg hover:opacity-100 transition-opacity"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-primary font-bold text-lg">
                      {name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {name}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
