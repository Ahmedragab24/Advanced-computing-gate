import { MemberType } from "@/types/Team";
import React from "react";
import Tilt from "react-parallax-tilt";
import { Linkedin, Github, Mail } from "lucide-react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface Props {
  member: MemberType;
  itemVariants: Variants;
}

const MemberCard = ({ member, itemVariants }: Props) => {
  return (
    <Tilt
      key={member.id}
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
          <p className="text-primary font-medium mb-3">{member.position}</p>
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            {member.bio}
          </p>

          {/* الروابط */}
          <div className="flex justify-center gap-3">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${member.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default MemberCard;
