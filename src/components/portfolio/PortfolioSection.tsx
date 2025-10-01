"use client";

import { useRef, useState } from "react";
// import { useTranslations } from "next-intl";
import { motion, useInView, Variants, easeOut } from "framer-motion";
import { ExternalLink, Play, Github, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function PortfolioSection() {
  // const t = useTranslations("portfolio");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Enterprise Cloud Migration",
      description:
        "Complete digital transformation for a Fortune 500 company, migrating legacy systems to modern cloud infrastructure.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=center",
      category: "Cloud Computing",
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform"],
      video:
        "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
    },
    {
      id: 2,
      title: "AI-Powered Analytics Platform",
      description:
        "Machine learning platform that processes millions of data points to provide real-time business insights.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
      category: "Software Development",
      technologies: ["Python", "TensorFlow", "React", "PostgreSQL"],
      video:
        "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
    },
    {
      id: 3,
      title: "E-commerce Mobile App",
      description:
        "Cross-platform mobile application with advanced features like AR product visualization and AI recommendations.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
      category: "Mobile Development",
      technologies: ["React Native", "Node.js", "MongoDB", "Stripe"],
      video:
        "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
    },
    {
      id: 4,
      title: "IoT Smart City Solution",
      description:
        "Comprehensive IoT platform connecting thousands of sensors across the city for real-time monitoring and management.",
      image:
        "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop&crop=center",
      category: "IoT Solutions",
      technologies: ["MQTT", "InfluxDB", "Grafana", "Microservices"],
      video:
        "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
    },
    {
      id: 5,
      title: "Blockchain Supply Chain",
      description:
        "Transparent and secure supply chain management system using blockchain technology for end-to-end traceability.",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&crop=center",
      category: "Blockchain",
      technologies: ["Ethereum", "Solidity", "Web3.js", "IPFS"],
      video:
        "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
    },
    {
      id: 6,
      title: "Cybersecurity Platform",
      description:
        "Advanced threat detection and response platform with AI-powered security analytics and automated incident response.",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop&crop=center",
      category: "Cybersecurity",
      technologies: ["Python", "Elasticsearch", "Kafka", "Machine Learning"],
      video:
        "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=164&oauth2_token_id=57447761",
    },
  ];

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
      id="portfolio"
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
              Our Work
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="tech-text-gradient">Portfolio</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Explore our successful projects that showcase our expertise in
            delivering cutting-edge technology solutions.
          </motion.p>
        </motion.div>

        {/* المشاريع */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl glass-effect border border-primary/20 hover:border-primary/40"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                scale: 1.03,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              {/* صورة أو فيديو */}
              <div className="relative h-64 overflow-hidden">
                {hoveredProject === project.id ? (
                  <video
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* زر التشغيل */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <Play className="w-6 h-6 text-white ml-1" />
                  </motion.div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* المحتوى */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* التكنولوجيات */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* الأزرار */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 group/btn"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                    View Project
                  </Button>
                  <Button variant="ghost" size="sm" className="px-3">
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <motion.div variants={itemVariants}>
            <Button variant="tech" size="lg" className="group">
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
