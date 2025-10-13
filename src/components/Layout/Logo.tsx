import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface Props {
  size?: "lg" | "sm";
}

const Logo = ({ size = "sm" }: Props) => {
  const { theme } = useTheme();

  const logoSrc =
    theme === "light"
      ? "/Logo/Transparent BG- En + Ar@3x@3x.png"
      : "/Logo/Transparent BG- En + Ar @3x@3x@3x.png"; // default + dark mode

  return (
    <div
      className={`relative ${
        size === "lg"
          ? "!w-[110px] !h-[110px]"
          : "!w-[60px] !h-[60px] md:!w-[80px] md:!h-[80px]"
      } `}
    >
      <Image src={logoSrc} alt="logo" fill priority />
    </div>
  );
};

export default Logo;
