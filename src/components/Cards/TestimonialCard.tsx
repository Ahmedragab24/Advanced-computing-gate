"use client";

import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { TestimonialType } from "@/types/Testimonial";
import { useLocale } from "next-intl";

interface Props {
  testimonial: TestimonialType;
}

const TestimonialCard = ({ testimonial }: Props) => {
  const lang = useLocale();

  return (
    <motion.div
      key={testimonial.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="glass-effect rounded-2xl p-8 lg:p-12 text-center"
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Quote className="w-8 h-8 text-primary" />
      </div>

      <div className="flex justify-center mb-6">
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>

      <blockquote className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
        {testimonial.comment}
      </blockquote>

      <div className="flex items-center justify-center gap-4">
        {testimonial.client_image && (
          <div className="relative w-16 h-16">
            <Image
              src={testimonial.client_image}
              alt={testimonial.client_name}
              fill
              className="object-cover rounded-full border-2 border-primary/20"
            />
          </div>
        )}
        <div className={`${lang ==="ar" ? "text-right" : "text-left"}`}>
          <h4 className="font-semibold text-foreground">
            {testimonial.client_name}
          </h4>
          <p className="text-sm text-muted-foreground">
            {testimonial.client_position}
          </p>

          {testimonial.created_at && (
            <span className="text-muted-foreground text-sm">
              {new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(testimonial.created_at))}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
