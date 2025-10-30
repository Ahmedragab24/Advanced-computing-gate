"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface Props {
  size?: "lg" | "sm";
}

const Logo = ({ size = "sm" }: Props) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/Logo/ForDark.png");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // تحديد الثيم الحالي (systemTheme هو القيمة الافتراضية)
    const currentTheme = theme === "system" ? systemTheme : theme;
    const src =
      currentTheme === "light" ? "/Logo/ForLight.png" : "/Logo/ForDark.png";
    setLogoSrc(src);
    setImageError(false); // إعادة تعيين حالة الخطأ عند تغيير الثيم
  }, [theme, systemTheme, mounted]);

  // أثناء الـ SSR أو قبل الـ mount، نستخدم الصورة الداكنة كافتراضي
  if (!mounted) {
    return (
      <div
        className={`relative ${
          size === "lg"
            ? "!w-[110px] !h-[110px]"
            : "!w-[60px] !h-[60px] md:!w-[80px] md:!h-[80px]"
        } `}
      >
        <Image
          src="/Logo/ForDark.png"
          alt="ComputingGate Logo"
          fill
          priority
          sizes={size === "lg" ? "110px" : "(max-width: 768px) 60px, 80px"}
          quality={90}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${
        size === "lg"
          ? "!w-[110px] !h-[110px]"
          : "!w-[60px] !h-[60px] md:!w-[80px] md:!h-[80px]"
      } `}
    >
      <Image
        src={imageError ? "/Logo/ForDark.png" : logoSrc}
        alt="ComputingGate Logo"
        fill
        priority
        sizes={size === "lg" ? "110px" : "(max-width: 768px) 60px, 80px"}
        quality={90}
        onError={() => {
          console.error("Failed to load logo:", logoSrc);
          setImageError(true);
        }}
      />
    </div>
  );
};

export default Logo;
