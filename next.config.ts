import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dashboard.computinggate.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
  // تحسين التوافق مع المتصفحات القديمة
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  // إعدادات التوافق مع المتصفحات
  transpilePackages: [],
  // إعدادات الأمان والاستقرار
  reactStrictMode: true,
  poweredByHeader: false,
  // تحسين الأداء على الأجهزة الضعيفة
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);
