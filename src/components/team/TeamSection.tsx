"use client";

import { useRef } from "react";
import { motion, useInView, Variants, easeOut } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Linkedin, Github, Mail, Award, Users, Clock } from "lucide-react";
import Image from "next/image";

export function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teamMembers = [
    {
      name: "Ahmed Al-Rashid",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Visionary leader with 15+ years in technology innovation and digital transformation.",
      linkedin: "#",
      github: "#",
      email: "ahmed@computinggate.com",
    },
    {
      name: "Sarah Johnson",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Expert in cloud architecture and scalable system design with a passion for emerging technologies.",
      linkedin: "#",
      github: "#",
      email: "sarah@computinggate.com",
    },
    {
      name: "Mohammed Hassan",
      role: "Lead Developer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Full-stack developer specializing in modern web technologies and mobile applications.",
      linkedin: "#",
      github: "#",
      email: "mohammed@computinggate.com",
    },
    {
      name: "Emily Chen",
      role: "UX/UI Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Creative designer focused on user-centered design and creating exceptional digital experiences.",
      linkedin: "#",
      github: "#",
      email: "emily@computinggate.com",
    },
    {
      name: "David Wilson",
      role: "DevOps Engineer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "Infrastructure specialist ensuring robust, scalable, and secure deployment pipelines.",
      linkedin: "#",
      github: "#",
      email: "david@computinggate.com",
    },
    {
      name: "Fatima Al-Zahra",
      role: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
      bio: "Experienced project manager ensuring timely delivery and exceptional client satisfaction.",
      linkedin: "#",
      github: "#",
      email: "fatima@computinggate.com",
    },
  ];

  const stats = [
    { icon: Users, number: "50+", label: "Team Members" },
    { icon: Award, number: "25+", label: "Certifications" },
    { icon: Clock, number: "10+", label: "Years Experience" },
  ];

  // ✅ Variants مضبوط مع TypeScript
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
      transition: { duration: 0.8, ease: easeOut }, // 👈 من framer-motion
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
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

        {/* الإحصائيات */}
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
              className="text-center glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold tech-text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* أعضاء الفريق مع tilt-effect */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <Tilt
              key={index}
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
                className="glass-effect rounded-2xl p-6 hover:tech-glow"
              >
                {/* صورة البروفايل */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                  />
                </div>

                {/* المعلومات */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* الروابط */}
                  <div className="flex justify-center space-x-3">
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.github}
                      className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
