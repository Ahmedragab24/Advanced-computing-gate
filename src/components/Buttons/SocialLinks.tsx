"use client";

import { SocialLinkType } from "@/types/Contact";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Mail,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getSocialLinks } from "@/lib/Api/Contact";

const SUPPORTED_PLATFORMS = [
  "facebook",
  "twitter",
  "linkedin",
  "instagram",
  "tiktok",
  "github",
  "email",
] as const;

type PlatformType = (typeof SUPPORTED_PLATFORMS)[number];

const platformIcons: Record<
  PlatformType,
  { icon: React.ReactNode; color: string }
> = {
  facebook: { icon: <Facebook />, color: "hover:text-blue-600" },
  twitter: { icon: <Twitter />, color: "hover:text-sky-500" },
  linkedin: { icon: <Linkedin />, color: "hover:text-blue-700" },
  instagram: { icon: <Instagram />, color: "hover:text-pink-500" },
  tiktok: { icon: <Youtube />, color: "hover:text-rose-500" },
  github: { icon: <Github />, color: "hover:text-gray-700" },
  email: { icon: <Mail />, color: "hover:text-primary" },
};

const SocialLinks = () => {
  const [Social, setSocial] = useState<SocialLinkType[]>();

  console.log("Social", Social);

  useEffect(() => {
    const fetchData = async () => {
      const SocialData = await getSocialLinks();
      const Social = SocialData?.data?.items;
      setSocial(Social);
    };

    fetchData();
  }, []);

  const validSocials = Social?.filter(
    (item): item is SocialLinkType & { platform: PlatformType } =>
      SUPPORTED_PLATFORMS.includes(item.platform as PlatformType)
  );

  if (!validSocials?.length) return null;

  return (
    <div className="flex space-x-4">
      {validSocials.map((item, index) => {
        const { icon: Icon, color } = platformIcons[item.platform];
        return (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.platform}
            className={cn(
              "w-10 h-10 glass-effect rounded-lg flex items-center justify-center transition-all hover:bg-primary/10",
              color
            )}
          >
            {Icon}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
