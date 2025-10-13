"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, Variants } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/Forms/ContactForm";
import { ContactInfoResponseType } from "@/types/Contact";
import { getContactInfo } from "@/lib/Api/Contact";
import SocialLinks from "@/components/Buttons/SocialLinks";

export function ContactSection() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [ContactInfo, setContactInfo] = useState<ContactInfoResponseType>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContactInfo();
      const Contact = data || undefined;
      setContactInfo(Contact);
    };
    fetchData();
  }, []);

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
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-gradient-to-b from-background/70 to-background/40 relative z-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="tech-text-gradient">{t("title")}</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">{t("info.title")}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t("info.email")}</h4>
                    <p className="text-muted-foreground">
                      {ContactInfo?.data?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t("info.phone")}</h4>
                    <p className="text-muted-foreground">
                      {ContactInfo?.data?.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t("info.address")}</h4>
                    <p className="text-muted-foreground">
                      {ContactInfo?.data?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="glass-effect rounded-xl p-6">
              <h4 className="font-semibold mb-3">{t("info.hours")}</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                {ContactInfo?.data?.business_hours
                  ?.split("\\n")
                  .map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
              </div>
            </div>

            <SocialLinks />
          </motion.div>

          {/* Contact Form */}
          <ContactForm variants={itemVariants} />
        </motion.div>
      </div>
    </section>
  );
}
